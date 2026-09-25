import React, { useEffect } from 'react';
import { X, ArrowUpRight } from 'lucide-react';

interface SampleModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const SampleModal: React.FC<SampleModalProps> = ({ isOpen, onClose }) => {
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden';
      const handleKeyDown = (e: KeyboardEvent) => {
        if (e.key === 'Escape') onClose();
      };
      window.addEventListener('keydown', handleKeyDown);
      return () => {
        document.body.style.overflow = '';
        window.removeEventListener('keydown', handleKeyDown);
      };
    } else {
      document.body.style.overflow = '';
    }
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 bg-black/75 backdrop-blur-md animate-fadeIn"
      onClick={(e) => {
        if (e.target === e.currentTarget) onClose();
      }}
    >
      <div className="bg-white text-black w-full max-w-2xl rounded-3xl overflow-hidden shadow-2xl border border-black/10 flex flex-col max-h-[85vh]">
        {/* Modal Header */}
        <div className="p-6 border-b border-black/10 flex items-center justify-between">
          <div>
            <span className="text-[10px] font-mono uppercase tracking-widest text-[#0066cc] block">
              Chapter 1 Preview • Page 14
            </span>
            <h3 className="font-display font-bold text-xl text-black">
              The Anatomy of Daily Cognitive Friction
            </h3>
          </div>
          <button
            type="button"
            onClick={onClose}
            className="p-2 rounded-full hover:bg-black/5 text-black/60 hover:text-black transition-colors"
            data-cursor-text="CLOSE"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Modal Body */}
        <div className="p-6 sm:p-8 overflow-y-auto space-y-4 text-base leading-relaxed text-black/80 font-normal">
          <p>
            When you sit down at your workspace with the broad intention to &quot;work,&quot; you have already lost the mental transaction. Focus is a high-cost biological operation. The brain is hardwired to minimize metabolic expense by seeking paths of least resistance.
          </p>
          <div className="border-l-2 border-[#0066cc] pl-4 py-1 my-4 italic text-black/90 font-medium">
            &quot;Friction does not announce itself with alarms. It presents as a mild desire to check a metrics page, a clean inbox, or a minor context transition.&quot;
          </div>
          <p>
            To prevent baseline deviation, you must anchor your physical workspace configuration. If your attention-field contains even a single passive indicator of high-stimulus input (like a secondary display playing social feeds or a phone in your immediate eye-line), your focus engine pays a constant unconscious tax.
          </p>
          <p>
            Your non-negotiable step in Phase 1 is the absolute minimization of visual fields. The phone belongs behind a physical boundary—in another room or inside a drawer. If it is within arms reach, the contextual willpower penalty is active. Keep it completely isolated.
          </p>
        </div>

        {/* Modal Footer */}
        <div className="p-6 bg-black/5 border-t border-black/10 flex flex-col sm:flex-row items-center justify-between gap-4">
          <span className="text-xs font-mono text-black/60">
            Read all 160 pages in the master playbook
          </span>
          <a
            href="https://whop.com/elevateweb-b83f/90-days-comeback-plan/"
            target="_blank"
            rel="noopener noreferrer"
            className="cuberto-btn bg-black text-white hover:bg-black/90 text-xs py-3 px-6 inline-flex items-center gap-2"
            data-cursor-text="BUY"
          >
            <span>Claim Access — ₹999</span>
            <ArrowUpRight className="w-4 h-4" />
          </a>
        </div>
      </div>
    </div>
  );
};
