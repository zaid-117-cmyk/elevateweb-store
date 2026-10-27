import React, { useState, useEffect } from 'react';
import { 
  Flame, 
  CheckCircle2, 
  Download, 
  Send, 
  ExternalLink, 
  Plus, 
  Minus, 
  ShieldCheck, 
  Clock, 
  BookOpen, 
  Sparkles,
  ArrowRight
} from 'lucide-react';
import confetti from 'canvas-confetti';
import { LedgerEntry, UserStreakProfile } from '../types/funnel';
import { initiateCheckout } from '../lib/razorpay';
import { FUNNEL_TIERS } from '../lib/products';
import { getStoredAffiliateRef } from '../lib/affiliate';

export const UserDashboardPage: React.FC = () => {
  // Load or initialize user profile from storage
  const [profile, setProfile] = useState<UserStreakProfile>(() => {
    try {
      const stored = localStorage.getItem('self_trust_user_profile');
      if (stored) return JSON.parse(stored);
    } catch (e) {
      console.error(e);
    }
    return {
      id: 'usr_default',
      name: 'Rohan Sharma',
      email: 'rohan.sharma@example.com',
      whatsapp: '+91 98765 43210',
      tier: 'tier-2-core-os',
      currentStreak: 6,
      longestStreak: 14,
      lastCheckInDate: '',
      totalDeposits: 60,
      totalWithdrawals: 15,
      ledgerEntries: [
        {
          id: 'ent-1',
          type: 'deposit',
          title: '90-min Deep Work Block without Phone',
          points: 10,
          category: 'Deep Work',
          timestamp: 'Today, 10:30 AM',
          date: new Date().toISOString().split('T')[0]
        },
        {
          id: 'ent-2',
          type: 'deposit',
          title: '20-Foot Phone Air-Gap (Protected Morning)',
          points: 10,
          category: 'Phone Air-Gap',
          timestamp: 'Today, 08:15 AM',
          date: new Date().toISOString().split('T')[0]
        },
        {
          id: 'ent-3',
          type: 'withdrawal',
          title: 'Scrolled Instagram Reels at 2 AM',
          points: 15,
          category: 'Reels / Distraction',
          timestamp: 'Yesterday, 02:15 AM',
          date: new Date().toISOString().split('T')[0]
        }
      ],
      telegramUnlocked: true,
      telegramInviteLink: 'https://t.me/+SelfTrustVIP_demo9841',
      telegramLinkExpiresAt: new Date(Date.now() + 22 * 60 * 60 * 1000).toISOString()
    };
  });

  const [hasCheckedInToday, setHasCheckedInToday] = useState(false);
  const [showDepositModal, setShowDepositModal] = useState(false);
  const [showWithdrawalModal, setShowWithdrawalModal] = useState(false);
  const [newTitle, setNewTitle] = useState('');
  const [newCategory, setNewCategory] = useState<any>('Deep Work');
  const [downloadSuccess, setDownloadSuccess] = useState(false);
  const [timeLeft] = useState('21h 48m');

  const todayStr = new Date().toISOString().split('T')[0];

  useEffect(() => {
    if (profile.lastCheckInDate === todayStr) {
      setHasCheckedInToday(true);
    }
  }, [profile.lastCheckInDate, todayStr]);

  // Save changes to profile
  const saveProfile = (updated: UserStreakProfile) => {
    setProfile(updated);
    try {
      localStorage.setItem('self_trust_user_profile', JSON.stringify(updated));
    } catch (e) {
      console.error(e);
    }
  };

  // Streak check-in
  const handleCheckIn = () => {
    if (hasCheckedInToday) return;

    confetti({
      particleCount: 80,
      spread: 60,
      origin: { y: 0.7 },
      colors: ['#f43f5e', '#fbbf24', '#38bdf8']
    });

    const newStreak = profile.currentStreak + 1;
    const newLongest = Math.max(newStreak, profile.longestStreak);

    const checkInDeposit: LedgerEntry = {
      id: `dep-${Date.now()}`,
      type: 'deposit',
      title: 'Daily Promise Kept (90-Min Focus Block)',
      points: 10,
      category: 'Discipline',
      timestamp: 'Just now',
      date: todayStr
    };

    const updated: UserStreakProfile = {
      ...profile,
      currentStreak: newStreak,
      longestStreak: newLongest,
      lastCheckInDate: todayStr,
      totalDeposits: profile.totalDeposits + 10,
      ledgerEntries: [checkInDeposit, ...profile.ledgerEntries]
    };

    saveProfile(updated);
    setHasCheckedInToday(true);
  };

  const handleAddDeposit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newTitle.trim()) return;

    const entry: LedgerEntry = {
      id: `dep-${Date.now()}`,
      type: 'deposit',
      title: newTitle.trim(),
      points: 10,
      category: newCategory,
      timestamp: 'Just now',
      date: todayStr
    };

    saveProfile({
      ...profile,
      totalDeposits: profile.totalDeposits + 10,
      ledgerEntries: [entry, ...profile.ledgerEntries]
    });

    setNewTitle('');
    setShowDepositModal(false);
  };

  const handleAddWithdrawal = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newTitle.trim()) return;

    const entry: LedgerEntry = {
      id: `wit-${Date.now()}`,
      type: 'withdrawal',
      title: newTitle.trim(),
      points: 15,
      category: newCategory,
      timestamp: 'Just now',
      date: todayStr
    };

    saveProfile({
      ...profile,
      totalWithdrawals: profile.totalWithdrawals + 15,
      ledgerEntries: [entry, ...profile.ledgerEntries]
    });

    setNewTitle('');
    setShowWithdrawalModal(false);
  };

  const handleDownloadPDF = () => {
    setDownloadSuccess(true);
    // Simulate generating personalized watermarked download
    const link = document.createElement('a');
    link.href = '/self_trust_tablet_mockup.jpg'; // or real PDF link
    link.download = `The_Self_Trust_Protocol_Licensed_${profile.name.replace(/\s+/g, '_')}.pdf`;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);

    setTimeout(() => setDownloadSuccess(false), 3000);
  };

  const handleUpgradeToVIP = () => {
    const tier2 = FUNNEL_TIERS.find(t => t.id === 'tier-2-core-os')!;
    initiateCheckout({
      tier: { ...tier2, price: 400 }, // discount for existing tier 1 buyer
      customer: { name: profile.name, email: profile.email, phone: profile.whatsapp },
      ref: getStoredAffiliateRef(),
      onSuccess: () => {
        saveProfile({
          ...profile,
          tier: 'tier-2-core-os',
          telegramUnlocked: true,
          telegramInviteLink: 'https://t.me/+SelfTrustVIP_upgraded'
        });
        alert('🎉 Upgrade successful! Welcome to the VIP Telegram Circle.');
      }
    });
  };

  const totalPoints = profile.totalDeposits + profile.totalWithdrawals;
  const selfTrustRatio = totalPoints > 0 
    ? Math.round((profile.totalDeposits / totalPoints) * 100) 
    : 100;

  return (
    <div className="min-h-screen bg-[#050811] text-slate-100 font-sans pb-24 selection:bg-rose-500 selection:text-white">
      {/* Header */}
      <header className="border-b border-slate-800/80 bg-slate-950/60 backdrop-blur-xl sticky top-0 z-40">
        <div className="max-w-6xl mx-auto px-6 py-4 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-9 h-9 rounded-xl bg-gradient-to-tr from-rose-600 to-amber-500 flex items-center justify-center font-black text-white text-xs">
              OS
            </div>
            <div>
              <h1 className="font-bold text-white text-sm">Self-Trust Execution OS</h1>
              <p className="text-[11px] text-slate-400 font-mono">
                Operator: <span className="text-white font-medium">{profile.name}</span>
              </p>
            </div>
          </div>

          <div className="flex items-center gap-2">
            <span className={`px-3 py-1 rounded-full text-xs font-mono font-bold border ${
              profile.tier === 'tier-2-core-os'
                ? 'bg-rose-500/10 border-rose-500/30 text-rose-300'
                : 'bg-cyan-500/10 border-cyan-500/30 text-cyan-300'
            }`}>
              {profile.tier === 'tier-2-core-os' ? 'VIP TELEGRAM TIER' : 'STARTER TIER'}
            </span>
          </div>
        </div>
      </header>

      <main className="max-w-6xl mx-auto px-6 pt-8 space-y-8">
        
        {/* Streak & Promise Button Hero */}
        <div className="p-8 rounded-3xl bg-gradient-to-br from-slate-900 via-slate-900/90 to-rose-950/30 border border-slate-800 shadow-2xl relative overflow-hidden">
          <div className="absolute top-0 right-0 w-72 h-72 bg-amber-500/10 rounded-full blur-3xl pointer-events-none" />

          <div className="grid grid-cols-1 md:grid-cols-12 gap-6 items-center relative z-10">
            <div className="md:col-span-7 space-y-3">
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-amber-500/10 border border-amber-500/30 text-amber-400 text-xs font-mono">
                <Flame className="w-3.5 h-3.5 fill-amber-400" />
                <span>DAILY INTEGRITY AUDIT</span>
              </div>
              
              <div className="flex items-baseline gap-4">
                <span className="text-6xl sm:text-7xl font-black text-transparent bg-clip-text bg-gradient-to-r from-amber-400 via-rose-400 to-rose-500 tracking-tight">
                  {profile.currentStreak}
                </span>
                <div>
                  <span className="text-xl sm:text-2xl font-bold text-white block">Day Discipline Streak</span>
                  <span className="text-xs text-slate-400 font-mono">Personal Best: {profile.longestStreak} Days</span>
                </div>
              </div>

              <p className="text-sm text-slate-300 max-w-lg leading-relaxed">
                Every time you keep a promise to yourself without negotiation, your prefrontal cortex strengthens. Did you protect your focus today?
              </p>
            </div>

            <div className="md:col-span-5 flex flex-col justify-center">
              <button
                onClick={handleCheckIn}
                disabled={hasCheckedInToday}
                className={`w-full py-5 px-6 rounded-2xl font-bold text-base uppercase tracking-wider transition-all duration-300 shadow-xl flex items-center justify-center gap-3 ${
                  hasCheckedInToday
                    ? 'bg-emerald-500/20 text-emerald-400 border border-emerald-500/40 cursor-default'
                    : 'bg-gradient-to-r from-rose-600 via-rose-500 to-amber-500 hover:from-rose-500 hover:to-amber-400 text-white shadow-rose-600/30 hover:scale-[1.02] active:scale-[0.98]'
                }`}
              >
                {hasCheckedInToday ? (
                  <>
                    <CheckCircle2 className="w-5 h-5 text-emerald-400" />
                    <span>Promise Kept For Today ✓</span>
                  </>
                ) : (
                  <>
                    <Flame className="w-5 h-5 fill-white" />
                    <span>I Kept My Promise Today 🔥</span>
                  </>
                )}
              </button>
              <p className="text-[11px] text-center text-slate-500 font-mono mt-2">
                {hasCheckedInToday ? 'Streak logged. See you tomorrow at 8:00 AM.' : 'Click to log +10 deposit & increment your streak.'}
              </p>
            </div>
          </div>
        </div>

        {/* 2-Column Grid: Digital Ledger on Left, Vault & Telegram on Right */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
          
          {/* Left Column (7 cols): The Digital Self-Trust Ledger */}
          <div className="lg:col-span-7 space-y-6">
            <div className="p-6 rounded-3xl bg-slate-900/60 border border-slate-800 space-y-6">
              
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
                <div>
                  <h2 className="text-xl font-bold text-white flex items-center gap-2">
                    <span>The Self-Trust Ledger</span>
                    <span className="text-xs px-2.5 py-0.5 rounded-full bg-slate-800 text-slate-300 font-mono font-normal">
                      Chapter 09 System
                    </span>
                  </h2>
                  <p className="text-xs text-slate-400">
                    Replace affirmations with mathematical proof of your kept promises.
                  </p>
                </div>

                {/* Score Ratio Pill */}
                <div className="px-4 py-2 rounded-2xl bg-slate-950 border border-slate-800 text-right">
                  <span className="text-[10px] font-mono uppercase text-slate-500 block">Trust Ratio</span>
                  <span className="text-lg font-black text-emerald-400 font-mono">{selfTrustRatio}%</span>
                </div>
              </div>

              {/* Deposit & Withdrawal Balance Summary */}
              <div className="grid grid-cols-2 gap-4">
                <div className="p-4 rounded-2xl bg-emerald-500/5 border border-emerald-500/20">
                  <span className="text-[10px] font-mono uppercase tracking-wider text-emerald-400 block mb-1">
                    Total Deposits (+10)
                  </span>
                  <span className="text-2xl font-black text-white font-mono">{profile.totalDeposits} pts</span>
                </div>

                <div className="p-4 rounded-2xl bg-rose-500/5 border border-rose-500/20">
                  <span className="text-[10px] font-mono uppercase tracking-wider text-rose-400 block mb-1">
                    Total Withdrawals (-15)
                  </span>
                  <span className="text-2xl font-black text-white font-mono">{profile.totalWithdrawals} pts</span>
                </div>
              </div>

              {/* Action Buttons */}
              <div className="flex items-center gap-3">
                <button
                  onClick={() => setShowDepositModal(true)}
                  className="flex-1 py-3 px-4 rounded-xl bg-emerald-500/10 hover:bg-emerald-500/20 border border-emerald-500/30 text-emerald-400 text-xs font-bold font-mono uppercase tracking-wider flex items-center justify-center gap-2 transition-all"
                >
                  <Plus className="w-4 h-4" />
                  <span>Log Deposit (+10)</span>
                </button>

                <button
                  onClick={() => setShowWithdrawalModal(true)}
                  className="flex-1 py-3 px-4 rounded-xl bg-rose-500/10 hover:bg-rose-500/20 border border-rose-500/30 text-rose-400 text-xs font-bold font-mono uppercase tracking-wider flex items-center justify-center gap-2 transition-all"
                >
                  <Minus className="w-4 h-4" />
                  <span>Log Withdrawal (-15)</span>
                </button>
              </div>

              {/* Ledger History Entries */}
              <div className="space-y-2.5 pt-2">
                <span className="text-[11px] font-mono uppercase tracking-wider text-slate-500 block">
                  Recent Ledger Entries
                </span>

                {profile.ledgerEntries.map((entry) => (
                  <div
                    key={entry.id}
                    className="p-3.5 rounded-2xl bg-slate-950/80 border border-slate-800/80 flex items-center justify-between text-xs"
                  >
                    <div className="space-y-0.5">
                      <div className="flex items-center gap-2">
                        <span className={`w-2 h-2 rounded-full ${entry.type === 'deposit' ? 'bg-emerald-400' : 'bg-rose-500'}`} />
                        <span className="font-bold text-white">{entry.title}</span>
                      </div>
                      <span className="text-[10px] text-slate-500 font-mono ml-4">
                        {entry.category} • {entry.timestamp}
                      </span>
                    </div>

                    <span className={`font-mono font-bold text-sm ${entry.type === 'deposit' ? 'text-emerald-400' : 'text-rose-400'}`}>
                      {entry.type === 'deposit' ? `+${entry.points}` : `-${entry.points}`}
                    </span>
                  </div>
                ))}
              </div>

            </div>
          </div>

          {/* Right Column (5 cols): VIP Telegram Gate & Digital Vault */}
          <div className="lg:col-span-5 space-y-6">
            
            {/* VIP Telegram Gate Card */}
            {profile.telegramUnlocked ? (
              <div className="p-6 rounded-3xl bg-gradient-to-br from-slate-900 to-sky-950/40 border border-sky-500/30 shadow-xl space-y-4">
                <div className="flex items-center justify-between">
                  <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-sky-500/10 border border-sky-500/30 text-sky-400 text-xs font-mono">
                    <Send className="w-3.5 h-3.5" />
                    <span>PRIVATE TELEGRAM TRIBE</span>
                  </div>
                  <span className="text-[11px] font-mono text-amber-400 flex items-center gap-1">
                    <Clock className="w-3 h-3" />
                    <span>Link expires in {timeLeft}</span>
                  </span>
                </div>

                <div>
                  <h3 className="text-lg font-bold text-white">VIP Daily Accountability Circle</h3>
                  <p className="text-xs text-slate-300 leading-relaxed mt-1">
                    Automated check-ins at 8:00 AM & 9:00 PM. No toxic noise. High-conviction creators and students executing together.
                  </p>
                </div>

                <a
                  href={profile.telegramInviteLink || 'https://t.me/+SelfTrustVIP'}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-full py-3.5 rounded-xl bg-gradient-to-r from-sky-500 to-blue-600 hover:from-sky-400 hover:to-blue-500 text-slate-950 font-bold text-xs uppercase tracking-wider flex items-center justify-center gap-2 shadow-lg shadow-sky-500/25 transition-all"
                >
                  <Send className="w-4 h-4" />
                  <span>Join VIP Telegram Group (1-Click)</span>
                  <ExternalLink className="w-3.5 h-3.5" />
                </a>

                <div className="text-[10px] text-slate-500 font-mono text-center">
                  Single-use invite link stamped specifically to {profile.email}
                </div>
              </div>
            ) : (
              /* Upgrade to Telegram Gate Card (For ₹99 Buyers) */
              <div className="p-6 rounded-3xl bg-slate-900/80 border border-slate-800 space-y-4">
                <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-rose-500/10 border border-rose-500/30 text-rose-400 text-xs font-mono">
                  <Sparkles className="w-3.5 h-3.5" />
                  <span>COMMUNITY UPGRADE AVAILABLE</span>
                </div>

                <h3 className="text-base font-bold text-white">Join the VIP Telegram Tribe</h3>
                <p className="text-xs text-slate-400 leading-relaxed">
                  You are currently on the Starter tier. Upgrade now to get the 8:00 AM & 9:00 PM Accountability Bot, community moderation, and weekly live AMAs.
                </p>

                <button
                  onClick={handleUpgradeToVIP}
                  className="w-full py-3 rounded-xl bg-gradient-to-r from-rose-600 to-amber-500 text-white font-bold text-xs uppercase tracking-wider flex items-center justify-center gap-2 shadow-lg transition-all"
                >
                  <span>Upgrade to VIP OS — Just ₹400</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </button>
              </div>
            )}

            {/* My Digital Vault (Downloads & External Templates) */}
            <div className="p-6 rounded-3xl bg-slate-900/60 border border-slate-800 space-y-4">
              <h3 className="text-base font-bold text-white flex items-center gap-2">
                <BookOpen className="w-4 h-4 text-cyan-400" />
                <span>My Product Deliverables</span>
              </h3>

              {/* Watermarked Master PDF Download */}
              <div className="p-4 rounded-2xl bg-slate-950 border border-slate-800 space-y-3">
                <div className="flex items-start justify-between">
                  <div>
                    <h4 className="text-sm font-bold text-white">The Self-Trust Protocol (49-Page PDF)</h4>
                    <p className="text-[11px] text-slate-400">Localized Indian Gen-Z Edition • 10.6 MB</p>
                  </div>
                  <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-emerald-500/10 text-emerald-400 border border-emerald-500/20">
                    ANTI-PIRACY
                  </span>
                </div>

                <div className="p-2.5 rounded-xl bg-slate-900 text-[10px] font-mono text-slate-400 border border-slate-800/80">
                  <ShieldCheck className="w-3 h-3 text-emerald-400 inline mr-1.5" />
                  <span>Licensed to: {profile.name} ({profile.whatsapp})</span>
                </div>

                <button
                  onClick={handleDownloadPDF}
                  className="w-full py-2.5 rounded-xl bg-slate-800 hover:bg-slate-700 text-white text-xs font-bold font-mono flex items-center justify-center gap-2 transition-colors"
                >
                  <Download className="w-3.5 h-3.5" />
                  <span>{downloadSuccess ? 'Downloaded Watermarked Copy ✓' : 'Download Dynamic Watermarked PDF'}</span>
                </button>
              </div>

              {/* Digital Notion Template Link */}
              <div className="p-4 rounded-2xl bg-slate-950 border border-slate-800 flex items-center justify-between">
                <div>
                  <h4 className="text-sm font-bold text-white">The Self-Trust Ledger (Notion OS)</h4>
                  <p className="text-[11px] text-slate-400">1-Click Duplicate to your Notion workspace</p>
                </div>
                <a
                  href="https://notion.so"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="p-2 rounded-xl bg-slate-800 hover:bg-slate-700 text-white transition-colors"
                  title="Open Notion Template"
                >
                  <ExternalLink className="w-4 h-4" />
                </a>
              </div>

              {/* Google Sheets Tracker Link */}
              <div className="p-4 rounded-2xl bg-slate-950 border border-slate-800 flex items-center justify-between">
                <div>
                  <h4 className="text-sm font-bold text-white">Daily Habit Matrix (Google Sheet)</h4>
                  <p className="text-[11px] text-slate-400">Pre-built formulas for deposits/withdrawals</p>
                </div>
                <a
                  href="https://docs.google.com/spreadsheets"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="p-2 rounded-xl bg-slate-800 hover:bg-slate-700 text-white transition-colors"
                  title="Open Google Sheet"
                >
                  <ExternalLink className="w-4 h-4" />
                </a>
              </div>

            </div>

          </div>

        </div>

      </main>

      {/* Modal: Log Deposit */}
      {showDepositModal && (
        <div className="fixed inset-0 z-50 bg-black/80 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="w-full max-w-md bg-slate-900 border border-slate-800 rounded-3xl p-6 space-y-4">
            <h3 className="text-lg font-bold text-white flex items-center gap-2">
              <Plus className="w-5 h-5 text-emerald-400" />
              <span>Log a Self-Trust Deposit (+10 Pts)</span>
            </h3>
            <p className="text-xs text-slate-400">
              A deposit is an undeniable action where you kept a promise to yourself.
            </p>

            <form onSubmit={handleAddDeposit} className="space-y-3">
              <div>
                <label className="block text-[11px] font-mono text-slate-400 mb-1">Commitment Kept</label>
                <input
                  type="text"
                  placeholder="e.g. 90-min JEE block without touching phone"
                  value={newTitle}
                  onChange={(e) => setNewTitle(e.target.value)}
                  className="w-full px-3.5 py-2.5 rounded-xl bg-slate-950 border border-slate-800 text-xs text-white outline-none focus:border-emerald-500"
                  autoFocus
                />
              </div>

              <div>
                <label className="block text-[11px] font-mono text-slate-400 mb-1">Category</label>
                <select
                  value={newCategory}
                  onChange={(e) => setNewCategory(e.target.value)}
                  className="w-full px-3.5 py-2.5 rounded-xl bg-slate-950 border border-slate-800 text-xs text-white outline-none"
                >
                  <option value="Deep Work">Deep Work (90-Min Block)</option>
                  <option value="Phone Air-Gap">Phone Air-Gap (Morning Shield)</option>
                  <option value="Discipline">Discipline / Physical Training</option>
                </select>
              </div>

              <div className="flex items-center gap-2 pt-2">
                <button
                  type="button"
                  onClick={() => setShowDepositModal(false)}
                  className="flex-1 py-2.5 rounded-xl bg-slate-800 hover:bg-slate-700 text-xs text-slate-300 font-bold"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="flex-1 py-2.5 rounded-xl bg-emerald-500 hover:bg-emerald-400 text-xs text-slate-950 font-bold"
                >
                  Add +10 Deposit
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Modal: Log Withdrawal */}
      {showWithdrawalModal && (
        <div className="fixed inset-0 z-50 bg-black/80 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="w-full max-w-md bg-slate-900 border border-slate-800 rounded-3xl p-6 space-y-4">
            <h3 className="text-lg font-bold text-white flex items-center gap-2">
              <Minus className="w-5 h-5 text-rose-500" />
              <span>Log a Self-Trust Withdrawal (-15 Pts)</span>
            </h3>
            <p className="text-xs text-slate-400">
              No shame, just honest data. What caused you to break your commitment?
            </p>

            <form onSubmit={handleAddWithdrawal} className="space-y-3">
              <div>
                <label className="block text-[11px] font-mono text-slate-400 mb-1">What Slipped?</label>
                <input
                  type="text"
                  placeholder="e.g. Scrolled reels for 45 mins in bed"
                  value={newTitle}
                  onChange={(e) => setNewTitle(e.target.value)}
                  className="w-full px-3.5 py-2.5 rounded-xl bg-slate-950 border border-slate-800 text-xs text-white outline-none focus:border-rose-500"
                  autoFocus
                />
              </div>

              <div>
                <label className="block text-[11px] font-mono text-slate-400 mb-1">Category</label>
                <select
                  value={newCategory}
                  onChange={(e) => setNewCategory(e.target.value)}
                  className="w-full px-3.5 py-2.5 rounded-xl bg-slate-950 border border-slate-800 text-xs text-white outline-none"
                >
                  <option value="Reels / Distraction">Reels / Doomscrolling</option>
                  <option value="Relapse / Lust">Relapse / Porn Urge</option>
                  <option value="Procrastination">Procrastination / Overthinking</option>
                </select>
              </div>

              <div className="flex items-center gap-2 pt-2">
                <button
                  type="button"
                  onClick={() => setShowWithdrawalModal(false)}
                  className="flex-1 py-2.5 rounded-xl bg-slate-800 hover:bg-slate-700 text-xs text-slate-300 font-bold"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="flex-1 py-2.5 rounded-xl bg-rose-600 hover:bg-rose-500 text-xs text-white font-bold"
                >
                  Log -15 Withdrawal
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

    </div>
  );
};
