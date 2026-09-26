import React, { useEffect, useRef, useState } from 'react';
import gsap from 'gsap';

export const CubertoCursor: React.FC = () => {
  const cursorRef = useRef<HTMLDivElement>(null);
  const [cursorText, setCursorText] = useState<string | null>(null);
  const [isHovered, setIsHovered] = useState(false);
  const [isDarkSection, setIsDarkSection] = useState(false);
  const [isVisible, setIsVisible] = useState(false);

  // Use refs to track current state inside the mousemove closure
  const stateRef = useRef({
    cursorText: null as string | null,
    isHovered: false,
    isDarkSection: false,
    isVisible: false,
  });

  useEffect(() => {
    // Disable on touch screens (phones / tablets)
    if (window.matchMedia('(pointer: coarse)').matches) {
      return;
    }

    const el = cursorRef.current;
    if (!el) return;

    gsap.set(el, { xPercent: -50, yPercent: -50 });

    const xTo = gsap.quickTo(el, 'x', { duration: 0.15, ease: 'power3.out' });
    const yTo = gsap.quickTo(el, 'y', { duration: 0.15, ease: 'power3.out' });

    let hasInitialized = false;

    const handleMouseMove = (e: MouseEvent) => {
      if (!hasInitialized) {
        hasInitialized = true;
        gsap.set(el, { x: e.clientX, y: e.clientY });
        if (!stateRef.current.isVisible) {
          stateRef.current.isVisible = true;
          setIsVisible(true);
        }
      } else {
        xTo(e.clientX);
        yTo(e.clientY);
        if (!stateRef.current.isVisible) {
          stateRef.current.isVisible = true;
          setIsVisible(true);
        }
      }

      const target = e.target as HTMLElement | null;
      if (target) {
        const inDark = !!target.closest(
          '.bg-black, [data-theme="dark"], #products, #testimonials, #flagship'
        );
        if (stateRef.current.isDarkSection !== inDark) {
          stateRef.current.isDarkSection = inDark;
          setIsDarkSection(inDark);
        }

        const interactive = target.closest('[data-cursor-text], a, button, [role="button"]');
        if (interactive) {
          const text = interactive.getAttribute('data-cursor-text');
          if (stateRef.current.cursorText !== text || stateRef.current.isHovered !== true) {
            stateRef.current.cursorText = text || null;
            stateRef.current.isHovered = true;
            setCursorText(text || null);
            setIsHovered(true);
          }
        } else {
          if (stateRef.current.cursorText !== null || stateRef.current.isHovered !== false) {
            stateRef.current.cursorText = null;
            stateRef.current.isHovered = false;
            setCursorText(null);
            setIsHovered(false);
          }
        }
      }
    };

    const handleMouseLeave = () => {
      stateRef.current.isVisible = false;
      setIsVisible(false);
      hasInitialized = false;
    };

    const handleMouseEnter = () => {
      stateRef.current.isVisible = true;
      setIsVisible(true);
    };

    window.addEventListener('mousemove', handleMouseMove, { passive: true });
    document.addEventListener('mouseleave', handleMouseLeave);
    document.addEventListener('mouseenter', handleMouseEnter);

    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
      document.removeEventListener('mouseleave', handleMouseLeave);
      document.removeEventListener('mouseenter', handleMouseEnter);
    };
  }, []);

  return (
    <div
      ref={cursorRef}
      className={`cuberto-cursor-wrapper hidden md:flex select-none transition-opacity duration-200 ${
        isVisible ? 'opacity-100' : 'opacity-0'
      }`}
    >
      <div
        className={`flex items-center justify-center rounded-full transition-all duration-300 ease-out ${
          cursorText
            ? isDarkSection
              ? 'w-20 h-20 bg-white text-black shadow-2xl scale-100'
              : 'w-20 h-20 bg-black text-white shadow-2xl scale-100'
            : isHovered
            ? isDarkSection
              ? 'w-12 h-12 bg-white/20 backdrop-blur-sm border border-white/30 scale-100'
              : 'w-12 h-12 bg-black/15 backdrop-blur-sm border border-black/20 scale-100'
            : isDarkSection
            ? 'w-3 h-3 bg-white'
            : 'w-3 h-3 bg-black'
        }`}
      >
        {cursorText && (
          <span
            className={`text-[10px] font-mono font-bold tracking-widest uppercase select-none px-1 text-center ${
              isDarkSection ? 'text-black' : 'text-white'
            }`}
          >
            {cursorText}
          </span>
        )}
      </div>
    </div>
  );
};
