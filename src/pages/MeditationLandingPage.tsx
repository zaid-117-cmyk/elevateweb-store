import React, { useEffect } from 'react';
import { ArrowRight, Sparkles, Brain, Clock, ShieldCheck } from 'lucide-react';
import { PRODUCTS } from '../lib/products';

export const MeditationLandingPage: React.FC = () => {
  const product = PRODUCTS.find(p => p.slug === 'the-15-minute-meditation');

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  if (!product) return null;

  return (
    <div className="min-h-screen bg-black text-white selection:bg-white selection:text-black pt-32 pb-24">
      <div className="max-w-5xl mx-auto px-6">
        
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
          {/* Left Column: Image */}
          <div className="relative group">
            <div className="absolute -inset-4 bg-gradient-to-r from-purple-600 to-teal-500 rounded-3xl opacity-20 group-hover:opacity-40 blur-2xl transition duration-700" />
            <img 
              src={product.bannerImage} 
              alt={product.title}
              className="relative w-full rounded-2xl shadow-2xl border border-white/10"
            />
          </div>

          {/* Right Column: Copy & Checkout */}
          <div>
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/10 border border-white/20 text-xs font-mono tracking-wider mb-6">
              <Sparkles className="w-3 h-3 text-teal-400" />
              <span>NEW RELEASE</span>
            </div>

            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-display font-bold tracking-tight mb-6 leading-[1.1]">
              Transform Your Chaotic Mind in <span className="text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-teal-400">15 Minutes.</span>
            </h1>

            <p className="text-white/60 text-lg mb-8 leading-relaxed">
              {product.description.split('\n')[0]}
            </p>

            <div className="space-y-4 mb-10">
              {product.features.map((feature, idx) => (
                <div key={idx} className="flex items-start gap-3">
                  <div className="w-6 h-6 rounded-full bg-teal-500/20 flex items-center justify-center shrink-0 mt-0.5">
                    <span className="text-teal-400 text-xs font-bold">✓</span>
                  </div>
                  <span className="text-white/80">{feature}</span>
                </div>
              ))}
            </div>

            <div className="p-6 rounded-2xl bg-white/5 border border-white/10 mb-8 backdrop-blur-sm">
              <div className="flex items-end justify-between mb-6">
                <div>
                  <p className="text-white/40 text-sm font-mono line-through mb-1">₹{product.originalPrice.standard}</p>
                  <p className="text-4xl font-display font-bold">₹{product.price.standard}</p>
                </div>
                <div className="text-right">
                  <p className="text-teal-400 text-sm font-bold">Lifetime Access</p>
                  <p className="text-white/40 text-xs">Instant PDF Download</p>
                </div>
              </div>

              <a 
                href={product.paymentUrl}
                className="w-full flex items-center justify-center gap-2 py-4 rounded-xl bg-white text-black font-bold text-lg hover:bg-gray-200 transition-colors group shadow-[0_0_40px_rgba(255,255,255,0.1)]"
              >
                <span>Unlock Now via UPI</span>
                <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
              </a>
            </div>

            <div className="flex flex-wrap items-center gap-6 text-sm text-white/40 font-mono">
              <div className="flex items-center gap-2">
                <ShieldCheck className="w-4 h-4" />
                <span>Secure Checkout</span>
              </div>
              <div className="flex items-center gap-2">
                <Clock className="w-4 h-4" />
                <span>15 Min / Day</span>
              </div>
              <div className="flex items-center gap-2">
                <Brain className="w-4 h-4" />
                <span>Science Backed</span>
              </div>
            </div>
          </div>
        </div>
        
      </div>
    </div>
  );
};

export default MeditationLandingPage;
