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
      'Main pehle Atomic Habits aur Deep Work lakar table par sajata tha, padhta kabhi nahi tha. Yeh 1-page action sheets ne 15 minute mein pura concept clear kar diya aur maine phone dusre kamre mein rakhna shuru kar diya.',
    author: 'Rahul Sharma',
    role: 'Computer Science Student',
    badge: 'PLAYBOOK OPERATOR',
  },
  {
    quote:
      'The Hinglish explanation with "Karna Kya Hai" action boxes is pure genius. Zero boring theory, 100% direct implementation. Worth 10x the price for anyone who wants quick execution.',
    author: 'Priya Verma',
    role: 'Digital Marketer & Freelancer',
    badge: 'VERIFIED READER',
  },
  {
    quote:
      'Most self-help books are 300 pages of recycled stories. The 1-Page Playbook gives you the exact 4-step framework in 1 sheet. The Goggins 40% rule and 48 Laws breakdown are life-changing.',
    author: 'Ananya Sharma',
    role: 'Principal Engineer & Consultant',
    badge: 'PLAYBOOK OPERATOR',
  },
];

export const CubertoTestimonials: React.FC = () => {
  return (
    <section id="testimonials" className="bg-black text-white py-24 md:py-32 px-6 md:px-12 border-t border-white/10">
      <div className="max-w-[1360px] mx-auto">
        <div className="mb-16 md:mb-20 text-center max-w-2xl mx-auto">
          <span className="text-xs font-mono uppercase tracking-widest text-[#2997ff] block mb-3">
            Real Proof • Real Readers
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
