/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React from 'react';
import { Shield, FileText } from 'lucide-react';

export function TermsPage() {
  const sections = [
    {
      title: "Booking and Retainer",
      text: "A signed agreement and non-refundable retainer are required to reserve a session date. No date is considered reserved until both have been received."
    },
    {
      title: "Final Payment",
      text: "The remaining balance is due according to the payment schedule stated in the client agreement."
    },
    {
      title: "Rescheduling",
      text: "Requests to reschedule are subject to availability. Policies for weather, illness, emergencies, lateness, and repeated rescheduling should be stated in the individual agreement."
    },
    {
      title: "Cancellation",
      text: "Retainers are normally non-refundable because the session date has been reserved and other work may have been declined."
    },
    {
      title: "Image Selection and Editing",
      text: "Guliyev Photo selects and edits the final photographs. RAW files, rejected images, duplicate frames, test images, and unedited files are not included unless explicitly stated in writing."
    },
    {
      title: "Delivery",
      text: "Expected delivery time will be confirmed for each project. Portrait galleries are generally delivered through a private online gallery."
    },
    {
      title: "Personal Usage",
      text: "Personal-session clients may download, display, print, and share their final photographs for personal purposes, subject to the terms of their agreement."
    },
    {
      title: "Commercial Usage",
      text: "Business, advertising, promotional, resale, publication, and other commercial uses require the appropriate written license."
    },
    {
      title: "Copyright",
      text: "Copyright remains with the photographer unless ownership is explicitly transferred through a separate written agreement."
    },
    {
      title: "Portfolio Usage",
      text: "The client agreement should provide an option regarding whether photographs may be used in the Guliyev Photo portfolio, website, social media, competitions, or marketing. Do not assume consent through website language alone."
    },
    {
      title: "Safety",
      text: "The photographer may stop or modify a session when a location, person, weather condition, or activity creates a safety concern."
    },
    {
      title: "Children",
      text: "A responsible adult must supervise children throughout the session."
    },
    {
      title: "Travel",
      text: "Approved travel, parking, permits, lodging, rentals, shipping, and production costs may be charged separately."
    },
    {
      title: "Limitation of Liability",
      text: "Include professionally reviewed language covering equipment failure, data loss, illness, weather, venue restrictions, accidents, and circumstances outside reasonable control."
    }
  ];

  return (
    <div className="bg-[#090B0B] text-[#F8F4F2] pt-12 pb-24 font-body">
      <section className="relative py-16 px-5 md:px-12 text-center max-w-4xl mx-auto border-b border-[#F8F4F2]/10">
        <FileText className="text-[#A27B5D] mx-auto mb-4" size={32} />
        <h1 className="font-display text-4xl md:text-5xl font-semibold text-[#F8F4F2] mb-3">
          Photography Terms and Conditions
        </h1>
        <p className="text-xs text-[#F8F4F2]/50 max-w-md mx-auto leading-relaxed">
          Please review our professional photography policies below. This content is provided for general informational purposes and should be reviewed by a qualified legal professional before being used as a binding agreement.
        </p>
      </section>

      <section className="py-16 px-5 md:px-12 max-w-[800px] mx-auto space-y-8 font-body">
        {sections.map((sec, idx) => (
          <div key={idx} className="space-y-2">
            <h3 className="text-sm font-bold uppercase tracking-wider text-[#A27B5D] font-mono">
              {idx + 1}. {sec.title}
            </h3>
            <p className="text-xs md:text-sm text-[#F8F4F2]/75 leading-relaxed">
              {sec.text}
            </p>
          </div>
        ))}
      </section>
    </div>
  );
}

export function PrivacyPage() {
  const sections = [
    {
      title: "Information Collection",
      text: "We collect information you provide directly to us through contact and inquiry forms, including full name, email addresses, telephone numbers, company details, date proposals, reference files, budgets, and specific project details."
    },
    {
      title: "Web Technologies & Analytics",
      text: "We use standard web tracking technologies, cookies, and privacy-conscious analytics services (such as Google Analytics 4, Search Console, and Google Business Profile tracking) to gather telemetry logs on how visitors interact with our portfolio and booking channels."
    },
    {
      title: "Use of Personal Data",
      text: "The information gathered is used exclusively to evaluate photography requests, prepare commercial estimates, coordinate sessions, execute digital downloads, transmit invoices, and contact you regarding your projects."
    },
    {
      title: "Data Security",
      text: "We employ industry-standard encryption protocols and secure server environments to safeguard your emails, contact records, and uploaded files. We do not sell or share your personal data with third-party advertisers."
    },
    {
      title: "Third-Party Providers",
      text: "We utilize trusted external service providers for booking coordination, online image galleries, and secure payment processing. Each provider operates under their own privacy protocols."
    },
    {
      title: "Cookies & Consents",
      text: "You can modify your browser settings to reject cookies if preferred. By checking our inquiry consent box, you agree to our contact protocols under this policy."
    }
  ];

  return (
    <div className="bg-[#090B0B] text-[#F8F4F2] pt-12 pb-24 font-body">
      <section className="relative py-16 px-5 md:px-12 text-center max-w-4xl mx-auto border-b border-[#F8F4F2]/10">
        <Shield className="text-[#A27B5D] mx-auto mb-4" size={32} />
        <h1 className="font-display text-4xl md:text-5xl font-semibold text-[#F8F4F2] mb-3">
          Privacy Policy
        </h1>
        <p className="text-xs text-[#F8F4F2]/50 max-w-md mx-auto leading-relaxed">
          We respect your digital privacy. Learn how we handle your personal data, form submissions, cookies, and booking information.
        </p>
      </section>

      <section className="py-16 px-5 md:px-12 max-w-[800px] mx-auto space-y-8 font-body">
        {sections.map((sec, idx) => (
          <div key={idx} className="space-y-2">
            <h3 className="text-sm font-bold uppercase tracking-wider text-[#A27B5D] font-mono">
              {sec.title}
            </h3>
            <p className="text-xs md:text-sm text-[#F8F4F2]/75 leading-relaxed">
              {sec.text}
            </p>
          </div>
        ))}
      </section>
    </div>
  );
}
