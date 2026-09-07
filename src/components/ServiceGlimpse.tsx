import Image from "next/image";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { useContent } from "@/hooks/useContent";
import type { ServicesGlimpseContent } from "@/types/content";

const COLUMNS: readonly (readonly [number, number])[] = [
  [0, 1],
  [2, 3],
  [4, 5],
];
const COLUMN_GAP_CLASSES = ["gap-[13px]", "gap-[10px]", "gap-[10px]"];
const CARD_HEIGHT_CLASSES = [
  "h-[500px] xl:h-[495px]",
  "h-[500px] xl:h-[715px]",
  "h-[500px] xl:h-[613px]",
  "h-[500px] xl:h-[600px]",
  "h-[500px] xl:h-[715px]",
  "h-[500px] xl:h-[498px]",
];

export function ServiceGlimpse({ content }: { content?: ServicesGlimpseContent }) {
  const { eyebrow, headingSegments, servicesSummary, ctaLabel, cards } =
    content ?? useContent("services");

  function renderCard(cardIdx: number) {
    const card = cards[cardIdx];
    return (
      <Link
        key={card.href}
        href={card.href}
        className={`relative flex flex-col justify-end overflow-hidden rounded-[8px] p-6 ${CARD_HEIGHT_CLASSES[cardIdx]}`}
      >
        <Image
          src={card.image.src}
          alt={card.image.alt}
          fill
          className="object-cover"
        />
        <div
          className="absolute inset-0"
          style={
            cardIdx === 0
              ? {
                  backgroundImage:
                    "linear-gradient(180deg, rgba(0, 0, 0, 0) 6.8%, rgba(44, 40, 53, 0.84) 100%)",
                }
              : { backgroundColor: "rgba(30, 30, 30, 0.42)" }
          }
        />
        <div className="relative flex flex-col gap-3">
          <div className="flex flex-col gap-2 text-left text-white">
            <p className="font-heading text-[22px] font-semibold leading-[32px] tracking-[-0.0792px]">
              {card.title}
            </p>
            <p className="text-[16px] leading-[23px]">{card.description}</p>
          </div>
          <span className="flex w-fit items-center justify-center gap-2 rounded-[8px] bg-white px-4 py-2">
            <span className="whitespace-nowrap font-heading text-[15px] font-semibold leading-[27.2px] tracking-[0.56px] text-navy">
              {ctaLabel}
            </span>
            <ArrowRight className="size-[14px] text-navy" strokeWidth={2.5} />
          </span>
        </div>
      </Link>
    );
  }

  return (
    <section className="flex flex-col gap-10 px-4 pb-14 pt-[120px] md:px-12 md:pb-16 xl:px-20 xl:pb-[100px]">
      <div className="flex flex-col items-center gap-4">
        <div className="flex items-center justify-center rounded-[8px] border border-navy-light-hover p-2">
          <p className="whitespace-nowrap text-center font-mono text-[11px] leading-[16px] tracking-[1.1px] text-black">
            {eyebrow}
          </p>
        </div>
        <h2 className="w-full max-w-[730px] text-center font-heading text-[36px] font-semibold leading-[44px] tracking-[-0.1296px] text-navy">
          {headingSegments.map((seg, i) => (
            <span key={i} className={seg.emphasis ? "text-teal" : undefined}>
              {seg.text}
            </span>
          ))}
        </h2>
        <p className="w-full text-center text-[16px] leading-[23px] text-black xl:px-20">
          {servicesSummary}
        </p>
      </div>

      <div className="flex flex-col gap-6 px-4 md:px-0 xl:hidden">
        {cards.map((_, cardIdx) => renderCard(cardIdx))}
      </div>

      <div className="hidden grid-cols-3 gap-x-[10px] xl:grid">
        {COLUMNS.map((cardIndices, colIdx) => (
          <div
            key={colIdx}
            className={`flex flex-col ${COLUMN_GAP_CLASSES[colIdx]}`}
          >
            {cardIndices.map((cardIdx) => renderCard(cardIdx))}
          </div>
        ))}
      </div>
    </section>
  );
}
