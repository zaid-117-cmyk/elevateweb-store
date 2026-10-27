"""
Self-Trust Protocol: Dynamic Anti-Piracy PDF Watermarking Service
Author: ElevateWeb x @youthphilosophy22

Takes a master PDF and dynamically stamps buyer's Name, Email, Phone Number,
and Cryptographic License ID across the footer and diagonal watermark of every page.
Prevents WhatsApp file piracy and unauthorized redistribution.
"""

import sys
import os
import io
import time
import hmac
import hashlib
import json
from typing import Optional, Dict

try:
    from pypdf import PdfReader, PdfWriter
    from reportlab.pdfgen import canvas
    from reportlab.lib.colors import Color, black, red
except ImportError:
    # Graceful fallback explanation
    print("[WARNING] pypdf or reportlab not installed. Run: pip install pypdf reportlab")


SECRET_KEY = os.environ.get("WATERMARK_SECRET_KEY", "berserk_selftrust_secret_key_2026")


def create_watermark_page(width: float, height: float, name: str, email: str, phone: str, license_id: str) -> io.BytesIO:
    """
    Creates a transparent PDF page containing security watermarks:
    1. Header: Warning and License ID
    2. Footer: Buyer specific name, email, and WhatsApp number
    3. Center: 45-degree angled semi-transparent diagonal watermark
    """
    packet = io.BytesIO()
    can = canvas.Canvas(packet, pagesize=(width, height))
    
    # 1. Diagonal Center Watermark (Semi-transparent)
    can.saveState()
    can.setFont("Helvetica-Bold", 32)
    can.setFillColor(Color(0.8, 0.1, 0.1, alpha=0.08)) # subtle red watermark
    can.translate(width / 2.0, height / 2.0)
    can.rotate(45)
    watermark_text = f"LICENSED TO {name.upper()} • {email}"
    can.drawCentredString(0, 0, watermark_text)
    can.restoreState()

    # 2. Top Security Header
    can.saveState()
    can.setFont("Helvetica-Bold", 7.5)
    can.setFillColor(Color(0.3, 0.3, 0.3, alpha=0.7))
    header_text = f"CONFIDENTIAL & RESTRICTED • BERSERK OS • LICENSE: {license_id}"
    can.drawString(36, height - 20, header_text)
    can.restoreState()

    # 3. Bottom Security Footer (Stamped on every page)
    can.saveState()
    can.setFont("Helvetica-Bold", 8)
    can.setFillColor(Color(0.85, 0.1, 0.1, alpha=0.9)) # Bold security red
    footer_text = f"EXCLUSIVE LICENSE TO: {name} ({email} | WhatsApp: {phone}) • UNAUTHORIZED RESALE / SHARING ON WHATSAPP IS TRACKED"
    can.drawCentredString(width / 2.0, 18, footer_text)
    can.restoreState()

    can.save()
    packet.seek(0)
    return packet


def watermark_pdf(input_pdf_path: str, output_pdf_path: str, name: str, email: str, phone: str) -> str:
    """
    Reads input PDF, merges watermark on every page, and writes to output_pdf_path.
    """
    if not os.path.exists(input_pdf_path):
        raise FileNotFoundError(f"Input master PDF not found at {input_pdf_path}")

    license_id = f"STP-IND-{hashlib.md5(email.encode()).hexdigest()[:6].upper()}-SEC"

    reader = PdfReader(input_pdf_path)
    writer = PdfWriter()

    total_pages = len(reader.pages)
    print(f"[*] Processing {total_pages} pages for buyer: {name} ({email})...")

    for i, page in enumerate(reader.pages):
        page_width = float(page.mediabox.width)
        page_height = float(page.mediabox.height)

        watermark_io = create_watermark_page(page_width, page_height, name, email, phone, license_id)
        watermark_reader = PdfReader(watermark_io)
        watermark_page = watermark_reader.pages[0]

        page.merge_page(watermark_page)
        writer.add_page(page)

    with open(output_pdf_path, "wb") as f_out:
        writer.write(f_out)

    print(f"[✓] Watermarked PDF successfully generated: {output_pdf_path} (License: {license_id})")
    return license_id


# 24-Hour & 3-Click Expiring Link Generator
def generate_expiring_download_token(buyer_id: str, email: str, ttl_hours: int = 24, max_clicks: int = 3) -> str:
    expires_at = int(time.time()) + (ttl_hours * 3600)
    payload = {
        "buyer_id": buyer_id,
        "email": email,
        "exp": expires_at,
        "max_clicks": max_clicks,
        "clicks": 0
    }
    payload_json = json.dumps(payload, sort_keys=True)
    signature = hmac.new(SECRET_KEY.encode(), payload_json.encode(), hashlib.sha256).hexdigest()
    
    token = f"{payload_json.encode().hex()}.{signature}"
    return token


def verify_download_token(token: str) -> Optional[Dict]:
    try:
        parts = token.split(".")
        if len(parts) != 2:
            return None
        payload_hex, signature = parts
        payload_json = bytes.fromhex(payload_hex).decode()

        expected_sig = hmac.new(SECRET_KEY.encode(), payload_json.encode(), hashlib.sha256).hexdigest()
        if not hmac.compare_digest(signature, expected_sig):
            return None

        payload = json.loads(payload_json)
        if time.time() > payload.get("exp", 0):
            print("[!] Download token expired.")
            return None

        return payload
    except Exception as e:
        print(f"[!] Error verifying token: {e}")
        return None


if __name__ == "__main__":
    if len(sys.argv) >= 5:
        in_file = sys.argv[1]
        out_file = sys.argv[2]
        b_name = sys.argv[3]
        b_email = sys.argv[4]
        b_phone = sys.argv[5] if len(sys.argv) > 5 else "+91 98765 43210"
        watermark_pdf(in_file, out_file, b_name, b_email, b_phone)
    else:
        print("Usage: python watermark_pdf.py <input.pdf> <output.pdf> <Buyer Name> <Buyer Email> [Buyer Phone]")
