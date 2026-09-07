import { useContent } from "@/hooks/useContent";
import type { LocationsContent } from "@/types/content";

export function Locations({ content }: { content?: LocationsContent }) {
  const { eyebrow, heading, description, cities } = content ?? useContent("locations");

  return (
    <section className="flex flex-col items-start gap-4 bg-ice px-8 py-14 md:px-12 md:py-16 xl:px-20 xl:py-[100px]">
      <div className="flex items-center justify-center rounded-lg border border-navy-light-active p-2">
        <p className="whitespace-nowrap text-center font-mono text-[11px] leading-[16px] tracking-[1.1px] text-black">
          {eyebrow}
        </p>
      </div>
      {/* Corrected 2026-08-16: the tablet frame (2806:1790) still stacks the
          text block ABOVE the pills (like mobile) — it only differs from
          mobile in that its pills sit in a horizontal ROW rather than a
          vertical stack. So the text/pills relationship stays column
          (`flex-col`) through tablet and only goes side-by-side at `xl`;
          it's the pills' OWN internal direction that switches at `md`. */}
      <div className="flex w-full flex-col items-start gap-12 md:gap-14 xl:flex-row xl:items-center xl:gap-16">
        <div className="flex w-full min-w-0 flex-1 flex-col items-start gap-2 xl:items-center">
          <div className="flex w-full flex-col items-start">
            <p className="w-full font-heading text-[36px] font-semibold leading-[44px] tracking-[-0.1296px] text-navy">
              {heading}
            </p>
          </div>
          <p className="w-full text-[16px] leading-[23px] text-black">{description}</p>
        </div>
        <div className="flex w-full flex-col items-stretch gap-4 md:flex-row md:flex-wrap md:items-center md:gap-6 xl:w-auto xl:shrink-0 xl:justify-end">
          {cities.map(({ icon, name }) => (
            <div
              key={name}
              className="flex w-full items-center gap-2 rounded-lg border border-transparent bg-white p-3 transition-all hover:border-teal/33 hover:shadow-[0px_4px_4px_rgba(0,0,0,0.05)] md:w-auto md:shrink-0"
            >
              {/* Plain <img>, not next/image: it's an SVG, and Next's image
                  optimizer rejects SVGs unless `images.dangerouslyAllowSVG`
                  is set in next.config.ts, which this project doesn't
                  enable (same reasoning as the quote mark in QuoteGallery).
                  Outer box matches the Figma bounding box; the inner box
                  carries the 26.03deg tilt so the glyph rotates in place
                  instead of skewing its container. */}
              {/* TODO: temporary Figma asset URL, see mock.ts — export and commit to public/images/home/locations/ before it expires. */}
              {icon.src && (
                <div className="flex h-[24.115px] w-[21.357px] shrink-0 items-center justify-center">
                  <div className="h-5 w-3.5 rotate-[26.03deg]">
                    {/* eslint-disable-next-line @next/next/no-img-element */}
                    <img
                      src={icon.src}
                      alt={icon.alt}
                      className="block h-full w-full"
                      aria-hidden={icon.alt === ""}
                    />
                  </div>
                </div>
              )}
              <p className="whitespace-nowrap font-heading text-[18px] font-semibold leading-[27px] tracking-[-0.0648px] text-navy">
                {name}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
