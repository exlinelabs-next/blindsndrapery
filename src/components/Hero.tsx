import Image from "next/image";
import { useContent } from "@/hooks/useContent";
import { Button } from "@/components/ui/Button";

interface HeroProps {
  // Optional breadcrumb pill shown above the heading (e.g. "HOME >
  // SERVICES") — only the "/services" hub page uses this (node "3008:1526"
  // in Figma); the homepage hero has no breadcrumb. Kept as a prop rather
  // than a field on the shared `HeroContent` type so the homepage's
  // `<Hero />` call is unaffected — the caller supplies it from its own
  // page-specific content instead.
  breadcrumb?: string;
  // Added 2026-08-17 for the "/commercial" page, which reuses this same
  // full-bleed-photo-with-overlaid-text Hero pattern but with its own
  // heading/subheading/CTA/background image (confirmed via get_design_context
  // on "Desktop Commercial" node 2220:843 — visually identical structure to
  // the shared Hero, just different content). All optional and default to
  // the shared `hero` content object below, so the homepage/`/services`
  // callers (which don't pass these) are completely unaffected.
  heading?: string;
  subheading?: string;
  ctaLabel?: string;
  ctaHref?: string;
  backgroundImage?: { src: string; alt: string };
  // Also added for "/commercial": that page's CONFIRMED mobile frame uses a
  // distinct named text style ("Heading/H1 - Mobile", 32px/42px) for its H1
  // — smaller than the 48px/64px used at every breakpoint everywhere else in
  // this project, including this same page's own tablet/desktop frames.
  // This is a real, confirmed exception to the project's general "no
  // font-size scaling across breakpoints" rule (verified via
  // get_design_context on the mobile frame specifically, not assumed) —
  // gated behind this flag so the homepage/`/services` Hero (confirmed NOT
  // to scale) keeps its default unscaled behavior.
  headingScalesOnMobile?: boolean;
}

// No "use client" here on purpose: this section has no state or event
// handlers, so per the project's server-first rule it stays a plain Server
// Component — renders on the server, ships no extra JS to the browser.
export function Hero({
  breadcrumb,
  heading: headingOverride,
  subheading: subheadingOverride,
  ctaLabel: ctaLabelOverride,
  ctaHref: ctaHrefOverride,
  backgroundImage: backgroundImageOverride,
  headingScalesOnMobile = false,
}: HeroProps = {}) {
  const defaults = useContent("hero");
  const heading = headingOverride ?? defaults.heading;
  const subheading = subheadingOverride ?? defaults.subheading;
  const ctaLabel = ctaLabelOverride ?? defaults.ctaLabel;
  const ctaHref = ctaHrefOverride ?? defaults.ctaHref;
  const backgroundImage = backgroundImageOverride ?? defaults.backgroundImage;

  return (
    // Section height is a flat 700px on every confirmed frame (mobile,
    // tablet, and the original desktop) — it does NOT shrink on smaller
    // screens, only the text below reflows within it. Also true for every
    // text style below except the H1 (see `headingScalesOnMobile` above):
    // Figma uses the exact same type ramp (H1 48/64, H3 22/32) at all three
    // breakpoints — nothing else scales down, so no other responsive
    // text-size classes here on purpose.
    <section className="relative flex h-[700px] items-end overflow-hidden">
      <Image src={backgroundImage.src} alt={backgroundImage.alt} fill priority className="object-cover" />
      {/* Exact gradient from the Figma node: transparent to rgba(44,40,53,0.84) */}
      <div
        className="absolute inset-0"
        style={{
          backgroundImage: "linear-gradient(180deg, rgba(0, 0, 0, 0) 6.8%, rgba(44, 40, 53, 0.84) 100%)",
        }}
      />
      <div className="relative z-10 flex w-full flex-col gap-4 px-8 pb-12 md:px-12 xl:px-20 xl:pb-16">
        {breadcrumb && (
          <div className="flex w-fit items-center justify-center rounded-lg bg-[#e7e9ec] p-3 backdrop-blur-[25px]">
            <p className="whitespace-nowrap text-center font-mono text-[11px] leading-[16px] tracking-[1.1px] text-navy uppercase">
              {breadcrumb}
            </p>
          </div>
        )}
        <h1
          className={`w-full font-heading font-bold tracking-[-0.5376px] text-white xl:max-w-5xl ${
            headingScalesOnMobile ? "text-[32px] leading-[42px] md:text-[48px] md:leading-[64px]" : "text-[48px] leading-[64px]"
          }`}
        >
          {heading}
        </h1>
        <div className="flex flex-col items-start gap-6">
          <p className="w-full font-heading text-[22px] font-semibold leading-[32px] tracking-[-0.0792px] text-white xl:max-w-3xl">
            {subheading}
          </p>
          <Button href={ctaHref}>{ctaLabel}</Button>
        </div>
      </div>
    </section>
  );
}
