import { useContent } from "@/hooks/useContent";

export function GalleryHero() {
  const { breadcrumb, headingPrefix, headingHighlight, subheading } =
    useContent("galleryPage").hero;

  return (
    <section className="flex flex-col gap-4 px-8 pb-10 pt-10 md:px-12 xl:px-20">
      <div className="flex w-fit items-center justify-center rounded-lg bg-[#e7e9ec] p-3 backdrop-blur-[25px]">
        <p className="whitespace-nowrap text-center font-mono text-[11px] leading-[16px] tracking-[1.1px] text-navy uppercase">
          {breadcrumb}
        </p>
      </div>
      <p className="font-heading text-[48px] font-bold leading-[64px] tracking-[-0.5376px] text-navy">
        {headingPrefix}
        <span className="text-teal">{headingHighlight}</span>
      </p>
      <p className="font-heading text-[22px] font-semibold leading-[32px] tracking-[-0.0792px] text-black">
        {subheading}
      </p>
    </section>
  );
}
