import { FunnelTier } from '../types/funnel';
import { Product } from '../types';

export const FUNNEL_TIERS: FunnelTier[] = [
  {
    id: 'tier-2-core-os',
    name: 'The Self-Trust Protocol Bundle',
    badge: 'SPECIAL LAUNCH PRICE • 70% OFF',
    price: 299,
    originalPrice: 999,
    headline: '49-Page Master Illustrated PDF + Interactive Notion OS Template',
    subheadline: 'The complete neuro-informed operating manual and the mathematical Notion ledger to track discipline, close the Intention-Action Gap, and rebuild unshakeable self-trust.',
    features: [
      'Full 49-Page Master Illustrated PDF (Culturally localized for Indian Gen-Z)',
      '10 Neuro-Informed Chapters (JEE/NEET, college study, and extreme focus protocols)',
      '11 High-Resolution Visual Mental Models & Brain Circuit Diagrams',
      'The Three-Anchor Protocol: Protect morning, execute 90-min deep work, clean shutdown',
      'Interactive Notion OS Template: The Self-Trust Ledger (1-Click Duplicate Link)',
      'Daily 3-Anchor Command Center (Morning boot, 90-minute focus sprint, evening shutdown)',
      'Mathematical Deposit & Withdrawal Engine (Real-time confidence score & points system)',
      'Task-Aversion Deconstructor (Emergency circuit-breaker for procrastination & draft zero)',
      '4-Tier Graduated Social Exposure Ladder (Real-world confidence building challenges)',
      'Instant 1-Click Access: Immediate screen redirect and email delivery'
    ],
    ctaText: 'Get The Self-Trust Bundle — ₹299',
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
    title: 'The Self-Trust Protocol Bundle',
    tagline: 'Rewire focus, break dopamine addiction, and build unshakeable confidence in a distracted world.',
    description: `It’s 2:15 AM. The blue light from your phone is the only thing illuminating your dark room. Your eyes burn, your chest feels heavy with guilt, and in the back of your mind, a quiet voice whispers: "You did it again."

You swore today would be different. You promised you’d study, work out, and finally lock in. Instead, six hours vanished into mindless Reels, dopamine numbness, and cheap distractions.

The worst part isn’t the wasted time. It’s the slow, humiliating death of your word to yourself. Every broken promise rewires your subconscious to believe one toxic lie: that you are someone who cannot be trusted.

Here is the truth: You don’t lack willpower. You’re just fighting a rigged biological battle with stone-age brain circuits.

The Self-Trust Protocol is the exact neuro-framework engineered for Indian Gen-Z to kill brain fog, shut down emotional task-aversion, and rebuild quiet, ironclad confidence.

What You Get Inside (The Essential 2-in-1 Action Bundle):
1. The 49-Page Master Illustrated PDF: 10 neuro-informed chapters and 11 mental model diagrams dismantling the Dopamine Trap, the 20-Foot Phone Air-Gap, and the 3-Anchor Daily Rhythm. No corporate Western fluff—pure execution.
2. The Self-Trust Ledger (Interactive Notion OS): Your digital command center. Mathematically tracks every kept promise as a deposit, transforming discipline into undeniable proof of who you are.

For ₹299—less than one fast-food order—stop being a spectator in your own life. Rebuild your self-trust. Lock in.`,
    category: 'Master eBooks',
    featured: true,
    isNew: true,
    paymentUrl: 'https://whop.com/elevateweb-b83f/the-self-trust-protocol-illustrated-master-ebook',
    demoUrl: undefined,
    price: { standard: 299 },
    originalPrice: { standard: 999 },
    rating: 4.96,
    reviewCount: 412,
    salesCount: 1240,
    tags: ['Berserk', 'Discipline', 'Confidence', 'Focus', 'Phone Detox', 'Self-Trust', 'Notion'],
    bannerImage: '/self_trust_epic_explosion.jpg',
    galleryImages: [
      '/self_trust_epic_explosion.jpg',
      '/self_trust_berserk_station.jpg',
      '/self_trust_ecosystem_suite.jpg',
      '/self_trust_reading_pov.jpg',
      '/self_trust_bundle_mockup.jpg',
      '/self_trust_hero_banner.jpg',
      '/self_trust_notion_mockup.jpg'
    ],
    deliverables: [
      { name: 'The Self-Trust Protocol Master eBook (49 Pages)', format: 'Illustrated PDF', size: '10.6 MB' },
      { name: 'The Digital Self-Trust Ledger', format: 'Interactive Notion OS Template', size: '1-Click Duplicate' }
    ],
    features: [
      '10 Neuro-Informed Chapters localized for Indian Gen-Z',
      '11 Custom Editorial Illustrations & Visual Mental Models',
      'The Three-Anchor Protocol: Protect morning, execute 90-min deep work, clean shutdown',
      'The 5-Minute Micro-Ramp: Activate kinetic momentum without friction',
      'Interactive Notion OS Template: The Self-Trust Ledger with real-time confidence calculation',
      'Task-Aversion Deconstructor & 4-Tier Graduated Social Exposure Ladder',
      'Instant 1-Click Access: Delivered to your screen & email immediately after payment.'
    ],
    techStack: ['Illustrated PDF', 'Print-Ready A4', 'Mobile Optimized', 'Notion OS Template'],
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
        content: 'I had read Atomic Habits and Deep Work, but neither solved the physical impulse to open Instagram at midnight during semester exams. The 20-Foot Air-Gap protocol in the PDF and the Self-Trust Ledger in Notion gave me the first 7-day zero-relapse streak I\'ve had in 2 years. Worth 10x the price.'
      },
      {
        id: 'rev-2',
        author: 'Sanya K.',
        role: 'Product Designer & Independent Creator',
        avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=150&q=80',
        rating: 5,
        date: '1 week ago',
        content: 'The 11 custom illustrations make abstract neuroscience concepts instantly stick. The Intention-Action Gap visual and the Notion template completely changed how I track daily focus sprints. Clean, elegant, and zero fluff.'
      }
    ]
  }
];
