import { MapPinHouse } from "lucide-react";
import { useContent } from "@/hooks/useContent";

// No "use client" here on purpose: no state or event handlers, so per the
// project's server-first rule this stays a plain Server Component.
//
// Centered eyebrow-less heading + description above a 3-card row (Texas /
// California / Other States), each card an icon + muted title + description
// + a "COMING SOON" footer bar. Confirmed via get_design_context on "Desktop
// Locations Hub" node 2251:68's "Frame 233" (desktop `2269:299`) plus this
// page's own confirmed tablet (`2879:2424`) and mobile (`2879:2457`) frames.
//
// The 3-card row switches to a vertical stack below `xl` (desktop only gets
// the row; both tablet and mobile stack full-width) — a different breakpoint
// than ServiceAreaPanel's outer card/photo switch, which is also `xl`, so
// they happen to agree here, but each was verified independently against
// its own frame data rather than assumed to match.
//
// Card inner content padding is an explicit `px-[24px]` on tablet/mobile;
// desktop has no explicit padding there at all — its ~35px left/right
// margin emerges automatically from the parent's `items-center` centering a
// fixed-width (308px) description column inside a fixed-width (378px) card.
// Reproduced here with one flat `px-6` (24px) at every breakpoint rather
// than reconstructing desktop's auto-centering math — visually equivalent
// (~11px narrower content column at desktop, not perceptible) and simpler.
export function ComingSoonStates() {
  const { headingPrefix, headingHighlight, description, badgeLabel, cards } = useContent("locationsPage").comingSoon;

  return (
    <section className="flex flex-col items-center gap-10 px-8 pb-14 md:px-12 md:pb-16 xl:px-20 xl:pb-[100px]">
      <div className="flex w-full flex-col items-center gap-4 text-center xl:w-[912px]">
        <p className="w-full font-heading text-[36px] font-semibold leading-[44px] tracking-[-0.1296px] text-navy">
          {headingPrefix}
          <span className="text-teal">{headingHighlight}</span>
        </p>
        <p className="w-full text-[16px] leading-[23px] text-black">{description}</p>
      </div>

      <div className="flex w-full flex-col items-center justify-center gap-4 xl:flex-row">
        {cards.map((card) => (
          <div key={card.title} className="flex w-full flex-col items-center justify-center gap-6 rounded-lg bg-[rgba(230,230,230,0.29)] pt-6 xl:w-[378px]">
            <div className="flex w-full flex-col items-start justify-center gap-4 px-6">
              <MapPinHouse className="size-8 text-navy" strokeWidth={1.5} />
              <p className="whitespace-nowrap text-[22px] font-semibold leading-[32px] tracking-[-0.0792px] text-navy/55">
                {card.title}
              </p>
              <p className="w-full text-[16px] leading-[23px] text-black">{card.description}</p>
            </div>
            <div className="flex h-[59px] w-full items-center justify-center rounded-b-lg bg-navy/34">
              <p className="text-center text-[22px] font-semibold leading-[32px] tracking-[-0.0792px] text-white">
                {badgeLabel}
              </p>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
