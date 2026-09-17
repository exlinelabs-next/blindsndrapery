import Image from "next/image";
import { Button } from "./ui/Button";
import { Breadcrumb } from "@/components/Breadcrumb";
import { useContent } from "@/hooks/useContent";
import type { AboutHeroContent } from "@/types/content";

export function AboutHero({ content }: { content?: AboutHeroContent }) {
  const { breadcrumb, heading, subheading, ctaLabel, ctaHref, backgroundImage } =
    content ?? useContent("aboutPage").hero;

  return (
    <section className="relative h-[600px] w-full overflow-hidden md:h-[650px] xl:h-[722px]">
      <Image
        src={backgroundImage.src}
        alt={backgroundImage.alt}
        fill
        priority
        fetchPriority="high"
        sizes="100vw"
        className="object-cover"
      />
      <div
        className="absolute inset-0"
        style={{
          backgroundImage:
            "linear-gradient(180deg, rgba(0,0,0,0) 6.8%, rgba(44,40,53,0.8) 100%)",
        }}
      />
      <div className="absolute bottom-0 left-0 right-0 flex flex-col items-start px-8 pb-10 md:px-12 xl:px-20 xl:pb-16">
        <div className="flex w-fit items-center justify-center rounded-lg bg-[#e7e9ec] p-3 backdrop-blur-[25px]">
          <p className="whitespace-nowrap text-center font-mono text-[11px] leading-[16px] tracking-[1.1px] text-navy">
            <Breadcrumb trail={breadcrumb} />
          </p>
        </div>
        <h1 className="mt-[10px] font-heading text-[36px] font-bold leading-[44px] tracking-[-0.5376px] text-white md:text-[42px] md:leading-[52px] xl:text-[48px] xl:leading-[64px]">
          {heading}
        </h1>
        <p className="mt-[10px] font-heading text-[18px] font-semibold leading-[27px] tracking-[-0.0792px] text-white md:text-[20px] md:leading-[30px] xl:text-[22px] xl:leading-[32px]">
          {subheading}
        </p>
        <Button href={ctaHref} className="mt-6">{ctaLabel}</Button>
      </div>
    </section>
  );
}
