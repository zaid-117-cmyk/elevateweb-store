import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useCart } from '../hooks/useCart';
import { ShoppingBag, ShieldCheck, ArrowRight, Loader2, Mail } from 'lucide-react';
import { motion } from 'framer-motion';

export const CheckoutPage: React.FC = () => {
  const { cart, total, clearCart } = useCart();
  const navigate = useNavigate();
  const [email, setEmail] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  if (cart.length === 0) {
    return (
      <div className="min-h-screen pt-32 pb-24 flex flex-col items-center justify-center bg-white text-black">
        <h2 className="cuberto-heading text-3xl font-bold mb-4">Your Cart is Empty</h2>
        <p className="text-black/60 mb-8">Add a digital product to your cart to proceed with checkout.</p>
        <button onClick={() => navigate('/')} className="cuberto-btn bg-black text-white px-8 py-3">
          Browse Catalog
        </button>
      </div>
    );
  }

  const handlePayment = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!email) {
      setError('Email is required to deliver your digital product.');
      return;
    }

    setLoading(true);
    setError('');

    try {
      // Create order for the first item in cart (backend supports 1 product per order)
      const productId = cart[0].product.id;
      
      const API_URL = import.meta.env.VITE_API_URL || 'https://api.elevateweb.me';
      const response = await fetch(`${API_URL}/api/checkout/create-order`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ productId, email }),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.error || 'Failed to create order');
      }

      const options = {
        key: 'rzp_test_YOUR_KEY_HERE', // In a real app, this should come from the backend or env
        amount: data.amount,
        currency: data.currency,
        name: 'ElevateWeb Store',
        description: cart[0].product.title,
        image: 'https://images.unsplash.com/photo-1611224885990-ab7363d1f2a9?auto=format&fit=crop&w=150&q=80',
        order_id: data.orderId,
        handler: function () {
          // On success
          clearCart();
          navigate('/order-success');
        },
        prefill: {
          email: email,
        },
        theme: {
          color: '#000000',
        }
      };

      // @ts-ignore
      const rzp = new window.Razorpay(options);
      rzp.on('payment.failed', function () {
        setError('Payment failed. Please try again.');
      });
      rzp.open();
    } catch (err: any) {
      console.error(err);
      setError(err.message || 'An error occurred during checkout.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen pt-32 pb-24 bg-white text-black">
      <div className="max-w-3xl mx-auto px-6">
        <div className="mb-10">
          <h1 className="cuberto-heading text-4xl md:text-5xl mb-4">Secure Checkout</h1>
          <p className="text-black/60">Complete your purchase to get instant access to your digital products.</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
          {/* Order Summary */}
          <div>
            <h3 className="font-display font-bold text-xl mb-6 flex items-center gap-2">
              <ShoppingBag className="w-5 h-5" />
              Order Summary
            </h3>
            
            <div className="space-y-4 mb-8">
              {cart.map((item, idx) => (
                <div key={idx} className="flex gap-4 p-4 bg-black/[0.02] border border-black/10 rounded-2xl">
                  <img src={item.product.bannerImage} alt={item.product.title} className="w-16 h-16 rounded-xl object-cover" />
                  <div>
                    <h4 className="font-bold text-sm">{item.product.title}</h4>
                    <p className="text-xs text-black/50 mb-1">{item.license} license</p>
                    <p className="font-mono text-sm font-bold">₹{item.product.price[item.license].toLocaleString()}</p>
                  </div>
                </div>
              ))}
            </div>

            <div className="border-t border-black/10 pt-4 space-y-2">
              <div className="flex justify-between font-bold text-lg">
                <span>Total</span>
                <span className="font-mono">₹{total.toLocaleString()}</span>
              </div>
            </div>
          </div>

          {/* Payment Form */}
          <div>
            <h3 className="font-display font-bold text-xl mb-6">Delivery Details</h3>
            
            <form onSubmit={handlePayment} className="space-y-6">
              <div>
                <label className="block text-xs font-mono uppercase tracking-wider text-black/60 mb-2">
                  Email Address
                </label>
                <div className="relative">
                  <Mail className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-black/40" />
                  <input
                    type="email"
                    required
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="you@example.com"
                    className="w-full pl-11 pr-4 py-3 bg-black/[0.02] border border-black/10 rounded-xl focus:border-black focus:outline-none transition-colors"
                  />
                </div>
                <p className="text-[11px] text-black/40 mt-2">
                  Your digital products will be sent to this email address instantly after payment.
                </p>
              </div>

              {error && (
                <motion.div initial={{ opacity: 0, y: -10 }} animate={{ opacity: 1, y: 0 }} className="p-3 bg-red-50 text-red-600 text-sm rounded-xl border border-red-100">
                  {error}
                </motion.div>
              )}

              <button
                type="submit"
                disabled={loading}
                className="w-full cuberto-btn bg-black text-white hover:bg-black/90 py-4 flex items-center justify-center gap-2 group disabled:opacity-70"
              >
                {loading ? (
                  <Loader2 className="w-5 h-5 animate-spin" />
                ) : (
                  <>
                    <span>Pay ₹{total.toLocaleString()} with Razorpay</span>
                    <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                  </>
                )}
              </button>

              <div className="flex items-center justify-center gap-2 text-xs text-black/50">
                <ShieldCheck className="w-4 h-4" />
                <span>100% Secure Checkout via Razorpay</span>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CheckoutPage;
