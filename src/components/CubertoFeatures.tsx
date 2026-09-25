import React, { useState } from 'react';

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
    title: 'Dopamine Baseline Reset & Friction Audit',
    desc: 'You cannot build execution velocity on a compromised neurological baseline. The opening 30 days are dedicated to eliminating passive micro-leaks, removing notifications, and establishing the daily Non-Negotiable 3 tasks.',
    tag: 'DAYS 1–30',
    image: 'https://images.unsplash.com/photo-1507238691740-187a5b1d37b8?auto=format&fit=crop&w=1000&q=80',
  },
  {
    num: '02',
    title: 'Sleep Architecture & Circadian Anchoring',
    desc: 'Deep focus requires sustained biological energy. We map circadian light exposure windows, sleep sanitation logs, and restorative protocols that guarantee sharp cognitive endurance throughout high-stress days.',
    tag: 'BIOLOGICAL FOUNDATION',
    image: 'https://images.unsplash.com/photo-1518770660439-4636190af475?auto=format&fit=crop&w=1000&q=80',
  },
  {
    num: '03',
    title: 'Monastic Sprint Cycles & Deep Focus',
    desc: 'Replace chaotic multi-tasking with structured 90-minute isolated sprint blocks. Learn exact spatial, audial, and tactile flow triggers that allow you to dive into concentrated technical or creative output effortlessly.',
    tag: 'DAYS 31–60',
    image: 'https://images.unsplash.com/photo-1460925895917-afdab827c52f?auto=format&fit=crop&w=1000&q=80',
  },
  {
    num: '04',
    title: 'Notion Operating System & Metric Tracking',
    desc: 'A complete duplicate-and-run Notion workspace containing sprint boards, habit matrix databases, project pipelines, and weekly audit templates with zero setup friction.',
    tag: 'DIGITAL WORKSPACE OS',
    image: 'https://images.unsplash.com/photo-1551288049-bebda4e38f71?auto=format&fit=crop&w=1000&q=80',
  },
  {
    num: '05',
    title: 'Zero-Regression Compounding Protocols',
    desc: 'Willpower is temporary; systems are permanent. Phase 3 installs systematic identity markers and fallback protocols to prevent relapse during disruptive weeks and sustain lifelong compounding momentum.',
    tag: 'DAYS 61–90',
    image: 'https://images.unsplash.com/photo-1526374965328-7f61d4dc18c5?auto=format&fit=crop&w=1000&q=80',
  },
];

export const CubertoFeatures: React.FC = () => {
  const [activeIndex, setActiveIndex] = useState<number>(0);

  return (
    <section id="capabilities" className="px-6 md:px-12 max-w-[1360px] mx-auto py-20 border-t border-black/10">
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">
        {/* Left Column: Section Title & Items Accordion */}
        <div className="lg:col-span-7">
          <div className="mb-12">
            <span className="text-xs font-bold font-display uppercase tracking-widest text-black/50 block mb-3">
              Curriculum & Frameworks
            </span>
            <h2 className="cuberto-heading text-4xl sm:text-5xl md:text-6xl text-black">
              What the system delivers
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

                  {isActive && (
                    <div className="pl-12 sm:pl-16 pt-3 pr-4 animate-fadeIn">
                      <p className="text-base sm:text-lg text-black/70 leading-relaxed max-w-xl">
                        {feat.desc}
                      </p>
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        </div>

        {/* Right Column: Sticky Visual Preview */}
        <div className="lg:col-span-5 sticky top-28 hidden lg:block">
          <div className="aspect-[4/3] rounded-3xl overflow-hidden bg-black/5 border border-black/10 shadow-lg relative group">
            <img
              src={FEATURES[activeIndex].image}
              alt={FEATURES[activeIndex].title}
              className="w-full h-full object-cover transition-all duration-700 ease-out group-hover:scale-105"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent flex flex-col justify-end p-8 text-white">
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
