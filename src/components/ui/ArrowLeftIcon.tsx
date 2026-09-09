import type { SVGProps } from "react";

// The exact back-arrow glyph the user provided (Downloads/Vector-6.svg) for
// the mobile/tablet nav drawer's "back to Level 1" button, in place of
// lucide's ChevronLeft — a full arrow with shaft, not just a chevron. The
// source file's `stroke="black"` is swapped for `currentColor`, same
// convention as ArrowRightIcon. No width/height set here on purpose — size
// is controlled by the caller's className.
export function ArrowLeftIcon(props: SVGProps<SVGSVGElement>) {
  return (
    <svg viewBox="0 0 12 12" fill="none" xmlns="http://www.w3.org/2000/svg" {...props}>
      <path
        d="M11 6H1M6 11L1 6L6 1"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}
