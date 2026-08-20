"use client";

import { useState, type FormEvent } from "react";
import { ChevronDown } from "lucide-react";
import { useContent } from "@/hooks/useContent";
import { Button } from "@/components/ui/Button";

interface FormState {
  name: string;
  email: string;
  phone: string;
  service: string;
  project: string;
}

const INITIAL_STATE: FormState = { name: "", email: "", phone: "", service: "", project: "" };

// Shared field-chrome so every text input / select / textarea gets the exact
// same 1px ice-dark border, 8px radius, and 24/16 padding from the Figma
// spec ("2722:1650" etc.) without repeating the class string five times.
const FIELD_CLASSES =
  "w-full rounded-[8px] border border-ice-dark px-6 py-4 font-body text-[16px] leading-[23px] text-black focus:border-teal focus:outline-none";

// This is a real, interactive form (controlled inputs + submit handling), so
// per the project's server-first rule it has to opt into the client runtime.
export function QuoteForm() {
  const content = useContent("quoteForm");
  const [formData, setFormData] = useState<FormState>(INITIAL_STATE);
  const [submitted, setSubmitted] = useState(false);

  function handleChange<K extends keyof FormState>(field: K, value: string) {
    setFormData((prev) => ({ ...prev, [field]: value }));
  }

  function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    // TODO: wire to real submission endpoint once one exists.
    console.log("TODO: wire to real submission endpoint", formData);
    setSubmitted(true);
  }

  // Corrected 2026-08-16: no font-size scaling exists in the source
  // (heading/description text styles are identical at every breakpoint),
  // the mobile/tablet padding step was missing `md:px-12`, and the
  // panel-to-form gap is 32px (`gap-8`) on every confirmed frame, not
  // 24px. Vertical padding is a flat 56px through tablet (`py-14`), only
  // stepping up to 100px at `xl`.
  return (
    <section id="quote-form" className="flex flex-col gap-8 px-8 py-14 md:px-12 xl:flex-row xl:gap-10 xl:px-20 xl:py-[100px]">
      <div className="flex w-full shrink-0 flex-col items-start justify-center gap-4 rounded-[8px] bg-navy p-8 xl:w-[584px] xl:self-stretch xl:p-16">
        <div className="flex items-center justify-center rounded-lg border border-navy-light-active p-2">
          <p className="whitespace-nowrap font-mono text-[11px] leading-[16px] tracking-[1.1px] text-white uppercase">
            {content.eyebrow}
          </p>
        </div>
        <div className="flex w-full flex-col items-start gap-6">
          <p className="w-full font-heading text-[36px] font-semibold leading-[44px] tracking-[-0.1296px] text-white xl:w-[401px]">
            {content.heading}
          </p>
          <div className="flex w-full items-center justify-center">
            <p className="flex-1 font-body text-[16px] leading-[23px] text-white">
              {content.description}
            </p>
          </div>
        </div>
      </div>

      <div className="flex flex-1 flex-col items-start gap-10">
        {submitted ? (
          <div className="flex w-full flex-col items-start gap-2 rounded-[8px] border border-teal bg-teal-hover p-6">
            <p className="font-body text-[16px] leading-[23px] text-navy">{content.successMessage}</p>
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="flex w-full flex-col items-start gap-5">
            {/* Confirmed mobile ("Frame 121"/"Frame 122" stacked) and tablet
                frames un-pair Name/Email into a full-width vertical stack —
                only desktop keeps them side by side. */}
            <div className="flex w-full flex-col items-start gap-5 xl:flex-row">
              <div className="flex w-full flex-col items-start gap-2.5 xl:flex-1">
                <label htmlFor="quote-name" className="font-body text-[16px] leading-[23px] text-black">
                  {content.nameLabel}
                </label>
                <input
                  id="quote-name"
                  name="name"
                  type="text"
                  required
                  placeholder={content.namePlaceholder}
                  value={formData.name}
                  onChange={(event) => handleChange("name", event.target.value)}
                  className={`${FIELD_CLASSES} placeholder:text-black/58`}
                />
              </div>
              <div className="flex h-[94px] w-full flex-col items-start gap-2.5 xl:flex-1">
                <label htmlFor="quote-email" className="font-body text-[16px] leading-[23px] text-black">
                  {content.emailLabel}
                </label>
                <input
                  id="quote-email"
                  name="email"
                  type="email"
                  required
                  placeholder={content.emailPlaceholder}
                  value={formData.email}
                  onChange={(event) => handleChange("email", event.target.value)}
                  className={`${FIELD_CLASSES} flex-1 placeholder:text-black/58`}
                />
              </div>
            </div>

            <div className="flex h-[94px] w-full flex-col items-start gap-2.5">
              <label htmlFor="quote-phone" className="font-body text-[16px] leading-[23px] text-black">
                {content.phoneLabel}
              </label>
              <input
                id="quote-phone"
                name="phone"
                type="tel"
                placeholder={content.phonePlaceholder}
                value={formData.phone}
                onChange={(event) => handleChange("phone", event.target.value)}
                // Figma's phone placeholder is a lighter rgba(0,0,0,0.41) vs.
                // the rgba(0,0,0,0.58) used on every other field — preserved
                // as-is for pixel fidelity, same as the odd column-gap in
                // ServicesGlimpse.
                className={`${FIELD_CLASSES} flex-1 placeholder:text-black/41`}
              />
            </div>

            <div className="flex h-[94px] w-full flex-col items-start gap-2.5">
              <label htmlFor="quote-service" className="font-body text-[16px] leading-[23px] text-black">
                {content.serviceLabel}
              </label>
              <div className="relative w-full flex-1">
                <select
                  id="quote-service"
                  name="service"
                  required
                  value={formData.service}
                  onChange={(event) => handleChange("service", event.target.value)}
                  className={`${FIELD_CLASSES} h-full appearance-none pr-12 ${formData.service === "" ? "text-black/58" : "text-black"}`}
                >
                  <option value="" disabled>
                    {content.servicePlaceholder}
                  </option>
                  {content.serviceOptions.map((option) => (
                    <option key={option} value={option} className="text-black">
                      {option}
                    </option>
                  ))}
                </select>
                <ChevronDown className="pointer-events-none absolute top-1/2 right-6 size-[24px] -translate-y-1/2 text-black" />
              </div>
            </div>

            <div className="flex h-[251px] w-full flex-col items-start gap-2.5">
              <label htmlFor="quote-project" className="font-body text-[16px] leading-[23px] text-black">
                {content.projectLabel}
              </label>
              <textarea
                id="quote-project"
                name="project"
                placeholder={content.projectPlaceholder}
                value={formData.project}
                onChange={(event) => handleChange("project", event.target.value)}
                className={`${FIELD_CLASSES} flex-1 resize-none placeholder:text-black/58`}
              />
            </div>

            <Button type="submit">{content.submitLabel}</Button>
          </form>
        )}
      </div>
    </section>
  );
}
