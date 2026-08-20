import { Building2, Hotel, SquareActivity, PaperBag, type LucideIcon } from "lucide-react";
import { useContent } from "@/hooks/useContent";

// No "use client" here on purpose: no state or event handlers, so per the
// project's server-first rule this stays a plain Server Component.
//
// Eyebrow + heading + paragraph (side-by-side at xl, stacked below it) above
// a 4-card grid (Office Buildings / Hospitality & Hotels / Healthcare
// Facilities / Multi-Family & Retail), each with a lucide icon in a navy
// circle. Confirmed via get_design_context on "Desktop Commercial" node
// 2220:843's "Frame 151" (desktop), and the matching sections on this
// page's own confirmed Tablet (2870:1639) and Mobile (2870:1827) frames —
// unlike the Service Inline 2 page, this page has real dedicated
// tablet/mobile frames of its own, so no layout is borrowed from elsewhere.
//
// All 4 icon layers are literally named "lucide/building-2",
// "lucide/hotel", "lucide/square-activity", "lucide/paper-bag" in the Figma
// file, and all 4 exist verbatim as lucide-react exports (Building2, Hotel,
// SquareActivity, PaperBag) — real icon-name matches, not name-only
// guesses, so real lucide components are used instead of the raw SVG assets.
const ICONS: Record<string, LucideIcon> = {
  Building2,
  Hotel,
  SquareActivity,
  PaperBag,
};

export function CommercialPlaces() {
  const { eyebrow, headingPrefix, headingHighlight, description, cards } = useContent("commercialPage").places;

  return (
    <section className="flex flex-col items-center px-4 pt-[100px] pb-14 md:px-6 md:pb-16 xl:px-0 xl:pt-[120px] xl:pb-[100px]">
      <div className="flex w-full flex-col items-start gap-10 rounded-lg bg-ice px-4 py-20 md:px-6 xl:w-[1360px] xl:gap-16 xl:px-10">
        <div className="flex w-full flex-col items-start gap-4">
          <div className="flex items-center justify-center rounded-lg border border-navy-light-active p-2">
            <p className="whitespace-nowrap text-center font-mono text-[11px] leading-[16px] tracking-[1.1px] text-black uppercase">
              {eyebrow}
            </p>
          </div>
          <div className="flex w-full flex-col items-start gap-4 xl:flex-row xl:items-start xl:justify-between">
            <p className="w-full font-heading text-[36px] font-semibold leading-[44px] tracking-[-0.1296px] text-navy xl:max-w-[619px]">
              {headingPrefix}
              <span className="text-teal">{headingHighlight}</span>
            </p>
            <p className="w-full text-[16px] leading-[23px] text-black xl:max-w-[575px]">{description}</p>
          </div>
        </div>

        <div className="flex w-full flex-col items-start gap-6 xl:flex-row xl:flex-wrap xl:items-center xl:justify-center">
          {cards.map((card, i) => {
            const Icon = ICONS[card.icon];
            const isFirst = i === 0;
            return (
              <div
                key={card.title}
                className={`flex w-full shrink-0 items-center justify-center gap-2.5 rounded-lg bg-white p-6 xl:h-[136px] xl:w-[627px] ${
                  isFirst
                    ? "border border-navy/28 xl:border-0"
                    : "backdrop-blur-[11.25px]"
                }`}
              >
                <div className="flex flex-1 flex-col items-start gap-2 text-navy">
                  <p className="w-full font-heading text-[22px] font-semibold leading-[32px] tracking-[-0.0792px]">{card.title}</p>
                  <p className="w-full text-[16px] leading-[23px]">{card.description}</p>
                </div>
                <div className="flex size-[72px] shrink-0 items-center justify-center rounded-full bg-navy">
                  <Icon className="size-10 text-white" strokeWidth={1.5} />
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
