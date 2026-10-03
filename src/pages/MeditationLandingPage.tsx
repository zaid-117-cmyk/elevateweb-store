import React, { useEffect } from 'react';
import { ArrowRight, Sparkles, Brain, Clock, ShieldCheck, VolumeX, EyeOff, FileText, CheckCircle2 } from 'lucide-react';
import { PRODUCTS } from '../lib/products';

export const MeditationLandingPage: React.FC = () => {
  const product = PRODUCTS.find(p => p.slug === 'the-15-minute-meditation');

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  if (!product) return null;

  const faqs = [
    {
      q: "I can't visualize anything. Will this work for me?",
      a: "Yes. This guide is specifically designed for people with aphantasia. We teach 3 non-visual methods that rely on feelings, words, and sounds."
    },
    {
      q: "I live in a noisy joint family. Can I still do this?",
      a: "Absolutely. Chapter 3 is dedicated to the chaotic Indian environment. We teach practical techniques like bathroom meditation, earphones with brown noise, and anchor shawls."
    },
    {
      q: "How long is the guide?",
      a: "10 pages. Mobile-optimized. You can read it in one sitting."
    },
    {
      q: "Is this a subscription?",
      a: "No. It's a one-time payment of Rs. 299. You get lifetime access to the PDF."
    },
    {
      q: "How soon will I see results?",
      a: "Most people notice subtle shifts in 7-14 days: less anger, more patience, a 1-second pause before reacting. Consistency is key."
    }
  ];

  const chapters = [
    { title: "The Brainwave Shift (Demystified)", desc: "Why High-Beta (stress) keeps you stuck, and how to reach Theta (programming mode) in just 15 minutes." },
    { title: "The Non-Visual Method", desc: "Can't visualize? No problem. Learn the 3 alternative methods: Body Sensation, Word Affirmation, and Sound Vibration." },
    { title: "The Chaotic Environment Protocol", desc: "Practical 'jugaad' for noisy Indian homes. Earphones, bathroom meditation, anchor shawls, and facing the wall." },
    { title: "The 15-Minute Turnkey Script", desc: "A word-for-word daily routine. 5 min breath, 5 min deconstructing old loops, 5 min locking in future identity." },
    { title: "Troubleshooting Relapse", desc: "What to do when you have too many thoughts, obsessive outcome checking, or miss a day (The 3-Day Rule)." }
  ];

  return (
    <div className="min-h-screen bg-[#050505] text-white selection:bg-teal-500 selection:text-white pt-32 pb-24 font-sans">
      
      {/* HERO SECTION */}
      <div className="max-w-5xl mx-auto px-6 mb-32">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
          <div className="order-2 lg:order-1">
            <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-teal-500/10 border border-teal-500/20 text-xs font-mono tracking-wider mb-6 text-teal-400">
              <Sparkles className="w-3.5 h-3.5" />
              <span>CREATED WITH CURIOUS KEEDA</span>
            </div>

            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-display font-bold tracking-tight mb-6 leading-[1.1]">
              The 15-Minute <br />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-teal-400">Mental Rehearsal Protocol</span>
            </h1>

            <p className="text-white/60 text-lg sm:text-xl mb-8 leading-relaxed font-light">
              A practical, no-fluff guide for Indian minds who can't visualize, live in noisy homes, and have only 15 minutes daily.
            </p>

            <div className="flex flex-col sm:flex-row items-center gap-4 mb-8">
              <a 
                href={product.paymentUrl}
                className="w-full sm:w-auto flex items-center justify-center gap-2 px-8 py-4 rounded-xl bg-white text-black font-bold text-lg hover:bg-gray-200 transition-colors group shadow-[0_0_40px_rgba(255,255,255,0.1)]"
              >
                <span>Get Instant Access (₹299)</span>
                <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
              </a>
              <p className="text-white/40 text-sm font-mono">One-time payment • Lifetime Access</p>
            </div>

            <div className="flex flex-wrap items-center gap-6 text-sm text-white/50 font-mono">
              <div className="flex items-center gap-2">
                <EyeOff className="w-4 h-4 text-teal-500" />
                <span>No Visualization Needed</span>
              </div>
              <div className="flex items-center gap-2">
                <VolumeX className="w-4 h-4 text-purple-500" />
                <span>Works in Noisy Homes</span>
              </div>
              <div className="flex items-center gap-2">
                <Clock className="w-4 h-4 text-blue-500" />
                <span>15 Min/Day</span>
              </div>
            </div>
          </div>

          <div className="order-1 lg:order-2 relative group perspective-1000">
            <div className="absolute -inset-4 bg-gradient-to-tr from-purple-600/30 to-teal-500/30 rounded-[2rem] blur-2xl transition duration-700 group-hover:opacity-60" />
            <img 
              src={product.bannerImage} 
              alt={product.title}
              className="relative w-full rounded-2xl shadow-2xl border border-white/10 transform transition-transform duration-500 group-hover:rotate-y-2 group-hover:-rotate-x-2"
            />
          </div>
        </div>
      </div>

      {/* THE PROBLEM */}
      <div className="max-w-4xl mx-auto px-6 mb-32">
        <h2 className="text-3xl sm:text-4xl font-display font-bold mb-12 text-center">
          Meditation is hard when you live in the real world.
        </h2>
        <div className="grid sm:grid-cols-2 gap-6">
          <div className="p-8 rounded-2xl bg-white/5 border border-white/10">
            <h3 className="text-xl font-bold mb-4 text-red-400">"I can't see anything"</h3>
            <p className="text-white/60">When you close your eyes, you see nothing. This is called aphantasia. You feel broken because every guru tells you to "visualize your future."</p>
          </div>
          <div className="p-8 rounded-2xl bg-white/5 border border-white/10">
            <h3 className="text-xl font-bold mb-4 text-orange-400">Noisy Indian Homes</h3>
            <p className="text-white/60">TV is blaring, children are crying, family members are talking. Finding 1 hour of silence in a joint family is practically impossible.</p>
          </div>
          <div className="p-8 rounded-2xl bg-white/5 border border-white/10">
            <h3 className="text-xl font-bold mb-4 text-yellow-400">Zero Time</h3>
            <p className="text-white/60">Between jobs, family responsibilities, and the daily commute, you barely have 15 minutes to yourself.</p>
          </div>
          <div className="p-8 rounded-2xl bg-white/5 border border-white/10">
            <h3 className="text-xl font-bold mb-4 text-pink-400">Too Confusing</h3>
            <p className="text-white/60">You don't know the mechanics. How do you shift brainwaves? What should you feel? You tried, felt nothing, and gave up.</p>
          </div>
        </div>
      </div>

      {/* THE SOLUTION */}
      <div className="max-w-4xl mx-auto px-6 mb-32 text-center">
        <h2 className="text-3xl sm:text-4xl font-display font-bold mb-8">
          The Solution: <span className="text-teal-400">Feeling > Seeing</span>
        </h2>
        <p className="text-xl text-white/60 mb-12 max-w-2xl mx-auto">
          The 15-Minute Mental Rehearsal Protocol solves these problems by focusing on what actually works in chaotic environments.
        </p>
        
        <div className="text-left space-y-6">
          <div className="flex items-start gap-4 p-6 rounded-2xl bg-gradient-to-r from-teal-500/10 to-transparent border border-teal-500/20">
            <CheckCircle2 className="w-6 h-6 text-teal-400 shrink-0 mt-1" />
            <div>
              <h4 className="text-lg font-bold mb-2">A Non-Visual Method</h4>
              <p className="text-white/60">Instead of forcing visualization, you'll learn 3 alternatives: body sensation, word affirmation, and sound vibration.</p>
            </div>
          </div>
          <div className="flex items-start gap-4 p-6 rounded-2xl bg-gradient-to-r from-purple-500/10 to-transparent border border-purple-500/20">
            <CheckCircle2 className="w-6 h-6 text-purple-400 shrink-0 mt-1" />
            <div>
              <h4 className="text-lg font-bold mb-2">Chaotic Environment Protocol</h4>
              <p className="text-white/60">Practical jugaad for noisy homes: earphones with brown noise, bathroom meditation, anchor shawls, and facing the wall.</p>
            </div>
          </div>
          <div className="flex items-start gap-4 p-6 rounded-2xl bg-gradient-to-r from-blue-500/10 to-transparent border border-blue-500/20">
            <CheckCircle2 className="w-6 h-6 text-blue-400 shrink-0 mt-1" />
            <div>
              <h4 className="text-lg font-bold mb-2">Exact 15-Minute Word-for-Word Script</h4>
              <p className="text-white/60">A daily routine broken into 5-min segments: Breath & Grounding, Deconstructing Old Loops, and Locking in Future Identity.</p>
            </div>
          </div>
        </div>
      </div>

      {/* WHAT'S INSIDE */}
      <div className="max-w-4xl mx-auto px-6 mb-32">
        <h2 className="text-3xl sm:text-4xl font-display font-bold mb-12 text-center">Inside the 10-Page PDF</h2>
        <div className="space-y-4">
          {chapters.map((chapter, idx) => (
            <div key={idx} className="p-6 rounded-2xl bg-white/5 border border-white/10 flex flex-col sm:flex-row items-start sm:items-center gap-6">
              <div className="w-12 h-12 rounded-full bg-white/10 flex items-center justify-center font-mono font-bold text-xl text-teal-400 shrink-0">
                {idx + 1}
              </div>
              <div>
                <h4 className="text-xl font-bold mb-2">{chapter.title}</h4>
                <p className="text-white/60">{chapter.desc}</p>
              </div>
            </div>
          ))}
          <div className="p-6 rounded-2xl bg-teal-500/10 border border-teal-500/20 flex flex-col sm:flex-row items-start sm:items-center gap-6 mt-6">
            <div className="w-12 h-12 rounded-full bg-teal-500/20 flex items-center justify-center text-teal-400 shrink-0">
              <FileText className="w-6 h-6" />
            </div>
            <div>
              <h4 className="text-xl font-bold text-teal-400 mb-2">Bonus: Printable Daily Checklist</h4>
              <p className="text-white/70">A printable page to track daily progress and build consistency.</p>
            </div>
          </div>
        </div>
      </div>

      {/* FAQS */}
      <div className="max-w-3xl mx-auto px-6 mb-32">
        <h2 className="text-3xl font-display font-bold mb-10 text-center">Frequently Asked Questions</h2>
        <div className="space-y-6">
          {faqs.map((faq, idx) => (
            <div key={idx} className="p-6 rounded-2xl bg-white/5 border border-white/10">
              <h4 className="text-lg font-bold mb-3">{faq.q}</h4>
              <p className="text-white/60 leading-relaxed">{faq.a}</p>
            </div>
          ))}
        </div>
      </div>

      {/* FINAL CTA */}
      <div className="max-w-4xl mx-auto px-6 text-center">
        <div className="p-12 rounded-[2rem] bg-gradient-to-b from-white/10 to-white/5 border border-white/10 backdrop-blur-md relative overflow-hidden">
          <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-teal-500/20 via-transparent to-transparent opacity-50" />
          <h2 className="relative text-3xl sm:text-5xl font-display font-bold mb-6">
            Consistency > Perfection
          </h2>
          <p className="relative text-xl text-white/60 mb-10 max-w-2xl mx-auto italic font-serif">
            "Mujhe pata hai Indian family dynamics aasan nahi hote. Par apni mental health ko ignore karna koi bahaduri nahi hai. Tum kar sakte ho. Bas shuru karo. Aaj se. Abhi se."
          </p>
          <a 
            href={product.paymentUrl}
            className="relative inline-flex items-center justify-center gap-2 px-10 py-5 rounded-full bg-teal-500 text-black font-bold text-xl hover:bg-teal-400 transition-all hover:scale-105 shadow-[0_0_40px_rgba(45,212,191,0.3)]"
          >
            <span>Download Now (₹299)</span>
            <ArrowRight className="w-6 h-6" />
          </a>
          <p className="relative mt-6 text-white/40 text-sm font-mono">Instant PDF Download via Razorpay Secure Checkout</p>
        </div>
      </div>

    </div>
  );
};

export default MeditationLandingPage;
