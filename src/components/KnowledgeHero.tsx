import { useContent } from "@/hooks/useContent";

export function KnowledgeHero() {
  const { heading, subtitle } = useContent("knowledgeBasePage");

  return (
    <section className="px-8 pt-16 md:px-12 xl:px-20 xl:pt-20">
      <h1 className="font-heading text-[32px] font-bold leading-[40px] tracking-[-0.5376px] text-navy md:text-[40px] md:leading-[52px] xl:text-[48px] xl:leading-[64px]">
        {heading}
      </h1>
      <p className="mt-[10px] font-heading text-[18px] font-semibold leading-[27px] tracking-[-0.0648px] text-navy md:text-[20px] md:leading-[30px] xl:text-[22px] xl:leading-[32px]">
        {subtitle}
      </p>
    </section>
  );
}
