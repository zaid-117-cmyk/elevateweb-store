import React from 'react';

interface Testimonial {
  quote: string;
  author: string;
  role: string;
  badge: string;
}

const TESTIMONIALS: Testimonial[] = [
  {
    quote:
      'The dopamine detox and sleep architecture protocols completely transformed my output. I went from chronic brain fog to locking in 4.5 hours of monastic, uninterrupted sprint execution every single morning.',
    author: 'Marcus Vance',
    role: 'Founder @ SynthHQ',
    badge: '90 DAYS PLAN OPERATOR',
  },
  {
    quote:
      'Most productivity books are 200 pages of recycled filler. Elevateweb built an actionable operational protocol. The circadian anchoring schedules and weekly milestone reviews are pure gold.',
    author: 'Ananya Sharma',
    role: 'Principal Engineer & Consultant',
    badge: 'VERIFIED PURCHASE',
  },
  {
    quote:
      'The included Notion workspace alone saved me weeks of manual tracking setup. Clean databases, instant sprint pipelines, and habit matrix dashboards that just work without clutter.',
    author: 'David Chen',
    role: 'Head of Product @ LayerZero',
    badge: '90 DAYS PLAN OPERATOR',
  },
];

export const CubertoTestimonials: React.FC = () => {
  return (
    <section id="testimonials" className="bg-black text-white py-24 md:py-32 px-6 md:px-12 border-t border-white/10">
      <div className="max-w-[1360px] mx-auto">
        <div className="mb-16 md:mb-20 text-center max-w-2xl mx-auto">
          <span className="text-xs font-mono uppercase tracking-widest text-[#2997ff] block mb-3">
            Real Proof
          </span>
          <h2 className="cuberto-heading text-4xl sm:text-5xl md:text-6xl">
            Trusted by operators
          </h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {TESTIMONIALS.map((t, idx) => (
            <div
              key={idx}
              className="p-8 sm:p-10 rounded-3xl bg-[#111] border border-white/10 flex flex-col justify-between hover:border-white/25 transition-colors"
            >
              <div className="mb-8">
                <span className="text-4xl text-white/20 font-serif block mb-4">“</span>
                <p className="text-base sm:text-lg text-white/80 leading-relaxed font-normal">
                  {t.quote}
                </p>
              </div>

              <div className="border-t border-white/10 pt-6">
                <span className="text-[10px] font-mono text-[#2997ff] uppercase tracking-wider block mb-1">
                  {t.badge}
                </span>
                <h4 className="font-display font-bold text-lg text-white">{t.author}</h4>
                <p className="text-xs text-white/50">{t.role}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
