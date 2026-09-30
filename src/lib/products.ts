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
      standard: 199,
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
    id: 'prod-action-masterplan',
    slug: 'the-action-masterplan',
    title: 'The Action Masterplan',
    tagline: 'Convert directionless ambition into an artificial boss. Stop watching tutorial videos, start executing binary checkboxes.',
    description: `The biggest problem at work is that no one tells you what to do. You are used to spoon-fed systems. Without an authority figure, you freeze, consume infinite self-improvement/roadmap videos ("tutorial hell"), and execute zero real-world actions.

The Action Masterplan is your artificial boss—a rigid operating system that forces you to pick one track, deconstruct it, and execute it daily with binary checkboxes.

Includes 4 Core Modules: The Reality Check (Aaina), Goal Deconstruction Engine, Daily Execution Dashboard, and The Solo Troubleshooting Protocol.`,
    category: 'Dashboards',
    featured: true,
    isNew: true,
    price: {
      standard: 299,
      team: 1499
    },
    originalPrice: {
      standard: 999,
      team: 2999
    },
    rating: 4.95,
    reviewCount: 156,
    salesCount: 890,
    tags: ['Notion Template', 'Execution', 'Career OS', 'Productivity'],
    bannerImage: '/action_masterplan_dashboard.jpg',
    galleryImages: [
      '/action_masterplan_dashboard.jpg',
      '/action_masterplan_laptop.jpg'
    ],
    deliverables: [
      { name: 'Complete Notion Workspace Template', format: 'Notion', size: 'Access Link' },
      { name: 'Cold Outreach Rolodex (5 Templates)', format: 'Text', size: 'Included' },
      { name: 'Goal Deconstruction Matrix', format: 'Notion Database', size: 'Included' }
    ],
    features: [
      'The Reality Check (Aaina): 48-Hour Uncensored Audit & Time/Distraction Leak Tracker',
      'Goal Deconstruction Engine: Reverse-engineer 1-Year Outcome to Daily Binary Checklists',
      'Daily Execution Dashboard: Realistic Headstart Tracker & Eisenhower Focus Quadrant',
      'Solo Troubleshooting Protocol: 15-minute Information Hunting SOP & Cold Pitch Templates'
    ],
    techStack: ['Notion', 'Mobile Optimized', 'Dark Mode Ready'],
    compatibility: ['Mac', 'Windows', 'iPhone', 'Android', 'iPad'],

    version: '1.0.0',
    lastUpdated: 'September 2026',
    reviews: [
      {
        id: 'rev-action-masterplan-1',
        author: 'Karan Singh',
        role: 'College Sophomore',
        avatar: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&w=150&q=80',
        rating: 5,
        date: '2 days ago',
        content: 'I used to watch 5 hours of podcast advice daily and do nothing. This template forced me to actually write code and send cold DMs. The daily binary checklist is ruthless but necessary.'
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
