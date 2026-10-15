import React, { useEffect } from 'react';
import { ExternalLink, FileSpreadsheet, Loader2 } from 'lucide-react';

const GOOGLE_SHEET_COPY_URL = "https://docs.google.com/spreadsheets/d/1cyEPd3jksDKxH9ZhPFf0X5tKjEib0BjwFqfbSFS6wq8/copy";

export const SheetRedirectPage: React.FC = () => {
  useEffect(() => {
    // Instant client-side redirect to Google Sheets copy template
    const timer = setTimeout(() => {
      window.location.replace(GOOGLE_SHEET_COPY_URL);
    }, 150);

    return () => clearTimeout(timer);
  }, []);

  return (
    <div className="min-h-screen bg-[#070b14] text-white flex items-center justify-center p-6 font-sans">
      <div className="max-w-md w-full text-center p-8 rounded-3xl bg-slate-900/80 border border-slate-800 shadow-2xl backdrop-blur-xl space-y-6">
        <div className="w-16 h-16 rounded-2xl bg-emerald-500/10 border border-emerald-500/30 text-emerald-400 flex items-center justify-center mx-auto shadow-[0_0_30px_rgba(16,185,129,0.2)]">
          <FileSpreadsheet className="w-8 h-8 animate-pulse" />
        </div>

        <div className="space-y-2">
          <h1 className="text-2xl font-display font-bold text-white">
            Opening Your Google Sheet...
          </h1>
          <p className="text-sm text-slate-400 leading-relaxed">
            Redirecting you to create your private copy in Google Drive.
          </p>
        </div>

        <div className="flex items-center justify-center gap-2 text-xs font-mono text-emerald-400 py-2">
          <Loader2 className="w-4 h-4 animate-spin" />
          <span>Generating Google Drive Copy</span>
        </div>

        <div className="pt-4 border-t border-slate-800/80">
          <a
            href={GOOGLE_SHEET_COPY_URL}
            className="inline-flex items-center justify-center gap-2 w-full px-6 py-3.5 rounded-xl bg-emerald-500 hover:bg-emerald-400 text-slate-950 font-display font-bold text-sm tracking-tight transition-all shadow-[0_0_20px_rgba(16,185,129,0.3)] hover:scale-[1.02]"
          >
            <span>Click Here if Not Redirected</span>
            <ExternalLink className="w-4 h-4" />
          </a>
        </div>
      </div>
    </div>
  );
};

export default SheetRedirectPage;
