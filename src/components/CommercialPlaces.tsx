import { Building2, Hotel, SquareActivity, PaperBag, type LucideIcon } from "lucide-react";
import { useContent } from "@/hooks/useContent";
import type { CommercialPlacesContent } from "@/types/content";

const ICONS: Record<string, LucideIcon> = {
  Building2,
  Hotel,
  SquareActivity,
  PaperBag,
};

export function CommercialPlaces({ content }: { content?: CommercialPlacesContent }) {
  const { eyebrow, headingPrefix, headingHighlight, description, cards } = content ?? useContent("commercialPage").places;

  return (
    <section className="flex flex-col items-center px-4 pt-[100px] pb-14 md:px-6 md:pb-16 xl:px-0 xl:pt-[120px] xl:pb-[100px]">
      <div className="flex w-full flex-col items-start gap-10 rounded-lg bg-ice px-4 py-20 md:px-6 xl:w-[1360px] xl:gap-16 xl:px-10">
        <div className="flex w-full flex-col items-start gap-4">
          <div className="flex items-center justify-center rounded-lg border border-navy-light-active p-2">
            <p className="whitespace-nowrap text-center font-mono text-[11px] leading-[16px] tracking-[1.1px] text-black">
              {eyebrow}
            </p>
          </div>
          <div className="flex w-full flex-col items-start gap-4 xl:flex-row xl:items-start xl:justify-between">
            <p className="w-full font-heading text-[36px] font-semibold leading-[44px] tracking-[-0.1296px] text-navy xl:max-w-[619px]">
              {headingPrefix}
              <span className="text-teal">{headingHighlight}</span>
            </p>
            <p className="w-full text-[16px] leading-[23px] text-black xl:max-w-[575px]">{description}</p>
          </div>
        </div>

        <div className="flex w-full flex-col items-start gap-6 xl:flex-row xl:flex-wrap xl:items-center xl:justify-center">
          {cards.map((card) => {
            const isUrl = card.icon.startsWith("http");
            const Icon = ICONS[card.icon];
            return (
              <div
                key={card.title}
                className="flex w-full shrink-0 items-center justify-center gap-2.5 rounded-lg border border-transparent bg-white p-6 transition-all hover:border-teal/33 hover:shadow-[0px_4px_4px_rgba(0,0,0,0.05)] xl:h-[136px] xl:w-[627px]"
              >
                <div className="flex flex-1 flex-col items-start gap-2 text-navy">
                  <p className="w-full font-heading text-[22px] font-semibold leading-[32px] tracking-[-0.0792px]">{card.title}</p>
                  <p className="w-full text-[16px] leading-[23px]">{card.description}</p>
                </div>
                <div className="flex size-[72px] shrink-0 items-center justify-center rounded-full bg-navy">
                  {isUrl ? (
                    /* eslint-disable-next-line @next/next/no-img-element */
                    <img src={card.icon} alt="" className="size-10" />
                  ) : (
                    Icon && <Icon className="size-10 text-white" strokeWidth={1.5} />
                  )}
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
