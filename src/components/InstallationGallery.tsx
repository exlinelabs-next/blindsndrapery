import Image from "next/image";
import { useContent } from "@/hooks/useContent";
import type { InstallationGalleryContent } from "@/types/content";

export function InstallationGallery({ content }: { content?: InstallationGalleryContent }) {
  const { eyebrow, headingPrefix, headingHighlight, headingSuffix, description, images } =
    content ?? useContent("commercialPage").installation;

  return (
    <section className="flex flex-col items-center gap-6 px-8 pb-14 md:px-12 md:pb-16 xl:gap-16 xl:px-20 xl:pb-[100px]">
      <div className="flex w-full flex-col items-center gap-4 xl:w-[912px]">
        <div className="flex items-center justify-center rounded-lg border border-navy-light-hover p-2">
          <p className="whitespace-nowrap text-center font-mono text-[11px] leading-[16px] tracking-[1.1px] text-black uppercase">
            {eyebrow}
          </p>
        </div>
        <p className="w-full text-center font-heading text-[36px] font-semibold leading-[44px] tracking-[-0.1296px] text-navy">
          {headingPrefix}
          <span className="text-teal">{headingHighlight}</span>
          {headingSuffix}
        </p>
        <p className="w-full text-center text-[16px] leading-[23px] text-black">{description}</p>
      </div>

      <div className="flex w-full flex-col gap-2 xl:w-[1170px] xl:flex-row xl:items-center">
        {images.map((image, i) => (
          <div
            key={image.src}
            className={`relative h-[270px] w-full shrink-0 overflow-hidden rounded-lg md:h-[332px] xl:flex-1 ${
              i === 1 ? "xl:h-[385px]" : "xl:h-[332px]"
            }`}
          >
            <Image src={image.src} alt={image.alt} fill className="object-cover" />
          </div>
        ))}
      </div>
    </section>
  );
}
