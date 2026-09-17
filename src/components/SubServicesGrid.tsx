import Image from "next/image";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { RichText } from "@/components/ui/RichText";
import type { SubServiceCard, SubServicesGridContent } from "@/types/content";

function ServiceCard({ card }: { card: SubServiceCard }) {
  return (
    <Link href={card.href} className="group flex flex-col gap-[10px]">
      <div className="relative h-[300px] w-full overflow-hidden rounded-lg md:h-[392px]">
        <Image src={card.image.src} alt={card.image.alt} fill sizes="(min-width: 1280px) 33vw, (min-width: 768px) 50vw, 100vw" className="object-cover transition-transform duration-300 group-hover:scale-110" />
      </div>
      <div className="flex flex-col gap-3">
        <div className="flex flex-col gap-2 text-white">
          <p className="font-heading text-[22px] font-semibold leading-[32px] tracking-[-0.0792px]">
            {card.title}
          </p>
          <p className="text-[16px] leading-[23px]">{card.description}</p>
        </div>
        <div
          className="flex w-fit items-center justify-center gap-2 rounded-lg border border-navy-light-active bg-white px-4 py-2 transition-all duration-300 group-hover:border-white group-hover:bg-transparent"
        >
          <span className="whitespace-nowrap font-heading text-[15px] font-semibold leading-[27.2px] tracking-[0.56px] text-navy transition-colors duration-300 group-hover:text-white/90">
            View Details
          </span>
          <ArrowRight className="size-[14px] text-navy transition-all duration-300 group-hover:-rotate-45 group-hover:text-white/90" strokeWidth={2.5} />
        </div>
      </div>
    </Link>
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
            <p className="whitespace-nowrap text-center font-mono text-[11px] leading-[16px] tracking-[1.1px] text-white">
              {eyebrow}
            </p>
          </div>
          <h2 className="w-full font-heading text-[36px] font-semibold leading-[44px] tracking-[-0.1296px] text-white">
            {headingPrefix}
            <span className="text-teal">{headingHighlight}</span>
            {headingSuffix}
          </h2>
          {description.length > 0 && <RichText paragraphs={description} className="w-full text-[16px] leading-[23px] text-white" />}
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
