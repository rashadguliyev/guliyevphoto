/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { useSiteData } from '../SiteDataContext';
import { SlidersHorizontal, Camera, MapPin, Maximize2, ShieldAlert, LayoutGrid, GalleryHorizontal } from 'lucide-react';
import PortfolioCarousel from './PortfolioCarousel';

interface PortfolioPageProps {
  onBookSession: () => void;
}

export default function PortfolioPage({ onBookSession }: PortfolioPageProps) {
  const { portfolioItems, get } = useSiteData();
  const [selectedCategory, setSelectedCategory] = useState<string>('all');
  const [viewMode, setViewMode] = useState<'carousel' | 'grid'>('carousel');
  const [activeItem, setActiveItem] = useState<any | null>(null);

  const categories = [
    { id: 'all', label: 'All Plates' },
    { id: 'portraits', label: 'Portraits' },
    { id: 'family', label: 'Family & Couples' },
    { id: 'branding', label: 'Headshots & Personal Branding' },
    { id: 'product', label: 'Product & Brand' },
    { id: 'event', label: 'Events' }
  ];

  const filteredItems = selectedCategory === 'all'
    ? portfolioItems
    : portfolioItems.filter(item => item.category === selectedCategory);

  return (
    <div className="bg-[#090B0B] text-[#F8F4F2] pt-12 pb-24 font-body">
      
      {/* HEADER */}
      <section className="relative py-20 px-5 md:px-12 text-center max-w-4xl mx-auto border-b border-[#F8F4F2]/10">
        <span className="text-[10px] uppercase tracking-[0.25em] text-[#A27B5D] font-bold block mb-4">
          {get('portfolio.eyebrow')}
        </span>
        <h1 className="font-display text-4xl md:text-6xl font-semibold leading-tight text-[#F8F4F2] mb-6">
          {get('portfolio.heading')}
        </h1>
        <p className="text-sm md:text-base text-[#F8F4F2]/75 leading-relaxed max-w-2xl mx-auto">
          {get('portfolio.intro')}
        </p>
      </section>

      {/* FILTER CONTROLS */}
      <section className="max-w-[1200px] mx-auto px-5 md:px-12 py-8 flex flex-col lg:flex-row lg:items-center justify-between gap-6 border-b border-[#F8F4F2]/5">
        <div className="flex flex-col md:flex-row md:items-center gap-4">
          <div className="flex items-center gap-2 text-xs text-[#F8F4F2]/50 uppercase tracking-widest font-mono shrink-0">
            <SlidersHorizontal size={12} className="text-[#A27B5D]" />
            <span>Category:</span>
          </div>
          <div className="flex flex-wrap gap-1.5">
            {categories.map((cat) => (
              <button
                key={cat.id}
                onClick={() => setSelectedCategory(cat.id)}
                className={`px-3.5 py-1.5 rounded text-xs tracking-wider transition-all cursor-pointer font-body ${
                  selectedCategory === cat.id
                    ? 'bg-[#A27B5D] text-[#090B0B] font-semibold'
                    : 'bg-[#283133]/60 text-[#F8F4F2]/70 hover:bg-[#283133]/80 hover:text-[#F8F4F2]'
                }`}
              >
                {cat.label}
              </button>
            ))}
          </div>
        </div>

        {/* Exhibition Mode Toggle */}
        <div className="flex items-center gap-3 self-start lg:self-auto border-t lg:border-t-0 pt-4 lg:pt-0 w-full lg:w-auto border-[#F8F4F2]/5">
          <span className="text-[10px] text-[#F8F4F2]/40 uppercase tracking-widest font-mono">Exhibition Mode:</span>
          <div className="bg-[#283133]/40 p-1 rounded flex gap-1 border border-[#F8F4F2]/8">
            <button
              onClick={() => setViewMode('carousel')}
              className={`px-3 py-1.5 rounded text-xs flex items-center gap-2 tracking-wider cursor-pointer transition-all ${
                viewMode === 'carousel'
                  ? 'bg-[#A27B5D] text-[#090B0B] font-semibold'
                  : 'text-[#F8F4F2]/70 hover:text-[#F8F4F2]'
              }`}
              title="3D Curved Carousel"
            >
              <GalleryHorizontal size={12} />
              <span>Carousel</span>
            </button>
            <button
              onClick={() => setViewMode('grid')}
              className={`px-3 py-1.5 rounded text-xs flex items-center gap-2 tracking-wider cursor-pointer transition-all ${
                viewMode === 'grid'
                  ? 'bg-[#A27B5D] text-[#090B0B] font-semibold'
                  : 'text-[#F8F4F2]/70 hover:text-[#F8F4F2]'
              }`}
              title="Exhibition Grid"
            >
              <LayoutGrid size={12} />
              <span>Grid</span>
            </button>
          </div>
        </div>
      </section>

      {/* PORTFOLIO EXHIBITION STAGE */}
      <div className="relative">
        <AnimatePresence mode="wait">
          {viewMode === 'carousel' ? (
            <motion.div
              key="carousel-view"
              initial={{ opacity: 0, scale: 0.98 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.98 }}
              transition={{ duration: 0.4 }}
              className="py-6"
            >
              <PortfolioCarousel
                items={filteredItems}
                onSelectCategory={setSelectedCategory}
                selectedCategory={selectedCategory}
                categories={categories}
                onViewDetails={setActiveItem}
              />
            </motion.div>
          ) : (
            <motion.section
              key="grid-view"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.4 }}
              className="max-w-[1200px] mx-auto px-5 md:px-12 py-16"
            >
              <motion.div 
                layout
                className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
              >
                <AnimatePresence mode="popLayout">
                  {filteredItems.map((item) => (
                    <motion.div
                      key={item.id}
                      layout
                      initial={{ opacity: 0, scale: 0.95 }}
                      animate={{ opacity: 1, scale: 1 }}
                      exit={{ opacity: 0, scale: 0.95 }}
                      transition={{ duration: 0.3 }}
                      onClick={() => setActiveItem(item)}
                      className="group cursor-pointer relative bg-[#283133]/40 border border-[#F8F4F2]/12 rounded overflow-hidden hover:border-[#A27B5D]/40 transition-all duration-300 flex flex-col h-full"
                    >
                      {/* Image Aspect Box */}
                      <div className="overflow-hidden relative bg-[#090B0B]">
                        <img 
                          src={item.imageUrl} 
                          alt={item.title} 
                          className="block w-full h-auto object-contain transition-transform duration-700 group-hover:scale-[1.02] grayscale group-hover:grayscale-0"
                          referrerPolicy="no-referrer"
                        />
                        <div className="absolute inset-0 bg-gradient-to-t from-[#090B0B]/90 via-[#090B0B]/20 to-transparent opacity-80" />
                        
                        {/* Hover Maximizer HUD */}
                        <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none">
                          <div className="w-12 h-12 border border-[#A27B5D]/50 rounded-full flex items-center justify-center bg-[#090B0B]/65 backdrop-blur-sm">
                            <Maximize2 size={14} className="text-[#A27B5D]" />
                          </div>
                        </div>
                      </div>

                      {/* Details Block */}
                      <div className="p-6 mt-auto">
                        <div className="text-[9px] text-[#A27B5D] font-mono uppercase tracking-widest mb-1.5 font-semibold">{item.category}</div>
                        <h3 className="font-display text-lg text-[#F8F4F2] group-hover:text-[#A27B5D] transition-colors font-semibold leading-snug">
                          {item.title}
                        </h3>
                        {item.description && <p className="text-xs text-[#F8F4F2]/55 mt-2 leading-relaxed">{item.description}</p>}
                      </div>

                    </motion.div>
                  ))}
                </AnimatePresence>
              </motion.div>
            </motion.section>
          )}
        </AnimatePresence>
      </div>

      {/* DETAIL MODAL OVERLAY */}
      <AnimatePresence>
        {activeItem && (
          <div 
            className="fixed inset-0 bg-[#090B0B]/95 z-50 flex items-center justify-center p-4 backdrop-blur-sm"
            onClick={() => setActiveItem(null)}
          >
            <motion.div 
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.95 }}
              className="bg-[#283133] border border-[#F8F4F2]/10 rounded-lg max-w-4xl w-full max-h-[90vh] overflow-hidden flex flex-col md:flex-row shadow-2xl"
              onClick={(e) => e.stopPropagation()}
            >
              {/* Photo Area */}
              <div className="md:w-3/5 bg-[#090B0B] flex items-center justify-center overflow-hidden">
                <img 
                  src={activeItem.imageUrl} 
                  alt={activeItem.title} 
                  className="max-h-[80vh] w-full h-auto object-contain"
                  referrerPolicy="no-referrer"
                />
              </div>

              {/* Data Specifications Area */}
              <div className="md:w-2/5 p-8 flex flex-col justify-between h-full bg-[#283133]">
                  <div className="space-y-5">
                  <div>
                    <span className="text-[9px] uppercase tracking-widest font-mono text-[#A27B5D] font-bold block mb-1">
                      {activeItem.category}
                    </span>
                    <h2 className="font-display text-2xl font-bold text-[#F8F4F2] leading-tight">
                      {activeItem.title}
                    </h2>
                  </div>

                  {activeItem.description && <p className="border-t border-[#F8F4F2]/10 pt-5 text-sm leading-7 text-[#F8F4F2]/70">{activeItem.description}</p>}
                </div>

                <div className="pt-8 border-t border-[#F8F4F2]/10 mt-8 space-y-3.5">
                  <button
                    onClick={() => {
                      setActiveItem(null);
                      onBookSession();
                    }}
                    className="w-full bg-[#A27B5D] hover:bg-[#AA876C] text-[#090B0B] font-semibold py-3 px-4 rounded text-xs tracking-wider uppercase transition-colors cursor-pointer text-center"
                  >
                    Inquire For Session
                  </button>
                  <button
                    onClick={() => setActiveItem(null)}
                    className="w-full bg-transparent border border-[#F8F4F2]/15 hover:border-[#F8F4F2]/30 text-[#F8F4F2]/80 font-semibold py-2 px-4 rounded text-xs tracking-wider uppercase transition-colors cursor-pointer text-center"
                  >
                    Close
                  </button>
                </div>

              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>

    </div>
  );
}
