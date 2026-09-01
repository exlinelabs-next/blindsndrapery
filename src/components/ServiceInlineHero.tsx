import Image from "next/image";
import { useContent } from "@/hooks/useContent";

// No "use client" here on purpose: no state or event handlers, so per the
// project's server-first rule this stays a plain Server Component.
//
// A different Hero pattern from the shared homepage/`/services` Hero (that
// one overlays white heading text directly on the photo). Here the photo is
// its own block with only the breadcrumb pill floating over it; the heading
// and subheading sit BELOW the photo in navy text. Confirmed via
// get_design_context on "Desktop Service Inline 2" node 2721:1622's
// "Frame 470" (desktop) and the tablet/mobile "Frame 176" equivalents on
// "Service Inline 1" (2721:1622 has no tablet/mobile of its own — see
// project memory for why those frames are a safe structural reference).
//
// The Figma frame reserves a 108px (desktop) / 100px (tablet & mobile) gap
// above the photo for an embedded copy of the nav bar baked into the
// mockup — not reproduced here, since the real <Header> already renders
// once above this component via layout.tsx; adding the gap again would
// double the spacing. The breadcrumb pill's Figma offset (top: 329px) was
// measured relative to that now-removed gap, so instead of copying the raw
// pixel value forward (it wouldn't land in the same place), the pill is
// re-centered here via flexbox, matching where it visually sits over the
// photo either way.
//
// Heading/subheading padding: the desktop frame only wraps the heading in
// its own 80px-padding container (the subheading sibling has none, relying
// on its own full-bleed width + text-center to land in the same place);
// tablet/mobile wrap both in one shared padded container. Both produce the
// identical rendered result for this content (short, centered text well
// inside the padding either way), so this component uses one shared padded
// wrapper at every breakpoint rather than splitting structure needlessly.
import type { ServiceContentKey, ServiceInlineHeroContent } from "@/types/content";

export function ServiceInlineHero({ contentKey = "serviceBlinds", content }: { contentKey?: ServiceContentKey; content?: ServiceInlineHeroContent } = {}) {
  const { breadcrumb, heading, subheading, backgroundImage } = content ?? useContent(contentKey).hero;

  return (
    <section className="flex flex-col items-center gap-10 pb-14 md:pb-16 xl:gap-16 xl:pb-[100px]">
      <div className="relative h-[490px] w-full shrink-0 overflow-hidden xl:h-[482px]">
        {backgroundImage.src && <Image src={backgroundImage.src} alt={backgroundImage.alt} fill priority className="object-cover" />}
        {/* Exact gradient from the Figma node: transparent to rgba(44,40,53,0.8) */}
        <div
          className="absolute inset-0"
          style={{
            backgroundImage: "linear-gradient(180deg, rgba(0, 0, 0, 0) 6.8%, rgba(44, 40, 53, 0.8) 100%)",
          }}
        />
        <div className="absolute inset-0 flex items-center justify-center">
          <div className="flex items-center justify-center rounded-lg bg-[#e7e9ec] p-3 backdrop-blur-[25px]">
            <p className="whitespace-nowrap text-center font-mono text-[11px] leading-[16px] tracking-[1.1px] text-navy uppercase">
              {breadcrumb}
            </p>
          </div>
        </div>
      </div>
      <div className="flex w-full flex-col items-center gap-4 px-8 text-center md:px-12 xl:px-20">
        <h1 className="w-full font-heading text-[48px] font-bold leading-[64px] tracking-[-0.5376px] text-navy">
          {heading}
        </h1>
        <p className="w-full text-[16px] leading-[23px] text-navy">{subheading}</p>
      </div>
    </section>
  );
}
