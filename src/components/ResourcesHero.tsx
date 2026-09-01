import { useContent } from "@/hooks/useContent";

export function ResourcesHero({ heading: headingProp, description: descProp }: { heading?: string; description?: string }) {
  const fallback = useContent("resourcesPage");
  const heading = headingProp ?? fallback.heading;
  const description = descProp ?? fallback.description;

  return (
    <section className="px-8 pt-16 md:px-12 xl:px-20 xl:pt-20">
      <h1 className="font-heading text-[32px] font-bold leading-[40px] tracking-[-0.5376px] text-navy md:text-[40px] md:leading-[52px] xl:text-[48px] xl:leading-[64px]">
        {heading}
      </h1>
      <p className="mt-[10px] text-[16px] leading-[23px] text-navy">
        {description}
      </p>
    </section>
  );
}
