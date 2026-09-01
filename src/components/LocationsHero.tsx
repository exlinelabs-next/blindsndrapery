import { useContent } from "@/hooks/useContent";
import type { LocationsHeroContent } from "@/types/content";

export function LocationsHero({ content }: { content?: LocationsHeroContent }) {
  const { breadcrumb, heading, subheading } = content ?? useContent("locationsPage").hero;

  return (
    <section className="flex items-center bg-navy px-8 py-20 md:px-12 xl:px-20">
      <div className="flex w-full flex-1 flex-col items-center gap-4">
        <div className="flex w-fit items-center justify-center rounded-lg bg-[#e7e9ec] p-3 backdrop-blur-[25px]">
          <p className="whitespace-nowrap text-center font-mono text-[11px] leading-[16px] tracking-[1.1px] text-navy uppercase">
            {breadcrumb}
          </p>
        </div>
        <p className="w-full text-center font-heading text-[48px] font-bold leading-[64px] tracking-[-0.5376px] text-white">
          {heading}
        </p>
        <p className="w-full text-center font-heading text-[22px] font-semibold leading-[32px] tracking-[-0.0792px] text-white">
          {subheading}
        </p>
      </div>
    </section>
  );
}
