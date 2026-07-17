/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState } from 'react';
import { motion } from 'motion/react';
import { 
  ArrowRight, 
  Sparkles, 
  Check, 
  MapPin, 
  Star, 
  ChevronDown, 
  ChevronUp, 
  Compass, 
  Users, 
  Target, 
  Briefcase, 
  Clock 
} from 'lucide-react';
import { useSiteData } from '../SiteDataContext';
import { defaultFaqs, defaultTestimonials, parseJsonSetting } from '../contentModels';

interface HomePageContentProps {
  setActiveView: (view: string) => void;
  onBookSession: () => void;
}

export default function HomePageContent({ setActiveView, onBookSession }: HomePageContentProps) {
  const { get } = useSiteData();
  const [openFaq, setOpenFaq] = useState<number | null>(null);

  const toggleFaq = (index: number) => {
    setOpenFaq(openFaq === index ? null : index);
  };

  const services = [
    {
      title: get('home.services.1.title'),
      copy: get('home.services.1.copy'),
      linkText: get('home.services.1.button'),
      view: "portrait"
    },
    {
      title: get('home.services.2.title'),
      copy: get('home.services.2.copy'),
      linkText: get('home.services.2.button'),
      view: "family"
    },
    {
      title: get('home.services.3.title'),
      copy: get('home.services.3.copy'),
      linkText: get('home.services.3.button'),
      view: "branding"
    },
    {
      title: get('home.services.4.title'),
      copy: get('home.services.4.copy'),
      linkText: get('home.services.4.button'),
      view: "product"
    },
    {
      title: get('home.services.5.title'),
      copy: get('home.services.5.copy'),
      linkText: get('home.services.5.button'),
      view: "event"
    }
  ];

  const advantagePoints = [
    "Website and landing page photography",
    "E-commerce and product imagery",
    "Social media content",
    "Advertising and campaign creative",
    "Executive and employee headshots",
    "Workplace and hospitality photography",
    "Vertical and horizontal content formats",
    "Photography designed for repurposing"
  ];

  const steps = [
    {
      number: "01",
      title: get('home.process.1.title'),
      text: get('home.process.1.body')
    },
    {
      number: "02",
      title: get('home.process.2.title'),
      text: get('home.process.2.body')
    },
    {
      number: "03",
      title: get('home.process.3.title'),
      text: get('home.process.3.body')
    },
    {
      number: "04",
      title: get('home.process.4.title'),
      text: get('home.process.4.body')
    }
  ];

  const reviews = parseJsonSetting(get('home.testimonials.data'), defaultTestimonials);
  const faqs = parseJsonSetting(get('home.faq.data'), defaultFaqs);

  return (
    <div className="home-content bg-[#090B0B]" id="home-view-sections">
      
      {/* 1. INTRODUCTION SECTION */}
      <section className="bg-[#F8F4F2] text-[#283133] py-24 px-5 md:px-12 border-b border-[#DED4C7]">
        <div className="max-w-[1200px] mx-auto grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          <div className="lg:col-span-4">
            <span className="text-[10px] uppercase tracking-[0.2em] text-[#A27B5D] font-bold block mb-3">
              {get('home.intro.eyebrow')}
            </span>
            <h2 className="font-display text-4xl md:text-5xl text-[#2C3638] font-semibold leading-tight tracking-tight">
              {get('home.intro.heading')}
            </h2>
          </div>
          <div className="lg:col-span-8 space-y-6 text-sm md:text-base leading-relaxed text-[#283133]/80">
            {get('home.intro.body').split(/\n\n+/).map((paragraph, index) => <p key={index}>{paragraph}</p>)}
            <div className="pt-2">
              <button 
                onClick={() => setActiveView('about')}
                className="inline-flex items-center gap-2 text-xs font-semibold uppercase tracking-wider text-[#A27B5D] hover:text-[#AA876C] transition-colors"
              >
                <span>{get('home.intro.button')}</span>
                <ArrowRight size={14} />
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* 2. SERVICES SECTION */}
      <section className="py-24 px-5 md:px-12 max-w-[1200px] mx-auto">
        <div className="text-center max-w-2xl mx-auto mb-16">
          <span className="text-[10px] uppercase tracking-[0.2em] text-[#A27B5D] font-bold block mb-2">
            {get('home.services.eyebrow')}
          </span>
          <h2 className="font-display text-3xl md:text-5xl font-semibold mb-4 text-[#F8F4F2]">
            {get('home.services.heading')}
          </h2>
          <p className="text-[#F8F4F2]/60 text-sm md:text-base">
            {get('home.services.intro')}
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {services.map((svc, i) => (
            <div 
              key={i}
              className={`p-8 rounded bg-[#283133]/20 border border-[#F8F4F2]/10 hover:border-[#A27B5D]/40 transition-all duration-300 flex flex-col justify-between ${
                i === 3 || i === 4 ? 'md:col-span-1 lg:col-span-1' : ''
              }`}
            >
              <div>
                <span className="text-[#A27B5D] text-xs font-mono font-bold block mb-3">0{i+1}</span>
                <h3 className="font-display text-2xl font-semibold text-[#F8F4F2] mb-3">{svc.title}</h3>
                <p className="text-xs text-[#F8F4F2]/60 leading-relaxed font-body mb-6">{svc.copy}</p>
              </div>
              <button 
                onClick={() => setActiveView(svc.view)}
                className="inline-flex items-center gap-1.5 text-xs font-semibold text-[#A27B5D] hover:text-[#AA876C] transition-colors mt-auto self-start"
              >
                <span>{svc.linkText}</span>
                <ArrowRight size={12} />
              </button>
            </div>
          ))}
        </div>
      </section>

      {/* 3. MARKETING ADVANTAGE SECTION */}
      <section className="bg-[#283133]/10 py-24 px-5 md:px-12 border-y border-[#F8F4F2]/5">
        <div className="max-w-[1200px] mx-auto grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          <div className="lg:col-span-6 space-y-6">
            <span className="text-[10px] uppercase tracking-[0.2em] text-[#A27B5D] font-bold block">
              {get('home.marketing.eyebrow')}
            </span>
            <h2 className="font-display text-4xl md:text-5xl font-semibold leading-tight text-[#F8F4F2]">
              {get('home.marketing.heading')}
            </h2>
            {get('home.marketing.body').split(/\n\n+/).map((paragraph, index) => <p key={index} className="text-sm md:text-base text-[#F8F4F2]/70 leading-relaxed">{paragraph}</p>)}
            <div className="pt-2">
              <button 
                onClick={() => setActiveView('product')}
                className="btn bg-[#A27B5D] hover:bg-[#AA876C] text-[#090B0B] border border-[#A27B5D] py-3 px-6 rounded text-xs tracking-wider font-semibold cursor-pointer transition-all duration-200"
              >
                {get('home.marketing.button')}
              </button>
            </div>
          </div>
          
          <div className="lg:col-span-6 bg-[#283133]/40 border border-[#F8F4F2]/10 p-8 rounded-lg">
            <h4 className="text-[#A27B5D] uppercase tracking-widest text-[10px] font-bold mb-6">Commercial Production Formats</h4>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {advantagePoints.map((pt, i) => (
                <div key={i} className="flex items-start gap-2.5 text-xs text-[#F8F4F2]/80 leading-relaxed">
                  <span className="w-4 h-4 rounded-full bg-[#A27B5D]/10 flex items-center justify-center text-[#A27B5D] shrink-0 mt-0.5">
                    <Check size={10} />
                  </span>
                  <span>{pt}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* 4. EXPERIENCE SECTION */}
      <section className="py-24 px-5 md:px-12 max-w-[1200px] mx-auto">
        <div className="text-center max-w-2xl mx-auto mb-16">
          <span className="text-[10px] uppercase tracking-[0.2em] text-[#A27B5D] font-bold block mb-2">
            {get('home.process.eyebrow')}
          </span>
          <h2 className="font-display text-3xl md:text-5xl font-semibold mb-4 text-[#F8F4F2]">
            {get('home.process.heading')}
          </h2>
          <p className="text-[#F8F4F2]/60 text-sm md:text-base">
            {get('home.process.intro')}
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
          {steps.map((st, i) => (
            <div key={i} className="relative group">
              <span className="font-display text-5xl font-extrabold text-[#A27B5D]/15 group-hover:text-[#A27B5D]/30 transition-colors block mb-4">
                {st.number}
              </span>
              <h3 className="text-lg font-semibold text-[#F8F4F2] mb-2">{st.title}</h3>
              <p className="text-xs text-[#F8F4F2]/60 leading-relaxed">{st.text}</p>
            </div>
          ))}
        </div>

        <div className="text-center mt-12">
          <button 
            onClick={onBookSession}
            className="btn bg-[#A27B5D] hover:bg-[#AA876C] text-[#090B0B] border border-[#A27B5D] py-3 px-6 rounded text-xs tracking-wider font-semibold cursor-pointer transition-all duration-200"
          >
            {get('home.process.button')}
          </button>
        </div>
      </section>

      {/* 5. ABOUT PREVIEW SECTION */}
      <section className="bg-[#283133]/20 py-24 px-5 md:px-12 border-t border-[#F8F4F2]/5">
        <div className="max-w-[1200px] mx-auto grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          <div className="lg:col-span-5 relative">
            <div className="aspect-[4/5] rounded bg-[#090B0B] border border-[#F8F4F2]/10 overflow-hidden">
              <img 
                src={get('home.portrait')} 
                alt="Rashad Guliyev Portrait"
                className="w-full h-full object-cover grayscale"
                referrerPolicy="no-referrer"
              />
            </div>
          </div>
          <div className="lg:col-span-7 space-y-6">
            <span className="text-[10px] uppercase tracking-[0.2em] text-[#A27B5D] font-bold block">
              {get('home.about.eyebrow')}
            </span>
            <h2 className="font-display text-4xl md:text-5xl font-semibold text-[#F8F4F2]">
              {get('home.about.heading')}
            </h2>
            {get('home.about.body').split(/\n\n+/).map((paragraph, index) => <p key={index} className="text-sm md:text-base text-[#F8F4F2]/70 leading-relaxed">{paragraph}</p>)}
            <div className="pt-2">
              <button 
                onClick={() => setActiveView('about')}
                className="btn border border-[#F8F4F2]/30 hover:border-[#A27B5D] hover:text-[#A27B5D] text-[#F8F4F2] py-3 px-6 rounded text-xs tracking-wider font-semibold cursor-pointer transition-all duration-200"
              >
                {get('home.about.button')}
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* 6. DALLAS LOCATION SECTION */}
      <section className="py-24 px-5 md:px-12 max-w-[1200px] mx-auto">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          <div className="lg:col-span-7 space-y-6">
            <span className="text-[10px] uppercase tracking-[0.2em] text-[#A27B5D] font-bold block">
              {get('home.location.eyebrow')}
            </span>
            <h2 className="font-display text-4xl md:text-5xl font-semibold text-[#F8F4F2]">
              {get('home.location.heading')}
            </h2>
            {get('home.location.body').split(/\n\n+/).map((paragraph, index) => <p key={index} className="text-sm md:text-base text-[#F8F4F2]/70 leading-relaxed">{paragraph}</p>)}
            <div className="pt-2">
              <button 
                onClick={() => setActiveView('contact')}
                className="inline-flex items-center gap-2 text-xs font-semibold uppercase tracking-wider text-[#A27B5D] hover:text-[#AA876C] transition-colors"
              >
                <span>{get('home.location.button')}</span>
                <ArrowRight size={14} />
              </button>
            </div>
          </div>
          <div className="lg:col-span-5 bg-[#283133]/20 border border-[#F8F4F2]/10 p-8 rounded">
            <h4 className="text-[#A27B5D] uppercase tracking-widest text-[10px] font-bold mb-4 flex items-center gap-1.5">
              <MapPin size={12} />
              <span>DFW Service Areas</span>
            </h4>
            <ul className="grid grid-cols-2 gap-3 text-xs text-[#F8F4F2]/70 font-mono">
              <li>• Dallas</li>
              <li>• Lake Highlands</li>
              <li>• White Rock Lake</li>
              <li>• Richardson</li>
              <li>• Plano</li>
              <li>• Garland</li>
              <li>• Addison</li>
              <li>• Irving</li>
              <li>• Las Colinas</li>
              <li>• North Dallas</li>
            </ul>
          </div>
        </div>
      </section>

      {/* 7. REVIEWS SECTION */}
      <section className="bg-[#283133]/15 py-24 px-5 md:px-12 border-t border-[#F8F4F2]/5">
        <div className="max-w-[1200px] mx-auto">
          <div className="text-center max-w-2xl mx-auto mb-16">
            <span className="text-[10px] uppercase tracking-[0.2em] text-[#A27B5D] font-bold block mb-2">
              {get('home.testimonials.eyebrow')}
            </span>
            <h2 className="font-display text-3xl md:text-5xl font-semibold text-[#F8F4F2]">
              {get('home.testimonials.heading')}
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {reviews.map((rev, i) => (
              <div key={i} className="p-8 rounded bg-[#090B0B]/60 border border-[#F8F4F2]/10 flex flex-col justify-between">
                <div>
                  {rev.imageUrl && <img src={rev.imageUrl} alt={rev.name} className="mb-5 h-14 w-14 rounded-full border border-[#A27B5D]/30 object-cover" />}
                  <div className="flex items-center gap-1 mb-4 text-[#A27B5D]">
                    {[...Array(5)].map((_, j) => (
                      <Star key={j} size={12} fill="currentColor" />
                    ))}
                  </div>
                  <p className="text-xs text-[#F8F4F2]/75 leading-relaxed italic mb-6">
                    "{rev.text}"
                  </p>
                </div>
                <div className="border-t border-[#F8F4F2]/5 pt-4 flex justify-between items-center">
                  <span className="text-xs font-semibold text-[#F8F4F2]">{rev.name}</span>
                  <span className="text-[10px] text-[#A27B5D] uppercase tracking-wider font-mono">{rev.type}</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 8. HOME FAQ SECTION */}
      <section className="py-24 px-5 md:px-12 max-w-[800px] mx-auto">
        <div className="text-center mb-16">
          <span className="text-[10px] uppercase tracking-[0.2em] text-[#A27B5D] font-bold block mb-2">
            {get('home.faq.eyebrow')}
          </span>
          <h2 className="font-display text-3xl md:text-4xl font-semibold text-[#F8F4F2]">
            {get('home.faq.heading')}
          </h2>
        </div>

        <div className="space-y-4">
          {faqs.map((faq, idx) => (
            <div 
              key={idx}
              className="border-b border-[#F8F4F2]/10 pb-4"
            >
              <button
                onClick={() => toggleFaq(idx)}
                className="w-full flex items-center justify-between text-left py-3 font-medium text-sm md:text-base text-[#F8F4F2] hover:text-[#A27B5D] transition-colors focus:outline-none"
              >
                <span>{faq.question}</span>
                {openFaq === idx ? (
                  <ChevronUp size={16} className="text-[#A27B5D]" />
                ) : (
                  <ChevronDown size={16} className="text-[#F8F4F2]/40" />
                )}
              </button>
              
              {openFaq === idx && (
                <motion.div
                  initial={{ opacity: 0, height: 0 }}
                  animate={{ opacity: 1, height: 'auto' }}
                  className="text-xs md:text-sm text-[#F8F4F2]/65 leading-relaxed pt-2 pl-1 pr-6"
                >
                  {faq.answer}
                </motion.div>
              )}
            </div>
          ))}
        </div>
      </section>

      {/* 9. FINAL HOME CTA */}
      <section className="bg-[#2C3638] text-[#F8F4F2] py-24 px-5 md:px-12 text-center border-t border-[#F8F4F2]/5 relative overflow-hidden">
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-[#A27B5D]/10 rounded-full blur-[160px] pointer-events-none" />
        
        <div className="relative z-10 max-w-2xl mx-auto space-y-6">
          <span className="text-[10px] uppercase tracking-[0.2em] text-[#A27B5D] font-bold block">
            {get('home.cta.eyebrow')}
          </span>
          <h2 className="font-display text-4xl md:text-5xl font-semibold leading-tight">
            {get('home.cta.heading')}
          </h2>
          <p className="text-xs md:text-sm text-[#F8F4F2]/75 max-w-lg mx-auto leading-relaxed">
            {get('home.cta.body')}
          </p>
          <div className="pt-4 flex flex-wrap justify-center gap-4">
            <button
              onClick={onBookSession}
              className="btn bg-[#A27B5D] hover:bg-[#AA876C] text-[#090B0B] border border-[#A27B5D] py-3.5 px-8 rounded text-xs tracking-wider font-semibold cursor-pointer transition-all duration-200"
            >
              {get('home.cta.primary')}
            </button>
            <button
              onClick={() => setActiveView('contact')}
              className="btn border border-[#F8F4F2]/20 hover:border-[#A27B5D] text-[#F8F4F2] hover:text-[#A27B5D] py-3.5 px-8 rounded text-xs tracking-wider font-semibold cursor-pointer transition-all duration-200"
            >
              {get('home.cta.secondary')}
            </button>
          </div>
        </div>
      </section>

    </div>
  );
}
