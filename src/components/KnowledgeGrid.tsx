import { Button } from "./ui/Button";
import { useContent } from "@/hooks/useContent";

export function KnowledgeGrid() {
  const { articles } = useContent("knowledgeBasePage");

  return (
    <section className="px-8 py-12 pb-[100px] md:px-12 md:py-16 xl:px-20 xl:py-20 xl:pb-[100px]">
      <div className="grid grid-cols-1 gap-6 md:grid-cols-2 xl:grid-cols-3">
        {articles.map((article) => (
          <div
            key={article.title}
            className="flex flex-col items-start gap-6 rounded-lg bg-ice px-8 py-10"
          >
            <div className="flex items-center justify-center rounded-lg bg-black/[0.19] px-3 py-2 backdrop-blur-[43px]">
              <span className="text-[16px] leading-[23px] text-black">
                {article.category}
              </span>
            </div>
            <div className="flex flex-1 flex-col gap-6">
              <h3 className="font-heading text-[22px] font-semibold leading-[32px] text-navy">
                {article.title}
              </h3>
              <p className="text-[16px] leading-[23px] text-navy">
                {article.description}
              </p>
            </div>
            <Button href={article.href}>Read More</Button>
          </div>
        ))}
      </div>
    </section>
  );
}
