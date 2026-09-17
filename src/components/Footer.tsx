import Image from "next/image";
import Link from "next/link";
import { ChevronRight, ArrowRight } from "lucide-react";
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
  const {
    logo,
    description,
    badges,
    columns,
    contact,
    trustHighlights,
    copyright,
    legalLinks,
    socialLinks,
  } = footerContent ?? fallback;

  function renderColumn(
    column: (typeof columns)[number],
    widthClass = "",
  ) {
    return (
      <div
        key={column.title}
        className={`flex flex-col items-start gap-6 ${widthClass}`}
      >
        <p className="font-heading text-[18px] font-semibold leading-[27px] tracking-[-0.0648px] text-white">
          {column.title}
        </p>
        <div className="flex w-full flex-col items-start gap-4">
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

  function renderContactColumn(widthClass = "") {
    return (
      <div className={`flex flex-col items-start gap-6 ${widthClass}`}>
        <p className="font-heading text-[18px] font-semibold leading-[27px] tracking-[-0.0648px] text-white">
          Contact
        </p>
        <div className="flex flex-col items-start gap-6">
          <div className="flex flex-col items-start gap-4">
            {contact?.servingAreaText && (
              <p className="text-sm leading-[24px] text-white">
                {contact.servingAreaText}
              </p>
            )}
            <div className="flex flex-col items-start gap-4">
              {contact?.phone && (
                <a
                  href={`tel:${contact.phone.replace(/[^+\d]/g, "")}`}
                  className="flex items-start gap-2"
                >
                  <svg className="size-7 shrink-0" viewBox="0 0 28 28" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <rect width="28" height="28" rx="4" fill="white" fillOpacity="0.39"/>
                    <path d="M10.137 6.26879L12.8433 9.3926C13.1281 9.72138 13.0921 10.2326 12.7625 10.5637L11.6746 11.6525C11.6156 11.7082 11.5767 11.7819 11.564 11.8621C11.5512 11.9422 11.5654 12.0243 11.6042 12.0956C12.629 13.8804 14.1086 15.3618 15.8921 16.389C15.9633 16.4276 16.0453 16.4416 16.1253 16.4289C16.2053 16.4161 16.2788 16.3774 16.3345 16.3186L17.4257 15.2259C17.7545 14.8963 18.2641 14.8595 18.5921 15.1411L21.7281 17.8329C22.0913 18.1449 22.0905 18.72 21.7265 19.084L19.4801 21.3343C18.8177 21.9974 17.8337 22.187 17.0449 21.8039C12.3079 19.5084 8.4851 15.6805 6.19618 10.9405C5.81299 10.151 6.00259 9.16622 6.66498 8.50306L8.89057 6.27359C9.25297 5.91041 9.82497 5.90881 10.137 6.26879Z" stroke="white" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                  </svg>
                  <span className="text-sm leading-[24px] text-white underline">
                    {contact.phone}
                  </span>
                </a>
              )}
              {contact?.email && (
                <a
                  href={`mailto:${contact.email}`}
                  className="flex items-start gap-2"
                >
                  <svg className="size-7 shrink-0" viewBox="0 0 28 28" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <rect width="28" height="28" rx="4" fill="white" fillOpacity="0.39"/>
                    <path d="M21 8H7C6.73478 8 6.48043 8.10536 6.29289 8.29289C6.10536 8.48043 6 8.73478 6 9V19C6 19.2652 6.10536 19.5196 6.29289 19.7071C6.48043 19.8946 6.73478 20 7 20H21C21.2652 20 21.5196 19.8946 21.7071 19.7071C21.8946 19.5196 22 19.2652 22 19V9C22 8.73478 21.8946 8.48043 21.7071 8.29289C21.5196 8.10536 21.2652 8 21 8ZM20.23 19H7.83L11.33 15.38L10.61 14.685L7 18.42V9.76L13.215 15.945C13.4024 16.1313 13.6558 16.2358 13.92 16.2358C14.1842 16.2358 14.4376 16.1313 14.625 15.945L21 9.605V18.355L17.32 14.675L16.615 15.38L20.23 19ZM7.655 9H20.19L13.92 15.235L7.655 9Z" fill="white"/>
                  </svg>
                  <span className="text-sm leading-[24px] text-white underline">
                    {contact.email}
                  </span>
                </a>
              )}
              <div className="flex items-center gap-2.5">
                {socialLinks.map((social) => {
                  const Icon = socialIcons[social.platform];
                  return (
                    <Link
                      key={social.platform}
                      href={social.href}
                      aria-label={social.label}
                      className="flex size-6 items-center justify-center"
                    >
                      <Icon className="size-6 text-white" />
                    </Link>
                  );
                })}
              </div>
            </div>
          </div>
          {contact?.cta && (
            <Link
              href={contact.cta.href}
              className="group rounded-lg bg-teal-dark p-[2px] shadow-[0px_4px_2px_rgba(0,0,0,0.1)] transition-all duration-200 hover:bg-teal-dark-pressed hover:p-[5px]"
            >
              <div className="flex items-center justify-center gap-2 rounded-[6px] border border-white/33 px-6 py-[14px] transition-all duration-200 group-hover:rounded-[3px] group-hover:px-[21px] group-hover:py-[11px]">
                <span className="whitespace-nowrap font-heading text-[15px] font-semibold leading-[27.2px] tracking-[0.56px] text-white">
                  {contact.cta.label}
                </span>
                <ArrowRight
                  className="size-[14px] text-white transition-transform duration-200 group-hover:translate-x-[3px]"
                  strokeWidth={2.5}
                />
              </div>
            </Link>
          )}
        </div>
      </div>
    );
  }

  return (
    <footer className="bg-navy px-8 py-20 md:px-12 xl:p-20">
      <div className="flex flex-col gap-10">
        {/* ═══ Top section ═══ */}
        <div className="flex flex-col items-center gap-10 border-b border-white/32 pb-10 xl:pb-6">

          {/* ── DESKTOP (xl+): Logo + desc + badges, columns, enriched contact ── */}
          <div className="hidden w-full xl:flex xl:flex-col xl:items-center xl:gap-10">
            <div className="flex w-full items-start justify-between pb-6">
              <div className="flex shrink-0 flex-col gap-10">
                <div className="flex flex-col gap-6">
                  <Link href={logo.href} className="shrink-0">
                    <Image
                      src={logo.src}
                      alt={logo.alt}
                      width={241}
                      height={32}
                      className="h-8 w-auto"
                    />
                  </Link>
                  {description && (
                    <p className="w-[325px] text-base leading-[23px] text-white">
                      {description}
                    </p>
                  )}
                </div>
                <div className="flex items-start gap-5">
                  {badges.map((badge) => (
                    <div
                      key={badge.alt}
                      className="relative w-[120px] shrink-0"
                      style={{ aspectRatio: badge.aspectRatio }}
                    >
                      <Image
                        src={badge.src}
                        alt={badge.alt}
                        fill
                        sizes="120px"
                        className="object-cover"
                      />
                    </div>
                  ))}
                </div>
              </div>
              {renderColumn(columns[0], "w-[107px]")}
              {renderColumn(columns[1], "w-[248px]")}
              {renderContactColumn("w-[332px]")}
            </div>
            {trustHighlights && trustHighlights.length > 0 && (
              <div className="flex w-auto flex-nowrap gap-4 rounded-lg bg-white/5 p-4">
                {trustHighlights.map((highlight) => (
                  <div key={highlight} className="flex items-center">
                    <ul className="whitespace-nowrap font-heading text-[15px] font-semibold leading-[0] tracking-[0.56px] text-[#e6f8f6]">
                      <li className="ms-[22.5px] list-disc">
                        <span className="leading-[27.2px]">{highlight}</span>
                      </li>
                    </ul>
                  </div>
                ))}
              </div>
            )}
          </div>

          {/* ── TABLET / MOBILE (<xl): same content as desktop (logo/desc/
              badges, Explore/Services/Contact columns, trust bar), just
              reflowed into fewer/narrower columns via flex-wrap instead of
              desktop's single row — confirmed against Figma tablet (node
              4425:7686) and mobile (4425:7790) frames, which both include
              the full Contact block (phone/email/socials/CTA) and the
              trust-highlights bar that this section was previously
              missing entirely. ── */}
          <div className="flex w-full flex-col gap-16 xl:hidden">
            <div className="flex w-full flex-col items-start gap-[72px]">
              <div className="flex flex-col items-start gap-4">
                <div className="flex flex-col items-start gap-4">
                  <Link href={logo.href} className="shrink-0">
                    <Image
                      src={logo.src}
                      alt={logo.alt}
                      width={241}
                      height={32}
                      className="h-8 w-auto"
                    />
                  </Link>
                  {description && (
                    <p className="text-base leading-[23px] text-white">
                      {description}
                    </p>
                  )}
                </div>
                <div className="flex items-start gap-5">
                  {badges.map((badge) => (
                    <div
                      key={badge.alt}
                      className="relative w-[120px] shrink-0"
                      style={{ aspectRatio: badge.aspectRatio }}
                    >
                      <Image
                        src={badge.src}
                        alt={badge.alt}
                        fill
                        sizes="120px"
                        className="object-cover"
                      />
                    </div>
                  ))}
                </div>
              </div>
              <div className="flex w-full flex-wrap items-start gap-10">
                {renderColumn(columns[0], "w-[107px]")}
                {renderColumn(columns[1], "w-full md:w-[237px]")}
                {renderContactColumn("w-full md:w-[244px]")}
              </div>
            </div>
            {trustHighlights && trustHighlights.length > 0 && (
              <div className="flex w-full flex-wrap items-center justify-center gap-4 rounded-lg bg-white/5 p-4">
                {trustHighlights.map((highlight) => (
                  <div key={highlight} className="flex items-center">
                    <ul className="whitespace-nowrap font-heading text-[15px] font-semibold leading-[0] tracking-[0.56px] text-[#e6f8f6]">
                      <li className="ms-[22.5px] list-disc">
                        <span className="leading-[27.2px]">{highlight}</span>
                      </li>
                    </ul>
                  </div>
                ))}
              </div>
            )}
          </div>

        </div>

        {/* ═══ Bottom bar ═══ */}
        {/* Same simple copyright + legal-links layout at every breakpoint
            (confirmed against the tablet/mobile Figma frames — no
            duplicate logo, no social icons here; those already live in
            the Contact column above at every breakpoint now). */}
        <div className="flex items-end justify-between text-sm leading-[24px] text-white">
          <p className="min-w-0 flex-1">{copyright}</p>
          <div className="flex shrink-0 gap-6 whitespace-nowrap">
            {legalLinks.map((link) => (
              <Link
                key={link.label}
                href={link.href}
                className="text-sm leading-[24px] text-white"
              >
                {link.label}
              </Link>
            ))}
          </div>
        </div>
      </div>
    </footer>
  );
}
