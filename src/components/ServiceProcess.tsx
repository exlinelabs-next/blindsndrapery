"use client";

import { useEffect, useRef, useState } from "react";
import Image from "next/image";
import { useContent } from "@/hooks/useContent";

const STEP_HEIGHT = 466;
const ANIMATION_DURATION = 6600;
const KEYFRAME_TIMES = [0, 0.1805, 0.3367, 0.4992, 0.5901, 0.7719, 0.8628, 1];
const KEYFRAME_VALUES = [0, 0, -STEP_HEIGHT, -STEP_HEIGHT, -STEP_HEIGHT * 2, -STEP_HEIGHT * 2, -STEP_HEIGHT * 3, -STEP_HEIGHT * 3];

function getY(progress: number): number {
  for (let i = 0; i < KEYFRAME_TIMES.length - 1; i++) {
    if (progress >= KEYFRAME_TIMES[i] && progress <= KEYFRAME_TIMES[i + 1]) {
      const segProgress =
        (progress - KEYFRAME_TIMES[i]) /
        (KEYFRAME_TIMES[i + 1] - KEYFRAME_TIMES[i]);
      const from = KEYFRAME_VALUES[i];
      const to = KEYFRAME_VALUES[i + 1];
      if (from === to) return from;
      const eased = segProgress < 0.5
        ? 4 * segProgress * segProgress * segProgress
        : 1 - Math.pow(-2 * segProgress + 2, 3) / 2;
      return from + (to - from) * eased;
    }
  }
  return KEYFRAME_VALUES[KEYFRAME_VALUES.length - 1];
}

export function ServiceProcess() {
  const { eyebrow, headingPrefix, headingHighlight, headingSuffix, description, steps } =
    useContent("servicePage").howItWorks;
  const [y, setY] = useState(0);
  const rafRef = useRef<number>(0);
  const startRef = useRef<number>(0);

  useEffect(() => {
    function tick(ts: number) {
      if (!startRef.current) startRef.current = ts;
      const elapsed = (ts - startRef.current) % ANIMATION_DURATION;
      const progress = elapsed / ANIMATION_DURATION;
      setY(getY(progress));
      rafRef.current = requestAnimationFrame(tick);
    }
    rafRef.current = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(rafRef.current);
  }, []);

  return (
    <section className="bg-navy flex flex-col gap-14 px-4 py-14 md:gap-16 md:px-12 md:py-16 xl:gap-20 xl:px-20 xl:py-[100px]">
      <div className="flex flex-col items-center gap-4">
        <div className="flex items-center justify-center rounded-[8px] border border-navy-light-active p-2">
          <p className="whitespace-nowrap text-center font-mono text-[11px] uppercase leading-[16px] tracking-[1.1px] text-white">
            {eyebrow}
          </p>
        </div>
        <h2 className="w-full max-w-[678px] text-center font-heading text-[36px] font-semibold leading-[44px] tracking-[-0.1296px] text-white">
          {headingPrefix}
          <span className="text-teal">{headingHighlight}</span>
          {headingSuffix}
        </h2>
        <p className="w-full text-center text-[16px] leading-[23px] text-white">
          {description}
        </p>
      </div>

      <div className="h-[426px] overflow-hidden">
        <div
          className="flex flex-col gap-10"
          style={{ transform: `translateY(${y}px)` }}
        >
          {steps.map((step) => (
            <div
              key={step.number}
              className="flex flex-col gap-6 xl:flex-row xl:items-center xl:gap-10"
            >
              <div className="flex flex-col gap-6 text-white xl:w-[571px] xl:shrink-0">
                <div className="font-heading text-[28px] font-semibold leading-[42px] tracking-[-0.1008px]">
                  <p className="text-teal">{step.number}</p>
                  <p>{step.title}</p>
                </div>
                <p className="max-w-[522px] text-[16px] leading-[23px]">
                  {step.description}
                </p>
              </div>
              <div className="relative h-[426px] w-full overflow-hidden rounded-[8px] xl:flex-1">
                <Image
                  src={step.image.src}
                  alt={step.image.alt}
                  fill
                  className="object-cover"
                />
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
