/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { ChevronLeft, ChevronRight, Maximize2 } from 'lucide-react';
import { PortfolioItem } from '../types';

interface PortfolioCarouselProps {
  items: PortfolioItem[];
  onSelectCategory: (category: string) => void;
  selectedCategory: string;
  categories: { id: string; label: string }[];
  onViewDetails: (item: PortfolioItem) => void;
}

export default function PortfolioCarousel({
  items,
  onSelectCategory,
  selectedCategory,
  categories,
  onViewDetails
}: PortfolioCarouselProps) {
  const [activeIndex, setActiveIndex] = useState(0);
  const [horizontalImages, setHorizontalImages] = useState<Record<string, boolean>>({});
  const containerRef = useRef<HTMLDivElement>(null);

  // Reset active index when category changes
  useEffect(() => {
    setActiveIndex(0);
  }, [selectedCategory]);

  if (items.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center py-20 text-center text-[#F8F4F2]/50">
        <p className="text-sm font-mono">No portfolio items found in this section.</p>
      </div>
    );
  }

  // Adjust active index within bounds
  const handlePrev = () => {
    setActiveIndex((prev) => (prev === 0 ? items.length - 1 : prev - 1));
  };

  const handleNext = () => {
    setActiveIndex((prev) => (prev === items.length - 1 ? 0 : prev + 1));
  };

  return (
    <div className="w-full bg-[#090B0B] text-[#F8F4F2] py-12 select-none overflow-hidden relative">
      {/* 3D Perspective Container */}
      <div 
        ref={containerRef}
        className="relative max-w-full mx-auto flex flex-col items-center justify-center min-h-[560px] md:min-h-[640px] px-4"
        style={{ perspective: '1200px' }}
      >
        {/* Navigation Buttons */}
        <div className="absolute top-[45%] left-4 z-40">
          <button
            onClick={handlePrev}
            className="w-10 h-10 md:w-12 md:h-12 rounded-full bg-[#283133]/60 hover:bg-[#A27B5D] text-[#F8F4F2] hover:text-[#090B0B] flex items-center justify-center transition-all duration-300 border border-[#F8F4F2]/10 hover:border-transparent cursor-pointer shadow-lg backdrop-blur-md"
            aria-label="Previous plate"
          >
            <ChevronLeft size={20} />
          </button>
        </div>
        <div className="absolute top-[45%] right-4 z-40">
          <button
            onClick={handleNext}
            className="w-10 h-10 md:w-12 md:h-12 rounded-full bg-[#283133]/60 hover:bg-[#A27B5D] text-[#F8F4F2] hover:text-[#090B0B] flex items-center justify-center transition-all duration-300 border border-[#F8F4F2]/10 hover:border-transparent cursor-pointer shadow-lg backdrop-blur-md"
            aria-label="Next plate"
          >
            <ChevronRight size={20} />
          </button>
        </div>

        {/* Carousel Tracks */}
        <div className="relative w-full flex items-center justify-center h-[460px] md:h-[540px]">
          {items.map((item, idx) => {
            // Relative position from the active card
            let offset = idx - activeIndex;
            
            // Handle wrapping properly for endless scrolling feeling
            const total = items.length;
            if (offset < -total / 2) offset += total;
            if (offset > total / 2) offset -= total;

            const absOffset = Math.abs(offset);
            
            // Only render items within visual range (max 5 visible at once: -2, -1, 0, 1, 2)
            if (absOffset > 2) return null;

            const isCenter = offset === 0;
            const isHorizontal = horizontalImages[item.id] ?? false;

            // Styling variables depending on whether the card is horizontal or vertical
            const baseWidthClass = isHorizontal 
              ? 'w-[320px] sm:w-[480px] md:w-[580px]' 
              : 'w-[250px] sm:w-[320px] md:w-[380px]';
            
            const baseAspectClass = isHorizontal 
              ? 'aspect-[16/10]' 
              : 'aspect-[3/4.2]';

            // Custom 3D offsets and transformations matching the attached design
            // Cylindrical wrapping curve calculation
            const translateX = offset * (isHorizontal ? 190 : 160); // px shift
            const rotateY = offset * -22; // Cylindrical curving angle
            const scale = 1 - absOffset * 0.15; // Scale down peripheral cards
            const translateZ = -absOffset * 150; // Push peripheral cards back
            const opacity = isCenter ? 1 : absOffset === 1 ? 0.6 : 0.25;

            return (
              <motion.div
                key={item.id}
                onClick={() => {
                  if (isCenter) {
                    onViewDetails(item);
                  } else {
                    setActiveIndex(idx);
                  }
                }}
                className={`absolute ${baseWidthClass} ${baseAspectClass} rounded-[28px] md:rounded-[36px] overflow-hidden cursor-pointer shadow-2xl border border-[#F8F4F2]/8 transition-shadow duration-500 hover:shadow-[#A27B5D]/10 bg-[#090B0B]`}
                style={{
                  zIndex: 20 - absOffset,
                  transformStyle: 'preserve-3d',
                }}
                animate={{
                  x: translateX,
                  scale: scale,
                  rotateY: rotateY,
                  z: translateZ,
                  opacity: opacity,
                }}
                transition={{
                  type: 'spring',
                  stiffness: 280,
                  damping: 26,
                }}
              >
                {/* Image */}
                <div className="w-full h-full relative">
                  <img
                    src={item.imageUrl}
                    alt={item.title}
                    onLoad={(event) => {
                      const image = event.currentTarget;
                      const horizontal = image.naturalWidth >= image.naturalHeight;
                      setHorizontalImages((current) => current[item.id] === horizontal ? current : { ...current, [item.id]: horizontal });
                    }}
                    className="w-full h-full object-cover select-none pointer-events-none grayscale hover:grayscale-0 transition-all duration-500"
                    referrerPolicy="no-referrer"
                  />
                  
                  {/* Subtle Dark Vignette Overlay on card */}
                  <div className="absolute inset-0 bg-gradient-to-t from-[#090B0B] via-[#090B0B]/10 to-transparent opacity-90" />

                  {/* Elegant Text Overlay (Centered at the bottom, matching screenshot) */}
                  <div className="absolute bottom-0 inset-x-0 p-6 md:p-8 flex flex-col justify-end text-center z-20">
                    <motion.p 
                      animate={{ opacity: isCenter ? 1 : 0.6 }}
                      className="text-[9px] md:text-[10px] uppercase tracking-[0.25em] text-[#A27B5D] font-mono mb-1.5 font-bold"
                    >
                      {item.category} Plate
                    </motion.p>
                    
                    <motion.h3 
                      animate={{ scale: isCenter ? 1 : 0.95 }}
                      className="font-display text-base sm:text-lg md:text-xl font-semibold leading-snug text-[#F8F4F2] max-w-sm mx-auto tracking-wide group-hover:text-[#A27B5D] transition-colors"
                    >
                      {item.title}
                    </motion.h3>

                    {isCenter && item.description && (
                      <motion.div 
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.15 }}
                        className="mt-2.5 text-[10px] md:text-xs text-[#F8F4F2]/60 leading-relaxed line-clamp-2"
                      >
                        {item.description}
                      </motion.div>
                    )}
                  </div>

                  {/* Hover HUD on Center card */}
                  {isCenter && (
                    <div className="absolute inset-0 bg-[#090B0B]/20 opacity-0 hover:opacity-100 transition-opacity duration-300 flex items-center justify-center z-30">
                      <div className="w-14 h-14 rounded-full bg-[#A27B5D] text-[#090B0B] flex items-center justify-center shadow-lg border border-[#F8F4F2]/10 scale-90 hover:scale-100 transition-transform duration-300">
                        <Maximize2 size={16} />
                      </div>
                    </div>
                  )}
                </div>
              </motion.div>
            );
          })}
        </div>
      </div>

      {/* Slide Indicators */}
      <div className="flex justify-center items-center gap-2 mt-4 md:mt-6">
        {items.map((_, i) => (
          <button
            key={i}
            onClick={() => setActiveIndex(i)}
            className={`h-1.5 rounded-full transition-all duration-300 cursor-pointer ${
              i === activeIndex 
                ? 'w-6 bg-[#A27B5D]' 
                : 'w-1.5 bg-[#283133] hover:bg-[#F8F4F2]/35'
            }`}
            aria-label={`Go to slide ${i + 1}`}
          />
        ))}
      </div>
    </div>
  );
}
