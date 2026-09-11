"use client";

import { useState } from "react";
import Image from "next/image";
import { Plus } from "lucide-react";
import { useContent } from "@/hooks/useContent";

// Eyebrow + 3-segment heading + a rich paragraph (one inline highlighted
// phrase mid-sentence, not a prefix/highlight/suffix split) + a materials
// expand/collapse accordion (Figma node 4573:8519 — "Faux Wood +",
// "Aluminium +", "Vertical +", each revealing a description on click),
// alongside a 3-photo gallery — stacked below xl, side by side at xl (text
// w-[518px], gallery filling the rest). Confirmed via get_design_context on
// "Desktop Service Inline 2" node 2721:1635 (desktop) and the
// tablet/mobile "Frame 9" equivalents on "Service Inline 1" (layout only —
// see ServiceInlineHero.tsx and project memory for why content comes from
// Inline 2 but layout/spacing is borrowed from Inline 1's responsive
// frames).
//
// Gallery images have no corner rounding in the Figma source (unlike most
// other photo blocks in this project) — reproduced exactly, not "fixed" to
// match the usual rounded-lg pattern elsewhere. The first image alone
// carries a 12%-black overlay in the confirmed desktop source; kept on all
// breakpoints as a content-level styling choice (no evidence either way for
// tablet/mobile, since those frames come from a different page instance).
import type { ServiceContentKey, ServiceInlineAboutContent } from "@/types/content";

export function AboutMaterials({ dark = false, contentKey = "serviceBlinds", content }: { dark?: boolean; contentKey?: ServiceContentKey; content?: ServiceInlineAboutContent } = {}) {
  const {
    eyebrow,
    headingPrefix,
    headingHighlight,
    headingSuffix,
    paragraphs,
    features,
    gallery,
  } = content ?? useContent(contentKey).about;
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  // WP genuinely has no content for this section on some service pages
  // (e.g. /services/shades — section2Heading and friends all come back
  // null), which without this guard rendered a ~700px blank section
  // between SubServicesGrid and the timeline. Same "return null instead
  // of an empty shell" pattern as BlogCard above. Extended to also cover
  // the description and gallery, since a heading with no paragraph or no
  // photos at all is just as much an empty shell as no heading.
  const hasTitle = Boolean(headingPrefix || headingHighlight);
  const hasDescription = paragraphs.some((p) => p.prefix || p.highlight || p.suffix);
  const hasGallery = gallery.some((image) => image.src);
  if (!hasTitle || !hasDescription || !hasGallery) return null;

  // Some pages have the heading/paragraph/gallery but no materials text at
  // all (e.g. /services/shades/cellular-shades, /services/shades/zebra-shades
  // both come back with 0 chars for section2MaterielsText) — rather than
  // render an empty accordion shell with nothing inside it, just omit the
  // accordion for those pages and keep the rest of the section.
  const hasFeatures = features.length > 0;

  return (
    <section
      className={`flex flex-col gap-16 px-8 pt-[100px] pb-14 md:px-12 md:pb-16 xl:flex-row xl:items-start xl:px-20 xl:py-[100px] ${
        dark ? "bg-navy" : ""
      }`}
    >
      <div className="flex w-full flex-col items-start gap-4 xl:w-[518px] xl:shrink-0">
        <div className={`flex items-center justify-center rounded-lg border p-2 ${dark ? "border-navy-light-hover" : "border-navy-light-hover"}`}>
          <p className={`whitespace-nowrap font-mono text-[11px] leading-[16px] tracking-[1.1px] ${dark ? "text-white" : "text-black"}`}>
            {eyebrow}
          </p>
        </div>
        <div className="flex w-full flex-col items-start gap-10">
          <div className="flex w-full flex-col items-start gap-4">
            <h2 className={`w-full font-heading text-[36px] font-semibold leading-[44px] tracking-[-0.1296px] ${dark ? "text-white" : "text-navy"}`}>
              {headingPrefix}
              <span className="text-teal">{headingHighlight}</span>
              {headingSuffix}
            </h2>
            {paragraphs.map((paragraph, i) => (
              <p key={i} className={`w-full text-[16px] leading-[23px] ${dark ? "text-white" : "text-black"}`}>
                {paragraph.prefix}
                {paragraph.highlight && (
                  <span className="font-heading text-[18px] font-semibold leading-[27px] tracking-[-0.0648px] text-[#3b5a58]">
                    {paragraph.highlight}
                  </span>
                )}
                {paragraph.suffix}
              </p>
            ))}
          </div>
          {hasFeatures && (
            <div className="flex w-full flex-col items-start">
              {features.map((feature, i) => {
                const isOpen = openIndex === i;
                return (
                  <div key={feature.title} className={`w-full border-b ${dark ? "border-white/28" : "border-black/28"}`}>
                    <button
                      type="button"
                      onClick={() => setOpenIndex(isOpen ? null : i)}
                      aria-expanded={isOpen}
                      className="flex w-full items-center justify-between gap-4 py-3 text-left"
                    >
                      <span className={`text-[16px] leading-[23px] ${dark ? "text-white" : "text-black"}`}>{feature.title}</span>
                      <Plus className={`size-4 shrink-0 transition-transform duration-200 ${isOpen ? "rotate-45" : ""} ${dark ? "text-white" : "text-black"}`} />
                    </button>
                    {isOpen && feature.description && (
                      <p className={`pb-4 text-[15px] leading-[22px] ${dark ? "text-white/76" : "text-black/64"}`}>{feature.description}</p>
                    )}
                  </div>
                );
              })}
            </div>
          )}
        </div>
      </div>
      <div className="flex w-full flex-col items-start gap-2 md:flex-row md:items-center xl:h-[501px] xl:pt-12">
        <div className="relative h-[294px] w-full shrink-0 overflow-hidden rounded-[4px] md:h-[452px] md:flex-1 xl:h-[453px]">
          {gallery[0].src && <Image src={gallery[0].src} alt={gallery[0].alt} fill className="object-cover" />}
          <div className="absolute inset-0 bg-black/12" />
        </div>
        <div className="relative h-[295px] w-full shrink-0 overflow-hidden rounded-[4px] md:h-[452px] md:flex-1 xl:h-[453px]">
          {gallery[1].src && <Image src={gallery[1].src} alt={gallery[1].alt} fill className="object-cover" />}
        </div>
        <div className="relative h-[294px] w-full shrink-0 overflow-hidden rounded-[4px] md:h-[452px] md:flex-1 xl:h-[453px]">
          {gallery[2].src && <Image src={gallery[2].src} alt={gallery[2].alt} fill className="object-cover" />}
        </div>
      </div>
    </section>
  );
}
