import Image from "next/image";
import { useContent } from "@/hooks/useContent";

// No "use client" here on purpose: no state or event handlers, so per the
// project's server-first rule this stays a plain Server Component.
//
// Eyebrow + centered heading + paragraph, above a 3-image row. Confirmed via
// get_design_context on "Desktop Commercial" node 2220:843's "Frame 143"
// (desktop) plus this page's own confirmed Tablet/Mobile frames.
//
// The image row genuinely changes shape at every breakpoint, not just
// scale — reproduced exactly rather than picking one pattern and stretching
// it across breakpoints:
//  - Desktop: row layout, asymmetric heights (332/385/332px — the middle
//    photo is deliberately taller, a real confirmed design detail).
//  - Tablet: still a row, but all 3 photos share one flat 332px height (the
//    desktop's asymmetry doesn't carry over).
//  - Mobile: stacks to a single column (269/270/269px — a 1px rounding
//    difference between photos in the source, not meaningful, reproduced
//    as one flat 270px rather than three near-identical hardcoded values).
export function InstallationGallery() {
  const { eyebrow, headingPrefix, headingHighlight, headingSuffix, description, images } =
    useContent("commercialPage").installation;

  return (
    <section className="flex flex-col items-center gap-6 px-8 pb-14 md:px-12 md:pb-16 xl:gap-16 xl:px-20 xl:pb-[100px]">
      <div className="flex w-full flex-col items-center gap-4 xl:w-[912px]">
        <div className="flex items-center justify-center rounded-lg border border-navy-light-hover p-2">
          <p className="whitespace-nowrap text-center font-mono text-[11px] leading-[16px] tracking-[1.1px] text-black uppercase">
            {eyebrow}
          </p>
        </div>
        <p className="w-full text-center font-heading text-[36px] font-semibold leading-[44px] tracking-[-0.1296px] text-navy">
          {headingPrefix}
          <span className="text-teal">{headingHighlight}</span>
          {headingSuffix}
        </p>
        <p className="w-full text-center text-[16px] leading-[23px] text-black">{description}</p>
      </div>

      <div className="flex w-full flex-col gap-2 xl:w-[1170px] xl:flex-row xl:items-center">
        {images.map((image, i) => (
          <div
            key={image.src}
            className={`relative h-[270px] w-full shrink-0 overflow-hidden rounded-lg md:h-[332px] xl:flex-1 ${
              i === 1 ? "xl:h-[385px]" : "xl:h-[332px]"
            }`}
          >
            <Image src={image.src} alt={image.alt} fill className="object-cover" />
          </div>
        ))}
      </div>
    </section>
  );
}
