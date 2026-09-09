import { useContent } from "@/hooks/useContent";
import { Breadcrumb } from "@/components/Breadcrumb";
import type { FreeQuoteHeroContent } from "@/types/content";

export function FreeQuoteHero({ content }: { content?: FreeQuoteHeroContent }) {
  const { breadcrumb, heading, subheading } = content ?? useContent("freeQuotePage").hero;

  return (
    <section className="flex items-center bg-navy py-14 md:py-16 xl:py-20">
      <div className="flex flex-col gap-4 px-6 md:px-12 xl:px-20">
        <div className="flex w-fit items-center justify-center rounded-lg bg-[#e7e9ec] p-3 backdrop-blur-[25px]">
          <p className="whitespace-nowrap text-center font-mono text-[11px] leading-[16px] tracking-[1.1px] text-navy">
            <Breadcrumb trail={breadcrumb} />
          </p>
        </div>
        <h1 className="font-heading text-[32px] font-bold leading-[42px] tracking-[-0.5376px] text-white md:text-[48px] md:leading-[64px]">
          {heading}
        </h1>
        <p className="font-heading text-[18px] font-semibold leading-[27px] tracking-[-0.0792px] text-white md:text-[22px] md:leading-[32px]">
          {subheading}
        </p>
      </div>
    </section>
  );
}
