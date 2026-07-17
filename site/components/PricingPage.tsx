/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState } from 'react';
import { Check, HelpCircle, ChevronDown, ChevronUp, Clock, FileText, Globe, Star } from 'lucide-react';

interface PricingPageProps {
  onBookSession: (sessionName?: string) => void;
  setActiveView: (view: string) => void;
}

export default function PricingPage({ onBookSession, setActiveView }: PricingPageProps) {
  const [openFaq, setOpenFaq] = useState<number | null>(null);

  const toggleFaq = (index: number) => {
    setOpenFaq(openFaq === index ? null : index);
  };

  const packages = [
    {
      name: "Mini Portrait Session",
      price: "$200",
      description: "A focused session for updated portraits, a short milestone, a dating profile, graduation photos, or a small number of polished images.",
      features: [
        "30-minute photography session",
        "One location in Dallas-Fort Worth",
        "20 professionally edited images",
        "Private online gallery",
        "High-resolution digital downloads",
        "Personal printing rights"
      ],
      badge: null
    },
    {
      name: "Signature Session",
      price: "$350",
      description: "A versatile session with enough time for variety, movement, natural moments, and a fuller collection of images.",
      features: [
        "One-hour photography session",
        "One location in Dallas-Fort Worth",
        "Up to two outfits when time permits",
        "35 professionally edited images",
        "Private online gallery",
        "High-resolution digital downloads",
        "Personal printing rights"
      ],
      badge: "Most Popular"
    },
    {
      name: "Storytelling Session",
      price: "$650",
      description: "An extended session for clients who want multiple settings, greater creative variety, or a complete visual story.",
      features: [
        "Two-hour photography session",
        "Up to two nearby locations",
        "Multiple outfits when time permits",
        "50 professionally edited images",
        "Private online gallery",
        "High-resolution digital downloads",
        "Personal printing rights",
        "Photo album (subject to specifications)"
      ],
      badge: null
    }
  ];

  const commercialFactors = [
    "Planning and creative development support",
    "Number of products, setups, or employees",
    "Session duration (half-day or full-day bookings)",
    "Locations, studio hire, or equipment rentals",
    "Assistants, prop styling, or lighting setups required",
    "Editing, advanced skin-retouching, or background removals",
    "Specific delivery turnaround schedules",
    "Image usage licensing (web, print, paid media, duration)",
    "Approved travel beyond the standard DFW area"
  ];

  const faqs = [
    {
      q: "Is a deposit required?",
      a: "A non-refundable retainer is required to reserve a date. The remaining balance is due according to the schedule in the photography agreement."
    },
    {
      q: "Are unedited photographs included?",
      a: "No. The final gallery includes photographs selected and professionally edited by the photographer. RAW or unedited files are not normally delivered."
    },
    {
      q: "Can I purchase additional images?",
      a: "If additional image purchasing is offered for the selected package, the available options and cost will be explained before booking."
    },
    {
      q: "Are travel fees included?",
      a: "Sessions within the standard Dallas service area may not require additional travel charges. Projects outside the area may include mileage, transportation, lodging, parking, or other approved expenses."
    },
    {
      q: "How quickly are photos delivered?",
      a: "Most standard portrait galleries are delivered within approximately two weeks. Larger commercial or event projects may require a different delivery timeline."
    },
    {
      q: "Can I use portrait photos for my business?",
      a: "Personal sessions include personal usage. Business marketing, advertising, product promotion, and other commercial applications may require a commercial agreement or license."
    }
  ];

  return (
    <div className="bg-[#090B0B] text-[#F8F4F2] pt-12 pb-24 font-body">
      {/* 1. HEADER */}
      <section className="relative py-20 px-5 md:px-12 text-center max-w-4xl mx-auto border-b border-[#F8F4F2]/10">
        <span className="text-[10px] uppercase tracking-[0.25em] text-[#A27B5D] font-bold block mb-4">
          Photography Rates & Packages
        </span>
        <h1 className="font-display text-4xl md:text-6xl font-semibold leading-tight text-[#F8F4F2] mb-6">
          Photography Packages and Pricing
        </h1>
        <p className="text-sm md:text-base text-[#F8F4F2]/75 leading-relaxed max-w-2xl mx-auto">
          Every session begins with the same goal: creating photographs that feel worth keeping and sharing. The packages below are designed for personal portrait, couple, and family sessions. Business, product, branding, team, event, and commercial photography are quoted separately based on project requirements.
        </p>
      </section>

      {/* 2. PACKAGES GRID */}
      <section className="py-20 px-5 md:px-12 max-w-[1200px] mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 items-stretch">
          {packages.map((pkg, i) => (
            <div 
              key={i}
              className={`p-8 rounded bg-[#283133]/20 border flex flex-col justify-between relative transition-all duration-300 ${
                pkg.badge 
                  ? 'border-[#A27B5D] shadow-xl md:scale-[1.03] bg-[#283133]/40' 
                  : 'border-[#F8F4F2]/10 hover:border-[#A27B5D]/40'
              }`}
            >
              {pkg.badge && (
                <span className="absolute top-4 right-4 bg-[#A27B5D] text-[#090B0B] font-mono font-bold text-[9px] uppercase tracking-widest px-2 py-0.5 rounded">
                  {pkg.badge}
                </span>
              )}
              
              <div>
                <h3 className="font-display text-2xl font-semibold text-[#F8F4F2] mb-1">{pkg.name}</h3>
                <div className="flex items-baseline gap-1 mb-4">
                  <span className="text-3xl font-display font-semibold text-[#A27B5D]">{pkg.price}</span>
                  <span className="text-[10px] text-[#F8F4F2]/40 uppercase tracking-widest">USD</span>
                </div>
                <p className="text-xs text-[#F8F4F2]/60 leading-relaxed font-body mb-6 pb-6 border-b border-[#F8F4F2]/5">
                  {pkg.description}
                </p>

                <ul className="space-y-3 font-mono text-[10px] text-[#F8F4F2]/75 mb-8">
                  {pkg.features.map((feat, fIdx) => (
                    <li key={fIdx} className="flex items-start gap-2">
                      <span className="text-[#A27B5D] font-bold">✓</span>
                      <span>{feat}</span>
                    </li>
                  ))}
                </ul>
              </div>

              <button
                onClick={() => onBookSession(pkg.name)}
                className={`w-full py-3 px-4 rounded text-xs font-semibold uppercase tracking-wider transition-colors cursor-pointer text-center ${
                  pkg.badge 
                    ? 'bg-[#A27B5D] hover:bg-[#AA876C] text-[#090B0B]' 
                    : 'bg-transparent border border-[#F8F4F2]/25 hover:border-[#A27B5D] hover:text-[#A27B5D] text-[#F8F4F2]'
                }`}
              >
                Book the {pkg.name.split(' ')[0]}
              </button>
            </div>
          ))}
        </div>
      </section>

      {/* 3. CUSTOM COMMERCIAL */}
      <section className="bg-[#283133]/15 py-20 px-5 md:px-12 border-y border-[#F8F4F2]/5">
        <div className="max-w-[1200px] mx-auto grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          <div className="lg:col-span-6 space-y-6">
            <span className="text-[10px] uppercase tracking-[0.2em] text-[#A27B5D] font-bold block">
              Business & Corporate Shoots
            </span>
            <h2 className="font-display text-4xl md:text-5xl font-semibold leading-tight text-[#F8F4F2]">
              Business and Commercial Photography
            </h2>
            <p className="text-sm text-[#F8F4F2]/70 leading-relaxed">
              Headshots, team photography, personal branding, product photography, business imagery, hospitality photography, events, and marketing campaigns require a customized estimate.
            </p>
            <p className="text-xs text-[#F8F4F2]/60 leading-relaxed">
              Commercial projects involve custom agreements tailored to your industry standards, content deliverables, and specific marketing applications.
            </p>
            <div className="pt-2">
              <button 
                onClick={() => setActiveView('contact')}
                className="btn bg-[#A27B5D] hover:bg-[#AA876C] text-[#090B0B] border border-[#A27B5D] py-3.5 px-6 rounded text-xs tracking-wider font-semibold cursor-pointer transition-all duration-200"
              >
                Request a Custom Quote
              </button>
            </div>
          </div>
          
          <div className="lg:col-span-6 bg-[#090B0B]/50 border border-[#F8F4F2]/10 p-8 rounded-lg">
            <h4 className="text-[#A27B5D] uppercase tracking-widest text-[10px] font-bold mb-6">Pricing Variables Include:</h4>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-x-4 gap-y-3 font-mono text-[10px] text-[#F8F4F2]/70">
              {commercialFactors.map((item, i) => (
                <div key={i} className="flex items-start gap-2.5">
                  <span className="text-[#A27B5D] font-bold shrink-0">•</span>
                  <span>{item}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* 4. FAQ */}
      <section className="py-20 px-5 md:px-12 max-w-[800px] mx-auto">
        <div className="text-center mb-12">
          <HelpCircle className="text-[#A27B5D] mx-auto mb-3" size={28} />
          <h2 className="font-display text-2xl md:text-3xl font-semibold text-[#F8F4F2]">
            Pricing FAQ
          </h2>
        </div>

        <div className="space-y-4">
          {faqs.map((faq, idx) => (
            <div key={idx} className="border-b border-[#F8F4F2]/10 pb-4">
              <button
                onClick={() => toggleFaq(idx)}
                className="w-full flex items-center justify-between text-left py-3 font-medium text-xs md:text-sm text-[#F8F4F2] hover:text-[#A27B5D] transition-colors focus:outline-none"
              >
                <span>{faq.q}</span>
                {openFaq === idx ? (
                  <ChevronUp size={14} className="text-[#A27B5D]" />
                ) : (
                  <ChevronDown size={14} className="text-[#F8F4F2]/40" />
                )}
              </button>
              {openFaq === idx && (
                <div className="text-[11px] md:text-xs text-[#F8F4F2]/65 leading-relaxed pt-2 pl-1 pr-6">
                  {faq.a}
                </div>
              )}
            </div>
          ))}
        </div>
      </section>
    </div>
  );
}
