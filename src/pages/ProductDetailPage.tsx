import React, { useState, useEffect } from 'react';
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
import { PRODUCTS } from '../lib/products';
import { LicenseType } from '../types';
import { useCart } from '../hooks/useCart';
import { RichMediaGallery } from '../components/RichMediaGallery';

export const ProductDetailPage: React.FC = () => {
  const { slug } = useParams<{ slug: string }>();
  const navigate = useNavigate();
  const { addToCart, openCart } = useCart();

  const product = PRODUCTS.find((p) => p.slug === slug);

  const [selectedLicense, setSelectedLicense] = useState<LicenseType>('standard');
  const [activeTab, setActiveTab] = useState<'features' | 'tech' | 'reviews'>('features');
  const [addedAnimation, setAddedAnimation] = useState(false);

  // Scroll to top when slug changes
  useEffect(() => {
    window.scrollTo(0, 0);
  }, [slug]);

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
    <div className="min-h-screen pt-28 pb-20 bg-white text-black">
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
          
          {/* Left Column: Media Gallery */}
          <div className="lg:col-span-7 space-y-8">
            <div className="rounded-3xl overflow-hidden border border-black/10 bg-black/5">
              <RichMediaGallery
                images={product.galleryImages}
                title={product.title}
                demoUrl={product.demoUrl}
              />
            </div>

            {/* Deep Tabs */}
            <div className="border-t border-black/10 pt-8">
              <div className="flex border-b border-black/10 gap-8 mb-6">
                {(['features', 'tech', 'reviews'] as const).map((tab) => (
                  <button
                    key={tab}
                    onClick={() => setActiveTab(tab)}
                    className={`pb-3 font-display font-bold text-base uppercase tracking-wider transition-all relative ${
                      activeTab === tab
                        ? 'text-black'
                        : 'text-black/40 hover:text-black'
                    }`}
                  >
                    {tab === 'features' ? 'Features & Syllabus' : tab === 'tech' ? 'Deliverables' : 'Operator Reviews'}
                    {activeTab === tab && (
                      <span className="absolute bottom-0 left-0 w-full h-[2px] bg-black" />
                    )}
                  </button>
                ))}
              </div>

              {activeTab === 'features' && (
                <div className="space-y-4">
                  <h4 className="font-display font-bold text-xl mb-4">Included Specifications</h4>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5">
                    {product.features.map((feat, i) => (
                      <div key={i} className="flex items-start gap-2.5 text-sm text-black/80">
                        <CheckCircle className="w-4 h-4 text-[#0066cc] mt-0.5 shrink-0" />
                        <span>{feat}</span>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {activeTab === 'tech' && (
                <div className="space-y-3">
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
                </div>
              )}

              {activeTab === 'reviews' && (
                <div className="space-y-4">
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
                </div>
              )}
            </div>
          </div>

          {/* Right Column: Pricing & Purchase Card */}
          <div className="lg:col-span-5">
            <div className="sticky top-28 p-8 rounded-3xl bg-black/[0.02] border border-black/10 shadow-sm space-y-6">
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
              <div className="p-5 rounded-2xl bg-white border border-black/10 flex items-center justify-between">
                <div>
                  <div className="flex items-baseline gap-2">
                    <span className="font-display text-4xl font-extrabold tracking-tight text-black">
                      ₹{currentPrice}
                    </span>
                    <span className="text-sm text-black/40 line-through font-mono">
                      ₹{originalPrice}
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

              {/* License Tier Selector */}
              <div className="space-y-2">
                <label className="text-xs font-mono uppercase tracking-wider text-black/60 block">
                  Select License Tier:
                </label>
                <div className="grid grid-cols-2 gap-3">
                  <button
                    type="button"
                    onClick={() => setSelectedLicense('standard')}
                    className={`p-3.5 rounded-2xl border text-left transition-all ${
                      selectedLicense === 'standard'
                        ? 'border-black bg-black text-white'
                        : 'border-black/15 bg-white text-black hover:border-black/40'
                    }`}
                  >
                    <span className="text-xs font-bold font-display block">Individual</span>
                    <span className="text-sm font-bold font-mono">₹{product.price.standard}</span>
                  </button>
                  <button
                    type="button"
                    onClick={() => setSelectedLicense('team')}
                    className={`p-3.5 rounded-2xl border text-left transition-all ${
                      selectedLicense === 'team'
                        ? 'border-black bg-black text-white'
                        : 'border-black/15 bg-white text-black hover:border-black/40'
                    }`}
                  >
                    <span className="text-xs font-bold font-display block">Team / Agency</span>
                    <span className="text-sm font-bold font-mono">₹{product.price.team}</span>
                  </button>
                </div>
              </div>

              {/* Action Buttons */}
              <div className="space-y-3 pt-2">
                <button
                  type="button"
                  onClick={handleAddToCart}
                  className="w-full cuberto-btn bg-black text-white hover:bg-black/90 py-4 text-sm font-bold flex items-center justify-center gap-2"
                  data-cursor-text="ADD"
                >
                  <ShoppingBag className="w-4 h-4" />
                  <span>{addedAnimation ? 'Added to Cart ✓' : 'Add to Cart'}</span>
                </button>

                <button
                  type="button"
                  onClick={handleBuyNow}
                  className="w-full cuberto-btn bg-transparent text-black border-black/20 hover:border-black py-4 text-sm font-bold flex items-center justify-center gap-2"
                  data-cursor-text="BUY"
                >
                  <span>Instant Razorpay Checkout</span>
                  <ArrowUpRight className="w-4 h-4" />
                </button>
              </div>

              <div className="flex items-center justify-center gap-2 text-xs text-black/50 pt-2 border-t border-black/10">
                <ShieldCheck className="w-4 h-4 text-black/70" />
                <span>Instant Download • 30-Day Money-Back Guarantee</span>
              </div>
            </div>
          </div>

        </div>
      </div>
    </div>
  );
};

export default ProductDetailPage;
