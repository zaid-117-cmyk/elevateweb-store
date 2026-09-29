import React, { useEffect, useRef } from 'react';
import { Link } from 'react-router-dom';
import { ArrowUpRight, ShoppingBag } from 'lucide-react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { useCart } from '../hooks/useCart';
import { PRODUCTS } from '../lib/products';
import { Product } from '../types';
import { MagneticButton } from './MagneticButton';
import { FloatingPlaybook3D } from './FloatingPlaybook3D';

gsap.registerPlugin(ScrollTrigger);

export const CubertoProducts: React.FC = () => {
  const { addToCart, openCart } = useCart();
  const sectionRef = useRef<HTMLElement>(null);
  const col2Ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const section = sectionRef.current;
    const col2 = col2Ref.current;
    if (!section || !col2) return;

    // Check for desktop screen width
    if (window.innerWidth >= 768) {
      const ctx = gsap.context(() => {
        // Asymmetric Masonry Parallax Scrub on Column 2
        gsap.to(col2, {
          yPercent: -8,
          ease: 'none',
          scrollTrigger: {
            trigger: section,
            start: 'top bottom',
            end: 'bottom top',
            scrub: 1.2,
          },
        });
      }, section);

      return () => ctx.revert();
    }
  }, []);

  const handleQuickAdd = (e: React.MouseEvent, prod: Product) => {
    e.preventDefault();
    e.stopPropagation();
    addToCart(prod, 'standard');
    openCart();
  };

  return (
    <section
      ref={sectionRef}
      id="products"
      className="bg-black text-white py-24 md:py-36 px-6 md:px-12 transition-colors duration-500 overflow-hidden"
    >
      <div className="max-w-[1360px] mx-auto">
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-16 md:mb-24 pb-8 border-b border-white/10 gap-6">
          <div>
            <span className="text-xs font-mono uppercase tracking-widest text-[#2997ff] block mb-3">
              Catalog & Deliverables
            </span>
            <h2 className="cuberto-heading text-4xl sm:text-6xl md:text-7xl">
              Selected digital products
            </h2>
          </div>
          <p className="text-white/60 text-lg max-w-md font-normal leading-relaxed">
            Every product is battle-tested, modular, and built to accelerate modern operators and engineers.
          </p>
        </div>

        {/* Asymmetric 2-Column Grid with Parallax */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-10 md:gap-14">
          {/* Column 1 */}
          <div className="flex flex-col gap-12 md:gap-20">
            {PRODUCTS.filter((_, idx) => idx % 2 === 0).map((prod) => (
              <div key={prod.id} className="cuberto-card group" data-cursor-text="VIEW">
                <Link
                  to={prod.paymentUrl ? '#' : `/product/${prod.slug}`}
                  onClick={(e) => {
                    if (prod.paymentUrl) {
                      e.preventDefault();
                      window.open(prod.paymentUrl, '_blank');
                    }
                  }}
                >
                  <div className="cuberto-preview aspect-[500/620] bg-neutral-900 mb-6">
                    <div className="absolute inset-0 flex items-center justify-center pointer-events-none scale-[0.65] sm:scale-75 translate-y-8">
                      <FloatingPlaybook3D productId={prod.id} />
                    </div>
                    {prod.featured && (
                      <span className="absolute top-6 left-6 px-3.5 py-1.5 rounded-full bg-black/80 backdrop-blur-md border border-white/20 text-xs font-mono font-bold tracking-wider text-white uppercase">
                        ★ FEATURED
                      </span>
                    )}
                    <span className="absolute bottom-6 right-6 px-4 py-2 rounded-full bg-white text-black font-display font-bold text-sm tracking-tight shadow-lg font-mono">
                      ₹{prod.price.standard.toLocaleString()}
                    </span>
                  </div>

                  <div className="flex items-center gap-3 mb-2.5">
                    <span className="px-3 py-1 rounded-full text-[11px] font-mono tracking-wider uppercase border border-white/20 text-white/60">
                      {prod.category}
                    </span>
                  </div>

                  <h3 className="font-display text-2xl sm:text-3xl font-bold tracking-tight text-white mb-2 group-hover:text-[#2997ff] transition-colors flex items-center justify-between">
                    <span>{prod.title}</span>
                    <ArrowUpRight className="w-5 h-5 opacity-0 -translate-x-2 group-hover:opacity-100 group-hover:translate-x-0 transition-all text-[#2997ff]" />
                  </h3>
                  <p className="text-white/60 text-base leading-relaxed mb-4">
                    {prod.tagline}
                  </p>

                  <div className="flex items-center gap-3">
                    {prod.paymentUrl ? (
                      <MagneticButton strength={0.25}>
                        <a
                          href={prod.paymentUrl}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="inline-flex items-center gap-1.5 px-4 py-2 rounded-full bg-white text-black text-xs font-bold uppercase tracking-wider hover:bg-white/90 transition-colors shadow-sm"
                          data-cursor-text="BUY"
                        >
                          <span>Instant Razorpay Checkout</span>
                          <ArrowUpRight className="w-3.5 h-3.5" />
                        </a>
                      </MagneticButton>
                    ) : (
                      <MagneticButton strength={0.25}>
                        <button
                          type="button"
                          onClick={(e) => handleQuickAdd(e, prod)}
                          className="inline-flex items-center gap-1.5 px-4 py-2 rounded-full bg-white/10 hover:bg-white text-white hover:text-black border border-white/20 text-xs font-bold uppercase tracking-wider transition-all"
                          data-cursor-text="ADD"
                        >
                          <ShoppingBag className="w-3.5 h-3.5" />
                          <span>Quick Add to Cart</span>
                        </button>
                      </MagneticButton>
                    )}
                  </div>
                </Link>
              </div>
            ))}
          </div>

          {/* Column 2 with Parallax Scrub */}
          <div ref={col2Ref} className="flex flex-col gap-12 md:gap-20 md:pt-20 will-change-transform">
            {PRODUCTS.filter((_, idx) => idx % 2 === 1).map((prod) => (
              <div key={prod.id} className="cuberto-card group" data-cursor-text="VIEW">
                <Link
                  to={prod.paymentUrl ? '#' : `/product/${prod.slug}`}
                  onClick={(e) => {
                    if (prod.paymentUrl) {
                      e.preventDefault();
                      window.open(prod.paymentUrl, '_blank');
                    }
                  }}
                >
                  <div className="cuberto-preview aspect-[500/620] bg-neutral-900 mb-6">
                    <div className="absolute inset-0 flex items-center justify-center pointer-events-none scale-[0.65] sm:scale-75 translate-y-8">
                      <FloatingPlaybook3D productId={prod.id} />
                    </div>
                    <span className="absolute bottom-6 right-6 px-4 py-2 rounded-full bg-white text-black font-display font-bold text-sm tracking-tight shadow-lg font-mono">
                      ₹{prod.price.standard.toLocaleString()}
                    </span>
                  </div>

                  <div className="flex items-center gap-3 mb-2.5">
                    <span className="px-3 py-1 rounded-full text-[11px] font-mono tracking-wider uppercase border border-white/20 text-white/60">
                      {prod.category}
                    </span>
                  </div>

                  <h3 className="font-display text-2xl sm:text-3xl font-bold tracking-tight text-white mb-2 group-hover:text-[#2997ff] transition-colors flex items-center justify-between">
                    <span>{prod.title}</span>
                    <ArrowUpRight className="w-5 h-5 opacity-0 -translate-x-2 group-hover:opacity-100 group-hover:translate-x-0 transition-all text-[#2997ff]" />
                  </h3>
                  <p className="text-white/60 text-base leading-relaxed mb-4">
                    {prod.tagline}
                  </p>

                  <div className="flex items-center gap-3">
                    <MagneticButton strength={0.25}>
                      <button
                        type="button"
                        onClick={(e) => handleQuickAdd(e, prod)}
                        className="inline-flex items-center gap-1.5 px-4 py-2 rounded-full bg-white/10 hover:bg-white text-white hover:text-black border border-white/20 text-xs font-bold uppercase tracking-wider transition-all"
                        data-cursor-text="ADD"
                      >
                        <ShoppingBag className="w-3.5 h-3.5" />
                        <span>Quick Add to Cart</span>
                      </button>
                    </MagneticButton>
                  </div>
                </Link>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};
