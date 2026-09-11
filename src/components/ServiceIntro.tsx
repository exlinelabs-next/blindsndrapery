import Image from "next/image";
import { useContent } from "@/hooks/useContent";
import { RichText } from "@/components/ui/RichText";
import type { ServiceContentKey, ServiceIntroContent } from "@/types/content";

// Confirmed via get_design_context on the desktop (4481:4451/4463), tablet
// (4481:4726) and mobile (4481:5017) frames — these are NOT the same layout
// scaled down. Tablet/mobile stack image-then-card (reversed from desktop's
// card-then-image, reproduced here with `order-*` rather than reordering the
// DOM, since the image should still lead visually when stacked) and drop the
// "about" eyebrow badge entirely — only the desktop card has one. The image
// is a fixed 559px tall at every breakpoint (not scaled down), while the
// card's own height is fixed to match it only at desktop; at tablet/mobile
// the card is auto-height and its padding differs at every breakpoint
// (mobile: px-16 py-56, tablet: p-56, desktop: px-64 py-56 — not one value
// scaled three ways). Section side padding is also confirmed per breakpoint
// from those same frames: 32px mobile, 48px tablet, 80px desktop.
export function ServiceIntro({ contentKey = "serviceBlinds", content }: { contentKey?: ServiceContentKey; content?: ServiceIntroContent } = {}) {
  const { eyebrow, headingSegments, paragraphs, image } =
    content ?? useContent(contentKey).intro;

  return (
    // Confirmed spacing at desktop: the Figma parent frame wraps the hero
    // and this section in a flex-col with a 64px gap between them, then
    // 100px of padding below this section before whatever comes next — not
    // padding this section's own box, so it has to be reproduced here
    // instead. No tablet/mobile source for that specific outer gap, so
    // those breakpoints scale it down proportionally rather than being
    // confirmed.
    <section className="flex flex-col items-center gap-4 px-8 pt-10 pb-14 md:px-12 md:pt-12 md:pb-16 xl:grid xl:grid-cols-2 xl:items-center xl:gap-4 xl:px-20 xl:pt-16 xl:pb-[100px]">
      <div className="relative h-[559px] w-full overflow-hidden rounded-lg xl:order-2">
        <Image src={image.src} alt={image.alt} fill className="object-cover" />
      </div>
      <div className="flex w-full flex-col items-start gap-4 overflow-hidden rounded-lg bg-ice px-4 py-14 md:p-14 xl:order-1 xl:h-[559px] xl:px-16 xl:py-14">
        <div className="hidden items-center justify-center rounded-lg border border-navy-light-hover p-2 xl:flex">
          <p className="whitespace-nowrap text-center font-mono text-[11px] leading-[16px] tracking-[1.1px] text-black uppercase">
            {eyebrow}
          </p>
        </div>
        <h2 className="w-full font-heading text-[28px] font-semibold leading-[42px] text-navy">
          {headingSegments.map((seg, i) => (
            <span key={i} className={seg.emphasis ? "text-teal" : undefined}>
              {seg.text}
            </span>
          ))}
        </h2>
        <div className="flex w-full flex-col gap-4 text-[16px] leading-[23px] text-black/64">
          <RichText paragraphs={paragraphs} />
        </div>
      </div>
    </section>
  );
}
