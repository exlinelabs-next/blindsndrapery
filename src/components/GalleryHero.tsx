import { useContent } from "@/hooks/useContent";
import { Breadcrumb } from "@/components/Breadcrumb";
import type { GalleryHeroContent } from "@/types/content";

export function GalleryHero({ content }: { content?: GalleryHeroContent }) {
  const { breadcrumb, headingSegments, subheading } =
    content ?? useContent("galleryPage").hero;

  return (
    <section className="flex flex-col gap-4 px-8 pb-10 pt-10 md:px-12 xl:px-20">
      <div className="flex w-fit items-center justify-center rounded-lg bg-[#e7e9ec] p-3 backdrop-blur-[25px]">
        <p className="whitespace-nowrap text-center font-mono text-[11px] leading-[16px] tracking-[1.1px] text-navy">
          <Breadcrumb trail={breadcrumb} />
        </p>
      </div>
      <p className="font-heading text-[48px] font-bold leading-[64px] tracking-[-0.5376px] text-navy">
        {headingSegments.map((seg, i) => (
          <span key={i} className={seg.emphasis ? "text-teal" : undefined}>
            {seg.text}
          </span>
        ))}
      </p>
      <p className="font-heading text-[22px] font-semibold leading-[32px] tracking-[-0.0792px] text-black">
        {subheading}
      </p>
    </section>
  );
}
