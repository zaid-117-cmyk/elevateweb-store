# ⚔️ The Self-Trust OS: Operator Backend & Automation Guide
**Partnership:** ElevateWeb × @youthphilosophy22  
**Domain:** `elevateweb.me/self-trust`  

---

## 🚀 System Architecture Overview

```
[YouTube Video / Community Post (?ref=youthphilosophy)]
                     │
                     ▼
       elevateweb.me/self-trust (Clean Berserk Funnel)
                     │
        ┌────────────┴────────────┐
        ▼                         ▼
Free Lead Magnet (₹0)     Paid Tiers (₹99 Tripwire / ₹499 VIP Core)
(Ch. 1-3 Sample PDF)              │
                                  ▼
                     Razorpay Native UPI Checkout
                                  │
         ┌────────────────────────┼────────────────────────┐
         ▼                        ▼                        ▼
Dynamic Anti-Piracy       Automated 50% Share     1-Time Expiring Telegram
PDF Watermarking Stamped   Attributed to Creator    VIP Link (24-Hour TTL)
(Name, Email, WhatsApp)  (partner-dashboard)              │
         │                        │                        ▼
         ▼                        ▼              Telegram Bot Automation
User Execution Dashboard  Weekly UPI Payout       (8 AM & 9 PM Prompts,
(Streak + Ledger OS)      Every Monday            /streak, /relapse, /report)
```

---

## 1. Telegram Bot Deployment

### Prerequisites:
```bash
pip install python-telegram-bot reportlab pypdf
```

### Environment Variables:
```env
TELEGRAM_BOT_TOKEN="your_bot_token_from_botfather"
TELEGRAM_GROUP_ID="@selftrust_vip_group"
ADMIN_USER_ID="your_telegram_user_id"
```

### Running the Bot:
```bash
python server/telegram_bot.py
```

### Bot Capabilities:
- `/start [token]`: Authenticates ₹499 payment, welcomes user, and posts community rules.
- `/streak`: Checks current deep work streak.
- `/relapse`: Resets streak with supportive Berserk message ("Never miss twice. Ek galti se war khatam nahi hoti.").
- `/report`: Flags spam or NSFW content to moderators.
- **8:00 AM IST Scheduled Prompt**: *"Drop your Top 3 Needle-Movers for today. Aaj ka target kya hai? No excuses. Aag laga do."*
- **9:00 PM IST Scheduled Prompt**: *"Check your Self-Trust Ledger. Did you keep your word today or did you slip? Log your deposits."*
- **Automated Moderation**: Auto-bans NSFW links, piracy domains, and toxic slurs.
- **Pinned Safety Helplines**: Indian mental health helplines (KIRAN: `1800-599-0019`, AASRA: `+91-9820466726`, Vandrevala: `+91-9999-666-555`).

---

## 2. Dynamic PDF Anti-Piracy Watermarking

Prevents WhatsApp file sharing by dynamically stamping buyer details across every page.

```bash
python server/watermark_pdf.py <input.pdf> <output.pdf> "<Buyer Name>" "<Buyer Email>" "<Buyer Phone>"
```

Output includes:
- **Header**: `CONFIDENTIAL & RESTRICTED • BERSERK OS • LICENSE: STP-IND-XXXXXX-SEC`
- **Center Diagonal**: Semi-transparent red watermark: `LICENSED TO [NAME] • [EMAIL]`
- **Footer**: `EXCLUSIVE LICENSE TO: [NAME] ([EMAIL] | WhatsApp: [PHONE]) • UNAUTHORIZED RESALE / SHARING ON WHATSAPP IS TRACKED`

---

## 3. Partner Revenue Dashboard (@youthphilosophy22)

- **URL:** [https://elevateweb.me/partner-dashboard](https://elevateweb.me/partner-dashboard)
- **Security Passcode:** `youthphilosophy2026`
- **What the YouTuber sees:**
  - Real-time Total Clicks (with 30-day cookie attribution).
  - Free Leads Captured.
  - Paid Orders Breakdown (₹99 vs ₹499).
  - Gross Revenue.
  - **His 50% Cut in ₹** with registered UPI ID.
  - Dedicated Referral Link with 1-click copy: `https://elevateweb.me/self-trust?ref=youthphilosophy`
  - Live testing buttons to verify conversions.
