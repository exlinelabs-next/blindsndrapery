import Image from "next/image";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import type { SubServiceCard, SubServicesGridContent } from "@/types/content";

function ServiceCard({ card }: { card: SubServiceCard }) {
  return (
    <div className="flex flex-col gap-[10px]">
      <div className="relative h-[300px] w-full overflow-hidden rounded-lg md:h-[392px]">
        <Image src={card.image.src} alt={card.image.alt} fill className="object-cover" />
      </div>
      <div className="flex flex-col gap-3">
        <div className="flex flex-col gap-2 text-white">
          <p className="font-heading text-[22px] font-semibold leading-[32px] tracking-[-0.0792px]">
            {card.title}
          </p>
          <p className="text-[16px] leading-[23px]">{card.description}</p>
        </div>
        <Link
          href={card.href}
          className="flex w-fit items-center justify-center gap-2 rounded-lg border border-navy-light-active bg-white px-4 py-2"
        >
          <span className="whitespace-nowrap font-heading text-[15px] font-semibold leading-[27.2px] tracking-[0.56px] text-navy">
            View Details
          </span>
          <ArrowRight className="size-[14px] text-navy" strokeWidth={2.5} />
        </Link>
      </div>
    </div>
  );
}

export function SubServicesGrid({ content }: { content: SubServicesGridContent }) {
  const { eyebrow, headingPrefix, headingHighlight, headingSuffix, description, cards } = content;

  // At the xl 3-column layout, a trailing row of exactly 2 cards would
  // otherwise sit in the first two of three grid tracks, leaving an empty
  // gap where a third card would go. Render that trailing pair as its own
  // 2-column row instead, so they share the full width evenly.
  const hasPartialLastRow = cards.length % 3 === 2;
  const mainCards = hasPartialLastRow ? cards.slice(0, -2) : cards;
  const lastRowCards = hasPartialLastRow ? cards.slice(-2) : [];

  return (
    <section className="bg-navy px-8 pt-[100px] pb-14 md:px-12 md:pb-16 xl:px-20 xl:pt-[120px] xl:pb-[100px]">
      <div className="flex flex-col gap-10 xl:px-5">
        <div className="flex flex-col items-start gap-4">
          <div className="flex items-center justify-center rounded-lg border border-navy-light-hover p-2">
            <p className="whitespace-nowrap text-center font-mono text-[11px] leading-[16px] tracking-[1.1px] text-white uppercase">
              {eyebrow}
            </p>
          </div>
          <h2 className="w-full font-heading text-[36px] font-semibold leading-[44px] tracking-[-0.1296px] text-white">
            {headingPrefix}
            <span className="text-teal">{headingHighlight}</span>
            {headingSuffix}
          </h2>
          {description && <p className="w-full text-[16px] leading-[23px] text-white">{description}</p>}
        </div>

        <div className="grid grid-cols-1 gap-10 md:grid-cols-2 xl:grid-cols-3 xl:gap-x-6 xl:gap-y-10">
          {mainCards.map((card) => (
            <ServiceCard key={card.href} card={card} />
          ))}
        </div>

        {hasPartialLastRow && (
          <div className="grid grid-cols-1 gap-10 md:grid-cols-2 xl:gap-x-6 xl:gap-y-10">
            {lastRowCards.map((card) => (
              <ServiceCard key={card.href} card={card} />
            ))}
          </div>
        )}
      </div>
    </section>
  );
}
