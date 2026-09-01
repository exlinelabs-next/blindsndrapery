import { useContent } from "@/hooks/useContent";
import type { FreeQuoteProcessContent } from "@/types/content";

export function FreeQuoteProcess({ content }: { content?: FreeQuoteProcessContent }) {
  const { eyebrow, headingPrefix, headingHighlight, subtitle, steps } =
    content ?? useContent("freeQuotePage").process;

  return (
    <section className="bg-ice px-4 py-14 md:px-12 md:py-16 xl:px-20 xl:pb-[100px] xl:pt-20">
      <div className="flex flex-col gap-10">
        <div className="flex flex-col items-center gap-4">
          <div className="flex items-center justify-center rounded-lg border border-navy-light-active p-2">
            <p className="whitespace-nowrap text-center font-mono text-[11px] leading-[16px] tracking-[1.1px] text-black uppercase">
              {eyebrow}
            </p>
          </div>
          <p className="w-full text-center font-heading text-[28px] font-semibold leading-[36px] tracking-[-0.1296px] text-navy md:text-[36px] md:leading-[44px]">
            {headingPrefix}
            <span className="text-teal">{headingHighlight}</span>
          </p>
          <p className="px-4 text-center text-[16px] leading-[23px] text-black md:px-20">
            {subtitle}
          </p>
        </div>

        <div className="flex flex-col gap-4">
          {steps.map((step, i) => (
            <div
              key={step.number}
              className={`flex flex-col gap-4 rounded-lg border bg-white px-6 py-6 md:flex-row md:items-center md:justify-between md:px-10 md:py-6 ${
                i === 0
                  ? "border-[rgba(78,120,117,0.33)] shadow-[0px_4px_2px_rgba(0,0,0,0.05)]"
                  : "border-[rgba(15,30,60,0.08)]"
              }`}
            >
              <div className="flex flex-col gap-2">
                <p className="font-heading text-[22px] font-semibold leading-[32px] tracking-[-0.0792px] text-teal">
                  {step.number}
                </p>
                <p className="font-heading text-[18px] font-semibold leading-[27px] tracking-[-0.0648px] text-navy">
                  {step.title}
                </p>
              </div>
              <div className="flex flex-col gap-2 md:w-[557px] md:shrink-0">
                <p className="text-[16px] leading-[23px] text-black">
                  {step.description}
                </p>
                <div className="h-px w-full bg-[rgba(15,30,60,0.08)]" />
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
