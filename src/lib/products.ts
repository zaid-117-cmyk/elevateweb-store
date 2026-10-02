import { Product, ProductCategory } from '../types';

export const PRODUCTS: Product[] = [

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
    paymentUrl: 'https://rzp.io/rzp/BgYZCO8A',
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
