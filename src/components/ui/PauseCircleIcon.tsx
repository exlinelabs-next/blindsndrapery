import type { SVGProps } from "react";

// Companion to PlayCircleIcon for the video panel's toggle button. Figma
// (node 2722:1409) only specifies the play state; this reuses the same
// translucent black circle plus the same white fill/opacity/stroke
// treatment on two bars in place of the triangle, so the two states read
// as one consistent button rather than mixing a custom glyph with a
// lucide icon.
export function PauseCircleIcon(props: SVGProps<SVGSVGElement>) {
  return (
    <svg viewBox="0 0 64 64" fill="none" xmlns="http://www.w3.org/2000/svg" {...props}>
      <rect width="64" height="64" rx="32" fill="black" fillOpacity="0.34" />
      <rect x="22.5" y="19" width="7" height="26" rx="1.5" fill="white" fillOpacity="0.17" stroke="white" />
      <rect x="34.5" y="19" width="7" height="26" rx="1.5" fill="white" fillOpacity="0.17" stroke="white" />
    </svg>
  );
}
