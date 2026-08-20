"use client";

import { useState } from "react";
import { useContent } from "@/hooks/useContent";

// This section needs open/closed state per question, so unlike the sibling
// server-first sections it's a Client Component. Behavior: single-open
// accordion (opening one question closes any other), the common UX default
// per the task brief — the Figma source shows every question in one flat
// closed state, giving no signal either way.
export function FAQ() {
  const { eyebrow, heading, categories, items } = useContent("faq");
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  // The Figma heading node is a single text run ("Frequently Asked
  // Questions") with only its last word colored teal — there's no separate
  // highlight field in the mandated `FaqContent` shape (unlike
  // headingPrefix/headingHighlight elsewhere), so the split happens here at
  // render time instead of in content data.
  const words = heading.split(" ");
  const lastWord = words.pop();
  const headingRest = words.join(" ");

  return (
    // Corrected 2026-08-16: outer inset is a unique flat 24px (`px-6`) at
    // every breakpoint through tablet, not the standard 32/48/80 pattern —
    // confirmed via the tablet frame's own card inset.
    <section className="px-6 py-14 md:py-16 xl:px-10 xl:py-[100px]">
      {/* Inner ice-card padding is 24px mobile / 48px tablet / 80px desktop
          (not the 32/80 originally used), and the gap between the heading
          block and the categories/questions row is a flat 40px on every
          confirmed frame, not 32px. */}
      <div className="flex w-full flex-col items-center gap-10 rounded-lg bg-ice p-6 md:p-12 xl:p-20">
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
          {/* Category list: styled to match the Figma state (first item
              black/active, the rest #999) but not wired as a filter. The
              file only contains one set of six questions — no per-category
              content exists behind "Locations", "Our Process", or
              "Timeline" — and get_metadata shows no prototype/interaction
              data on these layers, so they read as a static, decorative
              category list rather than a working filter.

              Corrected 2026-08-16: mobile previously rendered this as a
              wrapped horizontal chip row (`flex-row flex-wrap`, full-width).
              The Figma mobile frame actually shows a narrow VERTICAL list
              (hugging its own content width, not full-width) stacked above
              the questions — the wrapped-chip treatment never existed in
              the source. From `md` up it matches the desktop vertical
              list with a left divider instead of the mobile bottom
              divider. */}
          <div className="flex w-auto flex-col items-start gap-4 border-b-[0.5px] border-black pb-4 font-heading text-[16px] font-semibold leading-[24px] tracking-[-0.0648px] whitespace-nowrap md:shrink-0 md:justify-center md:gap-6 md:border-b-0 md:border-l-[0.5px] md:py-6 md:pb-0 md:pl-4 md:text-[18px] md:leading-[27px]">
            {categories.map((category, i) => (
              <p key={category} className={i === 0 ? "text-black" : "text-white-dark-hover"}>
                {category}
              </p>
            ))}
          </div>

          <div className="flex w-full min-w-0 max-w-full flex-1 flex-col items-start gap-4 xl:w-[700px] xl:flex-none">
            {items.map(({ question, answer }, i) => {
              const isOpen = openIndex === i;

              return (
                <div key={question} className="w-full border-b-[0.5px] border-black/27">
                  {/* No expand/collapse indicator: matches the Figma node
                      exactly (no icon layer exists on any question row).
                      The whole question row stays clickable for the
                      accordion behavior, just without a visual affordance,
                      per design. */}
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
