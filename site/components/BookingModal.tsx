/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { X, Calendar, Camera, Mail, User, Phone, CheckCircle, Ticket } from 'lucide-react';
import { BookingForm } from '../types';
import { supabase } from '../supabase';

interface BookingModalProps {
  isOpen: boolean;
  onClose: () => boolean | void;
}

export default function BookingModal({ isOpen, onClose }: BookingModalProps) {
  const [formData, setFormData] = useState<BookingForm>({
    name: '',
    email: '',
    phone: '',
    sessionType: 'Editorial Portrait',
    preferredDate: '',
    notes: '',
  });

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const [ticketId, setTicketId] = useState('');
  const [submitError, setSubmitError] = useState('');

  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.name || !formData.email || !formData.preferredDate) {
      alert('Please fill out the required fields (Name, Email, Date)');
      return;
    }

    setIsSubmitting(true);
    setSubmitError('');
    const nextTicketId = `GP-BOOK-${Math.floor(100000 + Math.random() * 900000)}-${new Date().getFullYear()}`;
    const { error } = await supabase.from('contact_messages').insert({
      ticket_id: nextTicketId,
      source: 'booking',
      name: formData.name,
      email: formData.email,
      phone: formData.phone || null,
      session_type: formData.sessionType,
      preferred_date: formData.preferredDate,
      details: formData.notes || null,
      consent: true,
    });
    if (error) {
      setIsSubmitting(false);
      setSubmitError(error.message || 'Unable to send the request right now. Please try again.');
      return;
    }
    setIsSubmitting(false);
    setIsSuccess(true);
    setTicketId(nextTicketId);
  };

  const resetForm = () => {
    setFormData({
      name: '',
      email: '',
      phone: '',
      sessionType: 'Editorial Portrait',
      preferredDate: '',
      notes: '',
    });
    setIsSuccess(false);
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <div id="booking-modal-overlay" className="fixed inset-0 z-50 flex items-center justify-center p-4">
          {/* Backdrop blur */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => {
              resetForm();
              onClose();
            }}
            className="absolute inset-0 bg-[#090B0B]/90 backdrop-blur-md cursor-pointer"
          />

          {/* Modal Container */}
          <motion.div
            initial={{ scale: 0.95, opacity: 0, y: 20 }}
            animate={{ scale: 1, opacity: 1, y: 0 }}
            exit={{ scale: 0.95, opacity: 0, y: 20 }}
            transition={{ type: 'spring', damping: 25, stiffness: 220 }}
            className="relative w-full max-w-lg bg-[#283133] border border-[#F8F4F2]/12 rounded-lg overflow-hidden z-10 shadow-2xl"
          >
            {/* Elegant Header Border Line */}
            <div className="h-1.5 w-full bg-[#A27B5D]" />

            {/* Close Button */}
            <button
              onClick={() => {
                resetForm();
                onClose();
              }}
              className="absolute top-4 right-4 p-2 text-[#F8F4F2]/50 hover:text-[#A27B5D] transition-colors rounded-full hover:bg-[#F8F4F2]/5"
              id="close-booking-modal"
            >
              <X size={18} />
            </button>

            <div className="p-8">
              {!isSuccess ? (
                <div>
                  <div className="mb-6">
                    <span className="text-[10px] uppercase tracking-widest text-[#A27B5D] font-semibold block mb-1">
                      Reservation Desk
                    </span>
                    <h3 className="font-display text-3xl font-semibold text-[#F8F4F2] leading-tight">
                      Request a Session
                    </h3>
                    <p className="text-xs text-[#F8F4F2]/60 mt-1.5 font-body">
                      Arrange a personalized editorial or portrait photoshoot tailored to your vision.
                    </p>
                  </div>

                  <form onSubmit={handleSubmit} className="space-y-4 font-body">
                    {/* Name */}
                    <div>
                      <label className="block text-[11px] uppercase tracking-wider text-[#F8F4F2]/40 font-medium mb-1.5">
                        Your Full Name *
                      </label>
                      <div className="relative">
                        <span className="absolute left-3.5 top-1/2 -translate-y-1/2 text-[#F8F4F2]/30">
                          <User size={14} />
                        </span>
                        <input
                          type="text"
                          name="name"
                          required
                          value={formData.name}
                          onChange={handleInputChange}
                          placeholder="e.g. Alexander Mercer"
                          className="w-full bg-[#090B0B]/50 border border-[#F8F4F2]/10 rounded px-10 py-2.5 text-sm text-[#F8F4F2] placeholder-[#F8F4F2]/20 focus:outline-none focus:border-[#A27B5D] transition-colors"
                        />
                      </div>
                    </div>

                    {/* Contact Grid */}
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                      {/* Email */}
                      <div>
                        <label className="block text-[11px] uppercase tracking-wider text-[#F8F4F2]/40 font-medium mb-1.5">
                          Email Address *
                        </label>
                        <div className="relative">
                          <span className="absolute left-3.5 top-1/2 -translate-y-1/2 text-[#F8F4F2]/30">
                            <Mail size={14} />
                          </span>
                          <input
                            type="email"
                            name="email"
                            required
                            value={formData.email}
                            onChange={handleInputChange}
                            placeholder="alex@example.com"
                            className="w-full bg-[#090B0B]/50 border border-[#F8F4F2]/10 rounded px-10 py-2.5 text-sm text-[#F8F4F2] placeholder-[#F8F4F2]/20 focus:outline-none focus:border-[#A27B5D] transition-colors"
                          />
                        </div>
                      </div>

                      {/* Phone */}
                      <div>
                        <label className="block text-[11px] uppercase tracking-wider text-[#F8F4F2]/40 font-medium mb-1.5">
                          Phone (Optional)
                        </label>
                        <div className="relative">
                          <span className="absolute left-3.5 top-1/2 -translate-y-1/2 text-[#F8F4F2]/30">
                            <Phone size={14} />
                          </span>
                          <input
                            type="tel"
                            name="phone"
                            value={formData.phone}
                            onChange={handleInputChange}
                            placeholder="+1 (514) 000-0000"
                            className="w-full bg-[#090B0B]/50 border border-[#F8F4F2]/10 rounded px-10 py-2.5 text-sm text-[#F8F4F2] placeholder-[#F8F4F2]/20 focus:outline-none focus:border-[#A27B5D] transition-colors"
                          />
                        </div>
                      </div>
                    </div>

                    {/* Selection Grid */}
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                      {/* Session Type */}
                      <div>
                        <label className="block text-[11px] uppercase tracking-wider text-[#F8F4F2]/40 font-medium mb-1.5">
                          Session Style
                        </label>
                        <div className="relative">
                          <span className="absolute left-3.5 top-1/2 -translate-y-1/2 text-[#F8F4F2]/30">
                            <Camera size={14} />
                          </span>
                          <select
                            name="sessionType"
                            value={formData.sessionType}
                            onChange={handleInputChange}
                            className="w-full bg-[#090B0B]/50 border border-[#F8F4F2]/10 rounded pl-10 pr-4 py-2.5 text-sm text-[#F8F4F2] focus:outline-none focus:border-[#A27B5D] transition-colors appearance-none cursor-pointer"
                          >
                            <option value="Portrait Photography">Portrait Photography</option>
                            <option value="Couples & Family Photography">Couples & Family Photography</option>
                            <option value="Headshots & Personal Branding">Headshots & Personal Branding</option>
                            <option value="Product & Brand Photography">Product & Brand Photography</option>
                            <option value="Event Photography">Event Photography</option>
                          </select>
                        </div>
                      </div>

                      {/* Preferred Date */}
                      <div>
                        <label className="block text-[11px] uppercase tracking-wider text-[#F8F4F2]/40 font-medium mb-1.5">
                          Preferred Date *
                        </label>
                        <div className="relative">
                          <span className="absolute left-3.5 top-1/2 -translate-y-1/2 text-[#F8F4F2]/30">
                            <Calendar size={14} />
                          </span>
                          <input
                            type="date"
                            name="preferredDate"
                            required
                            value={formData.preferredDate}
                            onChange={handleInputChange}
                            className="w-full bg-[#090B0B]/50 border border-[#F8F4F2]/10 rounded px-10 py-2.5 text-sm text-[#F8F4F2] focus:outline-none focus:border-[#A27B5D] transition-colors cursor-pointer"
                          />
                        </div>
                      </div>
                    </div>

                    {/* Session Notes */}
                    <div>
                      <label className="block text-[11px] uppercase tracking-wider text-[#F8F4F2]/40 font-medium mb-1.5">
                        Creative Concept & Notes
                      </label>
                      <textarea
                        name="notes"
                        rows={3}
                        value={formData.notes}
                        onChange={handleInputChange}
                        placeholder="Describe the desired mood, wardrobe, or locations you have in mind..."
                        className="w-full bg-[#090B0B]/50 border border-[#F8F4F2]/10 rounded p-3 text-sm text-[#F8F4F2] placeholder-[#F8F4F2]/20 focus:outline-none focus:border-[#A27B5D] transition-colors resize-none"
                      />
                    </div>

                    {/* Submit Button */}
                    {submitError && (
                      <div role="alert" className="rounded border border-red-400/30 bg-red-500/10 px-4 py-3 text-xs text-red-200">
                        {submitError}
                      </div>
                    )}
                    <button
                      type="submit"
                      disabled={isSubmitting}
                      className="w-full bg-[#A27B5D] hover:bg-[#AA876C] text-[#090B0B] font-semibold py-3 px-4 rounded text-sm transition-colors duration-200 flex items-center justify-center gap-2 mt-2 cursor-pointer disabled:opacity-50"
                      id="submit-booking-form"
                    >
                      {isSubmitting ? (
                        <>
                          <span className="w-4 h-4 border-2 border-[#090B0B] border-t-transparent rounded-full animate-spin" />
                          Processing Reservation...
                        </>
                      ) : (
                        'Submit Reservation Request'
                      )}
                    </button>
                  </form>
                </div>
              ) : (
                /* Editorial Pass Ticket Confirmation */
                <motion.div
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ delay: 0.1 }}
                  className="text-center py-4"
                >
                  <div className="inline-flex items-center justify-center w-14 h-14 bg-[#A27B5D]/10 border border-[#A27B5D]/30 text-[#A27B5D] rounded-full mb-4">
                    <Ticket size={28} />
                  </div>

                  <h3 className="font-display text-2xl font-semibold text-[#F8F4F2] mb-1">
                    Booking Request Received
                  </h3>
                  <p className="text-xs text-[#F8F4F2]/60 max-w-sm mx-auto mb-6">
                    Your request has been logged. Rashad will review your creative brief and reach out to schedule an introduction.
                  </p>

                  {/* Cinematic Ticket Card */}
                  <div className="bg-[#090B0B]/80 border border-[#A27B5D]/20 rounded-lg p-5 text-left font-mono relative overflow-hidden mb-6">
                    {/* Decorative Ticket Notch Holes */}
                    <div className="absolute top-1/2 -left-3 w-6 h-6 bg-[#283133] border border-[#F8F4F2]/12 rounded-full -translate-y-1/2" />
                    <div className="absolute top-1/2 -right-3 w-6 h-6 bg-[#283133] border border-[#F8F4F2]/12 rounded-full -translate-y-1/2" />

                    <div className="border-b border-[#F8F4F2]/10 pb-3 mb-3 flex justify-between items-center text-[10px]">
                      <span className="text-[#A27B5D] font-bold tracking-widest">GULIYEV PHOTO</span>
                      <span className="text-[#F8F4F2]/40">{ticketId}</span>
                    </div>

                    <div className="space-y-2 text-xs">
                      <div className="flex justify-between">
                        <span className="text-[#F8F4F2]/30 uppercase">CLIENT:</span>
                        <span className="text-[#F8F4F2]/90 text-right max-w-[180px] truncate">{formData.name}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-[#F8F4F2]/30 uppercase">SESSION:</span>
                        <span className="text-[#A27B5D] font-medium">{formData.sessionType}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-[#F8F4F2]/30 uppercase">PROPOSED DATE:</span>
                        <span className="text-[#F8F4F2]/90">{formData.preferredDate}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-[#F8F4F2]/30 uppercase">STATUS:</span>
                        <span className="text-[#F8F4F2]/90 tracking-wide text-xs">PENDING APPROVAL</span>
                      </div>
                    </div>

                    <div className="mt-4 pt-3 border-t border-dashed border-[#F8F4F2]/15 text-center text-[9px] text-[#F8F4F2]/40 tracking-wider">
                      DALLAS, TX • CREATIVE STUDIO
                    </div>
                  </div>

                  <button
                    onClick={() => {
                      resetForm();
                      onClose();
                    }}
                    className="bg-transparent border border-[#F8F4F2]/20 hover:border-[#A27B5D] hover:text-[#A27B5D] text-[#F8F4F2]/80 font-semibold py-2 px-6 rounded text-xs transition-colors cursor-pointer"
                  >
                    Close Window
                  </button>
                </motion.div>
              )}
            </div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
}
