import React, { useMemo, useRef, useState } from 'react';
import { CheckCircle, Mail, MapPin, RefreshCw, Send, ShieldCheck, Upload } from 'lucide-react';
import { useSiteData } from '../SiteDataContext';
import { defaultContactFields, parseJsonSetting, type ContactField } from '../contentModels';
import { supabase, uploadContactAttachment } from '../supabase';

type FormState = Record<string, string | boolean>;

export default function ContactPage() {
  const { get } = useSiteData();
  const fields = parseJsonSetting<ContactField[]>(get('contact.fields'), defaultContactFields).filter((field) => field.visible);
  const initialState = useMemo<FormState>(() => Object.fromEntries(fields.map((field) => [field.key, field.type === 'select' ? field.options?.[0] || '' : ''])), [fields]);
  const [formData, setFormData] = useState<FormState>(initialState);
  const [consent, setConsent] = useState(false);
  const [attachment, setAttachment] = useState<File | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [ticketId, setTicketId] = useState('');
  const [submitError, setSubmitError] = useState('');
  const [captcha, setCaptcha] = useState(() => ({ left: 2 + Math.floor(Math.random() * 7), right: 1 + Math.floor(Math.random() * 8) }));
  const [captchaAnswer, setCaptchaAnswer] = useState('');
  const [website, setWebsite] = useState('');
  const formStartedAt = useRef(Date.now());

  const refreshCaptcha = () => {
    setCaptcha({ left: 2 + Math.floor(Math.random() * 7), right: 1 + Math.floor(Math.random() * 8) });
    setCaptchaAnswer('');
  };

  const update = (key: string, value: string) => setFormData((current) => ({ ...current, [key]: value }));

  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault();
    const missing = fields.find((field) => field.required && !String(formData[field.key] || '').trim());
    if (missing) return setSubmitError(`${missing.label} is required.`);
    if (!consent) return setSubmitError('Please accept the consent checkbox.');
    if (website) return setSubmitError('Unable to submit this inquiry.');
    if (Date.now() - formStartedAt.current < 2500) return setSubmitError('Please take a moment to review your inquiry before sending.');
    if (Number(captchaAnswer) !== captcha.left + captcha.right) {
      refreshCaptcha();
      return setSubmitError('The security answer was incorrect. Please try the new question.');
    }
    setIsSubmitting(true);
    setSubmitError('');
    const nextTicketId = `GP-INQ-${Math.floor(100000 + Math.random() * 900000)}-${new Date().getFullYear()}`;
    try {
      let attachmentPath: string | null = null;
      if (attachment) {
        if (attachment.size > 10 * 1024 * 1024) throw new Error('The attachment must be smaller than 10MB.');
        if (!['image/jpeg', 'image/png', 'application/pdf'].includes(attachment.type)) throw new Error('Please attach a JPG, PNG, or PDF file.');
        attachmentPath = await uploadContactAttachment(attachment);
      }
      const value = (key: string) => String(formData[key] || '').trim() || null;
      const { error } = await supabase.from('contact_messages').insert({
        ticket_id: nextTicketId,
        source: 'contact',
        name: value('name') || 'Website inquiry',
        email: value('email') || get('contact.email'),
        phone: value('phone'),
        company: value('company'),
        session_type: value('sessionType'),
        preferred_date: value('preferredDate'),
        alternate_date: value('altDate'),
        location: value('location'),
        subject_count: value('count'),
        intended_use: value('intendedUse'),
        budget: value('budget'),
        heard_about: value('heardAbout'),
        details: value('details'),
        consent: true,
        attachment_path: attachmentPath,
      });
      if (error) throw error;
      setTicketId(nextTicketId);
    } catch (error) {
      setSubmitError(error instanceof Error ? error.message : 'Unable to send your inquiry. Please try again.');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="bg-[#090B0B] text-[#F8F4F2] pt-12 pb-24 font-body">
      <section className="relative py-20 px-5 md:px-12 text-center max-w-4xl mx-auto border-b border-[#F8F4F2]/10">
        <span className="text-[10px] uppercase tracking-[0.25em] text-[#A27B5D] font-bold block mb-4">{get('contact.eyebrow')}</span>
        <h1 className="font-display text-4xl md:text-6xl font-semibold leading-tight mb-6">{get('contact.heading')}</h1>
        <p className="text-sm md:text-base text-[#F8F4F2]/75 leading-relaxed max-w-2xl mx-auto">{get('contact.intro')}</p>
      </section>

      <section className="py-20 px-5 md:px-12 max-w-[1100px] mx-auto grid lg:grid-cols-[1fr_280px] gap-10 items-start">
        <div className="bg-[#283133]/20 border border-[#F8F4F2]/10 rounded-lg p-6 md:p-8">
          {ticketId ? (
            <div className="py-16 text-center">
              <CheckCircle size={44} className="mx-auto text-[#A27B5D]" />
              <h2 className="mt-5 font-display text-3xl font-semibold">Inquiry received</h2>
              <p className="mt-3 text-sm text-white/60">Thank you. Your reference number is <strong className="text-[#A27B5D]">{ticketId}</strong>.</p>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-6">
              <label className="absolute -left-[9999px] h-px w-px overflow-hidden" aria-hidden="true">Website<input type="text" tabIndex={-1} autoComplete="off" value={website} onChange={(event) => setWebsite(event.target.value)} /></label>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                {fields.map((field) => (
                  <label key={field.key} className={field.type === 'textarea' ? 'md:col-span-2' : ''}>
                    <span className="block text-[10px] uppercase tracking-wider text-white/45 font-semibold mb-2">{field.label}{field.required ? ' *' : ''}</span>
                    {field.type === 'textarea' ? (
                      <textarea rows={6} required={field.required} value={String(formData[field.key] || '')} onChange={(event) => update(field.key, event.target.value)} placeholder={field.placeholder} className="w-full rounded border border-white/10 bg-black/25 px-4 py-3 text-sm outline-none focus:border-[#A27B5D]" />
                    ) : field.type === 'select' ? (
                      <select required={field.required} value={String(formData[field.key] || '')} onChange={(event) => update(field.key, event.target.value)} className="w-full rounded border border-white/10 bg-[#111515] px-4 py-3 text-sm outline-none focus:border-[#A27B5D]">
                        {!field.required && <option value="">Choose an option</option>}
                        {(field.options || []).map((option) => <option key={option} value={option}>{option}</option>)}
                      </select>
                    ) : (
                      <input type={field.type} required={field.required} value={String(formData[field.key] || '')} onChange={(event) => update(field.key, event.target.value)} placeholder={field.placeholder} className="w-full rounded border border-white/10 bg-black/25 px-4 py-3 text-sm outline-none focus:border-[#A27B5D]" />
                    )}
                  </label>
                ))}
              </div>

              <label className="relative flex cursor-pointer items-center justify-center gap-2 rounded border border-dashed border-white/15 px-4 py-4 text-xs text-white/55 hover:border-[#A27B5D] hover:text-[#A27B5D]">
                <Upload size={14} />{attachment ? attachment.name : 'Attach a JPG, PNG, or PDF (optional)'}
                <input type="file" accept="image/jpeg,image/png,application/pdf" className="absolute inset-0 opacity-0 cursor-pointer" onChange={(event) => setAttachment(event.target.files?.[0] || null)} />
              </label>
              <label className="flex items-start gap-3 text-xs text-white/60"><input type="checkbox" checked={consent} onChange={(event) => setConsent(event.target.checked)} className="mt-0.5 accent-[#A27B5D]" /><span>{get('contact.consentLabel')}</span></label>
              <div className="rounded-lg border border-[#A27B5D]/25 bg-[#A27B5D]/5 p-4">
                <div className="flex flex-wrap items-center gap-4">
                  <div className="flex items-center gap-2 text-xs font-semibold text-[#A27B5D]"><ShieldCheck size={16} /><span>Quick security check</span></div>
                  <label className="flex flex-1 items-center gap-3 text-sm text-white/75 min-w-[220px]"><span>What is <strong className="text-white">{captcha.left} + {captcha.right}</strong>?</span><input type="number" inputMode="numeric" required value={captchaAnswer} onChange={(event) => setCaptchaAnswer(event.target.value)} className="w-20 rounded border border-white/15 bg-black/30 px-3 py-2 text-center text-sm outline-none focus:border-[#A27B5D]" aria-label="Security answer" /></label>
                  <button type="button" onClick={refreshCaptcha} className="rounded border border-white/10 p-2 text-white/40 hover:border-[#A27B5D] hover:text-[#A27B5D]" aria-label="New security question" title="New question"><RefreshCw size={14} /></button>
                </div>
              </div>
              {submitError && <p role="alert" className="rounded border border-red-400/20 bg-red-500/10 p-3 text-xs text-red-200">{submitError}</p>}
              <button disabled={isSubmitting} className="inline-flex items-center gap-2 rounded bg-[#A27B5D] px-6 py-3 text-xs font-bold text-[#090B0B] hover:bg-[#AA876C] disabled:opacity-60"><Send size={14} />{isSubmitting ? 'Sending…' : get('contact.submitButton')}</button>
            </form>
          )}
        </div>

        <aside className="rounded-lg border border-white/10 bg-[#283133]/20 p-6 space-y-5 text-sm text-white/65">
          <h2 className="font-display text-2xl text-white">Direct contact</h2>
          <a href={`mailto:${get('contact.email')}`} className="flex items-center gap-3 hover:text-[#A27B5D]"><Mail size={16} />{get('contact.email')}</a>
          <p className="flex items-center gap-3"><MapPin size={16} className="text-[#A27B5D]" />Dallas–Fort Worth, Texas</p>
        </aside>
      </section>
    </div>
  );
}
