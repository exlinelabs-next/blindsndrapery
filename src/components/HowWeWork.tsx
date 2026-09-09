import Image from "next/image";
import { ArrowDown, ArrowRight, Ruler, type LucideIcon } from "lucide-react";
import { useContent } from "@/hooks/useContent";
import { Button } from "@/components/ui/Button";
import type { HowItWorksContent } from "@/types/content";

// Maps the content-driven `icon` name (a lucide-react export name) to the
// actual component, same pattern as TrustBadges. Note: the Figma source
// names every step's icon layer "lucide/weight-tilde", which isn't a real
// Lucide icon and (per the design) is reused identically across all four
// step cards. Ruler is the closest semantic match for a
// measurement/estimate glyph, so it's used here for every step to mirror
// the design's literal (if seemingly unfinished) icon reuse.
const icons: Record<string, LucideIcon> = {
  Ruler,
};

// No "use client" here on purpose: this section has no state or event
// handlers, so per the project's server-first rule it stays a plain Server
// Component — renders on the server, ships no extra JS to the browser.
export function HowWeWork({ content }: { content?: HowItWorksContent }) {
  const { eyebrow, headingPrefix, headingHighlight, description, steps, ctaLabel, ctaHref } =
    content ?? useContent("howItWorks");

  return (
    // Padding here jumps straight to the desktop 80px inset at `md` (not the
    // usual 48px tablet step used elsewhere) — confirmed directly from the
    // tablet frame's own coordinates (content x=80 within a 768-wide frame).
    <section className="bg-navy px-8 py-14 md:px-20 md:py-16 xl:py-[100px]">
      <div className="mx-auto flex w-full max-w-[1280px] flex-col items-center gap-10 md:gap-14 xl:gap-16">
        <div className="flex w-full flex-col items-center gap-4">
          <div className="flex items-center justify-center rounded-lg border border-navy-light-active p-2">
            <p className="whitespace-nowrap text-center font-mono text-[11px] leading-[16px] tracking-[1.1px] text-white">
              {eyebrow}
            </p>
          </div>
          <div className="flex w-full flex-col items-center gap-4">
            <h2 className="w-full text-center font-heading text-[36px] font-semibold leading-[44px] tracking-[-0.1296px] text-white">
              {headingPrefix}
              <span className="text-teal">{headingHighlight}</span>
            </h2>
            <p className="mx-auto w-full max-w-[1020px] text-center text-[16px] leading-[23px] text-white">
              {description}
            </p>
          </div>
        </div>

        {/* Confirmed tablet (2806:1642) and mobile (2810:2365) frames stack
            the step cards vertically instead of the desktop row, so the
            connector arrows (a row-only affordance) are desktop-only too.
            Stacked-card gap is 8px on both confirmed frames, not 16. */}
        <div className="relative flex w-full max-w-[1056px] flex-col items-stretch gap-2 xl:flex-row xl:items-center">
          {steps.map(({ stepLabel, icon, title, description: stepDescription }, i) => {
            const Icon = icons[icon];
            const isUrl = icon.startsWith("http");
            return (
              <div key={stepLabel} className="relative xl:flex-1">
                <div className="flex w-full flex-col items-start gap-4 overflow-clip rounded-lg bg-white/10 p-6 md:h-[196px] md:flex-row md:items-start md:justify-between md:gap-0 xl:h-[316px] xl:flex-col xl:justify-between">
                  <p className="text-[16px] leading-[23px] text-[#e6f8f6]">{stepLabel}</p>
                  <div className="flex w-full flex-col items-start gap-2 md:w-[399px] xl:w-full">
                    {isUrl ? (
                      <Image src={icon} alt="" width={32} height={32} className="size-8" />
                    ) : (
                      Icon && <Icon className="size-8 text-white" strokeWidth={1.5} />
                    )}
                    <div className="flex w-full flex-col items-start gap-2 text-white">
                      <p className="w-full font-heading text-[18px] font-semibold leading-[27px] tracking-[-0.0648px]">
                        {title}
                      </p>
                      <p className="w-full text-[16px] leading-[23px] xl:h-[74px]">{stepDescription}</p>
                    </div>
                  </div>
                </div>
                {i < steps.length - 1 && (
                  <div className="absolute -bottom-1 left-1/2 z-10 -translate-x-1/2 translate-y-1/2 xl:hidden">
                    <div className="flex size-10 items-center justify-center rounded-full bg-white">
                      <div className="flex size-8 items-center justify-center rounded-[24px] bg-teal">
                        <ArrowDown className="size-6 text-white" strokeWidth={2} />
                      </div>
                    </div>
                  </div>
                )}
              </div>
            );
          })}

          {/* Decorative connectors between step cards — not content, so
              positioned/rendered directly rather than pulled from useContent.
              Centered on each card-to-card boundary (25% / 50% / 75% across
              the row), matching the fixed pixel offsets in the Figma source. */}
          {steps.slice(0, -1).map((_, index) => (
            <div
              key={`connector-${index}`}
              className="absolute top-[80px] hidden size-8 -translate-x-1/2 items-center justify-center rounded-full bg-white xl:flex"
              style={{ left: `${((index + 1) / steps.length) * 100}%` }}
            >
              <div className="flex size-5 items-center justify-center rounded-full bg-teal">
                <ArrowRight className="size-4 text-white" strokeWidth={2} />
              </div>
            </div>
          ))}
        </div>

        <Button href={ctaHref}>{ctaLabel}</Button>
      </div>
    </section>
  );
}
