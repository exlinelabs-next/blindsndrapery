import Image from "next/image";
import { Navigation } from "lucide-react";
import Link from "next/link";
import { useContent } from "@/hooks/useContent";
import type { ServiceAreaPanelContent } from "@/types/content";

export function ServiceAreaPanel({ content }: { content?: ServiceAreaPanelContent }) {
  const {
    eyebrow,
    headingPrefix,
    headingHighlight,
    description,
    mapImage,
    primaryLink,
    cityLinks,
    photo,
  } = content ?? useContent("locationsPage").serviceArea;

  return (
    <section className="flex flex-col items-center gap-10 px-4 pb-14 pt-[100px] md:px-12 md:pb-16 xl:flex-row xl:gap-6 xl:px-20 xl:pb-[100px]">
      {/* Ice card */}
      <div className="flex w-full flex-col items-start gap-4 overflow-hidden rounded-lg bg-ice px-4 py-10 md:p-10 xl:w-[590px] xl:shrink-0">
        {/* Eyebrow */}
        <div className="flex items-center gap-2">
          <Image
            src="/images/shared/icons/badge-check-filled.svg"
            alt=""
            width={32}
            height={32}
            className="size-8 shrink-0"
          />
          <span className="whitespace-nowrap font-mono text-[11px] leading-[16px] tracking-[1.1px] text-black">
            {eyebrow}
          </span>
        </div>

        <div className="flex w-full flex-col gap-6">
          {/* Heading + map row */}
          <div className="flex w-full flex-col items-center justify-center md:h-[250px] md:flex-row">
            <div className="flex shrink-0 w-full flex-col items-start gap-4 md:w-auto md:flex-1 md:shrink">
              <p className="w-full font-heading text-[36px] font-semibold leading-[44px] tracking-[-0.1296px] text-navy">
                {headingPrefix}
                <span className="text-teal">{headingHighlight}</span>
              </p>
              <p className="w-full text-[16px] leading-[23px] text-black">
                {description}
              </p>
            </div>
            <div className="flex h-[257px] w-[264px] shrink-0 items-center justify-center">
              <div className="flex-none rotate-[-18.77deg]">
                <div className="relative h-[200px] w-[211px] pt-[5px]">
                  <div className="relative aspect-[457/437] w-full overflow-hidden">
                    {/* eslint-disable-next-line @next/next/no-img-element */}
                    <img
                      src={mapImage.src}
                      alt={mapImage.alt}
                      className="absolute inset-0 h-full w-full max-w-none"
                    />
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Link rows */}
          <div className="flex w-full flex-col items-start gap-4">
            <Link
              href={primaryLink.href}
              className="flex w-full items-center gap-[10px] rounded-lg border border-transparent bg-white p-4 transition-all hover:border-teal/33 hover:shadow-[0px_4px_4px_rgba(0,0,0,0.05)]"
            >
              <Navigation
                className="size-[18px] shrink-0 text-navy"
                strokeWidth={1.5}
              />
              <span className="flex-1 font-heading text-[18px] font-semibold leading-[27px] tracking-[-0.0648px] text-navy">
                {primaryLink.label}
              </span>
            </Link>
            {cityLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className="flex w-full items-center gap-[10px] rounded-lg border border-transparent bg-white p-4 transition-all hover:border-teal/33 hover:shadow-[0px_4px_4px_rgba(0,0,0,0.05)]"
              >
                <Navigation
                  className="size-[18px] shrink-0 text-navy"
                  strokeWidth={1.5}
                />
                <span className="flex-1 font-heading text-[18px] font-semibold leading-[27px] tracking-[-0.0648px] text-navy">
                  {link.label}
                </span>
              </Link>
            ))}
          </div>
        </div>
      </div>

      {/* Photo panel */}
      <div className="relative h-[379px] w-full shrink-0 overflow-hidden rounded-lg md:h-[790px] xl:flex-1">
        <Image src={photo.src} alt={photo.alt} fill className="object-cover" />
      </div>
    </section>
  );
}
