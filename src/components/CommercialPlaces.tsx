import Image from "next/image";
import { Building2, Hotel, SquareActivity, PaperBag, type LucideIcon } from "lucide-react";
import { useContent } from "@/hooks/useContent";
import { RichText } from "@/components/ui/RichText";
import type { CommercialPlacesContent } from "@/types/content";

const ICONS: Record<string, LucideIcon> = {
  Building2,
  Hotel,
  SquareActivity,
  PaperBag,
};

export function CommercialPlaces({ content }: { content?: CommercialPlacesContent }) {
  const { eyebrow, headingSegments, description, cards } = content ?? useContent("commercialPage").places;

  return (
    <section className="flex flex-col items-center px-4 pt-[100px] md:px-6 xl:px-10 xl:pt-[120px]">
      <div className="flex w-full max-w-[1360px] flex-col items-start gap-10 rounded-lg bg-ice px-4 py-20 md:px-6 xl:gap-16 xl:px-10">
        <div className="flex w-full flex-col items-start gap-4">
          <div className="flex items-center justify-center rounded-lg border border-navy-light-active p-2">
            <p className="whitespace-nowrap text-center font-mono text-[11px] leading-[16px] tracking-[1.1px] text-black">
              {eyebrow}
            </p>
          </div>
          <div className="flex w-full flex-col items-start gap-4 xl:flex-row xl:items-center xl:justify-between">
            <p className="w-full font-heading text-[36px] font-semibold leading-[44px] tracking-[-0.1296px] text-navy xl:max-w-[619px]">
              {headingSegments.map((seg, i) => (
                <span key={i} className={seg.emphasis ? "text-teal" : undefined}>
                  {seg.text}
                </span>
              ))}
            </p>
            <RichText paragraphs={description} className="w-full text-[16px] leading-[23px] text-black xl:max-w-[575px]" />
          </div>
        </div>

        <div className="flex w-full flex-col items-center gap-6 xl:flex-row xl:flex-wrap xl:justify-center">
          {cards.map((card) => {
            const isUrl = card.icon.startsWith("http");
            const Icon = ICONS[card.icon];
            return (
              <div
                key={card.title}
                className="flex w-full shrink-0 flex-col items-start justify-center gap-2.5 rounded-lg border border-teal/33 bg-white p-6 shadow-[0px_4px_4px_rgba(0,0,0,0.05)] xl:h-[282px] xl:w-[627px]"
              >
                <div className={`flex size-[72px] shrink-0 items-center justify-center rounded-full ${isUrl ? "" : "bg-navy"}`}>
                  {isUrl ? (
                    // The WP-uploaded icon SVGs (building.svg, hotel.svg, pluse.svg,
                    // bag.svg) are self-contained 72x72 compositions that already
                    // bake in their own navy circle background — rendering them at
                    // 40px inside a second navy circle double-drew the background
                    // and shrank the glyph to a fraction of the box. Rendering at
                    // their native 72px with no extra wrapper background fixes both.
                    <Image src={card.icon} alt="" width={72} height={72} className="size-[72px]" />
                  ) : (
                    Icon && <Icon className="size-10 text-white" strokeWidth={1.5} />
                  )}
                </div>
                <div className="flex w-full flex-col items-start gap-2 text-navy">
                  <p className="w-full font-heading text-[22px] font-semibold leading-[32px] tracking-[-0.0792px]">{card.title}</p>
                  <p className="line-clamp-5 w-full text-[16px] leading-[23px]">{card.description}</p>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
