import { FunnelTier } from '../types/funnel';
import { Product } from '../types';

export const FUNNEL_TIERS: FunnelTier[] = [
  {
    id: 'tier-2-core-os',
    name: 'The Self-Trust OS',
    badge: 'COMPLETE SYSTEM • 75% OFF LAUNCH SPECIAL',
    price: 499,
    originalPrice: 1999,
    headline: 'The Complete Self-Trust Operating Manual + Digital Execution Suite',
    subheadline: 'The full 49-page illustrated master guide, interactive Notion & Sheets ledgers, printable habit matrices, and VIP Telegram accountability bot.',
    features: [
      'Full 49-Page Illustrated Master PDF (Culturally localized for Indian Gen-Z)',
      '10 Neuro-Informed Chapters (JEE/NEET, college study, and extreme focus protocols)',
      '11 High-Resolution Visual Mental Models & Brain Circuit Diagrams',
      'Digital "Self-Trust Ledger" (Interactive Notion OS Template)',
      'Digital "Self-Trust Ledger" (Google Sheets Version with Automated Formulas)',
      '30-Day Printable Self-Trust Scorecard & Daily Habit Matrix (A4 Print-Ready)',
      'The 4-Tier Graduated Social Exposure Ladder & Dopamine Air-Gap Checklist',
      'VIP Private Telegram Accountability Group Access (Gated Invite Link)',
      'Automated 8:00 AM Needle-Mover Prompts & 9:00 PM Ledger Check-in Bot',
      'Interactive /streak & /relapse Commands with Recovery Protocols',
      'Anti-Piracy Dynamic Watermarking with Lifetime System Updates',
      'Instant 1-Click Access: Immediate screen redirect and email delivery'
    ],
    ctaText: 'Get The Self-Trust OS — ₹499',
    popular: true,
    upiEnabled: true,
    checkoutUrl: 'https://whop.com/elevateweb-b83f/the-self-trust-protocol-illustrated-master-ebook'
  }
];

// Backwards compatibility with Product interface for legacy references if needed
export const PRODUCTS: Product[] = [
  {
    id: 'prod-self-trust-protocol',
    slug: 'the-self-trust-protocol',
    title: 'The Self-Trust OS',
    tagline: 'Rewire focus, break dopamine addiction, and build unshakeable confidence in a distracted world.',
    description: `Modern society has engineered a psychological trap: billion-dollar algorithms designed to fragment your attention, paired with an unedited highlight reel on social media that fuels chronic self-doubt.

The Self-Trust OS is a comprehensive, 49-page illustrated eBook and execution system written specifically for ages 16–30 who are tired of feeling like spectators in their own lives. It dismantles the myth of "laziness" and gives you the exact biological protocols to defeat dopamine addiction, close the Intention-Action Gap, and build quiet, unshakeable confidence.`,
    category: 'Master eBooks',
    featured: true,
    isNew: true,
    paymentUrl: 'https://whop.com/elevateweb-b83f/the-self-trust-protocol-illustrated-master-ebook',
    demoUrl: undefined,
    price: { standard: 499 },
    originalPrice: { standard: 1999 },
    rating: 4.96,
    reviewCount: 412,
    salesCount: 1240,
    tags: ['Berserk', 'Discipline', 'Confidence', 'Focus', 'Phone Detox', 'Self-Trust'],
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
      { name: 'The Digital Self-Trust Ledger', format: 'Notion & Google Sheets', size: 'Cloud Template' },
      { name: 'Printable 30-Day Self-Trust Scorecard & Worksheets', format: 'PDF (Included in Book)', size: 'Instant Download' },
      { name: 'VIP Telegram Accountability Bot & Private Group', format: 'Gated Invite Link', size: 'Daily Automation' }
    ],
    features: [
      '10 Neuro-Informed Chapters localized for Indian Gen-Z',
      '11 Custom Editorial Illustrations & Visual Mental Models',
      'The Three-Anchor Protocol: Protect morning, execute 90-min deep work, clean shutdown',
      'The 5-Minute Micro-Ramp: Activate kinetic momentum without friction',
      'The Self-Trust Ledger: Replace mirror affirmations with undeniable historical proof',
      'VIP Telegram Community Access & Automated 8 AM / 9 PM Accountability Bot',
      'Instant 1-Click Access: Delivered to your screen & email immediately after payment.'
    ],
    techStack: ['Illustrated PDF', 'Print-Ready A4', 'Mobile Optimized', 'Notion OS', 'Telegram Bot'],
    compatibility: ['Mac', 'Windows', 'iPhone', 'Android', 'iPad'],
    version: '2.0.0',
    lastUpdated: 'October 2026',
    reviews: [
      {
        id: 'rev-1',
        author: 'Arjun M.',
        role: 'Tier 1 Engineering Student, IIT Roorkee',
        avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=150&q=80',
        rating: 5,
        date: '2 days ago',
        content: 'I had read Atomic Habits and Deep Work, but neither solved the physical impulse to open Instagram at midnight during semester exams. The 20-Foot Air-Gap protocol and the Self-Trust Ledger in Chapter 9 gave me the first 7-day zero-relapse streak I\'ve had in 2 years. Worth 10x the price.'
      },
      {
        id: 'rev-2',
        author: 'Sanya K.',
        role: 'Product Designer & Independent Creator',
        avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=150&q=80',
        rating: 5,
        date: '1 week ago',
        content: 'The 11 custom illustrations make abstract neuroscience concepts instantly stick. The Intention-Action Gap visual and the Graduated Social Exposure Ladder completely changed how I show up to client pitches. You can feel this was built with real care.'
      }
    ]
  }
];
