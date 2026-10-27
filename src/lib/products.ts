import { Product, ProductCategory } from '../types';

export const PRODUCTS: Product[] = [
  {
    id: 'prod-self-trust-protocol',
    slug: 'the-self-trust-protocol',
    title: 'The Self-Trust Protocol',
    tagline: 'Rewire focus, break dopamine addiction, and build unshakeable confidence in a distracted world.',
    description: `Modern society has engineered a psychological trap: billion-dollar algorithms designed to fragment your attention, paired with an unedited highlight reel on social media that fuels chronic self-doubt.

The Self-Trust Protocol is a comprehensive, 49-page illustrated eBook written specifically for ages 16–30 who are tired of feeling like spectators in their own lives. It dismantles the myth of "laziness" and gives you the exact biological protocols to defeat dopamine addiction, close the Intention-Action Gap, and build quiet, unshakeable confidence.

WHAT'S INSIDE THIS 49-PAGE ILLUSTRATED MASTER EBOOK:
• 10 Neuro-Informed Chapters: Plain-English neuroscience without academic jargon.
• 11 High-Resolution Custom Illustrations: Visual mental models mapping your brain's reward circuits.
• The 20-Foot Phone Air-Gap & 45-Minute Morning Shield: Reclaiming baseline sensory focus.
• Overcoming Emotional Task-Aversion: Why procrastination is an emotional defense, not poor time management.
• The 5-Minute Micro-Ramp: Using kinetic momentum and the Zeigarnik effect to start anything without overthinking.
• The Self-Trust Ledger: Replacing empty mirror affirmations with undeniable historical proof of your integrity.
• The 4-Tier Graduated Social Exposure Ladder: Overcoming social freezing and speaking up with calm authority.
• The Three-Anchor Daily Rhythm: Realistic routines that fit real students, 9-to-5s, and freelance creators.
• Printable 30-Day Self-Trust Scorecard & Emergency Action Worksheets right inside the book.`,
    category: 'Master eBooks',
    featured: true,
    isNew: true,
    paymentUrl: 'https://whop.com/elevateweb-b83f/the-self-trust-protocol-illustrated-master-ebook',
    price: {
      standard: 299
    },
    originalPrice: {
      standard: 999
    },
    rating: 4.96,
    reviewCount: 88,
    salesCount: 420,
    tags: ['EBook', 'Discipline', 'Confidence', 'Focus', 'Dopamine Detox', 'Self-Trust'],
    bannerImage: '/self_trust_tablet_mockup.jpg',
    galleryImages: [
      '/self_trust_tablet_mockup.jpg',
      '/self_trust_3d_mockup.jpg',
      '/self_trust_cover.jpg',
      '/self_trust_desk.jpg',
      '/self_trust_banner.jpg'
    ],
    deliverables: [
      { name: 'The Self-Trust Protocol Master eBook (49 Pages)', format: 'Illustrated PDF', size: '10.6 MB' },
      { name: 'Printable 30-Day Self-Trust Scorecard & Worksheets', format: 'PDF (Included in Book)', size: 'Instant Download' }
    ],
    features: [
      '10 Neuro-Informed Chapters: Grounded in prefrontal cortex biology and dopamine regulation.',
      '11 Custom Editorial Illustrations: Visual mental models for instant understanding.',
      'The Three-Anchor Protocol: Protect your morning, execute 90-minute deep work, and shut down cleanly.',
      'The 5-Minute Micro-Ramp: Overcome starting friction and activate kinetic momentum.',
      'The Self-Trust Ledger: Mathematically calculate internal integrity and outwork your self-doubt.',
      'The 4-Tier Exposure Ladder: Eliminate public freezing and speak with quiet authority.',
      'Instant 1-Click PDF Access: Delivered to your screen and email immediately after UPI payment.'
    ],
    techStack: ['Illustrated PDF', 'Print-Ready A4', 'Mobile Optimized'],
    compatibility: ['Mac', 'Windows', 'iPhone', 'Android', 'iPad'],
    version: '1.0.0',
    lastUpdated: 'October 2026',
    reviews: [
      {
        id: 'rev-self-trust-1',
        author: 'Rohan Sharma',
        role: 'University Student & Creator',
        avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=150&q=80',
        rating: 5,
        date: '3 days ago',
        content: 'The concept of the Self-Trust Ledger completely rewired how I view confidence. I stopped saying affirmations and started making small daily deposits. The 20-foot phone air-gap alone doubled my study time.'
      },
      {
        id: 'rev-self-trust-2',
        author: 'Ananya Verma',
        role: 'Early Career Analyst',
        avatar: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&w=150&q=80',
        rating: 5,
        date: '1 week ago',
        content: 'The 61/57 Exposure Paradox described my exact issue: confident in private, freezing in meetings. The graduated exposure ladder and 3-second rule gave me practical courage that actually works.'
      }
    ]
  },
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
    title: 'The 3-Minute Web Designer Pricing OS & Scope Shield',
    tagline: 'An automated 3-tab pricing engine, 3-tier anchor proposal generator, and contract scope-shield built for Indian web designers & agencies.',
    description: `An automated 3-Tab Master Google Sheet system that eliminates guesswork pricing by calculating your exact break-even floor, structuring a 3-tier anchor proposal (Essential, Growth, VIP), and deploying pre-written scope-creep protection scripts in under 3 minutes.

Designed specifically for Indian freelance web designers, Webflow/Framer builders, and solo agency operators quoting projects between ₹15,000 and ₹1,00,000.

WHAT IT IS:
A battle-tested 3-Tab Master Google Sheet template (Price Engine, 3-Tier Proposal Generator, and Scope-Creep Shield) bundled with copy-paste WhatsApp/Email negotiation scripts, Indian freelance contract clauses, and a step-by-step ₹50,000 live proposal breakdown video. Works natively in Google Sheets, Microsoft Excel, and Notion.

WHAT IT DOES:
1. Takes 6 raw project inputs and calculates your exact Walk-Away Floor Price, Target Profit Price, and 1.5x Overtime Rate.
2. Automatically scales that floor into a 3-Tier Anchor Proposal (Essential 1.0x, Growth 1.4x, VIP Sprint 2.2x) with pre-calculated 50% deposits so you stop sending single prices that invite haggling.
3. Provides word-for-word WhatsApp/Email scripts and contract clauses enforcing out-of-scope billing (₹1,500/hr or $87/hr) and project-pause terms when clients stall on assets.

WHAT IT IS NOT:
It is NOT AI software, it is NOT an automated SaaS app, and it does NOT magically close clients without doing work. It is an advanced, automated calculation and proposal spreadsheet template.`,
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
    rating: 4.98,
    reviewCount: 384,
    salesCount: 1420,
    tags: ['Google Sheets', 'Pricing Calculator', 'Web Design OS', 'Agency Tools', 'Proposal Generator'],
    bannerImage: '/pricing_calculator_mockup.jpg',
    galleryImages: [
      '/pricing_calculator_mockup.jpg'
    ],
    deliverables: [
      { name: 'Tab 1: The 6-Input Price Engine', format: 'Google Sheets', size: '1-Click Copy' },
      { name: 'Tab 2: The 3-Tier Anchor Proposal Generator', format: 'Google Sheets', size: 'Included' },
      { name: 'Tab 3: The Scope-Creep Shield & Rate Matrix', format: 'Google Sheets', size: 'Included' },
      { name: 'Bonus 1: Anti-Haggling WhatsApp & Email Script Vault', format: 'PDF & Notion', size: 'Instant Download' },
      { name: 'Bonus 2: Indian Freelance Contract Clause Cheatsheet', format: 'Markdown & Text', size: 'Instant Download' },
      { name: 'Bonus 3: 10-Min ₹50k Live Proposal Video Breakdown', format: 'HD Video', size: 'Loom / MP4' },
      { name: '1-Click Google Drive Duplicate & Quickstart Guide', format: 'PDF & Sheets', size: 'Instant Access' }
    ],
    features: [
      'Tab 1 (Price Engine): 6 raw inputs calculating true hourly survival rate, tax/gateway buffers, walk-away floor, and 1.5x overtime rate.',
      'Tab 2 (3-Tier Proposal): Auto-generates Essential (1.0x), Growth (1.4x), and VIP Sprint (2.2x) packages + 50% deposits & client pitch message.',
      'Tab 3 (Scope-Creep Shield): Pre-written negotiation clauses charging ₹1,500/hr ($87/hr) for extra requests and project-pause terms.',
      'Bonus Script Vault: Word-for-word copy-paste replies to "Bhai discount kardo" and "Another freelancer is doing it for ₹5,000".',
      'Contract Clause Cheatsheet: Strict 2-revision limit, 50% upfront deposit terms, and late-asset penalties.',
      'Zero Software Subscriptions: 100% plug-and-play Google Sheet (works in Excel & Notion too).',
      'Instant Automated Access: 1-click private Google Drive duplicate right after checkout.'
    ],
    techStack: ['Google Sheets', 'Excel', 'Notion', 'Formulas']
  }
];

export const CATEGORIES: ProductCategory[] = [
  'All',
  'SaaS Boilerplates',
  'UI Kits & Design',
  '3D & Graphics',
  'Dashboards'
];
