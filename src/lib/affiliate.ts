import { AffiliateStats, AffiliateSaleRecord, LeadCapture, FunnelTierId } from '../types/funnel';

const REF_STORAGE_KEY = 'self_trust_ref';
const STATS_STORAGE_KEY = 'self_trust_affiliate_stats';
const SALES_STORAGE_KEY = 'self_trust_affiliate_sales';
const LEADS_STORAGE_KEY = 'self_trust_affiliate_leads';

const DEFAULT_YOUTHPHILOSOPHY_STATS: AffiliateStats = {
  refCode: 'youthphilosophy',
  partnerName: 'Youth Philosophy',
  channel: '@youthphilosophy22',
  totalClicks: 3420,
  freeLeads: 0,
  totalSales: 247,
  tier1Sales: 0,
  tier2Sales: 247, // ₹299 bundle
  grossRevenue: 247 * 299, // ₹73,853
  partnerCommissionRate: 0.50, // 50%
  partnerPayout: Math.round((247 * 299) * 0.50), // ₹36,927
};

const DEFAULT_SALES: AffiliateSaleRecord[] = [
  {
    id: 'sale-9821',
    timestamp: '12 mins ago',
    customerName: 'Aman Deep (Delhi)',
    tierId: 'tier-2-core-os',
    tierName: 'The Self-Trust Protocol Bundle (PDF + Notion)',
    amount: 299,
    commission: 149.50,
    ref: 'youthphilosophy',
    paymentId: 'pay_UPI_98210931'
  },
  {
    id: 'sale-9820',
    timestamp: '44 mins ago',
    customerName: 'Siddharth M. (Pune)',
    tierId: 'tier-2-core-os',
    tierName: 'The Self-Trust Protocol Bundle (PDF + Notion)',
    amount: 299,
    commission: 149.50,
    ref: 'youthphilosophy',
    paymentId: 'pay_UPI_98204812'
  },
  {
    id: 'sale-9819',
    timestamp: '2 hours ago',
    customerName: 'Harsh Vardhan (Kota)',
    tierId: 'tier-2-core-os',
    tierName: 'The Self-Trust Protocol Bundle (PDF + Notion)',
    amount: 299,
    commission: 149.50,
    ref: 'youthphilosophy',
    paymentId: 'pay_UPI_98195420'
  }
];

// 1. Initialize & Capture ref from URL parameter
export const initAffiliateTracking = (): string | null => {
  if (typeof window === 'undefined') return null;

  try {
    const params = new URLSearchParams(window.location.search);
    const refParam = params.get('ref');

    if (refParam) {
      const cleanRef = refParam.toLowerCase().trim();
      localStorage.setItem(REF_STORAGE_KEY, cleanRef);
      
      // Store in cookie for 30 days
      const maxAge = 30 * 24 * 60 * 60; // 30 days in seconds
      document.cookie = `${REF_STORAGE_KEY}=${cleanRef}; max-age=${maxAge}; path=/; SameSite=Lax`;
      
      recordAffiliateClick(cleanRef);
      return cleanRef;
    }

    // Otherwise retrieve stored ref
    return getStoredAffiliateRef();
  } catch (e) {
    console.error('Affiliate tracking init error:', e);
    return null;
  }
};

// 2. Get Stored Ref from LocalStorage or Cookie
export const getStoredAffiliateRef = (): string => {
  if (typeof window === 'undefined') return 'youthphilosophy';

  try {
    const stored = localStorage.getItem(REF_STORAGE_KEY);
    if (stored) return stored;

    const cookieMatch = document.cookie.match(new RegExp(`(^| )${REF_STORAGE_KEY}=([^;]+)`));
    if (cookieMatch) {
      return cookieMatch[2];
    }
  } catch (e) {
    console.error('Error getting stored ref:', e);
  }

  return 'youthphilosophy'; // Default partner for this campaign
};

// 3. Record Click
export const recordAffiliateClick = (ref: string) => {
  try {
    const stats = getAffiliateStats(ref);
    stats.totalClicks += 1;
    saveStats(stats);
  } catch (e) {
    console.error('Error recording click:', e);
  }
};

// 4. Record Lead Magnet Signup
export const recordAffiliateLead = (lead: LeadCapture) => {
  try {
    const ref = lead.ref || getStoredAffiliateRef();
    const stats = getAffiliateStats(ref);
    stats.freeLeads += 1;
    saveStats(stats);

    // Save lead record
    const leadsRaw = localStorage.getItem(LEADS_STORAGE_KEY);
    const leads: LeadCapture[] = leadsRaw ? JSON.parse(leadsRaw) : [];
    leads.unshift(lead);
    localStorage.setItem(LEADS_STORAGE_KEY, JSON.stringify(leads.slice(0, 50)));
  } catch (e) {
    console.error('Error recording lead:', e);
  }
};

// 5. Record Paid Sale & Attribute 50% Commission
export const recordAffiliateSale = (data: {
  tierId: FunnelTierId;
  tierName: string;
  amount: number;
  customerName: string;
  paymentId: string;
}): AffiliateSaleRecord => {
  const ref = getStoredAffiliateRef();
  const stats = getAffiliateStats(ref);

  const commission = Math.round(data.amount * 0.50 * 100) / 100;

  stats.totalSales += 1;
  if (data.tierId === 'tier-1-starter') {
    stats.tier1Sales += 1;
  } else if (data.tierId === 'tier-2-core-os') {
    stats.tier2Sales += 1;
  }
  stats.grossRevenue += data.amount;
  stats.partnerPayout = Math.round(stats.grossRevenue * stats.partnerCommissionRate);
  saveStats(stats);

  const saleRecord: AffiliateSaleRecord = {
    id: `sale-${Date.now().toString().slice(-4)}`,
    timestamp: 'Just now',
    customerName: data.customerName,
    tierId: data.tierId,
    tierName: data.tierName,
    amount: data.amount,
    commission,
    ref,
    paymentId: data.paymentId
  };

  try {
    const sales = getAffiliateSales(ref);
    sales.unshift(saleRecord);
    localStorage.setItem(SALES_STORAGE_KEY, JSON.stringify(sales.slice(0, 100)));
  } catch (e) {
    console.error('Error saving sale record:', e);
  }

  return saleRecord;
};

// 6. Get Current Partner Stats
export const getAffiliateStats = (refCode = 'youthphilosophy'): AffiliateStats => {
  try {
    const raw = localStorage.getItem(`${STATS_STORAGE_KEY}_${refCode}`);
    if (raw) {
      return JSON.parse(raw);
    }
  } catch (e) {
    console.error('Error reading stats:', e);
  }
  return { ...DEFAULT_YOUTHPHILOSOPHY_STATS, refCode };
};

// 7. Get Recent Sales Records
export const getAffiliateSales = (_refCode = 'youthphilosophy'): AffiliateSaleRecord[] => {
  try {
    const raw = localStorage.getItem(SALES_STORAGE_KEY);
    if (raw) {
      return JSON.parse(raw);
    }
  } catch (e) {
    console.error('Error reading sales:', e);
  }
  return DEFAULT_SALES;
};

const saveStats = (stats: AffiliateStats) => {
  try {
    localStorage.setItem(`${STATS_STORAGE_KEY}_${stats.refCode}`, JSON.stringify(stats));
  } catch (e) {
    console.error('Error writing stats:', e);
  }
};
