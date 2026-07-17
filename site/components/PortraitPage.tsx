/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState } from 'react';
import { motion } from 'motion/react';
import { Camera, Check, HelpCircle, ChevronDown, ChevronUp, Sparkles, MapPin } from 'lucide-react';

interface PortraitPageProps {
  onBookSession: () => void;
}

export default function PortraitPage({ onBookSession }: PortraitPageProps) {
  const [openFaq, setOpenFaq] = useState<number | null>(null);

  const toggleFaq = (index: number) => {
    setOpenFaq(openFaq === index ? null : index);
  };

  const idealList = [
    "Individual portraits",
    "Graduation photography",
    "Birthday and milestone sessions",
    "Dating profile photos",
    "Creative and editorial portraits",
    "Lifestyle photography",
    "Social media profile images",
    "New chapter or confidence sessions",
    "Actor, artist, and creator portraits"
  ];

  const includeList = [
    "Planning consultation",
    "Location guidance",
    "Wardrobe suggestions",
    "Professional posing direction",
    "Professionally selected and edited photographs",
    "Private online gallery",
    "High-resolution digital downloads",
    "Personal printing rights",
    "Optional additional time or locations"
  ];

  const faqs = [
    {
      q: "What should I wear?",
      a: "Choose clothing that fits well, makes you feel confident, and reflects how you normally want to present yourself. Solid colors and coordinated layers often photograph well. I can provide more specific guidance after learning about your location and desired style."
    },
    {
      q: "Can I bring more than one outfit?",
      a: "Yes. Outfit changes are possible depending on the length of the package you choose."
    },
    {
      q: "Can you make my photos look natural?",
      a: "Yes. My approach combines gentle posing direction with movement and conversation so the session does not feel like a sequence of rigid poses."
    }
  ];

  return (
    <div className="bg-[#090B0B] text-[#F8F4F2] pt-12 pb-24 font-body">
      {/* 1. HERO HEADER */}
      <section className="relative py-20 px-5 md:px-12 text-center max-w-4xl mx-auto border-b border-[#F8F4F2]/10">
        <span className="text-[10px] uppercase tracking-[0.25em] text-[#A27B5D] font-bold block mb-4">
          Portrait Photography Services
        </span>
        <h1 className="font-display text-4xl md:text-6xl font-semibold leading-tight text-[#F8F4F2] mb-6">
          Dallas Portrait Photography That Feels Like You
        </h1>
        <p className="text-sm md:text-base text-[#F8F4F2]/75 leading-relaxed max-w-2xl mx-auto">
          Portrait photography should reveal personality, not hide it behind uncomfortable poses. I create expressive, polished portraits with clear direction and a relaxed atmosphere, whether you want something natural, professional, cinematic, colorful, or creative.
        </p>
      </section>

      {/* 2. PORTRAIT SESSIONS GRID */}
      <section className="py-20 px-5 md:px-12 max-w-[1200px] mx-auto grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
        <div className="lg:col-span-7 space-y-6">
          <span className="text-[10px] uppercase tracking-[0.2em] text-[#A27B5D] font-bold block">
            The Purpose
          </span>
          <h2 className="font-display text-3xl md:text-4xl font-semibold text-[#F8F4F2]">
            Portrait Sessions for Every Chapter
          </h2>
          <p className="text-xs md:text-sm text-[#F8F4F2]/70 leading-relaxed">
            A portrait session can celebrate a major milestone or simply give you photographs in which you finally recognize yourself.
          </p>
          <p className="text-xs md:text-sm text-[#F8F4F2]/70 leading-relaxed">
            Sessions are personalized around your style, comfort level, and intended use. We can build the session around a meaningful location, a visual concept, a wardrobe, or a simple walk through one of your favorite parts of Dallas.
          </p>
          
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-4">
            {idealList.map((item, idx) => (
              <div key={idx} className="flex items-center gap-2 text-xs text-[#F8F4F2]/80">
                <span className="w-1.5 h-1.5 rounded-full bg-[#A27B5D]" />
                <span>{item}</span>
              </div>
            ))}
          </div>
        </div>

        <div className="lg:col-span-5 bg-[#283133]/20 border border-[#F8F4F2]/10 p-8 rounded">
          <h3 className="font-display text-2xl font-semibold text-[#F8F4F2] mb-4">What Your Session Includes</h3>
          <ul className="space-y-3 font-mono text-[11px] text-[#F8F4F2]/70">
            {includeList.map((inc, i) => (
              <li key={i} className="flex items-start gap-2.5">
                <span className="text-[#A27B5D] shrink-0 mt-0.5">✔</span>
                <span>{inc}</span>
              </li>
            ))}
          </ul>
        </div>
      </section>

      {/* 3. NATURAL DIRECTION */}
      <section className="bg-[#283133]/15 py-20 px-5 md:px-12 border-y border-[#F8F4F2]/5">
        <div className="max-w-[1200px] mx-auto grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          <div className="lg:col-span-5 aspect-[4/5] rounded bg-[#090B0B] border border-[#F8F4F2]/10 overflow-hidden">
            <img 
              src="https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&q=80&w=600" 
              alt="Natural Portrait Photography"
              className="w-full h-full object-cover grayscale"
              referrerPolicy="no-referrer"
            />
          </div>
          <div className="lg:col-span-7 space-y-6">
            <span className="text-[10px] uppercase tracking-[0.2em] text-[#A27B5D] font-bold block">
              The Experience
            </span>
            <h2 className="font-display text-3xl md:text-4xl font-semibold text-[#F8F4F2]">
              Natural Direction Without Forced Posing
            </h2>
            <p className="text-xs md:text-sm text-[#F8F4F2]/70 leading-relaxed">
              Most people are not professional models, and they should not be expected to arrive knowing exactly what to do.
            </p>
            <p className="text-xs md:text-sm text-[#F8F4F2]/70 leading-relaxed">
              During your session, I will guide your posture, movement, hands, facial expressions, and positioning. We will also leave space for natural moments that happen between poses. The goal is to create a varied gallery that feels intentional without feeling stiff.
            </p>
          </div>
        </div>
      </section>

      {/* 4. FAQ */}
      <section className="py-20 px-5 md:px-12 max-w-[800px] mx-auto">
        <div className="text-center mb-12">
          <HelpCircle className="text-[#A27B5D] mx-auto mb-3" size={28} />
          <h2 className="font-display text-2xl md:text-3xl font-semibold text-[#F8F4F2]">
            Portrait FAQ
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
          Ready to Plan Your Portrait Session?
        </h2>
        <p className="text-xs text-[#F8F4F2]/70 leading-relaxed max-w-xl mx-auto mb-6">
          Tell me what kind of photographs you want to create, and I will help you choose the right session, location, and approach.
        </p>
        <button
          onClick={onBookSession}
          className="btn bg-[#A27B5D] hover:bg-[#AA876C] text-[#090B0B] font-semibold py-3 px-6 rounded text-xs tracking-wider uppercase"
        >
          Book a Portrait Session
        </button>
      </section>
    </div>
  );
}
