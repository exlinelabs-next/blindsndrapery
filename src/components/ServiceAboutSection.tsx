import Image from "next/image";
import { useContent } from "@/hooks/useContent";
import type { ServiceAboutContent } from "@/types/content";

export function ServiceAboutSection({ content }: { content?: ServiceAboutContent }) {
  const { eyebrow, headingPrefix, headingHighlight, headingSuffix, paragraph, image } =
    content ?? useContent("servicePage").about;

  return (
    <section className="flex flex-col gap-10 px-4 pt-14 md:px-12 md:pt-16 xl:px-20 xl:pt-[100px]">
      <div className="flex flex-col items-start gap-4">
        <div className="flex items-center justify-center rounded-[8px] border border-navy-light-hover p-2">
          <p className="whitespace-nowrap text-center font-mono text-[11px] leading-[16px] tracking-[1.1px] text-black">
            {eyebrow}
          </p>
        </div>
        <div className="flex w-full flex-col gap-4 xl:flex-row xl:items-center xl:justify-between">
          <h2 className="w-full font-heading text-[36px] font-semibold leading-[44px] tracking-[-0.1296px] text-navy xl:w-[553px] xl:shrink-0">
            {headingPrefix}
            <span className="text-teal">{headingHighlight}</span>
            {headingSuffix}
          </h2>
          <p className="w-full text-[16px] leading-[23px] text-black xl:w-[607px]">
            {paragraph}
          </p>
        </div>
      </div>
      <div className="relative h-[300px] w-full overflow-hidden rounded-[8px] md:h-[400px] xl:h-[512px]">
        <Image src={image.src} alt={image.alt} fill className="object-cover" />
      </div>
    </section>
  );
}
