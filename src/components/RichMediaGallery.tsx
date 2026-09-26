import React, { useState } from 'react';
import { Maximize2, X, ChevronLeft, ChevronRight, ExternalLink } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

interface RichMediaGalleryProps {
  images: string[];
  title: string;
  demoUrl?: string;
}

export const RichMediaGallery: React.FC<RichMediaGalleryProps> = ({
  images,
  title,
  demoUrl,
}) => {
  const [activeIndex, setActiveIndex] = useState(0);
  const [isFullscreen, setIsFullscreen] = useState(false);

  const nextImage = () => {
    setActiveIndex((prev) => (prev + 1) % images.length);
  };

  const prevImage = () => {
    setActiveIndex((prev) => (prev - 1 + images.length) % images.length);
  };

  return (
    <div className="flex flex-col gap-4">
      {/* Main Preview Screen */}
      <div className="relative aspect-[16/10] w-full rounded-3xl overflow-hidden bg-neutral-900 border border-black/10 shadow-xl group">
        <AnimatePresence mode="wait">
          <motion.img
            key={activeIndex}
            src={images[activeIndex]}
            alt={`${title} preview ${activeIndex + 1}`}
            initial={{ opacity: 0, scale: 1.04 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.35, ease: [0.16, 1, 0.3, 1] }}
            className="w-full h-full object-cover object-center select-none"
          />
        </AnimatePresence>

        {/* Ambient Dark Gradient Edge */}
        <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent pointer-events-none" />

        {/* Interactive Overlay Bar */}
        <div className="absolute top-4 right-4 flex items-center gap-2 z-10">
          {demoUrl && (
            <a
              href={demoUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-1.5 px-3.5 py-1.5 rounded-full bg-black/75 hover:bg-black text-xs font-semibold text-white border border-white/20 backdrop-blur-md transition-all shadow-md"
              data-cursor-text="PREVIEW"
            >
              <span>Live Demo</span>
              <ExternalLink className="w-3.5 h-3.5" />
            </a>
          )}
          <button
            type="button"
            onClick={() => setIsFullscreen(true)}
            aria-label="Expand image to fullscreen"
            className="p-2 rounded-full bg-black/75 hover:bg-black text-white border border-white/20 backdrop-blur-md transition-all"
            data-cursor-text="ZOOM"
          >
            <Maximize2 className="w-4 h-4" />
          </button>
        </div>

        {/* Arrow Navigation */}
        {images.length > 1 && (
          <>
            <button
              type="button"
              onClick={prevImage}
              aria-label="Previous preview image"
              className="absolute left-4 top-1/2 -translate-y-1/2 p-2.5 rounded-full bg-black/60 hover:bg-black text-white border border-white/20 backdrop-blur-md transition-all opacity-0 group-hover:opacity-100"
              data-cursor-text="PREV"
            >
              <ChevronLeft className="w-5 h-5" />
            </button>
            <button
              type="button"
              onClick={nextImage}
              aria-label="Next preview image"
              className="absolute right-4 top-1/2 -translate-y-1/2 p-2.5 rounded-full bg-black/60 hover:bg-black text-white border border-white/20 backdrop-blur-md transition-all opacity-0 group-hover:opacity-100"
              data-cursor-text="NEXT"
            >
              <ChevronRight className="w-5 h-5" />
            </button>
          </>
        )}

        {/* Bottom Pager Indicator */}
        <div className="absolute bottom-4 left-6 z-10">
          <span className="px-3 py-1 rounded-full bg-black/70 backdrop-blur-md text-white text-[11px] font-mono border border-white/15">
            {activeIndex + 1} / {images.length}
          </span>
        </div>
      </div>

      {/* Thumbnails Row */}
      {images.length > 1 && (
        <div className="flex items-center gap-3 overflow-x-auto pb-2">
          {images.map((img, idx) => (
            <button
              key={idx}
              type="button"
              onClick={() => setActiveIndex(idx)}
              className={`relative w-20 h-14 rounded-xl overflow-hidden border-2 transition-all flex-shrink-0 ${
                activeIndex === idx
                  ? 'border-black scale-105 shadow-md'
                  : 'border-transparent opacity-60 hover:opacity-100'
              }`}
            >
              <img src={img} alt={`Thumb ${idx + 1}`} className="w-full h-full object-cover" />
            </button>
          ))}
        </div>
      )}

      {/* Fullscreen Lightbox Modal */}
      <AnimatePresence>
        {isFullscreen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[9999] bg-black/95 flex items-center justify-center p-6"
            onClick={() => setIsFullscreen(false)}
          >
            <button
              type="button"
              onClick={() => setIsFullscreen(false)}
              className="absolute top-6 right-6 p-3 rounded-full bg-white/10 hover:bg-white/20 text-white"
              data-cursor-text="CLOSE"
            >
              <X className="w-6 h-6" />
            </button>
            <img
              src={images[activeIndex]}
              alt={title}
              className="max-w-full max-h-[90vh] object-contain rounded-2xl shadow-2xl"
              onClick={(e) => e.stopPropagation()}
            />
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};
