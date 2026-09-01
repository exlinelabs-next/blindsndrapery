"use client";

import { useState, type FormEvent } from "react";
import { ChevronDown, Phone, MessageCircle } from "lucide-react";
import { useContent } from "@/hooks/useContent";
import { Button } from "@/components/ui/Button";
import type { FreeQuoteFormContent } from "@/types/content";

const FIELD_CLASSES =
  "w-full rounded-lg border border-[#b3b6b9] px-6 py-4 text-[16px] leading-[23px] text-black placeholder:text-black/50 focus:border-teal focus:outline-none";

export function FreeQuoteForm({ content }: { content?: FreeQuoteFormContent }) {
  const {
    eyebrow,
    headingPrefix,
    headingHighlight,
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

  const [form, setForm] = useState({
    name: "",
    email: "",
    phone: "",
    service: "",
    message: "",
  });

  function handleSubmit(e: FormEvent) {
    e.preventDefault();
  }

  return (
    <section className="bg-ice px-4 pb-14 md:px-12 md:pb-16 xl:px-20 xl:pb-20">
      <div className="flex flex-col gap-10 rounded-lg bg-white p-6 md:p-12 xl:p-20">
        {/* Header */}
        <div className="flex flex-col items-center gap-4">
          <div className="flex items-center justify-center rounded-lg border border-[#dbdde2] p-2">
            <p className="whitespace-nowrap text-center font-mono text-[11px] leading-[16px] tracking-[1.1px] text-black uppercase">
              {eyebrow}
            </p>
          </div>
          <p className="text-center font-heading text-[28px] font-semibold leading-[36px] tracking-[-0.1296px] text-navy md:text-[36px] md:leading-[44px]">
            {headingPrefix}
            <span className="text-teal">{headingHighlight}</span>
          </p>
          <p className="text-center text-[16px] leading-[23px] text-black">
            {subtitle}
          </p>
        </div>

        {/* Form */}
        <form onSubmit={handleSubmit} className="flex flex-col gap-6">
          <div className="flex flex-col gap-6">
            {/* Name + Email row */}
            <div className="flex flex-col gap-6 xl:flex-row xl:gap-5">
              <div className="flex flex-1 flex-col gap-4">
                <label className="text-[16px] leading-[23px] text-black">
                  {nameLabel}
                </label>
                <input
                  type="text"
                  placeholder={namePlaceholder}
                  className={FIELD_CLASSES}
                  value={form.name}
                  onChange={(e) => setForm({ ...form, name: e.target.value })}
                />
              </div>
              <div className="flex flex-1 flex-col gap-4">
                <label className="text-[16px] leading-[23px] text-black">
                  {emailLabel}
                </label>
                <input
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
              <label className="text-[16px] leading-[23px] text-black">
                {phoneLabel}
              </label>
              <input
                type="tel"
                placeholder={phonePlaceholder}
                className={FIELD_CLASSES}
                value={form.phone}
                onChange={(e) => setForm({ ...form, phone: e.target.value })}
              />
            </div>

            {/* Service Interest */}
            <div className="flex flex-col gap-4">
              <label className="text-[16px] leading-[23px] text-black">
                {serviceLabel}
              </label>
              <div className="relative">
                <select
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
              <label className="text-[16px] leading-[23px] text-black">
                {projectLabel}
              </label>
              <textarea
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
            <Button type="submit">{submitLabel}</Button>
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
            <div className="flex w-full flex-col gap-4 md:flex-row md:gap-6">
              <a
                href={`tel:${callNumber.replace(/\s/g, "")}`}
                className="flex flex-1 items-center justify-center gap-3 rounded-lg bg-navy p-4"
              >
                <Phone className="size-6 text-white" />
                <span className="font-heading text-[18px] font-semibold leading-[27px] tracking-[-0.0648px] text-white">
                  {callLabel}
                </span>
                <span className="font-heading text-[18px] font-semibold leading-[27px] tracking-[-0.0648px] text-white">
                  {callNumber}
                </span>
              </a>
              <a
                href={`sms:${callNumber.replace(/\s/g, "")}`}
                className="flex flex-1 items-center justify-center gap-3 rounded-lg bg-navy p-4"
              >
                <MessageCircle className="size-6 text-white" />
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
    </section>
  );
}
