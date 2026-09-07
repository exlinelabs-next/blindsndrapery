import { ServiceInlineHero } from "@/components/ServiceInlineHero";
import { SubServicesGrid } from "@/components/SubServicesGrid";
import { AboutMaterials } from "@/components/AboutMaterials";
import { ServiceTimeline } from "@/components/ServiceTimeline";
import { ConsultationCTA } from "@/components/ConsultationCTA";
import { FAQ } from "@/components/FAQ";
import { useContent } from "@/hooks/useContent";
import type { ServiceContentKey, ServiceInlinePageContent, FaqContent } from "@/types/content";

export function ServiceTemplate({
  contentKey,
  content,
  faqContent,
}: {
  contentKey: ServiceContentKey;
  content?: ServiceInlinePageContent;
  faqContent?: FaqContent;
}) {
  const fallback = content ? undefined : useContent(contentKey);
  const { howItWorksHeader, cta } = content ?? fallback!;
  const subServices = content?.subServices ?? fallback?.subServices;

  return (
    <main>
      <ServiceInlineHero contentKey={contentKey} content={content?.hero} />
      {subServices && <SubServicesGrid content={subServices} />}
      {/* Only the leaf service templates (no sub-categories, e.g. /services/blinds)
          get the navy About section from the Figma "Service Inline 2" spec —
          the category-hub templates that already show a SubServicesGrid
          (e.g. /services/shades) keep this section in its original light style. */}
      <AboutMaterials dark={!subServices} contentKey={contentKey} content={content?.about} />
      <section className="flex flex-col items-center px-4 pt-14 md:px-12 md:pt-16 xl:px-20 xl:pt-[100px]">
        <div className="flex w-full flex-col items-center gap-10">
          <div className="flex w-full flex-col items-center justify-center gap-4">
            <div className="flex items-center justify-center rounded-lg border border-navy-light-active p-2">
              <p className="whitespace-nowrap text-center font-mono text-[11px] leading-[16px] tracking-[1.1px] text-black">
                {howItWorksHeader.eyebrow}
              </p>
            </div>
            <div className="flex w-full flex-col items-start gap-4">
              <p className="w-full text-center font-heading text-[36px] font-semibold leading-[44px] tracking-[-0.1296px] text-navy">
                {howItWorksHeader.headingPrefix}
                <span className="text-teal">{howItWorksHeader.headingHighlight}</span>
              </p>
              <p className="w-full text-center text-[16px] leading-[23px] text-black xl:px-20">
                {howItWorksHeader.subtitle}
              </p>
            </div>
          </div>
        </div>
      </section>
      <ServiceTimeline contentKey={contentKey} content={content?.timeline} />
      <ConsultationCTA content={cta} />
      <FAQ content={faqContent} />
    </main>
  );
}
