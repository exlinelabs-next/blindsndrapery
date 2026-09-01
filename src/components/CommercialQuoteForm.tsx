"use client";

import { useState, type FormEvent } from "react";
import { ChevronDown, FileUp } from "lucide-react";
import { useContent } from "@/hooks/useContent";
import { Button } from "@/components/ui/Button";
import type { CommercialQuoteFormContent } from "@/types/content";

interface FormState {
  companyName: string;
  contactName: string;
  email: string;
  phone: string;
  projectType: string;
  location: string;
  message: string;
}

const INITIAL_STATE: FormState = {
  companyName: "",
  contactName: "",
  email: "",
  phone: "",
  projectType: "",
  location: "",
  message: "",
};

// Same shared field-chrome idiom as the homepage's QuoteForm, but this
// page's own confirmed field heights are 56px (Company/Contact/Location) or
// 61px (Email/Phone/Project Type) — an odd, but consistently confirmed
// (identical across desktop/tablet/mobile) split, not a rounding glitch —
// reproduced exactly per-field below rather than normalized to one height.
const FIELD_CLASSES =
  "w-full rounded-[8px] border border-ice-dark px-6 py-4 font-body text-[16px] leading-[23px] text-black focus:border-teal focus:outline-none";

// Deliberately NOT reusing the homepage's <QuoteForm>: this is a genuinely
// different form (company/contact fields instead of a single name, a
// Project Type + Location pair, a file upload dropzone for architectural
// drawings) on its own "/commercial" page, confirmed via get_design_context
// on "Desktop Commercial" node 2220:843's quote-form section (2872:2395) —
// not a copy-paste of the existing form, a distinct one.
//
// Field pairing is the one place this form's responsive behavior differs
// from QuoteForm's: there, Name+Email pair at desktop only. Here, BOTH
// Company Name+Contact Name AND Email+Phone pair side-by-side at desktop
// only — every field is a full-width single column below `xl`, confirmed
// on both the tablet and mobile frames (their Company/Contact and
// Email/Phone rows are wrapped in one shared flex-col parent, not two
// separate row wrappers like desktop's).
//
// Two fields — Location and Project Scope & Message — render as empty
// bordered boxes with no placeholder text in the Figma source at any
// breakpoint (every other field has one). Their placeholders here are
// inferred, flagged in mock.ts. The Project Type dropdown's resting display
// text "Commercial" is treated as this field's placeholder (styled
// identically to every other field's gray placeholder in the source) with
// real selectable options inferred from this page's own "places" cards,
// since Figma doesn't specify a real options list.
export function CommercialQuoteForm({ content: contentProp }: { content?: CommercialQuoteFormContent }) {
  const content = contentProp ?? useContent("commercialPage").quoteForm;
  const [formData, setFormData] = useState<FormState>(INITIAL_STATE);
  const [fileName, setFileName] = useState<string | null>(null);
  const [submitted, setSubmitted] = useState(false);

  function handleChange<K extends keyof FormState>(field: K, value: string) {
    setFormData((prev) => ({ ...prev, [field]: value }));
  }

  function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    // TODO: wire to real submission endpoint (incl. the uploaded file) once one exists.
    console.log("TODO: wire to real submission endpoint", formData, fileName);
    setSubmitted(true);
  }

  return (
    <section className="bg-navy flex flex-col items-center gap-10 px-4 py-14 md:px-12 xl:gap-16 xl:px-20 xl:py-[100px]">
      <div className="flex items-center justify-center rounded-lg border border-navy-light-active p-2">
        <p className="whitespace-nowrap text-center font-mono text-[11px] leading-[16px] tracking-[1.1px] text-white uppercase">
          {content.eyebrow}
        </p>
      </div>

      <div className="flex w-full flex-col items-start gap-10 rounded-lg bg-white px-4 py-10 md:px-12 xl:w-[1000px] xl:px-20">
        {submitted ? (
          <div className="flex w-full flex-col items-center gap-2 rounded-[8px] border border-teal bg-teal-hover p-6 text-center">
            <p className="font-body text-[16px] leading-[23px] text-navy">{content.successMessage}</p>
          </div>
        ) : (
          <>
            <div className="flex w-full flex-col items-center gap-2 text-center text-navy">
              <p className="w-full font-heading text-[36px] font-semibold leading-[44px] tracking-[-0.1296px]">{content.heading}</p>
              <p className="w-full text-[16px] leading-[23px] text-black">{content.description}</p>
            </div>

            <form onSubmit={handleSubmit} className="flex w-full flex-col items-start gap-5">
              <div className="flex w-full flex-col items-start gap-5 xl:flex-row">
                <div className="flex w-full flex-col items-start gap-2 xl:flex-1">
                  <label htmlFor="commercial-company" className="font-body text-[16px] leading-[23px] text-navy">
                    {content.companyNameLabel}
                  </label>
                  <input
                    id="commercial-company"
                    name="companyName"
                    type="text"
                    required
                    placeholder={content.companyNamePlaceholder}
                    value={formData.companyName}
                    onChange={(event) => handleChange("companyName", event.target.value)}
                    className={`${FIELD_CLASSES} h-[56px] placeholder:text-black/58`}
                  />
                </div>
                <div className="flex w-full flex-col items-start gap-2 xl:flex-1">
                  <label htmlFor="commercial-contact" className="font-body text-[16px] leading-[23px] text-navy">
                    {content.contactNameLabel}
                  </label>
                  <input
                    id="commercial-contact"
                    name="contactName"
                    type="text"
                    required
                    placeholder={content.contactNamePlaceholder}
                    value={formData.contactName}
                    onChange={(event) => handleChange("contactName", event.target.value)}
                    className={`${FIELD_CLASSES} h-[56px] placeholder:text-black/58`}
                  />
                </div>
              </div>

              <div className="flex w-full flex-col items-start gap-5 xl:flex-row">
                <div className="flex w-full flex-col items-start gap-2 xl:flex-1">
                  <label htmlFor="commercial-email" className="font-body text-[16px] leading-[23px] text-navy">
                    {content.emailLabel}
                  </label>
                  <input
                    id="commercial-email"
                    name="email"
                    type="email"
                    required
                    placeholder={content.emailPlaceholder}
                    value={formData.email}
                    onChange={(event) => handleChange("email", event.target.value)}
                    className={`${FIELD_CLASSES} h-[61px] placeholder:text-black/58`}
                  />
                </div>
                <div className="flex w-full flex-col items-start gap-2 xl:flex-1">
                  <label htmlFor="commercial-phone" className="font-body text-[16px] leading-[23px] text-navy">
                    {content.phoneLabel}
                  </label>
                  <input
                    id="commercial-phone"
                    name="phone"
                    type="tel"
                    placeholder={content.phonePlaceholder}
                    value={formData.phone}
                    onChange={(event) => handleChange("phone", event.target.value)}
                    // Matches the homepage QuoteForm's own phone field: a lighter
                    // rgba(0,0,0,0.41) placeholder vs. the rgba(0,0,0,0.58) used
                    // on every other field — preserved for pixel fidelity.
                    className={`${FIELD_CLASSES} h-[61px] placeholder:text-black/41`}
                  />
                </div>
              </div>

              <div className="flex w-full flex-col items-start gap-2">
                <label htmlFor="commercial-project-type" className="font-body text-[16px] leading-[23px] text-navy">
                  {content.projectTypeLabel}
                </label>
                <div className="relative w-full">
                  <select
                    id="commercial-project-type"
                    name="projectType"
                    required
                    value={formData.projectType}
                    onChange={(event) => handleChange("projectType", event.target.value)}
                    className={`${FIELD_CLASSES} h-[61px] appearance-none pr-12 ${formData.projectType === "" ? "text-black/58" : "text-black"}`}
                  >
                    <option value="" disabled>
                      {content.projectTypePlaceholder}
                    </option>
                    {content.projectTypeOptions.map((option) => (
                      <option key={option} value={option} className="text-black">
                        {option}
                      </option>
                    ))}
                  </select>
                  <ChevronDown className="pointer-events-none absolute top-1/2 right-6 size-[24px] -translate-y-1/2 text-black" />
                </div>
              </div>

              <div className="flex w-full flex-col items-start gap-2">
                <label htmlFor="commercial-location" className="font-body text-[16px] leading-[23px] text-navy">
                  {content.locationLabel}
                </label>
                <input
                  id="commercial-location"
                  name="location"
                  type="text"
                  placeholder={content.locationPlaceholder}
                  value={formData.location}
                  onChange={(event) => handleChange("location", event.target.value)}
                  className={`${FIELD_CLASSES} h-[56px] placeholder:text-black/58`}
                />
              </div>

              <div className="flex w-full flex-col items-start gap-2">
                <label htmlFor="commercial-message" className="font-body text-[16px] leading-[23px] text-navy">
                  {content.messageLabel}
                </label>
                <textarea
                  id="commercial-message"
                  name="message"
                  placeholder={content.messagePlaceholder}
                  value={formData.message}
                  onChange={(event) => handleChange("message", event.target.value)}
                  className={`${FIELD_CLASSES} h-[178px] resize-none placeholder:text-black/58`}
                />
              </div>

              <label
                htmlFor="commercial-upload"
                className="flex w-full cursor-pointer flex-col items-center justify-center gap-3 rounded-[8px] border border-ice-dark px-4 py-12 text-center md:px-[100px]"
              >
                <FileUp className="size-8 text-[#6b6d6f]" strokeWidth={1.5} />
                <div className="flex flex-col items-center gap-1">
                  <p className="text-[16px] leading-[23px] text-[#6b6d6f]">{fileName ?? content.uploadPrompt}</p>
                  <p className="text-[16px] leading-[23px] text-[#6b6d6f]">{content.uploadHint}</p>
                </div>
                <input
                  id="commercial-upload"
                  name="file"
                  type="file"
                  accept=".pdf,.dwg,.jpg,.jpeg"
                  className="sr-only"
                  onChange={(event) => setFileName(event.target.files?.[0]?.name ?? null)}
                />
              </label>

              <Button type="submit">{content.submitLabel}</Button>
            </form>
          </>
        )}
      </div>
    </section>
  );
}
