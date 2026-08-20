import Image from "next/image";
import { Button } from "./ui/Button";
import { useContent } from "@/hooks/useContent";

export function ResourcesGrid() {
  const { articles } = useContent("resourcesPage");

  return (
    <section className="px-8 pb-[100px] md:px-12 xl:px-20">
      <div className="flex flex-col gap-10 md:flex-row md:gap-6 xl:gap-12">
        {articles.map((article) => (
          <div
            key={article.title}
            className="flex flex-1 flex-col gap-4"
          >
            <div className="relative aspect-[616/390] w-full overflow-hidden rounded-lg">
              <Image
                src={article.image.src}
                alt={article.image.alt}
                fill
                className="object-cover"
              />
            </div>
            <div className="flex flex-col gap-4">
              <h3 className="font-heading text-[20px] font-semibold leading-[30px] tracking-[-0.0792px] text-black md:text-[22px] md:leading-[32px]">
                {article.title}
              </h3>
              <p className="text-[16px] leading-[23px] text-black">
                {article.description}
              </p>
            </div>
            <div className="flex flex-col gap-4">
              <div className="h-px w-full bg-black/10" />
              <div className="flex items-center justify-between">
                <p className="text-[16px] leading-[23px] text-black">
                  {article.date}
                </p>
                <Button href={article.href}>Read More</Button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
