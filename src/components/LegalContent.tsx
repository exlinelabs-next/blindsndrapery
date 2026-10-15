import { useContent } from "@/hooks/useContent";
import { RichText } from "@/components/ui/RichText";
import type { LegalPageContent } from "@/types/content";

export function LegalContent({ content }: { content?: LegalPageContent }) {
  const { heading, paragraphs, html } = content ?? useContent("legalPage");

  return (
    <section className="px-8 py-16 pb-[100px] md:px-12 xl:px-20 xl:py-20 xl:pb-[100px]">
      <h1 className="font-heading text-[32px] font-bold leading-[40px] tracking-[-0.5376px] text-navy md:text-[40px] md:leading-[52px] xl:text-[48px] xl:leading-[64px]">
        {heading}
      </h1>
      {html ? (
        // Already sanitized server-side in sanitizeLegalHtml (src/lib/api.ts).
        <div className="legal-prose mt-6" dangerouslySetInnerHTML={{ __html: html }} />
      ) : (
        <div className="mt-6 flex flex-col gap-[23px] text-[16px] leading-[23px] text-navy">
          <RichText paragraphs={paragraphs} />
        </div>
      )}
    </section>
  );
}
