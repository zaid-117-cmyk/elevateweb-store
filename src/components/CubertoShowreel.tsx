import React, { useState } from 'react';
import { ArrowUpRight, BookOpen, CheckCircle, Sparkles } from 'lucide-react';

interface CubertoShowreelProps {
  onOpenSampleModal?: () => void;
}

export const CubertoShowreel: React.FC<CubertoShowreelProps> = ({ onOpenSampleModal }) => {
  const [tilt, setTilt] = useState({ x: 0, y: 0 });

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    const rect = e.currentTarget.getBoundingClientRect();
    const x = ((e.clientX - rect.left) / rect.width - 0.5) * 16;
    const y = ((e.clientY - rect.top) / rect.height - 0.5) * -16;
    setTilt({ x, y });
  };

  const handleMouseLeave = () => {
    setTilt({ x: 0, y: 0 });
  };

  return (
    <section id="flagship" className="px-6 md:px-12 max-w-[1360px] mx-auto py-12">
      {/* Outer rounded Showreel card */}
      <div
        className="cuberto-preview bg-black text-white p-8 sm:p-14 md:p-20 relative overflow-hidden group shadow-2xl"
        onMouseMove={handleMouseMove}
        onMouseLeave={handleMouseLeave}
        data-cursor-text="EXPLORE"
      >
        {/* Subtle geometric grid background */}
        <div className="absolute inset-0 bg-[linear-gradient(to_right,#ffffff0a_1px,transparent_1px),linear-gradient(to_bottom,#ffffff0a_1px,transparent_1px)] bg-[size:4rem_4rem] pointer-events-none"></div>

        {/* Top Badges */}
        <div className="relative z-10 flex flex-wrap items-center justify-between gap-4 mb-12">
          <div className="flex items-center gap-3">
            <span className="px-3.5 py-1.5 rounded-full bg-white/10 backdrop-blur-md border border-white/20 text-xs font-bold uppercase tracking-widest text-white flex items-center gap-2">
              <Sparkles className="w-3.5 h-3.5 text-[#2997ff]" />
              Flagship System
            </span>
            <span className="text-xs font-mono uppercase tracking-wider text-white/50">
              Edition 2026 • 160 Pages
            </span>
          </div>

          <div className="flex items-center gap-2">
            <span className="px-3 py-1 rounded-full bg-[#0066cc] text-white font-mono text-xs font-bold">
              SAVE 20%
            </span>
            <span className="text-sm font-bold font-mono text-white">
              ₹999 <span className="line-through text-white/40 text-xs font-normal">₹1,249</span>
            </span>
          </div>
        </div>

        {/* 2-Column Content: Left Details, Right 3D Master Preview */}
        <div className="relative z-10 grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          <div className="lg:col-span-7">
            <h2 className="cuberto-heading text-4xl sm:text-6xl md:text-7xl font-bold tracking-tight mb-6">
              90 Days Comeback Plan.
            </h2>
            <p className="text-lg sm:text-xl text-white/70 max-w-xl font-normal leading-relaxed mb-8">
              The exact operating blueprint to reset your dopamine baseline, overhaul sleep architecture, execute monastic deep-work blocks, and build an unbreakable baseline of daily velocity.
            </p>

            {/* Feature Checklist */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5 mb-10">
              {[
                '160-Page Master eBook (PDF + ePub)',
                'Complete Notion Execution OS',
                'Circadian & Habit Tracking Spreadsheets',
                'Weekly Milestone Sprint Reviews',
                'Zero-Regression Protocols',
                'Lifetime Updates via Whop',
              ].map((feat, idx) => (
                <div key={idx} className="flex items-center gap-2.5 text-sm text-white/80">
                  <CheckCircle className="w-4 h-4 text-[#2997ff] flex-shrink-0" />
                  <span>{feat}</span>
                </div>
              ))}
            </div>

            {/* CTAs */}
            <div className="flex flex-wrap items-center gap-4">
              <a
                href="https://whop.com/elevateweb-b83f/90-days-comeback-plan/"
                target="_blank"
                rel="noopener noreferrer"
                className="cuberto-btn bg-white text-black hover:bg-white/90 border-transparent inline-flex items-center gap-2"
                data-cursor-text="BUY"
              >
                <span>Claim Instant Access — ₹999</span>
                <ArrowUpRight className="w-4 h-4" />
              </a>

              {onOpenSampleModal && (
                <button
                  type="button"
                  onClick={onOpenSampleModal}
                  className="cuberto-btn bg-transparent text-white border-white/20 hover:border-white inline-flex items-center gap-2"
                  data-cursor-text="READ"
                >
                  <BookOpen className="w-4 h-4" />
                  <span>Sample Chapter</span>
                </button>
              )}
            </div>
          </div>

          {/* Right 3D Perspective Book Display */}
          <div className="lg:col-span-5 flex justify-center perspective-[1200px]">
            <div
              className="w-[260px] sm:w-[300px] h-[380px] sm:h-[420px] rounded-r-xl rounded-l-sm bg-[#111] border border-white/20 shadow-2xl p-8 flex flex-col justify-between transition-transform duration-300 ease-out select-none relative"
              style={{
                transform: `rotateY(${tilt.x - 18}deg) rotateX(${tilt.y + 10}deg)`,
                transformStyle: 'preserve-3d',
              }}
            >
              <div className="flex items-center justify-between border-b border-white/10 pb-4">
                <span className="text-[10px] font-mono tracking-widest uppercase text-[#2997ff]">
                  ELEVATEWEB.ME
                </span>
                <span className="text-[10px] font-mono text-white/40">EDITION 2026</span>
              </div>

              <div>
                <span className="text-xs uppercase tracking-widest text-white/50 block mb-2 font-mono">
                  Master Playbook
                </span>
                <h3 className="font-display text-3xl font-extrabold tracking-tight leading-none text-white mb-3">
                  90 DAYS<br />COMEBACK<br />PLAN
                </h3>
                <p className="text-[11px] text-white/60 leading-relaxed font-mono">
                  Reset • Velocity • Compounding
                </p>
              </div>

              <div className="border-t border-white/10 pt-4 flex items-center justify-between">
                <span className="text-[10px] font-mono uppercase text-white/40">160 Pages</span>
                <span className="text-xs font-mono font-bold text-white">₹999</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
