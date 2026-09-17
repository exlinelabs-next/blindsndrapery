import Image from "next/image";
import { Button } from "./ui/Button";
import { RichText } from "./ui/RichText";
import { useContent } from "@/hooks/useContent";
import type { ConsultationCtaContent } from "@/types/content";

export function ConsultationCTA({ content }: { content?: ConsultationCtaContent } = {}) {
  const fallback = useContent("serviceBlinds").cta;
  const { eyebrow, heading, body, ctaLabel, ctaHref, image } = content ?? fallback;

  return (
    // Outer inset is page-specific, NOT the project's usual px-8/12/20 ramp:
    // confirmed mobile (2902:4959) is px-[16px] pb-[56px], confirmed tablet
    // (2844:4714) is the SAME px-[16px] with pb-[64px] (horizontal inset
    // doesn't grow at this breakpoint here, unlike every other section on
    // this page) — both reproduced exactly (px-4/pb-14 = 16/56px,
    // md:pb-16 = 64px). Desktop's outer inset wasn't itself confirmed in the
    // captured node data (only the inner card's p-[80px] was), so xl:px-20
    // xl:pb-[100px] here follows this project's one consistent desktop
    // last-section convention (FAQ, ServiceTimeline) rather than a guess.
    <section className="px-4 pb-14 md:pb-16 xl:px-20 xl:pb-[100px]">
      <div className="relative w-full overflow-hidden rounded-2xl border border-[rgba(0,180,166,0.32)] bg-[#0f1e3c]">
        {image.src && <Image src={image.src} alt={image.alt} fill sizes="100vw" className="object-cover opacity-[0.16]" />}
        <div className="relative flex w-full flex-col items-start gap-4 px-6 py-20 md:p-20 xl:p-20">
          <div className="flex items-center justify-center rounded-lg bg-[rgba(0,180,166,0.13)] px-3 py-2 backdrop-blur-[43px]">
            <p className="whitespace-nowrap text-center font-heading text-[15px] font-semibold leading-[27.2px] tracking-[0.56px] text-white">
              {eyebrow}
            </p>
          </div>
          <div className="flex w-full flex-col items-start gap-6">
            <h2 className="w-full font-heading text-[36px] font-semibold leading-[44px] tracking-[-0.1296px] text-white">
              {heading}
            </h2>
            <RichText paragraphs={body} className="w-full text-[16px] leading-[23px] text-white" />
            <Button href={ctaHref}>{ctaLabel}</Button>
          </div>
        </div>
      </div>
    </section>
  );
}
