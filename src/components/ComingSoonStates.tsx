import { MapPinHouse } from "lucide-react";
import { useContent } from "@/hooks/useContent";
import { RichText } from "@/components/ui/RichText";
import type { ComingSoonStatesContent } from "@/types/content";

export function ComingSoonStates({ content }: { content?: ComingSoonStatesContent }) {
  const { eyebrow, headingSegments, description, badgeLabel, cards } = content ?? useContent("locationsPage").comingSoon;

  return (
    <section className="flex flex-col items-center gap-10 px-8 pb-14 md:px-12 md:pb-16 xl:px-20 xl:pb-[100px]">
      <div className="flex w-full flex-col items-center gap-4 text-center xl:w-[912px]">
        <div className="flex items-center justify-center rounded-lg border border-navy-light-active p-2">
          <p className="whitespace-nowrap text-center font-mono text-[11px] leading-[16px] tracking-[1.1px] text-black uppercase">
            {eyebrow}
          </p>
        </div>
        <p className="w-full font-heading text-[36px] font-semibold leading-[44px] tracking-[-0.1296px] text-navy">
          {headingSegments.map((seg, i) => (
            <span key={i} className={seg.emphasis ? "text-teal" : undefined}>
              {seg.text}
            </span>
          ))}
        </p>
        <RichText paragraphs={description} className="w-full text-[16px] leading-[23px] text-black" />
      </div>

      <div className="flex w-full flex-col items-center justify-center gap-4 xl:flex-row">
        {cards.map((card) => (
          <div key={card.title} className="flex w-full flex-col items-center justify-center gap-6 rounded-lg bg-[rgba(230,230,230,0.29)] pt-6 xl:w-[378px]">
            <div className="flex w-full flex-col items-start justify-center gap-4 px-6">
              <MapPinHouse className="size-8 text-navy" strokeWidth={1.5} />
              <p className="whitespace-nowrap text-[22px] font-semibold leading-[32px] tracking-[-0.0792px] text-navy/55">
                {card.title}
              </p>
              <p className="w-full text-[16px] leading-[23px] text-black">{card.description}</p>
            </div>
            <div className="flex h-[59px] w-full items-center justify-center rounded-b-lg bg-navy/34">
              <p className="text-center text-[22px] font-semibold leading-[32px] tracking-[-0.0792px] text-white">
                {badgeLabel}
              </p>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
