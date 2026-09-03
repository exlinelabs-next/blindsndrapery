import Image from "next/image";
import { useContent } from "@/hooks/useContent";
import { Button } from "@/components/ui/Button";
import type { CommercialContent } from "@/types/content";

export function Commercial({ content }: { content?: CommercialContent }) {
  const { eyebrow, heading, subheading, body, ctaLabel, ctaHref, image } = content ?? useContent("commercial");

  return (
    // Outer margin around the navy card is 8px on mobile (not the original
    // p-5/20px), widening to 20px from `md` up (matching desktop, already
    // verified) — confirmed via the card frame's own inset on both mobile
    // and tablet metadata. Card image height is a flat 464px at every
    // breakpoint (not scaled down), same "no font/asset scaling" pattern
    // found everywhere else in this file.
    <section className="p-2 md:p-5">
      <div className="flex w-full flex-col items-start gap-10 rounded-2xl bg-navy p-8 md:gap-14 md:p-14 xl:flex-row xl:items-center xl:gap-16 xl:p-20">
        <div className="flex w-full flex-1 flex-col items-start gap-4">
          <div className="flex items-center justify-center rounded-lg border border-navy-light-active p-2">
            <p className="whitespace-nowrap text-center font-mono text-[11px] leading-[16px] tracking-[1.1px] text-white uppercase">
              {eyebrow}
            </p>
          </div>
          <div className="flex w-full flex-col items-start gap-6">
            <h2 className="w-full font-heading text-[36px] font-semibold leading-[44px] tracking-[-0.1296px] text-white">
              {heading}
            </h2>
            {subheading && (
              <p className="w-full font-heading text-[22px] font-semibold leading-[32px] tracking-[-0.0792px] text-white">
                {subheading}
              </p>
            )}
            <p className="w-full text-[16px] leading-[23px] text-white">{body}</p>
            <Button href={ctaHref}>{ctaLabel}</Button>
          </div>
        </div>
        <div className="relative h-[464px] w-full shrink-0 overflow-hidden rounded-lg xl:w-[665px]">
          {/* TODO: temporary Figma asset URL, expires ~7 days — export and commit to public/images/home/commercial/ before then. */}
          <Image src={image.src} alt={image.alt} fill sizes="(min-width: 1024px) 665px, 100vw" className="object-cover" />
        </div>
      </div>
    </section>
  );
}
