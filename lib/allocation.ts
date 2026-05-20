import { prisma } from './db';

// Hardcoded business logic pools explicitly dictated by the assignment parameters [cite: 72, 73, 74]
const POOLS: Record<string, number[]> = {
  "service_1": [2, 3, 4], 
  "service_2": [6, 7, 8], 
  "service_3": [2, 3, 5, 6, 7, 8] 
};

const MANDATORY: Record<string, number[]> = {
  "service_1": [1], 
  "service_2": [5], 
  "service_3": [1, 4] 
};

export async function allocateLead(leadId: string, serviceId: string) {
  // Convert standard string routing labels to clean transaction integer markers (ex: service_1 -> 1)
  const lockId = parseInt(serviceId.replace("service_", ""));

  return await prisma.$transaction(async (tx) => {
    // CRITICAL CONCURRENCY HANDLING: Acquire a transaction-level advisory lock inside PostgreSQL matching this service. [cite: 17, 27]
    // This forces concurrent simultaneous incoming requests to queue cleanly in line, preventing race conditions. [cite: 54, 107]
    await tx.$executeRawUnsafe(`SELECT pg_advisory_xact_lock(${lockId})`);

    // Fetch current allocation state for the round-robin index [cite: 76, 77]
    const state = await tx.allocationState.findUnique({ where: { serviceId } });
    if (!state) throw new Error(`Allocation state mapping missing for service identifier: ${serviceId}`);

    const mandatoryIds = MANDATORY[serviceId] || [];
    const poolIds = POOLS[serviceId] || [];
    const allRelevantIds = Array.from(new Set([...mandatoryIds, ...poolIds]));

    // Pull down fresh provider data inside the transaction to verify true quota levels [cite: 14]
    const providers = await tx.provider.findMany({
      where: { id: { in: allRelevantIds } }
    });

    const providerMap = new Map(providers.map(p => [p.id, p]));
    const assignedProviderIds: number[] = [];

    // 1. PHASE A: Process Mandatory Assignment Rules [cite: 50, 63]
    for (const mId of mandatoryIds) {
      const p = providerMap.get(mId);
      if (p && p.leadsReceived < p.monthlyQuota) { 
        assignedProviderIds.push(mId);
      }
    }

    // 2. PHASE B: Distribute Remaining Slots Fairly via Round-Robin Rotation [cite: 51, 69]
    const totalSlotsNeeded = 3; 
    let remainingSlots = totalSlotsNeeded - assignedProviderIds.length;
    
    let currentIndex = state.lastProviderIndex;
    const pool = poolIds;
    let loopAttempts = 0; // Guardrail to prevent infinite loops if all providers out of quota

    while (remainingSlots > 0 && loopAttempts < pool.length) {
      const candidateId = pool[currentIndex];
      const p = providerMap.get(candidateId);

      if (
        p && 
        p.leadsReceived < p.monthlyQuota &&                // Must respect monthly quota bounds [cite: 52, 79, 105]
        !assignedProviderIds.includes(candidateId)          // Same provider cannot get the same lead twice [cite: 106]
      ) {
        assignedProviderIds.push(candidateId);
        remainingSlots--;
      }

      // Increment rotation pointer circularly across the pool size array [cite: 76]
      currentIndex = (currentIndex + 1) % pool.length;
      loopAttempts++;
    }

    // 3. PHASE C: Persist State Mutations back to Supabase [cite: 108]
    // Save the new fair distribution pointer index position [cite: 70, 75]
    await tx.allocationState.update({
      where: { serviceId },
      data: { lastProviderIndex: currentIndex }
    });

    // Bulk execute assignments records and increment allocated metric counters
    for (const pId of assignedProviderIds) {
      await tx.leadAssignment.create({
        data: { leadId, providerId: pId }
      });

      await tx.provider.update({
        where: { id: pId },
        data: { leadsReceived: { increment: 1 } }
      });
    }

    return assignedProviderIds;
  });
}