import Image from "next/image";
import { RichText } from "@/components/ui/RichText";
import type {
  KnowledgeArticlePageContent,
  KnowledgeContentBlock,
} from "@/types/content";

function SectionBlock({
  block,
}: {
  block: Extract<KnowledgeContentBlock, { type: "section" }>;
}) {
  return (
    <div className="flex flex-col items-start">
      <h2 className="font-heading text-[18px] font-semibold leading-[27px] tracking-[-0.0648px] text-navy">
        {block.heading}
      </h2>
      <div className="mt-4 flex flex-col gap-[23px] text-[16px] leading-[23px] text-navy">
        <RichText paragraphs={block.paragraphs} />
      </div>
    </div>
  );
}

function ImageGridBlock({
  block,
}: {
  block: Extract<KnowledgeContentBlock, { type: "imageGrid" }>;
}) {
  return (
    <div className="grid grid-cols-1 gap-3 md:grid-cols-3">
      {block.images.map((img) => (
        <div
          key={img.alt}
          className="relative h-[240px] overflow-hidden rounded-lg md:h-[280px] xl:h-[359px]"
        >
          <Image
            src={img.src}
            alt={img.alt}
            fill
            sizes="(min-width: 768px) 33vw, 100vw"
            className="object-cover"
          />
        </div>
      ))}
    </div>
  );
}

export function KnowledgeArticleContent({
  categoryTag,
  date,
  readTime,
  title,
  blocks,
}: Omit<KnowledgeArticlePageContent, "breadcrumb" | "heroImage">) {
  return (
    <section className="px-8 pb-[100px] md:px-12 xl:px-20">
      <div className="flex flex-col items-center justify-between gap-4 pt-[22px] md:flex-row xl:px-[60px]">
        <div className="flex items-center justify-center rounded-lg border border-black/36 px-2 py-2">
          <span className="text-[16px] leading-[23px] text-black">
            {categoryTag}
          </span>
        </div>
        <p className="text-[14px] leading-[16px] tracking-[1.1px] text-navy">
          {date}
        </p>
        <p className="text-[14px] leading-[16px] tracking-[1.1px] text-navy">
          {readTime}
        </p>
      </div>

      <div className="mx-auto flex max-w-[1040px] flex-col gap-12 pt-16 md:pt-16 xl:px-10 xl:pt-20">
        <h1 className="font-heading text-[28px] font-semibold leading-[36px] tracking-[-0.1296px] text-black md:text-[32px] md:leading-[40px] xl:text-[36px] xl:leading-[44px]">
          {title}
        </h1>

        <div className="flex flex-col gap-12">
          {blocks.map((block, i) => {
            switch (block.type) {
              case "section":
                return <SectionBlock key={i} block={block} />;
              case "imageGrid":
                return <ImageGridBlock key={i} block={block} />;
            }
          })}
        </div>
      </div>
    </section>
  );
}
