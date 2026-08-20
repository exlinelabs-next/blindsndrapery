import Image from "next/image";
import { useContent } from "@/hooks/useContent";

export function BlogArticleHero() {
  const { breadcrumb, heroImage, heroBadge } = useContent("blogArticlePage");

  return (
    <section className="bg-[#dce7e6] px-8 py-12 md:px-12 md:py-16 xl:p-20">
      <div className="flex flex-col items-center gap-8 md:gap-10 xl:gap-12 xl:w-[1280px] xl:mx-auto">
        <div className="flex items-center justify-center rounded-lg bg-white/100 px-3 py-2 backdrop-blur-[25px]">
          <span className="font-mono text-[11px] uppercase leading-[16px] tracking-[1.1px] text-navy">
            {breadcrumb}
          </span>
        </div>
        <div className="relative h-[240px] w-full overflow-hidden rounded-lg md:h-[380px] xl:h-[546px]">
          <Image
            src={heroImage.src}
            alt={heroImage.alt}
            fill
            className="object-cover"
          />
          <div className="absolute left-6 top-6 flex items-center justify-center rounded-lg bg-navy px-4 py-3">
            <span className="text-[16px] leading-[23px] text-white">
              {heroBadge}
            </span>
          </div>
        </div>
      </div>
    </section>
  );
}
