import React, { useState, useEffect, useRef } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import { 
  Star, 
  ShoppingBag, 
  ShieldCheck, 
  ArrowLeft, 
  ChevronRight, 
  FileCheck,
  CheckCircle,
  ArrowUpRight
} from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { PRODUCTS } from '../lib/products';
import { LicenseType } from '../types';
import { useCart } from '../hooks/useCart';
import { RichMediaGallery } from '../components/RichMediaGallery';
import { MagneticButton } from '../components/MagneticButton';
import { FloatingPlaybook3D } from '../components/FloatingPlaybook3D';

export const ProductDetailPage: React.FC = () => {
  const { slug } = useParams<{ slug: string }>();
  const navigate = useNavigate();
  const { addToCart, openCart } = useCart();

  const product = PRODUCTS.find((p) => p.slug === slug);

  const [selectedLicense] = useState<LicenseType>('standard');
  const [activeTab, setActiveTab] = useState<'features' | 'tech' | 'reviews'>('features');
  const [addedAnimation, setAddedAnimation] = useState(false);
  const [showStickyDock, setShowStickyDock] = useState(false);

  const buyBoxRef = useRef<HTMLDivElement>(null);

  // Scroll to top when slug changes
  useEffect(() => {
    window.scrollTo(0, 0);
  }, [slug]);

  // Show floating dock when scrolled past buy box
  useEffect(() => {
    const handleScroll = () => {
      if (buyBoxRef.current) {
        const rect = buyBoxRef.current.getBoundingClientRect();
        setShowStickyDock(rect.bottom < 60);
      }
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  if (!product) {
    return (
      <div className="min-h-[70vh] flex flex-col items-center justify-center text-center px-4 bg-white text-black pt-32">
        <h2 className="cuberto-heading text-3xl font-bold text-black mb-3">Digital Product Not Found</h2>
        <p className="text-black/60 text-base mb-6">
          The requested asset could not be located in the Elevateweb catalog.
        </p>
        <Link
          to="/"
          className="cuberto-btn bg-black text-white hover:bg-black/90 text-sm px-6 py-3"
        >
          Return to Storefront
        </Link>
      </div>
    );
  }

  const currentPrice = product.price[selectedLicense];
  const originalPrice = product.originalPrice[selectedLicense];
  const discountPercent = Math.round(((originalPrice - currentPrice) / originalPrice) * 100);

  const handleAddToCart = () => {
    addToCart(product, selectedLicense);
    setAddedAnimation(true);
    setTimeout(() => setAddedAnimation(false), 1500);
    openCart();
  };

  const handleBuyNow = () => {
    addToCart(product, selectedLicense);
    navigate('/checkout');
  };

  return (
    <div className="min-h-screen pt-28 pb-24 bg-white text-black">
      <div className="max-w-[1360px] mx-auto px-6 md:px-12">
        
        {/* Breadcrumb Navigation */}
        <nav className="flex items-center gap-2 text-xs text-black/50 mb-8 font-medium">
          <Link to="/" className="hover:text-black transition-colors flex items-center gap-1 font-mono uppercase tracking-wider">
            <ArrowLeft className="w-3.5 h-3.5" />
            <span>Catalog</span>
          </Link>
          <ChevronRight className="w-3.5 h-3.5 text-black/30" />
          <span className="text-black/60 uppercase tracking-wider font-mono">{product.category}</span>
          <ChevronRight className="w-3.5 h-3.5 text-black/30" />
          <span className="text-black font-bold truncate max-w-xs">{product.title}</span>
        </nav>

        {/* Main Grid: Gallery on Left, Details & Checkout on Right */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-14">
          
          {/* Left Column: Media Gallery & 3D Floating Model */}
          <div className="lg:col-span-7 space-y-8">
            {product.slug === 'the-action-masterplan' ? (
              <div className="space-y-6">
                <div className="bg-black rounded-3xl p-6 sm:p-10 flex flex-col items-center justify-center relative overflow-hidden shadow-2xl border border-black/10">
                  <div className="absolute top-5 left-5 z-10 px-3.5 py-1.5 rounded-full bg-white/10 backdrop-blur-md border border-white/20 text-[10px] font-mono font-bold tracking-widest text-white uppercase flex items-center gap-1.5">
                    <span>♦ ❖ ♦</span>
                    <span>Interactive 3D Vintage Book</span>
                  </div>
                  <FloatingPlaybook3D />
                </div>
                <RichMediaGallery
                  images={product.galleryImages}
                  title={product.title}
                  demoUrl={product.demoUrl}
                />
              </div>
            ) : (
              <RichMediaGallery
                images={product.galleryImages}
                title={product.title}
                demoUrl={product.demoUrl}
              />
            )}

            {/* Deep Tabs with Framer Motion Sliding Indicator */}
            <div className="border-t border-black/10 pt-8">
              <div className="flex border-b border-black/10 gap-8 mb-6 relative">
                {(['features', 'tech', 'reviews'] as const).map((tab) => (
                  <button
                    key={tab}
                    onClick={() => setActiveTab(tab)}
                    className={`pb-3 font-display font-bold text-base uppercase tracking-wider transition-colors relative ${
                      activeTab === tab
                        ? 'text-black'
                        : 'text-black/40 hover:text-black'
                    }`}
                  >
                    {tab === 'features' ? 'Features & Syllabus' : tab === 'tech' ? 'Deliverables' : 'Operator Reviews'}
                    {activeTab === tab && (
                      <motion.span
                        layoutId="activeTabIndicator"
                        className="absolute bottom-0 left-0 w-full h-[2.5px] bg-black"
                        transition={{ type: 'spring', damping: 25, stiffness: 300 }}
                      />
                    )}
                  </button>
                ))}
              </div>

              <AnimatePresence mode="wait">
                {activeTab === 'features' && (
                  <motion.div
                    key="features"
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -10 }}
                    transition={{ duration: 0.25 }}
                    className="space-y-4"
                  >
                    <h4 className="font-display font-bold text-xl mb-4">Included Specifications</h4>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5">
                      {product.features.map((feat, i) => (
                        <div key={i} className="flex items-start gap-2.5 text-sm text-black/80">
                          <CheckCircle className="w-4 h-4 text-[#0066cc] mt-0.5 shrink-0" />
                          <span>{feat}</span>
                        </div>
                      ))}
                    </div>
                  </motion.div>
                )}

                {activeTab === 'tech' && (
                  <motion.div
                    key="tech"
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -10 }}
                    transition={{ duration: 0.25 }}
                    className="space-y-3"
                  >
                    <h4 className="font-display font-bold text-xl mb-4">File Deliverables</h4>
                    {product.deliverables.map((del, i) => (
                      <div key={i} className="p-4 rounded-2xl bg-black/[0.03] border border-black/10 flex items-center justify-between">
                        <div className="flex items-center gap-3">
                          <FileCheck className="w-5 h-5 text-black/60" />
                          <div>
                            <p className="text-sm font-bold text-black">{del.name}</p>
                            <p className="text-xs text-black/50 font-mono">{del.format}</p>
                          </div>
                        </div>
                        <span className="text-xs font-mono text-black/60 font-semibold">{del.size}</span>
                      </div>
                    ))}
                  </motion.div>
                )}

                {activeTab === 'reviews' && (
                  <motion.div
                    key="reviews"
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -10 }}
                    transition={{ duration: 0.25 }}
                    className="space-y-4"
                  >
                    <div className="flex items-center gap-3 mb-4">
                      <div className="flex items-center text-amber-500">
                        {[...Array(5)].map((_, i) => (
                          <Star key={i} className="w-4 h-4 fill-amber-500 text-amber-500" />
                        ))}
                      </div>
                      <span className="font-display font-bold text-black">{product.rating} / 5.0</span>
                      <span className="text-xs text-black/50 font-mono">({product.reviewCount} verified operator reviews)</span>
                    </div>

                    <div className="space-y-4">
                      {product.reviews.map((rev) => (
                        <div key={rev.id} className="p-5 rounded-2xl bg-black/[0.03] border border-black/10">
                          <div className="flex items-center justify-between mb-2">
                            <span className="font-bold text-sm text-black">{rev.author}</span>
                            <span className="text-xs text-black/40 font-mono">{rev.date}</span>
                          </div>
                          <p className="text-xs text-black/50 mb-2">{rev.role}</p>
                          <p className="text-sm text-black/80 leading-relaxed font-normal">"{rev.content}"</p>
                        </div>
                      ))}
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          </div>

          {/* Right Column: Pricing & Purchase Card */}
          <div className="lg:col-span-5">
            <div
              ref={buyBoxRef}
              className="sticky top-28 p-8 rounded-3xl bg-black/[0.02] border border-black/10 shadow-sm space-y-6"
            >
              <div>
                <span className="px-3.5 py-1.5 rounded-full border border-black/15 text-[11px] font-mono uppercase tracking-widest text-black/60 mb-3 inline-block">
                  {product.category}
                </span>
                <h1 className="font-display font-extrabold text-3xl sm:text-4xl tracking-tight text-black mb-2">
                  {product.title}
                </h1>
                <p className="text-base text-black/70 leading-relaxed">
                  {product.tagline}
                </p>
              </div>

              {/* Price Block */}
              <div className="p-5 rounded-2xl bg-white border border-black/10 flex items-center justify-between shadow-sm">
                <div>
                  <div className="flex items-baseline gap-2">
                    <span className="font-display text-4xl font-extrabold tracking-tight text-black">
                      ₹{currentPrice.toLocaleString()}
                    </span>
                    <span className="text-sm text-black/40 line-through font-mono">
                      ₹{originalPrice.toLocaleString()}
                    </span>
                  </div>
                  <span className="text-xs text-black/50 font-mono block mt-0.5">
                    One-time payment • Lifetime updates
                  </span>
                </div>
                <span className="px-3 py-1 rounded-full bg-black text-white text-xs font-mono font-bold">
                  {discountPercent}% OFF
                </span>
              </div>


              {/* Action Buttons */}
              <div className="space-y-3 pt-2">
                {product.paymentUrl ? (
                  <MagneticButton strength={0.3} className="w-full">
                    <a
                      href={product.paymentUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="w-full cuberto-btn bg-black text-white hover:bg-black/90 py-4 text-sm font-bold flex items-center justify-center gap-2 shadow-lg"
                      data-cursor-text="BUY"
                    >
                      <span>Direct Razorpay Purchase — ₹{currentPrice.toLocaleString()}</span>
                      <ArrowUpRight className="w-4 h-4" />
                    </a>
                  </MagneticButton>
                ) : (
                  <>
                    <MagneticButton strength={0.25} className="w-full">
                      <button
                        type="button"
                        onClick={handleAddToCart}
                        className="w-full cuberto-btn bg-black text-white hover:bg-black/90 py-4 text-sm font-bold flex items-center justify-center gap-2 shadow-lg"
                        data-cursor-text="ADD"
                      >
                        <ShoppingBag className="w-4 h-4" />
                        <span>{addedAnimation ? 'Added to Cart ✓' : 'Add to Cart'}</span>
                      </button>
                    </MagneticButton>

                    <MagneticButton strength={0.2} className="w-full">
                      <button
                        type="button"
                        onClick={handleBuyNow}
                        className="w-full cuberto-btn bg-transparent text-black border-black/20 hover:border-black py-4 text-sm font-bold flex items-center justify-center gap-2"
                        data-cursor-text="BUY"
                      >
                        <span>Instant Razorpay Checkout</span>
                        <ArrowUpRight className="w-4 h-4" />
                      </button>
                    </MagneticButton>
                  </>
                )}
              </div>

              <div className="flex items-center justify-center gap-2 text-xs text-black/50 pt-2 border-t border-black/10">
                <ShieldCheck className="w-4 h-4 text-black/70" />
                <span>Instant Download • 30-Day Money-Back Guarantee</span>
              </div>
            </div>
          </div>

        </div>
      </div>

      {/* Floating Sticky Purchase Dock (Slides in when user scrolls past buy box) */}
      <AnimatePresence>
        {showStickyDock && (
          <motion.div
            initial={{ y: 100, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            exit={{ y: 100, opacity: 0 }}
            transition={{ type: 'spring', damping: 25, stiffness: 300 }}
            className="fixed bottom-6 left-1/2 -translate-x-1/2 z-40 w-[calc(100%-3rem)] max-w-xl"
          >
            <div className="p-3.5 px-5 rounded-full bg-black/90 text-white backdrop-blur-xl border border-white/20 shadow-2xl flex items-center justify-between gap-4">
              <div className="flex items-center gap-3 min-w-0">
                <img
                  src={product.bannerImage}
                  alt={product.title}
                  className="w-9 h-9 rounded-full object-cover shrink-0 border border-white/20"
                />
                <div className="min-w-0">
                  <h4 className="text-xs font-bold truncate text-white">{product.title}</h4>
                  <p className="text-xs font-mono text-[#2997ff]">₹{currentPrice.toLocaleString()}</p>
                </div>
              </div>

              <div>
                {product.paymentUrl ? (
                  <a
                    href={product.paymentUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-1.5 px-5 py-2.5 rounded-full bg-white text-black font-display font-bold text-xs tracking-wider uppercase hover:bg-white/90 transition-transform active:scale-95 shadow-md shrink-0"
                    data-cursor-text="BUY"
                  >
                    <span>Buy Now</span>
                    <ArrowUpRight className="w-3.5 h-3.5" />
                  </a>
                ) : (
                  <button
                    type="button"
                    onClick={handleAddToCart}
                    className="inline-flex items-center gap-1.5 px-5 py-2.5 rounded-full bg-white text-black font-display font-bold text-xs tracking-wider uppercase hover:bg-white/90 transition-transform active:scale-95 shadow-md shrink-0"
                    data-cursor-text="ADD"
                  >
                    <ShoppingBag className="w-3.5 h-3.5" />
                    <span>Add to Cart</span>
                  </button>
                )}
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default ProductDetailPage;
