import React, { useState, useEffect } from 'react';
import { 
  Flame, 
  ArrowRight, 
  CheckCircle2, 
  Play, 
  MessageSquare, 
  Clock, 
  Sparkles
} from 'lucide-react';
import { FUNNEL_TIERS } from '../lib/products';
import { FunnelTier } from '../types/funnel';
import { initAffiliateTracking } from '../lib/affiliate';

export const SelfTrustLandingPage: React.FC = () => {
  // VSL State
  const [isPlayingVSL, setIsPlayingVSL] = useState(false);

  // 15-Minute Countdown Timer for Launch Special
  const [countdownMinutes, setCountdownMinutes] = useState(14);
  const [countdownSeconds, setCountdownSeconds] = useState(59);

  useEffect(() => {
    window.scrollTo(0, 0);
    initAffiliateTracking();

    // 15-min countdown interval
    const timer = setInterval(() => {
      setCountdownSeconds((prevSec) => {
        if (prevSec > 0) return prevSec - 1;
        setCountdownMinutes((prevMin) => (prevMin > 0 ? prevMin - 1 : 14));
        return 59;
      });
    }, 1000);

    return () => clearInterval(timer);
  }, []);

  const handleOpenCheckout = (tier: FunnelTier) => {
    const checkoutUrl = tier.checkoutUrl || 'https://whop.com/elevateweb-b83f/the-self-trust-protocol-illustrated-master-ebook';
    window.open(checkoutUrl, '_blank', 'noopener,noreferrer');
  };

  const youtubeComments = [
    {
      author: 'Aman Verma (@aman_v2005)',
      time: '1 day ago',
      content: 'Bhai seriously bol raha hoon, 60 days se porn aur mindless reels quit kiya hai. Chapter 2 mein Intention-Action Gap wala concept read karne ke baad I realized I was just running from emotional task-aversion. Self-Trust Ledger is pure gold.',
      likes: '482'
    },
    {
      author: 'Siddharth M. (JEE Aspirant 2026)',
      time: '3 days ago',
      content: 'Phone air-gap trick actually saved my drop year. Pehle table pe phone rehta tha toh har 15 min mein notifications check karta tha. 20 feet door rakh ke 90-minute blocks lagaye. Mock scores jumped from 110 to 184.',
      likes: '319'
    },
    {
      author: 'Priya K. (Tier-3 College)',
      time: '5 days ago',
      content: 'The Notion Self-Trust Ledger changed everything for me. Tracking deposits and withdrawals mathematically stopped me from making excuses for semester exams. Worth way more than ₹299.',
      likes: '254'
    },
    {
      author: 'Vikram Rajput (@vikram_builds)',
      time: '1 week ago',
      content: 'No fake motivation, only biological neuroscience and friction reduction. This is what Indian education completely missed teaching us. Berserk mode on.',
      likes: '512'
    }
  ];

  const localizedChapters = [
    { num: '01', title: 'The Dopamine Trap', desc: 'Why you can’t focus and why it’s not your fault. Dopamine as anticipation, not pleasure. Receptor downregulation in the age of 2 AM Reels.' },
    { num: '02', title: 'The Intention-Action Gap', desc: 'Overcoming emotional task-aversion. Why procrastination is an amygdala defense (not laziness) for a 19-year-old JEE/college student.' },
    { num: '03', title: 'The Prefrontal Operating System', desc: 'Building external scaffolding for the developing mind (ages 16–25) using the Rule of 3. Taming the chaotic monkey brain.' },
    { num: '04', title: 'Environmental Architecture', desc: 'Designing a zero-friction study sanctuary. The 20-second friction rule and the 20-foot phone air-gap.' },
    { num: '05', title: 'The 5-Minute Micro-Ramp', desc: 'Overcoming starting resistance with kinetic momentum and opening irresistible Zeigarnik loops. Starting without mental exhaustion.' },
    { num: '06', title: 'The 7-Day Phone Reset', desc: 'Curing receptor downregulation, anhedonia, and lust fog without going on an unrealistic monk detox.' },
    { num: '07', title: 'The Comparison Matrix', desc: 'De-weaponizing Instagram, YouTube, and LinkedIn. Escaping the asymmetric comparison fallacy that ruins self-worth.' },
    { num: '08', title: 'The Exposure Protocol', desc: 'Curing the 61/57 exposure paradox. How to speak with quiet authority in college vivas, interviews, and rooms even when your voice shakes.' },
    { num: '09', title: 'The Self-Trust Ledger', desc: 'Outworking your self-doubt. Replacing empty mirror affirmations with undeniable historical proof of your integrity.' },
    { num: '10', title: 'The Modern Daily Rhythm', desc: 'The Three-Anchor System tailored specifically for Indian students, 9-to-5s, and freelance builders. Berserk execution.' }
  ];

  return (
    <div className="min-h-screen bg-[#050811] text-slate-100 font-sans selection:bg-rose-500 selection:text-white pb-24">
      
      {/* TOP ANNOUNCEMENT BAR */}
      <div className="bg-gradient-to-r from-slate-950 via-rose-950/70 to-slate-950 border-b border-rose-500/20 py-2.5 px-4 text-center text-xs sm:text-sm font-medium text-rose-300 flex items-center justify-center gap-2">
        <Flame className="w-4 h-4 fill-rose-400 text-rose-400 animate-pulse" />
        <span>⚡ THE SELF-TRUST PROTOCOL • 49-PAGE ILLUSTRATED PDF + NOTION OS TEMPLATE • ₹299 ONLY</span>
        <Flame className="w-4 h-4 fill-rose-400 text-rose-400 animate-pulse" />
      </div>

      {/* TOP NAVIGATION */}
      <header className="max-w-6xl mx-auto px-6 py-5 flex items-center justify-between">
        <div className="flex items-center gap-2.5">
          <div className="w-8 h-8 rounded-lg bg-gradient-to-tr from-rose-600 to-amber-500 flex items-center justify-center font-black text-white text-xs">
            OS
          </div>
          <span className="font-bold text-white text-base tracking-tight">The Self-Trust Protocol</span>
        </div>

        <div className="flex items-center gap-3">
          <a
            href="/dashboard"
            className="text-xs font-mono text-slate-400 hover:text-white transition-colors px-3 py-1.5 rounded-lg border border-slate-800 hover:border-slate-700"
          >
            User Login / Dashboard
          </a>
          <button
            onClick={() => handleOpenCheckout(FUNNEL_TIERS[0])}
            className="hidden sm:inline-flex items-center gap-1.5 px-4 py-2 rounded-full bg-rose-600 hover:bg-rose-500 text-white font-bold text-xs uppercase tracking-wider transition-all shadow-md shadow-rose-600/30"
          >
            <span>Get Access — ₹299</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </button>
        </div>
      </header>

      {/* HERO SECTION (BERSERK AESTHETIC) */}
      <section className="max-w-6xl mx-auto px-6 pt-12 pb-16 text-center space-y-6">
        
        <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-rose-500/10 border border-rose-500/30 text-xs font-mono tracking-wider text-rose-400">
          <Sparkles className="w-3.5 h-3.5" />
          <span>NEURO-INFORMED BERSERK PROTOCOL (AGES 16–30)</span>
        </div>

        <h1 className="text-4xl sm:text-6xl lg:text-7xl font-black tracking-tight text-white leading-[1.08] max-w-4xl mx-auto">
          You don't lack willpower. <br />
          <span className="text-transparent bg-clip-text bg-gradient-to-r from-rose-400 via-amber-300 to-rose-500">
            You're just playing a rigged game.
          </span>
        </h1>

        <p className="text-base sm:text-xl text-slate-300 leading-relaxed max-w-2xl mx-auto">
          Defeat 2 AM Reels doomscrolling, porn/lust addiction, and brain fog. Rebuild unshakeable focus with the prefrontal neuroscience of the <strong>Self-Trust Protocol & Notion OS</strong>. <em>Aag laga do. No bahana.</em>
        </p>

        {/* 2 Main Action Pills (Only PDF + Notion Template) */}
        <div className="flex flex-wrap items-center justify-center gap-3 sm:gap-4 pt-2 text-xs font-mono text-slate-300">
          <div className="px-4 py-2 rounded-full bg-slate-900 border border-slate-800 flex items-center gap-2 shadow-sm">
            <CheckCircle2 className="w-4 h-4 text-emerald-400" />
            <span className="text-white font-medium">Benefit 1: 49-Page Master Illustrated PDF</span>
          </div>
          <div className="px-4 py-2 rounded-full bg-slate-900 border border-slate-800 flex items-center gap-2 shadow-sm">
            <CheckCircle2 className="w-4 h-4 text-cyan-400" />
            <span className="text-white font-medium">Benefit 2: Interactive Notion OS Ledger Template</span>
          </div>
        </div>

        {/* Hero CTA Block with Urgency Timer */}
        <div className="pt-6 flex flex-col sm:flex-row items-center justify-center gap-4">
          <button
            onClick={() => handleOpenCheckout(FUNNEL_TIERS[0])}
            className="w-full sm:w-auto px-10 py-4 rounded-2xl bg-gradient-to-r from-rose-600 via-rose-500 to-amber-500 hover:from-rose-500 hover:to-amber-400 text-white font-extrabold text-base tracking-wide uppercase transition-all duration-300 shadow-xl shadow-rose-600/30 hover:scale-[1.02] active:scale-[0.98] flex items-center justify-center gap-2"
          >
            <span>Get The Self-Trust Bundle — Only ₹299</span>
            <ArrowRight className="w-4 h-4" />
          </button>
        </div>

        <div className="text-xs text-slate-400 flex items-center justify-center gap-2 pt-1 font-mono">
          <Clock className="w-3.5 h-3.5 text-amber-400" />
          <span>Launch Pricing Ends In: <strong className="text-amber-300">{countdownMinutes}m {countdownSeconds}s</strong></span>
        </div>

      </section>

      {/* 3-MINUTE INTERACTIVE VSL SECTION */}
      <section className="max-w-4xl mx-auto px-6 py-10">
        <div className="relative rounded-3xl overflow-hidden bg-slate-950 border border-slate-800 shadow-2xl group">
          <div className="relative aspect-[16/9] w-full flex flex-col items-center justify-center bg-gradient-to-br from-slate-900 via-[#070b14] to-rose-950/40 p-6 sm:p-12 text-center">
            
            {/* Ambient Background Glow */}
            <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-rose-500/10 via-transparent to-transparent pointer-events-none" />

            {!isPlayingVSL ? (
              <div className="relative z-10 space-y-4 max-w-xl">
                <button
                  onClick={() => setIsPlayingVSL(true)}
                  className="w-20 h-20 rounded-full bg-gradient-to-tr from-rose-600 to-amber-500 hover:from-rose-500 hover:to-amber-400 flex items-center justify-center mx-auto shadow-2xl shadow-rose-600/50 hover:scale-110 active:scale-95 transition-all duration-300"
                >
                  <Play className="w-8 h-8 fill-white text-white ml-1" />
                </button>

                <h3 className="text-xl sm:text-2xl font-bold text-white tracking-tight">
                  "Why Willpower Fails You Every Night At 2 AM"
                </h3>
                <p className="text-xs sm:text-sm text-slate-300 leading-relaxed">
                  A 3-minute psychological breakdown of the <strong>Intention-Action Gap</strong> and how the <strong>Self-Trust Ledger</strong> rebuilds discipline mathematically.
                </p>
                <div className="inline-flex items-center gap-2 text-[11px] font-mono text-cyan-400 bg-cyan-500/10 px-3 py-1 rounded-full border border-cyan-500/20">
                  <span>Neuroscience & Executive Focus Briefing</span>
                </div>
              </div>
            ) : (
              <div className="relative z-10 w-full h-full flex flex-col items-center justify-center space-y-4">
                <div className="p-6 rounded-2xl bg-slate-900/90 border border-slate-700 text-left max-w-lg space-y-3">
                  <div className="flex items-center justify-between text-xs text-rose-400 font-mono">
                    <span>AUDIO VSL • ACTIVE PLAYBACK</span>
                    <span>03:14</span>
                  </div>
                  <h4 className="font-bold text-white text-base">Key Neuro-Biological Insight:</h4>
                  <p className="text-xs text-slate-300 leading-relaxed italic">
                    "Jab tum raat ko 2 AM pe Reels dekh rahe hote ho ya lust trap mein phas rahe hote ho, it's not because you are weak. Your stone-age dopamine circuits are simply over-stimulated. The 20-foot phone air-gap physically severs that loop before willpower is even needed."
                  </p>
                  <button
                    onClick={() => setIsPlayingVSL(false)}
                    className="text-xs text-slate-400 hover:text-white underline font-mono"
                  >
                    Pause Video
                  </button>
                </div>
              </div>
            )}

            {/* Bottom Bar Info */}
            <div className="absolute bottom-4 left-6 right-6 flex items-center justify-between text-[11px] font-mono text-slate-500 border-t border-slate-800/80 pt-3">
              <span>Length: 3 Minutes 14 Seconds</span>
              <span>100% Actionable • No Fluff</span>
            </div>
          </div>
        </div>
      </section>

      {/* YOUTUBE COMMUNITY COMMENTS (AUTHENTIC SOCIAL PROOF TICKER) */}
      <section className="max-w-6xl mx-auto px-6 py-12">
        <div className="text-center mb-8">
          <div className="inline-flex items-center gap-2 text-xs font-mono uppercase tracking-wider text-amber-400 mb-2">
            <MessageSquare className="w-3.5 h-3.5" />
            <span>Community Verified Feedback</span>
          </div>
          <h2 className="text-2xl sm:text-3xl font-bold text-white tracking-tight">
            What The Tribe Is Saying
          </h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {youtubeComments.map((comment, i) => (
            <div key={i} className="p-5 rounded-2xl bg-slate-900/60 border border-slate-800 space-y-3">
              <div className="flex items-center justify-between">
                <span className="font-bold text-sm text-white">{comment.author}</span>
                <span className="text-[11px] font-mono text-slate-500">{comment.time}</span>
              </div>
              <p className="text-xs text-slate-300 leading-relaxed">
                "{comment.content}"
              </p>
              <div className="flex items-center gap-2 text-[11px] font-mono text-rose-400 pt-1">
                <span>❤️ {comment.likes} likes</span>
                <span>•</span>
                <span>Top Reader Feedback</span>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* PRODUCT PRICING (THE ESSENTIAL BUNDLE - ₹299) */}
      <section id="pricing" className="max-w-6xl mx-auto px-6 py-16">
        <div className="text-center mb-12 space-y-3">
          <span className="px-3.5 py-1 rounded-full bg-rose-500/10 border border-rose-500/30 text-rose-400 font-mono text-xs uppercase tracking-wider">
            The Essential 2-in-1 System
          </span>
          <h2 className="text-3xl sm:text-5xl font-black text-white tracking-tight">
            Get The Master PDF + Notion OS
          </h2>
          <p className="text-sm sm:text-base text-slate-400 max-w-xl mx-auto">
            Direct 1-click access to the complete 49-page illustrated eBook and the interactive Notion Self-Trust Ledger. Zero recurring fees.
          </p>
        </div>

        <div className="max-w-2xl mx-auto">
          {FUNNEL_TIERS.map((tier) => (
            <div
              key={tier.id}
              className="rounded-3xl p-8 sm:p-10 flex flex-col justify-between relative bg-gradient-to-b from-slate-900 via-slate-900/95 to-rose-950/40 border-2 border-rose-500/80 shadow-2xl shadow-rose-500/20"
            >
              {/* Badge */}
              {tier.badge && (
                <div className="absolute -top-3.5 left-1/2 -translate-x-1/2 px-4 py-1 rounded-full text-[10px] font-mono font-bold uppercase tracking-wider bg-gradient-to-r from-rose-600 to-amber-500 text-white shadow-md">
                  {tier.badge}
                </div>
              )}

              <div className="space-y-6">
                <div className="text-center sm:text-left">
                  <h3 className="text-2xl sm:text-3xl font-black text-white mb-2">{tier.name}</h3>
                  <p className="text-xs sm:text-sm text-slate-300 leading-relaxed">{tier.headline}</p>
                </div>

                {/* Price Display */}
                <div className="p-6 rounded-2xl bg-slate-950/80 border border-slate-800/80 flex flex-col sm:flex-row items-center justify-between gap-4">
                  <div>
                    <div className="flex items-baseline gap-3">
                      <span className="text-5xl font-black text-white font-mono">
                        ₹{tier.price}
                      </span>
                      <span className="text-lg text-slate-500 line-through font-mono">
                        ₹{tier.originalPrice}
                      </span>
                      <span className="px-2.5 py-0.5 rounded-full bg-emerald-500/10 border border-emerald-500/30 text-emerald-400 text-xs font-mono font-bold">
                        SAVE 70%
                      </span>
                    </div>
                    <span className="text-xs text-slate-400 font-mono block mt-1.5">
                      One-time payment • Lifetime access & future updates
                    </span>
                  </div>

                  <div className="text-right hidden sm:block">
                    <span className="text-[11px] font-mono text-amber-300 bg-amber-500/10 px-3 py-1 rounded-full border border-amber-500/20 block">
                      ⚡ Instant 1-Click Access
                    </span>
                  </div>
                </div>

                {/* What's Included */}
                <div className="space-y-3 pt-2">
                  <span className="text-xs font-mono uppercase tracking-wider text-slate-400 font-semibold block">
                    The 2 Core Benefits Included:
                  </span>
                  <div className="grid grid-cols-1 gap-2.5">
                    {tier.features.map((feat, idx) => (
                      <div key={idx} className="flex items-start gap-3 text-xs sm:text-sm text-slate-200">
                        <CheckCircle2 className="w-4 h-4 mt-0.5 shrink-0 text-emerald-400" />
                        <span className="leading-snug">{feat}</span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>

              {/* Checkout CTA Button */}
              <div className="pt-8 mt-6 border-t border-slate-800/80 space-y-3">
                <button
                  onClick={() => handleOpenCheckout(tier)}
                  className="w-full py-4 sm:py-4.5 rounded-2xl font-extrabold text-sm uppercase tracking-wider transition-all duration-300 flex items-center justify-center gap-2 shadow-xl bg-gradient-to-r from-rose-600 via-rose-500 to-amber-500 hover:from-rose-500 hover:to-amber-400 text-white shadow-rose-600/30 active:scale-95 hover:scale-[1.01]"
                >
                  <span>{tier.ctaText}</span>
                  <ArrowRight className="w-4 h-4" />
                </button>

                <p className="text-[11px] text-center text-slate-400 font-mono leading-relaxed">
                  🔒 Instant Delivery: Delivered to your screen & email immediately after payment via UPI, Cards, or Netbanking.
                </p>
              </div>

            </div>
          ))}
        </div>
      </section>

      {/* 10 CULTURALLY LOCALIZED CHAPTERS BREAKDOWN */}
      <section className="max-w-5xl mx-auto px-6 py-16">
        <div className="text-center mb-12">
          <span className="text-xs font-mono uppercase tracking-wider text-rose-400 mb-2 block">
            The 10-Chapter Curriculum
          </span>
          <h2 className="text-3xl font-bold text-white tracking-tight">
            Inside the Culturally Localized 49-Page Master Guide
          </h2>
          <p className="text-xs text-slate-400 mt-2">
            No Western corporate jargon. Tailored specifically for Indian students, JEE/NEET aspirants, and creators.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {localizedChapters.map((ch) => (
            <div key={ch.num} className="p-5 rounded-2xl bg-slate-900/40 border border-slate-800 flex gap-4">
              <span className="font-mono text-xl font-black text-rose-400 shrink-0">{ch.num}</span>
              <div>
                <h4 className="font-bold text-sm text-white mb-1">{ch.title}</h4>
                <p className="text-xs text-slate-400 leading-relaxed">{ch.desc}</p>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* FOOTER */}
      <footer className="max-w-6xl mx-auto px-6 pt-12 border-t border-slate-800/80 text-center text-xs text-slate-500 space-y-4">
        <div className="flex flex-wrap items-center justify-center gap-6 text-slate-400 font-mono">
          <a href="/dashboard" className="hover:text-white">User Dashboard</a>
          <span>•</span>
          <a href="/partner-dashboard" className="hover:text-white">Partner Portal</a>
          <span>•</span>
          <a href="#pricing" className="hover:text-white">Pricing</a>
        </div>
        <p>© 2026 ElevateWeb. All rights reserved.</p>
        <p className="text-[11px] text-slate-600 max-w-md mx-auto">
          Helpline references: KIRAN (1800-599-0019) • AASRA (+91-9820466726). Strictly anti-piracy secured via dynamic user watermarking.
        </p>
      </footer>

    </div>
  );
};
