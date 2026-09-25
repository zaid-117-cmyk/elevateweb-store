import React, { useEffect, useState } from 'react';

export const CubertoCursor: React.FC = () => {
  const [pos, setPos] = useState({ x: -100, y: -100 });
  const [target, setTarget] = useState({ x: -100, y: -100 });
  const [cursorText, setCursorText] = useState<string | null>(null);
  const [cursorVariant, setCursorVariant] = useState<'default' | 'hover' | 'text' | 'hidden'>('default');

  useEffect(() => {
    let animId: number;

    const handleMouseMove = (e: MouseEvent) => {
      setTarget({ x: e.clientX, y: e.clientY });

      // Detect cursor targets
      const targetEl = (e.target as HTMLElement)?.closest('[data-cursor-text], [data-cursor-variant], a, button');
      if (targetEl) {
        const text = targetEl.getAttribute('data-cursor-text');
        const variant = targetEl.getAttribute('data-cursor-variant') as any;

        if (text) {
          setCursorText(text);
          setCursorVariant('text');
        } else if (variant) {
          setCursorVariant(variant);
          setCursorText(null);
        } else {
          setCursorVariant('hover');
          setCursorText(null);
        }
      } else {
        setCursorVariant('default');
        setCursorText(null);
      }
    };

    const handleMouseLeave = () => {
      setCursorVariant('hidden');
    };

    // Smooth Lerp loop
    let currentX = -100;
    let currentY = -100;

    const loop = () => {
      currentX += (target.x - currentX) * 0.18;
      currentY += (target.y - currentY) * 0.18;
      setPos({ x: currentX, y: currentY });
      animId = requestAnimationFrame(loop);
    };

    window.addEventListener('mousemove', handleMouseMove);
    document.addEventListener('mouseleave', handleMouseLeave);
    animId = requestAnimationFrame(loop);

    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
      document.removeEventListener('mouseleave', handleMouseLeave);
      cancelAnimationFrame(animId);
    };
  }, [target.x, target.y]);

  if (cursorVariant === 'hidden') return null;

  const isText = cursorVariant === 'text' && cursorText;
  const isHover = cursorVariant === 'hover';

  const size = isText ? 84 : isHover ? 48 : 12;

  return (
    <div
      className="cuberto-cursor-dot flex items-center justify-center pointer-events-none select-none"
      style={{
        left: `${pos.x}px`,
        top: `${pos.y}px`,
        width: `${size}px`,
        height: `${size}px`,
        backgroundColor: isText
          ? '#000000'
          : isHover
          ? 'rgba(0, 0, 0, 0.15)'
          : '#000000',
        backdropFilter: isHover && !isText ? 'blur(4px)' : 'none',
        color: '#ffffff',
        transform: 'translate(-50%, -50%)',
        zIndex: 9999,
        transition: 'width 0.25s cubic-bezier(0.16, 1, 0.3, 1), height 0.25s cubic-bezier(0.16, 1, 0.3, 1), background-color 0.2s ease',
      }}
    >
      {isText && (
        <span className="text-[11px] font-bold tracking-widest uppercase font-display text-white text-center leading-none px-1">
          {cursorText}
        </span>
      )}
    </div>
  );
};
