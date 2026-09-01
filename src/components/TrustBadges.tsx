import { useContent } from "@/hooks/useContent";
import type { TrustBadgesContent } from "@/types/content";

export function TrustBadges({ content }: { content?: TrustBadgesContent }) {
  const { items } = content ?? useContent("trustBadges");

  return (
    <section className="flex items-center justify-center gap-6 bg-navy px-20 py-[38px] md:justify-between xl:py-14">
      {items.map(({ icon, label }, i) => {
        const visibility =
          i === 0 ? "flex" : i <= 2 ? "hidden md:flex" : "hidden xl:flex";

        return (
          <div key={label} className={`${visibility} items-center gap-1`}>
            {icon && (
              /* eslint-disable-next-line @next/next/no-img-element */
              <img
                src={icon}
                alt=""
                width={24}
                height={24}
                className="size-6 shrink-0"
              />
            )}
            <p className="whitespace-nowrap font-heading text-[15px] font-semibold leading-[27.2px] tracking-[0.56px] text-[#e6f8f6]">
              {label}
            </p>
          </div>
        );
      })}
    </section>
  );
}
