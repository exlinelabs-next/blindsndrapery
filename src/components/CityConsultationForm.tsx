"use client";

import { useState, type FormEvent } from "react";
import { ChevronDown } from "lucide-react";
import { useContent } from "@/hooks/useContent";
import { Button } from "@/components/ui/Button";

const FIELD_CLASSES =
  "w-full rounded-lg border border-ice-dark px-6 py-4 text-[16px] leading-[23px] text-black placeholder:text-black/50 focus:border-teal focus:outline-none";

export function CityConsultationForm() {
  const { eyebrow, heading, description, ctaLabel } = useContent("cityPage").consultation;
  const [form, setForm] = useState({ name: "", email: "", phone: "", service: "", message: "" });

  function handleSubmit(e: FormEvent) {
    e.preventDefault();
  }

  return (
    <section className="bg-ice px-4 py-14 md:px-12 md:py-16 xl:p-20">
      <div className="flex flex-col gap-8 xl:flex-row xl:gap-8">
        {/* Info panel */}
        <div className="flex flex-col items-start gap-4 rounded-lg bg-navy p-10 md:p-16 xl:w-[584px] xl:shrink-0 xl:justify-center">
          <div className="flex items-center justify-center rounded-lg border border-navy-light-active p-2">
            <p className="whitespace-nowrap text-center font-mono text-[11px] uppercase leading-[16px] tracking-[1.1px] text-white">
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
          <div className="flex flex-col gap-5">
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

          <Button type="submit">{ctaLabel}</Button>
        </form>
      </div>
    </section>
  );
}
