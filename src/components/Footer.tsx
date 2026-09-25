import React from 'react';
import { Link } from 'react-router-dom';
import { Shield, RefreshCw, Zap, ArrowRight, Heart } from 'lucide-react';

export const Footer: React.FC = () => {
  return (
    <footer className="border-t border-white/[0.08] bg-obsidian-950 text-slate-400 text-sm">
      {/* Trust & Guarantee Banner */}
      <div id="guarantee" className="border-b border-white/[0.06] bg-obsidian-900/40 py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 text-center md:text-left">
            
            <div className="flex flex-col md:flex-row items-center md:items-start gap-4 p-4 rounded-2xl bg-white/[0.02] border border-white/[0.04]">
              <div className="p-3 rounded-xl bg-amber-500/10 text-amber-400 border border-amber-500/20 shrink-0">
                <Zap className="w-6 h-6" />
              </div>
              <div>
                <h4 className="font-semibold text-white text-base mb-1">Instant Digital Delivery</h4>
                <p className="text-xs text-slate-400 leading-relaxed">
                  Download your source ZIP packages, Figma links, and private GitHub invites immediately upon payment.
                </p>
              </div>
            </div>

            <div className="flex flex-col md:flex-row items-center md:items-start gap-4 p-4 rounded-2xl bg-white/[0.02] border border-white/[0.04]">
              <div className="p-3 rounded-xl bg-emerald-500/10 text-emerald-400 border border-emerald-500/20 shrink-0">
                <Shield className="w-6 h-6" />
              </div>
              <div>
                <h4 className="font-semibold text-white text-base mb-1">Commercial Royalty-Free</h4>
                <p className="text-xs text-slate-400 leading-relaxed">
                  Use our templates to build unlimited client projects or commercial products without recurring royalty fees.
                </p>
              </div>
            </div>

            <div className="flex flex-col md:flex-row items-center md:items-start gap-4 p-4 rounded-2xl bg-white/[0.02] border border-white/[0.04]">
              <div className="p-3 rounded-xl bg-cyan-500/10 text-cyan-400 border border-cyan-500/20 shrink-0">
                <RefreshCw className="w-6 h-6" />
              </div>
              <div>
                <h4 className="font-semibold text-white text-base mb-1">Free Lifetime Updates</h4>
                <p className="text-xs text-slate-400 leading-relaxed">
                  Access every future framework update, package bump, and new component added to your asset bundle.
                </p>
              </div>
            </div>

          </div>
        </div>
      </div>

      {/* Main Footer Links */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="grid grid-cols-1 md:grid-cols-5 gap-10">
          
          {/* Brand Col */}
          <div className="md:col-span-2 space-y-4">
            <Link to="/" className="flex items-center gap-3">
              <div className="w-9 h-9 rounded-xl bg-amber-500 flex items-center justify-center font-display font-black text-obsidian-950 text-xl shadow-glow-amber">
                E
              </div>
              <span className="font-display font-bold text-xl text-white">
                ElevateWeb<span className="text-amber-400">.me</span>
              </span>
            </Link>
            <p className="text-xs text-slate-400 max-w-sm leading-relaxed">
              Curated premium digital products, high-velocity SaaS boilerplates, and fluid dark-mode UI systems designed to accelerate developers and modern tech startups.
            </p>
            <div className="pt-2 text-xs font-mono text-slate-500">
              © {new Date().getFullYear()} ElevateWeb.me. All rights reserved.
            </div>
          </div>

          {/* Catalog Col */}
          <div>
            <h5 className="font-semibold text-white text-xs uppercase tracking-wider mb-4">
              Products
            </h5>
            <ul className="space-y-2.5 text-xs">
              <li>
                <Link to="/" className="hover:text-amber-400 transition-colors">
                  SaaS Starter Kits
                </Link>
              </li>
              <li>
                <Link to="/" className="hover:text-amber-400 transition-colors">
                  Figma Design Systems
                </Link>
              </li>
              <li>
                <Link to="/" className="hover:text-amber-400 transition-colors">
                  3D Holographic Assets
                </Link>
              </li>
              <li>
                <Link to="/" className="hover:text-amber-400 transition-colors">
                  AI Analytics Dashboards
                </Link>
              </li>
              <li>
                <Link to="/" className="hover:text-amber-400 transition-colors">
                  Developer Portfolios
                </Link>
              </li>
            </ul>
          </div>

          {/* Resources Col */}
          <div>
            <h5 className="font-semibold text-white text-xs uppercase tracking-wider mb-4">
              Support & Legal
            </h5>
            <ul className="space-y-2.5 text-xs">
              <li>
                <a href="#guarantee" className="hover:text-amber-400 transition-colors">
                  License Agreements
                </a>
              </li>
              <li>
                <a href="mailto:support@elevateweb.me" className="hover:text-amber-400 transition-colors">
                  Developer Support
                </a>
              </li>
              <li>
                <a href="#guarantee" className="hover:text-amber-400 transition-colors">
                  Refund Policy (30 Days)
                </a>
              </li>
              <li>
                <a href="#guarantee" className="hover:text-amber-400 transition-colors">
                  Terms of Service
                </a>
              </li>
              <li>
                <a href="#guarantee" className="hover:text-amber-400 transition-colors">
                  Privacy Policy
                </a>
              </li>
            </ul>
          </div>

          {/* Newsletter Col */}
          <div>
            <h5 className="font-semibold text-white text-xs uppercase tracking-wider mb-4">
              Stay in the Loop
            </h5>
            <p className="text-xs text-slate-400 mb-3">
              Get notified of new digital asset drops and weekend flash discounts.
            </p>
            <form onSubmit={(e) => { e.preventDefault(); alert('Subscribed to ElevateWeb updates!'); }} className="space-y-2">
              <input
                type="email"
                required
                placeholder="you@domain.com"
                className="w-full px-3 py-2 text-xs rounded-xl bg-obsidian-900 border border-white/10 text-white placeholder-slate-500 focus:outline-none focus:border-amber-500"
              />
              <button
                type="submit"
                className="w-full py-2 rounded-xl bg-white/[0.08] hover:bg-amber-500 hover:text-obsidian-950 text-white font-semibold text-xs transition-all flex items-center justify-center gap-1.5"
              >
                <span>Subscribe</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </button>
            </form>
          </div>

        </div>

        {/* Bottom Credits */}
        <div className="mt-12 pt-8 border-t border-white/[0.04] flex flex-col sm:flex-row items-center justify-between text-xs text-slate-400 gap-4">
          <div className="flex items-center gap-1">
            <span>Engineered with</span>
            <Heart className="w-3.5 h-3.5 text-amber-500 fill-amber-500" />
            <span>for high-performance builders.</span>
          </div>
          <div className="flex items-center gap-6">
            <span>Razorpay Secured</span>
            <span>GSAP Smooth Motion</span>
            <span>TypeScript Ready</span>
          </div>
        </div>
      </div>
    </footer>
  );
};
