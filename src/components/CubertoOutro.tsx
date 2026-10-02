import React from 'react';
import { ArrowUpRight, ArrowDown } from 'lucide-react';
import { useCart } from '../hooks/useCart';
import { PRODUCTS } from '../lib/products';

export const CubertoOutro: React.FC = () => {
  const { addToCart, openCart } = useCart();
  const playbook = PRODUCTS.find((p) => p.id === 'prod-action-masterplan') || PRODUCTS[0];

  const handleInstantBuy = () => {
    if (playbook) {
      addToCart(playbook, 'standard');
      openCart();
    }
  };

  return (
    <section className="bg-black text-white py-28 md:py-40 px-6 md:px-12 text-center border-t border-white/10 relative overflow-hidden">
      <div className="max-w-4xl mx-auto relative z-10">
        <span className="text-xs uppercase tracking-[0.25em] font-mono text-[#2997ff] block mb-6">
          ♦ ❖ ♦ ZERO READING FRICTION • PURE EXECUTION ♦ ❖ ♦
        </span>

        <h2 className="cuberto-heading text-4xl sm:text-6xl md:text-7xl lg:text-8xl tracking-tight mb-8">
          Moti kitabein padhna chhodo. Action shuru karo.
        </h2>

        <p className="text-lg sm:text-2xl text-white/70 max-w-2xl mx-auto font-normal leading-relaxed mb-12">
          Convert directionless ambition into an artificial boss. Stop watching tutorial videos, start executing binary checkboxes.
        </p>

        <div className="flex flex-col sm:flex-row items-center justify-center gap-5">
          <button
            type="button"
            onClick={handleInstantBuy}
            className="cuberto-btn bg-white text-black hover:bg-white/90 border-transparent text-base sm:text-lg px-8 py-5 shadow-2xl transition-transform hover:scale-[1.02]"
            data-cursor-text="BUY"
          >
            <span>Get The Action Masterplan — ₹299</span>
            <ArrowUpRight className="w-5 h-5 ml-1.5" />
          </button>

          <a
            href="#products"
            className="cuberto-btn bg-transparent text-white border-white/20 hover:border-white text-base sm:text-lg px-8 py-5"
          >
            <span>Explore All Work</span>
            <ArrowDown className="w-4 h-4 ml-1.5" />
          </a>
        </div>
      </div>
    </section>
  );
};
