import React, { useRef, useState } from 'react';

interface FloatingPlaybook3DProps {
  className?: string;
}

export const FloatingPlaybook3D: React.FC<FloatingPlaybook3DProps> = ({ className = '' }) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const [mouseTilt, setMouseTilt] = useState({ x: 0, y: 0 });

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!containerRef.current) return;
    const rect = containerRef.current.getBoundingClientRect();
    const x = ((e.clientX - rect.left) / rect.width - 0.5) * 24;
    const y = ((e.clientY - rect.top) / rect.height - 0.5) * -24;
    setMouseTilt({ x, y });
  };

  const handleMouseLeave = () => {
    setMouseTilt({ x: 0, y: 0 });
  };

  return (
    <div
      ref={containerRef}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      className={`relative flex flex-col items-center justify-center perspective-[1200px] select-none py-6 ${className}`}
    >
      {/* 3D Floating Book Container */}
      <div
        className="w-[280px] sm:w-[320px] h-[400px] sm:h-[450px] relative transition-transform duration-300 ease-out will-change-transform animate-float-book"
        style={{
          transformStyle: 'preserve-3d',
          transform: `rotateY(${mouseTilt.x - 18}deg) rotateX(${mouseTilt.y + 10}deg)`,
        }}
      >
        {/* Front Cover */}
        <div
          className="absolute inset-0 bg-[#F9F8F3] text-[#1A1918] rounded-r-xl rounded-l-sm shadow-2xl p-6 sm:p-7 flex flex-col justify-between border border-[#DCD6C7] overflow-hidden"
          style={{
            transform: 'translateZ(14px)',
            boxShadow: '-16px 20px 48px rgba(0, 0, 0, 0.45)',
          }}
        >
          {/* Double Hairline Vintage Border */}
          <div className="absolute inset-3 sm:inset-3.5 border border-[#2B2925]/35 pointer-events-none flex flex-col justify-between p-4 sm:p-5">
            <div className="absolute inset-1.5 border border-[#2B2925]/15 pointer-events-none" />
          </div>

          {/* Top Section */}
          <div className="relative z-10 text-center pt-2">
            <p className="font-vintage text-[10px] tracking-[0.28em] uppercase text-[#4A4742] font-semibold">
              First Edition
            </p>
            <div className="text-[10px] tracking-widest text-[#6B655B] my-2">
              ♦ ❖ ♦
            </div>
            <h2 className="font-vintage text-2xl sm:text-[1.75rem] font-extrabold tracking-tight text-[#1A1918] leading-[1.1] mt-2">
              THE ACTION<br />MASTERPLAN
            </h2>
            <p className="font-serif italic text-[11px] sm:text-xs text-[#4A4742] mt-2 tracking-wide font-medium">
              Convert Directionless Ambition into Action
            </p>
            <p className="text-[9px] font-sans font-medium text-[#6B655B] mt-1 tracking-wider uppercase">
              Stop Watching Tutorials • Start Executing
            </p>
          </div>

          {/* Center Ornamental Space */}
          <div className="relative z-10 flex-1 flex items-center justify-center my-3">
            <div className="w-16 h-16 rounded-full border border-[#2B2925]/20 flex items-center justify-center text-[#2B2925]/40 text-lg font-serif">
              ✦
            </div>
          </div>

          {/* Bottom Section */}
          <div className="relative z-10 text-center pb-2 border-t border-[#2B2925]/25 pt-3">
            <p className="font-vintage text-[8.5px] sm:text-[9.5px] tracking-[0.2em] uppercase text-[#3D3A35] font-bold">
              Artificial Boss • Binary Checklists
            </p>
            <div className="text-xs text-[#524E48] my-1">❦</div>
            <p className="font-sans text-[8.5px] tracking-wider uppercase text-[#524E48] font-semibold">
              The Biggest Problem is No One Tells You What To Do
            </p>
          </div>
        </div>

        {/* 3D Book Spine */}
        <div
          className="absolute top-0 left-0 w-[28px] h-full bg-[#E5DECD] border-r border-[#C7BEAA] flex items-center justify-center shadow-inner"
          style={{
            transform: 'rotateY(-90deg) translateZ(14px)',
            transformOrigin: 'left',
          }}
        >
          <span className="font-vintage text-[9px] tracking-[0.2em] uppercase text-[#3A3731] font-bold whitespace-nowrap -rotate-90">
            THE ACTION MASTERPLAN
          </span>
        </div>

        {/* 3D Book Page Rim (Right edge) */}
        <div
          className="absolute top-1 bottom-1 right-0 w-[24px] bg-[#FAF8F5] border-l border-[#DCD6C7] rounded-r-md shadow-inner"
          style={{
            transform: 'rotateY(90deg) translateZ(266px)',
            transformOrigin: 'right',
            backgroundImage: 'repeating-linear-gradient(90deg, #F3EFE6 0px, #FAF8F5 2px, #E5DEC9 4px)',
          }}
        />

        {/* Back Cover */}
        <div
          className="absolute inset-0 bg-[#EFECE3] rounded-l-xl rounded-r-sm border border-[#DCD6C7]"
          style={{
            transform: 'rotateY(180deg) translateZ(14px)',
          }}
        />
      </div>

      {/* Floating Ground Shadow */}
      <div
        className="w-[220px] sm:w-[260px] h-[24px] bg-black rounded-[100%] blur-xl mt-6 animate-float-shadow pointer-events-none"
      />
    </div>
  );
};
