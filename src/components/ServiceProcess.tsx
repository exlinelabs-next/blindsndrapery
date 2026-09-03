"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import Image from "next/image";
import { useContent } from "@/hooks/useContent";
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
const SLIDE_TRANSITION = "transform 600ms cubic-bezier(0.4, 0, 0.2, 1)";

export function ServiceProcess({ content }: { content?: ServiceHowItWorksContent }) {
  const { eyebrow, headingPrefix, headingHighlight, headingSuffix, description, steps } =
    content ?? useContent("servicePage").howItWorks;

  const [activeIndex, setActiveIndex] = useState(0);
  const activeIndexRef = useRef(activeIndex);
  const wrapperRef = useRef<HTMLDivElement | null>(null);
  const stackRef = useRef<HTMLDivElement | null>(null);
  const lastStepTimeRef = useRef(0);
  const touchStartYRef = useRef<number | null>(null);

  const [rowHeight, setRowHeight] = useState(0);

  useEffect(() => {
    activeIndexRef.current = activeIndex;
  }, [activeIndex]);

  // Measure the rendered height of one step row (+ gap) so the sliding
  // window and slide distance adapt to any breakpoint automatically,
  // instead of a hardcoded pixel constant.
  useEffect(() => {
    const measure = () => {
      const stack = stackRef.current;
      const first = stack?.children[0] as HTMLElement | undefined;
      if (!stack || !first) return;
      const gap = parseFloat(getComputedStyle(stack).rowGap || "0");
      setRowHeight(first.getBoundingClientRect().height + gap);
    };
    measure();
    window.addEventListener("resize", measure);
    return () => window.removeEventListener("resize", measure);
  }, [steps.length]);

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
  // A single high-velocity scroll tick can jump the section from "not
  // pinned" to "past the pin zone" so the wheel handler never sees
  // isPinned() === true and can't preventDefault. This listener detects
  // the overshoot and snaps back to the pin point.
  useEffect(() => {
    let prevScrollY = window.scrollY;

    const onScroll = () => {
      const el = wrapperRef.current;
      if (!el) return;
      const scrollY = window.scrollY;
      const goingDown = scrollY > prevScrollY;
      prevScrollY = scrollY;

      const rect = el.getBoundingClientRect();

      // Reset carousel when section is completely out of view so the
      // next forward traversal starts from step 1.
      if (rect.bottom < 0 || rect.top > window.innerHeight) {
        if (activeIndexRef.current !== 0) setActiveIndex(0);
        return;
      }

      // Downward bypass: section top is above viewport but bottom is
      // nearing/past viewport bottom — carousel hasn't finished.
      if (
        goingDown &&
        rect.top < 0 &&
        rect.bottom > 0 &&
        rect.bottom < window.innerHeight &&
        activeIndexRef.current < steps.length - 1
      ) {
        const pinY = rect.top + scrollY;
        window.scrollTo(0, pinY + 1);
      }
    };

    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, [steps.length]);

  return (
    <section ref={wrapperRef} className="relative z-[51] bg-navy" style={{ height: `calc(100dvh + ${RELEASE_TRACK_PX}px)` }}>
      <div className="sticky top-0 flex h-dvh flex-col items-center justify-center gap-6 overflow-hidden px-4 py-8 md:gap-10 md:px-12 md:py-10 xl:gap-[80px] xl:px-20 xl:py-[100px]">
        <div className="flex shrink-0 flex-col items-center gap-2 md:gap-4">
          <div className="flex items-center justify-center rounded-[8px] border border-navy-light-active p-1.5 md:p-2">
            <p className="whitespace-nowrap text-center font-mono text-[10px] uppercase leading-[14px] tracking-[1.1px] text-white md:text-[11px] md:leading-[16px]">
              {eyebrow}
            </p>
          </div>
          <h2 className="w-full max-w-[678px] text-center font-heading text-[22px] font-semibold leading-[28px] tracking-[-0.1296px] text-white md:text-[30px] md:leading-[38px] xl:w-[678px] xl:text-[36px] xl:leading-[44px]">
            {headingPrefix}
            <span className="text-teal">{headingHighlight}</span>
            {headingSuffix}
          </h2>
          <p className="line-clamp-2 w-full text-center text-[13px] leading-[18px] text-white md:line-clamp-none md:text-[15px] md:leading-[21px] xl:text-[16px] xl:leading-[23px]">
            {description}
          </p>
        </div>

        <div className="w-full max-w-[1280px] shrink-0 overflow-hidden" style={{ height: rowHeight || undefined }}>
          <div
            ref={stackRef}
            className="flex flex-col gap-6 md:gap-8 xl:gap-10"
            style={{ transform: `translateY(${-rowHeight * activeIndex}px)`, transition: SLIDE_TRANSITION }}
          >
            {steps.map((step) => (
              <div key={step.number} className="flex flex-col gap-3 md:flex-row md:items-center md:gap-6 xl:gap-10">
                <div className="flex flex-col gap-2 text-white md:w-[300px] md:shrink-0 md:gap-4 xl:w-[571px] xl:gap-6">
                  <div className="font-heading text-[18px] font-semibold leading-[24px] tracking-[-0.1008px] md:text-[22px] md:leading-[32px] xl:text-[28px] xl:leading-[42px]">
                    <p className="text-teal">{step.number}</p>
                    <p>{step.title}</p>
                  </div>
                  <p className="line-clamp-3 max-w-[522px] text-[13px] leading-[18px] md:line-clamp-none md:text-[15px] md:leading-[21px] xl:text-[16px] xl:leading-[23px]">
                    {step.description}
                  </p>
                </div>
                <div className="relative h-[160px] w-full shrink-0 overflow-hidden rounded-[8px] md:h-[220px] xl:h-[426px] xl:flex-1">
                  {step.image.src && <Image src={step.image.src} alt={step.image.alt} fill className="object-cover" />}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
