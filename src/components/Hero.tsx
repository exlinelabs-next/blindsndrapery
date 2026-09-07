import Image from "next/image";
import { useContent } from "@/hooks/useContent";
import { Button } from "@/components/ui/Button";
import type { HeroContent } from "@/types/content";

interface HeroProps {
  breadcrumb?: string;
  heading?: string;
  subheading?: string;
  ctaLabel?: string;
  ctaHref?: string;
  backgroundImage?: { src: string; alt: string };
  headingScalesOnMobile?: boolean;
  content?: HeroContent;
}

export function Hero({
  breadcrumb,
  heading: headingOverride,
  subheading: subheadingOverride,
  ctaLabel: ctaLabelOverride,
  ctaHref: ctaHrefOverride,
  backgroundImage: backgroundImageOverride,
  headingScalesOnMobile = false,
  content,
}: HeroProps = {}) {
  const defaults = content ?? useContent("hero");
  const heading = headingOverride ?? defaults.heading;
  const subheading = subheadingOverride ?? defaults.subheading;
  const ctaLabel = ctaLabelOverride ?? defaults.ctaLabel;
  const ctaHref = ctaHrefOverride ?? defaults.ctaHref;
  const backgroundImage = backgroundImageOverride ?? defaults.backgroundImage;

  return (
    <section className="relative flex h-[700px] items-end overflow-hidden">
      <Image src={backgroundImage.src} alt={backgroundImage.alt} fill priority sizes="100vw" className="object-cover" />
      <div
        className="absolute inset-0"
        style={{
          backgroundImage: "linear-gradient(180deg, rgba(0, 0, 0, 0) 6.8%, rgba(44, 40, 53, 0.84) 100%)",
        }}
      />
      <div className="relative z-10 flex w-full flex-col gap-4 px-8 pb-12 md:px-12 xl:px-20 xl:pb-16">
        {breadcrumb && (
          <div className="flex w-fit items-center justify-center rounded-lg bg-[#e7e9ec] p-3 backdrop-blur-[25px]">
            <p className="whitespace-nowrap text-center font-mono text-[11px] leading-[16px] tracking-[1.1px] text-navy">
              {breadcrumb}
            </p>
          </div>
        )}
        <h1
          className={`w-full font-heading font-bold tracking-[-0.5376px] text-white xl:max-w-5xl ${
            headingScalesOnMobile ? "text-[32px] leading-[42px] md:text-[48px] md:leading-[64px]" : "text-[48px] leading-[64px]"
          }`}
        >
          {heading}
        </h1>
        <div className="flex flex-col items-start gap-6">
          <p className="w-full font-heading text-[22px] font-semibold leading-[32px] tracking-[-0.0792px] text-white xl:max-w-3xl">
            {subheading}
          </p>
          <Button href={ctaHref}>{ctaLabel}</Button>
        </div>
      </div>
    </section>
  );
}
