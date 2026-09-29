import { PrismaClient } from '@prisma/client';
const prisma = new PrismaClient();
async function fix() {
  await prisma.product.update({
    where: { id: 'prod-1-page-action-playbook' },
    data: { fileKey: 'the-1-page-action-playbook.pdf' }
  });
  console.log('Fixed DB fileKey to .pdf');
}
fix().finally(() => prisma.$disconnect());
