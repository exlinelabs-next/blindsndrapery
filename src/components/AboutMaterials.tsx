import Image from "next/image";
import { useContent } from "@/hooks/useContent";

// No "use client" here on purpose: no state or event handlers, so per the
// project's server-first rule this stays a plain Server Component.
//
// Eyebrow + 3-segment heading + a rich paragraph (one inline highlighted
// phrase mid-sentence, not a prefix/highlight/suffix split) + a 4-item
// feature checklist, alongside a 3-photo gallery — stacked below xl, side
// by side at xl (text w-[518px], gallery filling the rest). Confirmed via
// get_design_context on "Desktop Service Inline 2" node 2721:1635 (desktop)
// and the tablet/mobile "Frame 9" equivalents on "Service Inline 1" (layout
// only — see ServiceInlineHero.tsx and project memory for why content comes
// from Inline 2 but layout/spacing is borrowed from Inline 1's responsive
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
    paragraphPrefix,
    paragraphHighlight,
    paragraphSuffix,
    features,
    gallery,
  } = content ?? useContent(contentKey).about;

  return (
    <section
      className={`flex flex-col gap-16 px-8 pt-[100px] pb-14 md:px-12 md:pb-16 xl:flex-row xl:items-start xl:px-20 xl:py-[100px] ${
        dark ? "bg-navy" : ""
      }`}
    >
      <div className="flex w-full flex-col items-start gap-4 xl:w-[518px] xl:shrink-0">
        <div className={`flex items-center justify-center rounded-lg border p-2 ${dark ? "border-navy-light-hover" : "border-navy-light-hover"}`}>
          <p className={`whitespace-nowrap font-mono text-[11px] leading-[16px] tracking-[1.1px] uppercase ${dark ? "text-white" : "text-black"}`}>
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
            <p className={`w-full text-[16px] leading-[23px] ${dark ? "text-white" : "text-black"}`}>
              {paragraphPrefix}
              <span className="font-heading text-[18px] font-semibold leading-[27px] tracking-[-0.0648px] text-[#3b5a58]">
                {paragraphHighlight}
              </span>
              {paragraphSuffix}
            </p>
          </div>
          <div className="flex w-full flex-col items-start gap-4">
            {features.map((feature, i) => (
              <div key={i} className={`flex w-full items-center justify-center border-b pb-3 ${dark ? "border-white/28" : "border-black/28"}`}>
                <p className={`flex-1 text-[16px] leading-[23px] ${dark ? "text-white/76" : "text-black/49"}`}>{feature}</p>
              </div>
            ))}
          </div>
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
