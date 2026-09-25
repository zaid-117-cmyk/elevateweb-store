import React from 'react';
import { ArrowUpRight } from 'lucide-react';

export const CubertoOutro: React.FC = () => {
  return (
    <section className="bg-black text-white py-28 md:py-40 px-6 md:px-12 text-center border-t border-white/10 relative overflow-hidden">
      <div className="max-w-4xl mx-auto relative z-10">
        <span className="text-xs uppercase tracking-widest font-mono text-[#2997ff] block mb-6">
          Next Step
        </span>

        <h2 className="cuberto-heading text-4xl sm:text-6xl md:text-7xl lg:text-8xl tracking-tight mb-8">
          Ready to rebuild your daily baseline?
        </h2>

        <p className="text-lg sm:text-2xl text-white/70 max-w-2xl mx-auto font-normal leading-relaxed mb-12">
          Stop relying on fragile willpower. Install the systemic framework that turns daily execution into an automated habit loop.
        </p>

        <div className="flex flex-col sm:flex-row items-center justify-center gap-5">
          <a
            href="https://whop.com/elevateweb-b83f/90-days-comeback-plan/"
            target="_blank"
            rel="noopener noreferrer"
            className="cuberto-btn bg-white text-black hover:bg-white/90 border-transparent text-base sm:text-lg px-8 py-5"
            data-cursor-text="JOIN"
          >
            <span>Get 90 Days Comeback Plan — ₹999</span>
            <ArrowUpRight className="w-5 h-5 ml-1.5" />
          </a>
        </div>
      </div>
    </section>
  );
};
