"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import Image from "next/image";
import { useContent } from "@/hooks/useContent";
import { RichText } from "@/components/ui/RichText";
import type { ServiceHowItWorksContent } from "@/types/content";

// How long to ignore further wheel/touch deltas after a step change, so
// triggers land further apart and one physical scroll gesture (which fires
// many wheel events on a trackpad, or one continuous touchmove) advances
// exactly one step instead of several.
const STEP_COOLDOWN_MS = 1100;
const WHEEL_DELTA_THRESHOLD = 10;
const TOUCH_DELTA_THRESHOLD = 60;
// Extra scroll track beyond one viewport height, so the sticky panel has
// room to visually settle in/out at the pin boundaries instead of snapping,
// and so a single fast scroll gesture can't carry enough raw scroll
// distance to blow past the whole pinned section in one go.
const RELEASE_TRACK_PX = 500;
// Same duration/easing as the transition segments of the original
// Figma timer-driven slide (cubic-bezier(0.4,0,0.2,1), ~600ms per step).
const SLIDE_EASING = "600ms cubic-bezier(0.4, 0, 0.2, 1)";
const SLIDE_TRANSITION = `transform ${SLIDE_EASING}`;
// Height also animates (rows aren't a uniform height once descriptions are
// unclamped), so the visible-window box resizes in step with the slide.
const HEIGHT_TRANSITION = `height ${SLIDE_EASING}`;

export function ServiceProcess({ content }: { content?: ServiceHowItWorksContent }) {
  const fallback = useContent("servicePage").howItWorks;
  const { eyebrow, headingPrefix, headingHighlight, headingSuffix, description, steps } = content ?? fallback;

  const [activeIndex, setActiveIndex] = useState(0);
  const activeIndexRef = useRef(activeIndex);
  const wrapperRef = useRef<HTMLDivElement | null>(null);
  const stickyRef = useRef<HTMLDivElement | null>(null);
  const stackRef = useRef<HTMLDivElement | null>(null);
  const lastStepTimeRef = useRef(0);
  const touchStartYRef = useRef<number | null>(null);

  const [stepHeights, setStepHeights] = useState<number[]>([]);
  const [rowGap, setRowGap] = useState(0);
  const [sectionHeight, setSectionHeight] = useState<number | null>(null);

  useEffect(() => {
    activeIndexRef.current = activeIndex;
  }, [activeIndex]);

  // Measure every step row's own rendered height (not just the first) so
  // the slide offset and visible-window height stay correct even when
  // steps wrap to different numbers of lines — with unclamped descriptions
  // at every breakpoint (per Figma), row heights are no longer uniform, so
  // multiplying a single "row height" by the index drifts further out of
  // alignment with every step and visibly overlaps neighboring rows.
  useEffect(() => {
    const measure = () => {
      const stack = stackRef.current;
      if (!stack) return;
      setRowGap(parseFloat(getComputedStyle(stack).rowGap || "0"));
      setStepHeights(Array.from(stack.children).map((el) => (el as HTMLElement).getBoundingClientRect().height));
    };
    measure();
    window.addEventListener("resize", measure);
    return () => window.removeEventListener("resize", measure);
  }, [steps.length]);

  // The pinned/sticky panel is `min-h-dvh`, not a fixed `h-dvh` — once
  // descriptions are unclamped its rendered height can exceed one viewport
  // on shorter screens. `position: sticky` only stays pinned for as long as
  // its containing block (this section) is taller than the sticky element
  // itself, so a section height that assumes the sticky panel is always
  // exactly one viewport tall silently eats into RELEASE_TRACK_PX — on
  // some breakpoints that leaves too little (or no) capture window for the
  // wheel/touch handlers below to ever fire, which reads as "scrolling
  // through this section does nothing." Measuring the panel's actual
  // height and sizing the section to it + RELEASE_TRACK_PX keeps that
  // capture window constant regardless of how tall the content gets.
  useEffect(() => {
    const el = stickyRef.current;
    if (!el) return;
    const update = () => setSectionHeight(el.offsetHeight + RELEASE_TRACK_PX);
    update();
    const ro = new ResizeObserver(update);
    ro.observe(el);
    window.addEventListener("resize", update);
    return () => {
      ro.disconnect();
      window.removeEventListener("resize", update);
    };
  }, []);

  const activeRowHeight = stepHeights[activeIndex] || undefined;
  const slideOffset = stepHeights.slice(0, activeIndex).reduce((sum, h) => sum + h + rowGap, 0);

  // True exactly while the sticky panel is pinned to the top of the
  // viewport — i.e. the wrapper's top has reached the viewport top but its
  // bottom hasn't scrolled past yet. Outside this window we don't touch
  // scrolling at all.
  const isPinned = useCallback(() => {
    const el = wrapperRef.current;
    if (!el) return false;
    const rect = el.getBoundingClientRect();
    return rect.top <= 0 && rect.bottom > window.innerHeight;
  }, []);

  const advance = useCallback(
    (direction: 1 | -1) => {
      const now = Date.now();
      if (now - lastStepTimeRef.current < STEP_COOLDOWN_MS) return;
      lastStepTimeRef.current = now;
      setActiveIndex((i) => Math.min(Math.max(i + direction, 0), steps.length - 1));
    },
    [steps.length],
  );

  useEffect(() => {
    const atBoundary = (direction: 1 | -1) =>
      direction > 0 ? activeIndexRef.current === steps.length - 1 : activeIndexRef.current === 0;

    const onWheel = (e: WheelEvent) => {
      if (!isPinned()) return;
      const direction: 1 | -1 = e.deltaY > 0 ? 1 : -1;
      if (atBoundary(direction)) return; // let native scroll release past the section
      // Hold the scroll position for every event while pinned, regardless of
      // delta size — otherwise a stream of small trackpad ticks (each below
      // the trigger threshold) would each slip a little native scroll
      // through, letting the page creep past the section without ever
      // showing every step.
      e.preventDefault();
      if (Math.abs(e.deltaY) < WHEEL_DELTA_THRESHOLD) return;
      advance(direction);
    };

    const onTouchStart = (e: TouchEvent) => {
      touchStartYRef.current = e.touches[0]?.clientY ?? null;
    };

    const onTouchMove = (e: TouchEvent) => {
      const startY = touchStartYRef.current;
      const currentY = e.touches[0]?.clientY;
      if (startY === null || currentY === undefined) return;
      if (!isPinned()) return;
      const delta = startY - currentY; // positive: finger moved up -> scroll-down intent
      const direction: 1 | -1 = delta >= 0 ? 1 : -1;
      if (atBoundary(direction)) return; // let native scroll release past the section
      // Same reasoning as the wheel handler: always capture the gesture
      // while pinned so no native scroll leaks through mid-sequence.
      e.preventDefault();
      if (Math.abs(delta) < TOUCH_DELTA_THRESHOLD) return;
      advance(direction);
      touchStartYRef.current = currentY;
    };

    const onTouchEnd = () => {
      touchStartYRef.current = null;
    };

    window.addEventListener("wheel", onWheel, { passive: false });
    window.addEventListener("touchstart", onTouchStart, { passive: true });
    window.addEventListener("touchmove", onTouchMove, { passive: false });
    window.addEventListener("touchend", onTouchEnd, { passive: true });
    return () => {
      window.removeEventListener("wheel", onWheel);
      window.removeEventListener("touchstart", onTouchStart);
      window.removeEventListener("touchmove", onTouchMove);
      window.removeEventListener("touchend", onTouchEnd);
    };
  }, [isPinned, advance, steps.length]);

  // Catch fast scrolling that bypasses the wheel/touch capture zone.
  // A single native scroll event's distance is decided before the wheel
  // handler above ever runs — a fast flick or a burst of trackpad
  // momentum can carry the page from fully outside the pinned range to
  // deep inside it (or all the way through it) in one jump, in either
  // scroll direction, since isPinned() is only checked once at dispatch
  // time. This listener runs after every scroll and, whenever it finds
  // the section went from not-pinned to pinned in a single jump, clamps
  // back to the boundary that was just crossed — so the section is
  // always entered at its edge instead of the user landing deep inside
  // it (which is what reads as a sudden, unrequested "snap").
  useEffect(() => {
    let prevScrollY = window.scrollY;
    let wasPinned = isPinned();

    const onScroll = () => {
      const el = wrapperRef.current;
      if (!el) return;
      const scrollY = window.scrollY;
      const goingDown = scrollY > prevScrollY;
      prevScrollY = scrollY;

      const rect = el.getBoundingClientRect();
      const nowPinned = rect.top <= 0 && rect.bottom > window.innerHeight;

      // Reset carousel when section is completely out of view so the
      // next forward traversal starts from step 1.
      if (rect.bottom < 0 || rect.top > window.innerHeight) {
        if (activeIndexRef.current !== 0) setActiveIndex(0);
        wasPinned = false;
        return;
      }

      if (nowPinned && !wasPinned) {
        const enterTopY = rect.top + scrollY; // scrollY at which the wrapper's top edge reaches the viewport top
        const enterBottomY = enterTopY + el.offsetHeight - window.innerHeight; // scrollY at which the wrapper's bottom edge reaches the viewport bottom
        window.scrollTo(0, goingDown ? enterTopY + 1 : enterBottomY - 1);
      }
      wasPinned = nowPinned;
    };

    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, [isPinned, steps.length]);

  return (
    <section
      ref={wrapperRef}
      className="relative z-[51] bg-navy"
      style={{ height: sectionHeight ? `${sectionHeight}px` : `calc(100dvh + ${RELEASE_TRACK_PX}px)` }}
    >
      <div
        ref={stickyRef}
        className="sticky top-0 flex min-h-dvh flex-col items-center justify-center gap-6 px-4 py-8 md:gap-10 md:px-12 md:py-10 xl:gap-[80px] xl:px-20 xl:py-[100px]"
      >
        <div className="flex shrink-0 flex-col items-center gap-4">
          <div className="flex items-center justify-center rounded-[8px] border border-navy-light-active p-2">
            <p className="whitespace-nowrap text-center font-mono text-[11px] leading-[16px] tracking-[1.1px] text-white">
              {eyebrow}
            </p>
          </div>
          <h2 className="w-full max-w-[678px] text-center font-heading text-[36px] leading-[44px] font-semibold tracking-[-0.1296px] text-white">
            {headingPrefix}
            <span className="text-teal">{headingHighlight}</span>
            {headingSuffix}
          </h2>
          <RichText paragraphs={description} className="w-full text-center text-[16px] leading-[23px] text-white" />
        </div>

        <div
          className="w-full max-w-[1280px] shrink-0 overflow-hidden"
          style={{ height: activeRowHeight, transition: HEIGHT_TRANSITION }}
        >
          <div
            ref={stackRef}
            className="flex flex-col gap-10"
            style={{ transform: `translateY(${-slideOffset}px)`, transition: SLIDE_TRANSITION }}
          >
            {steps.map((step) => (
              <div key={step.number} className="flex flex-col gap-10 xl:flex-row xl:items-center">
                <div className="flex flex-col gap-6 text-white xl:w-[571px] xl:shrink-0">
                  <div className="font-heading text-[28px] leading-[42px] font-semibold tracking-[-0.1008px]">
                    <p className="text-teal">{step.number}</p>
                    <p>{step.title}</p>
                  </div>
                  <p className="max-w-[522px] text-[16px] leading-[23px]">
                    {step.description}
                  </p>
                </div>
                <div className="relative h-[426px] w-full shrink-0 overflow-hidden rounded-[8px] xl:flex-1">
                  {step.image.src && <Image src={step.image.src} alt={step.image.alt} fill sizes="(min-width: 1280px) 50vw, 100vw" className="object-cover" />}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
