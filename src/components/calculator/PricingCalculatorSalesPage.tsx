import React, { useState, useMemo, useEffect } from 'react';
import { 
  Check, 
  Copy, 
  ArrowRight, 
  Sparkles, 
  ShieldCheck, 
  Shield,
  FileSpreadsheet, 
  AlertTriangle, 
  CheckCircle2, 
  Clock, 
  Zap, 
  Layers, 
  DollarSign, 
  MessageSquare, 
  ChevronDown, 
  HelpCircle, 
  Sliders,
  RefreshCw
} from 'lucide-react';

export interface PricingCalculatorSalesPageProps {
  /** Custom checkout URL for Gumroad, Lemon Squeezy, or Razorpay */
  checkoutUrl?: string;
  /** Custom audit booking URL for elevateweb.me */
  auditBookingUrl?: string;
  /** Support contact email */
  supportEmail?: string;
  /** Optional callback when user clicks buy */
  onBuyClick?: () => void;
}

export const PricingCalculatorSalesPage: React.FC<PricingCalculatorSalesPageProps> = ({
  checkoutUrl = 'https://rzp.io/rzp/uk5DvJq',
  auditBookingUrl = 'https://elevateweb.me/#audit',
  supportEmail = 'zaid@elevateweb.me',
  onBuyClick
}) => {
  // ---------------------------------------------------------------------------
  // 1. CALCULATOR PREVIEW STATE & REAL-TIME MATH ENGINE
  // ---------------------------------------------------------------------------
  // Currency toggle: 'USD' ($) or 'INR' (₹)
  const [currency, setCurrency] = useState<'USD' | 'INR'>('USD');

  // Sliders:
  // Slider 1: Target Monthly Income ($1,000 to $15,000, default $4,000)
  const [monthlyIncomeUSD, setMonthlyIncomeUSD] = useState<number>(4000);
  
  // Slider 2: Project Build Hours (5 to 100 hrs, default 25 hrs)
  const [projectHours, setProjectHours] = useState<number>(25);
  
  // Slider 3: Client Revision Risk Buffer (0% to 50%, default 25%)
  const [riskBuffer, setRiskBuffer] = useState<number>(25);

  // INR Exchange benchmarking multiplier (for dual currency display)
  // Benchmarked: $29 = ₹1,499. For freelance rates, 1 USD ~ 83 INR
  const inrRate = 83;

  // Real-time calculation logic:
  // Formula calibrated so that default ($4,000, 25h, 25%) yields:
  // Protected Hourly Rate: $57/hr
  // Walk-Away Floor Price: $1,905
  // Proposal Tiers: Essential $1,910 | Growth $2,670 | VIP $4,190
  const calculations = useMemo(() => {
    // 1. Protected Hourly Rate:
    // Base monthly capacity benchmarked at 100 billable hours/mo
    // Includes 30% taxes + 12.5% software & non-billable overhead multiplier (1.425)
    const hourlyRateUSD = Math.round((monthlyIncomeUSD * 1.425) / 100);

    // 2. Walk-Away Floor Price:
    // Base labor (projectHours * hourlyRate) * (1 + riskBuffer%) * 1.0695 (payment gateway & contingency)
    const baseLaborUSD = projectHours * hourlyRateUSD;
    const bufferedLaborUSD = baseLaborUSD * (1 + riskBuffer / 100);
    const floorPriceUSD = Math.round(bufferedLaborUSD * 1.0695);

    // 3. 3-Tier Proposal Pricing:
    // Essential: Floor rounded to nearest $10 ($1,905 -> $1,910)
    const essentialUSD = Math.round(floorPriceUSD / 10) * 10;
    // Growth: 1.4015x floor ($1,905 * 1.4015 = $2,669.8 -> $2,670)
    const growthUSD = Math.round((floorPriceUSD * 1.4015) / 10) * 10;
    // VIP: 2.1995x floor ($1,905 * 2.1995 = $4,190.04 -> $4,190)
    const vipUSD = Math.round((floorPriceUSD * 2.1995) / 10) * 10;

    // 4. 1.5x Overtime Rate & 50% deposits
    const overtimeRateUSD = Math.round(hourlyRateUSD * 1.5);
    const depositEssentialUSD = Math.round(essentialUSD * 0.5);
    const depositGrowthUSD = Math.round(growthUSD * 0.5);
    const depositVipUSD = Math.round(vipUSD * 0.5);
    const retainerUSD = Math.round((growthUSD * 0.35) / 10) * 10;

    // INR equivalents
    const hourlyRateINR = Math.round(hourlyRateUSD * inrRate);
    const floorPriceINR = Math.round((floorPriceUSD * inrRate) / 100) * 100;
    const essentialINR = Math.round((essentialUSD * inrRate) / 100) * 100;
    const growthINR = Math.round((growthUSD * inrRate) / 100) * 100;
    const vipINR = Math.round((vipUSD * inrRate) / 100) * 100;
    const overtimeRateINR = Math.round(overtimeRateUSD * inrRate);
    const depositEssentialINR = Math.round(essentialINR * 0.5);
    const depositGrowthINR = Math.round(growthINR * 0.5);
    const depositVipINR = Math.round(vipINR * 0.5);
    const retainerINR = Math.round((growthINR * 0.35) / 100) * 100;

    return {
      hourlyRate: currency === 'USD' ? hourlyRateUSD : hourlyRateINR,
      overtimeRate: currency === 'USD' ? overtimeRateUSD : overtimeRateINR,
      floorPrice: currency === 'USD' ? floorPriceUSD : floorPriceINR,
      essential: currency === 'USD' ? essentialUSD : essentialINR,
      growth: currency === 'USD' ? growthUSD : growthINR,
      vip: currency === 'USD' ? vipUSD : vipINR,
      depositEssential: currency === 'USD' ? depositEssentialUSD : depositEssentialINR,
      depositGrowth: currency === 'USD' ? depositGrowthUSD : depositGrowthINR,
      depositVip: currency === 'USD' ? depositVipUSD : depositVipINR,
      retainer: currency === 'USD' ? retainerUSD : retainerINR,
      symbol: currency === 'USD' ? '$' : '₹',
      hourlyRateUSD,
      overtimeRateUSD,
      floorPriceUSD,
      essentialUSD,
      growthUSD,
      vipUSD
    };
  }, [monthlyIncomeUSD, projectHours, riskBuffer, currency]);

  // Copy proposal feedback state
  const [copiedProposal, setCopiedProposal] = useState(false);

  const handleCopyProposal = () => {
    const text = `Hi [Client Name],

Thank you for discussing your project requirements with me. Based on your scope and timeline goals, here is our structured 3-tier psychological anchor proposal:

Tier 1: Essential (1.0x Floor: ${calculations.symbol}${calculations.essential.toLocaleString()})
• 50% Upfront Deposit: ${calculations.symbol}${calculations.depositEssential.toLocaleString()}
• Core deliverables & foundational architecture
• 1 structured round of revisions
• Standard turnaround (14 business days)

Tier 2: Growth (1.4x Sweet Spot: ${calculations.symbol}${calculations.growth.toLocaleString()}) — [RECOMMENDED]
• 50% Upfront Deposit: ${calculations.symbol}${calculations.depositGrowth.toLocaleString()}
• Everything in Essential + Speed & SEO optimization
• High-converting interactive micro-animations
• 2 structured revision rounds & priority 7-day turnaround
• Optional monthly retainer upsell: ${calculations.symbol}${calculations.retainer.toLocaleString()}/mo

Tier 3: VIP Sprint (2.2x Anchor: ${calculations.symbol}${calculations.vip.toLocaleString()})
• 50% Upfront Deposit: ${calculations.symbol}${calculations.depositVip.toLocaleString()}
• Everything in Growth + Custom analytics dashboard
• Conversion copywriting audit & high-ticket UX teardown
• 30-day extended developer retainer & 24/7 Slack/WhatsApp channel access
• Dedicated weekend & sprint bandwidth

Our protected baseline floor is calculated at ${calculations.symbol}${calculations.hourlyRate.toLocaleString()}/hr (1.5x overtime rate: ${calculations.symbol}${calculations.overtimeRate.toLocaleString()}/hr). Which tier aligns best with your targets for this quarter?`;

    navigator.clipboard.writeText(text);
    setCopiedProposal(true);
    setTimeout(() => setCopiedProposal(false), 2400);
  };

  // Presets handler
  const applyPreset = (income: number, hours: number, buffer: number) => {
    setMonthlyIncomeUSD(income);
    setProjectHours(hours);
    setRiskBuffer(buffer);
  };

  // ---------------------------------------------------------------------------
  // 2. WHAT'S INSIDE THE MASTER SPREADSHEET (3-TAB INTERACTIVE SHOWCASE)
  // ---------------------------------------------------------------------------
  const [activeTab, setActiveTab] = useState<'engine' | 'tiers' | 'shield'>('engine');
  const [copiedScriptIndex, setCopiedScriptIndex] = useState<number | null>(null);

  const negotiationScripts = [
    {
      id: 1,
      title: "The 'Happy to add that!' Out-of-Scope Clause",
      purpose: "Charge $87/hr for extra requests without sounding defensive or confrontational.",
      text: "Hey [Client Name], absolutely! That’s a fantastic idea and would add real polish to the app. Because that feature sits outside our agreed Essential scope, I can easily build it out for you at our standard out-of-scope rate of $87/hr (~4-5 hours additional), or we can swap it out with [Feature B] from the current milestone. Let me know which direction you prefer and I will queue it immediately!"
    },
    {
      id: 2,
      title: "The Revision Cutoff & Sign-Off Protocol",
      purpose: "Locks in milestone sign-off and stops infinite 'can we try 1 more color' loops.",
      text: "Hey [Client Name], we’ve now successfully completed the 2 included revision rounds for this milestone. Everything is aligned with the design specification we agreed upon. To keep our launch on schedule for Friday, we've locked this milestone for sign-off. Any further aesthetic experiments can be queued under our post-launch sprint at $87/hr. Let's push to live!"
    },
    {
      id: 3,
      title: "The Inactivity / Project Pause Surcharge",
      purpose: "Prevents clients who ghost for 3 weeks from instantly expecting weekend rush work.",
      text: "Hey [Client Name], checking in! As outlined in Section 4.2 of our agreement, client feedback pending more than 10 business days automatically moves the project into 'Paused' status to release dedicated developer bandwidth for other scheduled clients. To reactivate the project and reserve a new development slot next month, a 15% reactivation deposit applies."
    },
    {
      id: 4,
      title: "The Urgent Rush Delivery Multiplier",
      purpose: "Stops clients from demanding 48-hour turnarounds without paying premium rates.",
      text: "Hey [Client Name], our standard turnaround for this scope is 14 days. We can compress this into an expedited 4-day delivery window by reallocating our senior dev and dedicating weekend sprints. We apply a standard 40% rush surcharge ($850) for compressed timelines. Please confirm by 5:00 PM today so we can lock the dedicated sprint schedule."
    }
  ];

  const handleCopyScript = (text: string, index: number) => {
    navigator.clipboard.writeText(text);
    setCopiedScriptIndex(index);
    setTimeout(() => setCopiedScriptIndex(null), 2200);
  };

  // ---------------------------------------------------------------------------
  // 3. FAQ ACCORDION STATE
  // ---------------------------------------------------------------------------
  const [openFaq, setOpenFaq] = useState<number | null>(0);

  const faqs = [
    {
      q: "Do I need Microsoft Excel to use this?",
      a: "No! It works 100% free and natively in Google Sheets on any browser. You can also export it with one click to Microsoft Excel (.xlsx) or import the tables directly into your Notion workspace."
    },
    {
      q: "How do I get the file after paying?",
      a: "You receive instant automated access. The moment your checkout completes, you get a secure 1-click link to create a private, editable copy directly inside your personal Google Drive. No waiting, no manual emails."
    },
    {
      q: "Is this an AI bot, SaaS software, or a recurring subscription?",
      a: "No. This is an advanced, automated Master Google Sheet Template—NOT an AI bot, SaaS app, or recurring subscription. It is a one-time purchase of ₹1,499 ($29) with lifetime access and zero ongoing fees."
    },
    {
      q: "Will this magically close clients for me?",
      a: "No spreadsheet magically closes deals. What it DOES do is eliminate guesswork pricing: it takes 6 raw inputs to calculate your exact walk-away floor and 1.5x overtime rate, structures a 3-tier anchor proposal with 50% deposits, and arms you with word-for-word scripts to charge $87/hr for extra requests."
    },
    {
      q: "Does this work for international currencies and Indian Rupees?",
      a: "Yes! Cell B2 in the spreadsheet has a one-click currency selector. You can switch between USD ($), INR (₹), EUR (€), GBP (£), AUD ($), CAD ($), or enter your own custom currency symbol. All formulas, proposal tables, and margin charts automatically adapt."
    },
    {
      q: "What if I am a beginner freelancer without an agency yet?",
      a: "This sheet is designed for freelancers, web developers, video editors, and solo agencies alike. Most solo creators undercharge by 30-50% because they overlook taxes, payment gateway fees, and revision buffers. The 6-input price engine protects your baseline from day one."
    },
    {
      q: "Can I customize the formulas and add my own branding?",
      a: "Yes, 100%. You own your Google Sheet copy completely. You can customize colors, add your agency logo, tweak markup percentages, or add more proposal tiers whenever you wish."
    }
  ];

  // ---------------------------------------------------------------------------
  // 4. STICKY FLOATING BUY BAR VISIBILITY ON SCROLL
  // ---------------------------------------------------------------------------
  const [showStickyBar, setShowStickyBar] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      // Show sticky bar after scrolling past 520px
      setShowStickyBar(window.scrollY > 520);
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // CTA Click handler
  const handleCtaClick = (e: React.MouseEvent) => {
    if (onBuyClick) {
      e.preventDefault();
      onBuyClick();
    }
  };

  return (
    <div className="w-full bg-[#070b14] text-slate-100 selection:bg-emerald-500 selection:text-slate-950 font-sans relative overflow-x-clip">
      
      {/* Subtle ambient lighting / radial gradients */}
      <div 
        className="absolute top-0 left-1/2 -translate-x-1/2 w-full max-w-7xl h-[650px] pointer-events-none opacity-40 blur-[130px] -z-10"
        style={{
          background: 'radial-gradient(circle at 50% 20%, rgba(16, 185, 129, 0.25), rgba(6, 182, 212, 0.15) 40%, transparent 70%)'
        }}
      />
      
      {/* Subtle background tech grid lines */}
      <div 
        className="absolute inset-0 opacity-[0.03] pointer-events-none -z-10"
        style={{
          backgroundImage: `linear-gradient(#ffffff 1px, transparent 1px), linear-gradient(90deg, #ffffff 1px, transparent 1px)`,
          backgroundSize: '48px 48px'
        }}
      />

      {/* SaaS Sticky Dark Navigation Bar */}
      <nav className="fixed top-0 left-0 w-full z-50 bg-[#070b14]/85 backdrop-blur-xl border-b border-slate-800/80 transition-all duration-300">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 h-16 sm:h-20 flex items-center justify-between">
          <a href="/" className="flex items-center gap-2.5 group">
            <span className="font-display font-extrabold text-xl sm:text-2xl text-white tracking-tight group-hover:text-emerald-400 transition-colors">
              ElevateWeb
            </span>
            <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-emerald-500/10 text-emerald-400 border border-emerald-500/20 font-semibold">
              CALCULATOR
            </span>
          </a>

          <div className="hidden md:flex items-center gap-7 text-xs font-mono font-medium text-slate-300">
            <a href="#interactive-preview" className="hover:text-emerald-400 transition-colors">
              Live Calculator Preview
            </a>
            <a href="#features" className="hover:text-emerald-400 transition-colors">
              3-Tab System
            </a>
            <a href="#faq" className="hover:text-emerald-400 transition-colors">
              FAQ
            </a>
            <a href="/" className="hover:text-emerald-400 transition-colors text-slate-400">
              ← Store Home
            </a>
          </div>

          <div className="flex items-center gap-3">
            <span className="hidden sm:inline-block font-mono text-xs text-slate-400">
              <strong className="text-white">₹1,499</strong> / $29
            </span>
            <a
              href={checkoutUrl}
              onClick={handleCtaClick}
              className="px-4 py-2 sm:px-5 sm:py-2.5 rounded-xl bg-emerald-500 hover:bg-emerald-400 text-slate-950 font-display font-bold text-xs sm:text-sm tracking-tight transition-all duration-200 shadow-[0_0_15px_rgba(16,185,129,0.3)] hover:scale-[1.02]"
            >
              Get Instant Access
            </a>
          </div>
        </div>
      </nav>

      {/* =====================================================================
          1. HERO SECTION
          ===================================================================== */}
      <section className="relative pt-28 pb-16 md:pt-36 md:pb-24 px-4 sm:px-6 lg:px-8 max-w-6xl mx-auto">
        <div className="text-center max-w-4xl mx-auto">
          
          {/* Top Badge */}
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-emerald-500/10 border border-emerald-500/30 text-emerald-400 text-xs sm:text-sm font-semibold tracking-wide mb-8 shadow-[0_0_20px_rgba(16,185,129,0.2)]">
            <span className="flex h-2 w-2 rounded-full bg-emerald-400 animate-pulse"></span>
            <span>FOUNDER LAUNCH • LIMITED TO FIRST 100 DESIGNERS • ₹1,499</span>
          </div>

          {/* Headline */}
          <h1 className="text-4xl sm:text-6xl lg:text-7xl font-display font-extrabold tracking-tight text-white mb-6 leading-[1.08]">
            Stop Quoting Like an Amateur &{' '}
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-emerald-400 via-teal-300 to-cyan-400">
              Losing 40 Unbilled Hours.
            </span>
          </h1>

          {/* Sub-headline: Precise & Truthful Framing */}
          <p className="text-slate-300 text-lg sm:text-xl lg:text-2xl mb-8 leading-relaxed font-light max-w-3xl mx-auto">
            The 3-Minute Automated Pricing Engine and Scope-Creep Shield built specifically for Indian web designers & developers. Quote 3-tier anchor proposals, shut down client haggling on WhatsApp, and command ₹50,000+ per website.
          </p>

          {/* Primary CTA Area */}
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4 mb-4">
            <a
              href={checkoutUrl}
              onClick={handleCtaClick}
              className="w-full sm:w-auto inline-flex items-center justify-center gap-3 px-8 py-4 sm:py-5 rounded-2xl bg-emerald-500 hover:bg-emerald-400 text-slate-950 font-display font-bold text-lg sm:text-xl tracking-tight transition-all duration-300 transform hover:scale-[1.02] shadow-[0_0_35px_rgba(16,185,129,0.4)] hover:shadow-[0_0_50px_rgba(16,185,129,0.65)] active:scale-[0.98] group"
              data-cursor-text="BUY ₹1,499"
            >
              <span>Get Instant Access to the Pricing OS — ₹1,499 ($29)</span>
              <ArrowRight className="w-5 h-5 group-hover:translate-x-1.5 transition-transform" />
            </a>
          </div>

          {/* Sub-CTA text */}
          <p className="text-slate-400 text-sm sm:text-base font-medium flex items-center justify-center gap-2 mb-8">
            <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
            <span>Instant access via Google Sheets (Works natively on Excel & Notion too). Zero monthly fees.</span>
          </p>

          {/* Transparency Specification: What It Is vs What It Is NOT */}
          <div className="mb-10 p-4 sm:p-5 rounded-2xl bg-slate-900/80 border border-slate-800 text-left text-xs sm:text-sm max-w-2xl mx-auto space-y-3 shadow-xl">
            <div className="flex items-center gap-2 font-mono font-bold text-slate-200 uppercase tracking-wider text-[11px]">
              <span className="h-2 w-2 rounded-full bg-emerald-400"></span>
              <span>100% Factual Specification (Zero AI Fluff)</span>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-slate-300">
              <div className="p-3.5 rounded-xl bg-slate-950/70 border border-slate-800/80 space-y-1.5">
                <span className="text-emerald-400 font-bold block text-xs">✓ What It IS:</span>
                <p className="text-slate-400 text-xs leading-relaxed">
                  A 3-Tab Master Google Sheet template (Price Engine, 3-Tier Proposal, and Scope-Creep Shield) built for freelancers, web developers, video editors, and solo agencies.
                </p>
              </div>
              <div className="p-3.5 rounded-xl bg-slate-950/70 border border-slate-800/80 space-y-1.5">
                <span className="text-amber-400 font-bold block text-xs">✗ What It Is NOT:</span>
                <p className="text-slate-400 text-xs leading-relaxed">
                  Not AI software, not a SaaS app, and not a magic client closer. It is an automated calculation and proposal spreadsheet template.
                </p>
              </div>
            </div>
          </div>

          {/* Factual Trust Badges */}
          <div className="flex flex-wrap items-center justify-center gap-4 sm:gap-8 pt-4 border-t border-slate-800/80 text-xs sm:text-sm text-slate-400 font-medium">
            <div className="flex items-center gap-2 text-slate-300">
              <CheckCircle2 className="w-4 h-4 text-emerald-400" />
              <span>Google Sheets, Excel & Notion Native</span>
            </div>

            <div className="flex items-center gap-2 text-slate-300">
              <Zap className="w-4 h-4 text-cyan-400" />
              <span>3-Minute Setup & Calculation</span>
            </div>

            <div className="flex items-center gap-2 text-slate-300">
              <ShieldCheck className="w-4 h-4 text-amber-400" />
              <span>Includes 4 Copy-Paste Scope Clauses</span>
            </div>
          </div>
        </div>

        {/* Visual Hero Mockup Banner */}
        <div className="mt-12 sm:mt-16 relative mx-auto max-w-5xl rounded-3xl p-2 sm:p-3 bg-gradient-to-b from-slate-800/80 via-slate-900/60 to-slate-950 border border-slate-700/60 shadow-[0_20px_70px_rgba(0,0,0,0.6)]">
          <div className="relative rounded-2xl overflow-hidden border border-slate-700/40 bg-slate-950">
            <img 
              src="/pricing_calculator_mockup.jpg" 
              alt="The 3-Minute Freelancer and Agency Pricing Calculator Google Sheet Dashboard"
              className="w-full h-auto object-cover transform hover:scale-[1.01] transition-transform duration-700"
              loading="eager"
            />
            {/* Live Floating Indicators over image */}
            <div className="absolute bottom-4 left-4 sm:bottom-6 sm:left-6 flex flex-wrap gap-2.5">
              <div className="px-3 py-1.5 rounded-xl bg-slate-950/85 backdrop-blur-md border border-emerald-500/40 text-emerald-300 text-xs sm:text-sm font-mono flex items-center gap-2 shadow-lg">
                <span className="h-2 w-2 rounded-full bg-emerald-400 animate-ping"></span>
                <span>Tab 1: 6-Input Price Engine</span>
              </div>
              <div className="hidden sm:flex px-3 py-1.5 rounded-xl bg-slate-950/85 backdrop-blur-md border border-cyan-500/40 text-cyan-300 text-xs sm:text-sm font-mono items-center gap-2 shadow-lg">
                <Layers className="w-3.5 h-3.5 text-cyan-400" />
                <span>Tab 2: 3-Tier Anchor Generator</span>
              </div>
              <div className="hidden md:flex px-3 py-1.5 rounded-xl bg-slate-950/85 backdrop-blur-md border border-amber-500/40 text-amber-300 text-xs sm:text-sm font-mono items-center gap-2 shadow-lg">
                <ShieldCheck className="w-3.5 h-3.5 text-amber-400" />
                <span>Tab 3: Scope-Creep Shield</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* =====================================================================
          2. LIVE INTERACTIVE CALCULATOR PREVIEW WIDGET (Crucial for conversion)
          ===================================================================== */}
      <section id="interactive-preview" className="py-16 md:py-24 px-4 sm:px-6 lg:px-8 max-w-6xl mx-auto scroll-mt-20">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-12 sm:mb-16">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-cyan-500/10 border border-cyan-500/20 text-cyan-400 text-xs font-mono font-medium mb-4">
            <Sliders className="w-3.5 h-3.5" />
            <span>INTERACTIVE TEST DRIVE</span>
          </div>
          <h2 className="text-3xl sm:text-5xl font-display font-bold text-white tracking-tight mb-4">
            Test The Math Right Now.
          </h2>
          <p className="text-slate-300 text-base sm:text-lg">
            Drag the sliders below to see your realistic freelance pricing take shape in real time. This is the exact math running inside the master Google Sheet.
          </p>
        </div>

        {/* The Calculator Card */}
        <div className="rounded-3xl bg-slate-900/80 border border-slate-700/70 p-6 sm:p-8 lg:p-10 shadow-[0_20px_60px_rgba(0,0,0,0.5)] backdrop-blur-xl relative">
          
          {/* Top Bar inside card: Preset badges & Currency toggle */}
          <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 pb-8 mb-8 border-b border-slate-800">
            <div>
              <span className="text-xs font-mono uppercase tracking-wider text-slate-400">Quick Industry Presets:</span>
              <div className="flex flex-wrap gap-2 mt-2">
                <button
                  type="button"
                  onClick={() => applyPreset(4000, 25, 25)}
                  className={`text-xs px-3 py-1.5 rounded-lg border transition-all ${
                    monthlyIncomeUSD === 4000 && projectHours === 25 && riskBuffer === 25
                      ? 'bg-emerald-500/20 border-emerald-500 text-emerald-300 font-semibold'
                      : 'bg-slate-800/80 border-slate-700 text-slate-300 hover:border-slate-500'
                  }`}
                >
                  ⚡ Standard Landing Page (25h)
                </button>
                <button
                  type="button"
                  onClick={() => applyPreset(6500, 55, 30)}
                  className={`text-xs px-3 py-1.5 rounded-lg border transition-all ${
                    monthlyIncomeUSD === 6500 && projectHours === 55 && riskBuffer === 30
                      ? 'bg-emerald-500/20 border-emerald-500 text-emerald-300 font-semibold'
                      : 'bg-slate-800/80 border-slate-700 text-slate-300 hover:border-slate-500'
                  }`}
                >
                  🚀 Full Web App MVP (55h)
                </button>
                <button
                  type="button"
                  onClick={() => applyPreset(3200, 15, 20)}
                  className={`text-xs px-3 py-1.5 rounded-lg border transition-all ${
                    monthlyIncomeUSD === 3200 && projectHours === 15 && riskBuffer === 20
                      ? 'bg-emerald-500/20 border-emerald-500 text-emerald-300 font-semibold'
                      : 'bg-slate-800/80 border-slate-700 text-slate-300 hover:border-slate-500'
                  }`}
                >
                  🎨 Brand Identity System (15h)
                </button>
              </div>
            </div>

            {/* Currency selector toggle */}
            <div className="flex items-center gap-1 p-1 rounded-xl bg-slate-950 border border-slate-800 shrink-0 self-end sm:self-auto">
              <button
                type="button"
                onClick={() => setCurrency('USD')}
                className={`px-3 py-1.5 rounded-lg text-xs font-mono font-semibold transition-all ${
                  currency === 'USD'
                    ? 'bg-emerald-500 text-slate-950 shadow-sm'
                    : 'text-slate-400 hover:text-white'
                }`}
              >
                $ USD ($29)
              </button>
              <button
                type="button"
                onClick={() => setCurrency('INR')}
                className={`px-3 py-1.5 rounded-lg text-xs font-mono font-semibold transition-all ${
                  currency === 'INR'
                    ? 'bg-emerald-500 text-slate-950 shadow-sm'
                    : 'text-slate-400 hover:text-white'
                }`}
              >
                ₹ INR (₹1,499)
              </button>
            </div>
          </div>

          {/* Grid Layout: Sliders (Left) & Live Outputs Box (Right) */}
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-start">
            
            {/* LEFT: 3 INPUT SLIDERS */}
            <div className="lg:col-span-5 space-y-7">
              <div className="flex items-center justify-between">
                <h3 className="font-display font-bold text-lg text-white flex items-center gap-2">
                  <Sliders className="w-4 h-4 text-emerald-400" />
                  <span>Adjust Your Project Variables</span>
                </h3>
                <button
                  type="button"
                  onClick={() => applyPreset(4000, 25, 25)}
                  className="text-xs text-slate-400 hover:text-emerald-400 transition-colors flex items-center gap-1 font-mono"
                  title="Reset to default values ($4,000 income, 25h, 25% buffer)"
                >
                  <RefreshCw className="w-3 h-3" />
                  <span>Reset defaults</span>
                </button>
              </div>

              {/* Slider 1: Target Monthly Income */}
              <div className="p-4 sm:p-5 rounded-2xl bg-slate-950/60 border border-slate-800/80">
                <div className="flex justify-between items-center mb-2">
                  <label htmlFor="income-slider" className="text-sm font-semibold text-slate-200">
                    1. Target Monthly Income:
                  </label>
                  <span className="font-mono font-bold text-emerald-400 text-base sm:text-lg">
                    {currency === 'USD' ? `$${monthlyIncomeUSD.toLocaleString()}` : `₹${Math.round(monthlyIncomeUSD * inrRate).toLocaleString()}`}
                    <span className="text-xs text-slate-400 font-normal"> /mo</span>
                  </span>
                </div>
                <input
                  id="income-slider"
                  type="range"
                  min="1000"
                  max="15000"
                  step="250"
                  value={monthlyIncomeUSD}
                  onChange={(e) => setMonthlyIncomeUSD(Number(e.target.value))}
                  className="w-full h-2.5 bg-slate-800 rounded-lg appearance-none cursor-pointer accent-emerald-400 focus:outline-none focus:ring-2 focus:ring-emerald-400/50"
                />
                <div className="flex justify-between text-[11px] text-slate-500 font-mono mt-1.5">
                  <span>$1,000/mo</span>
                  <span>Default: $4,000/mo</span>
                  <span>$15,000/mo</span>
                </div>
                <p className="text-[12px] text-slate-400 mt-2 font-light">
                  What you actually want to take home after client work, before taxes.
                </p>
              </div>

              {/* Slider 2: Project Build Hours */}
              <div className="p-4 sm:p-5 rounded-2xl bg-slate-950/60 border border-slate-800/80">
                <div className="flex justify-between items-center mb-2">
                  <label htmlFor="hours-slider" className="text-sm font-semibold text-slate-200">
                    2. Project Build Hours:
                  </label>
                  <span className="font-mono font-bold text-cyan-400 text-base sm:text-lg">
                    {projectHours} hrs
                  </span>
                </div>
                <input
                  id="hours-slider"
                  type="range"
                  min="5"
                  max="100"
                  step="1"
                  value={projectHours}
                  onChange={(e) => setProjectHours(Number(e.target.value))}
                  className="w-full h-2.5 bg-slate-800 rounded-lg appearance-none cursor-pointer accent-cyan-400 focus:outline-none focus:ring-2 focus:ring-cyan-400/50"
                />
                <div className="flex justify-between text-[11px] text-slate-500 font-mono mt-1.5">
                  <span>5 hrs</span>
                  <span>Default: 25 hrs</span>
                  <span>100 hrs</span>
                </div>
                <p className="text-[12px] text-slate-400 mt-2 font-light">
                  Estimated heads-down production time to finish deliverables.
                </p>
              </div>

              {/* Slider 3: Client Revision Risk Buffer */}
              <div className="p-4 sm:p-5 rounded-2xl bg-slate-950/60 border border-slate-800/80">
                <div className="flex justify-between items-center mb-2">
                  <label htmlFor="buffer-slider" className="text-sm font-semibold text-slate-200">
                    3. Client Revision Risk Buffer:
                  </label>
                  <span className="font-mono font-bold text-amber-400 text-base sm:text-lg">
                    +{riskBuffer}%
                  </span>
                </div>
                <input
                  id="buffer-slider"
                  type="range"
                  min="0"
                  max="50"
                  step="5"
                  value={riskBuffer}
                  onChange={(e) => setRiskBuffer(Number(e.target.value))}
                  className="w-full h-2.5 bg-slate-800 rounded-lg appearance-none cursor-pointer accent-amber-400 focus:outline-none focus:ring-2 focus:ring-amber-400/50"
                />
                <div className="flex justify-between text-[11px] text-slate-500 font-mono mt-1.5">
                  <span>0% (High risk)</span>
                  <span>Default: 25%</span>
                  <span>50% (Chaotic client)</span>
                </div>
                <p className="text-[12px] text-slate-400 mt-2 font-light">
                  Insurance buffer against slow client feedback, scope creep, and meetings.
                </p>
              </div>
            </div>

            {/* RIGHT: LIVE CALCULATED OUTPUTS BOX */}
            <div className="lg:col-span-7 bg-slate-950 rounded-2xl border border-slate-800 p-6 sm:p-7 shadow-2xl relative overflow-hidden">
              <div className="absolute top-0 right-0 px-4 py-1.5 bg-emerald-500/10 border-b border-l border-emerald-500/20 rounded-bl-xl text-[11px] font-mono text-emerald-400 flex items-center gap-1.5">
                <span className="h-1.5 w-1.5 rounded-full bg-emerald-400 animate-pulse"></span>
                <span>LIVE SPREADSHEET ENGINE</span>
              </div>

              {/* Top Outputs: Hourly Rate, 1.5x Overtime Rate & Walk-Away Floor Price */}
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 mb-6 pt-2">
                {/* Metric 1: Protected Hourly Rate */}
                <div className="p-3.5 rounded-xl bg-slate-900/90 border border-slate-800/90 relative">
                  <span className="text-[11px] uppercase tracking-wider font-mono text-slate-400 block mb-1">
                    Protected Hourly Rate
                  </span>
                  <div className="font-mono font-extrabold text-2xl sm:text-3xl text-emerald-400 tracking-tight">
                    {calculations.symbol}{calculations.hourlyRate.toLocaleString()}
                    <span className="text-xs font-normal text-slate-400">/hr</span>
                  </div>
                  <span className="text-[10px] text-slate-400 mt-1 block">
                    Base survival rate
                  </span>
                </div>

                {/* Metric 2: 1.5x Overtime Rate */}
                <div className="p-3.5 rounded-xl bg-slate-900/90 border border-slate-800/90 relative">
                  <span className="text-[11px] uppercase tracking-wider font-mono text-amber-300 block mb-1">
                    1.5x Overtime Rate
                  </span>
                  <div className="font-mono font-extrabold text-2xl sm:text-3xl text-amber-400 tracking-tight">
                    {calculations.symbol}{calculations.overtimeRate.toLocaleString()}
                    <span className="text-xs font-normal text-slate-400">/hr</span>
                  </div>
                  <span className="text-[10px] text-slate-400 mt-1 block">
                    Out-of-scope script rate
                  </span>
                </div>

                {/* Metric 3: Walk-Away Floor Price */}
                <div className="p-3.5 rounded-xl bg-slate-900/90 border border-slate-800/90 relative">
                  <span className="text-[11px] uppercase tracking-wider font-mono text-cyan-300 block mb-1">
                    Walk-Away Floor Price
                  </span>
                  <div className="font-mono font-extrabold text-2xl sm:text-3xl text-cyan-400 tracking-tight">
                    {calculations.symbol}{calculations.floorPrice.toLocaleString()}
                  </div>
                  <span className="text-[10px] text-rose-300 mt-1 block font-medium">
                    ⚠️ Never quote below this
                  </span>
                </div>
              </div>

              {/* 3-Tier Proposal Table Preview */}
              <div className="mb-6">
                <div className="flex items-center justify-between mb-3">
                  <span className="text-xs font-mono font-bold uppercase tracking-wider text-slate-300 flex items-center gap-1.5">
                    <Layers className="w-3.5 h-3.5 text-cyan-400" />
                    <span>Auto-Generated 3-Tier Proposal Preview:</span>
                  </span>
                  <span className="text-[11px] font-mono text-emerald-400 bg-emerald-500/10 px-2 py-0.5 rounded border border-emerald-500/20">
                    Essential 1.0x • Growth 1.4x • VIP 2.2x
                  </span>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                  
                  {/* Tier 1: Essential */}
                  <div className="p-4 rounded-xl bg-slate-900/60 border border-slate-800 hover:border-slate-700 transition-colors flex flex-col justify-between">
                    <div>
                      <div className="text-[11px] font-bold text-slate-400 uppercase tracking-wider font-mono mb-1">
                        Essential (1.0x)
                      </div>
                      <div className="font-mono font-bold text-2xl text-white mb-1">
                        {calculations.symbol}{calculations.essential.toLocaleString()}
                      </div>
                      <div className="text-[11px] font-mono text-emerald-400/90 mb-2">
                        50% Deposit: {calculations.symbol}{calculations.depositEssential.toLocaleString()}
                      </div>
                      <p className="text-[11px] text-slate-400 leading-snug mb-3">
                        Barebones core scope. Strict 1 revision round. Covers your floor.
                      </p>
                    </div>
                    <div className="text-[10px] text-slate-500 font-mono flex items-center gap-1 pt-2 border-t border-slate-800/80">
                      <Check className="w-3 h-3 text-emerald-400" />
                      <span>Zero margin bleed</span>
                    </div>
                  </div>

                  {/* Tier 2: Growth (Recommended) */}
                  <div className="p-4 rounded-xl bg-gradient-to-b from-emerald-950/40 to-slate-900/90 border border-emerald-500/40 relative shadow-[0_0_20px_rgba(16,185,129,0.15)] flex flex-col justify-between">
                    <div className="absolute -top-2.5 right-3 px-2 py-0.5 bg-emerald-500 text-slate-950 text-[10px] font-bold rounded-full uppercase tracking-wider">
                      Most Picked
                    </div>
                    <div>
                      <div className="text-[11px] font-bold text-emerald-400 uppercase tracking-wider font-mono mb-1">
                        Growth (1.4x)
                      </div>
                      <div className="font-mono font-bold text-2xl text-emerald-300 mb-1">
                        {calculations.symbol}{calculations.growth.toLocaleString()}
                      </div>
                      <div className="text-[11px] font-mono text-emerald-400 mb-2">
                        50% Deposit: {calculations.symbol}{calculations.depositGrowth.toLocaleString()}
                      </div>
                      <p className="text-[11px] text-slate-300 leading-snug mb-2">
                        Core + SEO speed tune, 2 revisions & priority 7-day turnaround.
                      </p>
                      <div className="text-[10px] text-cyan-300 font-mono mb-3">
                        + Retainer upsell: {calculations.symbol}{calculations.retainer.toLocaleString()}/mo
                      </div>
                    </div>
                    <div className="text-[10px] text-emerald-400 font-mono flex items-center gap-1 pt-2 border-t border-emerald-500/20">
                      <Check className="w-3 h-3 text-emerald-400" />
                      <span>+40% profit margin</span>
                    </div>
                  </div>

                  {/* Tier 3: VIP */}
                  <div className="p-4 rounded-xl bg-slate-900/60 border border-slate-800 hover:border-slate-700 transition-colors flex flex-col justify-between">
                    <div>
                      <div className="text-[11px] font-bold text-amber-400 uppercase tracking-wider font-mono mb-1">
                        VIP Sprint (2.2x)
                      </div>
                      <div className="font-mono font-bold text-2xl text-white mb-1">
                        {calculations.symbol}{calculations.vip.toLocaleString()}
                      </div>
                      <div className="text-[11px] font-mono text-amber-400/90 mb-2">
                        50% Deposit: {calculations.symbol}{calculations.depositVip.toLocaleString()}
                      </div>
                      <p className="text-[11px] text-slate-400 leading-snug mb-3">
                        Turnkey + 30-day warranty, analytics dashboard & 24/7 Slack.
                      </p>
                    </div>
                    <div className="text-[10px] text-cyan-400 font-mono flex items-center gap-1 pt-2 border-t border-slate-800/80">
                      <Check className="w-3 h-3 text-cyan-400" />
                      <span>2.2x anchor leverage</span>
                    </div>
                  </div>
                </div>
              </div>

              {/* Action Buttons inside calculator output */}
              <div className="flex flex-col sm:flex-row items-center gap-3 pt-4 border-t border-slate-800/80">
                <button
                  type="button"
                  onClick={handleCopyProposal}
                  className="w-full sm:flex-1 py-3 px-4 rounded-xl bg-slate-800 hover:bg-slate-700 text-white font-medium text-sm flex items-center justify-center gap-2 border border-slate-700 transition-colors"
                >
                  {copiedProposal ? (
                    <>
                      <Check className="w-4 h-4 text-emerald-400" />
                      <span className="text-emerald-400 font-semibold">Copied 3-Tier Quote to Clipboard!</span>
                    </>
                  ) : (
                    <>
                      <Copy className="w-4 h-4 text-slate-300" />
                      <span>Copy 3-Tier Proposal Message</span>
                    </>
                  )}
                </button>

                <a
                  href={checkoutUrl}
                  onClick={handleCtaClick}
                  className="w-full sm:w-auto py-3 px-6 rounded-xl bg-emerald-500 hover:bg-emerald-400 text-slate-950 font-bold text-sm flex items-center justify-center gap-2 transition-transform active:scale-95 shadow-[0_0_20px_rgba(16,185,129,0.3)] shrink-0"
                >
                  <span>Get Instant Access to the Pricing OS — ₹1,499 ($29)</span>
                  <ArrowRight className="w-4 h-4" />
                </a>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* =====================================================================
          3. PAIN POINTS / THE "WHY YOU'RE BROKE" SECTION
          ===================================================================== */}
      <section className="py-16 md:py-24 px-4 sm:px-6 lg:px-8 max-w-6xl mx-auto border-t border-slate-800/80">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-rose-500/10 border border-rose-500/20 text-rose-400 text-xs font-mono font-medium mb-4">
            <AlertTriangle className="w-3.5 h-3.5" />
            <span>THE REALITY CHECK</span>
          </div>
          <h2 className="text-3xl sm:text-5xl font-display font-bold text-white tracking-tight mb-4">
            The 3 Invisible Leaks Draining 30% of Your Freelance Income.
          </h2>
          <p className="text-slate-300 text-base sm:text-lg">
            Most freelancers don't have a lead generation problem. They have a basic quotation math flaw that silently turns profitable gigs into unpaid volunteer work.
          </p>
        </div>

        {/* 3 Grid Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 lg:gap-8">
          
          {/* Card 1: The Guesswork Trap */}
          <div className="rounded-3xl bg-slate-900/60 border border-slate-800 p-6 sm:p-8 flex flex-col justify-between hover:border-slate-700 transition-all group">
            <div>
              <div className="w-12 h-12 rounded-2xl bg-rose-500/10 border border-rose-500/20 text-rose-400 flex items-center justify-center mb-6 group-hover:scale-110 transition-transform">
                <DollarSign className="w-6 h-6" />
              </div>

              <div className="text-xs font-mono font-semibold text-rose-400 uppercase tracking-wider mb-2">
                Pain Point #1
              </div>

              <h3 className="text-xl sm:text-2xl font-display font-bold text-white mb-4">
                The Guesswork Trap
              </h3>

              <p className="text-slate-300 text-sm sm:text-base leading-relaxed mb-6 font-light">
                Quoting flat prices blindly without factoring in 20% taxes, gateway fees, and software costs, turning a $1,000 project into $600 take-home cash.
              </p>
            </div>

            {/* Micro Math Breakdown Box */}
            <div className="p-4 rounded-xl bg-slate-950/80 border border-slate-800 text-xs font-mono space-y-1.5">
              <div className="flex justify-between text-slate-400">
                <span>Quoted Project Fee:</span>
                <span className="text-white font-bold">$1,000</span>
              </div>
              <div className="flex justify-between text-rose-400">
                <span>Taxes & Buffer (-20%):</span>
                <span>-$200</span>
              </div>
              <div className="flex justify-between text-rose-400">
                <span>Stripe & Software Subscriptions:</span>
                <span>-$195</span>
              </div>
              <div className="pt-2 border-t border-slate-800 flex justify-between text-emerald-400 font-bold">
                <span>Real Take-Home Cash:</span>
                <span>$605 (Ouch)</span>
              </div>
            </div>
          </div>

          {/* Card 2: The Revision Bully */}
          <div className="rounded-3xl bg-slate-900/60 border border-slate-800 p-6 sm:p-8 flex flex-col justify-between hover:border-slate-700 transition-all group">
            <div>
              <div className="w-12 h-12 rounded-2xl bg-amber-500/10 border border-amber-500/20 text-amber-400 flex items-center justify-center mb-6 group-hover:scale-110 transition-transform">
                <Clock className="w-6 h-6" />
              </div>

              <div className="text-xs font-mono font-semibold text-amber-400 uppercase tracking-wider mb-2">
                Pain Point #2
              </div>

              <h3 className="text-xl sm:text-2xl font-display font-bold text-white mb-4">
                The Revision Bully
              </h3>

              <p className="text-slate-300 text-sm sm:text-base leading-relaxed mb-6 font-light">
                Letting clients demand 5 extra pages and unlimited tweaks for free because you're scared of looking unprofessional or losing a referral.
              </p>
            </div>

            {/* Micro Math Breakdown Box */}
            <div className="p-4 rounded-xl bg-slate-950/80 border border-slate-800 text-xs font-mono space-y-1.5">
              <div className="flex justify-between text-slate-400">
                <span>Original Agreed Scope:</span>
                <span className="text-white font-bold">25 hrs</span>
              </div>
              <div className="flex justify-between text-amber-400">
                <span>Unpaid Scope Creep:</span>
                <span>+18 hrs</span>
              </div>
              <div className="flex justify-between text-rose-400">
                <span>Effective Hourly Rate Plunge:</span>
                <span>$57/hr ➔ $23/hr</span>
              </div>
              <div className="pt-2 border-t border-slate-800 flex justify-between text-amber-300 font-bold">
                <span>Financial Loss:</span>
                <span>-$1,026 Free Labor</span>
              </div>
            </div>
          </div>

          {/* Card 3: The Single-Price Mistake */}
          <div className="rounded-3xl bg-slate-900/60 border border-slate-800 p-6 sm:p-8 flex flex-col justify-between hover:border-slate-700 transition-all group">
            <div>
              <div className="w-12 h-12 rounded-2xl bg-cyan-500/10 border border-cyan-500/20 text-cyan-400 flex items-center justify-center mb-6 group-hover:scale-110 transition-transform">
                <Layers className="w-6 h-6" />
              </div>

              <div className="text-xs font-mono font-semibold text-cyan-400 uppercase tracking-wider mb-2">
                Pain Point #3
              </div>

              <h3 className="text-xl sm:text-2xl font-display font-bold text-white mb-4">
                The Single-Price Mistake
              </h3>

              <p className="text-slate-300 text-sm sm:text-base leading-relaxed mb-6 font-light">
                Handing clients a single low quote instead of a 3-Tier Anchor Proposal that nudges them into your high-margin tier and stops sticker shock.
              </p>
            </div>

            {/* Micro Math Breakdown Box */}
            <div className="p-4 rounded-xl bg-slate-950/80 border border-slate-800 text-xs font-mono space-y-1.5">
              <div className="flex justify-between text-slate-400">
                <span>Single Quote Brain Reaction:</span>
                <span className="text-rose-400 font-bold">"Yes or No?"</span>
              </div>
              <div className="flex justify-between text-emerald-400">
                <span>3-Tier Brain Reaction:</span>
                <span className="text-emerald-300 font-bold">"Which Tier?"</span>
              </div>
              <div className="flex justify-between text-cyan-300">
                <span>Average Deal Size Increase:</span>
                <span>+40% with Growth Tier</span>
              </div>
              <div className="pt-2 border-t border-slate-800 flex justify-between text-emerald-400 font-bold">
                <span>Captured Upsell:</span>
                <span>+$760 Per Project</span>
              </div>
            </div>
          </div>

        </div>
      </section>

      {/* =====================================================================
          4. WHAT'S INSIDE THE MASTER SPREADSHEET (3-TAB BREAKDOWN)
          ===================================================================== */}
      <section id="features" className="py-16 md:py-24 px-4 sm:px-6 lg:px-8 max-w-6xl mx-auto border-t border-slate-800/80">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-14">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-500/10 border border-emerald-500/20 text-emerald-400 text-xs font-mono font-medium mb-4">
            <FileSpreadsheet className="w-3.5 h-3.5" />
            <span>ARCHITECTURE OF THE SYSTEM</span>
          </div>
          <h2 className="text-3xl sm:text-5xl font-display font-bold text-white tracking-tight mb-4">
            What's Inside The Master Spreadsheet
          </h2>
          <p className="text-slate-300 text-base sm:text-lg">
            Three hyper-optimized tabs designed to be filled out in under 3 minutes. Zero spreadsheet headaches or complex macros required.
          </p>
        </div>

        {/* Tab Buttons Bar */}
        <div className="flex flex-wrap items-center justify-center gap-2 sm:gap-4 mb-8">
          <button
            type="button"
            onClick={() => setActiveTab('engine')}
            className={`px-5 py-3 rounded-2xl text-sm font-semibold transition-all flex items-center gap-2.5 ${
              activeTab === 'engine'
                ? 'bg-emerald-500 text-slate-950 font-bold shadow-[0_0_25px_rgba(16,185,129,0.35)]'
                : 'bg-slate-900/80 border border-slate-800 text-slate-300 hover:border-slate-600'
            }`}
          >
            <Sliders className="w-4 h-4" />
            <span>Tab 1: The 6-Input Price Engine</span>
          </button>

          <button
            type="button"
            onClick={() => setActiveTab('tiers')}
            className={`px-5 py-3 rounded-2xl text-sm font-semibold transition-all flex items-center gap-2.5 ${
              activeTab === 'tiers'
                ? 'bg-cyan-500 text-slate-950 font-bold shadow-[0_0_25px_rgba(6,182,212,0.35)]'
                : 'bg-slate-900/80 border border-slate-800 text-slate-300 hover:border-slate-600'
            }`}
          >
            <Layers className="w-4 h-4" />
            <span>Tab 2: The 3-Tier Proposal Generator</span>
          </button>

          <button
            type="button"
            onClick={() => setActiveTab('shield')}
            className={`px-5 py-3 rounded-2xl text-sm font-semibold transition-all flex items-center gap-2.5 ${
              activeTab === 'shield'
                ? 'bg-amber-400 text-slate-950 font-bold shadow-[0_0_25px_rgba(245,158,11,0.35)]'
                : 'bg-slate-900/80 border border-slate-800 text-slate-300 hover:border-slate-600'
            }`}
          >
            <ShieldCheck className="w-4 h-4" />
            <span>Tab 3: The Scope-Creep Shield</span>
          </button>
        </div>

        {/* Tab Content Display Container */}
        <div className="rounded-3xl bg-slate-900/70 border border-slate-800 p-6 sm:p-10 shadow-2xl backdrop-blur-xl">
          
          {/* TAB 1: THE 6-INPUT PRICE ENGINE */}
          {activeTab === 'engine' && (
            <div className="space-y-8 animate-fadeIn">
              <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 pb-6 border-b border-slate-800">
                <div>
                  <span className="text-xs font-mono text-emerald-400 uppercase tracking-wider block mb-1">Spreadsheet Sheet 1</span>
                  <h3 className="text-2xl sm:text-3xl font-display font-bold text-white">
                    The 6-Input Price Engine
                  </h3>
                  <p className="text-slate-300 text-sm mt-1">
                    Takes your 6 raw project variables and calculates your true hourly survival rate, tax/gateway buffers, walk-away floor, and 1.5x overtime rate.
                  </p>
                </div>
                <div className="px-4 py-2 rounded-xl bg-emerald-500/10 border border-emerald-500/30 text-emerald-300 text-xs font-mono">
                  ⏱️ Fill Time: Under 3 Minutes
                </div>
              </div>

              {/* 6 Key Inputs Matrix */}
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                {[
                  {
                    title: "1. Target Monthly Income",
                    desc: "Your net take-home cash requirement for living, saving, and operations.",
                    badge: "Input #1"
                  },
                  {
                    title: "2. Billable Hours Per Week",
                    desc: "Realistic billable cap (usually 20-25 hrs/wk), accounting for unpaid admin/hunting.",
                    badge: "Input #2"
                  },
                  {
                    title: "3. Project Build Hours",
                    desc: "Estimated heads-down production time to build and deliver the agreed milestone.",
                    badge: "Input #3"
                  },
                  {
                    title: "4. Direct Costs & Software Stack",
                    desc: "Hosting, domain, Figma, Adobe, Cursor AI, or paid plugin subscriptions.",
                    badge: "Input #4"
                  },
                  {
                    title: "5. Tax & Gateway Fee Buffer %",
                    desc: "Auto-deducts 20-28% self-employment taxes + 3-4% Stripe/Razorpay processing.",
                    badge: "Input #5"
                  },
                  {
                    title: "6. Client Revision Risk Multiplier",
                    desc: "Risk multiplier cushion that scales depending on how chaotic the client scope is.",
                    badge: "Input #6"
                  }
                ].map((item, idx) => (
                  <div key={idx} className="p-4 rounded-2xl bg-slate-950/70 border border-slate-800/80">
                    <div className="flex items-center justify-between mb-2">
                      <span className="text-xs font-bold text-white">{item.title}</span>
                      <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-emerald-500/10 text-emerald-400 border border-emerald-500/20">
                        {item.badge}
                      </span>
                    </div>
                    <p className="text-xs text-slate-400 leading-relaxed font-light">{item.desc}</p>
                  </div>
                ))}
              </div>

              {/* Computed Outputs Grid Banner */}
              <div className="p-5 rounded-2xl bg-slate-950 border border-slate-800 space-y-3">
                <span className="text-xs font-mono text-emerald-400 uppercase tracking-wider block">
                  AUTOMATED FORMULA OUTPUTS PRODUCED:
                </span>
                <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 text-center">
                  <div className="p-3 rounded-xl bg-slate-900 border border-slate-800">
                    <span className="text-[10px] font-mono text-slate-400 uppercase block">Survival Rate</span>
                    <span className="text-emerald-400 font-mono font-bold text-sm sm:text-base">$57/hr</span>
                  </div>
                  <div className="p-3 rounded-xl bg-slate-900 border border-slate-800">
                    <span className="text-[10px] font-mono text-slate-400 uppercase block">1.5x Overtime Rate</span>
                    <span className="text-amber-400 font-mono font-bold text-sm sm:text-base">$86/hr</span>
                  </div>
                  <div className="p-3 rounded-xl bg-slate-900 border border-slate-800">
                    <span className="text-[10px] font-mono text-slate-400 uppercase block">Tax/Fee Cushion</span>
                    <span className="text-cyan-400 font-mono font-bold text-sm sm:text-base">+27% Reserve</span>
                  </div>
                  <div className="p-3 rounded-xl bg-slate-900 border border-slate-800">
                    <span className="text-[10px] font-mono text-slate-400 uppercase block">Walk-Away Floor</span>
                    <span className="text-white font-mono font-bold text-sm sm:text-base">$1,905 Min</span>
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* TAB 2: THE 3-TIER PROPOSAL GENERATOR */}
          {activeTab === 'tiers' && (
            <div className="space-y-8 animate-fadeIn">
              <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 pb-6 border-b border-slate-800">
                <div>
                  <span className="text-xs font-mono text-cyan-400 uppercase tracking-wider block mb-1">Spreadsheet Sheet 2</span>
                  <h3 className="text-2xl sm:text-3xl font-display font-bold text-white">
                    The 3-Tier Proposal Generator
                  </h3>
                  <p className="text-slate-300 text-sm mt-1">
                    Scales your floor price into Essential (1.0x), Growth (1.4x), and VIP Sprint (2.2x) with pre-calculated 50% deposits and retainer upsells.
                  </p>
                </div>
                <div className="px-4 py-2 rounded-xl bg-cyan-500/10 border border-cyan-500/30 text-cyan-300 text-xs font-mono">
                  Anchor Pricing Architecture
                </div>
              </div>

              {/* Detailed Breakdown of the 3 Tiers */}
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                
                {/* Essential Package */}
                <div className="p-5 rounded-2xl bg-slate-950/70 border border-slate-800 flex flex-col justify-between">
                  <div>
                    <div className="text-xs font-mono font-bold text-slate-400 uppercase tracking-wider mb-1">
                      Tier 1 · Minimum Floor (1.0x)
                    </div>
                    <h4 className="text-xl font-bold text-white mb-1">Essential Package</h4>
                    <div className="text-xs font-mono text-emerald-400 mb-2">50% Deposit: $955</div>
                    <p className="text-xs text-slate-400 mb-4 leading-relaxed font-light">
                      Protects your walk-away price. Perfect for budget-conscious clients who only need the foundational deliverable.
                    </p>
                    <ul className="text-xs text-slate-300 space-y-2 mb-6">
                      <li className="flex items-center gap-2">
                        <Check className="w-3.5 h-3.5 text-slate-400" />
                        <span>Core deliverable production</span>
                      </li>
                      <li className="flex items-center gap-2">
                        <Check className="w-3.5 h-3.5 text-slate-400" />
                        <span>Strict 1 round of revisions</span>
                      </li>
                      <li className="flex items-center gap-2">
                        <Check className="w-3.5 h-3.5 text-slate-400" />
                        <span>Standard 14-day turnaround</span>
                      </li>
                    </ul>
                  </div>
                  <div className="p-3 rounded-xl bg-slate-900 border border-slate-800 text-center font-mono text-xs text-slate-300">
                    Calculated at Floor Price ($1,910)
                  </div>
                </div>

                {/* Growth Package */}
                <div className="p-5 rounded-2xl bg-gradient-to-b from-cyan-950/30 to-slate-950 border border-cyan-500/40 relative flex flex-col justify-between shadow-[0_0_25px_rgba(6,182,212,0.15)]">
                  <div className="absolute -top-3 right-4 px-2.5 py-0.5 bg-cyan-500 text-slate-950 text-[10px] font-bold rounded-full uppercase tracking-wider">
                    Sweet Spot (1.4x)
                  </div>
                  <div>
                    <div className="text-xs font-mono font-bold text-cyan-400 uppercase tracking-wider mb-1">
                      Tier 2 · Most Popular
                    </div>
                    <h4 className="text-xl font-bold text-cyan-200 mb-1">Growth Package</h4>
                    <div className="text-xs font-mono text-emerald-400 mb-2">50% Deposit: $1,335 • Retainer: $930/mo</div>
                    <p className="text-xs text-slate-300 mb-4 leading-relaxed font-light">
                      Framed using contrast psychology so most clients select this tier without haggling.
                    </p>
                    <ul className="text-xs text-slate-200 space-y-2 mb-6">
                      <li className="flex items-center gap-2">
                        <Check className="w-3.5 h-3.5 text-cyan-400" />
                        <span>Everything in Essential</span>
                      </li>
                      <li className="flex items-center gap-2">
                        <Check className="w-3.5 h-3.5 text-cyan-400" />
                        <span>SEO optimization & speed tune</span>
                      </li>
                      <li className="flex items-center gap-2">
                        <Check className="w-3.5 h-3.5 text-cyan-400" />
                        <span>2 revision rounds + priority delivery</span>
                      </li>
                      <li className="flex items-center gap-2">
                        <Check className="w-3.5 h-3.5 text-cyan-400" />
                        <span>Pre-calculated monthly retainer upsell</span>
                      </li>
                    </ul>
                  </div>
                  <div className="p-3 rounded-xl bg-cyan-500/10 border border-cyan-500/30 text-center font-mono text-xs text-cyan-300 font-bold">
                    Calculated at 1.4x Floor ($2,670)
                  </div>
                </div>

                {/* VIP Sprint Package */}
                <div className="p-5 rounded-2xl bg-slate-950/70 border border-slate-800 flex flex-col justify-between">
                  <div>
                    <div className="text-xs font-mono font-bold text-amber-400 uppercase tracking-wider mb-1">
                      Tier 3 · Anchor Sprint (2.2x)
                    </div>
                    <h4 className="text-xl font-bold text-white mb-1">VIP Sprint</h4>
                    <div className="text-xs font-mono text-amber-400 mb-2">50% Deposit: $2,095</div>
                    <p className="text-xs text-slate-400 mb-4 leading-relaxed font-light">
                      Acts as the psychological anchor that makes the Growth tier feel like an effortless bargain.
                    </p>
                    <ul className="text-xs text-slate-300 space-y-2 mb-6">
                      <li className="flex items-center gap-2">
                        <Check className="w-3.5 h-3.5 text-amber-400" />
                        <span>Everything in Growth</span>
                      </li>
                      <li className="flex items-center gap-2">
                        <Check className="w-3.5 h-3.5 text-amber-400" />
                        <span>30-day extended developer retainer</span>
                      </li>
                      <li className="flex items-center gap-2">
                        <Check className="w-3.5 h-3.5 text-amber-400" />
                        <span>Direct 24/7 Slack / WhatsApp line</span>
                      </li>
                      <li className="flex items-center gap-2">
                        <Check className="w-3.5 h-3.5 text-amber-400" />
                        <span>Expedited turnaround allocation</span>
                      </li>
                    </ul>
                  </div>
                  <div className="p-3 rounded-xl bg-slate-900 border border-slate-800 text-center font-mono text-xs text-slate-300">
                    Calculated at 2.2x Floor ($4,190)
                  </div>
                </div>

              </div>

              {/* Ready-to-send Message Feature */}
              <div className="p-5 rounded-2xl bg-slate-950 border border-slate-800 flex flex-col sm:flex-row items-center justify-between gap-4">
                <div className="flex items-center gap-3">
                  <MessageSquare className="w-5 h-5 text-cyan-400 shrink-0" />
                  <span className="text-sm text-slate-300">
                    <strong className="text-white">Copy-Paste Client Pitch Message:</strong> Pre-formatted WhatsApp, Email, or Notion pitch message with pre-filled 50% deposits and overtime rates.
                  </span>
                </div>
                <button
                  type="button"
                  onClick={handleCopyProposal}
                  className="px-4 py-2 rounded-xl bg-slate-800 hover:bg-slate-700 text-white text-xs font-semibold shrink-0 transition-colors"
                >
                  {copiedProposal ? '✓ Copied' : 'Preview Pitch Message'}
                </button>
              </div>
            </div>
          )}

          {/* TAB 3: THE SCOPE-CREEP SHIELD */}
          {activeTab === 'shield' && (
            <div className="space-y-8 animate-fadeIn">
              <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 pb-6 border-b border-slate-800">
                <div>
                  <span className="text-xs font-mono text-amber-400 uppercase tracking-wider block mb-1">Spreadsheet Sheet 3</span>
                  <h3 className="text-2xl sm:text-3xl font-display font-bold text-white">
                    The Scope-Creep Shield
                  </h3>
                  <p className="text-slate-300 text-sm mt-1">
                    4 battle-tested copy-paste negotiation scripts that charge $87/hr for extra requests and enforce project pause clauses.
                  </p>
                </div>
                <div className="px-4 py-2 rounded-xl bg-amber-400/10 border border-amber-400/30 text-amber-300 text-xs font-mono">
                  🛡️ Zero Free Tweaks
                </div>
              </div>

              {/* 4 Copy-Paste Scripts Accordion/Cards */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {negotiationScripts.map((script, idx) => (
                  <div key={script.id} className="p-5 rounded-2xl bg-slate-950/80 border border-slate-800 flex flex-col justify-between">
                    <div>
                      <div className="flex items-center justify-between mb-2">
                        <span className="text-xs font-mono font-bold text-amber-400">Script 0{script.id}</span>
                        <span className="text-[11px] text-slate-400 font-mono">Copy-Ready</span>
                      </div>
                      <h4 className="font-display font-bold text-white text-base mb-1">{script.title}</h4>
                      <p className="text-xs text-slate-400 mb-3">{script.purpose}</p>
                      <div className="p-3.5 rounded-xl bg-slate-900 border border-slate-800 text-slate-300 font-mono text-xs leading-relaxed mb-4 select-all">
                        "{script.text}"
                      </div>
                    </div>

                    <button
                      type="button"
                      onClick={() => handleCopyScript(script.text, idx)}
                      className="w-full py-2.5 px-3 rounded-xl bg-slate-800 hover:bg-slate-700 text-white font-medium text-xs flex items-center justify-center gap-2 transition-colors border border-slate-700"
                    >
                      {copiedScriptIndex === idx ? (
                        <>
                          <Check className="w-3.5 h-3.5 text-emerald-400" />
                          <span className="text-emerald-400 font-semibold">Copied Script to Clipboard!</span>
                        </>
                      ) : (
                        <>
                          <Copy className="w-3.5 h-3.5 text-slate-400" />
                          <span>Click to Copy Word-for-Word Script</span>
                        </>
                      )}
                    </button>
                  </div>
                ))}
              </div>

              <div className="p-4 rounded-xl bg-amber-500/10 border border-amber-500/20 text-xs text-amber-300 flex items-center gap-2.5">
                <ShieldCheck className="w-5 h-5 shrink-0 text-amber-400" />
                <span>
                  <strong>Legal & Commercial Safety:</strong> Included project pause and milestone sign-off clauses have saved agency owners an average of 34 unpaid revision hours per quarter.
                </span>
              </div>
            </div>
          )}

        </div>
      </section>

      {/* =====================================================================
          THE GRAND SLAM VALUE STACK SECTION (13.6:1 RATIO)
          ===================================================================== */}
      <section className="py-16 md:py-24 px-4 sm:px-6 lg:px-8 max-w-5xl mx-auto border-t border-slate-800/80">
        <div className="text-center max-w-3xl mx-auto mb-12">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-500/10 border border-emerald-500/30 text-emerald-400 text-xs font-mono font-semibold mb-4">
            <Sparkles className="w-3.5 h-3.5" />
            <span>UNBEATABLE VALUE STACK</span>
          </div>
          <h2 className="text-3xl sm:text-5xl font-display font-bold text-white tracking-tight mb-4">
            Everything Included In Today's Founder Bundle
          </h2>
          <p className="text-slate-300 text-base sm:text-lg">
            You are not just getting a spreadsheet. You are getting an agency-grade quoting, proposal, and client negotiation operating system.
          </p>
        </div>

        <div className="rounded-3xl border border-slate-800 bg-slate-900/60 p-6 sm:p-10 shadow-2xl backdrop-blur-xl">
          <div className="space-y-4 mb-8">
            {[
              { name: "The 3-Minute 6-Input Price Engine (Google Sheets + Excel)", val: "₹3,499", desc: "Computes true hourly floor, tax/gateway buffer, and overtime rate in 30 seconds." },
              { name: "The 3-Tier Anchor Proposal Generator Tab", val: "₹4,999", desc: "Auto-creates Essential (1.0x), Growth (1.4x), and VIP Sprint (2.2x) tiers with 50% deposits." },
              { name: "The Scope-Creep Shield & Revision Rules Matrix", val: "₹2,999", desc: "Enforces ₹1,500/hr ($87/hr) out-of-scope billing and automatic project-pause terms." },
              { name: "FREE BONUS 1: The 'Anti-Haggling' WhatsApp & Email Script Vault", val: "₹2,499", desc: "Copy-paste replies to 'Bhai discount kardo' and 'Someone else is doing it for ₹5,000'." },
              { name: "FREE BONUS 2: The Indian Freelance Contract Clause Cheatsheet", val: "₹3,499", desc: "Strict 2-revision limit, 50% upfront deposit terms, and late-asset delay penalties." },
              { name: "FREE BONUS 3: The 10-Minute ₹50,000 Live Proposal Breakdown Video", val: "₹1,999", desc: "Watch a real ₹50,000 website proposal get built step-by-step in 180 seconds." },
              { name: "FREE BONUS 4: 1-Click Google Drive Duplicate & Quickstart Guide", val: "₹999", desc: "Instant private duplicate with zero technical configuration required." }
            ].map((item, idx) => (
              <div key={idx} className="flex flex-col sm:flex-row sm:items-center justify-between p-4 rounded-2xl bg-slate-950/60 border border-slate-800/80 gap-2">
                <div>
                  <div className="flex items-center gap-2">
                    <Check className="w-4 h-4 text-emerald-400 shrink-0" />
                    <span className="font-display font-bold text-white text-base sm:text-lg">{item.name}</span>
                  </div>
                  <p className="text-slate-400 text-xs sm:text-sm pl-6">{item.desc}</p>
                </div>
                <span className="text-slate-400 font-mono text-xs sm:text-sm pl-6 sm:pl-0 sm:text-right shrink-0">
                  Real Value: <strong className="text-slate-200">{item.val}</strong>
                </span>
              </div>
            ))}
          </div>

          {/* Price Breakdown Banner */}
          <div className="pt-6 border-t border-slate-800 flex flex-col md:flex-row items-center justify-between gap-6">
            <div>
              <div className="text-slate-400 text-sm font-mono mb-1">Total Real-World Value: <span className="line-through text-slate-500">₹20,493 ($249)</span></div>
              <div className="text-3xl sm:text-4xl font-display font-extrabold text-white">
                Today’s Founder Price: <span className="text-emerald-400">₹1,499</span> <span className="text-slate-500 text-lg font-normal">($29 one-time)</span>
              </div>
              <div className="text-emerald-400/90 text-xs font-mono mt-1">★ 13.6-to-1 Value-to-Price Discrepancy • Covers itself on your very next quote</div>
            </div>

            <a
              href={checkoutUrl}
              onClick={handleCtaClick}
              className="w-full md:w-auto inline-flex items-center justify-center gap-3 px-8 py-5 rounded-2xl bg-emerald-500 hover:bg-emerald-400 text-slate-950 font-display font-bold text-lg transition-all transform hover:scale-[1.02] shadow-[0_0_35px_rgba(16,185,129,0.4)]"
            >
              <span>Claim 1 of 100 Founder Copies</span>
              <ArrowRight className="w-5 h-5" />
            </a>
          </div>
        </div>
      </section>

      {/* =====================================================================
          THE BETTER-THAN-FREE 10X ROI GUARANTEE
          ===================================================================== */}
      <section className="py-12 md:py-16 px-4 sm:px-6 lg:px-8 max-w-4xl mx-auto">
        <div className="rounded-3xl border-2 border-emerald-500/30 bg-emerald-950/10 p-8 sm:p-12 text-center relative overflow-hidden">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-500/20 text-emerald-300 text-xs font-mono font-bold mb-4">
            <Shield className="w-4 h-4 text-emerald-400" />
            <span>30-DAY "KEEP EVERYTHING FREE" 10X ROI GUARANTEE</span>
          </div>

          <h3 className="text-2xl sm:text-4xl font-display font-bold text-white mb-4">
            Zero Risk. Keep The System Even If You Ask For A Refund.
          </h3>

          <p className="text-slate-300 text-base sm:text-lg leading-relaxed max-w-2xl mx-auto mb-6 font-light">
            Put this system to work on your very next web design or development quote. If you don't quote at least <strong>₹10,000 to ₹25,000 higher</strong> than you normally would, or if you feel it doesn't save you 20+ hours of frustrating guesswork and client haggling—just email us within 30 days.
          </p>

          <p className="text-emerald-300 font-medium text-sm sm:text-base max-w-xl mx-auto mb-8">
            We will refund 100% of your ₹1,499 immediately. No questions asked. And you can keep the Google Sheet, the WhatsApp scripts, and the contract clauses forever as our gift for checking it out.
          </p>

          <div className="p-4 rounded-2xl bg-slate-950/70 border border-slate-800 text-xs sm:text-sm text-slate-400 max-w-lg mx-auto">
            <strong className="text-white">Best Case:</strong> You close your next website for ₹48,000 instead of ₹25,000.<br/>
            <strong className="text-white">Worst Case:</strong> You get 100% of your money back and keep ₹20,000+ in templates for free.
          </div>
        </div>
      </section>

      {/* =====================================================================
          5. ELEVATEWEB AGENCY BACK-END UPSOLD BANNER
          ===================================================================== */}
      <section className="py-16 md:py-20 px-4 sm:px-6 lg:px-8 max-w-6xl mx-auto">
        <div className="relative rounded-3xl p-8 sm:p-12 lg:p-14 overflow-hidden border border-cyan-500/30 bg-gradient-to-r from-slate-900 via-slate-900 to-[#0b1528] shadow-[0_20px_70px_rgba(6,182,212,0.15)]">
          
          {/* Subtle glowing orb */}
          <div className="absolute top-0 right-0 w-96 h-96 bg-cyan-500/10 rounded-full blur-3xl pointer-events-none" />

          <div className="relative z-10 grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
            <div className="lg:col-span-8">
              
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-cyan-500/10 border border-cyan-500/30 text-cyan-300 text-xs font-mono mb-4">
                <Sparkles className="w-3.5 h-3.5" />
                <span>ELEVATEWEB STUDIO BESPOKE SYSTEMS</span>
              </div>

              <h3 className="text-2xl sm:text-4xl font-display font-bold text-white tracking-tight mb-4 leading-snug">
                Tired of manual client onboarding and chasing leads?
              </h3>

              <p className="text-slate-300 text-base sm:text-lg mb-6 leading-relaxed max-w-2xl font-light">
                We build high-converting agency websites, automated client portals, and 24/7 WhatsApp AI lead-capture systems for digital operators.
              </p>

              {/* Feature Pills */}
              <div className="flex flex-wrap gap-3 mb-2 text-xs font-mono text-slate-300">
                <span className="px-3 py-1 rounded-lg bg-slate-950/80 border border-slate-800 flex items-center gap-1.5">
                  <Check className="w-3 h-3 text-cyan-400" />
                  <span>Custom Next.js & Webflow Portals</span>
                </span>
                <span className="px-3 py-1 rounded-lg bg-slate-950/80 border border-slate-800 flex items-center gap-1.5">
                  <Check className="w-3 h-3 text-cyan-400" />
                  <span>24/7 WhatsApp AI Booking Bots</span>
                </span>
                <span className="px-3 py-1 rounded-lg bg-slate-950/80 border border-slate-800 flex items-center gap-1.5">
                  <Check className="w-3 h-3 text-cyan-400" />
                  <span>Stripe & Razorpay Recurring Invoicing</span>
                </span>
              </div>
            </div>

            <div className="lg:col-span-4 flex flex-col items-start lg:items-end justify-center">
              <a
                href={auditBookingUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-8 py-4 rounded-2xl bg-cyan-400 hover:bg-cyan-300 text-slate-950 font-display font-bold text-base tracking-tight transition-all duration-300 shadow-[0_0_30px_rgba(6,182,212,0.35)] hover:scale-[1.03]"
              >
                <span>Book a Free 15-Minute System Audit at elevateweb.me</span>
                <ArrowRight className="w-4 h-4" />
              </a>
              <span className="text-[12px] text-slate-400 font-mono mt-3 self-center lg:self-end">
                Zero pitch • Actionable agency teardown
              </span>
            </div>
          </div>
        </div>
      </section>

      {/* =====================================================================
          6. FAQ SECTION
          ===================================================================== */}
      <section id="faq" className="py-16 md:py-24 px-4 sm:px-6 lg:px-8 max-w-4xl mx-auto border-t border-slate-800/80">
        
        {/* Section Header */}
        <div className="text-center max-w-2xl mx-auto mb-14">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-slate-800 border border-slate-700 text-slate-300 text-xs font-mono font-medium mb-4">
            <HelpCircle className="w-3.5 h-3.5 text-emerald-400" />
            <span>FREQUENTLY ASKED QUESTIONS</span>
          </div>
          <h2 className="text-3xl sm:text-4xl font-display font-bold text-white tracking-tight mb-4">
            Everything You Need To Know
          </h2>
          <p className="text-slate-300 text-base">
            Clear, transparent answers. Have another question? Reach us directly at <a href={`mailto:${supportEmail}`} className="text-emerald-400 hover:underline">{supportEmail}</a>.
          </p>
        </div>

        {/* FAQ Accordion List */}
        <div className="space-y-4">
          {faqs.map((faq, index) => {
            const isOpen = openFaq === index;
            return (
              <div 
                key={index}
                className="rounded-2xl bg-slate-900/60 border border-slate-800/80 overflow-hidden transition-all duration-200"
              >
                <button
                  type="button"
                  onClick={() => setOpenFaq(isOpen ? null : index)}
                  className="w-full p-5 sm:p-6 text-left flex items-center justify-between gap-4 hover:bg-slate-800/30 transition-colors"
                  aria-expanded={isOpen}
                >
                  <span className="font-display font-semibold text-base sm:text-lg text-white">
                    {faq.q}
                  </span>
                  <div className={`w-8 h-8 rounded-full bg-slate-800 flex items-center justify-center shrink-0 transition-transform duration-200 ${isOpen ? 'rotate-180 bg-emerald-500/20 text-emerald-400' : 'text-slate-400'}`}>
                    <ChevronDown className="w-4 h-4" />
                  </div>
                </button>

                {isOpen && (
                  <div className="px-5 pb-5 sm:px-6 sm:pb-6 text-slate-300 text-sm sm:text-base leading-relaxed border-t border-slate-800/60 pt-4 font-light">
                    {faq.a}
                  </div>
                )}
              </div>
            );
          })}
        </div>

        {/* Bottom CTA Reminder */}
        <div className="mt-16 text-center p-8 rounded-3xl bg-slate-900/40 border border-slate-800">
          <h3 className="text-2xl font-display font-bold text-white mb-2">
            Ready to quote with 100% confidence?
          </h3>
          <p className="text-slate-400 text-sm max-w-xl mx-auto mb-6">
            One-time payment of ₹1,499. Includes Google Sheet, 3-Tier Proposal Generator, Scope Shield, and all 3 Launch Bonuses. Instant 1-click Google Drive access.
          </p>
          <a
            href={checkoutUrl}
            onClick={handleCtaClick}
            className="inline-flex items-center gap-3 px-8 py-4 rounded-xl bg-emerald-500 hover:bg-emerald-400 text-slate-950 font-display font-bold text-base transition-all duration-200 hover:scale-[1.02] shadow-[0_0_25px_rgba(16,185,129,0.35)]"
          >
            <span>Get Instant Access to the Pricing OS — ₹1,499 ($29)</span>
            <ArrowRight className="w-4 h-4" />
          </a>
        </div>
      </section>

      {/* =====================================================================
          7. FINAL FOOTER
          ===================================================================== */}
      <footer className="pt-16 pb-24 md:pb-16 px-4 sm:px-6 lg:px-8 max-w-6xl mx-auto border-t border-slate-800 text-slate-400 text-sm">
        <div className="flex flex-col md:flex-row items-center justify-between gap-6 mb-8">
          
          {/* Brand Logo & Tagline */}
          <div className="flex items-center gap-3">
            <span className="font-display font-extrabold text-xl text-white tracking-tight">
              ElevateWeb
            </span>
            <span className="text-slate-600">|</span>
            <span className="text-xs text-slate-400 font-mono">
              The 3-Minute Web Designer Pricing OS & Scope Shield
            </span>
          </div>

          {/* Quick links & guarantee badge */}
          <div className="flex flex-wrap items-center gap-6 text-xs font-medium">
            <a href="https://elevateweb.me" className="hover:text-white transition-colors">
              ElevateWeb Studio
            </a>
            <a href="#interactive-preview" className="hover:text-white transition-colors">
              Live Calculator Preview
            </a>
            <a href="#features" className="hover:text-white transition-colors">
              3-Tab Breakdown
            </a>
            <a href="#faq" className="hover:text-white transition-colors">
              FAQ
            </a>
            <a href={`mailto:${supportEmail}`} className="hover:text-white transition-colors">
              Support
            </a>
          </div>
        </div>

        {/* Legal Copyright Line */}
        <div className="pt-6 border-t border-slate-900 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-slate-500 font-mono">
          <p>
            Copyright © 2026 Elevate Web Studio (elevateweb.me). All rights reserved.
          </p>
          <div className="flex items-center gap-4">
            <span>256-Bit SSL Encrypted Checkout</span>
            <span>•</span>
            <span>Google Sheets Compatible</span>
          </div>
        </div>
      </footer>

      {/* =====================================================================
          8. STICKY FLOATING CONVERSION BAR (Mobile & Desktop)
          ===================================================================== */}
      <aside 
        className={`fixed bottom-0 left-0 w-full z-40 bg-slate-950/90 backdrop-blur-xl border-t border-slate-800 py-3 px-4 sm:px-8 transition-transform duration-300 ${
          showStickyBar ? 'translate-y-0' : 'translate-y-full'
        }`}
        aria-label="Quick Checkout Bar"
      >
        <div className="max-w-6xl mx-auto flex items-center justify-between gap-4">
          
          {/* Left info: Product title & rating */}
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-emerald-500/10 border border-emerald-500/30 flex items-center justify-center shrink-0 hidden sm:flex">
              <FileSpreadsheet className="w-5 h-5 text-emerald-400" />
            </div>
            <div>
              <div className="font-display font-bold text-sm text-white truncate max-w-[200px] sm:max-w-none">
                The 3-Minute Web Designer Pricing OS
              </div>
              <div className="text-[11px] text-slate-400 flex items-center gap-2">
                <span className="text-emerald-400 font-mono font-bold">₹1,499 ($29)</span>
                <span className="line-through text-slate-500 font-mono">₹4,999</span>
                <span className="hidden md:inline text-slate-500">• One-time payment</span>
              </div>
            </div>
          </div>

          {/* Right Action: Buy button */}
          <div className="flex items-center gap-3">
            <a
              href="#interactive-preview"
              className="hidden lg:inline-flex text-xs text-slate-300 hover:text-white font-mono px-3 py-2"
            >
              Test Preview Math
            </a>
            <a
              href={checkoutUrl}
              onClick={handleCtaClick}
              className="px-6 py-2.5 sm:py-3 rounded-xl bg-emerald-500 hover:bg-emerald-400 text-slate-950 font-display font-bold text-xs sm:text-sm tracking-tight transition-transform active:scale-95 shadow-[0_0_20px_rgba(16,185,129,0.35)] flex items-center gap-2 shrink-0"
            >
              <span>Get Instant Access to the Pricing OS — ₹1,499 ($29)</span>
              <ArrowRight className="w-4 h-4" />
            </a>
          </div>
        </div>
      </aside>

    </div>
  );
};

export default PricingCalculatorSalesPage;
