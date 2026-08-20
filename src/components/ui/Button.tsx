import Link from "next/link";
import type { ReactNode } from "react";
import { ArrowRightIcon } from "./ArrowRightIcon";

interface ButtonProps {
  children: ReactNode;
  href?: string;
  type?: "button" | "submit";
  showArrow?: boolean;
  className?: string;
}

// Mirrors the "Button" component instance from Figma exactly (it's reused
// across Hero, How We Work, Commercial, and the quote form in the design,
// so it gets one shared implementation here too instead of four copies):
// teal fill, a 2px translucent-white inner border creating a double-ring
// effect, a soft drop shadow, and a Plus Jakarta Sans SemiBold 15px label.
//
// Hover IS a real variant in the Figma file (node 2394:210, "property1"
// true/false) — not invented. On hover the fill darkens to #56817D (the
// design's own "Accent/Smoky Teal/Normal :hover" value, token
// `--color-teal-pressed`), the outer ring grows from 2px to 5px, and the
// inner content's padding/radius shrink to match (24/14/6 -> 21/11/3) —
// together this reads as the button being pressed inward, with the
// button's total footprint staying exactly the same size. Reproduced
// pixel-for-pixel here rather than a generic hover affordance. On top of
// that, the arrow nudges 3px to the right on hover (user-requested, not
// itself a static Figma variant, but a natural extension of the "press
// forward" feel).
export function Button({ children, href, type = "button", showArrow = true, className }: ButtonProps) {
  const content = (
    <span className="group flex items-center rounded-[8px] bg-teal p-[2px] shadow-[0px_4px_2px_rgba(0,0,0,0.1)] transition-all duration-200 hover:bg-teal-pressed hover:p-[5px]">
      <span className="flex items-center justify-center gap-2 rounded-[6px] border border-white/33 px-6 py-3.5 transition-all duration-200 group-hover:rounded-[3px] group-hover:px-[21px] group-hover:py-[11px]">
        <span className="whitespace-nowrap font-heading text-[15px] font-semibold leading-[27.2px] tracking-[0.56px] text-white">
          {children}
        </span>
        {showArrow && (
          <ArrowRightIcon className="size-[14px] shrink-0 text-white transition-transform duration-200 group-hover:translate-x-[3px]" />
        )}
      </span>
    </span>
  );

  if (href) {
    return (
      <Link href={href} className={className}>
        {content}
      </Link>
    );
  }

  return (
    <button type={type} className={className}>
      {content}
    </button>
  );
}
