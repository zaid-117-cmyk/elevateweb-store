import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { 
  ShieldCheck, 
  ArrowLeft, 
  Trash2, 
  Tag, 
  CheckCircle2, 
  AlertCircle,
  ShoppingBag,
  Zap
} from 'lucide-react';
import { useCart } from '../hooks/useCart';
import { OrderDetails } from '../types';

export const CheckoutPage: React.FC = () => {
  const {
    cart,
    removeFromCart,
    subtotal,
    discountAmount,
    total,
    couponCode,
    couponError,
    couponSuccess,
    applyCoupon,
    removeCoupon,
    clearCart,
    setLastOrder
  } = useCart();

  const navigate = useNavigate();

  // Form State
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [country, setCountry] = useState('India');
  const [formError, setFormError] = useState('');
  const [couponInput, setCouponInput] = useState('');


  if (cart.length === 0) {
    return (
      <div className="min-h-[70vh] flex flex-col items-center justify-center text-center px-4 bg-white">
        <div className="w-16 h-16 rounded-2xl bg-white/[0.04] border border-white/[0.08] flex items-center justify-center text-slate-500 mb-4">
          <ShoppingBag className="w-8 h-8" />
        </div>
        <h2 className="text-2xl font-bold font-display text-black mb-2">Your Cart is Empty</h2>
        <p className="text-slate-400 text-xs sm:text-sm max-w-sm mb-6">
          Add a boilerplate or UI kit to your cart before proceeding to checkout.
        </p>
        <Link
          to="/"
          className="px-6 py-3 rounded-xl bg-black text-white font-bold text-sm"
        >
          Explore Digital Store
        </Link>
      </div>
    );
  }

  const handleApplyCoupon = (e: React.FormEvent) => {
    e.preventDefault();
    if (couponInput.trim()) {
      applyCoupon(couponInput);
      setCouponInput('');
    }
  };

  const handlePaymentSuccess = (paymentId: string) => {
    const newOrder: OrderDetails = {
      orderId: 'ORD-' + Math.floor(100000 + Math.random() * 900000),
      date: new Date().toLocaleDateString('en-US', {
        month: 'short',
        day: 'numeric',
        year: 'numeric'
      }),
      customerName: name,
      customerEmail: email,
      items: [...cart],
      subtotal,
      discount: discountAmount,
      tax: 0,
      total,
      paymentMethod: 'Razorpay UPI/Card',
      razorpayPaymentId: paymentId
    };

    setLastOrder(newOrder);
    clearCart();
    navigate('/order-success');
  };

  const [isProcessing, setIsProcessing] = useState(false);

  const handleProceedToRazorpay = async (e: React.FormEvent) => {
    e.preventDefault();
    setFormError('');

    if (!name.trim() || !email.trim()) {
      setFormError('Please enter your full name and digital delivery email address.');
      return;
    }

    if (!email.includes('@')) {
      setFormError('Please provide a valid email address.');
      return;
    }

    setIsProcessing(true);
    try {
      // 1. Create real order on backend
      const response = await fetch('https://api.elevateweb.me/api/checkout/create-order', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          productId: cart[0].product.id,
          email: email
        })
      });

      const orderData = await response.json();
      
      if (!response.ok) {
        throw new Error(orderData.error || 'Failed to create backend order');
      }

      // 2. Open Real Razorpay Popup
      const { triggerRazorpayCheckout } = await import('../lib/razorpay');
      
      triggerRazorpayCheckout({
        amount: orderData.amount,
        currency: orderData.currency,
        name: 'ElevateWeb',
        description: cart[0].product.title,
        order_id: orderData.orderId,
        prefill: {
          name: name,
          email: email,
          contact: phone,
        },
        handler: (res) => {
          handlePaymentSuccess(res.razorpay_payment_id);
        }
      });
    } catch (err: any) {
      setFormError(err.message || 'Checkout failed');
    } finally {
      setIsProcessing(false);
    }
  };

  return (
    <div className="min-h-screen py-12 bg-white">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Back Link */}
        <Link
          to="/"
          className="inline-flex items-center gap-1.5 text-xs text-slate-500 hover:text-black transition-colors mb-8"
        >
          <ArrowLeft className="w-4 h-4" />
          <span>Continue Shopping</span>
        </Link>

        <h1 className="text-3xl font-display font-bold text-black tracking-tight mb-8">
          Secure Digital Checkout
        </h1>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10">
          
          {/* Left Column: Customer & Delivery Details */}
          <div className="lg:col-span-7 space-y-6">
            <form onSubmit={handleProceedToRazorpay} className="p-7 rounded-2xl bg-white border border-black/10 shadow-xl space-y-6">
              
              <div className="flex items-center justify-between border-b border-black/10 pb-4">
                <div className="flex items-center gap-2.5">
                  <div className="p-2 rounded-lg bg-black/5 text-black border border-black/10">
                    <ShieldCheck className="w-5 h-5" />
                  </div>
                  <div>
                    <h3 className="font-display font-bold text-black text-base">
                      Customer & Asset Delivery Information
                    </h3>
                    <p className="text-xs text-slate-500">
                      Your download links and GitHub invites will be sent to this email.
                    </p>
                  </div>
                </div>
              </div>

              {formError && (
                <div className="p-3 rounded-xl bg-red-500/10 border border-red-500/20 text-xs text-red-400 flex items-center gap-2">
                  <AlertCircle className="w-4 h-4 shrink-0" />
                  <span>{formError}</span>
                </div>
              )}

              <div className="space-y-4">
                <div>
                  <label className="block text-xs font-semibold text-slate-700 mb-1.5">
                    Full Legal Name
                  </label>
                  <input
                    type="text"
                    required
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    placeholder="e.g. Alex Rivera"
                    className="w-full px-3.5 py-2.5 rounded-xl bg-gray-50 border border-black/10 text-black text-xs sm:text-sm placeholder-slate-400 focus:outline-none focus:border-black"
                  />
                </div>

                <div>
                  <label className="block text-xs font-semibold text-slate-700 mb-1.5">
                    Email Address (For Instant Download Delivery)
                  </label>
                  <input
                    type="email"
                    required
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="alex@domain.com"
                    className="w-full px-3.5 py-2.5 rounded-xl bg-gray-50 border border-black/10 text-black text-xs sm:text-sm placeholder-slate-400 focus:outline-none focus:border-black"
                  />
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs font-semibold text-slate-700 mb-1.5">
                      Phone Number (For Razorpay UPI/SMS receipt)
                    </label>
                    <input
                      type="tel"
                      value={phone}
                      onChange={(e) => setPhone(e.target.value)}
                      placeholder="+91 98765 43210"
                      className="w-full px-3.5 py-2.5 rounded-xl bg-gray-50 border border-black/10 text-black text-xs sm:text-sm placeholder-slate-400 focus:outline-none focus:border-black font-mono"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-semibold text-slate-700 mb-1.5">
                      Country of Residence
                    </label>
                    <select
                      value={country}
                      onChange={(e) => setCountry(e.target.value)}
                      className="w-full px-3.5 py-2.5 rounded-xl bg-gray-50 border border-black/10 text-black text-xs sm:text-sm focus:outline-none focus:border-black"
                    >
                      <option value="India">India (INR / UPI / Cards)</option>
                      <option value="United States">United States (USD)</option>
                      <option value="United Kingdom">United Kingdom (GBP)</option>
                      <option value="Germany">Germany (EUR)</option>
                      <option value="Canada">Canada (CAD)</option>
                      <option value="Singapore">Singapore (SGD)</option>
                    </select>
                  </div>
                </div>
              </div>

              {/* Payment Gateway Box */}
              <div className="p-4 rounded-xl bg-gray-50 border border-blue-500/20 space-y-3">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <div className="w-7 h-7 rounded-lg bg-blue-600 flex items-center justify-center font-bold text-white text-xs">
                      R
                    </div>
                    <div>
                      <h4 className="text-xs font-bold text-black">Razorpay Standard Checkout</h4>
                      <p className="text-[11px] text-slate-500">Supports UPI, RuPay, Visa, Mastercard, & NetBanking</p>
                    </div>
                  </div>
                  <span className="text-[10px] font-mono uppercase px-2 py-0.5 rounded bg-emerald-500/10 text-emerald-400 border border-emerald-500/20 font-semibold">
                    Zero Fees
                  </span>
                </div>
              </div>

              <button
                type="submit"
                disabled={isProcessing}
                className="w-full py-4 rounded-xl bg-black text-white font-display font-extrabold text-sm tracking-wide shadow-xl transition-all flex items-center justify-center gap-2 disabled:opacity-50"
              >
                <Zap className="w-4 h-4 fill-white text-white" />
                <span>{isProcessing ? 'Processing Securely...' : `Pay ₹${total} with Razorpay`}</span>
              </button>

              <div className="flex items-center justify-center gap-2 text-[11px] text-slate-500">
                <ShieldCheck className="w-4 h-4 text-emerald-400" />
                <span>30-Day Money Back Guarantee • Encrypted via Razorpay</span>
              </div>
            </form>
          </div>

          {/* Right Column: Order Summary & Coupon */}
          <div className="lg:col-span-5 space-y-6">
            <div className="p-7 rounded-2xl bg-white border border-black/10 shadow-xl space-y-5">
              
              <h3 className="font-display font-bold text-black text-base border-b border-black/10 pb-3">
                Order Summary ({cart.reduce((a, b) => a + b.quantity, 0)} items)
              </h3>

              {/* Items List */}
              <div className="divide-y divide-black/5 max-h-72 overflow-y-auto pr-1">
                {cart.map((item) => (
                  <div
                    key={`${item.product.id}-${item.license}`}
                    className="py-3 flex items-center justify-between gap-3 text-xs"
                  >
                    <div className="flex items-center gap-3 min-w-0">
                      <img
                        src={item.product.bannerImage}
                        alt={item.product.title}
                        className="w-12 h-12 rounded-lg object-cover bg-gray-100 shrink-0"
                      />
                      <div className="min-w-0">
                        <h4 className="text-black font-medium truncate">
                          {item.product.title}
                        </h4>
                        <div className="flex items-center gap-2 text-[11px] text-slate-500">
                          <span className="capitalize text-slate-700 font-semibold">{item.license} License</span>
                          <span>•</span>
                          <span>Qty: {item.quantity}</span>
                        </div>
                      </div>
                    </div>

                    <div className="flex items-center gap-3 shrink-0">
                      <span className="font-mono font-bold text-black">
                        ₹{item.product.price[item.license] * item.quantity}
                      </span>
                      <button
                        onClick={() => removeFromCart(item.product.id, item.license)}
                        aria-label="Remove item"
                        className="text-slate-500 hover:text-red-400 transition-colors p-1"
                      >
                        <Trash2 className="w-3.5 h-3.5" />
                      </button>
                    </div>
                  </div>
                ))}
              </div>

              {/* Coupon Form */}
              <div className="pt-2 border-t border-black/10">
                {couponCode ? (
                  <div className="flex items-center justify-between p-2.5 rounded-xl bg-emerald-500/10 border border-emerald-500/20 text-xs">
                    <div className="flex items-center gap-1.5 text-emerald-300">
                      <CheckCircle2 className="w-4 h-4 text-emerald-400" />
                      <span className="font-semibold font-mono">{couponCode}</span>
                      <span className="text-slate-400">(-₹{discountAmount})</span>
                    </div>
                    <button
                      onClick={removeCoupon}
                      className="text-xs text-red-400 hover:text-red-300 underline"
                    >
                      Remove
                    </button>
                  </div>
                ) : (
                  <form onSubmit={handleApplyCoupon} className="flex gap-2">
                    <div className="relative flex-1">
                      <Tag className="w-3.5 h-3.5 absolute left-3 top-1/2 -translate-y-1/2 text-slate-500" />
                      <input
                        type="text"
                        placeholder="Discount code (e.g. ELEVATE20)"
                        value={couponInput}
                        onChange={(e) => setCouponInput(e.target.value)}
                        className="w-full pl-8 pr-3 py-2 text-xs rounded-xl bg-gray-50 border border-black/10 text-black placeholder-slate-400 uppercase font-mono focus:outline-none focus:border-black"
                      />
                    </div>
                    <button
                      type="submit"
                      className="px-3 py-2 text-xs font-semibold rounded-xl bg-black text-white border border-black"
                    >
                      Apply
                    </button>
                  </form>
                )}
                {couponError && (
                  <p className="mt-1.5 text-[11px] text-red-400 flex items-center gap-1">
                    <AlertCircle className="w-3 h-3" />
                    {couponError}
                  </p>
                )}
                {couponSuccess && !couponCode && (
                  <p className="mt-1.5 text-[11px] text-emerald-400">
                    {couponSuccess}
                  </p>
                )}
              </div>

              {/* Price Breakdown */}
              <div className="pt-3 border-t border-black/10 space-y-2 text-xs text-slate-500">
                <div className="flex justify-between">
                  <span>Subtotal</span>
                  <span className="text-slate-800 font-semibold">₹{subtotal}</span>
                </div>
                {discountAmount > 0 && (
                  <div className="flex justify-between text-emerald-400">
                    <span>Discount Applied</span>
                    <span>-₹{discountAmount}</span>
                  </div>
                )}
                <div className="flex justify-between">
                  <span>Digital Goods Tax (0%)</span>
                  <span className="text-slate-800 font-semibold">₹0.00</span>
                </div>
                <div className="flex justify-between text-base font-bold text-black pt-2 border-t border-black/10">
                  <span>Total Amount</span>
                  <span className="font-display text-black text-xl">₹{total}</span>
                </div>
              </div>

            </div>
          </div>

        </div>

      </div>

    </div>
  );
};
