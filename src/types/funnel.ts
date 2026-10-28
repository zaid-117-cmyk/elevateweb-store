export type FunnelTierId = 'free-lead-magnet' | 'tier-1-starter' | 'tier-2-core-os';

export interface FunnelTier {
  id: FunnelTierId;
  name: string;
  badge?: string;
  price: number; // 299
  originalPrice: number; // 999
  headline: string;
  subheadline: string;
  features: string[];
  ctaText: string;
  popular?: boolean;
  upiEnabled?: boolean;
  checkoutUrl?: string;
}

export interface LeadCapture {
  id: string;
  name: string;
  email: string;
  whatsapp: string;
  ref?: string;
  timestamp: string;
}

export interface AffiliateStats {
  refCode: string;
  partnerName: string;
  channel: string;
  totalClicks: number;
  freeLeads: number;
  totalSales: number;
  tier1Sales: number;
  tier2Sales: number;
  grossRevenue: number;
  partnerCommissionRate: number; // 0.5 (50%)
  partnerPayout: number;
}

export interface AffiliateSaleRecord {
  id: string;
  timestamp: string;
  customerName: string;
  tierId: FunnelTierId;
  tierName: string;
  amount: number;
  commission: number;
  ref: string;
  paymentId: string;
}

export interface LedgerEntry {
  id: string;
  type: 'deposit' | 'withdrawal';
  title: string;
  points: number; // +10 for deposit, -15 for withdrawal
  category: 'Deep Work' | 'Phone Air-Gap' | 'Discipline' | 'Reels / Distraction' | 'Relapse / Lust' | 'Procrastination';
  timestamp: string;
  date: string;
}

export interface UserStreakProfile {
  id: string;
  name: string;
  email: string;
  whatsapp: string;
  tier: FunnelTierId;
  currentStreak: number;
  longestStreak: number;
  lastCheckInDate?: string;
  totalDeposits: number;
  totalWithdrawals: number;
  ledgerEntries: LedgerEntry[];
  telegramUnlocked: boolean;
  telegramInviteLink?: string;
  telegramLinkExpiresAt?: string;
}
