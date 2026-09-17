"use client";

import { useEffect, useRef, useState } from "react";
import Image from "next/image";
import { motion, useReducedMotion, type Easing } from "motion/react";
import { useContent } from "@/hooks/useContent";
import { RichText } from "@/components/ui/RichText";

// This section needs runtime row-height measurement + a client-only
// animation loop, so unlike the project's server-first sections it has to
// opt into the client runtime.
//
// Motion: pulled verbatim from Figma's own motion export (get_motion_context
// on node "2692:2", the "Scroller") — a 6.6s loop that holds on each of the
// 4 steps, then eases up to the next one, repeating forever. TIMES/EASE are
// copied byte-for-byte from that export; only the pixel *distance* per step
// is computed at runtime instead of hardcoded, because it depends on each
// step's actual rendered height, which differs by breakpoint (longer step
// titles wrap to more lines on narrow viewports) — and Figma's own
// mobile/tablet mockup for this element only ever captured step 1's layout
// (positions/widths straight-up copied from the 1280px desktop version),
// so there's no confirmed per-breakpoint pixel offset to copy from, unlike
// every other section in this build.
const TIMES = [0, 0.1805, 0.3367, 0.4992, 0.5901, 0.7719, 0.8628, 1];
const EASE: Easing[] = ["linear", [0.4, 0, 0.2, 1], "linear", [0.4, 0, 0.2, 1], "linear", [0.4, 0, 0.2, 1], "linear"];
const DURATION = 6.6;
const ROW_GAP = 40; // px — Figma's "Scroller" flex-col gap, constant across breakpoints

export function ServiceHowItWorks() {
  const { eyebrow, headingPrefix, headingHighlight, headingSuffix, description, steps } =
    useContent("servicePage").howItWorks;
  const rowRefs = useRef<(HTMLDivElement | null)[]>([]);
  const [rowHeights, setRowHeights] = useState<number[]>(() => steps.map(() => 0));
  const prefersReducedMotion = useReducedMotion();

  useEffect(() => {
    const observers = rowRefs.current.map((el, i) => {
      if (!el) return null;
      const observer = new ResizeObserver((entries) => {
        const height = entries[0]?.contentRect.height;
        if (!height) return;
        setRowHeights((prev) => {
          if (prev[i] === height) return prev;
          const next = [...prev];
          next[i] = height;
          return next;
        });
      });
      observer.observe(el);
      return observer;
    });
    return () => observers.forEach((observer) => observer?.disconnect());
  }, [steps.length]);

  const measured = rowHeights.every((h) => h > 0);
  const cumulative = rowHeights.reduce<number[]>((acc, h, i) => {
    acc.push((acc[i - 1] ?? 0) + h + ROW_GAP);
    return acc;
  }, []);
  const yTargets = [0, 0, -cumulative[0], -cumulative[0], -cumulative[1], -cumulative[1], -cumulative[2], -cumulative[2]];
  // Clip-window height keyed to the SAME 8 stops as yTargets (held on a
  // step, then eased to the next). Rows differ in height because titles
  // wrap to different line counts, so a single fixed height (e.g. the max
  // of all rows) leaves a gap under any shorter step — the next row's
  // heading peeks up through that gap. Animating height in lockstep with y
  // means the clip window always matches exactly what's currently in view.
  const heightTargets = rowHeights.flatMap((h) => [h, h]);

  // Reduced motion, or not yet measured: render the full list statically,
  // unclipped — every step stays visible and readable, nothing hidden
  // behind an animation that isn't running. This is also what server-rendered
  // markup looks like before hydration, so there's no flash of a
  // zero-height container on first paint.
  const animate = !prefersReducedMotion && measured;

  return (
    <section className="flex flex-col items-center gap-10 bg-navy px-8 py-14 md:px-12 md:py-16 xl:gap-16 xl:px-20 xl:py-[100px]">
      <div className="flex w-full flex-col items-center gap-4">
        <div className="flex items-center justify-center rounded-lg border border-navy-light-active p-2">
          <p className="whitespace-nowrap text-center font-mono text-[11px] leading-[16px] tracking-[1.1px] text-white">
            {eyebrow}
          </p>
        </div>
        <h2 className="w-full max-w-[678px] text-center font-heading text-[36px] font-semibold leading-[44px] tracking-[-0.1296px] text-white">
          {headingPrefix}
          <span className="text-teal">{headingHighlight}</span>
          {headingSuffix}
        </h2>
        <RichText paragraphs={description} className="w-full max-w-[1148px] text-center text-[16px] leading-[23px] text-white" />
      </div>

      <motion.div
        className="w-full"
        style={{ overflow: animate ? "hidden" : "visible" }}
        animate={animate ? { height: heightTargets } : { height: "auto" }}
        transition={animate ? { height: { duration: DURATION, times: TIMES, ease: EASE, repeat: Infinity } } : { duration: 0 }}
      >
        <motion.div
          className="flex w-full flex-col"
          style={{ gap: ROW_GAP }}
          animate={animate ? { y: yTargets } : { y: 0 }}
          transition={animate ? { y: { duration: DURATION, times: TIMES, ease: EASE, repeat: Infinity } } : { duration: 0 }}
        >
          {steps.map((step, i) => (
            <div
              key={step.number}
              ref={(el) => {
                rowRefs.current[i] = el;
              }}
              className="flex w-full flex-col items-start gap-6 xl:flex-row xl:items-center xl:gap-10"
            >
              <div className="flex w-full flex-col items-start gap-6 text-white xl:w-[571px] xl:shrink-0">
                <p className="font-heading text-[28px] font-semibold leading-[42px] tracking-[-0.1008px]">
                  <span className="text-teal">{step.number}</span>
                  {"     "}
                  {step.title}
                </p>
                <p className="text-[16px] leading-[23px]">{step.description}</p>
              </div>
              {/* Fixed 426px image box. On mobile/tablet (flex-col) this must
                  NOT carry a bare `flex-1` — flex-1 sets flex-basis: 0%,
                  which wins over the explicit h-[426px] on the cross-axis-less
                  main axis of a column flex container, collapsing the box to
                  0 height (confirmed via a real render: rectHeight was 0 for
                  every step image before this fix). flex-1 is only safe at
                  xl, where the row is horizontal and flex-1 governs width. */}
              <div className="relative h-[426px] w-full overflow-hidden rounded-lg xl:flex-1">
                <Image src={step.image.src} alt={step.image.alt} fill sizes="(min-width: 1280px) 50vw, 100vw" className="object-cover" />
              </div>
            </div>
          ))}
        </motion.div>
      </motion.div>
    </section>
  );
}
