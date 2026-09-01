import Image from "next/image";
import { useContent } from "@/hooks/useContent";
import type { FeaturedCategoryContent } from "@/types/content";

export function FeaturedCategory({ content }: { content?: FeaturedCategoryContent }) {
  const { eyebrow, headingPrefix, headingHighlight, headingSuffix, paragraphs, image } =
    content ?? useContent("featuredCategory");

  return (
    <section className="px-8 py-14 md:px-12 md:py-16 xl:px-20 xl:py-[100px]">
      <div className="flex w-full flex-col items-center gap-12 md:gap-14 xl:flex-row xl:items-center xl:justify-between xl:gap-16">
        <div className="flex w-full min-w-0 flex-col items-start gap-4 xl:w-[556px] xl:max-w-[556px] xl:flex-1">
          <div className="flex items-center justify-center rounded-lg border border-navy-light-hover p-2">
            <p className="whitespace-nowrap text-center font-mono text-[11px] leading-[16px] tracking-[1.1px] text-black uppercase">
              {eyebrow}
            </p>
          </div>
          <div className="flex w-full flex-col items-start gap-6">
            <h2 className="w-full font-heading text-[36px] font-semibold leading-[44px] tracking-[-0.1296px] text-navy">
              {headingPrefix}
              <span className="text-teal">{headingHighlight}</span>
              {headingSuffix}
            </h2>
            <div className="flex w-full flex-col gap-6 text-[16px] leading-[23px] text-black xl:max-w-[505px]">
              {paragraphs.map((paragraph) => (
                <p key={paragraph}>{paragraph}</p>
              ))}
            </div>
          </div>
        </div>
        <div className="relative h-[411px] w-full shrink-0 overflow-hidden rounded-lg md:h-[529px] xl:w-[645px]">
          {/* TODO: temporary Figma asset URL, expires ~7 days — export and commit to public/images/home/shutters/ before then. */}
          <Image src={image.src} alt={image.alt} fill sizes="(min-width: 1024px) 645px, 100vw" className="object-cover" />
        </div>
      </div>
    </section>
  );
}
