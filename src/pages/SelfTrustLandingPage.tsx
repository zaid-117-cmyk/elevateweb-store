import React, { useEffect } from 'react';
import { 
  Sparkles, 
  ShieldCheck, 
  ArrowRight, 
  CheckCircle2, 
  Brain, 
  Zap, 
  BookOpen,
  Star
} from 'lucide-react';
import { PRODUCTS } from '../lib/products';

export const SelfTrustLandingPage: React.FC = () => {
  const product = PRODUCTS.find(p => p.slug === 'the-self-trust-protocol');

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  const checkoutUrl = product?.paymentUrl || 'https://whop.com/elevateweb-b83f/the-self-trust-protocol-illustrated-master-ebook';

  const chapters = [
    { num: '01', title: 'The Dopamine Trap', desc: 'Why you can’t focus and why it’s not your fault. Dopamine as anticipation, not pleasure.' },
    { num: '02', title: 'The Intention-Action Gap', desc: 'Overcoming emotional task-aversion. Why procrastination is an amygdala defense, not laziness.' },
    { num: '03', title: 'The Prefrontal Operating System', desc: 'Building external scaffolding for the developing mind (ages 16–25) using the Rule of 3.' },
    { num: '04', title: 'Environmental Architecture', desc: 'Designing a low-friction life. The 20-second rule and the 20-foot phone air-gap.' },
    { num: '05', title: 'The 5-Minute Micro-Ramp', desc: 'Overcoming starting resistance with kinetic momentum and opening irresistible Zeigarnik loops.' },
    { num: '06', title: 'The 7-Day Digital Reset', desc: 'Curing receptor downregulation and anhedonia without going on an unrealistic monk detox.' },
    { num: '07', title: 'The Comparison Matrix', desc: 'De-weaponizing Instagram, TikTok, and LinkedIn. Escaping the asymmetric comparison fallacy.' },
    { num: '08', title: 'The Exposure Protocol', desc: 'Curing the 61/57 exposure paradox. How to speak with quiet authority even when your voice shakes.' },
    { num: '09', title: 'The Self-Trust Ledger', desc: 'Outworking your self-doubt. Replacing empty affirmations with undeniable historical proof.' },
    { num: '10', title: 'The Modern Daily Rhythm', desc: 'The Three-Anchor System tailored specifically for students, 9-to-5s, and freelance creators.' }
  ];

  const faqs = [
    {
      q: 'How do I receive the eBook after purchase?',
      a: 'Instantly via Whop! As soon as your payment completes, you are redirected to your Whop member hub where you can download the 49-page PDF with 1 click. You also receive an instant confirmation email with your permanent download link.'
    },
    {
      q: 'Is this a recurring subscription or a one-time purchase?',
      a: 'It is a strictly one-time payment of ₹299 (or $19). No recurring charges, no hidden fees, and lifetime access to the eBook and all future revisions.'
    },
    {
      q: 'What format is the eBook delivered in?',
      a: 'A high-resolution, print-ready PDF (10.6 MB) that is fully optimized for mobile phones, tablets, Kindle, and desktop monitors.'
    },
    {
      q: 'How is this different from standard self-help books?',
      a: 'Most self-help books lecture you to "just have willpower" or "wake up at 4:30 AM." This protocol is grounded in prefrontal cortex neuroscience, dopamine baseline biology, and friction engineering specifically for 16–30 year-olds living in the attention economy.'
    },
    {
      q: 'Are the action sheets and 30-day scorecard included inside the PDF?',
      a: 'Yes! Every chapter ends with an Action Sheet and 24-hour micro-challenge, plus the complete 30-Day Self-Trust Scorecard and Task-Aversion worksheets are formatted directly inside the book.'
    }
  ];

  return (
    <div className="min-h-screen bg-[#070b14] text-slate-100 selection:bg-cyan-500 selection:text-black font-sans pb-24">
      
      {/* TOP ANNOUNCEMENT BAR */}
      <div className="bg-gradient-to-r from-cyan-950 via-slate-900 to-amber-950 border-b border-cyan-500/20 py-2.5 px-4 text-center text-xs sm:text-sm font-medium text-cyan-300">
        <span>⚡ THE 49-PAGE ILLUSTRATED MASTER EBOOK • INSTANT WHOP DOWNLOAD</span>
      </div>

      {/* HERO SECTION */}
      <section className="max-w-6xl mx-auto px-6 pt-16 sm:pt-24 pb-20">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-center">
          
          {/* Left Column: Copy */}
          <div className="lg:col-span-7 space-y-6">
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-cyan-500/10 border border-cyan-500/30 text-xs font-mono tracking-wider text-cyan-400">
              <Sparkles className="w-3.5 h-3.5" />
              <span>NEURO-INFORMED MASTER EBOOK (AGES 16–30)</span>
            </div>

            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold tracking-tight text-white leading-[1.12]">
              Stop Fighting Your Brain. <br />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 via-sky-300 to-amber-400">
                Rewire Your Self-Trust.
              </span>
            </h1>

            <p className="text-lg text-slate-300 leading-relaxed max-w-xl">
              You aren’t lazy. Your stone-age brain is drowning in an attention economy designed to hijack it. Discover the neuroscience-backed operating manual to defeat dopamine addiction, close the Intention-Action Gap, and build undeniable confidence.
            </p>

            {/* Quick Feature Bullets */}
            <div className="space-y-3 pt-2">
              <div className="flex items-center gap-3 text-sm text-slate-200">
                <CheckCircle2 className="w-5 h-5 text-cyan-400 flex-shrink-0" />
                <span><strong>49-Page Master Guide:</strong> Zero fluff, pure actionable behavioral neuroscience</span>
              </div>
              <div className="flex items-center gap-3 text-sm text-slate-200">
                <CheckCircle2 className="w-5 h-5 text-cyan-400 flex-shrink-0" />
                <span><strong>11 Custom Editorial Illustrations:</strong> Visual mental models mapping your brain</span>
              </div>
              <div className="flex items-center gap-3 text-sm text-slate-200">
                <CheckCircle2 className="w-5 h-5 text-cyan-400 flex-shrink-0" />
                <span><strong>Printable 30-Day Scorecard:</strong> Daily self-trust tracking matrix included inside</span>
              </div>
            </div>

            {/* CTA Box */}
            <div className="pt-4 flex flex-col sm:flex-row items-stretch sm:items-center gap-4">
              <a
                href={checkoutUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center justify-center gap-3 px-8 py-4 rounded-xl bg-gradient-to-r from-cyan-500 to-blue-600 hover:from-cyan-400 hover:to-blue-500 text-slate-950 font-bold text-base transition-all duration-300 shadow-lg shadow-cyan-500/25 hover:shadow-cyan-500/40 hover:-translate-y-0.5 active:translate-y-0"
              >
                <span>Download eBook — ₹299</span>
                <ArrowRight className="w-5 h-5" />
              </a>

              <div className="flex items-center gap-2 text-xs text-slate-400 px-2">
                <ShieldCheck className="w-4 h-4 text-emerald-400" />
                <span>Instant 1-Click PDF Download via Whop</span>
              </div>
            </div>

            {/* Social Proof Stats */}
            <div className="pt-6 border-t border-slate-800/80 flex items-center gap-6 text-xs text-slate-400">
              <div className="flex items-center gap-1.5 text-amber-400">
                {[...Array(5)].map((_, i) => (
                  <Star key={i} className="w-4 h-4 fill-amber-400" />
                ))}
                <span className="text-white font-semibold ml-1">4.96/5</span>
              </div>
              <div>•</div>
              <div>420+ Copies Downloaded</div>
              <div>•</div>
              <div>100% Digital PDF Format</div>
            </div>

          </div>

          {/* Right Column: 3D Mockup Visual */}
          <div className="lg:col-span-5 flex justify-center">
            <div className="relative group max-w-sm w-full">
              <div className="absolute -inset-1.5 bg-gradient-to-r from-cyan-500 to-amber-500 rounded-2xl blur-xl opacity-30 group-hover:opacity-50 transition duration-700"></div>
              <div className="relative rounded-2xl overflow-hidden border border-slate-700/60 bg-slate-900 shadow-2xl">
                <img 
                  src="/self_trust_3d_mockup.jpg" 
                  alt="The Self-Trust Protocol 3D Book Mockup" 
                  className="w-full h-auto object-cover transform group-hover:scale-102 transition duration-500"
                />
                <div className="p-4 bg-slate-950/90 border-t border-slate-800 text-center">
                  <span className="text-xs font-mono text-cyan-400 uppercase tracking-wider">The Self-Trust Protocol • 49-Page Master PDF</span>
                </div>
              </div>
            </div>
          </div>

        </div>
      </section>

      {/* THE CORE MECHANISM SECTION */}
      <section className="bg-slate-950 border-y border-slate-800/80 py-20">
        <div className="max-w-5xl mx-auto px-6">
          <div className="text-center max-w-2xl mx-auto mb-16">
            <h2 className="text-3xl sm:text-4xl font-bold text-white mb-4">
              Discipline and Confidence Are the Same Skill.
            </h2>
            <p className="text-slate-400 text-base leading-relaxed">
              Confidence is not loud bragging or shouting affirmations into the mirror. Confidence is the internal reputation you have with yourself.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="p-6 rounded-2xl bg-slate-900/60 border border-slate-800/80 hover:border-cyan-500/40 transition">
              <div className="w-12 h-12 rounded-xl bg-cyan-500/10 flex items-center justify-center text-cyan-400 mb-5">
                <Brain className="w-6 h-6" />
              </div>
              <h3 className="text-lg font-bold text-white mb-2">The Biological Trap</h3>
              <p className="text-slate-400 text-sm leading-relaxed">
                Your prefrontal cortex lags development until age 25. Without external scaffolding, algorithms hijack your dopamine and leave you paralyzed.
              </p>
            </div>

            <div className="p-6 rounded-2xl bg-slate-900/60 border border-slate-800/80 hover:border-amber-500/40 transition">
              <div className="w-12 h-12 rounded-xl bg-amber-500/10 flex items-center justify-center text-amber-400 mb-5">
                <Zap className="w-6 h-6" />
              </div>
              <h3 className="text-lg font-bold text-white mb-2">The 5-Minute Micro-Ramp</h3>
              <p className="text-slate-400 text-sm leading-relaxed">
                Overcome emotional task-aversion by lowering activation energy. Once kinetic momentum takes over, finishing is effortless.
              </p>
            </div>

            <div className="p-6 rounded-2xl bg-slate-900/60 border border-slate-800/80 hover:border-emerald-500/40 transition">
              <div className="w-12 h-12 rounded-xl bg-emerald-500/10 flex items-center justify-center text-emerald-400 mb-5">
                <ShieldCheck className="w-6 h-6" />
              </div>
              <h3 className="text-lg font-bold text-white mb-2">The Self-Trust Ledger</h3>
              <p className="text-slate-400 text-sm leading-relaxed">
                Stack undeniable proof of kept daily micro-promises. Outwork your self-doubt and build quiet, natural authority that nobody can shake.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* CHAPTER ROADMAP */}
      <section className="max-w-5xl mx-auto px-6 py-24">
        <div className="text-center max-w-2xl mx-auto mb-16">
          <span className="text-xs font-mono text-cyan-400 uppercase tracking-wider">Full Curriculum</span>
          <h2 className="text-3xl sm:text-4xl font-bold text-white mt-2 mb-4">
            Inside the 10-Chapter Master Protocol
          </h2>
          <p className="text-slate-400 text-base">
            49 illustrated pages covering neuro-diagnosis, environmental friction, and graduated exposure.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {chapters.map(c => (
            <div key={c.num} className="p-5 rounded-xl bg-slate-900/40 border border-slate-800/80 hover:bg-slate-900/80 transition flex items-start gap-4">
              <span className="text-xl font-mono font-bold text-cyan-400/80">{c.num}</span>
              <div>
                <h4 className="font-bold text-white text-base mb-1">{c.title}</h4>
                <p className="text-slate-400 text-xs sm:text-sm leading-relaxed">{c.desc}</p>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* EBOOK SHOWCASE & DELIVERY */}
      <section className="bg-gradient-to-b from-slate-950 via-slate-900 to-slate-950 border-y border-slate-800 py-24">
        <div className="max-w-5xl mx-auto px-6">
          
          <div className="text-center max-w-2xl mx-auto mb-16">
            <span className="text-xs font-mono text-cyan-400 uppercase tracking-wider">Instant Digital Download</span>
            <h2 className="text-3xl sm:text-4xl font-bold text-white mt-2 mb-4">
              What You Receive Immediately
            </h2>
            <p className="text-slate-400 text-base">
              A complete, standalone master publication ready for your phone, tablet, or desktop.
            </p>
          </div>

          <div className="p-8 sm:p-10 rounded-2xl bg-slate-900/90 border border-cyan-500/30 shadow-2xl space-y-8">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-center pb-8 border-b border-slate-800">
              <div className="space-y-4">
                <div className="inline-block px-3 py-1 rounded bg-cyan-500/10 text-cyan-400 font-mono text-xs">CORE DELIVERABLE</div>
                <h3 className="text-2xl font-bold text-white">The Self-Trust Protocol Master eBook</h3>
                <p className="text-slate-300 text-sm leading-relaxed">
                  49 pages of high-signal, zero-fluff behavioral neuroscience, containing all 10 chapters and 11 custom editorial illustrations. Format: Print-Ready & Mobile-Optimized PDF (10.6 MB).
                </p>
                <div className="space-y-2 text-xs text-slate-300">
                  <div className="flex items-center gap-2">
                    <CheckCircle2 className="w-4 h-4 text-cyan-400" />
                    <span>Includes the 20-Foot Phone Air-Gap & 45-Min Morning Shield</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <CheckCircle2 className="w-4 h-4 text-cyan-400" />
                    <span>Includes the 5-Minute Micro-Ramp & Kinetic Momentum Rules</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <CheckCircle2 className="w-4 h-4 text-cyan-400" />
                    <span>Includes the 4-Tier Graduated Social Exposure Ladder</span>
                  </div>
                </div>
              </div>
              <div className="rounded-xl overflow-hidden border border-slate-800 shadow-xl">
                <img src="/self_trust_tablet_mockup.jpg" alt="Illustrated Digital Reader on Tablet" className="w-full h-56 object-cover" />
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-center">
              <div className="space-y-4">
                <div className="inline-block px-3 py-1 rounded bg-amber-500/10 text-amber-400 font-mono text-xs">BUILT-IN TOOLKITS</div>
                <h3 className="text-2xl font-bold text-white">Worksheets & 30-Day Scorecard</h3>
                <p className="text-slate-300 text-sm leading-relaxed">
                  Every chapter features an end-of-chapter Action Sheet. At the back of the book, you get the printable 30-Day Self-Trust Scorecard and the Task-Aversion Deconstructor.
                </p>
                <div className="flex items-center gap-2 text-xs text-emerald-400 font-medium">
                  <BookOpen className="w-4 h-4" />
                  <span>Integrated directly inside the PDF — no external apps required</span>
                </div>
              </div>
              <div className="p-6 rounded-xl bg-slate-950/80 border border-slate-800 text-center space-y-2">
                <div className="text-slate-400 line-through text-sm">Regular Price: ₹999 ($29)</div>
                <div className="text-4xl font-extrabold text-white">₹299 <span className="text-sm font-normal text-slate-400">($19)</span></div>
                <p className="text-xs text-emerald-400 font-medium">Instant 1-Click PDF Access via Whop</p>
              </div>
            </div>
          </div>

          {/* FINAL CTA BUTTON */}
          <div className="mt-12 text-center">
            <a
              href={checkoutUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center justify-center gap-3 px-10 py-5 rounded-xl bg-gradient-to-r from-cyan-500 via-sky-400 to-blue-600 hover:from-cyan-400 hover:to-blue-500 text-slate-950 font-bold text-lg transition-all shadow-xl shadow-cyan-500/25 hover:shadow-cyan-500/40 hover:-translate-y-0.5 active:translate-y-0"
            >
              <span>Download The Master eBook Now</span>
              <ArrowRight className="w-5 h-5" />
            </a>
            <p className="text-xs text-slate-400 mt-3">Instant download delivered securely to your device immediately via Whop.</p>
          </div>

        </div>
      </section>

      {/* FAQS SECTION */}
      <section className="max-w-4xl mx-auto px-6 py-24">
        <div className="text-center mb-16">
          <h2 className="text-3xl font-bold text-white mb-2">Frequently Asked Questions</h2>
          <p className="text-slate-400 text-sm">Everything you need to know about the eBook and delivery.</p>
        </div>

        <div className="space-y-4">
          {faqs.map((f, i) => (
            <div key={i} className="p-6 rounded-xl bg-slate-900/50 border border-slate-800/80 space-y-2">
              <h4 className="text-base font-bold text-white">{f.q}</h4>
              <p className="text-slate-400 text-sm leading-relaxed">{f.a}</p>
            </div>
          ))}
        </div>
      </section>

      {/* FOOTER */}
      <footer className="max-w-6xl mx-auto px-6 pt-12 border-t border-slate-800/60 text-center text-xs text-slate-400">
        <p>© 2026 ElevateWeb. All rights reserved. Delivered securely via Whop.</p>
      </footer>

    </div>
  );
};

export default SelfTrustLandingPage;
