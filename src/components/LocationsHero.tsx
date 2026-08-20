import { useContent } from "@/hooks/useContent";

// No "use client" here on purpose: no state or event handlers, so per the
// project's server-first rule this stays a plain Server Component.
//
// A different Hero pattern from the shared homepage/`/services`/`/commercial`
// Hero: solid navy background (no photo, no gradient), center-aligned text,
// no CTA button. Confirmed via get_design_context on "Desktop Locations Hub"
// node 2251:68's "Frame 153" plus this page's own confirmed tablet
// (2879:1758) and mobile (2879:2011) frames — structurally identical at
// every breakpoint (only horizontal padding changes: desktop px-80, tablet
// px-48, mobile px-32), so this is a single component with no responsive
// branching beyond that padding ramp. Not built as a variant of the shared
// `Hero` component since the visual pattern (no photo, centered vs.
// bottom-left-aligned) is genuinely different, not just a content swap.
//
// Section height is content-driven here (py-80), NOT a flat 700px like the
// shared Hero — confirmed on all 3 breakpoints, a real difference from every
// other Hero-like section in this project.
export function LocationsHero() {
  const { breadcrumb, heading, subheading } = useContent("locationsPage").hero;

  return (
    <section className="flex items-center bg-navy px-8 py-20 md:px-12 xl:px-20">
      <div className="flex w-full flex-1 flex-col items-center gap-4">
        <div className="flex w-fit items-center justify-center rounded-lg bg-[#e7e9ec] p-3 backdrop-blur-[25px]">
          <p className="whitespace-nowrap text-center font-mono text-[11px] leading-[16px] tracking-[1.1px] text-navy uppercase">
            {breadcrumb}
          </p>
        </div>
        <p className="w-full text-center font-heading text-[48px] font-bold leading-[64px] tracking-[-0.5376px] text-white">
          {heading}
        </p>
        <p className="w-full text-center font-heading text-[22px] font-semibold leading-[32px] tracking-[-0.0792px] text-white">
          {subheading}
        </p>
      </div>
    </section>
  );
}
