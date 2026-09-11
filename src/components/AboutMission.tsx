import { useContent } from "@/hooks/useContent";
import { RichText } from "@/components/ui/RichText";
import type { AboutMissionContent } from "@/types/content";

export function AboutMission({ content }: { content?: AboutMissionContent }) {
  const { headingSegments, paragraphs } =
    content ?? useContent("aboutPage").mission;

  return (
    <section className="flex flex-col gap-8 px-8 py-16 md:px-12 xl:flex-row xl:items-start xl:gap-[61px] xl:px-20 xl:pb-[100px] xl:pt-20">
      <h2 className="font-heading text-[28px] font-semibold leading-[36px] tracking-[-0.1296px] text-navy md:text-[32px] md:leading-[40px] xl:w-[491px] xl:shrink-0 xl:text-[36px] xl:leading-[44px]">
        {headingSegments.map((seg, i) => (
          <span key={i} className={seg.emphasis ? "text-teal" : undefined}>
            {seg.text}
          </span>
        ))}
      </h2>
      <div className="flex flex-col gap-[27px] font-heading text-[18px] font-semibold leading-[27px] tracking-[-0.0648px] text-navy xl:flex-1">
        <RichText paragraphs={paragraphs} />
      </div>
    </section>
  );
}
