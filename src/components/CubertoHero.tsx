import React from 'react';
import { ArrowDown, ArrowUpRight } from 'lucide-react';

export const CubertoHero: React.FC = () => {
  return (
    <section className="pt-40 md:pt-52 pb-16 md:pb-24 px-6 md:px-12 max-w-[1360px] mx-auto">
      {/* Top Category Tag */}
      <div className="flex items-center gap-3 mb-6">
        <span className="w-2 h-2 rounded-full bg-[#0066cc] animate-ping"></span>
        <span className="text-xs uppercase tracking-widest font-bold text-black/60 font-display">
          Elevateweb.me • Digital Product Studio
        </span>
      </div>

      {/* Cuberto Massive Editorial Title */}
      <div className="mb-10 max-w-5xl">
        <h1 className="cuberto-heading text-5xl sm:text-7xl md:text-8xl lg:text-[7.5rem] tracking-tighter text-black select-none">
          Digital systems &<br />
          execution toolkits
        </h1>
      </div>

      {/* Subtext and Meta Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-end border-t border-black/10 pt-8">
        <div className="lg:col-span-7">
          <p className="text-xl sm:text-2xl text-black/75 font-normal leading-relaxed max-w-2xl">
            We engineer master playbooks, Notion workspaces, and execution frameworks built for founders, engineers, and digital operators ready to move beyond the ordinary.
          </p>
        </div>

        <div className="lg:col-span-5 flex flex-col sm:flex-row lg:flex-col xl:flex-row gap-4 lg:justify-end">
          <a
            href="#flagship"
            className="cuberto-btn bg-black text-white hover:bg-black/90 inline-flex items-center gap-2 group"
            data-cursor-text="EXPLORE"
          >
            <span>90 Days Comeback Plan</span>
            <ArrowUpRight className="w-5 h-5 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
          </a>

          <a
            href="#products"
            className="cuberto-btn bg-transparent text-black border-black/20 hover:border-black inline-flex items-center gap-2"
          >
            <span>Explore All Work</span>
            <ArrowDown className="w-4 h-4" />
          </a>
        </div>
      </div>

      {/* Floating Trust Indicators */}
      <div className="mt-14 flex flex-wrap items-center gap-3">
        {[
          'FLAGSHIP 2026 EDITION',
          'WHOP VERIFIED PRODUCT',
          '160-PAGE MASTER BLUEPRINT',
          'NOTION OPERATING SYSTEM',
          'RAZORPAY & STRIPE SECURE',
        ].map((tag, idx) => (
          <span
            key={idx}
            className="px-3.5 py-1.5 rounded-full border border-black/15 text-[11px] font-bold uppercase tracking-wider text-black/70 bg-black/[0.02]"
          >
            {tag}
          </span>
        ))}
      </div>
    </section>
  );
};
