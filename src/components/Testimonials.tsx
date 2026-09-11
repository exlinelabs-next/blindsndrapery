import Image from "next/image";
import { useContent } from "@/hooks/useContent";
import { RichText } from "@/components/ui/RichText";
import type { TestimonialsContent } from "@/types/content";

export function Testimonials({ content }: { content?: TestimonialsContent }) {
  const mock = useContent("testimonials");
  const { eyebrow, headingSegments, description } = content ?? mock;
  const testimonials = content?.testimonials?.length ? content.testimonials : mock.testimonials;

  return (
    <section className="flex flex-col items-start gap-12 px-8 py-14 md:gap-14 md:px-12 md:py-16 xl:gap-16 xl:px-20 xl:py-[100px]">
      <div className="flex w-full flex-col items-start gap-4">
        {eyebrow && (
          <div className="flex items-center justify-center rounded-lg border border-navy-light-active p-2">
            <p className="whitespace-nowrap text-center font-mono text-[11px] leading-[16px] tracking-[1.1px] text-black">
              {eyebrow}
            </p>
          </div>
        )}
        <h2 className="w-full font-heading text-[36px] font-semibold leading-[44px] tracking-[-0.1296px] text-navy">
          {headingSegments.map((seg, i) => (
            <span key={i} className={seg.emphasis ? "text-teal" : undefined}>
              {seg.text}
            </span>
          ))}
        </h2>
        <RichText paragraphs={description} className="w-full text-[16px] leading-[23px] text-black" />
      </div>

      {testimonials.length > 0 && (
        <>
          {/* Mobile/tablet: horizontally scrollable cards */}
          <div className="flex w-full flex-col gap-6 xl:hidden">
            <div className="flex gap-6 overflow-x-auto">
              {testimonials.map((testimonial, i) => {
                return (
                  <div key={`mobile-${i}`} className="flex w-[326px] shrink-0 flex-col gap-2 md:w-[672px]">
                    <div className="flex w-full items-center justify-center rounded-[8px] bg-teal-hover p-6 md:h-[224px]">
                      <div className="flex w-full flex-col items-start gap-1.5">
                        <p className="font-heading text-[28px] font-semibold leading-[42px] tracking-[-0.1008px] text-black">
                          &ldquo;
                        </p>
                        <p className="w-full font-heading text-[18px] font-semibold leading-[27px] tracking-[-0.0648px] text-black">
                          {testimonial.quote}
                        </p>
                      </div>
                    </div>
                    <div className="flex h-[88px] w-full flex-col items-start justify-center rounded-[8px] border border-black/12 bg-white px-4 py-3">
                      <div className="flex w-full items-center justify-start gap-[13px]">
                        <Image
                          src={testimonial.avatar.src}
                          alt={testimonial.avatar.alt}
                          width={64}
                          height={64}
                          className="size-16 shrink-0 rounded-full object-cover"
                        />
                        <div className="flex flex-col items-start">
                          <p className="whitespace-nowrap text-[16px] leading-[23px] text-black">{testimonial.authorName}</p>
                          <p className="whitespace-nowrap text-[12px] leading-normal text-black">{testimonial.authorLocation}</p>
                        </div>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>

          {/* Desktop: one column per testimonial, alternating quote/author order */}
          <div className="hidden w-full xl:flex xl:items-start xl:gap-4">
            {testimonials.map((testimonial, i) => {
              const quoteOnTop = i % 2 === 0;

              const quoteBlock = (
                <div className="flex h-[326px] w-full items-center justify-center rounded-lg bg-teal-hover p-6">
                  <div className="flex w-[256px] flex-col items-end gap-1.5">
                    <p className="font-heading text-[28px] font-semibold leading-[42px] tracking-[-0.1008px] text-black">
                      &ldquo;
                    </p>
                    <p className="w-full font-heading text-[18px] font-semibold leading-[27px] tracking-[-0.0648px] text-black">
                      {testimonial.quote}
                    </p>
                  </div>
                </div>
              );

              const authorBlock = (
                <div className="flex h-[88px] w-full flex-col items-start justify-center rounded-lg border border-black/12 bg-white px-4 py-3">
                  <div className="flex w-full items-center justify-start gap-[13px]">
                    <Image
                      src={testimonial.avatar.src}
                      alt={testimonial.avatar.alt}
                      width={64}
                      height={64}
                      className="size-16 shrink-0 rounded-full object-cover"
                    />
                    <div className="flex flex-col items-start">
                      <p className="whitespace-nowrap text-[16px] leading-[23px] text-black">{testimonial.authorName}</p>
                      <p className="whitespace-nowrap text-[12px] leading-normal text-black">{testimonial.authorLocation}</p>
                    </div>
                  </div>
                </div>
              );

              return (
                <div key={i} className="flex h-[422px] flex-1 flex-col gap-2">
                  {quoteOnTop ? (
                    <>
                      {quoteBlock}
                      {authorBlock}
                    </>
                  ) : (
                    <>
                      {authorBlock}
                      {quoteBlock}
                    </>
                  )}
                </div>
              );
            })}
          </div>
        </>
      )}
    </section>
  );
}
