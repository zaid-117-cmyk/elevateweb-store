import React, { useEffect } from 'react';
import { X, ArrowUpRight, CheckSquare, Sparkles } from 'lucide-react';
import { useCart } from '../hooks/useCart';
import { PRODUCTS } from '../lib/products';

interface SampleModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const SampleModal: React.FC<SampleModalProps> = ({ isOpen, onClose }) => {
  const { addToCart, openCart } = useCart();
  const playbook = PRODUCTS.find((p) => p.id === 'prod-1-page-action-playbook') || PRODUCTS[0];

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

  const handleClaim = () => {
    if (playbook) {
      addToCart(playbook, 'standard');
      onClose();
      openCart();
    }
  };

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-6 bg-black/80 backdrop-blur-md animate-fadeIn"
      onClick={(e) => {
        if (e.target === e.currentTarget) onClose();
      }}
    >
      <div
        className="bg-[#FAF8F3] text-[#1A1918] w-full max-w-3xl rounded-2xl sm:rounded-3xl shadow-2xl border-2 border-[#DCD6C7] flex flex-col max-h-[90vh] overflow-hidden relative"
        style={{
          boxShadow: '0 25px 50px -12px rgba(0, 0, 0, 0.5), 0 0 0 1px rgba(43, 41, 37, 0.1)',
        }}
      >
        {/* Double Hairline Vintage Rule */}
        <div className="absolute inset-2 sm:inset-3 border border-[#2B2925]/20 pointer-events-none rounded-xl sm:rounded-2xl" />

        {/* Modal Header */}
        <div className="relative z-10 px-6 sm:px-8 pt-6 pb-4 border-b border-[#2B2925]/15 flex items-center justify-between bg-[#F4EFE6]/60">
          <div>
            <div className="flex items-center gap-2 text-[10px] font-vintage tracking-[0.25em] uppercase text-[#6B655B] font-bold">
              <span>♦ ❖ ♦</span>
              <span>Classic Vintage Edition • Sample Action Sheet</span>
            </div>
            <h3 className="font-vintage font-extrabold text-xl sm:text-2xl text-[#1A1918] mt-1">
              THE 1-PAGE ACTION PLAYBOOK
            </h3>
          </div>
          <button
            type="button"
            onClick={onClose}
            className="p-2 rounded-full hover:bg-black/5 text-[#1A1918]/60 hover:text-[#1A1918] transition-colors"
            data-cursor-text="CLOSE"
            aria-label="Close modal"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Modal Scrollable Body: Chapter 1 Reproduction */}
        <div className="relative z-10 px-6 sm:px-10 py-6 overflow-y-auto space-y-6 text-[#1A1918]">
          {/* Chapter Banner */}
          <div className="text-center border-b border-[#2B2925]/20 pb-5">
            <span className="font-vintage text-xs font-bold tracking-[0.2em] uppercase text-[#8C4A00] block mb-1">
              CHAPTER 01 • ATOMIC HABITS (JAMES CLEAR)
            </span>
            <h2 className="font-serif italic font-bold text-2xl sm:text-3xl text-[#1A1918]">
              Habit Ka Remote Control: Chhoti Aadat, Bada Result
            </h2>
            <p className="text-xs font-sans text-[#524E48] mt-2 font-medium tracking-wide">
              Moti kitabein padhna chhodo • Real-life Indian action sheets se shuru karo
            </p>
          </div>

          {/* Core Concept: Real-Life Indian Example */}
          <div className="bg-[#EFECE3] border border-[#DCD6C7] rounded-xl p-4 sm:p-5">
            <span className="font-vintage text-[11px] font-bold tracking-widest uppercase text-[#3A3731] block mb-2">
              Asli Zindagi Ka Example
            </span>
            <p className="text-sm sm:text-base leading-relaxed text-[#2B2925] font-serif">
              Agar table par phone rakha hai, toh tum kitni bhi &quot;willpower&quot; laga lo, 10 minute baad phone haath mein hoga aur reels scroll ho rahi hongi.
              <br className="my-1" />
              <strong>Kyun?</strong> Kyunki insaan ka dimaag hamesha <em>kam mehnat aur zyada dopamine</em> dhoondhta hai. 
              <strong>Solution:</strong> Willpower par mat jiyo, environment badlo. Phone dusre kamre mein, table par sirf copy aur pen. <strong>Cue badla, kismat badli.</strong>
            </p>
          </div>

          {/* 4-Box Model Framework */}
          <div>
            <span className="font-vintage text-xs font-bold tracking-widest uppercase text-[#3A3731] block mb-3 text-center">
              The 4-Step Habit Loop (Karna Kaise Hai)
            </span>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5">
              {/* Box 1 */}
              <div className="bg-white/80 border border-[#2B2925]/15 rounded-xl p-4 shadow-sm">
                <div className="flex items-center justify-between mb-1.5">
                  <span className="font-mono text-xs font-bold text-[#8C4A00]">01 / CUE</span>
                  <span className="text-[10px] font-vintage uppercase text-[#6B655B] tracking-wider">Ishaara</span>
                </div>
                <h4 className="font-serif font-bold text-base text-[#1A1918] mb-1">Make It Obvious</h4>
                <p className="text-xs text-[#4A4742] leading-relaxed">
                  Jo cheez saamne dikhegi, wahi action hoga. Table saaf rakhoge toh padhai hogi; table par remote rakhoge toh TV chalega.
                </p>
              </div>

              {/* Box 2 */}
              <div className="bg-white/80 border border-[#2B2925]/15 rounded-xl p-4 shadow-sm">
                <div className="flex items-center justify-between mb-1.5">
                  <span className="font-mono text-xs font-bold text-[#8C4A00]">02 / CRAVING</span>
                  <span className="text-[10px] font-vintage uppercase text-[#6B655B] tracking-wider">Tadap</span>
                </div>
                <h4 className="font-serif font-bold text-base text-[#1A1918] mb-1">Make It Attractive</h4>
                <p className="text-xs text-[#4A4742] leading-relaxed">
                  Boredom se bachne ki craving ko kaam se jodo. &quot;Pehle 45 minute maths solve karunga, phir hi fav song sununga.&quot;
                </p>
              </div>

              {/* Box 3 */}
              <div className="bg-white/80 border border-[#2B2925]/15 rounded-xl p-4 shadow-sm">
                <div className="flex items-center justify-between mb-1.5">
                  <span className="font-mono text-xs font-bold text-[#8C4A00]">03 / RESPONSE</span>
                  <span className="text-[10px] font-vintage uppercase text-[#6B655B] tracking-wider">Action</span>
                </div>
                <h4 className="font-serif font-bold text-base text-[#1A1918] mb-1">Make It Easy (2-Min Rule)</h4>
                <p className="text-xs text-[#4A4742] leading-relaxed">
                  Bada goal mat banao. &quot;Daily 1 ghanta workout&quot; ki jagah sirf &quot;Shoes pehno aur 2 minute stretch karo&quot; se shuru karo.
                </p>
              </div>

              {/* Box 4 */}
              <div className="bg-white/80 border border-[#2B2925]/15 rounded-xl p-4 shadow-sm">
                <div className="flex items-center justify-between mb-1.5">
                  <span className="font-mono text-xs font-bold text-[#8C4A00]">04 / REWARD</span>
                  <span className="text-[10px] font-vintage uppercase text-[#6B655B] tracking-wider">Inaam</span>
                </div>
                <h4 className="font-serif font-bold text-base text-[#1A1918] mb-1">Make It Satisfying</h4>
                <p className="text-xs text-[#4A4742] leading-relaxed">
                  Kaam complete hote hi diary mein tick mark lagao ya streak banao. Visual progress dimaag ko satisfaction deti hai.
                </p>
              </div>
            </div>
          </div>

          {/* Karna Kya Hai: Action Steps */}
          <div className="border border-[#2B2925]/20 rounded-xl p-5 bg-[#FAF8F3]">
            <div className="flex items-center gap-2 mb-3">
              <CheckSquare className="w-4 h-4 text-[#8C4A00]" />
              <h4 className="font-vintage font-bold text-xs uppercase tracking-[0.2em] text-[#1A1918]">
                Karna Kya Hai (Aaj Hi Implement Karo)
              </h4>
            </div>
            <ul className="space-y-2.5 text-xs sm:text-sm text-[#2B2925]">
              <li className="flex items-start gap-2.5">
                <span className="font-bold text-[#8C4A00]">1.</span>
                <span><strong>Table Sanitization:</strong> Padhai/kaam shuru karne se pehle phone ko dusre kamre mein charging par laga do.</span>
              </li>
              <li className="flex items-start gap-2.5">
                <span className="font-bold text-[#8C4A00]">2.</span>
                <span><strong>Habit Stacking Formula:</strong> [Current Habit] ke baad [New Habit]. Example: <em>&quot;Morning chai peene ke baad main turant 1 page book padhunga.&quot;</em></span>
              </li>
              <li className="flex items-start gap-2.5">
                <span className="font-bold text-[#8C4A00]">3.</span>
                <span><strong>Never Miss Twice Rule:</strong> Agar kisi din aadat toot bhi jaye, agle din miss mat hone do. 1 din galti hoti hai, 2 din aadat ban jaati hai.</span>
              </li>
            </ul>
          </div>

          {/* Shabdkosh / Word Meaning Guide */}
          <div className="bg-[#F0EDE4] border border-[#2B2925]/15 rounded-xl p-4">
            <span className="font-vintage text-[10px] font-bold tracking-widest uppercase text-[#524E48] block mb-2">
              Shabdkosh (Quick Vocabulary)
            </span>
            <div className="grid grid-cols-2 sm:grid-cols-3 gap-2.5 text-xs">
              <div>
                <strong className="text-[#1A1918]">Cue:</strong> <span className="text-[#4A4742]">Ishaara ya trigger</span>
              </div>
              <div>
                <strong className="text-[#1A1918]">Craving:</strong> <span className="text-[#4A4742]">Mann ki teevra ichha</span>
              </div>
              <div>
                <strong className="text-[#1A1918]">Friction:</strong> <span className="text-[#4A4742]">Kaam mein aalsi rukawat</span>
              </div>
            </div>
          </div>
        </div>

        {/* Modal Footer */}
        <div className="relative z-10 px-6 sm:px-8 py-4 bg-[#F2EDE2] border-t border-[#2B2925]/20 flex flex-col sm:flex-row items-center justify-between gap-4">
          <div className="text-center sm:text-left">
            <span className="text-xs font-serif italic text-[#3A3731] block">
              &quot;You do not rise to the level of your goals. You fall to the level of your systems.&quot;
            </span>
            <span className="text-[11px] font-sans text-[#6B655B] font-medium">
              14 More Chapters included (Deep Work, Goggins, 48 Laws, Ikigai...)
            </span>
          </div>

          <button
            type="button"
            onClick={handleClaim}
            className="w-full sm:w-auto px-6 py-3 rounded-full bg-[#1A1918] text-[#FAF8F3] hover:bg-[#2B2925] font-display font-semibold text-xs tracking-wider uppercase inline-flex items-center justify-center gap-2 shadow-lg transition-transform hover:scale-[1.02]"
            data-cursor-text="BUY"
          >
            <Sparkles className="w-3.5 h-3.5 text-[#E5DECD]" />
            <span>Unlock All 15 Sheets — ₹199</span>
            <ArrowUpRight className="w-4 h-4" />
          </button>
        </div>
      </div>
    </div>
  );
};
