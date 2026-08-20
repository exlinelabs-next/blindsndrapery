import { useContent } from "@/hooks/useContent";

export function LegalContent() {
  const { heading, paragraphs } = useContent("legalPage");

  return (
    <section className="px-8 py-16 pb-[100px] md:px-12 xl:px-20 xl:py-20 xl:pb-[100px]">
      <h1 className="font-heading text-[32px] font-bold leading-[40px] tracking-[-0.5376px] text-navy md:text-[40px] md:leading-[52px] xl:text-[48px] xl:leading-[64px]">
        {heading}
      </h1>
      <div className="mt-6 flex flex-col gap-[23px] text-[16px] leading-[23px] text-navy">
        {paragraphs.map((p) => (
          <p key={p.substring(0, 30)}>{p}</p>
        ))}
      </div>
    </section>
  );
}
