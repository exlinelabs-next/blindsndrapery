import Image from "next/image";
import { useContent } from "@/hooks/useContent";
import { RichText } from "@/components/ui/RichText";
import type { AboutInstallationContent } from "@/types/content";

const MOBILE_GAP_BELOW: Record<number, string> = {
  0: "mb-6",
  1: "mb-4",
  2: "mb-6",
};

export function AboutInstallation({ content }: { content?: AboutInstallationContent }) {
  const { eyebrow, heading, description, features } =
    content ?? useContent("aboutPage").installation;

  return (
    <section className="flex flex-col items-center gap-10 rounded-lg bg-ice px-[32px] py-[80px] mb-[100px] md:px-[48px] xl:px-[40px]">
      <div className="flex w-full flex-col items-center gap-4">
        <div className="flex items-center justify-center rounded-lg border border-navy-light-active p-2">
          <p className="whitespace-nowrap text-center font-mono text-[11px] uppercase leading-[16px] tracking-[1.1px] text-black">
            {eyebrow}
          </p>
        </div>
        <h2 className="w-full text-center font-heading text-[28px] font-semibold leading-[42px] text-navy">
          {heading}
        </h2>
        <RichText paragraphs={description} className="max-w-[866px] text-center text-[16px] leading-[23px] text-black" />
      </div>
      <div className="flex w-full flex-col md:grid md:grid-cols-2 md:gap-x-[24px] md:gap-y-[32px] xl:mx-auto xl:flex xl:max-w-[1184px] xl:flex-row xl:items-center xl:gap-4">
        {features.map((feature, i) => (
          <div
            key={feature.label}
            className={`group flex min-h-[60px] w-full items-center justify-start gap-2.5 rounded-lg border border-[rgba(15,30,60,0.23)] bg-white p-4 transition-colors duration-200 hover:border-navy hover:bg-navy md:mb-0 md:h-[60px] xl:flex-1 ${
              MOBILE_GAP_BELOW[i] ?? ""
            }`}
          >
            <div className="relative size-[18px] shrink-0">
              <Image src={feature.icon.src} alt={feature.icon.alt} fill className="object-contain" />
            </div>
            <p className="font-heading text-[18px] font-semibold leading-[27px] tracking-[-0.0648px] text-navy transition-colors duration-200 group-hover:text-white md:whitespace-nowrap">
              {feature.label}
            </p>
          </div>
        ))}
      </div>
    </section>
  );
}
