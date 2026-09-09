import type { SVGProps } from "react";

// The exact chevron glyph the user provided (Downloads/Vector-5.svg) for the
// mobile/tablet nav drawer's "Services" dropdown indicator, in place of
// lucide's ChevronDown — thinner stroke, shallower angle. The source file's
// `stroke="black"` is swapped for `currentColor`, same convention as
// ArrowRightIcon. No width/height set here on purpose — size is controlled
// by the caller's className.
export function ChevronDownIcon(props: SVGProps<SVGSVGElement>) {
  return (
    <svg viewBox="0 0 14 8" fill="none" xmlns="http://www.w3.org/2000/svg" {...props}>
      <path
        d="M0.75 0.75L6.75 6.75L12.75 0.75"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}
