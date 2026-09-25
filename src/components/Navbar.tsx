import React, { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { ShoppingBag, Search, Sparkles, Menu, X, ShieldCheck } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { useCart } from '../hooks/useCart';

export const Navbar: React.FC<{ onSearchClick?: () => void }> = ({ onSearchClick }) => {
  const { itemCount, openCart } = useCart();
  const location = useLocation();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const isHome = location.pathname === '/';

  return (
    <header className="sticky top-0 z-40 w-full transition-all duration-300">
      {/* Top micro-bar */}
      <div className="bg-gradient-to-r from-amber-500/10 via-cyan-500/10 to-amber-500/10 border-b border-white/[0.06] py-1.5 px-4 text-center text-xs text-slate-300">
        <span className="inline-flex items-center gap-2">
          <Sparkles className="w-3.5 h-3.5 text-amber-400 animate-pulse" />
          <span>Launch Celebration: Use code <strong className="text-amber-300 font-semibold tracking-wider">ELEVATE20</strong> for 20% off all assets</span>
          <span className="hidden sm:inline text-white/30">•</span>
          <span className="hidden sm:inline-flex items-center gap-1 text-slate-400">
            <ShieldCheck className="w-3.5 h-3.5 text-emerald-400" />
            Instant ZIP + GitHub Access
          </span>
        </span>
      </div>

      {/* Main navigation glass navbar */}
      <nav className="border-b border-white/[0.08] bg-obsidian-950/80 backdrop-blur-xl">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-20 flex items-center justify-between gap-4">
          
          {/* Logo */}
          <Link to="/" className="flex items-center gap-3 group focus:outline-none focus-visible:ring-2 focus-visible:ring-amber-500 rounded-lg p-1">
            <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-amber-500 via-amber-600 to-amber-700 p-0.5 shadow-lg shadow-amber-500/20 group-hover:shadow-amber-500/40 transition-all duration-300">
              <div className="w-full h-full bg-obsidian-950 rounded-[10px] flex items-center justify-center">
                <span className="font-display font-extrabold text-xl text-transparent bg-clip-text bg-gradient-to-tr from-amber-400 to-amber-200">
                  E
                </span>
              </div>
            </div>
            <div className="flex flex-col">
              <span className="font-display font-bold text-xl text-white tracking-tight flex items-center gap-1.5">
                ElevateWeb<span className="text-amber-400">.me</span>
              </span>
              <span className="text-[10px] uppercase font-mono tracking-widest text-slate-400 font-medium">
                Digital Asset Store
              </span>
            </div>
          </Link>

          {/* Desktop Nav Links */}
          <div className="hidden md:flex items-center gap-8 text-sm font-medium text-slate-300">
            <Link 
              to="/" 
              className={`hover:text-amber-400 transition-colors ${isHome ? 'text-amber-400 font-semibold' : ''}`}
            >
              Explore Products
            </Link>
            <a 
              href="/#categories" 
              className="hover:text-amber-400 transition-colors"
            >
              Categories
            </a>
            <a 
              href="/#features" 
              className="hover:text-amber-400 transition-colors"
            >
              Why ElevateWeb
            </a>
            <a 
              href="/#guarantee" 
              className="hover:text-amber-400 transition-colors"
            >
              Guarantee
            </a>
          </div>

          {/* Right Actions: Search + Cart */}
          <div className="flex items-center gap-3">
            {onSearchClick && (
              <button
                onClick={onSearchClick}
                aria-label="Search digital products"
                className="p-2.5 rounded-xl border border-white/[0.08] bg-obsidian-900/50 hover:bg-obsidian-850 hover:border-amber-500/30 text-slate-300 hover:text-white transition-all focus:outline-none focus:ring-2 focus:ring-amber-500/50"
              >
                <Search className="w-4 h-4" />
              </button>
            )}

            {/* Cart trigger button */}
            <motion.button
              whileTap={{ scale: 0.95 }}
              onClick={openCart}
              aria-label={`Shopping Cart with ${itemCount} items`}
              className="relative flex items-center gap-2.5 px-4 py-2.5 rounded-xl border border-amber-500/30 bg-gradient-to-b from-amber-500/10 to-amber-500/5 hover:from-amber-500/20 hover:to-amber-500/10 text-white font-medium text-sm transition-all shadow-sm hover:shadow-glow-amber focus:outline-none focus:ring-2 focus:ring-amber-500/50"
            >
              <ShoppingBag className="w-4 h-4 text-amber-400" />
              <span className="hidden sm:inline">Cart</span>
              
              <AnimatePresence mode="wait">
                {itemCount > 0 ? (
                  <motion.span
                    key="count"
                    initial={{ scale: 0 }}
                    animate={{ scale: 1 }}
                    exit={{ scale: 0 }}
                    className="flex items-center justify-center min-w-5 h-5 px-1.5 text-xs font-bold text-obsidian-950 bg-amber-400 rounded-full shadow-md"
                  >
                    {itemCount}
                  </motion.span>
                ) : (
                  <span className="text-xs text-slate-400 font-mono">0</span>
                )}
              </AnimatePresence>
            </motion.button>

            {/* Mobile menu toggle */}
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              aria-label="Toggle menu"
              className="md:hidden p-2.5 rounded-xl border border-white/[0.08] bg-obsidian-900/50 text-slate-300 hover:text-white"
            >
              {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
            </button>
          </div>
        </div>

        {/* Mobile dropdown */}
        <AnimatePresence>
          {mobileMenuOpen && (
            <motion.div
              initial={{ height: 0, opacity: 0 }}
              animate={{ height: 'auto', opacity: 1 }}
              exit={{ height: 0, opacity: 0 }}
              className="md:hidden border-t border-white/[0.08] bg-obsidian-900/95 backdrop-blur-2xl px-6 py-5 flex flex-col gap-4 overflow-hidden"
            >
              <Link 
                to="/" 
                onClick={() => setMobileMenuOpen(false)}
                className="text-base font-medium text-slate-200 hover:text-amber-400"
              >
                Explore Products
              </Link>
              <a 
                href="/#categories" 
                onClick={() => setMobileMenuOpen(false)}
                className="text-base font-medium text-slate-200 hover:text-amber-400"
              >
                Categories
              </a>
              <a 
                href="/#features" 
                onClick={() => setMobileMenuOpen(false)}
                className="text-base font-medium text-slate-200 hover:text-amber-400"
              >
                Why ElevateWeb
              </a>
              <a 
                href="/#guarantee" 
                onClick={() => setMobileMenuOpen(false)}
                className="text-base font-medium text-slate-200 hover:text-amber-400"
              >
                Guarantee & Support
              </a>
            </motion.div>
          )}
        </AnimatePresence>
      </nav>
    </header>
  );
};
