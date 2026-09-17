"use client";

import { useEffect, useRef, useState } from "react";
import Image from "next/image";
import { useContent } from "@/hooks/useContent";
import { RichText } from "@/components/ui/RichText";
import type { InstallationGalleryContent } from "@/types/content";

// Center-focused peek carousel at xl, modeled on the reference gallery at
// https://staging-velorashades.vercel.app/window-treatments/blinds: only
// the centered image is full height/full opacity, its neighbors are
// shorter and dimmed, easing over ~500ms whenever the centered one
// changes. Unlike the reference (which autoplays), this is manually
// scrollable only — a real horizontally-scrollable snap track (trackpad,
// shift+wheel, or drag-to-scroll via the scrollbar), with whichever image
// is nearest the track's center driving the enlarge/dim state.
//
// Per Figma (node 2227:1453): each image is a fixed 384.667px wide (never
// resized — only height changes between the 332px resting state and the
// 385px enlarged one), gap-[8px] apart, in a 1170px-wide row — exactly 3
// images fit at that width with zero overflow, so a 4th+ image is what
// pushes the row into needing to scroll/slide at all.
//
// Below xl images stack vertically (matching Figma's simple mobile
// layout, no carousel), with the same "nearest center" index marking
// which one is enlarged.
const SLOT_WIDTH_PX = 384.667;

// Autoplay: advance to the next slide every 4s. Any direct user interaction
// with the track (wheel/touch/pointer — there's no visible scrollbar to
// drag) pauses it immediately and restarts a 7s countdown before autoplay
// resumes, per the "manual control always wins, autoplay comes back after
// a pause" behavior requested for this carousel.
const AUTOPLAY_INTERVAL_MS = 4000;
const AUTOPLAY_RESUME_DELAY_MS = 7000;

export function InstallationGallery({ content }: { content?: InstallationGalleryContent }) {
  const { eyebrow, headingPrefix, headingHighlight, headingSuffix, description, images } =
    content ?? useContent("commercialPage").installation;

  const stackRef = useRef<HTMLDivElement | null>(null);
  const trackRef = useRef<HTMLDivElement | null>(null);
  const [stackedActiveIndex, setStackedActiveIndex] = useState(0);
  const [trackActiveIndex, setTrackActiveIndex] = useState(0);

  // Mobile/tablet stacked list: whichever image is closest to the
  // viewport's vertical center is enlarged, live as the page scrolls.
  useEffect(() => {
    const stack = stackRef.current;
    if (!stack) return;

    let ticking = false;
    const update = () => {
      ticking = false;
      const viewportCenter = window.innerHeight / 2;
      let closest = 0;
      let closestDistance = Infinity;
      [...stack.children].forEach((child, i) => {
        const rect = (child as HTMLElement).getBoundingClientRect();
        const center = rect.top + rect.height / 2;
        const distance = Math.abs(center - viewportCenter);
        if (distance < closestDistance) {
          closestDistance = distance;
          closest = i;
        }
      });
      setStackedActiveIndex(closest);
    };

    const onScroll = () => {
      if (ticking) return;
      ticking = true;
      requestAnimationFrame(update);
    };

    update();
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onScroll);
    return () => {
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onScroll);
    };
  }, []);

  // Desktop track: a real horizontally-scrollable snap carousel — whichever
  // slide is nearest the track's own center (not the viewport's) drives
  // the enlarge/dim state as the user manually scrolls it.
  useEffect(() => {
    const track = trackRef.current;
    if (!track) return;

    let ticking = false;
    const update = () => {
      ticking = false;
      const containerRect = track.getBoundingClientRect();
      const containerCenter = containerRect.left + containerRect.width / 2;
      let closest = 0;
      let closestDistance = Infinity;
      [...track.children].forEach((child, i) => {
        const rect = (child as HTMLElement).getBoundingClientRect();
        const center = rect.left + rect.width / 2;
        const distance = Math.abs(center - containerCenter);
        if (distance < closestDistance) {
          closestDistance = distance;
          closest = i;
        }
      });
      setTrackActiveIndex(closest);
    };

    const onScroll = () => {
      if (ticking) return;
      ticking = true;
      requestAnimationFrame(update);
    };

    update();
    track.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onScroll);
    return () => {
      track.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onScroll);
    };
  }, []);

  // Autoplay for the desktop track: advances one slide at a time, paused
  // immediately by any real user interaction with the track, resuming 7s
  // after the last one.
  useEffect(() => {
    const track = trackRef.current;
    if (!track || images.length <= 1) return;

    let autoplayInterval: ReturnType<typeof setInterval> | null = null;
    let resumeTimeout: ReturnType<typeof setTimeout> | null = null;

    const advance = () => {
      const slides = track.children;
      if (slides.length === 0) return;
      const containerRect = track.getBoundingClientRect();
      const containerCenter = containerRect.left + containerRect.width / 2;
      const current = [...slides].findIndex((slide) => {
        const rect = (slide as HTMLElement).getBoundingClientRect();
        return Math.abs(rect.left + rect.width / 2 - containerCenter) < rect.width / 2;
      });
      const next = ((current === -1 ? 0 : current) + 1) % slides.length;
      // Scroll the TRACK only (never scrollIntoView) — scrollIntoView walks
      // up through every scrollable ancestor including the page itself, so
      // it would yank the user's vertical scroll position back to this
      // section even while they're reading something further down the page.
      const nextRect = (slides[next] as HTMLElement).getBoundingClientRect();
      const offset = nextRect.left + nextRect.width / 2 - containerCenter;
      track.scrollTo({ left: track.scrollLeft + offset, behavior: "smooth" });
    };

    const startAutoplay = () => {
      if (autoplayInterval) return;
      autoplayInterval = setInterval(advance, AUTOPLAY_INTERVAL_MS);
    };

    const stopAutoplay = () => {
      if (autoplayInterval) {
        clearInterval(autoplayInterval);
        autoplayInterval = null;
      }
    };

    const handleManualInteraction = () => {
      stopAutoplay();
      if (resumeTimeout) clearTimeout(resumeTimeout);
      // Advance immediately at the 7s mark, then keep going every 4s —
      // otherwise autoplay would silently sit idle for a further 4s after
      // the 7s wait (the first tick of a freshly (re)started interval only
      // fires after a full interval elapses), making it feel like it took
      // 11s to come back instead of the intended 7.
      resumeTimeout = setTimeout(() => {
        advance();
        startAutoplay();
      }, AUTOPLAY_RESUME_DELAY_MS);
    };

    startAutoplay();
    track.addEventListener("wheel", handleManualInteraction, { passive: true });
    track.addEventListener("touchstart", handleManualInteraction, { passive: true });
    track.addEventListener("pointerdown", handleManualInteraction);

    return () => {
      stopAutoplay();
      if (resumeTimeout) clearTimeout(resumeTimeout);
      track.removeEventListener("wheel", handleManualInteraction);
      track.removeEventListener("touchstart", handleManualInteraction);
      track.removeEventListener("pointerdown", handleManualInteraction);
    };
  }, [images.length]);

  return (
    <section className="flex flex-col items-center gap-6 px-8 pt-14 pb-14 md:px-12 md:pt-16 md:pb-16 xl:gap-16 xl:px-20 xl:pt-[100px] xl:pb-[100px]">
      <div className="flex w-full flex-col items-center gap-4 xl:w-[912px]">
        <div className="flex items-center justify-center rounded-lg border border-navy-light-hover p-2">
          <p className="whitespace-nowrap text-center font-mono text-[11px] leading-[16px] tracking-[1.1px] text-black">
            {eyebrow}
          </p>
        </div>
        <p className="w-full text-center font-heading text-[36px] font-semibold leading-[44px] tracking-[-0.1296px] text-navy">
          {headingPrefix}
          <span className="text-teal">{headingHighlight}</span>
          {headingSuffix}
        </p>
        <RichText paragraphs={description} className="w-full text-center text-[16px] leading-[23px] text-black" />
      </div>

      {/* Mobile/tablet: plain stacked list, no carousel. */}
      <div ref={stackRef} className="flex w-full flex-col gap-2 xl:hidden">
        {images.map((image, i) => {
          const isActive = i === stackedActiveIndex;
          return (
            <div
              key={image.src}
              className={`relative w-full shrink-0 overflow-hidden rounded-lg transition-[height] duration-500 ease-out ${
                isActive ? "h-[320px] md:h-[380px]" : "h-[270px] md:h-[332px]"
              }`}
            >
              <Image src={image.src} alt={image.alt} fill sizes="100vw" className="object-cover" />
            </div>
          );
        })}
      </div>

      {/* Desktop: manually-scrollable peek carousel (drag/trackpad/shift+
          wheel — no autoplay, no page-scroll hijacking). Image width never
          changes (384.667px, per Figma); only height toggles between
          332/385 to mark which one is centered. */}
      <div
        ref={trackRef}
        className="hidden w-full snap-x snap-mandatory items-center gap-[8px] overflow-x-auto xl:flex xl:h-[385px] xl:w-[1170px] xl:px-[calc((100%-384.667px)/2)] [-ms-overflow-style:none] [scrollbar-width:none] [&::-webkit-scrollbar]:hidden"
      >
        {images.map((image, i) => {
          const isActive = i === trackActiveIndex;
          return (
            <div key={image.src} className="flex h-[385px] w-[384.667px] shrink-0 snap-center items-center justify-center">
              <div
                className={`relative w-[384.667px] overflow-hidden rounded-lg transition-[height,opacity] duration-500 ease-out ${
                  isActive ? "h-[385px] opacity-100" : "h-[332px] opacity-60"
                }`}
              >
                <Image src={image.src} alt={image.alt} fill sizes="385px" className="object-cover" />
              </div>
            </div>
          );
        })}
      </div>
    </section>
  );
}
