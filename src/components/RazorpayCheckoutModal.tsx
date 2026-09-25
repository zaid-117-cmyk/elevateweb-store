import React, { useState } from 'react';
import { 
  X, 
  ShieldCheck, 
  CreditCard, 
  QrCode, 
  Building2, 
  Lock, 
  CheckCircle2, 
  Loader2,
  Sparkles,
  ArrowRight,
  Smartphone
} from 'lucide-react';
import { motion } from 'framer-motion';
import { CartItem } from '../types';

interface RazorpayCheckoutModalProps {
  isOpen: boolean;
  onClose: () => void;
  onPaymentSuccess: (paymentId: string) => void;
  total: number;
  customerDetails: {
    name: string;
    email: string;
    phone: string;
  };
  cartItems: CartItem[];
}

type PaymentTab = 'upi' | 'card' | 'netbanking';

export const RazorpayCheckoutModal: React.FC<RazorpayCheckoutModalProps> = ({
  isOpen,
  onClose,
  onPaymentSuccess,
  total,
  customerDetails,
}) => {
  const [activeTab, setActiveTab] = useState<PaymentTab>('upi');
  const [upiId, setUpiId] = useState('');
  const [cardNumber, setCardNumber] = useState('');
  const [cardExpiry, setCardExpiry] = useState('');
  const [cardCvv, setCardCvv] = useState('');
  const [selectedBank, setSelectedBank] = useState('HDFC Bank');
  const [isProcessing, setIsProcessing] = useState(false);
  const [processingStep, setProcessingStep] = useState('');

  if (!isOpen) return null;

  const handleFillDemoCard = () => {
    setCardNumber('4111 2222 3333 4444');
    setCardExpiry('12/28');
    setCardCvv('789');
  };

  const handleFillDemoUpi = (app: string) => {
    const handle = customerDetails.name.toLowerCase().replace(/\s+/g, '') || 'developer';
    setUpiId(`${handle}@${app}`);
  };

  const processPayment = async (method: string) => {
    setIsProcessing(true);
    setProcessingStep('Connecting to Razorpay Secure Gateway...');

    await new Promise((res) => setTimeout(res, 900));
    setProcessingStep(`Authorizing payment of $${total} via ${method}...`);

    await new Promise((res) => setTimeout(res, 1200));
    setProcessingStep('Generating cryptographic license & receipt...');

    await new Promise((res) => setTimeout(res, 700));
    const simulatedPaymentId = 'pay_' + Math.random().toString(36).substring(2, 12).toUpperCase();
    
    setIsProcessing(false);
    onPaymentSuccess(simulatedPaymentId);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
      {/* Backdrop */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        onClick={onClose}
        className="absolute inset-0 bg-obsidian-950/85 backdrop-blur-md"
      />

      {/* Modal Dialog */}
      <motion.div
        initial={{ scale: 0.95, opacity: 0, y: 15 }}
        animate={{ scale: 1, opacity: 1, y: 0 }}
        exit={{ scale: 0.95, opacity: 0, y: 15 }}
        className="relative w-full max-w-lg bg-obsidian-900 border border-white/10 rounded-2xl shadow-2xl overflow-hidden z-10 flex flex-col"
      >
        {/* Modal Header */}
        <div className="p-5 bg-gradient-to-r from-obsidian-950 via-obsidian-900 to-obsidian-950 border-b border-white/[0.08] flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-9 h-9 rounded-xl bg-blue-600 flex items-center justify-center font-bold text-white shadow-md shadow-blue-500/20">
              R
            </div>
            <div>
              <div className="flex items-center gap-2">
                <span className="font-bold text-white tracking-tight">Razorpay</span>
                <span className="text-[10px] uppercase font-mono px-1.5 py-0.5 rounded bg-blue-500/20 text-blue-400 font-semibold border border-blue-500/30">
                  Trusted Checkout
                </span>
              </div>
              <p className="text-xs text-slate-400">ElevateWeb.me Secure Gateway</p>
            </div>
          </div>

          <div className="flex items-center gap-3">
            <div className="text-right">
              <span className="text-[10px] text-slate-400 uppercase tracking-wider block">Payable</span>
              <span className="text-lg font-bold font-display text-amber-400">${total}</span>
            </div>
            <button
              onClick={onClose}
              disabled={isProcessing}
              aria-label="Close payment modal"
              className="p-1.5 rounded-lg text-slate-400 hover:text-white hover:bg-white/[0.06] transition-colors"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Processing State View */}
        {isProcessing ? (
          <div className="p-10 flex flex-col items-center justify-center text-center space-y-4">
            <div className="relative">
              <Loader2 className="w-12 h-12 text-amber-400 animate-spin" />
              <div className="absolute inset-0 bg-amber-400/20 rounded-full blur-xl animate-pulse" />
            </div>
            <h3 className="text-lg font-semibold text-white">Processing Razorpay Transaction</h3>
            <p className="text-sm text-slate-400 font-mono text-center max-w-sm">
              {processingStep}
            </p>
            <div className="flex items-center gap-1.5 text-xs text-slate-500">
              <Lock className="w-3.5 h-3.5" />
              <span>Do not refresh or leave the window</span>
            </div>
          </div>
        ) : (
          <div>
            {/* Payment Method Selector Tabs */}
            <div className="flex border-b border-white/[0.08] bg-obsidian-950/60 p-1.5 gap-1.5">
              <button
                type="button"
                onClick={() => setActiveTab('upi')}
                className={`flex-1 flex items-center justify-center gap-2 py-2.5 rounded-xl text-xs font-semibold transition-all ${
                  activeTab === 'upi'
                    ? 'bg-amber-500/15 border border-amber-500/30 text-amber-300 shadow-sm'
                    : 'text-slate-400 hover:text-white hover:bg-white/[0.03]'
                }`}
              >
                <Smartphone className="w-4 h-4" />
                <span>UPI / QR</span>
              </button>

              <button
                type="button"
                onClick={() => setActiveTab('card')}
                className={`flex-1 flex items-center justify-center gap-2 py-2.5 rounded-xl text-xs font-semibold transition-all ${
                  activeTab === 'card'
                    ? 'bg-amber-500/15 border border-amber-500/30 text-amber-300 shadow-sm'
                    : 'text-slate-400 hover:text-white hover:bg-white/[0.03]'
                }`}
              >
                <CreditCard className="w-4 h-4" />
                <span>Card (All Banks)</span>
              </button>

              <button
                type="button"
                onClick={() => setActiveTab('netbanking')}
                className={`flex-1 flex items-center justify-center gap-2 py-2.5 rounded-xl text-xs font-semibold transition-all ${
                  activeTab === 'netbanking'
                    ? 'bg-amber-500/15 border border-amber-500/30 text-amber-300 shadow-sm'
                    : 'text-slate-400 hover:text-white hover:bg-white/[0.03]'
                }`}
              >
                <Building2 className="w-4 h-4" />
                <span>NetBanking</span>
              </button>
            </div>

            {/* Tab Body */}
            <div className="p-6">
              {/* UPI Tab */}
              {activeTab === 'upi' && (
                <div className="space-y-4">
                  <div className="p-4 rounded-xl bg-obsidian-950/60 border border-white/[0.06] flex items-center gap-4">
                    <div className="w-20 h-20 bg-white rounded-lg p-1.5 flex items-center justify-center shrink-0">
                      <QrCode className="w-full h-full text-obsidian-950" />
                    </div>
                    <div>
                      <h4 className="text-sm font-semibold text-white">Scan & Pay via UPI App</h4>
                      <p className="text-xs text-slate-400 mt-0.5">
                        Scan using Google Pay, PhonePe, Paytm, CRED or any BHIM UPI App.
                      </p>
                      <button
                        type="button"
                        onClick={() => processPayment('UPI QR Code')}
                        className="mt-2 text-xs font-semibold text-amber-400 hover:text-amber-300 flex items-center gap-1"
                      >
                        Simulate QR Scan Payment <ArrowRight className="w-3.5 h-3.5" />
                      </button>
                    </div>
                  </div>

                  <div className="flex items-center gap-2 text-xs text-slate-500 justify-center">
                    <span className="w-12 h-px bg-white/10" />
                    <span>OR ENTER UPI ID</span>
                    <span className="w-12 h-px bg-white/10" />
                  </div>

                  <div>
                    <label className="block text-xs font-medium text-slate-300 mb-1.5">
                      Virtual Payment Address (VPA / UPI ID)
                    </label>
                    <div className="relative">
                      <input
                        type="text"
                        placeholder="username@okhdfcbank or user@paytm"
                        value={upiId}
                        onChange={(e) => setUpiId(e.target.value)}
                        className="w-full px-3.5 py-2.5 text-sm rounded-xl bg-obsidian-950 border border-white/10 text-white placeholder-slate-500 focus:outline-none focus:border-amber-500"
                      />
                    </div>
                  </div>

                  {/* Quick UPI fill shortcuts */}
                  <div className="flex flex-wrap gap-2 pt-1">
                    <span className="text-xs text-slate-400 self-center">Quick test:</span>
                    {['okhdfcbank', 'okaxis', 'paytm', 'ybl'].map((handle) => (
                      <button
                        key={handle}
                        type="button"
                        onClick={() => handleFillDemoUpi(handle)}
                        className="text-[11px] font-mono px-2 py-1 rounded bg-white/[0.04] hover:bg-white/[0.08] text-amber-400 border border-white/10"
                      >
                        @{handle}
                      </button>
                    ))}
                  </div>

                  <button
                    type="button"
                    onClick={() => processPayment(`UPI (${upiId || 'test@okhdfcbank'})`)}
                    className="w-full py-3.5 rounded-xl bg-amber-500 hover:bg-amber-400 text-obsidian-950 font-bold text-sm tracking-wide shadow-glow-amber transition-all flex items-center justify-center gap-2 mt-4"
                  >
                    <span>Pay ${total} with UPI</span>
                    <CheckCircle2 className="w-4 h-4" />
                  </button>
                </div>
              )}

              {/* Card Tab */}
              {activeTab === 'card' && (
                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <span className="text-xs text-slate-400">Supported: Visa, Mastercard, RuPay, Amex</span>
                    <button
                      type="button"
                      onClick={handleFillDemoCard}
                      className="text-xs text-amber-400 hover:text-amber-300 flex items-center gap-1 font-semibold"
                    >
                      <Sparkles className="w-3.5 h-3.5" />
                      Auto-fill test card
                    </button>
                  </div>

                  <div>
                    <label className="block text-xs font-medium text-slate-300 mb-1.5">
                      Card Number
                    </label>
                    <input
                      type="text"
                      placeholder="4111 2222 3333 4444"
                      value={cardNumber}
                      onChange={(e) => setCardNumber(e.target.value)}
                      maxLength={19}
                      className="w-full px-3.5 py-2.5 text-sm rounded-xl bg-obsidian-950 border border-white/10 text-white placeholder-slate-500 focus:outline-none focus:border-amber-500 font-mono"
                    />
                  </div>

                  <div className="grid grid-cols-2 gap-3">
                    <div>
                      <label className="block text-xs font-medium text-slate-300 mb-1.5">
                        Valid Thru
                      </label>
                      <input
                        type="text"
                        placeholder="MM/YY"
                        value={cardExpiry}
                        onChange={(e) => setCardExpiry(e.target.value)}
                        maxLength={5}
                        className="w-full px-3.5 py-2.5 text-sm rounded-xl bg-obsidian-950 border border-white/10 text-white placeholder-slate-500 focus:outline-none focus:border-amber-500 font-mono"
                      />
                    </div>
                    <div>
                      <label className="block text-xs font-medium text-slate-300 mb-1.5">
                        CVV / CVC
                      </label>
                      <input
                        type="password"
                        placeholder="123"
                        value={cardCvv}
                        onChange={(e) => setCardCvv(e.target.value)}
                        maxLength={4}
                        className="w-full px-3.5 py-2.5 text-sm rounded-xl bg-obsidian-950 border border-white/10 text-white placeholder-slate-500 focus:outline-none focus:border-amber-500 font-mono"
                      />
                    </div>
                  </div>

                  <button
                    type="button"
                    onClick={() => processPayment('Debit/Credit Card')}
                    className="w-full py-3.5 rounded-xl bg-amber-500 hover:bg-amber-400 text-obsidian-950 font-bold text-sm tracking-wide shadow-glow-amber transition-all flex items-center justify-center gap-2 mt-4"
                  >
                    <span>Pay ${total} with Card</span>
                    <Lock className="w-4 h-4" />
                  </button>
                </div>
              )}

              {/* NetBanking Tab */}
              {activeTab === 'netbanking' && (
                <div className="space-y-4">
                  <span className="text-xs text-slate-400 block mb-2">Popular Indian Banks:</span>
                  <div className="grid grid-cols-2 gap-2.5">
                    {['HDFC Bank', 'ICICI Bank', 'State Bank of India', 'Axis Bank', 'Kotak Mahindra', 'Punjab National Bank'].map((bank) => (
                      <button
                        key={bank}
                        type="button"
                        onClick={() => setSelectedBank(bank)}
                        className={`p-3 rounded-xl border text-left text-xs font-medium transition-all ${
                          selectedBank === bank
                            ? 'bg-amber-500/10 border-amber-500/40 text-amber-300'
                            : 'bg-obsidian-950/60 border-white/[0.08] text-slate-300 hover:border-white/20'
                        }`}
                      >
                        {bank}
                      </button>
                    ))}
                  </div>

                  <button
                    type="button"
                    onClick={() => processPayment(`NetBanking (${selectedBank})`)}
                    className="w-full py-3.5 rounded-xl bg-amber-500 hover:bg-amber-400 text-obsidian-950 font-bold text-sm tracking-wide shadow-glow-amber transition-all flex items-center justify-center gap-2 mt-4"
                  >
                    <span>Proceed with {selectedBank}</span>
                    <ArrowRight className="w-4 h-4" />
                  </button>
                </div>
              )}
            </div>

            {/* Modal Footer / Guarantee */}
            <div className="p-4 bg-obsidian-950/90 border-t border-white/[0.08] flex items-center justify-between text-[11px] text-slate-400">
              <div className="flex items-center gap-1.5 text-emerald-400 font-medium">
                <ShieldCheck className="w-4 h-4" />
                <span>PCI-DSS Level 1 Certified</span>
              </div>
              <span className="font-mono text-slate-500">100% Secure Sandbox</span>
            </div>
          </div>
        )}
      </motion.div>
    </div>
  );
};
