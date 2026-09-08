import { useContent } from "@/hooks/useContent";
import { Hero } from "@/components/Hero";

// Revamped per get_design_context on node 4481:4451/4452: the heading and
// subheading now overlay the background photo directly (breadcrumb pill,
// bold white heading, semibold subheading, gradient scrim) instead of
// sitting below it in navy text — the exact same treatment as the shared
// homepage/`/services` Hero, just with no CTA button in this variant.
// Delegating to <Hero> here (rather than re-implementing the same overlay
// styling a second time) is what makes that "matches the homepage" parity
// automatic instead of two copies to keep in sync.
import type { ServiceContentKey, ServiceInlineHeroContent } from "@/types/content";

export function ServiceInlineHero({ contentKey = "serviceBlinds", content }: { contentKey?: ServiceContentKey; content?: ServiceInlineHeroContent } = {}) {
  const { breadcrumb, heading, subheading, backgroundImage } = content ?? useContent(contentKey).hero;

  return (
    <Hero
      breadcrumb={breadcrumb}
      heading={heading}
      subheading={subheading}
      backgroundImage={backgroundImage}
      ctaLabel=""
      ctaHref=""
    />
  );
}
