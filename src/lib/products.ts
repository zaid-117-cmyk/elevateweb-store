import { FunnelTier } from '../types/funnel';
import { Product } from '../types';

export const FUNNEL_TIERS: FunnelTier[] = [
  {
    id: 'free-lead-magnet',
    name: 'The Free Starter Pack',
    badge: '100% FREE • INSTANT ACCESS',
    price: 0,
    originalPrice: 299,
    headline: 'Defeat The Intention-Action Gap',
    subheadline: 'The exact neuro-framework to stop doomscrolling at 2 AM and start executing without willpower exhaustion.',
    features: [
      'Chapters 1–3 of The Self-Trust Protocol (Pages 1–13 PDF)',
      'Chapter 1: The Dopamine Trap (Receptor Downregulation)',
      'Chapter 2: The Intention-Action Gap (Overcoming Task-Aversion)',
      '1-Page Printable "5-Minute Micro-Ramp" Quick-Start Guide',
      'The 20-Foot Phone Air-Gap Checklist',
      'Instant delivery to your WhatsApp & Email'
    ],
    ctaText: 'Get Free Chapters 1–3 Now',
    popular: false,
    upiEnabled: false
  },
  {
    id: 'tier-1-starter',
    name: 'The Berserk Starter',
    badge: 'MOST POPULAR TRIPWIRE • 80% OFF',
    price: 99,
    originalPrice: 499,
    headline: 'The Complete Self-Trust Operating Manual',
    subheadline: 'The full 49-page illustrated master guide localized for Indian students & creators, plus the digital ledger system.',
    features: [
      'Full 49-Page Illustrated PDF (Culturally localized for Indian Gen-Z)',
      '10 Neuro-Informed Chapters (JEE/NEET & college study focus)',
      '11 High-Resolution Visual Mental Models & Brain Circuit Diagrams',
      'Digital "Self-Trust Ledger" (Interactive Notion Template)',
      'Digital "Self-Trust Ledger" (Google Sheets Version with Formulas)',
      'The 4-Tier Graduated Social Exposure Ladder',
      '30-Day Printable Self-Trust Scorecard & Daily Habit Matrix',
      'Anti-Piracy Dynamic Watermarking with Lifetime PDF Updates',
      'Instant 1-Click Access via UPI (GPay, PhonePe, Paytm)'
    ],
    ctaText: 'Get The Berserk Starter — ₹99',
    popular: true,
    upiEnabled: true,
    checkoutUrl: 'https://whop.com/elevateweb-b83f/the-self-trust-protocol-illustrated-master-ebook'
  },
  {
    id: 'tier-2-core-os',
    name: 'The Self-Trust OS (VIP Community)',
    badge: 'BERSERK MODE • EXCLUSIVE VIP ACCESS',
    price: 499,
    originalPrice: 1999,
    headline: 'Execution System + Daily Telegram Accountability',
    subheadline: 'Everything in the Starter tier PLUS private Telegram group access, daily check-in bots, and weekly live sessions.',
    features: [
      'Everything included in The Berserk Starter (₹99 Tier)',
      'VIP Private Telegram Group Access (1-Time Expiring Invite Link)',
      'Automated 8:00 AM Accountability Bot ("Drop Your Top 3 Needle-Movers")',
      'Automated 9:00 PM Reflection Bot ("Check Your Self-Trust Ledger")',
      'Interactive /streak & /relapse Bot Commands with Recovery Guidance',
      'Direct Access to Community Moderators & Fellow Serious Builders',
      'Weekly Live Audio/Chat AMAs & Focus Strategy Deconstructions',
      'Priority Support & Exclusive Future Chapter Drops'
    ],
    ctaText: 'Unlock Full Self-Trust OS — ₹499',
    popular: false,
    upiEnabled: true,
    checkoutUrl: 'https://whop.com/elevateweb-b83f/the-self-trust-protocol-illustrated-master-ebook'
  }
];

// Backwards compatibility with Product interface for legacy references if needed
export const PRODUCTS: Product[] = [
  {
    id: 'prod-self-trust-protocol',
    slug: 'the-self-trust-protocol',
    title: 'The Self-Trust Protocol',
    tagline: 'Rewire focus, break dopamine addiction, and build unshakeable confidence in a distracted world.',
    description: `Modern society has engineered a psychological trap: billion-dollar algorithms designed to fragment your attention, paired with an unedited highlight reel on social media that fuels chronic self-doubt.

The Self-Trust Protocol is a comprehensive, 49-page illustrated eBook written specifically for ages 16–30 who are tired of feeling like spectators in their own lives. It dismantles the myth of "laziness" and gives you the exact biological protocols to defeat dopamine addiction, close the Intention-Action Gap, and build quiet, unshakeable confidence.`,
    category: 'Master eBooks',
    featured: true,
    isNew: true,
    paymentUrl: 'https://whop.com/elevateweb-b83f/the-self-trust-protocol-illustrated-master-ebook',
    demoUrl: undefined,
    price: { standard: 99 },
    originalPrice: { standard: 499 },
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
      { name: 'Printable 30-Day Self-Trust Scorecard & Worksheets', format: 'PDF (Included in Book)', size: 'Instant Download' }
    ],
    features: [
      '10 Neuro-Informed Chapters localized for Indian Gen-Z',
      '11 Custom Editorial Illustrations & Visual Mental Models',
      'The Three-Anchor Protocol: Protect morning, execute 90-min deep work, clean shutdown',
      'The 5-Minute Micro-Ramp: Activate kinetic momentum without friction',
      'The Self-Trust Ledger: Replace mirror affirmations with undeniable historical proof',
      'Instant 1-Click Access: Delivered to your screen & email immediately after UPI payment.'
    ],
    techStack: ['Illustrated PDF', 'Print-Ready A4', 'Mobile Optimized'],
    compatibility: ['Mac', 'Windows', 'iPhone', 'Android', 'iPad'],
    version: '2.0.0',
    lastUpdated: 'October 2026',
    reviews: [
      {
        id: 'rev-self-trust-1',
        author: 'Rohan Sharma',
        role: 'JEE Aspirant & Creator',
        avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=150&q=80',
        rating: 5,
        date: '2 days ago',
        content: 'Bhai, the concept of the Self-Trust Ledger completely rewired how I view discipline. Stopped saying random affirmations and started logging small daily deposits. The 20-foot phone air-gap alone doubled my study time.'
      },
      {
        id: 'rev-self-trust-2',
        author: 'Ananya Verma',
        role: 'Tier-3 Engineering Student',
        avatar: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&w=150&q=80',
        rating: 5,
        date: '4 days ago',
        content: 'The 61/57 Exposure Paradox described my exact issue: confident in private, freezing in viva and meetings. The graduated exposure ladder and 3-second rule gave me practical courage that actually works.'
      }
    ]
  }
];
