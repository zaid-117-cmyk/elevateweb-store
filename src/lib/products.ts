import { Product, ProductCategory } from '../types';

export const PRODUCTS: Product[] = [
  {
    id: 'prod-15-min-meditation',
    slug: 'the-15-minute-meditation',
    title: 'The 15-Minute Meditation',
    tagline: 'A guided cosmic journey to peace and clarity. Transform your chaotic mind into deep focus.',
    description: `Modern life is chaotic. Between notifications, deadlines, and infinite scrolling, your mind never gets a chance to truly rest. 

The 15-Minute Meditation is designed for the busy professional or student who doesn't have an hour to sit in silence. In just 15 minutes, you will be guided through a proven breathing and visualization sequence that resets your nervous system, clears brain fog, and prepares you for deep work.`,
    category: 'Master eBooks',
    featured: false,
    isNew: true,
    paymentUrl: 'https://rzp.io/rzp/Ck3JGEer',
    price: {
      standard: 299
    },
    originalPrice: {
      standard: 599
    },
    rating: 4.8,
    reviewCount: 42,
    salesCount: 310,
    tags: ['Meditation', 'Focus', 'Audio', 'Mindfulness'],
    bannerImage: '/meditation_cover.jpg',
    galleryImages: [
      '/meditation_cover.jpg'
    ],
    deliverables: [
      { name: 'The 15-Minute Meditation Guide', format: 'PDF', size: 'Included' }
    ],
    features: [
      'Rapid Nervous System Reset: Go from anxious to calm in under 5 minutes.',
      'Designed for Busy Schedules: Only requires 15 minutes of your day.',
      'Science-Backed Visualization: Uses proven techniques to clear brain fog.',
      'Lifetime Access: Download the PDF guide instantly upon purchase.'
    ],
    techStack: ['PDF', 'Mobile Optimized', 'Printable'],
    compatibility: ['Mac', 'Windows', 'iPhone', 'Android', 'iPad'],
    version: '1.0.0',
    lastUpdated: 'October 2026',
    reviews: [
      {
        id: 'rev-meditation-1',
        author: 'Arjun M.',
        role: 'Software Engineer',
        avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=150&q=80',
        rating: 5,
        date: '1 week ago',
        content: 'This is the only meditation routine that has actually worked for me. Short, practical, and incredibly effective for resetting before a deep coding session.'
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
    paymentUrl: 'https://rzp.io/rzp/BgYZCO8A',
    price: {
      standard: 299
    },
    originalPrice: {
      standard: 999
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
  },

  {
    id: 'prod-pricing-calculator',
    slug: 'pricing-calculator',
    title: 'The 3-Minute Freelancer & Agency Pricing Calculator',
    tagline: 'An automated multi-tab Google Sheet that eliminates guesswork pricing by calculating your exact walk-away floor and structuring a 3-tier anchor proposal in under 3 minutes.',
    description: `An automated multi-tab Google Sheet that eliminates guesswork pricing by calculating your exact walk-away floor, structuring a 3-tier anchor proposal, and deploying pre-written scope-creep protection scripts in under 3 minutes.

Designed specifically for freelancers, web developers, video editors, and solo agencies.

WHAT IT IS:
A battle-tested 3-Tab Master Google Sheet template (Price Engine, 3-Tier Proposal Generator, and Scope-Creep Shield). Works natively in Google Sheets, Microsoft Excel, and Notion.

WHAT IT DOES:
1. Takes 6 raw project inputs (target monthly income, billable hours per week, project build hours, direct costs, tax/gateway buffer %, and client revision risk multiplier) and calculates your exact Walk-Away Floor Price and 1.5x Overtime Rate.
2. Automatically scales that floor into a professional 3-Tier Anchor Proposal (Essential 1.0x, Growth 1.4x, VIP Sprint 2.2x) with pre-calculated 50% deposits and monthly retainer upsells.
3. Generates copy-paste WhatsApp/Email scripts and contract clauses that enforce out-of-scope billing ($87/hr) and project pause terms when clients stall or ask for extra work.

WHAT IT IS NOT:
It is NOT AI software, it is NOT an automated SaaS app, and it does NOT magically close clients for you. It is an advanced, automated calculation and proposal spreadsheet template.`,
    category: 'Dashboards',
    featured: true,
    isNew: true,
    paymentUrl: 'https://rzp.io/rzp/uk5DvJq',
    price: {
      standard: 1499
    },
    originalPrice: {
      standard: 4999
    },
    rating: 4.96,
    reviewCount: 384,
    salesCount: 1420,
    tags: ['Google Sheets', 'Pricing Calculator', 'Freelancer Tools', 'Agency OS', 'Proposal Generator'],
    bannerImage: '/pricing_calculator_mockup.jpg',
    galleryImages: [
      '/pricing_calculator_mockup.jpg'
    ],
    deliverables: [
      { name: 'Tab 1: The 6-Input Price Engine', format: 'Google Sheets', size: '1-Click Copy' },
      { name: 'Tab 2: The 3-Tier Proposal Generator', format: 'Google Sheets', size: 'Included' },
      { name: 'Tab 3: The Scope-Creep Shield & 4 Scripts', format: 'Text & Sheets', size: 'Included' },
      { name: 'Quick-Start Setup & Implementation Guide', format: 'PDF & Notion', size: 'Included' }
    ],
    features: [
      'Tab 1 (Price Engine): 6 raw inputs calculating true hourly survival rate, tax/gateway buffers, walk-away floor, and 1.5x overtime rate.',
      'Tab 2 (3-Tier Proposal): Auto-generates Essential (1.0x), Growth (1.4x), and VIP Sprint (2.2x) packages + 50% deposits & client pitch message.',
      'Tab 3 (Scope-Creep Shield): Pre-written negotiation and contract clauses charging $87/hr for extra requests and project pause terms.',
      'Zero Software Subscriptions: 100% plug-and-play Google Sheet (works in Excel & Notion too).',
      'Instant Automated Access: 1-click private Google Drive duplicate right after checkout.'
    ],
    techStack: ['Google Sheets', 'Microsoft Excel', 'Notion Compatible'],
    compatibility: ['Mac', 'Windows', 'iPhone', 'Android', 'iPad'],
    version: '2.4.0',
    lastUpdated: 'October 2026',
    reviews: [
      {
        id: 'rev-calc-1',
        author: 'Devansh K.',
        role: 'Design Agency Founder',
        avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=150&q=80',
        rating: 5,
        date: '3 days ago',
        content: 'I plugged in my numbers in Tab 1 and used the Growth tier anchor proposal from Tab 2. The out-of-scope script in Tab 3 gave me the exact words to charge for extra requests without feeling awkward.'
      },
      {
        id: 'rev-calc-2',
        author: 'Sarah Jenkins',
        role: 'Full-Stack Freelancer',
        avatar: 'https://images.unsplash.com/photo-1517841905240-472988babdf9?auto=format&fit=crop&w=150&q=80',
        rating: 5,
        date: '1 week ago',
        content: 'I was undercharging by almost 40% because I never calculated non-billable hours and taxes into my baseline. This sheet took 3 minutes to reveal my real floor price.'
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
