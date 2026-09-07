import Image from "next/image";
import { useContent } from "@/hooks/useContent";
import type { AboutInstallationContent } from "@/types/content";

export function AboutInstallation({ content }: { content?: AboutInstallationContent }) {
  const { eyebrow, heading, description, features } =
    content ?? useContent("aboutPage").installation;

  return (
    <section className="px-8 pb-[100px] md:px-12 xl:px-20">
      <div className="flex flex-col items-center gap-10 overflow-hidden rounded-lg bg-ice px-6 py-16 md:px-10 xl:px-[40px] xl:py-[80px]">
        <div className="flex w-full flex-col items-center gap-4">
          <div className="flex items-center justify-center rounded-lg border border-navy-light-active p-2">
            <p className="whitespace-nowrap text-center font-mono text-[11px] leading-[16px] tracking-[1.1px] text-black">
              {eyebrow}
            </p>
          </div>
          <h2 className="w-full text-center font-heading text-[24px] font-semibold leading-[32px] tracking-[-0.1008px] text-navy md:text-[28px] md:leading-[42px]">
            {heading}
          </h2>
          <p className="max-w-[866px] text-center text-[16px] leading-[23px] text-black">
            {description}
          </p>
        </div>
        <div className="mx-auto flex w-full flex-col gap-4 xl:max-w-[1184px] xl:flex-row xl:items-center">
          {features.map((feature, i) => (
            <div
              key={feature.label}
              className={`flex items-center gap-2.5 rounded-lg border px-4 py-4 ${
                i === 0
                  ? "border-navy bg-navy"
                  : "border-[rgba(15,30,60,0.23)] bg-white"
              } ${i === 0 ? "h-[72px] w-full xl:w-[297px] xl:shrink-0" : "h-[60px] xl:flex-1"}`}
            >
              <div className="relative size-[24px] shrink-0">
                <Image src={feature.icon.src} alt={feature.icon.alt} fill className="object-contain" />
              </div>
              <p
                className={`font-heading text-[16px] font-semibold leading-[27px] tracking-[-0.0648px] xl:text-[18px] ${
                  i === 0 ? "text-white" : "text-navy"
                }`}
              >
                {feature.label}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
