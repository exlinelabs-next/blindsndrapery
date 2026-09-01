"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import Image from "next/image";
import { useContent } from "@/hooks/useContent";

import type { ServiceContentKey, ServiceTimelineContent } from "@/types/content";

export function ServiceTimeline({ contentKey = "serviceBlinds", content }: { contentKey?: ServiceContentKey; content?: ServiceTimelineContent } = {}) {
  const { images, steps } = content ?? useContent(contentKey).timeline;
  const [activeIndex, setActiveIndex] = useState(0);
  const stepRefs = useRef<(HTMLDivElement | null)[]>([]);

  const updateActive = useCallback(() => {
    const target = window.innerHeight * 0.4;
    let closest = 0;
    let closestDist = Infinity;

    stepRefs.current.forEach((el, i) => {
      if (!el) return;
      const rect = el.getBoundingClientRect();
      const center = rect.top + rect.height / 2;
      const dist = Math.abs(center - target);
      if (dist < closestDist) {
        closestDist = dist;
        closest = i;
      }
    });

    setActiveIndex(closest);
  }, []);

  useEffect(() => {
    updateActive();
    window.addEventListener("scroll", updateActive, { passive: true });
    return () => window.removeEventListener("scroll", updateActive);
  }, [updateActive]);

  return (
    <section className="flex flex-col items-center gap-10 px-4 pt-10 pb-14 md:px-12 md:pb-16 xl:flex-row xl:items-stretch xl:gap-10 xl:px-20 xl:pb-[100px]">
      {/* Photo — sticky on desktop so it stays visible while cards scroll.
          Height is left to flex's default stretch (matches the timeline
          list's natural height) rather than a viewport-relative calc, so it
          scales with actual content instead of the window's height. */}
      <div className="relative h-[419px] w-full shrink-0 overflow-hidden rounded-lg md:h-[600px] xl:sticky xl:top-[100px] xl:h-auto xl:flex-1">
        {(activeIndex < 2 ? images[0].src : images[1].src) && (
          <Image
            src={activeIndex < 2 ? images[0].src : images[1].src}
            alt={activeIndex < 2 ? images[0].alt : images[1].alt}
            fill
            className="object-cover transition-opacity duration-500"
          />
        )}
      </div>

      {/* Timeline */}
      <div className="relative flex w-full flex-col gap-[60px] py-0 xl:w-auto xl:shrink-0 xl:py-[80px]">
        {/* Continuous vertical divider */}
        <div className="absolute bottom-0 left-8 top-0 w-[2px] bg-navy/20" />

        {steps.map((step, i) => {
          const isActive = i === activeIndex;
          return (
            <div
              key={step.number}
              ref={(el) => { stepRefs.current[i] = el; }}
              className="flex w-full items-center gap-6 md:gap-16"
            >
              {/* Circle */}
              <div
                className="relative z-10 flex size-16 shrink-0 items-center justify-center rounded-full transition-colors duration-300"
                style={{ backgroundColor: isActive ? "#5f8f8b" : "#0f1e3c" }}
              >
                <p className="font-heading text-[18px] font-semibold leading-[27px] tracking-[-0.0648px] text-white">
                  {step.number}
                </p>
              </div>

              {/* Card */}
              <div
                className={`flex flex-1 flex-col items-start gap-4 rounded-2xl border-[0.5px] border-navy/30 px-6 py-8 transition-all duration-300 md:w-[520px] md:flex-none md:p-10 xl:w-[520px] ${
                  isActive
                    ? "bg-[#e7eeee] shadow-[0px_4px_17.2px_rgba(21,21,21,0.1)]"
                    : "bg-white shadow-[0px_4px_2.4px_rgba(0,0,0,0.05)]"
                }`}
              >
                <p className="w-full font-heading text-[24px] font-semibold leading-[32px] text-navy">
                  {step.title}
                </p>
                <p className="w-full text-[16px] leading-[23px] text-[#595959]">
                  {step.description}
                </p>
              </div>
            </div>
          );
        })}
      </div>

      {/* Decorative connectors between step cards — not content, so
          positioned/rendered directly rather than pulled from useContent.
          Centered on each card-to-card boundary (25% / 50% / 75% across
          the row), matching the fixed pixel offsets in the Figma source. */}
    </section>
  );
}
