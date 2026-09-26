import { Product, ProductCategory } from '../types';

export const PRODUCTS: Product[] = [
  {
    id: 'prod-1-page-action-playbook',
    slug: 'the-1-page-action-playbook',
    title: 'The 1-Page Action Playbook',
    tagline: 'Top 15 Self-Help Books Ka Asli Nichod • Simple Hinglish Action Sheets • Zero Boring Gyan.',
    description: `Moti kitabein padhna chhodo, direct action shuru karo. The 1-Page Action Playbook distills the world's top 15 self-help and performance masterworks into direct, 1-page Hinglish action sheets.

No 300-page boring filler. Each sheet breaks down the core problem, the 4-step execution framework, real-life examples, action checklists, and word glossaries (Shabdkosh).

Includes 15 Master Chapters covering Atomic Habits, Deep Work, Can't Hurt Me, 48 Laws of Power, The Subtle Art of Not Giving a F*ck, Ikigai, and Build, Don't Talk.`,
    category: 'Master eBooks',
    featured: true,
    isNew: true,
    price: {
      standard: 499,
      team: 999
    },
    originalPrice: {
      standard: 999,
      team: 1999
    },
    rating: 4.99,
    reviewCount: 342,
    salesCount: 3800,
    tags: ['Classic Vintage Edition', 'Hinglish Sheets', 'Atomic Habits', 'Deep Work', 'Zero Reading Friction'],
    bannerImage: 'https://images.unsplash.com/photo-1544716278-ca5e3f4abd8c?auto=format&fit=crop&w=1200&q=80',
    galleryImages: [
      'https://images.unsplash.com/photo-1544716278-ca5e3f4abd8c?auto=format&fit=crop&w=1200&q=80',
      'https://images.unsplash.com/photo-1507238691740-187a5b1d37b8?auto=format&fit=crop&w=1200&q=80',
      'https://images.unsplash.com/photo-1460925895917-afdab827c52f?auto=format&fit=crop&w=1200&q=80',
      'https://images.unsplash.com/photo-1518770660439-4636190af475?auto=format&fit=crop&w=1200&q=80'
    ],
    deliverables: [
      { name: '15 High-Res 1-Page Action Sheets', format: 'PDF & ePub', size: '24.2 MB' },
      { name: 'Printable Vintage Edition Sheets (A4 / Tablet)', format: 'Print-Ready PDF', size: '18.5 MB' },
      { name: 'Karna Kya Hai Execution Checklists', format: 'Action Framework', size: 'Included' },
      { name: 'Complete Shabdkosh (Word Meaning) Guide', format: 'Glossary Sheet', size: 'Included' },
      { name: 'Lifetime Updates & Future Chapter Additions', format: 'Direct Access', size: 'Instant' }
    ],
    features: [
      'Atomic Habits: Habit Remote Control, Table Ka Khel & 2-Minute Rule',
      'Deep Work: Focus Ke 4 Tarike, 30 Din Ka Phone Detox & Shutdown Ritual',
      'Can\'t Hurt Me: The 40% Rule, The Mirror Test & Taking Souls Protocol',
      '48 Laws of Power: Chalak Logo Se Bacho & Chup Rehne Ki Taqat',
      'The Subtle Art: Overthinking Loop & Sasti Problems Chhodna Seekho',
      'Ikigai & Build Don\'t Talk: Career Sweet Spot & 3-Line Cold Outreach Pitch'
    ],
    techStack: ['PDF', 'ePub', 'Printable A4', 'Mobile Optimized'],
    compatibility: ['iPhone', 'Android', 'iPad', 'Kindle', 'Mac', 'Windows', 'Physical Print'],
    version: '2026 Classic Vintage Edition',
    lastUpdated: 'September 2026',
    reviews: [
      {
        id: 'rev-playbook-1',
        author: 'Rahul Sharma',
        role: 'Computer Science Student',
        avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=150&q=80',
        rating: 5,
        date: 'Yesterday',
        content: 'Main pehle Atomic Habits aur Deep Work lakar table par sajata tha, padhta kabhi nahi tha. Yeh 1-page action sheet ne 15 minute mein pura concept clear kar diya aur maine phone dusre kamre mein rakhna shuru kar diya.'
      },
      {
        id: 'rev-playbook-2',
        author: 'Priya Verma',
        role: 'Digital Marketer & Freelancer',
        avatar: 'https://images.unsplash.com/photo-1517841905240-472988babdf9?auto=format&fit=crop&w=150&q=80',
        rating: 5,
        date: '3 days ago',
        content: 'The Hinglish explanation with "Karna Kya Hai" action boxes is pure genius. Zero boring theory, 100% direct implementation. Worth 10x the price.'
      }
    ]
  },
  {
    id: 'prod-nexus-saas',
    slug: 'nexus-saas-starter-kit',
    title: 'Nexus SaaS Fullstack Starter Kit',
    tagline: 'Ship production-ready SaaS in 48 hours with Next.js 15, Supabase, Tailwind, & Razorpay.',
    description: `Nexus is the premier enterprise-grade SaaS boilerplate built for modern founders and engineers. It includes multi-tenancy, authentication with email/password & social OAuth, role-based access control, billing with Razorpay webhooks, customer portal, email sequences with Resend, dark mode UI, and end-to-end type safety.

Save over 160 hours of repetitive boilerplate engineering and focus purely on your unique value proposition.`,
    category: 'SaaS Boilerplates',
    featured: true,
    isNew: true,
    price: {
      standard: 89,
      team: 189
    },
    originalPrice: {
      standard: 149,
      team: 299
    },
    rating: 4.95,
    reviewCount: 142,
    salesCount: 1850,
    tags: ['Next.js 15', 'TypeScript', 'Supabase', 'Tailwind CSS', 'Razorpay', 'Turborepo'],
    bannerImage: 'https://images.unsplash.com/photo-1551288049-bebda4e38f71?auto=format&fit=crop&w=1200&q=80',
    galleryImages: [
      'https://images.unsplash.com/photo-1551288049-bebda4e38f71?auto=format&fit=crop&w=1200&q=80',
      'https://images.unsplash.com/photo-1460925895917-afdab827c52f?auto=format&fit=crop&w=1200&q=80',
      'https://images.unsplash.com/photo-1507238691740-187a5b1d37b8?auto=format&fit=crop&w=1200&q=80',
      'https://images.unsplash.com/photo-1526374965328-7f61d4dc18c5?auto=format&fit=crop&w=1200&q=80'
    ],
    demoUrl: 'https://demo.nexus-saas.elevateweb.me',
    deliverables: [
      { name: 'Complete Next.js 15 Source Code', format: 'ZIP / GitHub Repo', size: '24.5 MB' },
      { name: 'Supabase SQL Migrations & Schema', format: 'SQL Files', size: '2.1 MB' },
      { name: 'Figma UI System & Wireframes', format: '.fig', size: '42.0 MB' },
      { name: 'Comprehensive Video Setup Guide', format: '4K MP4 (60 mins)', size: '840 MB' },
      { name: 'Full Commercial License', format: 'PDF', size: '150 KB' }
    ],
    features: [
      'Next.js 15 App Router + React Server Components',
      'Complete Supabase SSR Auth with MFA and OAuth',
      'Ready-to-deploy Razorpay Subscription & One-time billing',
      'Pre-built Admin Dashboard with Analytics & User Management',
      'Transactional emails configured with Resend & React Email',
      'Full TypeScript strict checking & automated ESLint/Prettier'
    ],
    techStack: ['Next.js 15', 'React 18', 'TypeScript', 'Tailwind CSS', 'Supabase', 'Razorpay', 'Prisma'],
    compatibility: ['Node.js >= 18', 'Vercel', 'Docker', 'AWS', 'Netlify'],
    version: '2.4.0',
    lastUpdated: 'September 2026',
    reviews: [
      {
        id: 'rev-1',
        author: 'Marcus Vance',
        role: 'Founder @ SynthHQ',
        avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=150&q=80',
        rating: 5,
        date: '3 days ago',
        content: 'I launched my micro-SaaS in 48 hours using Nexus. The authentication and Razorpay webhook logic worked out of the box with zero headache.'
      },
      {
        id: 'rev-2',
        author: 'Ananya Sharma',
        role: 'Fullstack Consultant',
        avatar: 'https://images.unsplash.com/photo-1517841905240-472988babdf9?auto=format&fit=crop&w=150&q=80',
        rating: 5,
        date: '1 week ago',
        content: 'Clean code architecture, clean modular components, and outstanding documentation. ElevateWeb sets the gold standard for developer templates.'
      }
    ]
  },
  {
    id: 'prod-glassui-design-system',
    slug: 'glassui-premium-design-system',
    title: 'GlassUI Premium Design System & UI Kit',
    tagline: '500+ crafted dark-mode glassmorphic components for Figma & React Tailwind.',
    description: `Elevate your digital products with GlassUI, a meticulously engineered design system that blends optical translucency, micro-lensing, and crisp typography.

Designed for high-end web applications, crypto fintech, AI tooling, and luxury consumer tech. Features auto-layout 5.0 in Figma and modular React component equivalents with Framer Motion physics.`,
    category: 'UI Kits & Design',
    featured: true,
    isNew: false,
    price: {
      standard: 69,
      team: 149
    },
    originalPrice: {
      standard: 119,
      team: 249
    },
    rating: 4.98,
    reviewCount: 98,
    salesCount: 2410,
    tags: ['Figma AutoLayout', 'React 18', 'Tailwind CSS', 'Framer Motion', 'Tokens'],
    bannerImage: 'https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?auto=format&fit=crop&w=1200&q=80',
    galleryImages: [
      'https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?auto=format&fit=crop&w=1200&q=80',
      'https://images.unsplash.com/photo-1634017839464-5c339ebe3cb4?auto=format&fit=crop&w=1200&q=80',
      'https://images.unsplash.com/photo-1607604276583-eef5d076aa5f?auto=format&fit=crop&w=1200&q=80'
    ],
    demoUrl: 'https://glassui.elevateweb.me',
    deliverables: [
      { name: 'Figma Master File (500+ Variants)', format: '.fig', size: '78.4 MB' },
      { name: 'React Component Library (TSX)', format: 'NPM Package / ZIP', size: '12.8 MB' },
      { name: 'Tailwind Config & Token Definitions', format: '.json / .js', size: '1.2 MB' },
      { name: 'Icon Pack (350+ Vector SVGs)', format: 'SVG / React Icons', size: '6.4 MB' }
    ],
    features: [
      '500+ components with dark & light theme tokens',
      'WCAG AA compliant color contrast ratios built-in',
      'Framer Motion spring physics for buttons, modals, & tooltips',
      'Production-tested across Safari, Chrome, and Firefox',
      'Design tokens for colors, shadows, borders, and typography'
    ],
    techStack: ['Figma', 'React', 'TypeScript', 'Tailwind CSS', 'Framer Motion'],
    compatibility: ['Figma Desktop/Web', 'React 18+', 'Tailwind v3+'],
    version: '3.1.2',
    lastUpdated: 'September 2026',
    reviews: [
      {
        id: 'rev-3',
        author: 'Elena Rostova',
        role: 'Lead Product Designer',
        avatar: 'https://images.unsplash.com/photo-1544005313-94ddf0286df2?auto=format&fit=crop&w=150&q=80',
        rating: 5,
        date: '2 weeks ago',
        content: 'The glassmorphic lighting and depth in this system are unreal. My client was blown away by our mockups.'
      }
    ]
  },
  {
    id: 'prod-zenith-3d-icons',
    slug: 'zenith-3d-abstract-icons-pack',
    title: 'Zenith 3D Holographic & Abstract Asset Pack',
    tagline: '120+ cinema-grade 3D meshes and renders for luxury websites and landing pages.',
    description: `Infuse depth, energy, and visual spectacle into your digital interfaces. Zenith includes 120+ 3D abstract shapes, cybernetic geometries, floating isometric tech items, and holographic icons.

Rendered in transparent 4K PNGs with metallic reflections, plus original Blender 4.2 project files with ready-to-tweak shaders and lighting setups.`,
    category: '3D & Graphics',
    featured: false,
    isNew: true,
    price: {
      standard: 49,
      team: 119
    },
    originalPrice: {
      standard: 79,
      team: 179
    },
    rating: 4.88,
    reviewCount: 64,
    salesCount: 1130,
    tags: ['Blender 4.2', '4K PNG', 'GLTF/GLB', 'Metallic Shaders', 'Three.js'],
    bannerImage: 'https://images.unsplash.com/photo-1633356122544-f134324a6cee?auto=format&fit=crop&w=1200&q=80',
    galleryImages: [
      'https://images.unsplash.com/photo-1633356122544-f134324a6cee?auto=format&fit=crop&w=1200&q=80',
      'https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?auto=format&fit=crop&w=1200&q=80',
      'https://images.unsplash.com/photo-1634017839464-5c339ebe3cb4?auto=format&fit=crop&w=1200&q=80'
    ],
    demoUrl: 'https://3d.elevateweb.me',
    deliverables: [
      { name: '120+ Transparent 4K Rendered PNGs', format: 'PNG (3840x2160)', size: '1.4 GB' },
      { name: 'Blender 4.2 Source Files with Shaders', format: '.blend', size: '680 MB' },
      { name: 'Optimized Web GLTF/GLB Models', format: '.glb', size: '120 MB' },
      { name: 'Three.js Interactive Viewer Template', format: 'HTML / JS', size: '8.5 MB' }
    ],
    features: [
      'Ultra high-res 4K renders with alpha channels',
      'Fully customizable material nodes in Blender (Cycles/EEVEE)',
      'Optimized polycount for real-time web 3D (Three.js/Spline)',
      'Consistent dark-mode lighting palette (Amber, Cyan, Obsidian)',
      'Commercial usage royalty-free'
    ],
    techStack: ['Blender 4.2', 'Cycles', 'Three.js', 'WebGL', 'Figma'],
    compatibility: ['Blender 3.6+', 'Three.js', 'Figma', 'Photoshop'],
    version: '1.2.0',
    lastUpdated: 'August 2026',
    reviews: [
      {
        id: 'rev-4',
        author: 'Devon Miles',
        role: 'Creative Director',
        avatar: 'https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?auto=format&fit=crop&w=150&q=80',
        rating: 5,
        date: '3 weeks ago',
        content: 'These 3D assets immediately raised the perceived value of our landing page. The GLB files were easily imported into our React Three Fiber canvas.'
      }
    ]
  },
  {
    id: 'prod-pulse-ai-dashboard',
    slug: 'pulse-ai-analytics-dashboard',
    title: 'Pulse AI Agent & Analytics Dashboard Template',
    tagline: 'High-density dark dashboard with real-time charts, prompt playground, & billing UI.',
    description: `Pulse is a specialized admin and analytics dashboard template designed for AI companies, LLM wrappers, and SaaS metrics.

Featuring 30+ interactive dashboard views: LLM token expenditure charts, prompt tuning playground, vector database status, team seats management, and usage limits. Built with React 18, Tailwind CSS, Lucide icons, and Recharts.`,
    category: 'Dashboards',
    featured: true,
    isNew: false,
    price: {
      standard: 79,
      team: 169
    },
    originalPrice: {
      standard: 129,
      team: 269
    },
    rating: 4.92,
    reviewCount: 89,
    salesCount: 1640,
    tags: ['React 18', 'Tailwind CSS', 'Recharts', 'AI UI', 'Dark Mode'],
    bannerImage: 'https://images.unsplash.com/photo-1551288049-bebda4e38f71?auto=format&fit=crop&w=1200&q=80',
    galleryImages: [
      'https://images.unsplash.com/photo-1551288049-bebda4e38f71?auto=format&fit=crop&w=1200&q=80',
      'https://images.unsplash.com/photo-1504868584819-f8e8b4b6d7e3?auto=format&fit=crop&w=1200&q=80',
      'https://images.unsplash.com/photo-1526374965328-7f61d4dc18c5?auto=format&fit=crop&w=1200&q=80'
    ],
    demoUrl: 'https://pulse.elevateweb.me',
    deliverables: [
      { name: 'React + Vite Application Codebase', format: 'ZIP', size: '18.2 MB' },
      { name: 'Tailwind CSS & Chart Theme Plugins', format: '.js / .ts', size: '840 KB' },
      { name: 'Mock API Data & Schema Generators', format: 'JSON / TS', size: '1.4 MB' },
      { name: 'Documentation & Architecture Guide', format: 'Markdown', size: '320 KB' }
    ],
    features: [
      '30+ production-grade responsive dashboard layouts',
      'Interactive token usage & cost forecasting charts',
      'Streaming prompt test-bench UI with markdown rendering',
      'Filterable data tables with sorting, pagination, and export',
      'Modular widget architecture for easy drag-and-drop'
    ],
    techStack: ['React 18', 'TypeScript', 'Tailwind CSS', 'Recharts', 'Lucide React'],
    compatibility: ['Vite', 'Next.js', 'Remix', 'Gatsby'],
    version: '2.1.0',
    lastUpdated: 'September 2026',
    reviews: [
      {
        id: 'rev-5',
        author: 'Liam Chen',
        role: 'CTO @ Cortex Labs',
        avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=150&q=80',
        rating: 5,
        date: '5 days ago',
        content: 'Saved us at least 3 weeks of frontend development on our AI agent platform. The responsive charts and prompt playground are flawless.'
      }
    ]
  },
  {
    id: 'prod-hyperflow-portfolio',
    slug: 'hyperflow-developer-portfolio-engine',
    title: 'HyperFlow Developer Portfolio & Blog Engine',
    tagline: 'Ultra-fast MDX portfolio template with 3D code viewer, GSAP smooth scroll, & SEO.',
    description: `Showcase your engineering mastery with HyperFlow. Designed specifically for senior engineers, indie hackers, and technical leaders who want a portfolio that commands attention.

Features buttery-smooth scroll animations powered by GSAP and Lenis, interactive code blocks with copy/diff previews, dynamic MDX blog with reading time estimation, GitHub stats integration, and 100/100 Lighthouse performance.`,
    category: 'SaaS Boilerplates',
    featured: false,
    isNew: true,
    price: {
      standard: 39,
      team: 89
    },
    originalPrice: {
      standard: 59,
      team: 139
    },
    rating: 4.96,
    reviewCount: 47,
    salesCount: 920,
    tags: ['React 18', 'GSAP', 'Lenis', 'Tailwind CSS', 'MDX Blog'],
    bannerImage: 'https://images.unsplash.com/photo-1498050108023-c5249f4df085?auto=format&fit=crop&w=1200&q=80',
    galleryImages: [
      'https://images.unsplash.com/photo-1498050108023-c5249f4df085?auto=format&fit=crop&w=1200&q=80',
      'https://images.unsplash.com/photo-1555066931-4365d14bab8c?auto=format&fit=crop&w=1200&q=80',
      'https://images.unsplash.com/photo-1517694712202-14dd9538aa97?auto=format&fit=crop&w=1200&q=80'
    ],
    demoUrl: 'https://hyperflow.elevateweb.me',
    deliverables: [
      { name: 'Complete Source Code (Vite + React + TS)', format: 'ZIP', size: '14.6 MB' },
      { name: '10 Pre-written MDX Tech Article Templates', format: '.mdx', size: '1.8 MB' },
      { name: 'Custom GSAP Interactive Effects Library', format: '.ts', size: '420 KB' }
    ],
    features: [
      '100/100 Lighthouse performance out of the box',
      'Synchronized GSAP + Lenis scroll experiences',
      'Dynamic project showcase with live demo iframes',
      'Syntax highlighted code tabs with line highlighting',
      'Contact form ready with serverless endpoint handler'
    ],
    techStack: ['React', 'TypeScript', 'Tailwind CSS', 'GSAP', 'Lenis', 'Lucide React'],
    compatibility: ['Vite', 'Cloudflare Pages', 'Vercel', 'Netlify'],
    version: '1.0.4',
    lastUpdated: 'August 2026',
    reviews: [
      {
        id: 'rev-6',
        author: 'Samantha Reed',
        role: 'Senior Staff Engineer',
        avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=150&q=80',
        rating: 5,
        date: '1 week ago',
        content: 'Within 2 days of deploying HyperFlow, I received 3 inbound contracts. The GSAP animations and dark theme look astonishing.'
      }
    ]
  }
];

export const CATEGORIES: ProductCategory[] = [
  'All',
  'SaaS Boilerplates',
  'UI Kits & Design',
  '3D & Graphics',
  'Dashboards'
];
