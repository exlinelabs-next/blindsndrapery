"use client";

import { useEffect, useRef, useState } from "react";

// Fixed bottom-right circular scroll-to-top button whose ring fills clockwise
// with overall page scroll progress (0-360deg via a CSS conic-gradient — no
// SVG ring needed). Smoky teal fill over a navy track, matching the brand
// palette. Appears once the page has been scrolled some distance; clicking
// scrolls back to top.
//
// Purely additive: its own rAF-batched, passive scroll/resize listener only
// reads window.scrollY/document height and writes local state, so it can't
// interfere with the Header's scroll-hide listener or any other
// scroll-driven effect on the site. z-[52] sits just above ServiceProcess's
// pinned z-[51] section, which would otherwise cover the button.
export function ScrollProgress() {
  const [progress, setProgress] = useState(0);
  const [visible, setVisible] = useState(false);
  const ticking = useRef(false);

  useEffect(() => {
    const update = () => {
      ticking.current = false;
      const scrollTop = window.scrollY;
      const maxScroll = document.documentElement.scrollHeight - window.innerHeight;
      setProgress(maxScroll > 0 ? Math.min(Math.max(scrollTop / maxScroll, 0), 1) : 0);
      setVisible(scrollTop > 400);
    };
    const onScroll = () => {
      if (!ticking.current) {
        ticking.current = true;
        requestAnimationFrame(update);
      }
    };
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onScroll);
    update();
    return () => {
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onScroll);
    };
  }, []);

  const scrollToTop = () => {
    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    window.scrollTo({ top: 0, behavior: reduced ? "auto" : "smooth" });
  };

  const deg = progress * 360;

  return (
    <button
      type="button"
      onClick={scrollToTop}
      aria-label="Scroll to top"
      className={`fixed right-6 bottom-6 z-[52] flex h-[52px] w-[52px] cursor-pointer items-center justify-center rounded-full shadow-[0_4px_16px_rgba(15,30,60,0.25)] outline-[4px] outline-navy-light-active transition-opacity duration-300 ease-out md:right-8 md:bottom-8 ${
        visible ? "opacity-100" : "pointer-events-none opacity-0"
      }`}
      style={{ background: `conic-gradient(var(--color-teal) ${deg}deg, rgba(15,30,60,0.9) ${deg}deg)` }}
    >
      <svg width="22" height="22" viewBox="0 0 109 109" fill="none" aria-hidden="true">
        <path opacity="0.5" fillRule="evenodd" clipRule="evenodd" d="M54.5 94.238C53.5966 94.238 52.7302 93.8791 52.0914 93.2403C51.4526 92.6015 51.0938 91.7351 51.0938 90.8317L51.0938 48.8213L57.9062 48.8213L57.9063 90.8317C57.9063 92.712 56.3803 94.238 54.5 94.238Z" fill="#FFFFFF" />
        <path d="M81.753 48.8232C82.4263 48.8226 83.0842 48.6225 83.6438 48.2482C84.2034 47.8738 84.6396 47.3421 84.8971 46.72C85.1547 46.098 85.2221 45.4136 85.091 44.7532C84.9598 44.0929 84.6358 43.4862 84.1601 43.0098L56.9101 15.7598C56.2714 15.122 55.4057 14.7637 54.503 14.7637C53.6003 14.7637 52.7346 15.122 52.0959 15.7598L24.8459 43.0098C24.3702 43.4862 24.0462 44.0929 23.915 44.7532C23.7839 45.4136 23.8513 46.098 24.1089 46.72C24.3664 47.3421 24.8026 47.8738 25.3622 48.2482C25.9218 48.6225 26.5797 48.8226 27.253 48.8232L81.753 48.8232Z" fill="#FFFFFF" />
      </svg>
    </button>
  );
}
