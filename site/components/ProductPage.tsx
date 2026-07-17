/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState } from 'react';
import { motion } from 'motion/react';
import { Camera, Check, HelpCircle, ChevronDown, ChevronUp, BarChart, ShoppingBag } from 'lucide-react';

interface ProductPageProps {
  onBookSession: () => void;
}

export default function ProductPage({ onBookSession }: ProductPageProps) {
  const [openFaq, setOpenFaq] = useState<number | null>(null);

  const toggleFaq = (index: number) => {
    setOpenFaq(openFaq === index ? null : index);
  };

  const servicesList = [
    "Product photography",
    "Lifestyle product photography",
    "E-commerce imagery",
    "Social media photography",
    "Website photography",
    "Advertising creative",
    "Hospitality photography",
    "Restaurant photography",
    "Workplace photography",
    "Employee and executive portraits",
    "Brand campaign imagery",
    "Creator and influencer content",
    "Visual content libraries"
  ];

  const formatsList = [
    "Wide website hero banners with active offset space",
    "High-contrast product detail close-ups",
    "Vertical assets tailored for social media stories & reels",
    "Square tiles ready for e-commerce listings",
    "Coordinated horizontal campaign creatives",
    "Email header lifestyle layouts",
    "E-commerce marketplace silhouettes (clean white backgrounds)",
    "Behind-the-scenes production workspace context",
    "Styled editorial lookbooks & flat-lays",
    "Copy space layouts prepared for text overlays"
  ];

  const stepsList = [
    {
      num: "01",
      title: "Discovery",
      text: "Discuss the product, audience, brand values, campaign concepts, launch deadlines, and exact deliverable requirements."
    },
    {
      num: "02",
      title: "Creative Planning",
      text: "Develop visual reference mockups, select locations, organize styling props, coordinate models, and construct the master shot list."
    },
    {
      num: "03",
      title: "Production",
      text: "Photograph the approved concepts meticulously, managing lighting, composition, and details to deliver rich variety and visual consistency."
    },
    {
      num: "04",
      title: "Editing & Delivery",
      text: "Select, refine, retouch, and color-correct approved frames, delivering high-resolution files optimized in required aspect ratios and file formats."
    }
  ];

  const faqs = [
    {
      q: "How is commercial photography priced?",
      a: "Commercial estimates depend on the number of products, creative complexity, locations, people, production requirements, editing, turnaround time, and usage rights."
    },
    {
      q: "Do you provide models, locations, or props?",
      a: "These may be coordinated when needed. Any additional production expenses will be presented for approval."
    },
    {
      q: "Can you create both photos and short-form video?",
      a: "Photography and social content packages may be available depending on the project. Include a video option only after confirming the exact deliverables."
    },
    {
      q: "Can you photograph our office, store, restaurant, or hotel?",
      a: "Yes. Business and hospitality photography can include the location, employees, customer experience, services, food, products, décor, and other brand details."
    }
  ];

  return (
    <div className="bg-[#090B0B] text-[#F8F4F2] pt-12 pb-24 font-body">
      {/* 1. HERO HEADER */}
      <section className="relative py-20 px-5 md:px-12 text-center max-w-4xl mx-auto border-b border-[#F8F4F2]/10">
        <span className="text-[10px] uppercase tracking-[0.25em] text-[#A27B5D] font-bold block mb-4">
          Product & Brand Photography
        </span>
        <h1 className="font-display text-4xl md:text-6xl font-semibold leading-tight text-[#F8F4F2] mb-6">
          Dallas Product and Brand Photography
        </h1>
        <p className="text-sm md:text-base text-[#F8F4F2]/75 leading-relaxed max-w-2xl mx-auto">
          Strong commercial photography does more than make a product look attractive. It helps customers understand the product, recognize the brand, and imagine it in their own lives. Guliyev Photo creates product, lifestyle, business, hospitality, and social-first imagery for brands throughout Dallas-Fort Worth.
        </p>
      </section>

      {/* 2. SERVICES & FORMATS GRID */}
      <section className="py-20 px-5 md:px-12 max-w-[1200px] mx-auto grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
        <div className="lg:col-span-7 space-y-6">
          <span className="text-[10px] uppercase tracking-[0.2em] text-[#A27B5D] font-bold block">
            The Strategic Approach
          </span>
          <h2 className="font-display text-3xl md:text-4xl font-semibold text-[#F8F4F2]">
            Commercial Photography with a Marketing Foundation
          </h2>
          <p className="text-xs md:text-sm text-[#F8F4F2]/70 leading-relaxed">
            My background in marketing allows me to approach a commercial shoot from both creative and strategic perspectives. 
          </p>
          <p className="text-xs md:text-sm text-[#F8F4F2]/70 leading-relaxed">
            We begin with how the final images will be used. From there, we can determine the ideal compositions, orientation, setting, props, lighting, shot list, and amount of visual variety required.
          </p>
          
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-4">
            {servicesList.map((item, idx) => (
              <div key={idx} className="flex items-center gap-2 text-xs text-[#F8F4F2]/80">
                <ShoppingBag size={10} className="text-[#A27B5D] shrink-0" />
                <span className="truncate">{item}</span>
              </div>
            ))}
          </div>
        </div>

        <div className="lg:col-span-5 bg-[#283133]/20 border border-[#F8F4F2]/10 p-8 rounded">
          <h3 className="font-display text-2xl font-semibold text-[#F8F4F2] mb-4">Content Built for Multi-Placement</h3>
          <p className="text-xs text-[#F8F4F2]/70 leading-relaxed font-body mb-6">
            One commercial session can produce a highly versatile visual library for several placements and formats:
          </p>
          <ul className="space-y-2.5 font-mono text-[10px] text-[#F8F4F2]/70">
            {formatsList.map((pt, i) => (
              <li key={i} className="flex items-start gap-2">
                <span className="text-[#A27B5D] shrink-0">•</span>
                <span>{pt}</span>
              </li>
            ))}
          </ul>
        </div>
      </section>

      {/* 3. COMMERCIAL PROCESS */}
      <section className="bg-[#283133]/15 py-20 px-5 md:px-12 border-y border-[#F8F4F2]/5">
        <div className="max-w-[1200px] mx-auto">
          <div className="text-center max-w-xl mx-auto mb-16">
            <span className="text-[10px] uppercase tracking-[0.2em] text-[#A27B5D] font-bold block mb-2">
              The Workflow
            </span>
            <h2 className="font-display text-3xl md:text-4xl font-semibold text-[#F8F4F2]">
              Commercial Project Process
            </h2>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
            {stepsList.map((st, i) => (
              <div key={i} className="p-6 rounded bg-[#090B0B]/50 border border-[#F8F4F2]/10">
                <span className="text-xs font-mono font-bold text-[#A27B5D] block mb-3">{st.num} /</span>
                <h4 className="text-base font-semibold text-[#F8F4F2] mb-2">{st.title}</h4>
                <p className="text-xs text-[#F8F4F2]/60 leading-relaxed">{st.text}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 4. FAQ */}
      <section className="py-20 px-5 md:px-12 max-w-[800px] mx-auto">
        <div className="text-center mb-12">
          <HelpCircle className="text-[#A27B5D] mx-auto mb-3" size={28} />
          <h2 className="font-display text-2xl md:text-3xl font-semibold text-[#F8F4F2]">
            Commercial FAQ
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
          Plan Your Next Brand Shoot
        </h2>
        <p className="text-xs text-[#F8F4F2]/70 leading-relaxed max-w-xl mx-auto mb-6">
          Share your product, campaign visual references, required deliverables, and launch date to receive a customized proposal.
        </p>
        <button
          onClick={onBookSession}
          className="btn bg-[#A27B5D] hover:bg-[#AA876C] text-[#090B0B] font-semibold py-3 px-6 rounded text-xs tracking-wider uppercase"
        >
          Request a Commercial Quote
        </button>
      </section>
    </div>
  );
}
