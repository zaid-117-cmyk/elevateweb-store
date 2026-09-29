import { PrismaClient } from '@prisma/client';
const prisma = new PrismaClient();
async function checkOrders() {
  const orders = await prisma.order.findMany({
    orderBy: { createdAt: 'desc' },
    take: 5
  });
  console.log('Recent Orders:', JSON.stringify(orders, null, 2));
}
checkOrders().finally(() => prisma.$disconnect());
