import Image from "next/image";
import { useContent } from "@/hooks/useContent";
import { Button } from "@/components/ui/Button";
import { RichText } from "@/components/ui/RichText";
import type { ServiceAboutContent } from "@/types/content";

export function ServiceAboutSection({ content }: { content?: ServiceAboutContent }) {
  const { eyebrow, headingPrefix, headingHighlight, headingSuffix, paragraph, image, cta } =
    content ?? useContent("servicePage").about;

  return (
    <section className="flex flex-col items-start gap-10 px-4 py-14 md:px-12 md:py-16 xl:flex-row xl:items-center xl:gap-10 xl:px-20 xl:py-[100px]">
      <div className="flex w-full flex-col items-start gap-4 xl:w-[607px] xl:shrink-0">
        <div className="flex items-center justify-center rounded-[8px] border border-navy-light-hover p-2">
          <p className="whitespace-nowrap text-center font-mono text-[11px] leading-[16px] tracking-[1.1px] text-black">
            {eyebrow}
          </p>
        </div>
        <h2 className="w-full font-heading text-[36px] font-semibold leading-[44px] tracking-[-0.1296px] text-navy">
          {headingPrefix}
          <span className="text-teal">{headingHighlight}</span>
          {headingSuffix}
        </h2>
        <RichText paragraphs={paragraph} className="w-full text-[16px] leading-[23px] text-black" />
        {cta && (
          <Button href={cta.href} variant="outline">
            {cta.label}
          </Button>
        )}
      </div>
      <div className="relative h-[300px] w-full overflow-hidden rounded-[8px] md:h-[400px] xl:h-[664px] xl:flex-1">
        <Image src={image.src} alt={image.alt} fill sizes="(min-width: 1280px) 50vw, 100vw" className="object-cover" />
      </div>
    </section>
  );
}
