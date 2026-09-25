import React, { useRef, useState, useEffect } from 'react';

interface CubertoDividerProps {
  color?: string;
  className?: string;
}

export const CubertoDivider: React.FC<CubertoDividerProps> = ({
  color = 'currentColor',
  className = '',
}) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const [controlY, setControlY] = useState(50);
  const [controlX, setControlX] = useState(500);
  const isHovered = useRef(false);
  const animFrame = useRef<number | null>(null);

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!containerRef.current) return;
    const rect = containerRef.current.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;

    // Normalizing X coordinate relative to 1000px viewBox
    const relX = (x / rect.width) * 1000;
    // Map Y to deflection around 50 (e.g., between 0 and 100)
    const relY = Math.min(Math.max((y / rect.height) * 100, 10), 90);

    setControlX(relX);
    setControlY(relY);
    isHovered.current = true;
  };

  const handleMouseLeave = () => {
    isHovered.current = false;

    // Spring oscillation physics back to 50
    let velocity = (50 - controlY) * 0.35;
    let currentY = controlY;
    const tension = 0.18;
    const damping = 0.82;

    const spring = () => {
      if (isHovered.current) return;
      const force = (50 - currentY) * tension;
      velocity = (velocity + force) * damping;
      currentY += velocity;

      setControlY(currentY);

      if (Math.abs(currentY - 50) > 0.1 || Math.abs(velocity) > 0.1) {
        animFrame.current = requestAnimationFrame(spring);
      } else {
        setControlY(50);
      }
    };

    if (animFrame.current) cancelAnimationFrame(animFrame.current);
    animFrame.current = requestAnimationFrame(spring);
  };

  useEffect(() => {
    return () => {
      if (animFrame.current) cancelAnimationFrame(animFrame.current);
    };
  }, []);

  return (
    <div
      ref={containerRef}
      className={`relative w-full h-16 py-2 overflow-visible select-none cursor-pointer ${className}`}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
    >
      <svg
        className="w-full h-full overflow-visible pointer-events-none"
        viewBox="0 0 1000 100"
        preserveAspectRatio="none"
      >
        <path
          d={`M 0,50 Q ${controlX},${controlY} 1000,50`}
          fill="none"
          stroke={color}
          strokeWidth="1.2"
        />
      </svg>
    </div>
  );
};
