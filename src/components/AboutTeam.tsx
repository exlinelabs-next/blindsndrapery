import Image from "next/image";
import { useContent } from "@/hooks/useContent";
import type { AboutTeamContent } from "@/types/content";

export function AboutTeam({ content }: { content?: AboutTeamContent }) {
  const { badges, members } = content ?? useContent("aboutPage").team;

  return (
    <section className="flex flex-col gap-16 bg-navy px-4 py-14 mb-14 md:px-12 md:py-16 md:mb-16 xl:px-20 xl:py-[100px] xl:mb-[100px]">
      <div className="flex flex-wrap items-center justify-between gap-6">
        {badges.map((badge) => (
          <div key={badge.label} className="flex items-center gap-2">
            <div className="relative size-[32px] shrink-0">
              <Image
                src={badge.icon.src}
                alt={badge.icon.alt}
                fill
                className="object-contain"
              />
            </div>
            <p className="text-[16px] leading-[23px] text-white">
              {badge.label}
            </p>
          </div>
        ))}
      </div>
      <div className="grid grid-cols-1 gap-6 md:grid-cols-2 xl:grid-cols-4">
        {members.map((member, i) => (
          <div key={`${member.name}-${i}`} className="flex flex-col gap-4">
            <div className="relative aspect-square w-full overflow-hidden rounded-lg">
              <Image
                src={member.image.src}
                alt={member.image.alt}
                fill
                className="object-cover"
              />
            </div>
            <div className="flex flex-col gap-2 text-center text-white">
              <p className="font-heading text-[22px] font-semibold leading-[32px] tracking-[-0.0792px]">
                {member.name}
              </p>
              <p className="text-[16px] leading-[23px]">{member.role}</p>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
