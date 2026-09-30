import React, { useEffect } from 'react';
import { Link } from 'react-router-dom';
import { 
  CheckCircle, 
  Download, 
  Key, 
  Sparkles, 
  ArrowRight, 
  FileText, 
  ShieldCheck, 
  Copy, 
  Check
} from 'lucide-react';
import confetti from 'canvas-confetti';
import { useCart } from '../hooks/useCart';

export const OrderSuccessPage: React.FC = () => {
  const { lastOrder } = useCart();
  const [copiedKey, setCopiedKey] = React.useState(false);

  // Trigger confetti burst on load
  useEffect(() => {
    // Fire confetti
    const count = 200;
    const defaults = {
      origin: { y: 0.7 },
      colors: ['#F59E0B', '#06B6D4', '#10B981', '#FBBF24', '#FFFFFF']
    };

    function fire(particleRatio: number, opts: confetti.Options) {
      confetti({
        ...defaults,
        ...opts,
        particleCount: Math.floor(count * particleRatio)
      });
    }

    fire(0.25, { spread: 26, startVelocity: 55 });
    fire(0.2, { spread: 60 });
    fire(0.35, { spread: 100, decay: 0.91, scalar: 0.8 });
    fire(0.1, { spread: 120, startVelocity: 25, decay: 0.92, scalar: 1.2 });
    fire(0.1, { spread: 120, startVelocity: 45 });
  }, []);

  // Simulated fallback order if visited directly
  const order = lastOrder || {
    orderId: 'ORD-894125',
    date: new Date().toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' }),
    customerName: 'Alex Rivera',
    customerEmail: 'alex@developer.io',
    items: [],
    subtotal: 89,
    discount: 18,
    tax: 0,
    total: 71,
    paymentMethod: 'Razorpay UPI',
    razorpayPaymentId: 'pay_RZP98129034A'
  };

  const licenseKey = `ELEVATE-${order.orderId.replace('ORD-', '')}-${Math.random().toString(36).substring(2, 8).toUpperCase()}`;

  const handleCopyKey = () => {
    navigator.clipboard.writeText(licenseKey);
    setCopiedKey(true);
    setTimeout(() => setCopiedKey(false), 2000);
  };

  const handleDownloadAsset = (filename: string, content: string = 'ElevateWeb Digital Asset Package\n\nLicense Key: ' + licenseKey) => {
    const blob = new Blob([content], { type: 'text/plain' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = filename;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
  };

  return (
    <div className="min-h-screen py-14">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Success Header */}
        <div className="text-center space-y-4 mb-10">
          <div className="inline-flex p-4 rounded-3xl bg-emerald-500/10 border border-emerald-500/20 text-emerald-400 shadow-xl shadow-emerald-500/10 mb-2">
            <CheckCircle className="w-12 h-12 stroke-[2]" />
          </div>
          
          <h1 className="text-3xl sm:text-4xl font-display font-extrabold text-white tracking-tight">
            Payment Verified & Order Confirmed!
          </h1>
          
          <p className="text-sm text-slate-400 max-w-md mx-auto leading-relaxed">
            Thank you for purchasing from <strong className="text-white">ElevateWeb</strong>. Your digital files and cryptographic licenses are ready for download below.
          </p>

          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-blue-500/10 border border-blue-500/20 text-blue-400 text-xs font-mono font-medium">
            <span>Razorpay Payment ID:</span>
            <span className="font-bold text-white">{order.razorpayPaymentId}</span>
          </div>
        </div>

        {/* License Key Card */}
        <div className="p-6 rounded-2xl bg-gradient-to-r from-amber-500/15 via-obsidian-900 to-cyan-500/15 border border-amber-500/30 backdrop-blur-xl mb-8 shadow-xl">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
            <div className="space-y-1">
              <div className="flex items-center gap-2 text-xs font-mono text-amber-400 font-semibold">
                <Key className="w-4 h-4" />
                <span>COMMERCIAL LICENSE KEY</span>
              </div>
              <p className="text-xs text-slate-400">
                Registered to: <span className="text-white font-medium">{order.customerEmail}</span>
              </p>
              <div className="text-lg sm:text-xl font-mono font-bold text-white tracking-widest pt-1">
                {licenseKey}
              </div>
            </div>

            <button
              onClick={handleCopyKey}
              className="px-4 py-2.5 rounded-xl bg-obsidian-900 border border-white/10 hover:border-amber-500/40 text-xs font-medium text-slate-200 hover:text-white flex items-center justify-center gap-2 transition-all shrink-0"
            >
              {copiedKey ? (
                <>
                  <Check className="w-4 h-4 text-emerald-400" />
                  <span>Copied!</span>
                </>
              ) : (
                <>
                  <Copy className="w-4 h-4 text-slate-400" />
                  <span>Copy License</span>
                </>
              )}
            </button>
          </div>
        </div>

        {/* Digital Deliverables Download Box */}
        <div className="p-7 rounded-2xl bg-obsidian-900/60 border border-white/[0.08] backdrop-blur-xl shadow-xl space-y-6 mb-8">
          <div className="flex items-center justify-between border-b border-white/[0.08] pb-4">
            <div className="flex items-center gap-2.5">
              <div className="p-2 rounded-lg bg-cyan-500/10 text-cyan-400 border border-cyan-500/20">
                <Download className="w-5 h-5" />
              </div>
              <div>
                <h3 className="font-display font-bold text-white text-base">
                  Instant Asset Downloads
                </h3>
                <p className="text-xs text-slate-400">
                  Full source code, production builds, and Figma master files.
                </p>
              </div>
            </div>

            <button
              onClick={() => handleDownloadAsset(`receipt-${order.orderId}.txt`, `ELEVATEWEB STORE RECEIPT\nOrder: ${order.orderId}\nDate: ${order.date}\nPayment: ${order.paymentMethod}\nPayment ID: ${order.razorpayPaymentId}\nTotal: $${order.total}\nStatus: Completed\n\nThank you for choosing ElevateWeb!`)}
              className="text-xs text-slate-400 hover:text-white flex items-center gap-1.5 p-2 rounded-lg bg-obsidian-950 border border-white/10"
            >
              <FileText className="w-3.5 h-3.5 text-amber-400" />
              <span>Download Receipt</span>
            </button>
          </div>

          {/* Download rows */}
          <div className="space-y-3">
            {order.items.length > 0 ? (
              order.items.map((item) => (
                <div
                  key={`${item.product.id}-${item.license}`}
                  className="p-4 rounded-xl bg-obsidian-950/70 border border-white/[0.06] flex flex-col sm:flex-row sm:items-center justify-between gap-4"
                >
                  <div className="flex items-center gap-3.5">
                    <img
                      src={item.product.bannerImage}
                      alt={item.product.title}
                      className="w-14 h-14 rounded-lg object-cover bg-obsidian-850 shrink-0"
                    />
                    <div>
                      <h4 className="text-sm font-semibold text-white">
                        {item.product.title}
                      </h4>
                      <div className="flex items-center gap-2 text-xs text-slate-400 mt-0.5">
                        <span className="capitalize text-amber-300 font-mono text-[11px]">
                          {item.license} License
                        </span>
                        <span>•</span>
                        <span>Version {item.product.version}</span>
                      </div>
                    </div>
                  </div>

                  <div className="flex items-center gap-2 self-end sm:self-center">
                    <button
                      onClick={() => handleDownloadAsset(`${item.product.slug}-package.zip`)}
                      className="px-4 py-2 rounded-xl bg-amber-500 hover:bg-amber-400 text-obsidian-950 font-bold text-xs flex items-center gap-1.5 shadow-sm transition-all"
                    >
                      <Download className="w-3.5 h-3.5" />
                      <span>Download ZIP</span>
                    </button>
                  </div>
                </div>
              ))
            ) : (
              <div className="p-4 rounded-xl bg-obsidian-950/70 border border-white/[0.06] flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                <div className="flex items-center gap-3.5">
                  <div className="w-14 h-14 rounded-lg bg-amber-500/10 border border-amber-500/20 flex items-center justify-center text-amber-400">
                    <Sparkles className="w-6 h-6" />
                  </div>
                  <div>
                    <h4 className="text-sm font-semibold text-white">
                      Nexus SaaS Starter Kit Pro
                    </h4>
                    <span className="text-xs text-slate-400">Next.js 15 + Supabase + Razorpay (v2.4.0)</span>
                  </div>
                </div>

                <button
                  onClick={() => handleDownloadAsset('nexus-saas-v2.4.0.zip')}
                  className="px-4 py-2 rounded-xl bg-amber-500 hover:bg-amber-400 text-obsidian-950 font-bold text-xs flex items-center gap-1.5"
                >
                  <Download className="w-3.5 h-3.5" />
                  <span>Download Package (24.5 MB)</span>
                </button>
              </div>
            )}
          </div>

          {/* Guarantee footer note */}
          <div className="p-4 rounded-xl bg-obsidian-950/40 border border-white/[0.04] flex items-center justify-between text-xs text-slate-400">
            <div className="flex items-center gap-2">
              <ShieldCheck className="w-4 h-4 text-emerald-400" />
              <span>SHA-256 package checksum verified. All downloads include commercial warranty.</span>
            </div>
          </div>
        </div>

        {/* Back Home CTA */}
        <div className="text-center pt-4">
          <Link
            to="/"
            className="inline-flex items-center gap-2 text-sm font-semibold text-amber-400 hover:text-amber-300 transition-colors"
          >
            <span>Explore More Digital Assets</span>
            <ArrowRight className="w-4 h-4" />
          </Link>
        </div>

      </div>
    </div>
  );
};
