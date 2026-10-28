import React, { useState, useEffect } from 'react';
import { 
  TrendingUp, 
  Users, 
  Copy, 
  Check, 
  Lock, 
  ShieldCheck, 
  Zap, 
  MousePointerClick,
  Sparkles,
  ExternalLink
} from 'lucide-react';
import { getAffiliateStats, getAffiliateSales, recordAffiliateSale } from '../lib/affiliate';
import { AffiliateStats, AffiliateSaleRecord } from '../types/funnel';

export const PartnerDashboardPage: React.FC = () => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [passwordInput, setPasswordInput] = useState('');
  const [authError, setAuthError] = useState(false);
  const [copied, setCopied] = useState(false);
  const [stats, setStats] = useState<AffiliateStats>(getAffiliateStats('youthphilosophy'));
  const [sales, setSales] = useState<AffiliateSaleRecord[]>(getAffiliateSales('youthphilosophy'));
  const [selectedSource, setSelectedSource] = useState('youtube_vsl');

  // Check stored auth session
  useEffect(() => {
    const isAuth = sessionStorage.getItem('partner_auth') === 'true';
    if (isAuth) {
      setIsAuthenticated(true);
    }
  }, []);

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    if (passwordInput.trim().toLowerCase() === 'youthphilosophy2026' || passwordInput.trim() === 'youth2026') {
      setIsAuthenticated(true);
      sessionStorage.setItem('partner_auth', 'true');
      setAuthError(false);
    } else {
      setAuthError(true);
    }
  };

  const affiliateUrl = `https://elevateweb.me/self-trust?ref=youthphilosophy&source=${selectedSource}`;

  const handleCopyLink = () => {
    navigator.clipboard.writeText(affiliateUrl);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  // Test simulation tool for the YouTuber to see live updates
  const handleSimulateSale = () => {
    const amount = 299;
    const tierName = 'The Self-Trust Protocol Bundle';
    const indianCities = ['Mumbai', 'Delhi', 'Jaipur', 'Pune', 'Lucknow', 'Kota', 'Indore', 'Hyderabad'];
    const randomCity = indianCities[Math.floor(Math.random() * indianCities.length)];
    const randomNames = ['Aarav', 'Dev', 'Aditya', 'Vikram', 'Sahil', 'Pranav'];
    const customerName = `${randomNames[Math.floor(Math.random() * randomNames.length)]} (${randomCity})`;

    recordAffiliateSale({
      tierId: 'tier-2-core-os',
      tierName,
      amount,
      customerName,
      paymentId: `pay_test_${Date.now().toString().slice(-6)}`
    });

    setStats(getAffiliateStats('youthphilosophy'));
    setSales(getAffiliateSales('youthphilosophy'));
  };

  if (!isAuthenticated) {
    return (
      <div className="min-h-screen bg-[#050811] text-slate-100 flex items-center justify-center p-6 selection:bg-rose-500 selection:text-white">
        <div className="w-full max-w-md p-8 rounded-3xl bg-slate-900/80 border border-slate-800 shadow-2xl backdrop-blur-xl">
          <div className="w-14 h-14 rounded-2xl bg-gradient-to-tr from-rose-600 to-amber-500 flex items-center justify-center mx-auto mb-6 shadow-lg shadow-rose-500/20">
            <Lock className="w-7 h-7 text-white" />
          </div>

          <h2 className="text-2xl font-black text-center text-white tracking-tight mb-2">
            Partner Revenue Portal
          </h2>
          <p className="text-xs text-center text-slate-400 mb-6">
            Confidential affiliate dashboard for <strong>@youthphilosophy22</strong>. Enter your creator key to access real-time earnings.
          </p>

          <form onSubmit={handleLogin} className="space-y-4">
            <div>
              <label className="block text-xs font-mono uppercase tracking-wider text-slate-400 mb-2">
                Partner Security Passcode
              </label>
              <input
                type="password"
                placeholder="Enter password (e.g. youthphilosophy2026)"
                value={passwordInput}
                onChange={(e) => setPasswordInput(e.target.value)}
                className="w-full px-4 py-3.5 rounded-xl bg-slate-950 border border-slate-700 focus:border-rose-500 focus:ring-1 focus:ring-rose-500 text-sm text-white placeholder:text-slate-600 outline-none transition-all"
                autoFocus
              />
              {authError && (
                <p className="text-xs text-rose-400 mt-2">
                  Incorrect passcode. Please check with your operator or use <code className="text-white">youthphilosophy2026</code>.
                </p>
              )}
            </div>

            <button
              type="submit"
              className="w-full py-4 rounded-xl bg-gradient-to-r from-rose-600 via-rose-500 to-amber-500 hover:from-rose-500 hover:to-amber-400 text-white font-bold text-sm tracking-wider uppercase transition-all shadow-lg shadow-rose-600/30 active:scale-[0.98]"
            >
              Unlock Partner Dashboard
            </button>
          </form>

          <div className="mt-6 pt-6 border-t border-slate-800/80 text-center">
            <p className="text-[11px] text-slate-500 font-mono">
              ElevateWeb Automation Engine • 50/50 Revenue Split Verified
            </p>
          </div>
        </div>
      </div>
    );
  }

  const conversionRate = stats.totalClicks > 0 
    ? ((stats.totalSales / stats.totalClicks) * 100).toFixed(1) 
    : '0';

  return (
    <div className="min-h-screen bg-[#050811] text-slate-100 font-sans pb-24 selection:bg-rose-500 selection:text-white">
      {/* Top Header Bar */}
      <header className="border-b border-slate-800/80 bg-slate-950/60 backdrop-blur-xl sticky top-0 z-40">
        <div className="max-w-6xl mx-auto px-6 py-4 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-gradient-to-tr from-rose-600 to-amber-500 flex items-center justify-center font-black text-white text-sm">
              YP
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h1 className="font-bold text-white text-base">@youthphilosophy22</h1>
                <span className="px-2 py-0.5 rounded-full bg-emerald-500/10 border border-emerald-500/30 text-[10px] font-mono text-emerald-400 font-bold">
                  50% VIP REV-SHARE
                </span>
              </div>
              <p className="text-[11px] text-slate-400 font-mono">The Self-Trust Protocol Partnership</p>
            </div>
          </div>

          <div className="flex items-center gap-3">
            <a
              href="/self-trust"
              target="_blank"
              rel="noopener noreferrer"
              className="hidden sm:flex items-center gap-1.5 px-3.5 py-1.5 rounded-lg bg-slate-900 border border-slate-800 text-xs font-medium text-slate-300 hover:text-white hover:border-slate-700 transition-colors"
            >
              <span>View Live Funnel</span>
              <ExternalLink className="w-3.5 h-3.5" />
            </a>
            <button
              onClick={() => {
                sessionStorage.removeItem('partner_auth');
                setIsAuthenticated(false);
              }}
              className="text-xs text-slate-500 hover:text-slate-300 font-mono transition-colors"
            >
              Lock
            </button>
          </div>
        </div>
      </header>

      <main className="max-w-6xl mx-auto px-6 pt-8 space-y-8">
        
        {/* Creator Share Highlight Card */}
        <div className="relative overflow-hidden rounded-3xl bg-gradient-to-br from-slate-900 via-slate-900/90 to-rose-950/40 border border-rose-500/30 p-8 shadow-2xl">
          <div className="absolute top-0 right-0 w-80 h-80 bg-rose-500/10 rounded-full blur-3xl pointer-events-none" />
          
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center relative z-10">
            <div className="lg:col-span-7 space-y-3">
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-rose-500/10 border border-rose-500/30 text-rose-400 text-xs font-mono">
                <Sparkles className="w-3.5 h-3.5" />
                <span>AUTOMATED WEEKLY PAYOUT SYSTEM</span>
              </div>
              <p className="text-xs font-mono uppercase tracking-wider text-slate-400">Your Current 50% Share</p>
              <div className="flex items-baseline gap-3">
                <span className="text-5xl sm:text-6xl font-black text-transparent bg-clip-text bg-gradient-to-r from-emerald-400 via-teal-300 to-cyan-400 tracking-tight">
                  ₹{stats.partnerPayout.toLocaleString()}
                </span>
                <span className="text-sm text-slate-400 font-mono">INR</span>
              </div>
              <p className="text-sm text-slate-300 leading-relaxed max-w-xl">
                Calculated in real-time from all attributed conversions of The Self-Trust Protocol (₹299). Paid out directly to your registered UPI ID every Monday.
              </p>
            </div>

            <div className="lg:col-span-5 bg-slate-950/80 rounded-2xl p-6 border border-slate-800 space-y-4">
              <div className="flex items-center justify-between text-xs text-slate-400">
                <span>Gross Funnel Revenue</span>
                <span className="font-bold text-white font-mono">₹{stats.grossRevenue.toLocaleString()}</span>
              </div>
              <div className="flex items-center justify-between text-xs text-slate-400">
                <span>Your Commission Split</span>
                <span className="font-bold text-emerald-400 font-mono">50.0%</span>
              </div>
              <div className="flex items-center justify-between text-xs text-slate-400">
                <span>Payout Frequency</span>
                <span className="font-bold text-white">Every Monday (Automated UPI)</span>
              </div>
              <div className="pt-2 border-t border-slate-800/80 flex items-center justify-between text-xs">
                <span className="text-slate-400">Registered UPI ID:</span>
                <span className="font-mono text-cyan-400 font-bold">youthphilosophy@okhdfcbank</span>
              </div>
            </div>
          </div>
        </div>

        {/* 4 Metric Cards */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 sm:gap-6">
          <div className="p-5 rounded-2xl bg-slate-900/60 border border-slate-800 space-y-2">
            <div className="flex items-center justify-between text-slate-400">
              <span className="text-xs font-mono uppercase tracking-wider">Total Clicks</span>
              <MousePointerClick className="w-4 h-4 text-cyan-400" />
            </div>
            <div className="text-3xl font-black text-white">{stats.totalClicks.toLocaleString()}</div>
            <p className="text-[11px] text-slate-500 font-mono">Cookie attribution: 30 days</p>
          </div>

          <div className="p-5 rounded-2xl bg-slate-900/60 border border-slate-800 space-y-2">
            <div className="flex items-center justify-between text-slate-400">
              <span className="text-xs font-mono uppercase tracking-wider">Free Leads</span>
              <Users className="w-4 h-4 text-amber-400" />
            </div>
            <div className="text-3xl font-black text-white">{stats.freeLeads.toLocaleString()}</div>
            <p className="text-[11px] text-slate-500 font-mono">Chapters 1–3 downloaders</p>
          </div>

          <div className="p-5 rounded-2xl bg-slate-900/60 border border-slate-800 space-y-2">
            <div className="flex items-center justify-between text-slate-400">
              <span className="text-xs font-mono uppercase tracking-wider">Paid Sales</span>
              <TrendingUp className="w-4 h-4 text-emerald-400" />
            </div>
            <div className="text-3xl font-black text-white">{stats.totalSales.toLocaleString()}</div>
            <p className="text-[11px] text-slate-500 font-mono">The Self-Trust Protocol (₹299)</p>
          </div>

          <div className="p-5 rounded-2xl bg-slate-900/60 border border-slate-800 space-y-2">
            <div className="flex items-center justify-between text-slate-400">
              <span className="text-xs font-mono uppercase tracking-wider">Conversion</span>
              <Zap className="w-4 h-4 text-rose-400" />
            </div>
            <div className="text-3xl font-black text-white">{conversionRate}%</div>
            <p className="text-[11px] text-slate-500 font-mono">Clicks to paid buyers</p>
          </div>
        </div>

        {/* Affiliate Link Generator */}
        <div className="p-6 rounded-3xl bg-slate-900/70 border border-slate-800 space-y-4">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
            <div>
              <h3 className="text-lg font-bold text-white">Your Dedicated Referral Link</h3>
              <p className="text-xs text-slate-400">
                Drop this link in your YouTube descriptions, pinned comments, and community posts. Any viewer who buys within 30 days is credited to you.
              </p>
            </div>
            
            <div className="flex items-center gap-2">
              <span className="text-xs text-slate-400 font-mono">Placement:</span>
              <select
                value={selectedSource}
                onChange={(e) => setSelectedSource(e.target.value)}
                className="bg-slate-950 border border-slate-700 text-xs rounded-lg px-2.5 py-1.5 text-slate-200 outline-none"
              >
                <option value="youtube_vsl">YouTube Video Description</option>
                <option value="pinned_comment">Pinned Comment</option>
                <option value="community_post">Community Tab Post</option>
                <option value="instagram_bio">Instagram Bio</option>
              </select>
            </div>
          </div>

          <div className="flex items-center gap-2 p-2 rounded-2xl bg-slate-950 border border-slate-800">
            <input
              type="text"
              readOnly
              value={affiliateUrl}
              className="flex-1 bg-transparent px-3 text-xs sm:text-sm font-mono text-cyan-300 outline-none"
            />
            <button
              onClick={handleCopyLink}
              className="flex items-center gap-1.5 px-5 py-2.5 rounded-xl bg-gradient-to-r from-rose-600 to-amber-500 hover:from-rose-500 hover:to-amber-400 text-white font-bold text-xs uppercase tracking-wider transition-all shadow-md active:scale-95 shrink-0"
            >
              {copied ? (
                <>
                  <Check className="w-4 h-4" />
                  <span>Copied ✓</span>
                </>
              ) : (
                <>
                  <Copy className="w-4 h-4" />
                  <span>Copy Link</span>
                </>
              )}
            </button>
          </div>
        </div>

        {/* Real-time Sales Feed & Live Simulator */}
        <div className="space-y-4">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
            <div>
              <h3 className="text-lg font-bold text-white">Recent Attributed Conversions</h3>
              <p className="text-xs text-slate-400">Instant updates when viewers complete UPI checkout.</p>
            </div>

            {/* Test Simulation Controls */}
            <div className="flex items-center gap-2">
              <span className="text-[11px] text-slate-500 font-mono">Operator Test:</span>
              <button
                onClick={() => handleSimulateSale()}
                className="px-3.5 py-1.5 rounded-lg bg-rose-950/60 border border-rose-500/30 hover:bg-rose-900/60 text-rose-300 text-xs font-mono transition-colors"
                title="Test ₹299 bundle referral order"
              >
                + Test ₹299 Sale (50% Split)
              </button>
            </div>
          </div>

          <div className="overflow-x-auto rounded-2xl border border-slate-800 bg-slate-900/40">
            <table className="w-full text-left text-xs">
              <thead className="bg-slate-950/80 text-slate-400 font-mono uppercase text-[10px] tracking-wider border-b border-slate-800">
                <tr>
                  <th className="py-3 px-4">Time</th>
                  <th className="py-3 px-4">Customer</th>
                  <th className="py-3 px-4">Tier Ordered</th>
                  <th className="py-3 px-4">Amount</th>
                  <th className="py-3 px-4 text-emerald-400 font-bold">Your 50% Cut</th>
                  <th className="py-3 px-4">Status</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-800/60 font-sans">
                {sales.map((sale) => (
                  <tr key={sale.id} className="hover:bg-slate-800/30 transition-colors">
                    <td className="py-3 px-4 text-slate-400 font-mono text-[11px]">{sale.timestamp}</td>
                    <td className="py-3 px-4 font-bold text-white">{sale.customerName}</td>
                    <td className="py-3 px-4 text-slate-300">
                      <span className={`inline-block px-2 py-0.5 rounded text-[10px] font-mono ${
                        sale.tierId === 'tier-2-core-os' 
                          ? 'bg-rose-500/10 text-rose-300 border border-rose-500/30' 
                          : 'bg-cyan-500/10 text-cyan-300 border border-cyan-500/30'
                      }`}>
                        {sale.tierName}
                      </span>
                    </td>
                    <td className="py-3 px-4 font-mono font-bold text-white">₹{sale.amount}</td>
                    <td className="py-3 px-4 font-mono font-bold text-emerald-400">+₹{sale.commission.toFixed(2)}</td>
                    <td className="py-3 px-4">
                      <span className="inline-flex items-center gap-1 text-[10px] font-mono text-emerald-400">
                        <ShieldCheck className="w-3 h-3" />
                        <span>Captured</span>
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

      </main>
    </div>
  );
};
