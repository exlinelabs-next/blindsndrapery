import { ServiceInlineHero } from "@/components/ServiceInlineHero";
import { SubServicesGrid } from "@/components/SubServicesGrid";
import { AboutMaterials } from "@/components/AboutMaterials";
import { ServiceTimeline } from "@/components/ServiceTimeline";
import { ConsultationCTA } from "@/components/ConsultationCTA";
import { FAQ } from "@/components/FAQ";
import { useContent } from "@/hooks/useContent";
import type { ServiceContentKey } from "@/types/content";

export function ServiceTemplate({ contentKey }: { contentKey: ServiceContentKey }) {
  const { subServices, howItWorksHeader, cta } = useContent(contentKey);

  return (
    <main>
      <ServiceInlineHero contentKey={contentKey} />
      {subServices && <SubServicesGrid content={subServices} />}
      <AboutMaterials contentKey={contentKey} />
      <section className="flex flex-col items-center px-4 pb-14 md:px-12 md:pb-16 xl:px-20 xl:pb-[100px]">
        <div className="flex w-full flex-col items-center gap-10">
          <div className="flex w-full flex-col items-center justify-center gap-4">
            <div className="flex items-center justify-center rounded-lg border border-navy-light-active p-2">
              <p className="whitespace-nowrap text-center font-mono text-[11px] leading-[16px] tracking-[1.1px] text-black uppercase">
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
      <ServiceTimeline contentKey={contentKey} />
      <ConsultationCTA content={cta} />
      <FAQ />
    </main>
  );
}
