import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

interface FeatureItem {
  num: string;
  title: string;
  desc: string;
  tag: string;
  image: string;
}

const FEATURES: FeatureItem[] = [
  {
    num: '01',
    title: 'The Aaina Audit — Brutal Reality Check',
    desc: 'Stop lying to yourself about working hard. This protocol forces you to look in the mirror, track exactly where your time bleeds, and deconstruct your true goals without the fluff.',
    tag: 'GOAL DECONSTRUCTION',
    image: 'https://images.unsplash.com/photo-1611224885990-ab7363d1f2a9?auto=format&fit=crop&w=1200&q=80',
  },
  {
    num: '02',
    title: 'The Artificial Boss Protocol',
    desc: 'You lack a boss to fire you, which is why you slack off. Install an artificial, rigid operating system that gives you non-negotiable daily mandates and absolute accountability.',
    tag: 'SYSTEMS & ACCOUNTABILITY',
    image: 'https://images.unsplash.com/photo-1544716278-ca5e3f4abd8c?auto=format&fit=crop&w=1200&q=80',
  },
  {
    num: '03',
    title: 'Binary Checkbox Engine',
    desc: 'Kill the overwhelming to-do lists. Convert your massive ambitions into simple (0/1) binary checkboxes. Did you do the work? Yes or No. No emotions, pure execution.',
    tag: 'EXECUTION VELOCITY',
    image: 'https://images.unsplash.com/photo-1484480974693-6ca0a78fb36b?auto=format&fit=crop&w=1200&q=80',
  },
  {
    num: '04',
    title: 'Solo Troubleshooting Matrix',
    desc: 'Stuck on a bug? Procrastinating? Use the precise if-then troubleshooting framework to debug your own brain and get back to writing code or shipping work instantly.',
    tag: 'COGNITIVE DEBUGGING',
    image: 'https://images.unsplash.com/photo-1504384308090-c894fdcc538d?auto=format&fit=crop&w=1200&q=80',
  },
  {
    num: '05',
    title: 'The Cold Start Override',
    desc: 'The exact step-by-step mechanical trigger to bypass the "I don\'t feel like doing it" emotion. Activate the override code and enter deep focus within 3 minutes.',
    tag: 'ANTI-PROCRASTINATION',
    image: 'https://images.unsplash.com/photo-1555421689-491a97ff2040?auto=format&fit=crop&w=1200&q=80',
  },
];

export const CubertoFeatures: React.FC = () => {
  const [activeIndex, setActiveIndex] = useState<number>(0);
  const sectionRef = useRef<HTMLElement>(null);
  const titleRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const section = sectionRef.current;
    if (!section) return;

    const ctx = gsap.context(() => {
      gsap.from(titleRef.current, {
        scrollTrigger: {
          trigger: section,
          start: 'top 80%',
        },
        opacity: 0,
        y: 40,
        duration: 0.9,
        ease: 'power3.out',
      });
    }, section);

    return () => ctx.revert();
  }, []);

  return (
    <section
      ref={sectionRef}
      id="capabilities"
      className="px-6 md:px-12 max-w-[1360px] mx-auto py-20 border-t border-black/10"
    >
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">
        {/* Left Column: Section Title & Items Accordion */}
        <div className="lg:col-span-7">
          <div ref={titleRef} className="mb-12">
            <span className="text-xs font-bold font-mono uppercase tracking-widest text-[#0066cc] block mb-3">
              Artificial Boss • Binary Checklists
            </span>
            <h2 className="cuberto-heading text-4xl sm:text-5xl md:text-6xl text-black">
              Inside the masterplan
            </h2>
          </div>

          <div className="divide-y divide-black/10">
            {FEATURES.map((feat, idx) => {
              const isActive = activeIndex === idx;
              return (
                <div
                  key={feat.num}
                  className="py-7 group cursor-pointer transition-colors"
                  onClick={() => setActiveIndex(idx)}
                  onMouseEnter={() => setActiveIndex(idx)}
                >
                  <div className="flex items-baseline justify-between gap-4 mb-2">
                    <div className="flex items-baseline gap-6">
                      <span className="font-mono text-sm sm:text-base font-bold text-black/40 group-hover:text-black transition-colors">
                        {feat.num}
                      </span>
                      <h3
                        className={`font-display text-2xl sm:text-3xl font-bold tracking-tight transition-colors ${
                          isActive ? 'text-black' : 'text-black/50 group-hover:text-black/80'
                        }`}
                      >
                        {feat.title}
                      </h3>
                    </div>
                    <span className="hidden sm:inline-block px-3 py-1 rounded-full text-[10px] font-mono uppercase tracking-wider border border-black/15 text-black/60">
                      {feat.tag}
                    </span>
                  </div>

                  <AnimatePresence initial={false}>
                    {isActive && (
                      <motion.div
                        initial={{ opacity: 0, height: 0 }}
                        animate={{ opacity: 1, height: 'auto' }}
                        exit={{ opacity: 0, height: 0 }}
                        transition={{ duration: 0.35, ease: [0.16, 1, 0.3, 1] }}
                        className="pl-12 sm:pl-16 pt-2 pr-4 overflow-hidden"
                      >
                        <p className="text-base sm:text-lg text-black/70 leading-relaxed max-w-xl">
                          {feat.desc}
                        </p>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>
              );
            })}
          </div>
        </div>

        {/* Right Column: Sticky Visual Preview with Framer Motion Image Morph */}
        <div className="lg:col-span-5 sticky top-28 hidden lg:block">
          <div className="aspect-[4/3] rounded-3xl overflow-hidden bg-black/5 border border-black/10 shadow-lg relative group">
            <AnimatePresence mode="wait">
              <motion.img
                key={FEATURES[activeIndex].num}
                src={FEATURES[activeIndex].image}
                alt={FEATURES[activeIndex].title}
                initial={{ opacity: 0, scale: 1.08 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.98 }}
                transition={{ duration: 0.45, ease: [0.16, 1, 0.3, 1] }}
                className="w-full h-full object-cover"
              />
            </AnimatePresence>
            <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent flex flex-col justify-end p-8 text-white pointer-events-none">
              <span className="text-xs font-mono uppercase tracking-widest text-[#2997ff] mb-1">
                {FEATURES[activeIndex].tag}
              </span>
              <h4 className="font-display text-xl font-bold tracking-tight">
                {FEATURES[activeIndex].title}
              </h4>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
