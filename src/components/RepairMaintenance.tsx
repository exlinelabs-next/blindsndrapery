import { Wrench, type LucideIcon } from "lucide-react";
import { useContent } from "@/hooks/useContent";

// Maps the content-driven `icon` name (a lucide-react export name) to the
// actual component, same pattern as TrustBadges/HowWeWork. Note: the Figma
// source names this layer plainly "Vector" (not "lucide/..."), so it's a
// hand-drawn decorative asset rather than a real Lucide export. Wrench is
// the closest semantic match for a repair/maintenance glyph and mirrors
// the design's silhouette closely enough to stand in for it.
const icons: Record<string, LucideIcon> = {
  Wrench,
};

// No "use client" here on purpose: this section has no state or event
// handlers, so per the project's server-first rule it stays a plain Server
// Component — renders on the server, ships no extra JS to the browser.
export function RepairMaintenance() {
  const { eyebrow, icon, headingPrefix, headingHighlight, headingSuffix, description } =
    useContent("repairMaintenance");
  const Icon = icons[icon];

  return (
    <section className="flex flex-col items-center bg-white px-8 py-14 md:px-12 md:py-16 xl:px-20 xl:py-[100px]">
      <div className="flex w-full max-w-[1280px] flex-col items-center gap-4 rounded-lg bg-white py-10">
        <div className="flex items-center justify-center rounded-lg border border-navy-light-hover p-2">
          <p className="whitespace-nowrap text-center font-mono text-[11px] leading-[16px] tracking-[1.1px] text-black uppercase">
            {eyebrow}
          </p>
        </div>
        <div className="flex w-full flex-col items-center gap-4">
          <div className="flex items-center justify-center">
            {Icon && <Icon className="size-8 text-navy" strokeWidth={1.5} />}
          </div>
          <h2 className="w-full text-center font-heading text-[36px] font-semibold leading-[44px] tracking-[-0.1296px] text-navy">
            {headingPrefix}
            <span className="text-teal">{headingHighlight}</span>
            {headingSuffix}
          </h2>
          <p className="mx-auto w-full max-w-[1148px] text-center text-[16px] leading-[23px] text-black">
            {description}
          </p>
        </div>
      </div>
    </section>
  );
}
