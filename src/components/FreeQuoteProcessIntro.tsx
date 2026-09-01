import Image from "next/image";
import { useContent } from "@/hooks/useContent";
import type { FreeQuoteProcessIntroContent } from "@/types/content";

export function FreeQuoteProcessIntro({ content }: { content?: FreeQuoteProcessIntroContent }) {
  const { eyebrow, headingPrefix, headingHighlight, description, image } =
    content ?? useContent("freeQuotePage").processIntro;

  return (
    <section className="flex flex-col gap-10 px-4 py-14 md:px-12 md:py-16 xl:flex-row xl:items-center xl:gap-10 xl:px-20 xl:pb-[100px] xl:pt-0">
      <div className="flex flex-col gap-4 xl:w-[527px] xl:shrink-0">
        <div className="flex w-fit items-center justify-center rounded-lg border border-[#dbdde2] p-2">
          <p className="whitespace-nowrap text-center font-mono text-[11px] leading-[16px] tracking-[1.1px] text-black uppercase">
            {eyebrow}
          </p>
        </div>
        <div className="flex flex-col gap-4">
          <p className="font-heading text-[28px] font-semibold leading-[36px] tracking-[-0.1296px] text-navy md:text-[36px] md:leading-[44px]">
            {headingPrefix}
            <span className="text-teal">{headingHighlight}</span>
          </p>
          <p className="text-[16px] leading-[23px] text-black">{description}</p>
        </div>
      </div>
      <div className="relative aspect-[16/9] w-full overflow-hidden rounded-2xl xl:h-[486px] xl:flex-1">
        <Image
          src={image.src}
          alt={image.alt}
          fill
          sizes="(max-width: 1279px) 100vw, 50vw"
          className="object-cover"
        />
      </div>
    </section>
  );
}
