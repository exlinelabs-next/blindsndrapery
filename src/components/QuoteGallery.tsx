import Image from "next/image";
import { useContent } from "@/hooks/useContent";
import type { QuoteGalleryContent } from "@/types/content";

export function QuoteGallery({ content }: { content?: QuoteGalleryContent }) {
  const { quote, quoteIcon, images } = content ?? useContent("quoteGallery");
  const [topLeft, topRight, bottomLeft, bottomRight] = images;

  return (
    // Corrected 2026-08-16: quote-block-to-images gap steps 48/56/64px
    // (`gap-12 md:gap-14 xl:gap-16`), not a flat 40px. Unlike Testimonials,
    // this section's mobile/tablet Figma data is clean and fully usable —
    // it confirms a genuine single-column stack, image heights identical to
    // desktop (429/428px, not scaled down), and 12px gaps between stacked
    // images (not 8px).
    <section className="flex flex-col items-center gap-12 px-8 pb-16 pt-0 md:gap-14 xl:gap-16 xl:px-20 xl:pb-[100px] xl:pt-0">
      <div className="flex flex-col items-center gap-4">
        {/* Decorative mark above the quote — not a lucide icon, so it's
            rendered from the exported Figma vector rather than hand-drawn.
            Plain <img>, not next/image: Next's image optimizer rejects SVGs
            unless `images.dangerouslyAllowSVG` is set in next.config.ts,
            which this project doesn't enable. */}
        {/* TODO: temporary Figma asset URL, expires ~7 days — export and commit to public/images/home/gallery/ before then. */}
        {quoteIcon.src && (
          /* eslint-disable-next-line @next/next/no-img-element */
          <img src={quoteIcon.src} alt={quoteIcon.alt} className="size-8" aria-hidden={quoteIcon.alt === ""} />
        )}
        <p className="w-full max-w-[1043px] text-center font-heading text-[22px] font-semibold leading-[32px] tracking-[-0.0792px] text-navy">
          {quote}
        </p>
      </div>
      <div className="flex w-full flex-col gap-3">
        <div className="flex w-full flex-col items-start gap-3 xl:flex-row">
          <div className="relative h-[429px] w-full shrink-0 overflow-hidden rounded-lg xl:w-[515px]">
            {/* TODO: temporary Figma asset URL, expires ~7 days — export and commit to public/images/home/gallery/ before then. */}
            <Image src={topLeft.src} alt={topLeft.alt} fill sizes="(min-width: 1024px) 515px, 100vw" className="object-cover" />
            <div className="absolute inset-0 bg-black/15" />
          </div>
          <div className="relative h-[428px] w-full min-w-px overflow-hidden rounded-lg xl:flex-1">
            {/* TODO: temporary Figma asset URL, expires ~7 days — export and commit to public/images/home/gallery/ before then. */}
            <Image src={topRight.src} alt={topRight.alt} fill sizes="(min-width: 1024px) 757px, 100vw" className="object-cover" />
          </div>
        </div>
        <div className="flex w-full flex-col items-start gap-3 xl:flex-row">
          <div className="relative h-[428px] w-full shrink-0 overflow-hidden rounded-lg xl:w-[594px]">
            {/* TODO: temporary Figma asset URL, expires ~7 days — export and commit to public/images/home/gallery/ before then. */}
            <Image src={bottomLeft.src} alt={bottomLeft.alt} fill sizes="(min-width: 1024px) 594px, 100vw" className="object-cover" />
            <div className="absolute inset-0 bg-black/15" />
          </div>
          <div className="relative h-[429px] w-full min-w-px overflow-hidden rounded-lg xl:flex-1">
            {/* TODO: temporary Figma asset URL, expires ~7 days — export and commit to public/images/home/gallery/ before then. */}
            <Image src={bottomRight.src} alt={bottomRight.alt} fill sizes="(min-width: 1024px) 678px, 100vw" className="object-cover" />
            <div className="absolute inset-0 bg-black/15" />
          </div>
        </div>
      </div>
    </section>
  );
}
