"use client";

import { useState, type FormEvent } from "react";
import { ChevronDown } from "lucide-react";
import { useContent } from "@/hooks/useContent";
import { useToast } from "@/hooks/useToast";
import { Button } from "@/components/ui/Button";
import { Toast } from "@/components/ui/Toast";
import { submitContactForm } from "@/lib/forms";
import type { CityConsultationContent } from "@/types/content";

const FIELD_CLASSES =
  "w-full rounded-lg border border-ice-dark px-6 py-4 text-[16px] leading-[23px] text-black placeholder:text-black/50 focus:border-teal focus:outline-none";

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

// No CMS field exists for this — same "hardcode rather than guess at an
// unverified GraphQL field" call as elsewhere in this codebase.
const SUCCESS_MESSAGE = "Thanks! We've received your request and will be in touch shortly.";

export function CityConsultationForm({ content }: { content?: CityConsultationContent }) {
  const { eyebrow, heading, description, ctaLabel } = content ?? useContent("cityPage").consultation;
  const [form, setForm] = useState(INITIAL_STATE);
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState(false);
  const { message: toastMessage, showToast, hideToast } = useToast();

  async function handleSubmit(e: FormEvent) {
    e.preventDefault();
    if (submitting) return;
    if (form.website) {
      // Honeypot tripped — silently pretend success, don't hit the API.
      setForm(INITIAL_STATE);
      showToast(SUCCESS_MESSAGE);
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
        showToast(SUCCESS_MESSAGE);
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
    <section className="bg-ice px-4 py-14 md:px-12 md:py-16 xl:p-20">
      <div className="flex flex-col gap-8 xl:flex-row xl:gap-8">
        {/* Info panel */}
        <div className="flex flex-col items-start gap-4 rounded-lg bg-navy p-10 md:p-16 xl:w-[584px] xl:shrink-0 xl:justify-center">
          <div className="flex items-center justify-center rounded-lg border border-navy-light-active p-2">
            <p className="whitespace-nowrap text-center font-mono text-[11px] leading-[16px] tracking-[1.1px] text-white">
              {eyebrow}
            </p>
          </div>
          <div className="flex flex-col gap-6">
            <h2 className="max-w-[401px] font-heading text-[36px] font-semibold leading-[44px] tracking-[-0.1296px] text-white">
              {heading}
            </h2>
            <p className="text-[16px] leading-[23px] text-white">{description}</p>
          </div>
        </div>

        {/* Form */}
        <form onSubmit={handleSubmit} className="flex flex-1 flex-col gap-10">
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
          <div className="flex flex-col gap-5">
            {error && (
              <div className="flex w-full flex-col items-start gap-2 rounded-lg border border-red-500 bg-red-50 p-4">
                <p className="font-body text-[16px] leading-[23px] text-red-600">
                  Something went wrong submitting your request. Please try again.
                </p>
              </div>
            )}
            {/* Name + Email row */}
            <div className="flex flex-col gap-5 xl:flex-row">
              <div className="flex flex-1 flex-col gap-2.5">
                <label className="text-[16px] leading-[23px] text-black">Name</label>
                <input
                  type="text"
                  placeholder="John Doe"
                  className={FIELD_CLASSES}
                  value={form.name}
                  onChange={(e) => setForm({ ...form, name: e.target.value })}
                />
              </div>
              <div className="flex flex-1 flex-col gap-2.5">
                <label className="text-[16px] leading-[23px] text-black">Email</label>
                <input
                  type="email"
                  placeholder="john@example.com"
                  className={FIELD_CLASSES}
                  value={form.email}
                  onChange={(e) => setForm({ ...form, email: e.target.value })}
                />
              </div>
            </div>

            {/* Phone */}
            <div className="flex flex-col gap-2.5">
              <label className="text-[16px] leading-[23px] text-black">Phone</label>
              <input
                type="tel"
                placeholder="+ (954) 555-1234"
                className={FIELD_CLASSES}
                value={form.phone}
                onChange={(e) => setForm({ ...form, phone: e.target.value })}
              />
            </div>

            {/* Service Interest */}
            <div className="flex flex-col gap-2.5">
              <label className="text-[16px] leading-[23px] text-black">Service Interest</label>
              <div className="relative">
                <select
                  className={`${FIELD_CLASSES} appearance-none pr-12`}
                  value={form.service}
                  onChange={(e) => setForm({ ...form, service: e.target.value })}
                >
                  <option value="" disabled>Select a category</option>
                  <option value="blinds">Blinds</option>
                  <option value="shades">Shades</option>
                  <option value="drapery">Curtains & Drapery</option>
                  <option value="shutters">Shutters</option>
                  <option value="motorized">Motorized & Smart Homes</option>
                  <option value="repairs">Repairs & Maintenance</option>
                </select>
                <ChevronDown className="pointer-events-none absolute right-4 top-1/2 size-6 -translate-y-1/2 text-black/50" />
              </div>
            </div>

            {/* Message */}
            <div className="flex flex-col gap-2.5">
              <label className="text-[16px] leading-[23px] text-black">Tell us about your Project</label>
              <textarea
                placeholder="Tell us about your project...."
                rows={6}
                className={`${FIELD_CLASSES} resize-none`}
                value={form.message}
                onChange={(e) => setForm({ ...form, message: e.target.value })}
              />
            </div>
          </div>

          <Button type="submit" className="w-fit">{submitting ? "Submitting..." : ctaLabel}</Button>
        </form>
      </div>
      {toastMessage && <Toast message={toastMessage} onClose={hideToast} />}
    </section>
  );
}
