"use client";

import { useState } from "react";
import { useContent } from "@/hooks/useContent";
import type { FaqContent } from "@/types/content";

interface FAQProps {
  variant?: "card" | "flat";
  content?: FaqContent;
}

export function FAQ({ variant = "card", content: contentProp }: FAQProps) {
  const { eyebrow, heading, categories, items } = contentProp ?? useContent("faq");
  const [activeCategory, setActiveCategory] = useState(categories[0]);
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  const filteredItems = items.filter((item) => item.category === activeCategory);

  const words = heading.split(" ");
  const lastWord = words.pop();
  const headingRest = words.join(" ");

  return (
    <section className={variant === "card" ? "px-6 py-14 md:py-16 xl:px-10 xl:py-[100px]" : "px-4 py-14 md:px-12 md:py-16 xl:px-10 xl:pb-[100px]"}>
      <div className={`flex w-full flex-col items-center gap-10 ${variant === "card" ? "rounded-lg bg-ice p-6 md:p-12 xl:p-20" : "xl:mx-auto xl:max-w-[1360px] xl:p-20"}`}>
        <div className="flex w-full flex-col items-center justify-center gap-4">
          <div className="flex items-center justify-center rounded-lg border border-navy-light-active p-2">
            <p className="whitespace-nowrap text-center font-mono text-[11px] leading-[16px] tracking-[1.1px] text-black uppercase">
              {eyebrow}
            </p>
          </div>
          <p className="w-full text-center font-heading text-[36px] font-semibold leading-[44px] tracking-[-0.1296px] text-navy">
            {headingRest ? `${headingRest} ` : ""}
            <span className="text-teal">{lastWord}</span>
          </p>
        </div>

        <div className="flex w-full flex-col items-start gap-8 md:flex-row md:items-start md:gap-10 xl:gap-[200px] xl:pl-10">
          <div className="flex w-auto flex-col items-start gap-4 border-b-[0.5px] border-black pb-4 font-heading text-[16px] font-semibold leading-[24px] tracking-[-0.0648px] whitespace-nowrap md:shrink-0 md:justify-center md:gap-6 md:border-b-0 md:border-l-[0.5px] md:py-6 md:pb-0 md:pl-4 md:text-[18px] md:leading-[27px]">
            {categories.map((category) => (
              <button
                key={category}
                type="button"
                onClick={() => {
                  setActiveCategory(category);
                  setOpenIndex(null);
                }}
                className={`text-left ${activeCategory === category ? "text-black" : "text-white-dark-hover"}`}
              >
                {category}
              </button>
            ))}
          </div>

          <div className="flex w-full min-w-0 max-w-full flex-1 flex-col items-start gap-4 xl:w-[700px] xl:flex-none">
            {filteredItems.map(({ question, answer }, i) => {
              const isOpen = openIndex === i;

              return (
                <div key={`${i}-${question}`} className="w-full border-b-[0.5px] border-black/27">
                  <button
                    type="button"
                    onClick={() => setOpenIndex(isOpen ? null : i)}
                    aria-expanded={isOpen}
                    className="flex w-full items-center justify-between gap-4 p-4 text-left"
                  >
                    <span className="font-heading text-[22px] font-semibold leading-[32px] tracking-[-0.0792px] text-black">
                      {question}
                    </span>
                  </button>
                  {isOpen && (
                    <p className="px-4 pb-4 font-body text-[16px] leading-[23px] text-black/70">{answer}</p>
                  )}
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
}
