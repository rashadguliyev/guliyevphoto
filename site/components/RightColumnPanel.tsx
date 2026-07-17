/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React from 'react';
import { motion } from 'motion/react';
import { BookOpen, Newspaper, Award, ArrowUpRight } from 'lucide-react';
import { pressMentions } from '../data';

interface RightColumnPanelProps {
  onViewPortfolio: () => void;
  onBookSession: () => void;
}

export default function RightColumnPanel({ onViewPortfolio, onBookSession }: RightColumnPanelProps) {
  return (
    <div className="hero-right flex flex-col gap-4.5 pt-2 md:pt-4" id="right-column-panel">
      
      {/* Published Works Stat Card */}
      <motion.div
        initial={{ opacity: 0, x: 20 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ delay: 0.3 }}
        className="card group hover:border-[#A27B5D]/40 transition-all duration-300"
      >
        <div className="panel-tag">Selected Press</div>
        
        {/* Card Media Preview Box */}
        <div className="card-media relative overflow-hidden group-hover:bg-[#090B0B]/40 transition-colors">
          <div className="absolute inset-0 bg-[#090B0B]/65 group-hover:bg-[#090B0B]/40 transition-colors flex flex-col justify-center items-center z-10 p-4 text-center">
            <span className="text-[10px] uppercase text-[#A27B5D] tracking-widest font-semibold">Latest Publication</span>
            <p className="font-display text-base text-[#F8F4F2] mt-1 italic">"The Poetry of Shadow" — Kinfolk</p>
          </div>
          <img
            src="https://images.unsplash.com/photo-1544005313-94ddf0286df2?auto=format&fit=crop&q=80&w=400"
            alt="Published sample"
            referrerPolicy="no-referrer"
            className="w-full h-full object-cover grayscale opacity-40 group-hover:opacity-60 transition-all duration-500 scale-105 group-hover:scale-100"
          />
        </div>

        <div className="flex justify-between items-end mt-2">
          <div>
            <div className="big-number text-3xl font-display font-semibold text-[#F8F4F2]">12+</div>
            <div className="card-caption text-[11px] text-[#F8F4F2]/50 uppercase tracking-wider font-body mt-0.5">
              Published Editorials
            </div>
          </div>
          <BookOpen size={20} className="text-[#A27B5D] opacity-60 mb-1" />
        </div>
      </motion.div>

      {/* Brand Alignment & Press Strips */}
      <motion.div
        initial={{ opacity: 0, x: 20 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ delay: 0.4 }}
        className="card hover:border-[#A27B5D]/30 transition-colors"
      >
        <div className="panel-tag">Affiliations</div>
        
        <div className="space-y-3 font-body my-1">
          {pressMentions.map((mention, index) => (
            <div
              key={index}
              className="flex justify-between items-center text-xs text-[#F8F4F2]/75 border-b border-[#F8F4F2]/5 pb-2 last:border-b-0 last:pb-0"
            >
              <span className="flex items-center gap-2 font-medium">
                <span className="w-1 h-1 rounded-full bg-[#A27B5D]" />
                {mention.company}
              </span>
              <span className="text-[10px] text-[#F8F4F2]/40 font-mono">{mention.year}</span>
            </div>
          ))}
        </div>

        {/* Dynamic Logo Strip Text */}
        <div className="logo-strip text-[10px] text-[#F8F4F2]/30 flex items-center gap-1 mt-4 pt-3 border-t border-[#F8F4F2]/5 uppercase tracking-widest font-mono">
          <Newspaper size={12} className="text-[#A27B5D]/60" />
          <span>VOGUE • KINFOLK • APERTURE • THE CUT</span>
        </div>
      </motion.div>

      {/* Analog/Medium Format CTA Card */}
      <motion.div
        initial={{ opacity: 0, x: 20 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ delay: 0.5 }}
        className="card hover:border-[#A27B5D]/30 transition-colors flex flex-col justify-between"
      >
        <div>
          <div className="panel-tag">Creative Medium</div>
          <h5 className="font-display text-lg font-semibold text-[#F8F4F2] leading-tight mb-2">
            Medium Format & <span className="text-[#A27B5D] italic">Analog Emulsions</span>
          </h5>
          <p className="text-xs text-[#F8F4F2]/60 font-body leading-relaxed mb-4">
            Specializing in chemical development, utilizing Hasselblad and Pentax medium format bodies for unmatched grain, latitude, and timeless dynamic color tones.
          </p>
        </div>

        <button
          onClick={onBookSession}
          className="btn btn-filled w-full justify-center gap-2 text-xs py-2.5 bg-[#A27B5D] text-[#090B0B] font-semibold hover:bg-[#AA876C] rounded transition-all cursor-pointer flex items-center"
        >
          <span>Commission a Project</span>
          <ArrowUpRight size={14} />
        </button>
      </motion.div>
      
    </div>
  );
}
