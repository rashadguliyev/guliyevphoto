/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React from 'react';
import { Camera, MapPin, Sparkles, Heart, Award, Target, HelpCircle } from 'lucide-react';
import { useSiteData } from '../SiteDataContext';

interface AboutPageProps {
  onBookSession: () => void;
}

export default function AboutPage({ onBookSession }: AboutPageProps) {
  const { get } = useSiteData();
  const paragraphs = (key: string) => get(key).split(/\n\n+/).map((text, index) => <p key={index}>{text}</p>);
  return (
    <div className="bg-[#090B0B] text-[#F8F4F2] pt-12 pb-24 font-body">
      {/* 1. HERO HEADER */}
      <section className="relative py-20 px-5 md:px-12 text-center max-w-4xl mx-auto border-b border-[#F8F4F2]/10">
        <span className="text-[10px] uppercase tracking-[0.25em] text-[#A27B5D] font-bold block mb-4">
          {get('about.eyebrow')}
        </span>
        <h1 className="font-display text-4xl md:text-6xl font-semibold leading-tight text-[#F8F4F2] mb-6">
          {get('about.heading', 'Hi, I’m Rashad')}
        </h1>
        <p className="text-sm md:text-base text-[#F8F4F2]/75 leading-relaxed max-w-2xl mx-auto">
          {get('about.intro')}
        </p>
      </section>

      {/* 2. CORE BIOGRAPHY CHAPTERS */}
      <section className="py-20 px-5 md:px-12 max-w-[1200px] mx-auto grid grid-cols-1 lg:grid-cols-12 gap-16 items-start">
        
        {/* Left Column: Chapters */}
        <div className="lg:col-span-7 space-y-12">
          
          {/* Chapter 1: Where My Interest in Art Began */}
          <div className="space-y-4">
            <span className="text-[10px] font-mono text-[#A27B5D] font-bold block">CHAPTER ONE</span>
            <h2 className="font-display text-3xl font-semibold text-[#F8F4F2]">
              {get('about.chapter1.title')}
            </h2>
            <div className="text-xs md:text-sm text-[#F8F4F2]/70 leading-relaxed space-y-4 font-body">
              {paragraphs('about.chapter1.body')}
            </div>
          </div>

          {/* Chapter 2: From Baku to Dallas */}
          <div className="space-y-4">
            <span className="text-[10px] font-mono text-[#A27B5D] font-bold block">CHAPTER TWO</span>
            <h2 className="font-display text-3xl font-semibold text-[#F8F4F2]">
              {get('about.chapter2.title')}
            </h2>
            <div className="text-xs md:text-sm text-[#F8F4F2]/70 leading-relaxed space-y-4 font-body">
              {paragraphs('about.chapter2.body')}
            </div>
          </div>

          {/* Chapter 3: Photography Meets Marketing */}
          <div className="space-y-4">
            <span className="text-[10px] font-mono text-[#A27B5D] font-bold block">CHAPTER THREE</span>
            <h2 className="font-display text-3xl font-semibold text-[#F8F4F2]">
              {get('about.chapter3.title')}
            </h2>
            <div className="text-xs md:text-sm text-[#F8F4F2]/70 leading-relaxed space-y-4 font-body">
              {paragraphs('about.chapter3.body')}
            </div>
          </div>

          {/* Chapter 4: Creating Content That Connects */}
          <div className="space-y-4">
            <span className="text-[10px] font-mono text-[#A27B5D] font-bold block">CHAPTER FOUR</span>
            <h2 className="font-display text-3xl font-semibold text-[#F8F4F2]">
              {get('about.chapter4.title')}
            </h2>
            <div className="text-xs md:text-sm text-[#F8F4F2]/70 leading-relaxed space-y-4 font-body">
              {paragraphs('about.chapter4.body')}
            </div>
          </div>

          {/* Chapter 5: My Approach */}
          <div className="space-y-4">
            <span className="text-[10px] font-mono text-[#A27B5D] font-bold block">CHAPTER FIVE</span>
            <h2 className="font-display text-3xl font-semibold text-[#F8F4F2]">
              {get('about.chapter5.title')}
            </h2>
            <div className="text-xs md:text-sm text-[#F8F4F2]/70 leading-relaxed space-y-4 font-body">
              {paragraphs('about.chapter5.body')}
            </div>
          </div>

        </div>

        {/* Right Column: Visual Accent Panel */}
        <div className="lg:col-span-5 space-y-8 sticky top-24">
          <div className="aspect-[4/5] rounded bg-[#283133]/20 border border-[#F8F4F2]/10 overflow-hidden relative">
            <img 
              src={get('about.portrait')} 
              alt="Rashad in the Field"
              className="w-full h-full object-cover grayscale scale-[1.02]"
              referrerPolicy="no-referrer"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-[#090B0B]/80 to-transparent" />
            <div className="absolute bottom-6 left-6 flex items-center gap-2 font-mono text-[9px] uppercase tracking-wider text-[#F8F4F2]/50">
              <MapPin size={10} className="text-[#A27B5D]" />
              <span>Dallas-Fort Worth, Texas</span>
            </div>
          </div>

          <div className="p-6 rounded bg-[#283133]/20 border border-[#F8F4F2]/10 space-y-4">
            <h4 className="font-display text-lg font-semibold text-[#F8F4F2]">Verified Credentials</h4>
            <div className="space-y-3 font-mono text-[10px] text-[#F8F4F2]/70">
              <div className="flex justify-between border-b border-[#F8F4F2]/5 pb-1.5">
                <span>MASTER'S DEGREE:</span>
                <span className="text-[#A27B5D] text-right">MARKETING</span>
              </div>
              <div className="flex justify-between border-b border-[#F8F4F2]/5 pb-1.5">
                <span>FOCUS AREAS:</span>
                <span className="text-right">BRAND, DIGITAL & FRANCHISE</span>
              </div>
              <div className="flex justify-between border-b border-[#F8F4F2]/5 pb-1.5">
                <span>CONTENT REACH:</span>
                <span className="text-right">MILLIONS OF VIEWERS</span>
              </div>
              <div className="flex justify-between">
                <span>FOUNDERED:</span>
                <span className="text-right">GULIYEV PHOTO</span>
              </div>
            </div>
          </div>
        </div>

      </section>

      {/* 3. CLOSING CTA */}
      <section className="py-20 px-5 md:px-12 text-center max-w-4xl mx-auto border-t border-[#F8F4F2]/10">
        <h2 className="font-display text-4xl font-semibold mb-4 text-[#F8F4F2]">
          {get('about.cta.heading')}
        </h2>
        <p className="text-xs md:text-sm text-[#F8F4F2]/75 leading-relaxed max-w-xl mx-auto mb-8 font-body">
          {get('about.cta.body')}
        </p>
        <button
          onClick={onBookSession}
          className="btn bg-[#A27B5D] hover:bg-[#AA876C] text-[#090B0B] font-semibold py-3.5 px-8 rounded text-xs tracking-wider uppercase font-body"
        >
          {get('about.cta.button')}
        </button>
      </section>
    </div>
  );
}
