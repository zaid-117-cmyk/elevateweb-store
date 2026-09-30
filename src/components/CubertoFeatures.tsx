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
    title: 'Atomic Habits (James Clear) — Habit Ka Remote Control',
    desc: 'Cue, Craving, Response, Reward ka 4-box loop. Table par phone rakhoge toh scroll karoge; table saaf rakhoge toh kaam hoga. Includes 2-Minute Rule and Habit Stacking formulas.',
    tag: 'BEHAVIOR & HABITS',
    image: 'https://upload.wikimedia.org/wikipedia/en/a/a4/Atomic_Habits_cover.jpg',
  },
  {
    num: '02',
    title: 'Deep Work (Cal Newport) — Focus Ke 4 Tarike',
    desc: 'Monastic, Bimodal, Rhythmic, aur Journalistic modes. Distraction-free deep work blocks, 30-day phone detox protocols, aur rigid evening shutdown routines.',
    tag: 'COGNITIVE VELOCITY',
    image: 'https://upload.wikimedia.org/wikipedia/en/6/61/Deep_Work_book_cover.jpg',
  },
  {
    num: '03',
    title: 'Can\'t Hurt Me (David Goggins) — The 40% Rule',
    desc: 'Jab dimaag bolta hai "bas aur nahi hoga", tab sirf 40% tank khatam hota hai. Master the Accountability Mirror and Taking Souls mental dominance playbook.',
    tag: 'MENTAL TOUGHNESS',
    image: 'https://upload.wikimedia.org/wikipedia/en/f/f6/Can%27t_Hurt_Me.jpg',
  },
  {
    num: '04',
    title: '48 Laws of Power (Robert Greene) — Chalak Logo Se Bacho',
    desc: 'Master Law 4 (Always say less than necessary) and Law 1 (Never outshine the master). Emotional self-defense, workplace navigation, aur chup rehne ki taqat.',
    tag: 'SOCIAL DYNAMICS',
    image: 'https://upload.wikimedia.org/wikipedia/en/4/4b/The_48_Laws_of_Power.jpg',
  },
  {
    num: '05',
    title: 'Action Over Thinking — Build Don\'t Talk & Ikigai',
    desc: 'Kill overthinking paralysis. Find your sweet spot (Kya pasand hai + Kis cheez ke paise milte hain) and execute with Raj Shamani\'s 3-line cold outreach formula.',
    tag: 'EXECUTION & CAREER',
    image: 'https://cdn.penguin.co.in/wp-content/uploads/2025/06/9780143459682.jpg',
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
