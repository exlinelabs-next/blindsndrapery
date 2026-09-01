import Image from "next/image";
import Link from "next/link";
import { ChevronRight } from "lucide-react";
import { FaFacebook, FaInstagram, FaLinkedin, FaYoutube } from "react-icons/fa6";
import type { IconType } from "react-icons";
import { useContent } from "@/hooks/useContent";
import type { FooterContent, FooterSocialLink } from "@/types/content";

const socialIcons: Record<FooterSocialLink["platform"], IconType> = {
  instagram: FaInstagram,
  facebook: FaFacebook,
  youtube: FaYoutube,
  linkedin: FaLinkedin,
};

export function Footer({ footerContent }: { footerContent?: FooterContent }) {
  const fallback = useContent("footer");
  const { logo, badges, columns, copyright, legalLinks, socialLinks } =
    footerContent ?? fallback;

  function renderColumn(
    column: (typeof columns)[number],
    titleGap = "gap-8",
  ) {
    return (
      <div key={column.title} className={`flex flex-col items-start ${titleGap}`}>
        <p className="font-heading text-[18px] font-semibold leading-[27px] tracking-[-0.0648px] text-white">
          {column.title}
        </p>
        <div className="flex flex-col items-start gap-4">
          {column.links.map((link) => (
            <Link
              key={link.label}
              href={link.href}
              className="flex w-full items-center justify-between gap-4 whitespace-nowrap text-base leading-[23px] text-white"
            >
              {link.label}
              {column.showChevron && (
                <ChevronRight className="size-[18px] shrink-0 text-white" />
              )}
            </Link>
          ))}
        </div>
      </div>
    );
  }

  function renderSocialIcons(gap = "gap-2.5") {
    return (
      <div className={`flex items-center ${gap}`}>
        {socialLinks.map((social) => {
          const Icon = socialIcons[social.platform];
          return (
            <Link
              key={social.platform}
              href={social.href}
              aria-label={social.label}
              className="flex size-8 shrink-0 items-center justify-center"
            >
              <Icon className="size-8 text-white" />
            </Link>
          );
        })}
      </div>
    );
  }

  return (
    <footer className="bg-navy px-8 py-16 md:px-10 md:pb-20 md:pt-10 xl:p-20">
      {/* ═══ Desktop (xl+) ═══ */}
      <div className="hidden xl:block">
        <div className="border-b border-white/32 pb-10">
          <div className="flex w-full items-start justify-between gap-10">
            <div className="flex flex-col items-start gap-10">
              <Link href={logo.href} className="shrink-0">
                <Image
                  src={logo.src}
                  alt={logo.alt}
                  width={241}
                  height={32}
                  className="h-8 w-auto"
                />
              </Link>
              <div className="flex w-[142px] flex-col items-start gap-5">
                {badges.map((badge) => (
                  <div
                    key={badge.alt}
                    className="relative w-full"
                    style={{ aspectRatio: badge.aspectRatio }}
                  >
                    <Image
                      src={badge.src}
                      alt={badge.alt}
                      fill
                      className="object-cover"
                    />
                  </div>
                ))}
              </div>
            </div>
            {columns.map((column) => renderColumn(column))}
          </div>
        </div>

        <div className="flex w-full items-end justify-between pt-10">
          <p className="flex-1 text-sm leading-[24px] text-white">
            {copyright}
          </p>
          <div className="flex items-end gap-6">
            {legalLinks.map((link) => (
              <Link
                key={link.label}
                href={link.href}
                className="whitespace-nowrap text-sm leading-[24px] text-white"
              >
                {link.label}
              </Link>
            ))}
            {renderSocialIcons("gap-2.5")}
          </div>
        </div>
      </div>

      {/* ═══ Tablet (md to xl) ═══ */}
      <div className="hidden md:block xl:hidden">
        <div className="flex flex-col items-center gap-10 border-b border-white/32 pb-10">
          <div className="flex w-full items-start justify-between">
            {renderColumn(columns[0], "gap-4")}
            {renderColumn(columns[1], "gap-4")}
            <div className="flex h-[266px] flex-col justify-between">
              {renderColumn(columns[2], "gap-4")}
              {renderColumn(columns[3], "gap-4")}
            </div>
          </div>
          <div className="flex w-[342px] items-start justify-between">
            {badges.map((badge, i) => (
              <div
                key={badge.alt}
                className="relative shrink-0"
                style={{
                  width: 160,
                  height: i === 0 ? 111 : 90,
                }}
              >
                <Image
                  src={badge.src}
                  alt={badge.alt}
                  fill
                  className="object-cover"
                />
              </div>
            ))}
          </div>
        </div>

        <div className="flex flex-col items-center gap-4 pt-10">
          <div className="flex flex-col items-center gap-2">
            <Link href={logo.href} className="shrink-0">
              <Image
                src={logo.src}
                alt={logo.alt}
                width={211}
                height={28}
                className="h-7 w-auto"
              />
            </Link>
            <p className="text-center text-sm leading-[24px] text-white">
              {copyright}
            </p>
          </div>
          <div className="flex items-start gap-4">
            {legalLinks.map((link) => (
              <Link
                key={link.label}
                href={link.href}
                className="whitespace-nowrap text-sm leading-[24px] text-white"
              >
                {link.label}
              </Link>
            ))}
            {renderSocialIcons("gap-4")}
          </div>
        </div>
      </div>

      {/* ═══ Mobile (below md) ═══ */}
      <div className="md:hidden">
        <div className="flex flex-col items-start gap-10 border-b border-white/32 pb-10">
          <div className="flex flex-col items-start gap-8">
            <Link href={logo.href} className="shrink-0">
              <Image
                src={logo.src}
                alt={logo.alt}
                width={241}
                height={32}
                className="h-7 w-auto"
              />
            </Link>
            <div className="flex w-[120px] flex-col items-start gap-4">
              {badges.map((badge) => (
                <div
                  key={badge.alt}
                  className="relative w-full"
                  style={{ aspectRatio: badge.aspectRatio }}
                >
                  <Image
                    src={badge.src}
                    alt={badge.alt}
                    fill
                    className="object-cover"
                  />
                </div>
              ))}
            </div>
          </div>
          <div className="flex w-full flex-col items-start gap-8">
            {renderColumn(columns[0])}
            {renderColumn(columns[1])}
            <div className="flex w-full flex-wrap gap-10">
              {renderColumn(columns[2])}
              {renderColumn(columns[3])}
            </div>
          </div>
        </div>

        <div className="flex flex-col items-start gap-6 pt-10">
          <p className="text-sm leading-[24px] text-white">{copyright}</p>
          <div className="flex flex-col items-start gap-4">
            <div className="flex flex-wrap items-center gap-4">
              {legalLinks.map((link) => (
                <Link
                  key={link.label}
                  href={link.href}
                  className="whitespace-nowrap text-sm leading-[24px] text-white"
                >
                  {link.label}
                </Link>
              ))}
            </div>
            {renderSocialIcons("gap-2.5")}
          </div>
        </div>
      </div>
    </footer>
  );
}
