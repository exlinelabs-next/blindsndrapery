import type { SVGProps } from "react";

// The exact arrow glyph from the Figma Button component ("Vector",
// referenced inside node 2394:210), provided directly by the user
// (Downloads/Vector-4.svg) rather than approximated with a lucide icon —
// lucide's ArrowRight has a slightly different stroke geometry. The
// source file's `stroke="white"` is swapped for `currentColor` so it
// still inherits color from its parent (`text-white` etc.), matching how
// every other icon in this project is styled. No width/height attributes
// are set here on purpose — size is controlled entirely by the caller's
// className (e.g. `size-[14px]`), same convention as the lucide icons
// used elsewhere.
export function ArrowRightIcon(props: SVGProps<SVGSVGElement>) {
  return (
    <svg viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg" {...props}>
      <path
        d="M0.875 7.875L14.875 7.875M7.875 14.875L14.875 7.875L7.875 0.875"
        stroke="currentColor"
        strokeWidth="1.75"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}
