import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { ArrowUpRight } from 'lucide-react';
import { useCart } from '../hooks/useCart';
import { PRODUCTS } from '../lib/products';

export const CubertoNav: React.FC = () => {
  const { addToCart } = useCart();
  const playbook = PRODUCTS.find((p) => p.id === 'prod-1-page-action-playbook') || PRODUCTS[0];
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 40);
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <header
      className={`fixed top-0 left-0 w-full z-50 transition-all duration-300 ${
        scrolled
          ? 'bg-white/85 backdrop-blur-xl border-b border-black/10 py-3.5 shadow-sm'
          : 'bg-transparent py-6'
      }`}
    >
      <div className="max-w-[1360px] mx-auto px-6 md:px-12 flex items-center justify-between">
        {/* Brand Logo */}
        <Link
          to="/"
          className="flex items-center gap-2 text-black hover:opacity-80 transition-opacity"
          data-cursor-text="HOME"
        >
          <span className="font-display font-extrabold text-2xl tracking-tighter">
            ElevateWeb
          </span>
        </Link>

        {/* Center Nav Links */}
        <nav className="hidden md:flex items-center gap-8">
          <a
            href="#products"
            className="text-sm font-semibold tracking-tight text-black/70 hover:text-black transition-colors"
          >
            Digital Products
          </a>
          <a
            href="#flagship"
            className="text-sm font-semibold tracking-tight text-black/70 hover:text-black transition-colors"
          >
            1-Page Playbook
          </a>
          <a
            href="#capabilities"
            className="text-sm font-semibold tracking-tight text-black/70 hover:text-black transition-colors"
          >
            15 Books Curriculum
          </a>
          <a
            href="#testimonials"
            className="text-sm font-semibold tracking-tight text-black/70 hover:text-black transition-colors"
          >
            Reviews
          </a>
        </nav>

        {/* Right Actions: Cart & Magnetic CTA */}
        <div className="flex items-center gap-4">
          <button
            type="button"
            onClick={(e) => {
              e.preventDefault();
              if (playbook) addToCart(playbook, 'standard');
            }}
            className="hidden sm:inline-flex items-center gap-1.5 px-5 py-2.5 rounded-full bg-black text-white font-display font-semibold text-xs tracking-wider uppercase hover:scale-[1.03] transition-transform duration-200"
            data-cursor-text="BUY"
          >
            <span>₹199 Access</span>
            <ArrowUpRight className="w-3.5 h-3.5" />
          </button>
        </div>
      </div>
    </header>
  );
};
