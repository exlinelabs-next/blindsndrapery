import Image from "next/image";
import { useContent } from "@/hooks/useContent";

// No "use client" here on purpose: this section has no state or event
// handlers, so per the project's server-first rule it stays a plain Server
// Component — renders on the server, ships no extra JS to the browser.
// Note: "Frame 19" in Figma isn't empty — it's a full-bleed installation
// photo in a rounded card with a centered play-button glyph overlaid on
// top (a video-thumbnail treatment), not a blank placeholder.
export function ProcessIntro() {
  const { eyebrow, headingPrefix, headingHighlight, description, video } = useContent("processIntro");

  return (
    // Font sizes are constant across breakpoints (confirmed via
    // get_design_context on the mobile/tablet heading nodes — both come
    // back as the exact same 36/44 H2 style as desktop). Only padding,
    // gaps, and the video height genuinely change by breakpoint.
    <section className="flex flex-col items-center gap-12 px-8 pt-14 pb-14 md:gap-14 md:px-12 md:pt-16 md:pb-16 xl:gap-16 xl:px-20 xl:pt-[120px] xl:pb-[100px]">
      <div className="flex w-full flex-col items-center justify-center gap-4">
        <div className="flex items-center justify-center rounded-lg border border-navy-light-hover p-2">
          <p className="whitespace-nowrap text-center font-mono text-[11px] leading-[16px] tracking-[1.1px] text-black uppercase">
            {eyebrow}
          </p>
        </div>
        <div className="flex flex-col items-center gap-4 text-center">
          <h2 className="w-full max-w-[907px] font-heading text-[36px] font-semibold leading-[44px] tracking-[-0.1296px] text-navy">
            {headingPrefix}
            <span className="text-teal">{headingHighlight}</span>
          </h2>
          <p className="w-full max-w-[968px] text-[16px] leading-[23px] text-black">{description}</p>
        </div>
      </div>
      <div className="relative h-[435px] w-full overflow-hidden rounded-2xl md:h-[596px]">
        {/* TODO: temporary Figma asset URL, expires ~7 days — export and commit to public/images/home/process/ before then. */}
        <Image src={video.poster.src} alt={video.poster.alt} fill sizes="(min-width: 1024px) 1280px, 100vw" className="object-cover" />
        <div className="absolute inset-0 flex items-center justify-center">
          {/* TODO: temporary Figma asset URL, expires ~7 days — export and commit to public/images/home/process/ before then. */}
          <Image src={video.playIcon.src} alt="" aria-hidden="true" width={64} height={64} className="size-[64px]" />
        </div>
      </div>
    </section>
  );
}
