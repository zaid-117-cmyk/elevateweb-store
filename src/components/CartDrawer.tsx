import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { 
  X, 
  Trash2, 
  Plus, 
  Minus, 
  ShoppingBag, 
  ArrowRight, 
  Tag, 
  CheckCircle2, 
  AlertCircle,
  ShieldCheck 
} from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { useCart } from '../hooks/useCart';
import { LicenseType } from '../types';

export const CartDrawer: React.FC = () => {
  const {
    cart,
    isOpen,
    closeCart,
    removeFromCart,
    updateQuantity,
    updateLicense,
    subtotal,
    discountAmount,
    total,
    couponCode,
    couponError,
    applyCoupon,
    removeCoupon
  } = useCart();

  const [inputCode, setInputCode] = useState('');
  const navigate = useNavigate();

  // Close on Escape key
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape' && isOpen) {
        closeCart();
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isOpen, closeCart]);

  // Lock body scroll when cart is open
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
    return () => {
      document.body.style.overflow = '';
    };
  }, [isOpen]);

  const handleApplyCoupon = (e: React.FormEvent) => {
    e.preventDefault();
    if (inputCode.trim()) {
      applyCoupon(inputCode);
      setInputCode('');
    }
  };

  const handleCheckout = () => {
    closeCart();
    navigate('/checkout');
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <div className="fixed inset-0 z-50 overflow-hidden">
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
            onClick={closeCart}
            className="absolute inset-0 bg-black/60 backdrop-blur-md"
            aria-hidden="true"
          />

          {/* Drawer Container */}
          <div className="fixed inset-y-0 right-0 max-w-full flex pl-6 sm:pl-10">
            <motion.div
              initial={{ x: '100%' }}
              animate={{ x: 0 }}
              exit={{ x: '100%' }}
              transition={{ type: 'spring', damping: 25, stiffness: 240 }}
              className="w-screen max-w-md bg-white text-black border-l border-black/10 shadow-2xl flex flex-col justify-between"
            >
              {/* Drawer Header */}
              <div className="p-6 border-b border-black/10 flex items-center justify-between bg-black/[0.02]">
                <div className="flex items-center gap-3">
                  <div className="p-2.5 rounded-full bg-black text-white">
                    <ShoppingBag className="w-4 h-4" />
                  </div>
                  <div>
                    <h2 className="text-lg font-bold font-display text-black">Your Cart</h2>
                    <p className="text-xs text-black/50">
                      {cart.length === 0 
                        ? 'Empty' 
                        : `${cart.reduce((a, b) => a + b.quantity, 0)} items selected`}
                    </p>
                  </div>
                </div>

                <button
                  onClick={closeCart}
                  aria-label="Close shopping cart"
                  className="p-2 rounded-full text-black/50 hover:text-black hover:bg-black/5 transition-colors focus:outline-none"
                  data-cursor-text="CLOSE"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>

              {/* Drawer Body */}
              <div className="flex-1 overflow-y-auto p-6 space-y-4">
                {cart.length === 0 ? (
                  <div className="h-full flex flex-col items-center justify-center text-center py-12">
                    <div className="w-16 h-16 rounded-full bg-black/5 flex items-center justify-center text-black/40 mb-4">
                      <ShoppingBag className="w-8 h-8 stroke-[1.5]" />
                    </div>
                    <h3 className="text-base font-bold font-display text-black mb-1">Your cart is empty</h3>
                    <p className="text-xs text-black/50 max-w-xs mb-6">
                      Explore our collection of master playbooks, Notion workspaces, and digital toolkits.
                    </p>
                    <button
                      onClick={closeCart}
                      className="cuberto-btn bg-black text-white text-xs py-2.5 px-6 hover:bg-black/90"
                    >
                      Browse Digital Products
                    </button>
                  </div>
                ) : (
                  <div className="space-y-4">
                    {cart.map((item) => {
                      const unitPrice = item.product.price[item.license];
                      return (
                        <div
                          key={`${item.product.id}-${item.license}`}
                          className="p-4 rounded-2xl bg-black/[0.03] border border-black/10 flex gap-3.5 relative group"
                        >
                          {/* Thumbnail */}
                          <img
                            src={item.product.bannerImage}
                            alt={item.product.title}
                            className="w-16 h-16 sm:w-20 sm:h-20 rounded-xl object-cover bg-black/5 shrink-0"
                          />

                          {/* Info */}
                          <div className="flex-1 min-w-0">
                            <div className="flex items-start justify-between gap-1 mb-1">
                              <h4 className="text-sm font-bold text-black truncate">
                                {item.product.title}
                              </h4>
                              <button
                                onClick={() => removeFromCart(item.product.id, item.license)}
                                aria-label="Remove item from cart"
                                className="text-black/40 hover:text-red-500 p-1 transition-colors"
                              >
                                <Trash2 className="w-4 h-4" />
                              </button>
                            </div>

                            {/* License selector */}
                            <div className="flex items-center gap-1.5 mb-2.5">
                              <label htmlFor={`license-${item.product.id}`} className="text-[11px] text-black/50">License:</label>
                              <select
                                id={`license-${item.product.id}`}
                                value={item.license}
                                onChange={(e) =>
                                  updateLicense(
                                    item.product.id,
                                    item.license,
                                    e.target.value as LicenseType
                                  )
                                }
                                className="bg-white border border-black/15 text-black text-xs rounded-full px-2 py-0.5 focus:outline-none"
                              >
                                <option value="standard">Standard (₹{item.product.price.standard})</option>
                                <option value="team">Team / Commercial (₹{item.product.price.team})</option>
                              </select>
                            </div>

                            {/* Quantity and Price */}
                            <div className="flex items-center justify-between">
                              <div className="flex items-center border border-black/15 rounded-full bg-white overflow-hidden">
                                <button
                                  onClick={() =>
                                    updateQuantity(item.product.id, item.license, item.quantity - 1)
                                  }
                                  aria-label="Decrease quantity"
                                  className="p-1 px-2 hover:bg-black/5 text-black transition-colors"
                                >
                                  <Minus className="w-3 h-3" />
                                </button>
                                <span className="px-2 text-xs font-mono font-bold text-black">
                                  {item.quantity}
                                </span>
                                <button
                                  onClick={() =>
                                    updateQuantity(item.product.id, item.license, item.quantity + 1)
                                  }
                                  aria-label="Increase quantity"
                                  className="p-1 px-2 hover:bg-black/5 text-black transition-colors"
                                >
                                  <Plus className="w-3 h-3" />
                                </button>
                              </div>

                              <span className="font-display font-bold text-black text-sm">
                                ₹{(unitPrice * item.quantity).toLocaleString()}
                              </span>
                            </div>
                          </div>
                        </div>
                      );
                    })}
                  </div>
                )}
              </div>

              {/* Drawer Footer */}
              {cart.length > 0 && (
                <div className="p-6 border-t border-black/10 bg-black/[0.02] space-y-4">
                  {/* Coupon Code Section */}
                  <form onSubmit={handleApplyCoupon} className="flex gap-2">
                    <div className="relative flex-1">
                      <Tag className="w-4 h-4 absolute left-3 top-1/2 -translate-y-1/2 text-black/40" />
                      <input
                        type="text"
                        placeholder="Coupon code (e.g. COMEBACK20)"
                        value={inputCode}
                        onChange={(e) => setInputCode(e.target.value)}
                        className="w-full pl-9 pr-3 py-2 text-xs bg-white border border-black/15 rounded-full text-black placeholder-black/40 focus:outline-none focus:border-black uppercase font-mono"
                      />
                    </div>
                    <button
                      type="submit"
                      className="px-4 py-2 bg-black text-white rounded-full text-xs font-bold hover:bg-black/80 transition-colors"
                    >
                      Apply
                    </button>
                  </form>

                  {/* Coupon messages */}
                  {couponError && (
                    <div className="flex items-center gap-1.5 text-xs text-red-600">
                      <AlertCircle className="w-3.5 h-3.5" />
                      <span>{couponError}</span>
                    </div>
                  )}

                  {couponCode && (
                    <div className="flex items-center justify-between text-xs text-emerald-700 bg-emerald-50 px-3 py-1.5 rounded-full border border-emerald-200">
                      <div className="flex items-center gap-1.5">
                        <CheckCircle2 className="w-3.5 h-3.5" />
                        <span>Code <strong>{couponCode}</strong> applied</span>
                      </div>
                      <button
                        onClick={removeCoupon}
                        className="text-xs text-red-500 hover:underline font-semibold"
                      >
                        Remove
                      </button>
                    </div>
                  )}

                  {/* Price Calculation Breakdown */}
                  <div className="space-y-1.5 pt-2 border-t border-black/10 text-xs">
                    <div className="flex justify-between text-black/60">
                      <span>Subtotal</span>
                      <span className="font-mono">₹{subtotal.toLocaleString()}</span>
                    </div>

                    {discountAmount > 0 && (
                      <div className="flex justify-between text-emerald-600 font-semibold">
                        <span>Discount</span>
                        <span className="font-mono">-₹{discountAmount.toLocaleString()}</span>
                      </div>
                    )}

                    <div className="flex justify-between text-base font-bold text-black pt-2 border-t border-black/10">
                      <span>Total</span>
                      <span className="font-mono">₹{total.toLocaleString()}</span>
                    </div>
                  </div>

                  {/* Checkout Button */}
                  <button
                    onClick={handleCheckout}
                    className="w-full cuberto-btn bg-black text-white hover:bg-black/90 py-3.5 text-sm font-bold flex items-center justify-center gap-2 group"
                    data-cursor-text="PAY"
                  >
                    <span>Proceed to Razorpay Checkout</span>
                    <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                  </button>

                  <div className="flex items-center justify-center gap-2 text-[11px] text-black/40">
                    <ShieldCheck className="w-3.5 h-3.5 text-black/50" />
                    <span>Instant Digital Access • Secure Razorpay</span>
                  </div>
                </div>
              )}
            </motion.div>
          </div>
        </div>
      )}
    </AnimatePresence>
  );
};
