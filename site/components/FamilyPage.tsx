/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState } from 'react';
import { motion } from 'motion/react';
import { Camera, Check, HelpCircle, ChevronDown, ChevronUp, Users, Heart } from 'lucide-react';

interface FamilyPageProps {
  onBookSession: () => void;
}

export default function FamilyPage({ onBookSession }: FamilyPageProps) {
  const [openFaq, setOpenFaq] = useState<number | null>(null);

  const toggleFaq = (index: number) => {
    setOpenFaq(openFaq === index ? null : index);
  };

  const sessionsList = [
    "Couples Sessions",
    "Engagement Portraits",
    "Immediate Families",
    "Extended Families",
    "Anniversary Sessions",
    "Maternity Portraits",
    "Birthday and Milestone Sessions",
    "At-Home Lifestyle Photography"
  ];

  const faqs = [
    {
      q: "What happens if the weather is bad?",
      a: "We can discuss rescheduling, changing the location, or using an indoor option depending on the type of session and conditions."
    },
    {
      q: "How should our family coordinate outfits?",
      a: "Aim for coordinated colors and textures rather than identical outfits. Choose a shared palette and avoid clothing with distracting logos unless they are intentionally part of the story."
    },
    {
      q: "Can extended family members participate?",
      a: "Yes. Larger family sessions may require additional time and planning to create individual groupings as well as full-group portraits."
    }
  ];

  return (
    <div className="bg-[#090B0B] text-[#F8F4F2] pt-12 pb-24 font-body">
      {/* 1. HERO HEADER */}
      <section className="relative py-20 px-5 md:px-12 text-center max-w-4xl mx-auto border-b border-[#F8F4F2]/10">
        <span className="text-[10px] uppercase tracking-[0.25em] text-[#A27B5D] font-bold block mb-4">
          Couples & Family Photography Services
        </span>
        <h1 className="font-display text-4xl md:text-6xl font-semibold leading-tight text-[#F8F4F2] mb-6">
          Dallas Couples and Family Photography
        </h1>
        <p className="text-sm md:text-base text-[#F8F4F2]/75 leading-relaxed max-w-2xl mx-auto">
          The best photographs of the people you love are often created in the moments between poses. My couples and family sessions focus on connection, movement, personality, and the relationships that make your family unique.
        </p>
      </section>

      {/* 2. FAMILY SESSIONS INTRO */}
      <section className="py-20 px-5 md:px-12 max-w-[1200px] mx-auto grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
        <div className="lg:col-span-7 space-y-6">
          <span className="text-[10px] uppercase tracking-[0.2em] text-[#A27B5D] font-bold block">
            The Philosophy
          </span>
          <h2 className="font-display text-3xl md:text-4xl font-semibold text-[#F8F4F2]">
            Photographs That Feel Personal
          </h2>
          <p className="text-xs md:text-sm text-[#F8F4F2]/70 leading-relaxed">
            Family photography does not need to feel formal or stressful. I will guide the session, but I will also encourage interaction, conversation, play, and movement.
          </p>
          <p className="text-xs md:text-sm text-[#F8F4F2]/70 leading-relaxed">
            The result is a combination of polished portraits and more spontaneous photographs that preserve what being together actually feels like.
          </p>
          
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-4">
            {sessionsList.map((item, idx) => (
              <div key={idx} className="flex items-center gap-2.5 text-xs text-[#F8F4F2]/80">
                <Heart size={10} className="text-[#A27B5D]" />
                <span>{item}</span>
              </div>
            ))}
          </div>
        </div>

        <div className="lg:col-span-5 bg-[#283133]/20 border border-[#F8F4F2]/10 p-8 rounded-lg">
          <h3 className="font-display text-2xl font-semibold text-[#F8F4F2] mb-3">A Comfortable Experience</h3>
          <p className="text-xs text-[#F8F4F2]/70 leading-relaxed font-body mb-4">
            Not everyone in a family will feel comfortable in front of a camera at the same time. Children may need breaks, and adults may feel unsure about posing.
          </p>
          <p className="text-[#A27B5D] font-mono text-[11px]">
            That is all completely normal.
          </p>
          <p className="text-xs text-[#F8F4F2]/60 mt-3 leading-relaxed">
            I plan family sessions with enough flexibility to work with real personalities and rhythms rather than expecting everyone to behave like professional models.
          </p>
        </div>
      </section>

      {/* 3. CHOOSING A LOCATION */}
      <section className="bg-[#283133]/15 py-20 px-5 md:px-12 border-y border-[#F8F4F2]/5">
        <div className="max-w-[1200px] mx-auto grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          <div className="lg:col-span-5 aspect-[4/5] rounded bg-[#090B0B] border border-[#F8F4F2]/10 overflow-hidden">
            <img 
              src="https://images.unsplash.com/photo-1492691527719-9d1e07e534b4?auto=format&fit=crop&q=80&w=600" 
              alt="Family Outdoors at Golden Hour"
              className="w-full h-full object-cover grayscale"
              referrerPolicy="no-referrer"
            />
          </div>
          <div className="lg:col-span-7 space-y-6">
            <span className="text-[10px] uppercase tracking-[0.2em] text-[#A27B5D] font-bold block">
              The Backdrops
            </span>
            <h2 className="font-display text-3xl md:text-4xl font-semibold text-[#F8F4F2]">
              Choosing a Location
            </h2>
            <p className="text-xs md:text-sm text-[#F8F4F2]/70 leading-relaxed">
              Your session can take place at home, outdoors, or at another Dallas-Fort Worth location that fits your story. Natural settings around White Rock Lake can work beautifully, while urban locations can create a more modern and editorial feeling.
            </p>
            <p className="text-xs md:text-sm text-[#F8F4F2]/70 leading-relaxed">
              I will help you consider lighting, crowds, accessibility, weather, and the visual style you want before choosing the final setting.
            </p>
          </div>
        </div>
      </section>

      {/* 4. FAQ */}
      <section className="py-20 px-5 md:px-12 max-w-[800px] mx-auto">
        <div className="text-center mb-12">
          <HelpCircle className="text-[#A27B5D] mx-auto mb-3" size={28} />
          <h2 className="font-display text-2xl md:text-3xl font-semibold text-[#F8F4F2]">
            Family FAQ
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
          Preserve This Version of Your Family
        </h2>
        <p className="text-xs text-[#F8F4F2]/70 leading-relaxed max-w-xl mx-auto mb-6">
          The people you love will continue to grow and change. Let’s create photographs that bring you back to this chapter.
        </p>
        <button
          onClick={onBookSession}
          className="btn bg-[#A27B5D] hover:bg-[#AA876C] text-[#090B0B] font-semibold py-3 px-6 rounded text-xs tracking-wider uppercase"
        >
          Plan a Family Session
        </button>
      </section>
    </div>
  );
}
