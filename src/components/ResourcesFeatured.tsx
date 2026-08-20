import Image from "next/image";
import { Button } from "./ui/Button";
import { useContent } from "@/hooks/useContent";

export function ResourcesFeatured() {
  const { featured } = useContent("resourcesPage");
  const { badge, category, article } = featured;

  return (
    <section className="px-8 py-12 md:px-12 md:py-16 xl:px-20 xl:py-20">
      <div className="flex flex-col gap-6 xl:flex-row xl:gap-6">
        <div className="relative aspect-[759/487] w-full overflow-hidden rounded-lg xl:h-[487px] xl:w-[759px] xl:shrink-0">
          <Image
            src={article.image.src}
            alt={article.image.alt}
            fill
            className="object-cover"
          />
          <div className="absolute left-6 top-6 flex items-center justify-center rounded-lg bg-navy px-4 py-3">
            <span className="text-[16px] leading-[23px] text-white">
              {badge}
            </span>
          </div>
        </div>

        <div className="flex flex-col justify-between xl:w-[497px] xl:shrink-0">
          <div className="flex flex-col gap-6">
            <div className="flex w-fit items-center justify-center rounded-lg border border-black/36 p-2">
              <span className="text-[16px] leading-[23px] text-black">
                {category}
              </span>
            </div>
            <div className="flex flex-col gap-6">
              <h2 className="font-heading text-[24px] font-semibold leading-[36px] tracking-[-0.1008px] text-black md:text-[28px] md:leading-[42px]">
                {article.title}
              </h2>
              <p className="text-[16px] leading-[23px] text-black">
                {article.description}
              </p>
            </div>
          </div>

          <div className="mt-8 flex flex-col gap-4 xl:mt-0">
            <div className="h-px w-full bg-black/10" />
            <div className="flex items-center justify-between">
              <p className="font-mono text-[14px] uppercase leading-[16px] tracking-[1.1px] text-[#737373]">
                {article.date}
              </p>
              <Button href={article.href}>Read More</Button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
