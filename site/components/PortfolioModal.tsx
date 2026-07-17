/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { X, SlidersHorizontal, MapPin, Film, Compass, Info } from 'lucide-react';
import { PortfolioItem, PortfolioCategory } from '../types';
import { useSiteData } from '../SiteDataContext';

interface PortfolioModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export default function PortfolioModal({ isOpen, onClose }: PortfolioModalProps) {
  const { portfolioItems } = useSiteData();
  const [selectedCategory, setSelectedCategory] = useState<PortfolioCategory>('all');
  const [activeItem, setActiveItem] = useState<PortfolioItem | null>(null);

  const categories: { label: string; value: PortfolioCategory }[] = [
    { label: 'All Archives', value: 'all' },
    { label: 'Portraits', value: 'portraits' },
    { label: 'Couples & Families', value: 'family' },
    { label: 'Headshots & Personal Branding', value: 'branding' },
    { label: 'Products & Brands', value: 'product' },
    { label: 'Events', value: 'event' },
  ];

  const filteredItems = portfolioItems.filter(
    (item) => selectedCategory === 'all' || item.category === selectedCategory
  );

  return (
    <AnimatePresence>
      {isOpen && (
        <div id="portfolio-modal-overlay" className="fixed inset-0 z-50 flex items-center justify-center p-0 md:p-6">
          {/* Backdrop blur */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="absolute inset-0 bg-[#090B0B]/95 backdrop-blur-md cursor-pointer"
          />

          {/* Modal Container */}
          <motion.div
            initial={{ scale: 0.98, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0.98, opacity: 0 }}
            transition={{ type: 'spring', damping: 28, stiffness: 200 }}
            className="relative w-full h-full md:h-[90vh] max-w-6xl bg-[#090B0B] border-none md:border md:border-[#F8F4F2]/10 md:rounded-lg overflow-hidden z-10 flex flex-col shadow-2xl"
          >
            {/* Elegant Header */}
            <div className="flex items-center justify-between px-6 py-5 border-b border-[#F8F4F2]/10 bg-[#283133]/20">
              <div>
                <span className="text-[10px] uppercase tracking-widest text-[#A27B5D] font-semibold block">
                  Archive Portfolio
                </span>
                <h3 className="font-display text-2xl font-semibold text-[#F8F4F2]">
                  Selected Works
                </h3>
              </div>
              <button
                onClick={onClose}
                className="p-2 text-[#F8F4F2]/60 hover:text-[#A27B5D] transition-colors rounded-full hover:bg-[#F8F4F2]/5"
                id="close-portfolio-modal"
              >
                <X size={20} />
              </button>
            </div>

            {/* Category Navigation Bar */}
            <div className="flex flex-col sm:flex-row sm:items-center justify-between px-6 py-4 bg-[#283133]/40 border-b border-[#F8F4F2]/10 gap-3">
              <div className="flex items-center gap-2 text-xs text-[#F8F4F2]/50 uppercase tracking-widest">
                <SlidersHorizontal size={12} className="text-[#A27B5D]" />
                <span>Filter Index:</span>
              </div>
              <div className="flex flex-wrap gap-1.5">
                {categories.map((cat) => (
                  <button
                    key={cat.value}
                    onClick={() => setSelectedCategory(cat.value)}
                    className={`px-3 py-1.5 rounded text-xs tracking-wider transition-all cursor-pointer font-body ${
                      selectedCategory === cat.value
                        ? 'bg-[#A27B5D] text-[#090B0B] font-semibold'
                        : 'bg-[#283133] text-[#F8F4F2]/70 hover:bg-[#283133]/80 hover:text-[#F8F4F2]'
                    }`}
                  >
                    {cat.label}
                  </button>
                ))}
              </div>
            </div>

            {/* Main Archive Grid */}
            <div className="flex-1 overflow-y-auto p-6 scrollbar-thin scrollbar-thumb-brand-primary">
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                {filteredItems.map((item) => (
                  <motion.div
                    key={item.id}
                    layoutId={`gallery-item-${item.id}`}
                    onClick={() => setActiveItem(item)}
                    className="group relative h-96 bg-[#283133]/30 rounded overflow-hidden cursor-pointer border border-[#F8F4F2]/5 hover:border-[#A27B5D]/40 transition-all duration-300"
                  >
                    {/* Shadow Blend Fade Overlay */}
                    <div className="absolute inset-0 bg-gradient-to-t from-[#090B0B]/90 via-[#090B0B]/10 to-transparent opacity-60 group-hover:opacity-80 transition-opacity z-10" />

                    <img
                      src={item.imageUrl}
                      alt={item.title}
                      referrerPolicy="no-referrer"
                      className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                    />

                    {/* Meta info bottom aligned */}
                    <div className="absolute bottom-0 left-0 right-0 p-5 z-20 transform translate-y-2 group-hover:translate-y-0 transition-transform duration-300">
                      <div className="flex items-center gap-1.5 text-[9px] uppercase tracking-widest text-[#A27B5D] font-semibold mb-1">
                        <span>{item.category}</span>
                        <span className="w-1 h-1 rounded-full bg-[#A27B5D]/60" />
                        <span>{item.settings.film || 'Digital'}</span>
                      </div>
                      <h4 className="font-display text-xl text-[#F8F4F2] font-semibold leading-tight group-hover:text-[#A27B5D] transition-colors">
                        {item.title}
                      </h4>
                      <p className="text-[10px] text-[#F8F4F2]/50 flex items-center gap-1 mt-1 font-body">
                        <MapPin size={10} className="text-[#A27B5D]" />
                        {item.location}
                      </p>
                    </div>
                  </motion.div>
                ))}
              </div>
            </div>
          </motion.div>

          {/* Nested Lightbox Detailed View */}
          <AnimatePresence>
            {activeItem && (
              <div id="lightbox-overlay" className="fixed inset-0 z-50 flex items-center justify-center p-4">
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  onClick={() => setActiveItem(null)}
                  className="absolute inset-0 bg-[#090B0B]/98 backdrop-blur-lg cursor-pointer"
                />

                <motion.div
                  initial={{ scale: 0.95, opacity: 0 }}
                  animate={{ scale: 1, opacity: 1 }}
                  exit={{ scale: 0.95, opacity: 0 }}
                  transition={{ type: 'spring', damping: 25, stiffness: 220 }}
                  className="relative w-full max-w-4xl bg-[#283133] border border-[#F8F4F2]/12 rounded-lg overflow-hidden z-10 flex flex-col md:flex-row shadow-2xl h-[85vh] md:h-[650px]"
                >
                  {/* Close button on Lightbox */}
                  <button
                    onClick={() => setActiveItem(null)}
                    className="absolute top-4 right-4 p-2 text-[#F8F4F2]/60 hover:text-[#A27B5D] transition-colors rounded-full bg-[#090B0B]/60 backdrop-blur-md z-30"
                    id="close-lightbox"
                  >
                    <X size={18} />
                  </button>

                  {/* Left: Beautiful image frame */}
                  <div className="flex-1 bg-[#090B0B] flex items-center justify-center p-4 relative overflow-hidden h-1/2 md:h-full">
                    <img
                      src={activeItem.imageUrl}
                      alt={activeItem.title}
                      referrerPolicy="no-referrer"
                      className="max-w-full max-h-full object-contain z-10 shadow-lg"
                    />
                    <div className="absolute inset-0 bg-[#090B0B]/30 pointer-events-none" />
                  </div>

                  {/* Right: Technical Metadata details */}
                  <div className="w-full md:w-80 border-t md:border-t-0 md:border-l border-[#F8F4F2]/10 p-6 flex flex-col justify-between bg-[#283133] h-1/2 md:h-full overflow-y-auto">
                    <div>
                      {/* Section tag */}
                      <div className="inline-flex items-center gap-1.5 px-2 py-0.5 rounded bg-[#090B0B]/40 border border-[#F8F4F2]/5 text-[9px] uppercase tracking-widest text-[#A27B5D] font-semibold mb-3">
                        <Compass size={9} />
                        <span>Shot Profile</span>
                      </div>

                      {/* Main Title */}
                      <h4 className="font-display text-2xl font-bold text-[#F8F4F2] leading-tight mb-2">
                        {activeItem.title}
                      </h4>

                      <div className="flex items-center gap-1.5 text-xs text-[#F8F4F2]/50 font-body mb-6">
                        <MapPin size={12} className="text-[#A27B5D]" />
                        <span>{activeItem.location}</span>
                      </div>

                      {/* Technical specifications partition */}
                      <div className="border-t border-[#F8F4F2]/10 pt-4 mt-4 space-y-4 font-mono">
                        <span className="text-[10px] uppercase tracking-wider text-[#F8F4F2]/30 block font-semibold mb-2">
                          EXIF / Technical Data
                        </span>

                        <div className="grid grid-cols-2 gap-x-2 gap-y-3 text-xs">
                          <div className="p-2.5 rounded bg-[#090B0B]/30 border border-[#F8F4F2]/5">
                            <span className="text-[9px] uppercase text-[#F8F4F2]/30 block">SYSTEM / CAMERA</span>
                            <span className="text-[#F8F4F2]/90 text-[11px] font-medium block mt-0.5 truncate" title={activeItem.gear}>
                              {activeItem.gear}
                            </span>
                          </div>

                          <div className="p-2.5 rounded bg-[#090B0B]/30 border border-[#F8F4F2]/5">
                            <span className="text-[9px] uppercase text-[#F8F4F2]/30 block">LENS SELECTION</span>
                            <span className="text-[#F8F4F2]/90 text-[11px] font-medium block mt-0.5 truncate" title={activeItem.settings.lens}>
                              {activeItem.settings.lens}
                            </span>
                          </div>

                          <div className="p-2.5 rounded bg-[#090B0B]/30 border border-[#F8F4F2]/5">
                            <span className="text-[9px] uppercase text-[#F8F4F2]/30 block">APERTURE</span>
                            <span className="text-[#A27B5D] text-xs font-semibold block mt-0.5">
                              {activeItem.settings.aperture}
                            </span>
                          </div>

                          <div className="p-2.5 rounded bg-[#090B0B]/30 border border-[#F8F4F2]/5">
                            <span className="text-[9px] uppercase text-[#F8F4F2]/30 block">SHUTTER</span>
                            <span className="text-[#F8F4F2]/90 text-xs font-semibold block mt-0.5">
                              {activeItem.settings.shutter}
                            </span>
                          </div>

                          <div className="p-2.5 rounded bg-[#090B0B]/30 border border-[#F8F4F2]/5">
                            <span className="text-[9px] uppercase text-[#F8F4F2]/30 block">SENSITIVITY</span>
                            <span className="text-[#F8F4F2]/90 text-xs block mt-0.5">
                              ISO {activeItem.settings.iso}
                            </span>
                          </div>

                          <div className="p-2.5 rounded bg-[#090B0B]/30 border border-[#F8F4F2]/5">
                            <span className="text-[9px] uppercase text-[#F8F4F2]/30 block">MEDIUM FORMAT</span>
                            <span className="text-[#F8F4F2]/90 text-xs block mt-0.5 flex items-center gap-1">
                              <Film size={11} className="text-[#A27B5D]" />
                              {activeItem.settings.film ? 'Film Preset' : 'Digital Raw'}
                            </span>
                          </div>
                        </div>

                        {activeItem.settings.film && (
                          <div className="p-3 rounded bg-[#A27B5D]/5 border border-[#A27B5D]/15 text-[11px] flex items-start gap-2 text-[#F8F4F2]/75">
                            <Info size={13} className="text-[#A27B5D] shrink-0 mt-0.5" />
                            <span>
                              Captured analogically using authentic <strong>{activeItem.settings.film}</strong> film emulsions.
                            </span>
                          </div>
                        )}
                      </div>
                    </div>

                    <div className="mt-6 pt-4 border-t border-[#F8F4F2]/10 text-center">
                      <button
                        onClick={() => setActiveItem(null)}
                        className="w-full py-2 bg-transparent hover:bg-[#F8F4F2]/5 border border-[#F8F4F2]/15 hover:border-[#A27B5D]/50 text-xs font-body text-[#F8F4F2]/80 hover:text-[#A27B5D] rounded transition-all cursor-pointer"
                      >
                        Return to Archives
                      </button>
                    </div>
                  </div>
                </motion.div>
              </div>
            )}
          </AnimatePresence>
        </div>
      )}
    </AnimatePresence>
  );
}
