import type { SVGProps } from "react";

// The exact centered video-overlay play button from Figma node 2722:1409
// ("Frame 408" inside the ProcessIntro/FreeQuoteProcessIntro video panels) —
// a translucent black circle with a translucent white play triangle, not a
// recolorable single-tone icon like the lucide-style icons elsewhere, so the
// fill/opacity values are fixed rather than driven by currentColor. No
// width/height set on purpose — size is controlled by the caller's className
// (e.g. `size-16`), same convention as the other icons in this folder.
export function PlayCircleIcon(props: SVGProps<SVGSVGElement>) {
  return (
    <svg viewBox="0 0 64 64" fill="none" xmlns="http://www.w3.org/2000/svg" {...props}>
      <rect width="64" height="64" rx="32" fill="black" fillOpacity="0.34" />
      <path
        d="M47.25 29.835C48.9167 30.7972 48.9167 33.2028 47.25 34.165L26.25 46.2891C24.5833 47.2513 22.5 46.0485 22.5 44.124V19.876C22.5 17.9515 24.5833 16.7487 26.25 17.7109L47.25 29.835Z"
        fill="white"
        fillOpacity="0.17"
        stroke="white"
      />
    </svg>
  );
}
