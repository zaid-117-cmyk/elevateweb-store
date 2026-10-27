/**
 * Central Lead & Order Dispatcher
 * Sends lead magnet submissions & paid orders to your real-time endpoints:
 * 1. Webhook (Google Sheets / Zapier / Make.com / Formspree)
 * 2. Telegram Admin Bot (Instant phone ping with lead details)
 * 3. LocalStorage backup
 */

import { LeadCapture } from '../types/funnel';

export interface DispatchLeadResult {
  success: boolean;
  message: string;
}

export const dispatchLeadToAdmin = async (lead: LeadCapture): Promise<DispatchLeadResult> => {
  // 1. Always back up in localStorage
  try {
    const existingRaw = localStorage.getItem('self_trust_leads_db');
    const existing: LeadCapture[] = existingRaw ? JSON.parse(existingRaw) : [];
    existing.unshift(lead);
    localStorage.setItem('self_trust_leads_db', JSON.stringify(existing.slice(0, 500)));
  } catch (e) {
    console.error('Local lead save error:', e);
  }

  // 2. Read Webhook URL from environment (e.g., Google Sheet Apps Script or Formspree)
  const webhookUrl = (import.meta as any).env?.VITE_LEADS_WEBHOOK_URL;
  const telegramBotToken = (import.meta as any).env?.VITE_TELEGRAM_BOT_TOKEN;
  const telegramChatId = (import.meta as any).env?.VITE_TELEGRAM_ADMIN_CHAT_ID;

  let dispatched = false;

  // A. Dispatch to Webhook (Google Sheets / Zapier / Formspree)
  if (webhookUrl && webhookUrl.startsWith('http')) {
    try {
      await fetch(webhookUrl, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          type: 'FREE_LEAD_MAGNET',
          name: lead.name,
          email: lead.email,
          whatsapp: lead.whatsapp,
          affiliateRef: lead.ref || 'direct',
          timestamp: lead.timestamp,
          source: window.location.href
        })
      });
      dispatched = true;
    } catch (err) {
      console.warn('Webhook dispatch failed:', err);
    }
  }

  // B. Dispatch Instant Telegram Ping to your Phone
  if (telegramBotToken && telegramChatId) {
    try {
      const text = `🚨 *NEW LEAD CAPTURED!*\n\n👤 *Name:* ${lead.name}\n📧 *Email:* ${lead.email}\n📱 *WhatsApp:* ${lead.whatsapp}\n🤝 *Referral Ref:* \`${lead.ref || 'direct'}\`\n⏰ *Time:* ${new Date().toLocaleString('en-IN', { timeZone: 'Asia/Kolkata' })} IST\n\n🎯 *Product:* Chapters 1-3 Sample PDF`;
      await fetch(`https://api.telegram.org/bot${telegramBotToken}/sendMessage`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          chat_id: telegramChatId,
          text,
          parse_mode: 'Markdown'
        })
      });
      dispatched = true;
    } catch (err) {
      console.warn('Telegram ping dispatch failed:', err);
    }
  }

  return {
    success: true,
    message: dispatched ? 'Lead delivered to admin endpoint' : 'Lead saved to local database'
  };
};

export const dispatchOrderToAdmin = async (order: {
  orderId: string;
  name: string;
  email: string;
  phone: string;
  tierName: string;
  amount: number;
  ref: string;
}) => {
  const webhookUrl = (import.meta as any).env?.VITE_LEADS_WEBHOOK_URL;
  const telegramBotToken = (import.meta as any).env?.VITE_TELEGRAM_BOT_TOKEN;
  const telegramChatId = (import.meta as any).env?.VITE_TELEGRAM_ADMIN_CHAT_ID;

  const orderPayload = {
    type: 'PAID_ORDER',
    orderId: order.orderId,
    name: order.name,
    email: order.email,
    phone: order.phone,
    tierName: order.tierName,
    amount: order.amount,
    creatorCommission: order.amount * 0.50,
    affiliateRef: order.ref || 'youthphilosophy',
    timestamp: new Date().toISOString()
  };

  // Webhook
  if (webhookUrl && webhookUrl.startsWith('http')) {
    try {
      await fetch(webhookUrl, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(orderPayload)
      });
    } catch (e) {
      console.warn('Order webhook failed:', e);
    }
  }

  // Telegram Alert
  if (telegramBotToken && telegramChatId) {
    try {
      const text = `💰 *NEW PAID SALE COMPLETED!*\n\n📦 *Tier:* ${order.tierName}\n💵 *Amount:* ₹${order.amount}\n🤝 *Creator 50% Cut:* ₹${(order.amount * 0.50).toFixed(2)}\n👤 *Buyer:* ${order.name}\n📧 *Email:* ${order.email}\n📱 *WhatsApp:* ${order.phone}\n🔗 *Affiliate:* \`${order.ref}\`\n💳 *Payment ID:* \`${order.orderId}\``;
      await fetch(`https://api.telegram.org/bot${telegramBotToken}/sendMessage`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          chat_id: telegramChatId,
          text,
          parse_mode: 'Markdown'
        })
      });
    } catch (e) {
      console.warn('Order Telegram ping failed:', e);
    }
  }
};
