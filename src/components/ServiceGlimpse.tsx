import Image from "next/image";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { useContent } from "@/hooks/useContent";
import type { ServicesGlimpseContent } from "@/types/content";

// The 6 cards come from the CMS in whatever order an editor set (currently
// "Repairs & Maintenance, Motorized & Smart Home, Shutters, Drapery &
// Curtains, Shades, Blinds" — not the nav order), but Figma's masonry
// arrangement is a fixed layout keyed to each service's identity, not its
// position in that list. Matching by title (rather than a hardcoded array
// index) keeps the grid correct regardless of how the CMS happens to order
// the cards.
const CARD_LAYOUT: Record<string, { column: 0 | 1 | 2; row: 0 | 1; heightClass: string }> = {
  "Blinds": { column: 0, row: 0, heightClass: "h-[495px] xl:h-[495px]" },
  "Shutters": { column: 0, row: 1, heightClass: "h-[495px] xl:h-[715px]" },
  "Shades": { column: 1, row: 0, heightClass: "h-[495px] xl:h-[613px]" },
  "Motorized & Smart Home": { column: 1, row: 1, heightClass: "h-[495px] xl:h-[600px]" },
  "Drapery & Curtains": { column: 2, row: 0, heightClass: "h-[495px] xl:h-[715px]" },
  "Repairs & Maintenance": { column: 2, row: 1, heightClass: "h-[495px] xl:h-[498px]" },
};
const COLUMN_GAP_CLASSES = ["gap-[13px]", "gap-[10px]", "gap-[10px]"];

export function ServiceGlimpse({ content }: { content?: ServicesGlimpseContent }) {
  const fallback = useContent("services");
  const { eyebrow, headingSegments, servicesSummary, ctaLabel, cards } = content ?? fallback;

  const columns: (typeof cards)[number][][] = [[], [], []];
  for (const card of cards) {
    const layout = CARD_LAYOUT[card.title];
    columns[layout?.column ?? 0][layout?.row ?? 0] = card;
  }

  function renderCard(card: (typeof cards)[number]) {
    const heightClass = CARD_LAYOUT[card.title]?.heightClass ?? "h-[495px] xl:h-[495px]";
    return (
      <Link
        key={card.href}
        href={card.href}
        className={`group relative flex flex-col justify-end overflow-hidden rounded-[8px] p-6 ${heightClass}`}
      >
        <Image
          src={card.image.src}
          alt={card.image.alt}
          fill
          className="object-cover transition-transform duration-300 group-hover:scale-110"
        />
        <div
          className="absolute inset-0"
          style={
            card.title === "Blinds"
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
          <span className="flex w-fit items-center justify-center gap-2 rounded-[8px] border border-transparent bg-white px-4 py-2 transition-all duration-300 group-hover:border-white group-hover:bg-transparent">
            <span className="whitespace-nowrap font-heading text-[15px] font-semibold leading-[27.2px] tracking-[0.56px] text-navy transition-colors duration-300 group-hover:text-white/90">
              {ctaLabel}
            </span>
            <ArrowRight className="size-[14px] text-navy transition-all duration-300 group-hover:-rotate-45 group-hover:text-white/90" strokeWidth={2.5} />
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
        {cards.map((card) => renderCard(card))}
      </div>

      <div className="hidden grid-cols-3 gap-x-[10px] xl:grid">
        {columns.map((columnCards, colIdx) => (
          <div
            key={colIdx}
            className={`flex flex-col ${COLUMN_GAP_CLASSES[colIdx]}`}
          >
            {columnCards.map((card) => renderCard(card))}
          </div>
        ))}
      </div>
    </section>
  );
}
