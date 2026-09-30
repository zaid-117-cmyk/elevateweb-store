import React, { useEffect, useRef } from 'react';
import { ArrowUpRight } from 'lucide-react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { MagneticButton } from './MagneticButton';
import { useCart } from '../hooks/useCart';
import { PRODUCTS } from '../lib/products';

gsap.registerPlugin(ScrollTrigger);

export const CubertoHero: React.FC = () => {
  const heroRef = useRef<HTMLElement>(null);
  const headlineLine1Ref = useRef<HTMLSpanElement>(null);
  const headlineLine2Ref = useRef<HTMLSpanElement>(null);
  const subtextRef = useRef<HTMLParagraphElement>(null);
  const ctaBlockRef = useRef<HTMLDivElement>(null);
  const badgeRef = useRef<HTMLDivElement>(null);
  const tagsRef = useRef<HTMLDivElement>(null);
  const { addToCart, openCart } = useCart();
  const playbook = PRODUCTS.find((p) => p.id === 'prod-action-masterplan') || PRODUCTS[0];

  const handleBuy = (e: React.MouseEvent) => {
    e.preventDefault();
    if (playbook) {
      addToCart(playbook, 'standard');
      openCart();
    }
  };

  useEffect(() => {
    const ctx = gsap.context(() => {
      const tl = gsap.timeline({ defaults: { ease: 'power4.out' } });

      // 1. Category Tag reveal
      tl.from(badgeRef.current, {
        opacity: 0,
        y: 20,
        duration: 0.8,
      })
      // 2. Kinetic Headline Split Reveal
      .from(
        [headlineLine1Ref.current, headlineLine2Ref.current],
        {
          yPercent: 120,
          opacity: 0,
          duration: 1.2,
          stagger: 0.15,
          ease: 'power4.out',
        },
        '-=0.5'
      )
      // 3. Subtext Fade & Slide
      .from(
        subtextRef.current,
        {
          opacity: 0,
          y: 30,
          duration: 0.9,
          ease: 'power3.out',
        },
        '-=0.7'
      )
      // 4. CTAs reveal
      .from(
        ctaBlockRef.current,
        {
          opacity: 0,
          y: 20,
          duration: 0.8,
          ease: 'power3.out',
        },
        '-=0.6'
      )
      // 5. Trust tags stagger
      .from(
        tagsRef.current?.children || [],
        {
          opacity: 0,
          scale: 0.9,
          y: 15,
          duration: 0.6,
          stagger: 0.08,
          ease: 'back.out(1.5)',
        },
        '-=0.4'
      );

      // Scroll Parallax Scrub
      gsap.to(heroRef.current, {
        scrollTrigger: {
          trigger: heroRef.current,
          start: 'top top',
          end: 'bottom top',
          scrub: 1,
        },
        y: 60,
        opacity: 0.88,
        ease: 'none',
      });
    }, heroRef);

    return () => ctx.revert();
  }, []);

  return (
    <section
      ref={heroRef}
      className="pt-40 md:pt-52 pb-16 md:pb-24 px-6 md:px-12 max-w-[1360px] mx-auto will-change-transform"
    >
      {/* Top Category Tag */}
      <div ref={badgeRef} className="flex items-center gap-3 mb-6">
        <span className="w-2 h-2 rounded-full bg-[#0066cc] animate-ping"></span>
        <span className="text-xs uppercase tracking-widest font-bold text-black/60 font-display">
          ElevateWeb • Digital Product Studio
        </span>
      </div>

      {/* Cuberto Massive Editorial Title with Masked Line Wrappers */}
      <div className="mb-10 max-w-5xl overflow-hidden">
        <h1 className="cuberto-heading text-5xl sm:text-7xl md:text-8xl lg:text-[7.5rem] tracking-tighter text-black select-none">
          <span className="block overflow-hidden py-1">
            <span ref={headlineLine1Ref} className="block will-change-transform">
              Digital systems &
            </span>
          </span>
          <span className="block overflow-hidden py-1">
            <span ref={headlineLine2Ref} className="block will-change-transform">
              execution toolkits
            </span>
          </span>
        </h1>
      </div>

      {/* Subtext and Meta Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-end border-t border-black/10 pt-8">
        <div className="lg:col-span-7">
          <p
            ref={subtextRef}
            className="text-xl sm:text-2xl text-black/75 font-normal leading-relaxed max-w-2xl will-change-transform"
          >
            We engineer master playbooks, Notion workspaces, and execution frameworks built for founders, engineers, and digital operators ready to move beyond the ordinary.
          </p>
        </div>

        <div
          ref={ctaBlockRef}
          className="lg:col-span-5 flex flex-col sm:flex-row lg:flex-col xl:flex-row gap-4 lg:justify-end"
        >
          <MagneticButton strength={0.25}>
            <button
              onClick={handleBuy}
              className="cuberto-btn bg-black text-white hover:bg-black/90 inline-flex items-center gap-2 group shadow-lg"
              data-cursor-text="PLAYBOOK"
            >
              <span>The Action Masterplan</span>
              <ArrowUpRight className="w-5 h-5 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
            </button>
          </MagneticButton>
        </div>
      </div>

      {/* Floating Trust Indicators */}
      <div ref={tagsRef} className="mt-14 flex flex-wrap items-center gap-3">
        {[
          'CLASSIC VINTAGE EDITION',
          'TOP 15 BOOKS KA ASLI NICHOD',
          'HINGLISH ACTION SHEETS',
          'ZERO READING FRICTION',
          'RAZORPAY & UPI INSTANT ACCESS',
        ].map((tag, idx) => (
          <span
            key={idx}
            className="px-3.5 py-1.5 rounded-full border border-black/15 text-[11px] font-bold uppercase tracking-wider text-black/70 bg-black/[0.02] shadow-sm hover:border-black/30 transition-colors"
          >
            {tag}
          </span>
        ))}
      </div>
    </section>
  );
};
