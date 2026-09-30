import React from 'react';
import { Link } from 'react-router-dom';
import { Star, ShoppingBag, ArrowUpRight, Check, Sparkles } from 'lucide-react';
import { motion } from 'framer-motion';
import { Product } from '../types';
import { useCart } from '../hooks/useCart';

interface ProductCardProps {
  product: Product;
}

export const ProductCard: React.FC<ProductCardProps> = ({ product }) => {
  const { addToCart, cart, openCart } = useCart();
  const [justAdded, setJustAdded] = React.useState(false);

  const isInCart = cart.some((item) => item.product.id === product.id);

  const handleAddToCart = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    addToCart(product, 'standard');
    setJustAdded(true);
    setTimeout(() => setJustAdded(false), 1500);
    openCart();
  };

  const discountPercent = Math.round(
    ((product.originalPrice.standard - product.price.standard) / product.originalPrice.standard) * 100
  );

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-50px' }}
      transition={{ duration: 0.45, ease: 'easeOut' }}
      className="group relative flex flex-col rounded-2xl bg-obsidian-900/60 border border-white/[0.08] hover:border-amber-500/40 backdrop-blur-xl transition-all duration-300 hover:shadow-2xl hover:shadow-amber-500/10 overflow-hidden"
    >
      {/* Top Banner & Image Preview */}
      <Link 
        to={`/product/${product.slug}`} 
        className="relative block aspect-[16/10] overflow-hidden bg-obsidian-950 focus:outline-none"
      >
        <img
          src={product.bannerImage}
          alt={product.title}
          className="w-full h-full object-cover object-center transition-transform duration-700 ease-out group-hover:scale-105"
          loading="lazy"
        />
        
        {/* Dark subtle gradient overlay */}
        <div className="absolute inset-0 bg-gradient-to-t from-obsidian-950 via-obsidian-950/20 to-transparent opacity-80 group-hover:opacity-60 transition-opacity" />

        {/* Badges */}
        <div className="absolute top-3 left-3 flex flex-wrap gap-2 z-10">
          {product.featured && (
            <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-full text-xs font-semibold bg-amber-500/90 text-obsidian-950 shadow-md backdrop-blur-md">
              <Sparkles className="w-3 h-3" />
              Featured
            </span>
          )}
          {product.isNew && (
            <span className="inline-flex items-center px-2.5 py-1 rounded-full text-xs font-semibold bg-cyan-500/90 text-obsidian-950 shadow-md">
              New
            </span>
          )}
        </div>

        {/* Discount Badge */}
        {discountPercent > 0 && (
          <div className="absolute top-3 right-3 z-10">
            <span className="px-2 py-1 rounded-md text-xs font-bold bg-emerald-500/20 border border-emerald-500/40 text-emerald-400 backdrop-blur-md">
              -{discountPercent}%
            </span>
          </div>
        )}

        {/* Quick View Floating Hint */}
        <div className="absolute bottom-3 right-3 opacity-0 group-hover:opacity-100 transition-opacity duration-300 z-10">
          <div className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-obsidian-900/90 border border-white/20 text-xs font-medium text-white shadow-lg backdrop-blur-md">
            <span>Explore</span>
            <ArrowUpRight className="w-3.5 h-3.5 text-amber-400" />
          </div>
        </div>
      </Link>

      {/* Card Body */}
      <div className="flex flex-col flex-1 p-5 sm:p-6 justify-between">
        <div>
          {/* Category & Rating */}
          <div className="flex items-center justify-between gap-2 text-xs mb-2">
            <span className="text-amber-400 font-mono font-medium tracking-wide">
              {product.category}
            </span>
            <div className="flex items-center gap-1 text-slate-300 bg-obsidian-850 px-2 py-0.5 rounded-full border border-white/[0.06]">
              <Star className="w-3.5 h-3.5 text-amber-400 fill-amber-400" />
              <span className="font-semibold text-white">{product.rating}</span>
              <span className="text-slate-500">({product.reviewCount})</span>
            </div>
          </div>

          {/* Title */}
          <Link to={`/product/${product.slug}`} className="block focus:outline-none">
            <h3 className="font-display text-lg font-bold text-white group-hover:text-amber-300 transition-colors line-clamp-1 mb-1.5">
              {product.title}
            </h3>
          </Link>

          {/* Tagline */}
          <p className="text-sm text-slate-400 line-clamp-2 leading-relaxed mb-4">
            {product.tagline}
          </p>

          {/* Tech tags preview */}
          <div className="flex flex-wrap gap-1.5 mb-5">
            {product.tags.slice(0, 3).map((tag) => (
              <span
                key={tag}
                className="text-[11px] font-mono px-2 py-0.5 rounded bg-white/[0.04] border border-white/[0.06] text-slate-300"
              >
                {tag}
              </span>
            ))}
            {product.tags.length > 3 && (
              <span className="text-[11px] font-mono px-1.5 py-0.5 rounded bg-white/[0.02] text-slate-500">
                +{product.tags.length - 3}
              </span>
            )}
          </div>
        </div>

        {/* Card Footer: Pricing & Action */}
        <div className="pt-4 border-t border-white/[0.08] flex items-center justify-between gap-3">
          <div className="flex flex-col">
            <div className="flex items-baseline gap-2">
              <span className="text-2xl font-bold font-display text-white tracking-tight">
                ${product.price.standard}
              </span>
              {product.originalPrice.standard > product.price.standard && (
                <span className="text-xs text-slate-500 line-through">
                  ${product.originalPrice.standard}
                </span>
              )}
            </div>
            <span className="text-[10px] text-slate-400 uppercase tracking-wider">
              Standard License
            </span>
          </div>

          {/* Add to Cart button */}
          <motion.button
            whileTap={{ scale: 0.94 }}
            onClick={handleAddToCart}
            aria-label={`Add ${product.title} to cart`}
            className={`inline-flex items-center gap-1.5 px-3.5 py-2.5 rounded-xl font-medium text-xs sm:text-sm transition-all shadow-sm ${
              justAdded
                ? 'bg-emerald-500 text-obsidian-950 font-semibold'
                : isInCart
                ? 'bg-obsidian-800 text-amber-300 border border-amber-500/40 hover:bg-obsidian-700'
                : 'bg-amber-500 hover:bg-amber-400 text-obsidian-950 font-semibold hover:shadow-glow-amber'
            }`}
          >
            {justAdded ? (
              <>
                <Check className="w-4 h-4" />
                <span>Added!</span>
              </>
            ) : (
              <>
                <ShoppingBag className="w-4 h-4" />
                <span>{isInCart ? 'Add Another' : 'Add to Cart'}</span>
              </>
            )}
          </motion.button>
        </div>
      </div>
    </motion.div>
  );
};
