import React, { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { ArrowUpRight, ShieldCheck } from 'lucide-react';
import { useCart } from '../hooks/useCart';
import { PRODUCTS } from '../lib/products';

export const CubertoNav: React.FC = () => {
  const { addToCart, openCart } = useCart();
  const location = useLocation();
  const isProductPage = location.pathname.startsWith('/product');

  const currentProduct = isProductPage
    ? PRODUCTS.find((p) => `/product/${p.slug}` === location.pathname)
    : null;

  const playbook = PRODUCTS.find((p) => p.id === 'prod-action-masterplan') || PRODUCTS[0];
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

        {/* Center Nav: Hidden on Product Pages to Eliminate Escape Routes */}
        {isProductPage ? (
          <div className="hidden md:flex items-center gap-2 text-xs font-mono text-black/40">
            <span>Verified Digital Edition</span>
            <span>•</span>
            <span>Instant 1-Click Access</span>
          </div>
        ) : (
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
              Action Masterplan
            </a>
            <a
              href="#capabilities"
              className="text-sm font-semibold tracking-tight text-black/70 hover:text-black transition-colors"
            >
              15 Books Curriculum
            </a>
            <Link
              to="/pricing-calculator"
              className="text-sm font-bold tracking-tight text-emerald-600 hover:text-emerald-700 transition-colors flex items-center gap-1.5"
            >
              <span className="h-2 w-2 rounded-full bg-emerald-500 animate-pulse"></span>
              <span>Pricing Calculator</span>
            </Link>
            <a
              href="#testimonials"
              className="text-sm font-semibold tracking-tight text-black/70 hover:text-black transition-colors"
            >
              Reviews
            </a>
          </nav>
        )}

        {/* Right Actions: Context-Aware Direct CTA & Trust Badge */}
        <div className="flex items-center gap-3">
          {isProductPage ? (
            <>
              <div className="hidden sm:flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-black/[0.04] border border-black/10 text-xs font-mono text-black/70">
                <ShieldCheck className="w-3.5 h-3.5 text-emerald-600" />
                <span>Verified Instant Delivery</span>
              </div>
              {currentProduct?.paymentUrl ? (
                <a
                  href={currentProduct.paymentUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-1.5 px-4 py-2 rounded-full bg-black text-white font-display font-semibold text-xs tracking-wider uppercase hover:scale-[1.03] transition-transform duration-200 shadow-sm"
                  data-cursor-text="BUY"
                >
                  <span>₹{currentProduct.price.standard} Access</span>
                  <ArrowUpRight className="w-3.5 h-3.5" />
                </a>
              ) : null}
            </>
          ) : (
            <button
              type="button"
              onClick={(e) => {
                e.preventDefault();
                if (playbook) {
                  addToCart(playbook, 'standard');
                  openCart();
                }
              }}
              className="hidden sm:inline-flex items-center gap-1.5 px-5 py-2.5 rounded-full bg-black text-white font-display font-semibold text-xs tracking-wider uppercase hover:scale-[1.03] transition-transform duration-200"
              data-cursor-text="BUY"
            >
              <span>₹299 Access</span>
              <ArrowUpRight className="w-3.5 h-3.5" />
            </button>
          )}
        </div>
      </div>
    </header>
  );
};
