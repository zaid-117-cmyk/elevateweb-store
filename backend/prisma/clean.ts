import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

async function main() {
  await prisma.order.deleteMany({});
  await prisma.product.deleteMany({});
  console.log("🧹 All dummy products have been completely deleted from your database.");
}

main()
  .catch(console.error)
  .finally(() => prisma.$disconnect());
