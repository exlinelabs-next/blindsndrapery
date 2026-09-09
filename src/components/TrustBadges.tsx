"use client";

import Image from "next/image";
import { useContent } from "@/hooks/useContent";
import type { TrustBadgesContent } from "@/types/content";

export function TrustBadges({ content }: { content?: TrustBadgesContent }) {
  const { items } = content ?? useContent("trustBadges");

  return (
    <section className="bg-navy px-12 py-14 xl:px-20">
      {/* Desktop: static row */}
      <div className="hidden items-center justify-between xl:flex">
        {items.map(({ icon, label }) => (
          <div key={label} className="flex items-center gap-1">
            {icon && (
              <Image src={icon} alt="" width={24} height={24} className="size-6 shrink-0" />
            )}
            <p className="whitespace-nowrap font-heading text-[15px] font-semibold leading-[27.2px] tracking-[0.56px] text-[#e6f8f6]">
              {label}
            </p>
          </div>
        ))}
      </div>

      {/* Mobile/Tablet: auto-scrolling marquee */}
      <div className="overflow-hidden xl:hidden" aria-hidden="true">
        <div className="flex w-max animate-marquee items-center gap-6">
          {[...items, ...items].map(({ icon, label }, i) => (
            <div key={`${label}-${i}`} className="flex shrink-0 items-center gap-1">
              {icon && (
                <Image src={icon} alt="" width={24} height={24} className="size-6 shrink-0" />
              )}
              <p className="whitespace-nowrap font-heading text-[15px] font-semibold leading-[27.2px] tracking-[0.56px] text-[#e6f8f6]">
                {label}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
