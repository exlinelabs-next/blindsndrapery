import Image from "next/image";
import { useContent } from "@/hooks/useContent";
import { RichText } from "@/components/ui/RichText";

// No "use client" here on purpose: this section has no state or event
// handlers, so per the project's server-first rule it stays a plain Server
// Component — renders on the server, ships no extra JS to the browser.
//
// Confirmed via desktop (2189:227), tablet (2840:4053), and mobile
// (2840:4084) metadata: heading and paragraph sit side by side on desktop
// (`justify-between`) but stack (heading above paragraph) on mobile/tablet —
// only the outer row's direction changes, same pattern as several homepage
// sections. The image below is a flat 512px tall on every breakpoint, not
// scaled down.
export function ServiceAbout() {
  const { eyebrow, headingPrefix, headingHighlight, headingSuffix, paragraph, image } =
    useContent("servicePage").about;

  return (
    <section className="flex flex-col items-start gap-10 px-8 py-14 md:px-12 md:py-16 xl:px-20 xl:py-[100px]">
      <div className="flex w-full flex-col items-start gap-4">
        <div className="flex items-center justify-center rounded-lg border border-navy-light-hover p-2">
          <p className="whitespace-nowrap font-mono text-[11px] leading-[16px] tracking-[1.1px] text-black">
            {eyebrow}
          </p>
        </div>
        <div className="flex w-full flex-col items-start gap-6 xl:flex-row xl:items-center xl:justify-between xl:gap-10">
          <h2 className="w-full font-heading text-[36px] font-semibold leading-[44px] tracking-[-0.1296px] text-navy xl:max-w-[553px]">
            {headingPrefix}
            <span className="text-teal">{headingHighlight}</span>
            {headingSuffix}
          </h2>
          <RichText paragraphs={paragraph} className="w-full text-[16px] leading-[23px] text-black xl:max-w-[607px]" />
        </div>
      </div>
      <div className="relative h-[512px] w-full overflow-hidden rounded-lg">
        {/* TODO: temporary Figma asset URL, expires ~7 days — export and commit to public/images/services/ before then. */}
        <Image src={image.src} alt={image.alt} fill sizes="100vw" className="object-cover" />
      </div>
    </section>
  );
}
