import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

async function main() {
  console.log("Ready for your custom products.");
}

main()
  .catch(console.error)
  .finally(() => prisma.$disconnect());
