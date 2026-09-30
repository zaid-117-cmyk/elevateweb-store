import React from 'react';
import { ArrowUp } from 'lucide-react';

export const CubertoFooter: React.FC = () => {
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <footer className="bg-black text-white py-12 px-6 md:px-12 border-t border-white/10">
      <div className="max-w-[1360px] mx-auto flex flex-col sm:flex-row items-center justify-between gap-6">
        <div>
          <span className="font-display font-bold text-xl tracking-tight block">
            ElevateWeb
          </span>
          <p className="text-xs text-white/50 mt-1">
            © 2026 Elevateweb. All operating rights reserved.
          </p>
        </div>

        <div className="flex items-center gap-8 text-xs font-semibold text-white/70">
          <a
            href="#flagship"
            className="hover:text-white transition-colors"
          >
            Action Masterplan
          </a>
          <a
            href="https://elevateweb.me"
            target="_blank"
            rel="noopener noreferrer"
            className="hover:text-white transition-colors"
          >
            ElevateWeb
          </a>
          <button
            type="button"
            onClick={scrollToTop}
            className="flex items-center gap-1.5 hover:text-white transition-colors cursor-pointer"
            data-cursor-text="TOP"
          >
            <span>Back to top</span>
            <ArrowUp className="w-3.5 h-3.5" />
          </button>
        </div>
      </div>
    </footer>
  );
};
