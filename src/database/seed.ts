import { PrismaClient } from "@prisma/client";
const prisma = new PrismaClient();
async function main() {
    const tenant = await prisma.tenant.upsert({
        where: {
            tenantId: "1",
        },
        update: {},
        create: {
            tenantId: "1",
            name: "Master Tenant",
            notificationPreference: false,
        }
    });

    const user = await prisma.user.upsert({
      where: {
        userId: "1",
      },
      update: {},
      create: {
        userId: "1",
        name: "Master Admin",
        email: "admin@master.com",
        role: "SUPADMIN",
        tenantId: "1",
        verified: "admin@master.comMaster Admin1",
      },
    });

    console.log("Seed complete");
    console.log({ tenant, user });
}
main()
  .then(async () => {
    await prisma.$disconnect();
  })
  .catch(async (e) => {
    console.error(e);
    await prisma.$disconnect();
    process.exit(1);
  });
