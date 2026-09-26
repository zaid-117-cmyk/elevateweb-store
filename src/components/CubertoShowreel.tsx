import React, { useEffect, useRef } from 'react';
import { Link } from 'react-router-dom';
import { ArrowUpRight, BookOpen, CheckCircle, Sparkles } from 'lucide-react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { MagneticButton } from './MagneticButton';
import { FloatingPlaybook3D } from './FloatingPlaybook3D';
import { useCart } from '../hooks/useCart';
import { PRODUCTS } from '../lib/products';

gsap.registerPlugin(ScrollTrigger);

interface CubertoShowreelProps {
  onOpenSampleModal?: () => void;
}

export const CubertoShowreel: React.FC<CubertoShowreelProps> = ({ onOpenSampleModal }) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const cardRef = useRef<HTMLDivElement>(null);
  const { addToCart, openCart } = useCart();
  const playbook = PRODUCTS.find((p) => p.id === 'prod-1-page-action-playbook') || PRODUCTS[0];

  useEffect(() => {
    const card = cardRef.current;
    if (!card) return;

    const ctx = gsap.context(() => {
      // Showreel Card Expansion on Scroll
      gsap.fromTo(
        card,
        {
          scale: 0.94,
          borderRadius: '3.5rem',
        },
        {
          scale: 1,
          borderRadius: '2.5rem',
          ease: 'power2.out',
          scrollTrigger: {
            trigger: card,
            start: 'top 85%',
            end: 'top 30%',
            scrub: 1.2,
          },
        }
      );
    }, containerRef);

    return () => ctx.revert();
  }, []);

  const handleInstantBuy = (e: React.MouseEvent) => {
    e.preventDefault();
    if (playbook) {
      addToCart(playbook, 'standard');
      openCart();
    }
  };

  return (
    <section ref={containerRef} id="flagship" className="px-6 md:px-12 max-w-[1360px] mx-auto py-12">
      {/* Outer rounded Showreel card with ScrollTrigger scale-up */}
      <div
        ref={cardRef}
        className="cuberto-preview bg-black text-white p-8 sm:p-14 md:p-20 relative overflow-hidden group shadow-2xl will-change-transform"
        data-cursor-text="PLAYBOOK"
      >
        {/* Subtle geometric grid background */}
        <div className="absolute inset-0 bg-[linear-gradient(to_right,#ffffff0a_1px,transparent_1px),linear-gradient(to_bottom,#ffffff0a_1px,transparent_1px)] bg-[size:4rem_4rem] pointer-events-none"></div>

        {/* Top Badges */}
        <div className="relative z-10 flex flex-wrap items-center justify-between gap-4 mb-12">
          <div className="flex items-center gap-3">
            <span className="px-3.5 py-1.5 rounded-full bg-white/10 backdrop-blur-md border border-white/20 text-xs font-bold uppercase tracking-widest text-white flex items-center gap-2 font-mono">
              <Sparkles className="w-3.5 h-3.5 text-[#2997ff]" />
              Classic Vintage Edition
            </span>
            <span className="text-xs font-mono uppercase tracking-wider text-white/50">
              15 Master Action Sheets • Hinglish
            </span>
          </div>

          <div className="flex items-center gap-2">
            <span className="px-3 py-1 rounded-full bg-[#0066cc] text-white font-mono text-xs font-bold">
              SAVE 50%
            </span>
            <span className="text-sm font-bold font-mono text-white">
              ₹499 <span className="line-through text-white/40 text-xs font-normal">₹999</span>
            </span>
          </div>
        </div>

        {/* 2-Column Content: Left Details, Right 3D Floating Book */}
        <div className="relative z-10 grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          <div className="lg:col-span-7">
            <div className="flex items-center gap-2 text-xs font-vintage text-[#2997ff] uppercase tracking-[0.25em] mb-3">
              <span>♦ ❖ ♦</span>
              <span>Flagship Release</span>
            </div>

            <h2 className="cuberto-heading text-4xl sm:text-6xl md:text-7xl font-bold tracking-tight mb-6">
              The 1-Page Action Playbook.
            </h2>
            <p className="text-lg sm:text-xl text-white/70 max-w-xl font-normal leading-relaxed mb-8">
              Top 15 Self-Help Books Ka Asli Nichod. Moti kitabein padhna chhodo, direct action shuru karo. 15 concise Hinglish action sheets with 4-box models, real Indian context, and zero boring gyan.
            </p>

            {/* Feature Checklist */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5 mb-10">
              {[
                '15 High-Res 1-Page Action Sheets (PDF & ePub)',
                'Atomic Habits: Remote Control & 2-Minute Rule',
                'Deep Work: Monastic Focus & 30-Day Phone Detox',
                'Can\'t Hurt Me: The 40% Rule & Mirror Test',
                '48 Laws of Power: Strategic Silence & Power Rules',
                'Karna Kya Hai Checklists & Shabdkosh Glossaries',
              ].map((feat, idx) => (
                <div key={idx} className="flex items-center gap-2.5 text-sm text-white/80">
                  <CheckCircle className="w-4 h-4 text-[#2997ff] flex-shrink-0" />
                  <span>{feat}</span>
                </div>
              ))}
            </div>

            {/* CTAs with Magnetic Buttons */}
            <div className="flex flex-wrap items-center gap-4">
              <MagneticButton strength={0.3}>
                <button
                  type="button"
                  onClick={handleInstantBuy}
                  className="cuberto-btn bg-white text-black hover:bg-white/90 border-transparent inline-flex items-center gap-2 shadow-lg"
                  data-cursor-text="BUY"
                >
                  <span>Claim Instant Access — ₹499</span>
                  <ArrowUpRight className="w-4 h-4" />
                </button>
              </MagneticButton>

              <MagneticButton strength={0.2}>
                <Link
                  to="/product/the-1-page-action-playbook"
                  className="cuberto-btn bg-transparent text-white border-white/20 hover:border-white inline-flex items-center gap-2"
                  data-cursor-text="VIEW"
                >
                  <span>View Details</span>
                  <ArrowUpRight className="w-4 h-4" />
                </Link>
              </MagneticButton>

              {onOpenSampleModal && (
                <MagneticButton strength={0.2}>
                  <button
                    type="button"
                    onClick={onOpenSampleModal}
                    className="cuberto-btn bg-transparent text-white/80 border-white/10 hover:border-white/40 inline-flex items-center gap-2"
                    data-cursor-text="READ"
                  >
                    <BookOpen className="w-4 h-4" />
                    <span>Sample Sheet</span>
                  </button>
                </MagneticButton>
              )}
            </div>
          </div>

          {/* Right Column: Floating 3D Book Component */}
          <div className="lg:col-span-5 flex justify-center items-center">
            <FloatingPlaybook3D />
          </div>
        </div>
      </div>
    </section>
  );
};

