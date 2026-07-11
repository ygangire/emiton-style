import "dotenv/config";
import { PrismaClient } from "@prisma/client";
import { PrismaPg } from "@prisma/adapter-pg";
import bcrypt from "bcryptjs";

const adapter = new PrismaPg({ connectionString: process.env.DATABASE_URL });
const prisma = new PrismaClient({ adapter });

async function main() {
  const adminRole = await prisma.role.upsert({
    where: { name: "ADMIN" },
    update: {},
    create: { name: "ADMIN" },
  });

  await prisma.role.upsert({
    where: { name: "MANAGER" },
    update: {},
    create: { name: "MANAGER" },
  });

  await prisma.role.upsert({
    where: { name: "EDITOR" },
    update: {},
    create: { name: "EDITOR" },
  });

  const hashedPassword = await bcrypt.hash("admin123", 10);

  await prisma.user.upsert({
    where: { email: "admin@emitonstyle.com" },
    update: {},
    create: {
      firstName: "System",
      lastName: "Admin",
      email: "admin@emitonstyle.com",
      password: hashedPassword,
      roleId: adminRole.id,
    },
  });

  console.log("Seed completed successfully 🚀");
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });

  await prisma.collection.createMany({
  data: [
    {
      name: "Men",
      slug: "men",
      description: "Men's fashion",
    },
    {
      name: "Ladies",
      slug: "ladies",
      description: "Ladies' fashion",
    },
    {
      name: "Teens",
      slug: "teens",
      description: "Teen fashion",
    },
    {
      name: "Kids",
      slug: "kids",
      description: "Kids' fashion",
    },
  ],
  skipDuplicates: true,
});