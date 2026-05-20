import { NextResponse } from 'next/server';
import { prisma } from '@/lib/db';

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { eventId } = body;

    if (!eventId) {
      return NextResponse.json({ error: "Missing required eventId signature payload." }, { status: 400 });
    }

    // Verify Idempotency against logs [cite: 138]
    const trackingSignature = await prisma.webhookEvent.findUnique({
      where: { eventId }
    });

    if (trackingSignature) {
      return NextResponse.json({ 
        success: true, 
        message: "Payload duplicate detected. Skipping duplicate processing loop securely." 
      }, { status: 200 }); // Successfully deduplicated [cite: 138]
    }

    // Perform database operations within atomic execution locks
    await prisma.$transaction(async (tx) => {
      // Record signature log to prevent a second execution [cite: 138]
      await tx.webhookEvent.create({ data: { eventId } });

      // Reset active metrics to fulfill the evaluation conditions [cite: 133, 137]
      await tx.provider.updateMany({
        data: { leadsReceived: 0 } // Resets total counters back down, meaning remaining quota returns to 10 [cite: 113, 133]
      });
    });

    return NextResponse.json({ success: true, message: "Operational quota boundaries refreshed across tracks successfully." });
  } catch (err) {
    return NextResponse.json({ error: "Critical internal processing execution exception thrown." }, { status: 500 });
  }
}