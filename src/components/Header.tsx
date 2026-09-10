"use client";

import { useEffect, useRef, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { ChevronDown, X, ArrowRight } from "lucide-react";
import { FaFacebook, FaInstagram, FaLinkedin, FaYoutube } from "react-icons/fa6";
import { useContent } from "@/hooks/useContent";
import { Button } from "@/components/ui/Button";
import { MenuIcon } from "@/components/ui/MenuIcon";
import { ChevronDownIcon } from "@/components/ui/ChevronDownIcon";
import { ArrowLeftIcon } from "@/components/ui/ArrowLeftIcon";
import type { NavContent, NavDropdownCategory, NavDropdownBlogCard, NavHelpBarContent, FooterSocialLink } from "@/types/content";

const SOCIAL_ICONS = {
  instagram: FaInstagram,
  facebook: FaFacebook,
  youtube: FaYoutube,
  linkedin: FaLinkedin,
} as const;

// Shared by the desktop hover panel and the tablet tap-drawer panel (node
// 4311:2976 and 4493:5840 respectively) — only the column width differs
// (443px desktop, 399px tablet). A category with subItems shows the
// "COLLECTION" eyebrow + subitem grid above a 259px image (confirmed on
// both nodes); one without shows only the image, grown to 378px (the space
// the eyebrow+grid block would otherwise take) — there's no separate Figma
// example for that state, so this fills the gap using the has-subitems
// layout's own numbers rather than an invented value.
function CategoryPanel({ category, widthClassName, onNavigate }: { category: NavDropdownCategory; widthClassName: string; onNavigate: () => void }) {
  const hasSubItems = !!category.subItems?.length;

  return (
    <div className={`flex shrink-0 flex-col gap-4 ${widthClassName}`}>
      {hasSubItems && (
        <div className="flex flex-col gap-4">
          <p className="font-heading text-[16px] leading-[23px] font-semibold tracking-[0.4px] text-[#476b68] uppercase">
            {category.label.toUpperCase()} COLLECTION
          </p>
          <div className="flex flex-wrap gap-4">
            {category.subItems!.map((sub) => (
              <Link
                key={sub.label}
                href={sub.href}
                onClick={onNavigate}
                className="w-[135px] shrink-0 font-heading text-[15px] leading-[27.2px] font-semibold tracking-[0.56px] text-black transition-colors hover:text-teal"
              >
                {sub.label}
              </Link>
            ))}
          </div>
        </div>
      )}
      <Link
        href={category.href}
        onClick={onNavigate}
        className={`relative block w-full overflow-hidden rounded-lg ${hasSubItems ? "h-[259px]" : "h-[338px]"}`}
      >
        <Image src={category.image.src} alt={category.image.alt} fill className="object-cover" />
        <div className="absolute inset-0 bg-black/20" />
      </Link>
      <Link
        href={category.href}
        onClick={onNavigate}
        className="flex items-center gap-2 font-heading text-[15px] leading-[27.2px] font-semibold tracking-[0.56px] text-teal transition-colors hover:text-teal-pressed"
      >
        {category.exploreLabel}
        <ArrowRight className="size-3.5" />
      </Link>
    </div>
  );
}

function BlogCard({ blogCard, imageClassName, onNavigate }: { blogCard: NavDropdownBlogCard; imageClassName: string; onNavigate: () => void }) {
  if (!blogCard.title) return null;

  return (
    <div className="flex h-full w-full flex-col gap-2 rounded-lg">
      {blogCard.image.src && (
        <div className={`relative w-full shrink-0 overflow-hidden rounded-lg ${imageClassName}`}>
          <Image src={blogCard.image.src} alt={blogCard.image.alt} fill className="object-cover" />
        </div>
      )}
      <div className="flex flex-1 flex-col items-end gap-2.5 rounded-lg bg-[#e7eeee] p-6">
        <div className="flex w-full flex-col gap-2.5 text-black">
          <p className="line-clamp-2 font-heading text-base leading-[23px] font-semibold tracking-[0.16px]">{blogCard.title}</p>
          <p className="line-clamp-3 text-sm leading-6 md:line-clamp-2">{blogCard.description}</p>
        </div>
        <Link href={blogCard.buttonHref} onClick={onNavigate} className="flex items-center gap-2 rounded-lg bg-white px-4 py-2">
          <span className="font-heading text-[15px] leading-[27.2px] font-semibold tracking-[0.56px] text-navy">{blogCard.buttonLabel}</span>
          <ArrowRight className="size-3.5 text-navy" />
        </Link>
      </div>
    </div>
  );
}

// The bottom info strip (confirmed identical copy/structure across all 5
// Figma states): inline on tablet/desktop, stacked onto 3 lines on mobile
// only (nodes 3629:2108 / 4493:6016) — reproduced with two parallel markup
// blocks toggled by the `md:` breakpoint rather than one that reflows,
// since the mobile version isn't just a narrower wrap of the same line.
function HelpBar({ helpBar, socialLinks, onNavigate }: { helpBar: NavHelpBarContent; socialLinks: FooterSocialLink[]; onNavigate: () => void }) {
  return (
    <div className="flex w-full flex-col items-center justify-center gap-4 xl:flex-row xl:gap-8">
      <p className="text-center text-sm leading-6 text-black">
        <span className="md:hidden">
          <span className="block">{helpBar.prefix}</span>
          <Link href={helpBar.ctaHref} onClick={onNavigate} className="font-heading text-[15px] font-semibold tracking-[0.56px] text-black">
            {helpBar.ctaLabel}
          </Link>
          <span className="block">{helpBar.phoneLabel}</span>
        </span>
        <span className="hidden md:inline">
          {helpBar.prefix}{"   "}
          <Link href={helpBar.ctaHref} onClick={onNavigate} className="font-heading text-[15px] font-semibold tracking-[0.56px] text-black">
            {helpBar.ctaLabel}
          </Link>
          {"   |  "}
          {helpBar.phoneLabel}
        </span>
      </p>
      <div className="flex items-center gap-4">
        <p className="font-heading text-[15px] leading-[27.2px] font-semibold tracking-[0.56px] text-[#4e7875]">Follow us on</p>
        <div className="flex items-center gap-2.5">
          {socialLinks.map((social) => {
            const Icon = SOCIAL_ICONS[social.platform];
            return (
              <a
                key={social.platform}
                href={social.href}
                target="_blank"
                rel="noopener noreferrer"
                aria-label={social.label}
                className="text-[#4e7875] transition-colors hover:text-teal"
              >
                <Icon className="size-6" />
              </a>
            );
          })}
        </div>
      </div>
    </div>
  );
}

export function Header({ navContent }: { navContent?: NavContent }) {
  const fallback = useContent("nav");
  const { logo, servicesLabel, servicesDropdown, links, ctaLabel, ctaHref } = navContent ?? fallback;
  const { categories, blogCard, socialLinks, helpBar } = servicesDropdown;
  const pathname = usePathname();
  const isOnServicePage = pathname.startsWith("/services");
  const [servicesOpen, setServicesOpen] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [mobileServicesOpen, setMobileServicesOpen] = useState(false);
  const [activeCategoryLabel, setActiveCategoryLabel] = useState<string | null>(null);
  const [headerVisible, setHeaderVisible] = useState(true);
  const headerRef = useRef<HTMLElement>(null);
  const lastScrollY = useRef(0);

  const activeCategory = categories.find((c) => c.label === activeCategoryLabel) ?? categories[0];

  function closeDesktopMega() {
    setServicesOpen(false);
    setActiveCategoryLabel(null);
  }

  function closeMobileMenu() {
    setMobileMenuOpen(false);
    setMobileServicesOpen(false);
    setActiveCategoryLabel(null);
  }

  function toggleMobileMenu() {
    if (mobileMenuOpen) {
      closeMobileMenu();
    } else {
      setMobileMenuOpen(true);
    }
  }

  useEffect(() => {
    if (!servicesOpen) return;

    function handlePointerDown(event: PointerEvent) {
      if (headerRef.current && !headerRef.current.contains(event.target as Node)) {
        closeDesktopMega();
      }
    }
    function handleKeyDown(event: KeyboardEvent) {
      if (event.key === "Escape") closeDesktopMega();
    }

    document.addEventListener("pointerdown", handlePointerDown);
    document.addEventListener("keydown", handleKeyDown);
    return () => {
      document.removeEventListener("pointerdown", handlePointerDown);
      document.removeEventListener("keydown", handleKeyDown);
    };
  }, [servicesOpen]);

  useEffect(() => {
    if (!mobileMenuOpen) return;
    const mql = window.matchMedia("(min-width: 1280px)");
    function handleChange(event: MediaQueryListEvent) {
      if (event.matches) closeMobileMenu();
    }
    mql.addEventListener("change", handleChange);
    return () => mql.removeEventListener("change", handleChange);
  }, [mobileMenuOpen]);

  useEffect(() => {
    function handleScroll() {
      const currentY = window.scrollY;

      if (currentY < 10) {
        setHeaderVisible(true);
      } else if (currentY > lastScrollY.current && !mobileMenuOpen && !servicesOpen) {
        setHeaderVisible(false);
      } else if (currentY < lastScrollY.current) {
        setHeaderVisible(true);
      }
      lastScrollY.current = currentY;
    }

    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, [mobileMenuOpen, servicesOpen]);

  return (
    <header
      ref={headerRef}
      onMouseLeave={closeDesktopMega}
      className={`sticky top-0 z-50 flex h-[100px] w-full items-center justify-between border-b border-ice bg-white pl-12 pr-4 py-6 transition-transform duration-300 xl:h-[108px] xl:px-20 ${headerVisible ? "translate-y-0" : "-translate-y-full"}`}
    >
      <Link href={logo.href} className="shrink-0">
        <Image
          src={logo.src}
          alt={logo.alt}
          width={211}
          height={28}
          className="h-[28px] w-auto"
          priority
        />
      </Link>

      <nav className="hidden h-10 shrink-0 items-center gap-8 xl:flex">
        <Link
          href="/services"
          onMouseEnter={() => setServicesOpen(true)}
          onFocus={() => setServicesOpen(true)}
          onClick={closeDesktopMega}
          aria-haspopup="true"
          aria-expanded={servicesOpen}
          className={`flex cursor-pointer items-center gap-2 text-base leading-[23px] transition-colors hover:text-teal ${isOnServicePage ? "text-teal" : "text-navy"}`}
        >
          {servicesLabel}
          <ChevronDown className={`size-3 transition-transform ${servicesOpen ? "rotate-180" : ""}`} />
        </Link>

        {links.map((link) => {
          const isActive = pathname === link.href || pathname.startsWith(link.href + "/");
          return (
            <Link
              key={link.label}
              href={link.href}
              className={`whitespace-nowrap text-base leading-[23px] transition-colors hover:text-teal ${isActive ? "text-teal" : "text-navy"}`}
            >
              {link.label}
            </Link>
          );
        })}
      </nav>

      <Button href={ctaHref} className="hidden xl:inline-flex">
        {ctaLabel}
      </Button>

      <button
        type="button"
        onClick={toggleMobileMenu}
        aria-haspopup="true"
        aria-expanded={mobileMenuOpen}
        aria-label={mobileMenuOpen ? "Close menu" : "Open menu"}
        className="flex size-8 shrink-0 items-center justify-center text-navy xl:hidden"
      >
        {mobileMenuOpen ? <X className="size-8" /> : <MenuIcon className="size-8" />}
      </button>

      {/* Desktop hover mega-menu (node 4311:2976) */}
      {servicesOpen && (
        <div className="absolute inset-x-0 top-[calc(100%+2px)] z-50 hidden w-full flex-col gap-10 rounded-b-lg bg-white shadow-[0px_4px_2px_rgba(0,0,0,0.15)] xl:flex">
          <div className="flex items-start justify-between px-20 pt-10">
            <div className="flex w-[264px] shrink-0 flex-col">
              {categories.map((category) => {
                const isActive = activeCategory?.label === category.label;
                return (
                  <Link
                    key={category.label}
                    href={category.href}
                    onMouseEnter={() => setActiveCategoryLabel(category.label)}
                    onClick={closeDesktopMega}
                    className={`flex w-full items-center gap-4 rounded-lg px-2.5 py-3.5 text-left font-heading text-[18px] leading-[27px] font-semibold tracking-[-0.0648px] transition-colors ${isActive ? "bg-[#eff4f3] text-black" : "text-black hover:bg-[#eff4f3]"}`}
                  >
                    <span aria-hidden className="text-[16px] leading-none">
                      •
                    </span>
                    {category.label}
                  </Link>
                );
              })}
            </div>

            {activeCategory && <CategoryPanel category={activeCategory} widthClassName="w-[443px] shrink-0" onNavigate={closeDesktopMega} />}

            <div className="w-[380px] shrink-0">
              <BlogCard blogCard={blogCard} imageClassName="h-[160px]" onNavigate={closeDesktopMega} />
            </div>
          </div>

          <div className="flex items-center justify-center px-20 pb-6">
            <HelpBar helpBar={helpBar} socialLinks={socialLinks} onNavigate={closeDesktopMega} />
          </div>
        </div>
      )}

      {/* Tablet/mobile tap-drawer (nodes 3617:2043/4493:5840 tablet, 3629:2108/4493:6016 mobile) */}
      {mobileMenuOpen && (
        <div className="absolute left-0 top-full z-50 flex max-h-[calc(100vh-100px)] w-full items-start overflow-y-auto bg-white shadow-[0px_4px_2px_rgba(0,0,0,0.15)] xl:hidden">
          <div className="flex w-full flex-col gap-10 px-8 py-10 md:gap-12 md:px-12">
            {mobileServicesOpen ? (
              <div className="flex flex-col gap-6">
                <button
                  type="button"
                  onClick={() => setMobileServicesOpen(false)}
                  aria-label="Back"
                  className="flex size-6 items-center justify-center text-black"
                >
                  <ArrowLeftIcon className="size-3" />
                </button>
                <div className="flex flex-col gap-6">
                  <div className="flex w-full items-center justify-between">
                    <Link
                      href="/services"
                      onClick={closeMobileMenu}
                      className="font-heading text-[18px] leading-[27px] font-semibold tracking-[-0.0648px] text-black"
                    >
                      {servicesLabel}
                    </Link>
                    <button
                      type="button"
                      onClick={() => setMobileServicesOpen(false)}
                      aria-label="Collapse Services"
                      className="flex size-6 items-center justify-center text-black"
                    >
                      <ChevronDownIcon className="h-2 w-3.5 rotate-180" />
                    </button>
                  </div>

                  <div className="flex flex-col md:flex-row md:items-start md:gap-6">
                    <div className="flex w-full flex-col md:w-auto">
                      {categories.map((category) => {
                        const isActive = activeCategory?.label === category.label;
                        return (
                          <div key={category.label}>
                            <Link
                              href={category.href}
                              onClick={closeMobileMenu}
                              className="flex w-full items-center gap-4 rounded-lg px-2.5 py-3.5 font-heading text-[18px] leading-[23px] font-semibold tracking-[0.4px] text-black md:hidden"
                            >
                              <span aria-hidden className="text-[16px] leading-none">
                                •
                              </span>
                              {category.label}
                            </Link>
                            <button
                              type="button"
                              onClick={() => setActiveCategoryLabel(category.label)}
                              className={`hidden w-full items-center gap-4 rounded-lg px-2.5 py-3.5 text-left font-heading text-[18px] leading-[23px] font-semibold tracking-[0.4px] transition-colors md:flex ${isActive ? "bg-[#eff4f3] text-black" : "text-black hover:bg-[#eff4f3]"}`}
                            >
                              <span aria-hidden className="text-[16px] leading-none">
                                •
                              </span>
                              {category.label}
                            </button>
                          </div>
                        );
                      })}
                    </div>

                    {activeCategory && (
                      <div className="hidden md:block">
                        <CategoryPanel category={activeCategory} widthClassName="w-[399px]" onNavigate={closeMobileMenu} />
                      </div>
                    )}
                  </div>
                </div>

                <Button href={ctaHref} onClick={closeMobileMenu} className="w-full">
                  {ctaLabel}
                </Button>
              </div>
            ) : (
              <div className="flex flex-col gap-6">
                <div className="flex w-full items-center justify-between">
                  <Link
                    href="/services"
                    onClick={closeMobileMenu}
                    className="font-heading text-[18px] leading-[27px] font-semibold tracking-[-0.0648px] text-black"
                  >
                    {servicesLabel}
                  </Link>
                  <button
                    type="button"
                    onClick={() => setMobileServicesOpen(true)}
                    aria-label="Expand Services"
                    className="flex size-6 items-center justify-center text-black"
                  >
                    <ChevronDownIcon className="h-2 w-3.5" />
                  </button>
                </div>

                {links.map((link) => {
                  const isActive = pathname === link.href || pathname.startsWith(link.href + "/");
                  return (
                    <Link
                      key={link.label}
                      href={link.href}
                      onClick={closeMobileMenu}
                      className={`font-heading text-[18px] leading-[27px] font-semibold tracking-[-0.0648px] ${isActive ? "text-teal-pressed" : "text-black"}`}
                    >
                      {link.label}
                    </Link>
                  );
                })}

                <Button href={ctaHref} onClick={closeMobileMenu} className="w-full">
                  {ctaLabel}
                </Button>
              </div>
            )}

            <BlogCard blogCard={blogCard} imageClassName="h-[188px] md:h-[258px]" onNavigate={closeMobileMenu} />

            <HelpBar helpBar={helpBar} socialLinks={socialLinks} onNavigate={closeMobileMenu} />
          </div>
        </div>
      )}
    </header>
  );
}
