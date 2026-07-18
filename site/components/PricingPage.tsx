/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState } from 'react';
import { ChevronDown, ChevronUp, HelpCircle } from 'lucide-react';
import { defaultPricingContent, parseJsonSetting, type PricingContent } from '../contentModels';
import { useSiteData } from '../SiteDataContext';

interface PricingPageProps {
  onBookSession: (sessionName?: string) => void;
  setActiveView: (view: string) => void;
}

function mergePricingContent(saved?: string): PricingContent {
  const parsed = parseJsonSetting<Partial<PricingContent>>(saved, {});
  return {
    ...defaultPricingContent,
    ...parsed,
    packages: Array.isArray(parsed.packages) ? parsed.packages : defaultPricingContent.packages,
    commercial: { ...defaultPricingContent.commercial, ...(parsed.commercial || {}) },
    faq: {
      ...defaultPricingContent.faq,
      ...(parsed.faq || {}),
      items: Array.isArray(parsed.faq?.items) ? parsed.faq.items : defaultPricingContent.faq.items,
    },
  };
}

export default function PricingPage({ onBookSession, setActiveView }: PricingPageProps) {
  const [openFaq, setOpenFaq] = useState<number | null>(null);
  const { content } = useSiteData();
  const pricing = mergePricingContent(content['pricing.data']);
  const visiblePackages = pricing.packages.filter((pkg) => pkg.visible !== false);

  return (
    <div className="bg-[#090B0B] text-[#F8F4F2] pt-12 pb-24 font-body">
      <section className="relative py-20 px-5 md:px-12 text-center max-w-4xl mx-auto border-b border-[#F8F4F2]/10">
        <span className="text-[10px] uppercase tracking-[0.25em] text-[#A27B5D] font-bold block mb-4">{pricing.eyebrow}</span>
        <h1 className="font-display text-4xl md:text-6xl font-semibold leading-tight text-[#F8F4F2] mb-6">{pricing.heading}</h1>
        <p className="text-sm md:text-base text-[#F8F4F2]/75 leading-relaxed max-w-2xl mx-auto">{pricing.intro}</p>
      </section>

      <section className="py-20 px-5 md:px-12 max-w-[1200px] mx-auto">
        <div className={`grid grid-cols-1 gap-8 items-stretch ${visiblePackages.length > 1 ? 'md:grid-cols-2' : ''} ${visiblePackages.length > 2 ? 'lg:grid-cols-3' : ''}`}>
          {visiblePackages.map((pkg) => (
            <div
              key={pkg.id}
              className={`p-8 rounded bg-[#283133]/20 border flex flex-col justify-between relative transition-all duration-300 ${
                pkg.highlighted
                  ? 'border-[#A27B5D] shadow-xl lg:scale-[1.03] bg-[#283133]/40'
                  : 'border-[#F8F4F2]/10 hover:border-[#A27B5D]/40'
              }`}
            >
              {pkg.badge && <span className="absolute top-4 right-4 bg-[#A27B5D] text-[#090B0B] font-mono font-bold text-[9px] uppercase tracking-widest px-2 py-0.5 rounded">{pkg.badge}</span>}
              <div>
                <h3 className="font-display text-2xl font-semibold text-[#F8F4F2] mb-1 pr-20">{pkg.name}</h3>
                <div className="flex items-baseline gap-1 mb-4">
                  <span className="text-3xl font-display font-semibold text-[#A27B5D]">{pkg.price}</span>
                  {pkg.currency && <span className="text-[10px] text-[#F8F4F2]/40 uppercase tracking-widest">{pkg.currency}</span>}
                </div>
                <p className="text-xs text-[#F8F4F2]/60 leading-relaxed font-body mb-6 pb-6 border-b border-[#F8F4F2]/5">{pkg.description}</p>
                <ul className="space-y-3 font-mono text-[10px] text-[#F8F4F2]/75 mb-8">
                  {pkg.features.filter(Boolean).map((feature, index) => <li key={`${pkg.id}-${index}`} className="flex items-start gap-2"><span className="text-[#A27B5D] font-bold">✓</span><span>{feature}</span></li>)}
                </ul>
              </div>
              <button
                onClick={() => onBookSession(pkg.name)}
                className={`w-full py-3 px-4 rounded text-xs font-semibold uppercase tracking-wider transition-colors cursor-pointer text-center ${pkg.highlighted ? 'bg-[#A27B5D] hover:bg-[#AA876C] text-[#090B0B]' : 'bg-transparent border border-[#F8F4F2]/25 hover:border-[#A27B5D] hover:text-[#A27B5D] text-[#F8F4F2]'}`}
              >
                {pkg.buttonLabel || `Book ${pkg.name}`}
              </button>
            </div>
          ))}
        </div>
      </section>

      {pricing.commercial.visible !== false && (
        <section className="bg-[#283133]/15 py-20 px-5 md:px-12 border-y border-[#F8F4F2]/5">
          <div className="max-w-[1200px] mx-auto grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
            <div className="lg:col-span-6 space-y-6">
              <span className="text-[10px] uppercase tracking-[0.2em] text-[#A27B5D] font-bold block">{pricing.commercial.eyebrow}</span>
              <h2 className="font-display text-4xl md:text-5xl font-semibold leading-tight text-[#F8F4F2]">{pricing.commercial.heading}</h2>
              <p className="text-sm text-[#F8F4F2]/70 leading-relaxed">{pricing.commercial.body}</p>
              {pricing.commercial.secondaryBody && <p className="text-xs text-[#F8F4F2]/60 leading-relaxed">{pricing.commercial.secondaryBody}</p>}
              <div className="pt-2"><button onClick={() => setActiveView('contact')} className="btn bg-[#A27B5D] hover:bg-[#AA876C] text-[#090B0B] border border-[#A27B5D] py-3.5 px-6 rounded text-xs tracking-wider font-semibold cursor-pointer transition-all duration-200">{pricing.commercial.buttonLabel}</button></div>
            </div>
            <div className="lg:col-span-6 bg-[#090B0B]/50 border border-[#F8F4F2]/10 p-8 rounded-lg">
              <h4 className="text-[#A27B5D] uppercase tracking-widest text-[10px] font-bold mb-6">{pricing.commercial.factorsHeading}</h4>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-x-4 gap-y-3 font-mono text-[10px] text-[#F8F4F2]/70">
                {pricing.commercial.factors.filter(Boolean).map((item, index) => <div key={index} className="flex items-start gap-2.5"><span className="text-[#A27B5D] font-bold shrink-0">•</span><span>{item}</span></div>)}
              </div>
            </div>
          </div>
        </section>
      )}

      {pricing.faq.visible !== false && pricing.faq.items.length > 0 && (
        <section className="py-20 px-5 md:px-12 max-w-[800px] mx-auto">
          <div className="text-center mb-12"><HelpCircle className="text-[#A27B5D] mx-auto mb-3" size={28} /><h2 className="font-display text-2xl md:text-3xl font-semibold text-[#F8F4F2]">{pricing.faq.heading}</h2></div>
          <div className="space-y-4">
            {pricing.faq.items.map((faq, index) => (
              <div key={faq.id} className="border-b border-[#F8F4F2]/10 pb-4">
                <button onClick={() => setOpenFaq(openFaq === index ? null : index)} className="w-full flex items-center justify-between text-left py-3 font-medium text-xs md:text-sm text-[#F8F4F2] hover:text-[#A27B5D] transition-colors focus:outline-none">
                  <span>{faq.question}</span>{openFaq === index ? <ChevronUp size={14} className="text-[#A27B5D]" /> : <ChevronDown size={14} className="text-[#F8F4F2]/40" />}
                </button>
                {openFaq === index && <div className="text-[11px] md:text-xs text-[#F8F4F2]/65 leading-relaxed pt-2 pl-1 pr-6">{faq.answer}</div>}
              </div>
            ))}
          </div>
        </section>
      )}
    </div>
  );
}
