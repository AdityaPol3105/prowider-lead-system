import 'dotenv/config';
import { PrismaClient } from '@prisma/client';
import { PrismaPg } from '@prisma/adapter-pg';

const adapter = new PrismaPg({ connectionString: process.env.DATABASE_URL });
const prisma = new PrismaClient({ adapter });

async function main() {
  console.log("Cleaning up existing data channels...");
  await prisma.leadAssignment.deleteMany({});
  await prisma.allocationState.deleteMany({});
  await prisma.lead.deleteMany({});
  await prisma.provider.deleteMany({});
  await prisma.service.deleteMany({});
  await prisma.webhookEvent.deleteMany({});

  console.log("Seeding mandatory service entities...");
  await prisma.service.createMany({
    data: [
      { id: "service_1", name: "Service 1" },
      { id: "service_2", name: "Service 2" },
      { id: "service_3", name: "Service 3" },
    ]
  });

  console.log("Seeding mandatory provider records...");
  await prisma.provider.createMany({
    data: [
      { id: 1, name: "Provider 1", monthlyQuota: 10, leadsReceived: 0 },
      { id: 2, name: "Provider 2", monthlyQuota: 10, leadsReceived: 0 },
      { id: 3, name: "Provider 3", monthlyQuota: 10, leadsReceived: 0 },
      { id: 4, name: "Provider 4", monthlyQuota: 10, leadsReceived: 0 },
      { id: 5, name: "Provider 5", monthlyQuota: 10, leadsReceived: 0 },
      { id: 6, name: "Provider 6", monthlyQuota: 10, leadsReceived: 0 },
      { id: 7, name: "Provider 7", monthlyQuota: 10, leadsReceived: 0 },
      { id: 8, name: "Provider 8", monthlyQuota: 10, leadsReceived: 0 },
    ]
  });

  console.log("Initializing persistent round-robin distribution states...");
  await prisma.allocationState.createMany({
    data: [
      { serviceId: "service_1", lastProviderIndex: 0 },
      { serviceId: "service_2", lastProviderIndex: 0 },
      { serviceId: "service_3", lastProviderIndex: 0 },
    ]
  });

  console.log("🚀 Database seeding completed successfully!");
}

main()
  .catch((e) => {
    console.error("Seeding operation failed:", e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });