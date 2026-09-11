import Image from "next/image";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { useContent } from "@/hooks/useContent";
import { RichText } from "@/components/ui/RichText";
import type { CityServiceGridContent } from "@/types/content";

export function CityServiceGrid({ content }: { content?: CityServiceGridContent }) {
  const { eyebrow, headingSegments, summary, cards } = content ?? useContent("cityPage").serviceGrid;

  return (
    <section className="flex flex-col gap-10 px-4 py-14 md:px-12 md:py-16 xl:px-20 xl:pt-[120px] xl:pb-[100px]">
      {/* Header */}
      <div className="flex flex-col items-center gap-4">
        <div className="flex items-center justify-center rounded-lg border border-navy-light-active p-2">
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
        <RichText paragraphs={summary} className="w-full text-center text-[16px] leading-[23px] text-black xl:px-20" />
      </div>

      {/* Service cards — 1 col mobile, 2 col tablet, 3 col desktop */}
      <div className="grid grid-cols-1 gap-6 gap-y-10 md:grid-cols-2 xl:grid-cols-3">
        {cards.map((card) => (
          <Link key={card.title} href={card.href} className="group flex flex-col gap-2.5">
            <div className="relative h-[392px] w-full overflow-hidden rounded-lg">
              <Image src={card.image.src} alt={card.image.alt} fill className="object-cover transition-transform duration-300 group-hover:scale-110" />
            </div>
            <div className="flex flex-col gap-3">
              <div className="flex flex-col gap-2 text-navy">
                <p className="font-heading text-[22px] font-semibold leading-[32px] tracking-[-0.0792px]">
                  {card.title}
                </p>
                <p className="text-[16px] leading-[23px]">
                  {card.description}
                </p>
              </div>
              <div
                className="flex w-fit items-center gap-2 rounded-lg border border-navy-light-active bg-white px-4 py-2 transition-all duration-300 group-hover:border-navy group-hover:bg-transparent"
              >
                <span className="whitespace-nowrap font-heading text-[15px] font-semibold leading-[27.2px] tracking-[0.56px] text-navy">
                  View Details
                </span>
                <ArrowRight className="size-[14px] text-navy transition-all duration-300 group-hover:-rotate-45" strokeWidth={2.5} />
              </div>
            </div>
          </Link>
        ))}
      </div>
    </section>
  );
}
