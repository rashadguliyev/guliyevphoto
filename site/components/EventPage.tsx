/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React from 'react';
import { motion } from 'motion/react';
import { Calendar, Check, Compass, MapPin } from 'lucide-react';

interface EventPageProps {
  onBookSession: () => void;
}

export default function EventPage({ onBookSession }: EventPageProps) {
  const eventsList = [
    "Corporate gatherings & team milestones",
    "Conferences, summits & panel meetings",
    "Brand activations, product releases & rollouts",
    "Community celebrations & campaigns",
    "Restaurant, dining & hospitality launch events",
    "Private birthday & anniversary gatherings",
    "Social-first brand engagements",
    "Business expansions & opening days",
    "Creator, media & influencer events"
  ];

  const coverageList = [
    "Venue architecture, branding & decor",
    "Guest arrivals, greetings & group shots",
    "Main stage speakers, panel panels & slideshows",
    "Candid, expressive networking interactions",
    "Products, menus & small detail stories",
    "Catering, food & beverage services",
    "Key moments, handshakes & main displays",
    "Group photo setups or photobooth captures",
    "Closing remarks, final greetings & wrap-up"
  ];

  return (
    <div className="bg-[#090B0B] text-[#F8F4F2] pt-12 pb-24 font-body">
      {/* 1. HERO HEADER */}
      <section className="relative py-20 px-5 md:px-12 text-center max-w-4xl mx-auto border-b border-[#F8F4F2]/10">
        <span className="text-[10px] uppercase tracking-[0.25em] text-[#A27B5D] font-bold block mb-4">
          Event Photography Services
        </span>
        <h1 className="font-display text-4xl md:text-6xl font-semibold leading-tight text-[#F8F4F2] mb-6">
          Dallas Event Photography
        </h1>
        <p className="text-sm md:text-base text-[#F8F4F2]/75 leading-relaxed max-w-2xl mx-auto">
          Your event deserves photographs that preserve both the major moments and the details happening around them. Guliyev Photo provides natural, polished event coverage for private celebrations, professional gatherings, community events, hospitality events, and brand experiences.
        </p>
      </section>

      {/* 2. SERVICES & DETAIL SHOT COVERS */}
      <section className="py-20 px-5 md:px-12 max-w-[1200px] mx-auto grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
        <div className="lg:col-span-7 space-y-6">
          <span className="text-[10px] uppercase tracking-[0.2em] text-[#A27B5D] font-bold block">
            The Scope
          </span>
          <h2 className="font-display text-3xl md:text-4xl font-semibold text-[#F8F4F2]">
            Comprehensive Event Coverage
          </h2>
          <p className="text-xs md:text-sm text-[#F8F4F2]/70 leading-relaxed">
            Event photography should capture the required photographs without making guests feel like they are constantly being directed.
          </p>
          <p className="text-xs md:text-sm text-[#F8F4F2]/70 leading-relaxed">
            Before the event, we will review the schedule, important people, key moments, branding requirements, requested group photographs, and delivery deadline.
          </p>
          
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-4">
            {eventsList.map((item, idx) => (
              <div key={idx} className="flex items-center gap-2.5 text-xs text-[#F8F4F2]/80">
                <Calendar size={11} className="text-[#A27B5D]" />
                <span>{item}</span>
              </div>
            ))}
          </div>
        </div>

        <div className="lg:col-span-5 bg-[#283133]/20 border border-[#F8F4F2]/10 p-8 rounded-lg">
          <h3 className="font-display text-2xl font-semibold text-[#F8F4F2] mb-4">Meticulous Shot List</h3>
          <p className="text-xs text-[#F8F4F2]/70 leading-relaxed mb-4">
            I photograph a comprehensive balance of candid and styled moments to build a highly diverse, reusable event archive:
          </p>
          <ul className="space-y-2.5 font-mono text-[10px] text-[#F8F4F2]/70">
            {coverageList.map((pt, i) => (
              <li key={i} className="flex items-start gap-2">
                <span className="text-[#A27B5D] shrink-0">•</span>
                <span>{pt}</span>
              </li>
            ))}
          </ul>
        </div>
      </section>

      {/* 3. CTA */}
      <section className="py-16 px-5 md:px-12 max-w-4xl mx-auto text-center bg-[#283133]/20 border border-[#F8F4F2]/10 rounded-lg">
        <h2 className="font-display text-3xl font-semibold mb-3 text-[#F8F4F2]">
          Tell Me About Your Event
        </h2>
        <p className="text-xs text-[#F8F4F2]/70 leading-relaxed max-w-xl mx-auto mb-6">
          Include the date, location, expected attendance, coverage time, schedule, and how the photographs will be used.
        </p>
        <button
          onClick={onBookSession}
          className="btn bg-[#A27B5D] hover:bg-[#AA876C] text-[#090B0B] font-semibold py-3 px-6 rounded text-xs tracking-wider uppercase"
        >
          Request Event Availability
        </button>
      </section>
    </div>
  );
}
