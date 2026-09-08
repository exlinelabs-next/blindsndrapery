import Image from "next/image";
import { Breadcrumb } from "@/components/Breadcrumb";
import type { KnowledgeArticlePageContent } from "@/types/content";

export function KnowledgeArticleHero({
  breadcrumb,
  heroImage,
}: Pick<KnowledgeArticlePageContent, "breadcrumb" | "heroImage">) {
  return (
    <section className="relative h-[300px] w-full md:h-[420px] xl:h-[546px]">
      <Image
        src={heroImage.src}
        alt={heroImage.alt}
        fill
        className="rounded-lg object-cover"
      />
      <div className="absolute inset-0 flex items-center justify-center">
        <div className="flex items-center justify-center rounded-lg bg-white p-3 backdrop-blur-[25px]">
          <span className="font-mono text-[11px] leading-[16px] tracking-[1.1px] text-navy">
            <Breadcrumb trail={breadcrumb} />
          </span>
        </div>
      </div>
    </section>
  );
}
