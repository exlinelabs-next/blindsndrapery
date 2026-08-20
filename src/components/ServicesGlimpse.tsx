import Image from "next/image";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { useContent } from "@/hooks/useContent";

export function ServicesGlimpse() {
  const { eyebrow, headingSegments, servicesSummary, ctaLabel, cards } = useContent("services");

  return (
    <section className="flex flex-col gap-14 bg-ice px-8 py-16 md:px-12 xl:gap-14 xl:px-20 xl:py-[100px]">
      <div className="flex flex-col items-start gap-4">
        <div className="flex items-center justify-center rounded-[8px] border border-navy-light-active p-2">
          <p className="font-mono text-[11px] uppercase leading-[16px] tracking-[1.1px] text-black">{eyebrow}</p>
        </div>
        <div className="flex w-full flex-col items-start gap-4 xl:flex-row xl:items-center xl:justify-between">
          <h2 className="w-full font-heading text-[36px] font-semibold leading-[44px] tracking-[-0.1296px] text-navy xl:w-[662px]">
            {headingSegments.map((segment, i) => (
              <span key={i} className={segment.emphasis ? "text-teal" : undefined}>
                {segment.text}
              </span>
            ))}
          </h2>
          <p className="w-full text-[16px] leading-[23px] text-black xl:w-[488px]">
            {servicesSummary}
          </p>
        </div>
      </div>

      <div className="flex flex-col gap-6 xl:grid xl:grid-cols-3 xl:gap-[10px]">
        {cards.map((card, i) => (
          <Link
            key={card.href}
            href={card.href}
            className="relative flex h-[495px] flex-col justify-end overflow-hidden rounded-[8px] p-6"
          >
            <Image src={card.image.src} alt={card.image.alt} fill className="object-cover" />
            <div
              className="absolute inset-0"
              style={
                i === 0
                  ? { backgroundImage: "linear-gradient(180deg, rgba(0, 0, 0, 0) 6.7989%, rgba(44, 40, 53, 0.84) 100%)" }
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
        ))}
      </div>
    </section>
  );
}
