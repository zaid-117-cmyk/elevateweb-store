import React, { useEffect, useState } from 'react';
import { 
  CheckCircle, 
  ExternalLink, 
  FileSpreadsheet, 
  Download, 
  Sparkles, 
  Copy, 
  Check, 
  HelpCircle, 
  Zap
} from 'lucide-react';
import confetti from 'canvas-confetti';

const GOOGLE_SHEET_COPY_URL = "https://docs.google.com/spreadsheets/d/1cyEPd3jksDKxH9ZhPFf0X5tKjEib0BjwFqfbSFS6wq8/copy";

export const PricingCalculatorAccessPage: React.FC = () => {
  const [copiedLink, setCopiedLink] = useState(false);

  useEffect(() => {
    window.scrollTo(0, 0);
    document.title = "Access Your Template — The 3-Minute Pricing Calculator";

    // Launch celebratory confetti burst
    const count = 180;
    const defaults = {
      origin: { y: 0.65 },
      colors: ['#10B981', '#06B6D4', '#F59E0B', '#34D399', '#FFFFFF']
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

  const handleCopyLink = () => {
    navigator.clipboard.writeText(GOOGLE_SHEET_COPY_URL);
    setCopiedLink(true);
    setTimeout(() => setCopiedLink(false), 2200);
  };

  const handleDownloadLauncher = () => {
    const htmlContent = `<!DOCTYPE html>
<html>
<head>
  <meta charset="utf-8">
  <title>The 3-Minute Pricing Calculator - ElevateWeb</title>
  <meta http-equiv="refresh" content="0; url=${GOOGLE_SHEET_COPY_URL}">
</head>
<body style="font-family: system-ui, sans-serif; background: #070b14; color: #fff; text-align: center; padding: 50px;">
  <h2>Redirecting to your Google Sheet...</h2>
  <p><a href="${GOOGLE_SHEET_COPY_URL}" style="color: #10B981;">Click here if not redirected automatically</a></p>
</body>
</html>`;
    const blob = new Blob([htmlContent], { type: 'text/html' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = 'Open-3-Minute-Pricing-Calculator.html';
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
  };

  return (
    <div className="min-h-screen bg-[#070b14] text-slate-100 selection:bg-emerald-500 selection:text-slate-950 font-sans relative overflow-x-clip py-12 md:py-20 px-4 sm:px-6 lg:px-8">
      
      {/* Background glow */}
      <div 
        className="absolute top-0 left-1/2 -translate-x-1/2 w-full max-w-5xl h-[500px] pointer-events-none opacity-30 blur-[130px] -z-10"
        style={{
          background: 'radial-gradient(circle at 50% 20%, rgba(16, 185, 129, 0.35), rgba(6, 182, 212, 0.2) 40%, transparent 70%)'
        }}
      />

      <div className="max-w-3xl mx-auto space-y-10">
        
        {/* Top Header Card */}
        <div className="text-center space-y-4">
          <div className="inline-flex p-4 rounded-3xl bg-emerald-500/10 border border-emerald-500/30 text-emerald-400 shadow-[0_0_30px_rgba(16,185,129,0.2)] mb-2 animate-bounce">
            <CheckCircle className="w-12 h-12 stroke-[2]" />
          </div>

          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-500/10 border border-emerald-500/25 text-emerald-400 text-xs font-mono font-semibold">
            <Sparkles className="w-3.5 h-3.5" />
            <span>ORDER VERIFIED & ACCESS UNLOCKED</span>
          </div>

          <h1 className="text-3xl sm:text-5xl font-display font-extrabold text-white tracking-tight leading-tight">
            Your Pricing Calculator is Ready!
          </h1>

          <p className="text-slate-300 text-base sm:text-lg max-w-xl mx-auto font-light leading-relaxed">
            Thank you for purchasing <strong className="text-white">The 3-Minute Freelancer & Agency Pricing Calculator</strong>. Click below to copy the master spreadsheet directly into your personal Google Drive.
          </p>
        </div>

        {/* PRIMARY DELIVERY ACTION CARD */}
        <div className="rounded-3xl bg-slate-900/80 border border-emerald-500/40 p-6 sm:p-10 shadow-[0_20px_60px_rgba(0,0,0,0.5)] backdrop-blur-xl relative overflow-hidden">
          <div className="absolute top-0 right-0 px-4 py-1.5 bg-emerald-500/15 border-b border-l border-emerald-500/30 rounded-bl-xl text-xs font-mono text-emerald-400 font-semibold">
            SECURE GOOGLE DRIVE TEMPLATE
          </div>

          <div className="flex flex-col sm:flex-row items-center gap-6 mb-8 pt-2">
            <div className="w-20 h-20 rounded-2xl bg-emerald-500/10 border border-emerald-500/30 text-emerald-400 flex items-center justify-center shrink-0 shadow-[0_0_25px_rgba(16,185,129,0.25)]">
              <FileSpreadsheet className="w-10 h-10" />
            </div>

            <div className="text-center sm:text-left">
              <h2 className="text-xl sm:text-2xl font-display font-bold text-white mb-1">
                The 3-Minute Freelancer & Agency Pricing Calculator
              </h2>
              <p className="text-xs sm:text-sm text-slate-400">
                Plug-and-play Google Sheet with 3 battle-tested tabs + Scope-Creep scripts.
              </p>
            </div>
          </div>

          {/* Primary CTA Button */}
          <div className="space-y-3">
            <a
              href={GOOGLE_SHEET_COPY_URL}
              target="_blank"
              rel="noopener noreferrer"
              className="w-full inline-flex items-center justify-center gap-3 px-8 py-5 rounded-2xl bg-emerald-500 hover:bg-emerald-400 text-slate-950 font-display font-bold text-lg sm:text-xl tracking-tight transition-all duration-300 transform hover:scale-[1.02] active:scale-[0.98] shadow-[0_0_35px_rgba(16,185,129,0.4)] hover:shadow-[0_0_50px_rgba(16,185,129,0.65)] group"
            >
              <span>Make a Copy in Google Drive (1-Click)</span>
              <ExternalLink className="w-5 h-5 group-hover:translate-x-1 group-hover:-translate-y-0.5 transition-transform" />
            </a>

            <div className="flex flex-col sm:flex-row items-center justify-between gap-3 pt-2 text-xs font-mono text-slate-400">
              <button
                type="button"
                onClick={handleCopyLink}
                className="hover:text-white transition-colors flex items-center gap-1.5 py-1"
              >
                {copiedLink ? (
                  <>
                    <Check className="w-3.5 h-3.5 text-emerald-400" />
                    <span className="text-emerald-400 font-semibold">Copied Direct Copy Link!</span>
                  </>
                ) : (
                  <>
                    <Copy className="w-3.5 h-3.5 text-slate-400" />
                    <span>Copy direct URL to clipboard</span>
                  </>
                )}
              </button>

              <button
                type="button"
                onClick={handleDownloadLauncher}
                className="hover:text-white transition-colors flex items-center gap-1.5 py-1"
                title="Download an offline launcher file to save on your desktop"
              >
                <Download className="w-3.5 h-3.5 text-cyan-400" />
                <span>Save Offline Desktop Shortcut</span>
              </button>
            </div>
          </div>
        </div>

        {/* 3-MINUTE QUICK START GUIDE */}
        <div className="rounded-3xl bg-slate-900/50 border border-slate-800 p-6 sm:p-8 space-y-6">
          <div className="flex items-center gap-2.5 pb-4 border-b border-slate-800">
            <Zap className="w-5 h-5 text-amber-400" />
            <h3 className="font-display font-bold text-white text-lg">
              3-Minute Quick Start Guide
            </h3>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-5 text-sm">
            
            <div className="p-4 rounded-2xl bg-slate-950/70 border border-slate-800/80 space-y-2">
              <div className="text-xs font-mono font-bold text-emerald-400 flex items-center gap-1.5">
                <span className="w-5 h-5 rounded-full bg-emerald-500/20 flex items-center justify-center text-[11px]">1</span>
                <span>Click "Make a copy"</span>
              </div>
              <p className="text-xs text-slate-300 font-light leading-relaxed">
                Google will prompt: <em>"Would you like to make a copy?"</em>. Click the blue button to create your own private version stored in your personal Google Drive.
              </p>
            </div>

            <div className="p-4 rounded-2xl bg-slate-950/70 border border-slate-800/80 space-y-2">
              <div className="text-xs font-mono font-bold text-cyan-400 flex items-center gap-1.5">
                <span className="w-5 h-5 rounded-full bg-cyan-500/20 flex items-center justify-center text-[11px]">2</span>
                <span>Fill Green Cells (Tab 1)</span>
              </div>
              <p className="text-xs text-slate-300 font-light leading-relaxed">
                Enter your target monthly income, billable hours, and tax buffer. The sheet calculates your protected floor rate and walk-away price instantly.
              </p>
            </div>

            <div className="p-4 rounded-2xl bg-slate-950/70 border border-slate-800/80 space-y-2">
              <div className="text-xs font-mono font-bold text-amber-400 flex items-center gap-1.5">
                <span className="w-5 h-5 rounded-full bg-amber-500/20 flex items-center justify-center text-[11px]">3</span>
                <span>Generate Proposals</span>
              </div>
              <p className="text-xs text-slate-300 font-light leading-relaxed">
                Switch to Tab 2 to copy your 3-Tier Proposal pitch directly into WhatsApp or Email. Use Tab 3 scripts whenever clients request out-of-scope work.
              </p>
            </div>

          </div>
        </div>

        {/* FREQUENTLY ASKED QUESTIONS */}
        <div className="rounded-3xl bg-slate-900/50 border border-slate-800 p-6 sm:p-8 space-y-4">
          <div className="flex items-center gap-2.5 pb-2">
            <HelpCircle className="w-5 h-5 text-cyan-400" />
            <h3 className="font-display font-bold text-white text-lg">
              Delivery FAQ & Support
            </h3>
          </div>

          <div className="space-y-3 text-xs sm:text-sm text-slate-300 font-light leading-relaxed">
            <div className="p-3.5 rounded-xl bg-slate-950 border border-slate-800/80">
              <strong className="text-white block mb-1">Q: Does the link ever expire?</strong>
              <span>No. Once you make a copy in Google Drive, the file is 100% yours forever. You can also re-visit this page anytime using the link from your Razorpay receipt.</span>
            </div>

            <div className="p-3.5 rounded-xl bg-slate-950 border border-slate-800/80">
              <strong className="text-white block mb-1">Q: Can I use this in Microsoft Excel?</strong>
              <span>Yes. Open your copy in Google Sheets, then go to <strong>File &gt; Download &gt; Microsoft Excel (.xlsx)</strong>. All formulas and formats export smoothly.</span>
            </div>

            <div className="p-3.5 rounded-xl bg-slate-950 border border-slate-800/80">
              <strong className="text-white block mb-1">Q: Need help or have an issue?</strong>
              <span>Email us directly at <a href="mailto:zaid@elevateweb.me" className="text-emerald-400 hover:underline font-mono">zaid@elevateweb.me</a> with your Razorpay payment ID and we'll reply within 4 hours.</span>
            </div>
          </div>
        </div>

        {/* Back to Home Navigation */}
        <div className="text-center pt-2">
          <a
            href="/"
            className="inline-flex items-center gap-2 text-xs font-mono text-slate-400 hover:text-white transition-colors"
          >
            <span>← Back to ElevateWeb Home</span>
          </a>
        </div>

      </div>
    </div>
  );
};

export default PricingCalculatorAccessPage;
