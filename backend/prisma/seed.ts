import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

const mockProducts = [
  {
    id: 'prod-1-page-action-playbook',
    name: 'The 1-Page Action Playbook',
    description: 'Top 15 Self-Help Books Ka Asli Nichod',
    price: 49900, // 499 * 100 for paise
    fileKey: 'the-1-page-action-playbook.zip', // fake file key for now
    imageUrl: 'https://images.unsplash.com/photo-1544716278-ca5e3f4abd8c?auto=format&fit=crop&w=1200&q=80',
  },
  {
    id: 'prod-nexus-saas',
    name: 'Nexus SaaS Fullstack Starter Kit',
    description: 'Ship production-ready SaaS in 48 hours with Next.js 15, Supabase, Tailwind, & Razorpay.',
    price: 8900, // 89 * 100
    fileKey: 'nexus-saas-starter-kit.zip',
    imageUrl: 'https://images.unsplash.com/photo-1551288049-bebda4e38f71?auto=format&fit=crop&w=1200&q=80',
  },
  {
    id: 'prod-glassui-design-system',
    name: 'GlassUI Premium Design System & UI Kit',
    description: '500+ crafted dark-mode glassmorphic components for Figma & React Tailwind.',
    price: 6900,
    fileKey: 'glassui-premium-design-system.zip',
    imageUrl: 'https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?auto=format&fit=crop&w=1200&q=80',
  },
  {
    id: 'prod-zenith-3d-icons',
    name: 'Zenith 3D Holographic & Abstract Asset Pack',
    description: '120+ cinema-grade 3D meshes and renders for luxury websites and landing pages.',
    price: 4900,
    fileKey: 'zenith-3d-abstract-icons-pack.zip',
    imageUrl: 'https://images.unsplash.com/photo-1633356122544-f134324a6cee?auto=format&fit=crop&w=1200&q=80',
  },
  {
    id: 'prod-pulse-ai-dashboard',
    name: 'Pulse AI Agent & Analytics Dashboard Template',
    description: 'High-density dark dashboard with real-time charts, prompt playground, & billing UI.',
    price: 7900,
    fileKey: 'pulse-ai-analytics-dashboard.zip',
    imageUrl: 'https://images.unsplash.com/photo-1551288049-bebda4e38f71?auto=format&fit=crop&w=1200&q=80',
  },
  {
    id: 'prod-hyperflow-portfolio',
    name: 'HyperFlow Developer Portfolio & Blog Engine',
    description: 'Ultra-fast MDX portfolio template with 3D code viewer, GSAP smooth scroll, & SEO.',
    price: 3900,
    fileKey: 'hyperflow-developer-portfolio-engine.zip',
    imageUrl: 'https://images.unsplash.com/photo-1498050108023-c5249f4df085?auto=format&fit=crop&w=1200&q=80',
  }
];

async function main() {
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
