import React, { useState } from 'react';
import { ExternalLink, Maximize2, X, ChevronLeft, ChevronRight, Layers } from 'lucide-react';
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
      <div className="relative aspect-[16/10] w-full rounded-2xl overflow-hidden bg-obsidian-900 border border-white/[0.08] shadow-2xl group">
        <AnimatePresence mode="wait">
          <motion.img
            key={activeIndex}
            src={images[activeIndex]}
            alt={`${title} preview ${activeIndex + 1}`}
            initial={{ opacity: 0, scale: 1.02 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
            className="w-full h-full object-cover object-center select-none"
          />
        </AnimatePresence>

        {/* Ambient Dark Gradient Edge */}
        <div className="absolute inset-0 bg-gradient-to-t from-obsidian-950/80 via-transparent to-black/30 pointer-events-none" />

        {/* Interactive Overlay Bar */}
        <div className="absolute top-4 right-4 flex items-center gap-2 z-10">
          {demoUrl && (
            <a
              href={demoUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-obsidian-900/80 hover:bg-obsidian-800 text-xs font-semibold text-amber-300 border border-amber-500/30 backdrop-blur-md transition-all shadow-md"
            >
              <span>Live Preview</span>
              <ExternalLink className="w-3.5 h-3.5" />
            </a>
          )}
          <button
            onClick={() => setIsFullscreen(true)}
            aria-label="View fullscreen image"
            className="p-2 rounded-xl bg-obsidian-900/80 hover:bg-obsidian-800 text-slate-300 hover:text-white border border-white/10 backdrop-blur-md transition-all"
          >
            <Maximize2 className="w-4 h-4" />
          </button>
        </div>

        {/* Arrow Navigation on Hover */}
        {images.length > 1 && (
          <>
            <button
              onClick={prevImage}
              aria-label="Previous preview image"
              className="absolute left-3 top-1/2 -translate-y-1/2 p-2 rounded-xl bg-obsidian-950/70 text-white/80 hover:text-white border border-white/10 backdrop-blur-md opacity-0 group-hover:opacity-100 transition-opacity"
            >
              <ChevronLeft className="w-5 h-5" />
            </button>
            <button
              onClick={nextImage}
              aria-label="Next preview image"
              className="absolute right-3 top-1/2 -translate-y-1/2 p-2 rounded-xl bg-obsidian-950/70 text-white/80 hover:text-white border border-white/10 backdrop-blur-md opacity-0 group-hover:opacity-100 transition-opacity"
            >
              <ChevronRight className="w-5 h-5" />
            </button>
          </>
        )}

        {/* Bottom Index Indicator */}
        <div className="absolute bottom-4 left-4 flex items-center gap-2 px-3 py-1 rounded-full bg-obsidian-950/70 backdrop-blur-md border border-white/10 text-xs font-mono text-slate-300">
          <Layers className="w-3.5 h-3.5 text-amber-400" />
          <span>{activeIndex + 1} / {images.length} views</span>
        </div>
      </div>

      {/* Thumbnails Row */}
      {images.length > 1 && (
        <div className="flex gap-3 overflow-x-auto pb-2 scrollbar-none">
          {images.map((img, idx) => (
            <button
              key={idx}
              onClick={() => setActiveIndex(idx)}
              className={`relative flex-shrink-0 w-24 h-16 rounded-xl overflow-hidden border-2 transition-all focus:outline-none ${
                activeIndex === idx
                  ? 'border-amber-400 shadow-glow-amber scale-105'
                  : 'border-white/10 opacity-60 hover:opacity-100'
              }`}
            >
              <img
                src={img}
                alt={`${title} thumbnail ${idx + 1}`}
                className="w-full h-full object-cover"
              />
            </button>
          ))}
        </div>
      )}

      {/* Fullscreen Lightbox Modal */}
      <AnimatePresence>
        {isFullscreen && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-obsidian-950/95 backdrop-blur-2xl">
            <button
              onClick={() => setIsFullscreen(false)}
              aria-label="Close fullscreen preview"
              className="absolute top-6 right-6 p-3 rounded-full bg-white/10 hover:bg-white/20 text-white transition-colors"
            >
              <X className="w-6 h-6" />
            </button>
            <img
              src={images[activeIndex]}
              alt={`${title} fullscreen preview`}
              className="max-w-full max-h-[85vh] object-contain rounded-xl shadow-2xl border border-white/10"
            />
          </div>
        )}
      </AnimatePresence>
    </div>
  );
};
