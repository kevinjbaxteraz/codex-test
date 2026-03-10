import { PrismaClient, HubClass, PlatformRole, VehicleClass } from '@prisma/client';

const prisma = new PrismaClient();

async function main() {
  const admin = await prisma.user.upsert({
    where: { email: 'admin@example.com' },
    update: {},
    create: {
      email: 'admin@example.com',
      fullName: 'Platform Admin',
      roleMemberships: { create: [{ role: PlatformRole.ADMIN }] }
    }
  });

  const driver = await prisma.user.upsert({
    where: { email: 'driver@example.com' },
    update: {},
    create: {
      email: 'driver@example.com',
      fullName: 'Pilot Driver',
      roleMemberships: { create: [{ role: PlatformRole.DRIVER }] },
      driverProfile: { create: { approved: true, vehicleClass: VehicleClass.PICKUP_GOOSENECK } }
    }
  });

  await prisma.hub.upsert({
    where: { id: 'pilot-hub-c' },
    update: {},
    create: {
      id: 'pilot-hub-c',
      name: 'Pilot Class C Hub',
      hubClass: HubClass.C,
      address: 'Ashton-to-Ucon Corridor',
      isActive: true,
      capabilities: {
        create: [
          { code: 'HAY_TRANSFER', enabled: true },
          { code: 'TRAILER_TRANSFER', enabled: true }
        ]
      }
    }
  });

  await prisma.trainingModule.createMany({
    data: [
      {
        role: PlatformRole.DRIVER,
        title: 'Driver Onboarding and Safety Basics',
        videoUrl: 'https://example.com/training/driver-basics'
      },
      {
        role: PlatformRole.HUB_HOST_OWNER,
        title: 'Hub Handoff and Verification Workflow',
        videoUrl: 'https://example.com/training/hub-handoff'
      },
      {
        role: PlatformRole.VENDOR_OWNER,
        title: 'Vendor Fulfillment and Packaging Standards',
        videoUrl: 'https://example.com/training/vendor-fulfillment'
      }
    ],
    skipDuplicates: true
  });

  console.log(`Seeded admin ${admin.email} and driver ${driver.email}`);
}

main()
  .catch((error) => {
    console.error(error);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
