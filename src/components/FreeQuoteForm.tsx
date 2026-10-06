"use client";

import { useState, type FormEvent } from "react";
import { ChevronDown, Phone, MessageCircle } from "lucide-react";
import { useContent } from "@/hooks/useContent";
import { Button } from "@/components/ui/Button";
import { SuccessDialog } from "@/components/ui/SuccessDialog";
import { RichText } from "@/components/ui/RichText";
import { submitContactForm, CONTACT_SUCCESS_MESSAGE } from "@/lib/forms";
import type { FreeQuoteFormContent } from "@/types/content";

const FIELD_CLASSES =
  "w-full rounded-lg border border-[#b3b6b9] px-6 py-4 text-[16px] leading-[23px] text-black placeholder:text-black/50 focus:border-teal focus:outline-none";

const INITIAL_STATE = {
  name: "",
  email: "",
  phone: "",
  service: "",
  message: "",
  // Honeypot: real visitors never fill this in (it's visually hidden);
  // bots that auto-fill every field do. Never sent to the server — just
  // used to silently drop the submission client-side.
  website: "",
};

export function FreeQuoteForm({ content }: { content?: FreeQuoteFormContent }) {
  const {
    eyebrow,
    headingSegments,
    subtitle,
    nameLabel,
    namePlaceholder,
    emailLabel,
    emailPlaceholder,
    phoneLabel,
    phonePlaceholder,
    serviceLabel,
    servicePlaceholder,
    serviceOptions,
    projectLabel,
    projectPlaceholder,
    submitLabel,
    assistanceHeading,
    callLabel,
    callNumber,
    textLabel,
    trustLine,
  } = content ?? useContent("freeQuotePage").form;

  const [form, setForm] = useState(INITIAL_STATE);
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState(false);
  const [successMessage, setSuccessMessage] = useState<string | null>(null);

  async function handleSubmit(e: FormEvent) {
    e.preventDefault();
    if (submitting) return;
    if (form.website) {
      setForm(INITIAL_STATE);
      setSuccessMessage(CONTACT_SUCCESS_MESSAGE);
      return;
    }
    setSubmitting(true);
    setError(false);
    try {
      const success = await submitContactForm({
        name: form.name,
        email: form.email,
        phone: form.phone,
        serviceInterest: form.service,
        aboutTheProject: form.message,
      });
      if (success) {
        setForm(INITIAL_STATE);
        setSuccessMessage(CONTACT_SUCCESS_MESSAGE);
      } else {
        setError(true);
      }
    } catch {
      setError(true);
    } finally {
      setSubmitting(false);
    }
  }

  return (
    <section className="px-4 pb-14 md:px-12 md:pb-16 xl:px-20 xl:pb-20">
      <div className="flex flex-col gap-10 rounded-lg bg-white p-6 md:p-12 xl:p-20">
        {/* Header */}
        <div className="flex flex-col items-center gap-4">
          <div className="flex items-center justify-center rounded-lg border border-[#dbdde2] p-2">
            <p className="whitespace-nowrap text-center font-mono text-[11px] leading-[16px] tracking-[1.1px] text-black">
              {eyebrow}
            </p>
          </div>
          <p className="text-center font-heading text-[28px] font-semibold leading-[36px] tracking-[-0.1296px] text-navy md:text-[36px] md:leading-[44px]">
            {headingSegments.map((seg, i) => (
              <span key={i} className={seg.emphasis ? "text-teal" : undefined}>
                {seg.text}
              </span>
            ))}
          </p>
          <RichText paragraphs={subtitle} className="text-center text-[16px] leading-[23px] text-black" />
        </div>

        {/* Form */}
        <form onSubmit={handleSubmit} className="flex flex-col gap-6">
          <input
            type="text"
            name="website"
            value={form.website}
            onChange={(e) => setForm({ ...form, website: e.target.value })}
            className="sr-only"
            tabIndex={-1}
            autoComplete="off"
            aria-hidden="true"
          />
          <div className="flex flex-col gap-6">
            {error && (
              <div className="flex w-full flex-col items-start gap-2 rounded-lg border border-red-500 bg-red-50 p-4">
                <p className="font-body text-[16px] leading-[23px] text-red-600">
                  Something went wrong submitting your request. Please try again.
                </p>
              </div>
            )}
            {/* Name + Email row */}
            <div className="flex flex-col gap-6 xl:flex-row xl:gap-5">
              <div className="flex flex-1 flex-col gap-4">
                <label htmlFor="free-quote-name" className="text-[16px] leading-[23px] text-black">
                  {nameLabel}
                </label>
                <input
                  id="free-quote-name"
                  type="text"
                  placeholder={namePlaceholder}
                  className={FIELD_CLASSES}
                  value={form.name}
                  onChange={(e) => setForm({ ...form, name: e.target.value })}
                />
              </div>
              <div className="flex flex-1 flex-col gap-4">
                <label htmlFor="free-quote-email" className="text-[16px] leading-[23px] text-black">
                  {emailLabel}
                </label>
                <input
                  id="free-quote-email"
                  type="email"
                  placeholder={emailPlaceholder}
                  className={FIELD_CLASSES}
                  value={form.email}
                  onChange={(e) => setForm({ ...form, email: e.target.value })}
                />
              </div>
            </div>

            {/* Phone */}
            <div className="flex flex-col gap-4">
              <label htmlFor="free-quote-phone" className="text-[16px] leading-[23px] text-black">
                {phoneLabel}
              </label>
              <input
                id="free-quote-phone"
                type="tel"
                placeholder={phonePlaceholder}
                className={FIELD_CLASSES}
                value={form.phone}
                onChange={(e) => setForm({ ...form, phone: e.target.value })}
              />
            </div>

            {/* Service Interest */}
            <div className="flex flex-col gap-4">
              <label htmlFor="free-quote-service" className="text-[16px] leading-[23px] text-black">
                {serviceLabel}
              </label>
              <div className="relative">
                <select
                  id="free-quote-service"
                  className={`${FIELD_CLASSES} appearance-none pr-12`}
                  value={form.service}
                  onChange={(e) =>
                    setForm({ ...form, service: e.target.value })
                  }
                >
                  <option value="" disabled>
                    {servicePlaceholder}
                  </option>
                  {serviceOptions.map((opt) => (
                    <option key={opt} value={opt}>
                      {opt}
                    </option>
                  ))}
                </select>
                <ChevronDown className="pointer-events-none absolute right-4 top-1/2 size-6 -translate-y-1/2 text-black/50" />
              </div>
            </div>

            {/* Message */}
            <div className="flex flex-col gap-4">
              <label htmlFor="free-quote-project" className="text-[16px] leading-[23px] text-black">
                {projectLabel}
              </label>
              <textarea
                id="free-quote-project"
                placeholder={projectPlaceholder}
                rows={6}
                className={`${FIELD_CLASSES} resize-none`}
                value={form.message}
                onChange={(e) =>
                  setForm({ ...form, message: e.target.value })
                }
              />
            </div>

            {/* Submit button — full width per Figma */}
            <Button type="submit" className="w-full">{submitting ? "Submitting..." : submitLabel}</Button>
          </div>

          {/* Divider */}
          <div className="h-px w-full bg-teal/20" />
        </form>

        {/* Immediate assistance */}
        <div className="flex flex-col gap-6">
          <div className="flex flex-col items-center gap-6">
            <p className="text-center font-heading text-[22px] font-semibold leading-[32px] tracking-[-0.0792px] text-[#737373]">
              {assistanceHeading}
            </p>
            <div className="flex w-full flex-col gap-4 md:flex-row">
              <a
                href={`tel:${callNumber.replace(/[^+\d]/g, "")}`}
                className="flex flex-1 items-center justify-center gap-3 whitespace-nowrap rounded-lg bg-navy p-4"
              >
                <Phone className="size-6 shrink-0 text-white" />
                <span className="font-heading text-[18px] font-semibold leading-[27px] tracking-[-0.0648px] text-white">
                  {callLabel}
                </span>
                <span className="font-heading text-[18px] font-semibold leading-[27px] tracking-[-0.0648px] text-white">
                  {callNumber}
                </span>
              </a>
              <a
                href={`sms:${callNumber.replace(/[^+\d]/g, "")}`}
                className="flex flex-1 items-center justify-center gap-3 whitespace-nowrap rounded-lg bg-navy p-4"
              >
                <MessageCircle className="size-6 shrink-0 text-white" />
                <span className="font-heading text-[18px] font-semibold leading-[27px] tracking-[-0.0648px] text-white">
                  {textLabel}
                </span>
              </a>
            </div>
          </div>

          {/* Trust strip */}
          <div className="flex items-center justify-center rounded-lg bg-ice px-6 py-4 md:px-40">
            <p className="text-center font-heading text-[15px] font-semibold leading-[27.2px] tracking-[0.56px] text-navy">
              {trustLine}
            </p>
          </div>
        </div>
      </div>
      <SuccessDialog message={successMessage} onClose={() => setSuccessMessage(null)} />
    </section>
  );
}
