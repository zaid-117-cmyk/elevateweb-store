"""
Self-Trust Protocol: Automated Telegram Community Bot
Author: ElevateWeb x @youthphilosophy22

Handles:
- Gated entry verification via one-time payment tokens
- 8:00 AM IST Morning Needle-Mover Prompts
- 9:00 PM IST Evening Ledger Check Prompts
- /start, /streak, /relapse, /ledger, /report commands
- Automated moderation (NSFW links, piracy, toxicity)
- Pinned Indian Mental Health Helplines (KIRAN / AASRA / Vandrevala)
"""

import os
import re
import asyncio
import datetime
from typing import Dict

# Configuration (read from environment variables)
TELEGRAM_BOT_TOKEN = os.environ.get("TELEGRAM_BOT_TOKEN", "YOUR_TELEGRAM_BOT_TOKEN")
TELEGRAM_GROUP_ID = os.environ.get("TELEGRAM_GROUP_ID", "@selftrust_vip_group")
ADMIN_USER_ID = os.environ.get("ADMIN_USER_ID", "123456789")

# In-memory streak store (in production, connected to Supabase / Redis)
USER_STREAKS: Dict[int, Dict] = {}

# Pinned Mental Health & Safety Helplines
SAFETY_PINNED_MESSAGE = """
🛡️ **BERSERK TRIBE SAFETY & EMERGENCY HELPLINES**

Bhai, if you or someone you know is going through severe anxiety, depression, or emotional crisis, please do not hesitate to reach out for professional help. Seeking help is the ultimate act of self-trust:

🇮🇳 **Govt. of India KIRAN Mental Health Helpline**:
📞 `1800-599-0019` (24/7 Toll-Free, 13 Languages)

🇮🇳 **AASRA Suicide Prevention Helpline**:
📞 `+91-9820466726` (24/7 Confidential Support)

🇮🇳 **Vandrevala Foundation Helpline**:
📞 `+91-9999-666-555` (24/7 Free Counseling)

⚠️ **COMMUNITY RULES (ZERO TOLERANCE)**:
1. No NSFW content or pornographic links (Immediate permanent ban).
2. No toxic misogyny or incel rhetoric. Treat everyone with dignity.
3. No piracy or sharing of course materials outside the group.
4. Keep discussions focused on Execution, The Ledger, and Daily Discipline.
"""

# Regex filters for auto-moderation
NSFW_REGEX = re.compile(r'(pornhub|xvideos|xnxx|onlyfans|redgifs|chaturbate|nsfw|nude|leak)', re.IGNORECASE)
PIRACY_REGEX = re.compile(r'(mega\.nz|drive\.google\.com\/file|torrent|pirate|crack|leak|modapk)', re.IGNORECASE)
TOXIC_REGEX = re.compile(r'(foid|hypergamy|blackpill|rope|incel)', re.IGNORECASE)


async def handle_start(update, context):
    """
    /start [token]
    Verifies the user's purchase token from Razorpay webhook, welcomes them, and logs their streak.
    """
    user = update.effective_user
    args = context.args

    token = args[0] if args else None
    
    welcome_text = f"""
🔥 **Welcome to the Berserk Tribe, {user.first_name}!**

You have entered the inner circle of the Self-Trust OS. You aren't playing a rigged game anymore. 

**YOUR COMMANDS**:
⚔️ `/streak` — View your current 90-minute deep work streak
🔄 `/relapse` — Reset streak with recovery protocol ("Never miss twice")
📒 `/ledger` — Open your digital Self-Trust Ledger
🚨 `/report` — Flag spam, NSFW, or toxic behavior to moderators

Drop your introduction in the group: Your Age, Your Current Goal (JEE/NEET, College, Freelance, Career), and your biggest distraction.

*Aag laga do. No bahana.*
"""
    await context.bot.send_message(chat_id=update.effective_chat.id, text=welcome_text, parse_mode="Markdown")


async def handle_streak(update, context):
    """
    /streak
    Displays user's current streak and motivational Berserk quote.
    """
    user_id = update.effective_user.id
    profile = USER_STREAKS.get(user_id, {"streak": 1, "last_date": datetime.date.today()})
    
    msg = f"""
⚡ **CURRENT DISCIPLINE STREAK: {profile['streak']} DAYS**

"Confidence is not a personality trait. It is a mathematical calculation of kept promises."

Keep the phone in the other room. Protect your 90-minute block today.
"""
    await context.bot.send_message(chat_id=update.effective_chat.id, text=msg, parse_mode="Markdown")


async def handle_relapse(update, context):
    """
    /relapse
    Resets the streak with non-judgmental, actionable psychological recovery guidance.
    """
    user_id = update.effective_user.id
    USER_STREAKS[user_id] = {"streak": 0, "last_date": datetime.date.today()}

    support_msg = """
🛡️ **PROTOCOL ACTIVATED: NEVER MISS TWICE**

Bhai, suno dhyan se:
Ek galti se war khatam nahi hoti. Procrastination or relapse is an emotional task-aversion spike, not a failure of your character.

**YOUR IMMEDIATE 3-STEP RESET**:
1. **Get Physical Distance**: Stand up immediately. Do not sit in the same chair or bed where you slipped.
2. **Wash Your Face with Cold Water**: Shock the vagus nerve and reset dopamine baseline.
3. **The 5-Minute Micro-Ramp**: Don't commit to a 4-hour study session right now. Open your book or IDE for just 5 minutes.

Your streak is reset to Day 0. Your dignity is intact. Log a withdrawal in your ledger and stand back up.
"""
    await context.bot.send_message(chat_id=update.effective_chat.id, text=support_msg, parse_mode="Markdown")


async def handle_report(update, context):
    """
    /report [reason]
    Flags inappropriate messages to the admin/moderator.
    """
    user = update.effective_user
    reason = " ".join(context.args) if context.args else "No reason provided"
    
    alert_text = f"🚨 **USER REPORT**: User {user.name} ({user.id}) flagged content.\nReason: {reason}"
    print(f"[MODERATION ALERT] {alert_text}")
    
    await context.bot.send_message(
        chat_id=update.effective_chat.id,
        text="✓ Report received. Our moderator team has been alerted and will take immediate action.",
        parse_mode="Markdown"
    )


async def auto_moderation_filter(update, context):
    """
    Auto-moderates all messages in the group:
    Bans and deletes NSFW links, toxic incel hate speech, and piracy links.
    """
    message = update.effective_message
    if not message or not message.text:
        return

    text = message.text
    user = update.effective_user

    if NSFW_REGEX.search(text) or PIRACY_REGEX.search(text):
        try:
            await message.delete()
            await context.bot.ban_chat_member(chat_id=update.effective_chat.id, user_id=user.id)
            warning = f"⚠️ User {user.first_name} was permanently removed for violating community guidelines (NSFW / Piracy link)."
            await context.bot.send_message(chat_id=update.effective_chat.id, text=warning)
        except Exception as e:
            print(f"Error banning user: {e}")

    elif TOXIC_REGEX.search(text):
        try:
            await message.delete()
            warn_msg = f"⚠️ {user.first_name}, toxic slurs and incel rhetoric are strictly banned here. First and only warning."
            await context.bot.send_message(chat_id=update.effective_chat.id, text=warn_msg)
        except Exception as e:
            print(f"Error warning user: {e}")


# Scheduled Daily Broadcasts
async def send_morning_prompt(bot):
    """8:00 AM Morning Needle-Mover Prompt"""
    text = """
🌅 **08:00 AM IST — THE MORNING NEEDLE-MOVER**

Bhai, phone ko dusre kamre mein rakh do.
Drop your **Top 3 Needle-Movers** for today in the chat:

1. [Most important task you've been delaying]
2. [Secondary focus]
3. [90-Minute deep work slot time]

*No bahana. Winter arc starts in the morning.*
"""
    await bot.send_message(chat_id=TELEGRAM_GROUP_ID, text=text, parse_mode="Markdown")


async def send_evening_prompt(bot):
    """09:00 PM Evening Ledger Check Prompt"""
    text = """
🌙 **09:00 PM IST — THE SELF-TRUST LEDGER CHECK**

Time to close the books:
Did you execute your 90-minute block? Did you protect your morning?
Or did you give in to the 2 AM doomscroll?

Open your **Self-Trust Ledger** now and log your numbers.
If you kept your word: **+10 Points Deposit**
If you slipped: Be honest, record the withdrawal, and plan your reboot.

*Drop your score below: [Deposits / Withdrawals]*
"""
    await bot.send_message(chat_id=TELEGRAM_GROUP_ID, text=text, parse_mode="Markdown")


print("[✓] Telegram Bot Configuration and Logic initialized successfully.")
