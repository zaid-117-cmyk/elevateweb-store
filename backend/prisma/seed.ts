import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

const mockProducts = [
  {
    id: 'prod-1-page-action-playbook',
    name: 'The 1-Page Action Playbook',
    description: 'Top 15 Self-Help Books Ka Asli Nichod',
    price: 19900, // 499 * 100 for paise
    fileKey: 'https://notion.so/your-1-page-action-playbook-template-link-here', // Notion Template URL
    imageUrl: 'https://images.unsplash.com/photo-1544716278-ca5e3f4abd8c?auto=format&fit=crop&w=1200&q=80',
  },
  {
    id: 'prod-action-masterplan',
    name: 'The Action Masterplan',
    description: 'Convert directionless ambition into an artificial boss. Stop watching tutorial videos, start executing binary checkboxes.',
    price: 29900, // 299 * 100
    fileKey: 'https://elevatewebs.notion.site/The-Gilbert-s-Law-Blueprint-3e92121cfb4a8145ad0ffa38a784c0ef', // Notion Template URL
    imageUrl: 'https://images.unsplash.com/photo-1611224885990-ab7363d1f2a9?auto=format&fit=crop&w=1200&q=80',
  }
];

async function main() {
  console.log("Cleaning up old orders and products...");
  const allowedIds = mockProducts.map(p => p.id);
  
  await prisma.order.deleteMany({
    where: {
      productId: { notIn: allowedIds }
    }
  });

  await prisma.product.deleteMany({
    where: {
      id: { notIn: allowedIds }
    }
  });

  console.log("Seeding custom products to match frontend mock data...");
  for (const product of mockProducts) {
    await prisma.product.upsert({
      where: { id: product.id },
      update: product,
      create: product,
    });
    console.log(`Created/Updated product: ${product.name}`);
  }
  console.log("✅ Seeding finished.");
}

main()
  .catch(console.error)
  .finally(() => prisma.$disconnect());
