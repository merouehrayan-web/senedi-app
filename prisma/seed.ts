import "dotenv/config";
import { PrismaClient } from "@prisma/client";
import { PrismaPg } from "@prisma/adapter-pg";
import bcrypt from "bcryptjs";

const adapter = new PrismaPg({ connectionString: process.env.DATABASE_URL! });
const prisma = new PrismaClient({ adapter });

async function main() {
  const password = await bcrypt.hash("admin123", 10);
  await prisma.admin.upsert({
    where: { email: "admin@senedi-sm.com" },
    update: { password },
    create: {
      email: "admin@senedi-sm.com",
      password,
      nom: "Admin SENEDI",
    },
  });
  console.log("✅ Admin créé : admin@senedi-sm.com / admin123");
}

main()
  .catch(console.error)
  .finally(() => prisma.$disconnect());
