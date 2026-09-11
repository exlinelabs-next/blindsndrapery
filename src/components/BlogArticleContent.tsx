import Image from "next/image";
import { RichText } from "@/components/ui/RichText";
import type { BlogArticlePageContent, BlogContentBlock } from "@/types/content";

function IntroBlock({
  block,
}: {
  block: Extract<BlogContentBlock, { type: "intro" }>;
}) {
  return (
    <div className="flex flex-col gap-8 xl:flex-row xl:gap-12">
      <div className="flex flex-col gap-[23px] text-[16px] leading-[23px] text-navy xl:w-[425px] xl:shrink-0">
        <RichText paragraphs={block.paragraphs} />
      </div>
      <div className="relative aspect-[4/3] w-full overflow-hidden rounded-lg xl:flex-1 xl:self-stretch xl:aspect-auto">
        <Image
          src={block.image.src}
          alt={block.image.alt}
          fill
          className="object-cover"
        />
      </div>
    </div>
  );
}

function HeadingBlock({
  block,
}: {
  block: Extract<BlogContentBlock, { type: "heading" }>;
}) {
  return (
    <h2 className="font-heading text-[18px] font-semibold leading-[27px] tracking-[-0.0648px] text-navy">
      {block.text}
    </h2>
  );
}

function TextBlock({
  block,
}: {
  block: Extract<BlogContentBlock, { type: "text" }>;
}) {
  return (
    <div className="flex flex-col gap-[23px] text-[16px] leading-[23px] text-navy">
      <RichText paragraphs={block.paragraphs} />
    </div>
  );
}

function PullQuoteBlock({
  block,
}: {
  block: Extract<BlogContentBlock, { type: "pullQuote" }>;
}) {
  return (
    <div className="rounded-lg bg-ice p-6">
      <p className="font-heading text-[15px] font-semibold leading-[27.2px] tracking-[0.56px] text-navy">
        {block.text}
      </p>
    </div>
  );
}

function ImageBlock({
  block,
}: {
  block: Extract<BlogContentBlock, { type: "image" }>;
}) {
  return (
    <div className="relative h-[240px] w-full overflow-hidden rounded-lg md:h-[320px] xl:h-[437px]">
      <Image
        src={block.image.src}
        alt={block.image.alt}
        fill
        className="object-cover"
      />
    </div>
  );
}

export function BlogArticleContent({
  date,
  author,
  readTime,
  title,
  blocks,
}: Omit<BlogArticlePageContent, "breadcrumb" | "heroImage" | "heroBadge">) {
  return (
    <section className="px-8 pt-12 pb-[100px] md:px-12 md:pt-16 xl:px-40 xl:pt-20">
      <div className="flex flex-col items-center justify-between gap-6 md:flex-row xl:gap-0">
        <p className="text-[14px] leading-[16px] tracking-[1.1px] text-navy">
          {date}
        </p>
        <div className="flex items-center gap-4">
          <div className="relative size-16 overflow-hidden rounded-full xl:size-20">
            <Image
              src={author.avatar.src}
              alt={author.avatar.alt}
              fill
              className="object-cover"
            />
          </div>
          <p className="text-[14px] leading-[24px] text-black">
            {author.name}
          </p>
        </div>
        <p className="text-[14px] leading-[16px] tracking-[1.1px] text-navy">
          {readTime}
        </p>
      </div>

      <div className="mx-auto mt-12 flex max-w-[1040px] flex-col gap-12 md:mt-16 xl:mt-16 xl:px-10">
        <h1 className="font-heading text-[28px] font-semibold leading-[36px] tracking-[-0.1296px] text-black md:text-[32px] md:leading-[40px] xl:text-[36px] xl:leading-[44px]">
          {title}
        </h1>

        <div className="flex flex-col gap-12">
          {blocks.map((block, i) => {
            switch (block.type) {
              case "intro":
                return <IntroBlock key={i} block={block} />;
              case "heading":
                return <HeadingBlock key={i} block={block} />;
              case "text":
                return <TextBlock key={i} block={block} />;
              case "pullQuote":
                return <PullQuoteBlock key={i} block={block} />;
              case "image":
                return <ImageBlock key={i} block={block} />;
            }
          })}
        </div>
      </div>
    </section>
  );
}
