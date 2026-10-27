// Client-side Token Verification & Anti-Piracy Watermark Generator

export interface WatermarkData {
  name: string;
  email: string;
  phone: string;
  paymentId: string;
  licenseId: string;
  timestamp: number;
  expiresAt: number;
  clicksRemaining: number;
}

export const decodeWatermarkToken = (token: string): WatermarkData | null => {
  try {
    const json = atob(token);
    const parsed = JSON.parse(json);
    return {
      name: parsed.name || 'Valued Reader',
      email: parsed.email || 'user@elevateweb.me',
      phone: parsed.phone || '+91 98765 43210',
      paymentId: parsed.paymentId || 'pay_demo',
      licenseId: `STP-IND-${Math.abs(hashString(parsed.email || 'user')).toString().slice(0, 6)}-SEC`,
      timestamp: parsed.timestamp || Date.now(),
      expiresAt: parsed.expiresAt || (Date.now() + 24 * 60 * 60 * 1000),
      clicksRemaining: parsed.clicksRemaining !== undefined ? parsed.clicksRemaining : 3
    };
  } catch (e) {
    console.error('Error decoding watermark token:', e);
    return null;
  }
};

export const isTokenExpired = (data: WatermarkData): boolean => {
  return Date.now() > data.expiresAt || data.clicksRemaining <= 0;
};

// Generates the personalized text stamp to display on PDF cover and page footers
export const getWatermarkStampText = (data: WatermarkData): string => {
  return `LICENSED SPECIFICALLY TO: ${data.name.toUpperCase()} (${data.email} | ${data.phone}) • LICENSE ID: ${data.licenseId} • DISTRIBUTION OR RESALE FORBIDDEN BY LAW`;
};

// Simple deterministic hash
function hashString(str: string): number {
  let hash = 0;
  for (let i = 0; i < str.length; i++) {
    const char = str.charCodeAt(i);
    hash = (hash << 5) - hash + char;
    hash |= 0;
  }
  return hash;
}
