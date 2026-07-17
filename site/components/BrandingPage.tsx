/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState } from 'react';
import { motion } from 'motion/react';
import { Camera, Check, HelpCircle, ChevronDown, ChevronUp, Briefcase, Award } from 'lucide-react';

interface BrandingPageProps {
  onBookSession: () => void;
}

export default function BrandingPage({ onBookSession }: BrandingPageProps) {
  const [openFaq, setOpenFaq] = useState<number | null>(null);

  const toggleFaq = (index: number) => {
    setOpenFaq(openFaq === index ? null : index);
  };

  const idealList = [
    "Executives & Corporate Leaders",
    "Entrepreneurs & Startup Founders",
    "Consultants, Attorneys & Coaches",
    "Real Estate Professionals",
    "Job Seekers & LinkedIn Upgrades",
    "Speakers, Panelists & Authors",
    "Creators, Artists & Influencers",
    "Marketing & Sales Professionals",
    "Small-Business Owners & Makers",
    "Complete Company Leadership Teams"
  ];

  const pointsList = [
    "Horizontal website banners with text space",
    "Vertical high-density social media crops",
    "Profile pictures with proper crop boundaries",
    "Environmental, contextual office portraits",
    "Active working and lifestyle capture",
    "Speaking or presentation mockups",
    "Details, tools-of-the-trade shots",
    "Multiple wardrobe changes",
    "Alignment with corporate brand palette",
    "Content formatted for multi-platform repurposing"
  ];

  const faqs = [
    {
      q: "Can the session take place at my office?",
      a: "Yes. On-location photography is available when the space and lighting can support the required look."
    },
    {
      q: "Can you match our existing company headshots?",
      a: "Share examples of your current photographs. I can evaluate the background, lighting, crop, and editing style and determine whether a close visual match is possible."
    },
    {
      q: "Can I use the photos commercially?",
      a: "Commercial usage will be outlined in your agreement. Usage requirements may differ depending on whether the images are for personal professional profiles, company marketing, paid advertising, or third-party publication."
    }
  ];

  return (
    <div className="bg-[#090B0B] text-[#F8F4F2] pt-12 pb-24 font-body">
      {/* 1. HERO HEADER */}
      <section className="relative py-20 px-5 md:px-12 text-center max-w-4xl mx-auto border-b border-[#F8F4F2]/10">
        <span className="text-[10px] uppercase tracking-[0.25em] text-[#A27B5D] font-bold block mb-4">
          Headshots & Personal Branding
        </span>
        <h1 className="font-display text-4xl md:text-6xl font-semibold leading-tight text-[#F8F4F2] mb-6">
          Dallas Headshots and Personal Branding Photography
        </h1>
        <p className="text-sm md:text-base text-[#F8F4F2]/75 leading-relaxed max-w-2xl mx-auto">
          Your professional image should feel credible, polished, and recognizably you. I create modern headshots and personal branding photography for executives, entrepreneurs, creators, job seekers, speakers, consultants, and teams throughout Dallas-Fort Worth.
        </p>
      </section>

      {/* 2. BRANDING VS HEADSHOT INTRO */}
      <section className="py-20 px-5 md:px-12 max-w-[1200px] mx-auto grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
        <div className="lg:col-span-7 space-y-6">
          <span className="text-[10px] uppercase tracking-[0.2em] text-[#A27B5D] font-bold block">
            The Scope
          </span>
          <h2 className="font-display text-3xl md:text-4xl font-semibold text-[#F8F4F2]">
            More Than a Standard Headshot
          </h2>
          <p className="text-xs md:text-sm text-[#F8F4F2]/70 leading-relaxed">
            A traditional headshot may be all you need for a company profile or LinkedIn. A personal branding session creates a broader collection of images that can support your website, social media, speaking engagements, press opportunities, marketing materials, and content calendar.
          </p>
          <p className="text-xs md:text-sm text-[#F8F4F2]/70 leading-relaxed">
            Before the session, we will discuss where the images will be used and what you want people to understand about you when they see them.
          </p>
          
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-4">
            {idealList.map((item, idx) => (
              <div key={idx} className="flex items-center gap-2.5 text-xs text-[#F8F4F2]/80">
                <Briefcase size={10} className="text-[#A27B5D]" />
                <span>{item}</span>
              </div>
            ))}
          </div>
        </div>

        <div className="lg:col-span-5 bg-[#283133]/20 border border-[#F8F4F2]/10 p-8 rounded">
          <h3 className="font-display text-2xl font-semibold text-[#F8F4F2] mb-4">Strategic Content Planning</h3>
          <p className="text-xs text-[#F8F4F2]/70 leading-relaxed font-body mb-6">
            Because I also come from a professional marketing background, I consider more than posing and lighting. We construct a customized, multi-purpose shot list:
          </p>
          <ul className="space-y-2.5 font-mono text-[10px] text-[#F8F4F2]/70">
            {pointsList.map((pt, i) => (
              <li key={i} className="flex items-start gap-2">
                <span className="text-[#A27B5D] shrink-0">•</span>
                <span>{pt}</span>
              </li>
            ))}
          </ul>
        </div>
      </section>

      {/* 3. TEAM HEADSHOTS SECTION */}
      <section className="bg-[#283133]/15 py-20 px-5 md:px-12 border-y border-[#F8F4F2]/5">
        <div className="max-w-[1200px] mx-auto grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          <div className="lg:col-span-5 aspect-[4/5] rounded bg-[#090B0B] border border-[#F8F4F2]/10 overflow-hidden">
            <img 
              src="https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&q=80&w=600" 
              alt="Professional Headshots"
              className="w-full h-full object-cover grayscale"
              referrerPolicy="no-referrer"
            />
          </div>
          <div className="lg:col-span-7 space-y-6">
            <span className="text-[10px] uppercase tracking-[0.2em] text-[#A27B5D] font-bold block">
              Cohesive Groups
            </span>
            <h2 className="font-display text-3xl md:text-4xl font-semibold text-[#F8F4F2]">
              Team & Corporate Headshots
            </h2>
            <p className="text-xs md:text-sm text-[#F8F4F2]/70 leading-relaxed">
              Consistent team photography helps a company appear more established and cohesive. On-location headshot sessions are available for business groups and enterprises that need multiple employees photographed in a consistent, clean style.
            </p>
            <p className="text-xs md:text-sm text-[#F8F4F2]/70 leading-relaxed">
              We coordinate the lighting, backgrounds, and posture guidelines on site at your DFW headquarters, minimizing employee down-time while establishing an elegant, unified visual style.
            </p>
          </div>
        </div>
      </section>

      {/* 4. FAQ */}
      <section className="py-20 px-5 md:px-12 max-w-[800px] mx-auto">
        <div className="text-center mb-12">
          <HelpCircle className="text-[#A27B5D] mx-auto mb-3" size={28} />
          <h2 className="font-display text-2xl md:text-3xl font-semibold text-[#F8F4F2]">
            Branding FAQ
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

      {/* 5. CTA */}
      <section className="py-16 px-5 md:px-12 max-w-4xl mx-auto text-center bg-[#283133]/20 border border-[#F8F4F2]/10 rounded-lg">
        <h2 className="font-display text-3xl font-semibold mb-3 text-[#F8F4F2]">
          Build a Professional Image Library
        </h2>
        <p className="text-xs text-[#F8F4F2]/70 leading-relaxed max-w-xl mx-auto mb-6">
          Tell me where your photographs will be used, and we will create a session around your corporate and professional goals.
        </p>
        <button
          onClick={onBookSession}
          className="btn bg-[#A27B5D] hover:bg-[#AA876C] text-[#090B0B] font-semibold py-3 px-6 rounded text-xs tracking-wider uppercase"
        >
          Request a Branding Session
        </button>
      </section>
    </div>
  );
}
