"use client";

import { useEffect, useRef, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { ChevronDown, ChevronRight, Menu, X, ArrowRight } from "lucide-react";
import { FaFacebook, FaInstagram, FaLinkedin, FaYoutube } from "react-icons/fa6";
import { useContent } from "@/hooks/useContent";
import { Button } from "@/components/ui/Button";

const SOCIAL_ICONS = {
  instagram: FaInstagram,
  facebook: FaFacebook,
  youtube: FaYoutube,
  linkedin: FaLinkedin,
} as const;

export function Header() {
  const { logo, servicesLabel, servicesDropdown, links, ctaLabel, ctaHref } = useContent("nav");
  const pathname = usePathname();
  const isOnServicePage = pathname.startsWith("/services");
  const [servicesOpen, setServicesOpen] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [mobileServicesOpen, setMobileServicesOpen] = useState(false);
  const [mobileExpandedCategory, setMobileExpandedCategory] = useState<string | null>(null);
  const [headerVisible, setHeaderVisible] = useState(true);
  const headerRef = useRef<HTMLElement>(null);
  const lastScrollY = useRef(0);

  useEffect(() => {
    if (!servicesOpen) return;

    function handlePointerDown(event: PointerEvent) {
      if (headerRef.current && !headerRef.current.contains(event.target as Node)) {
        setServicesOpen(false);
      }
    }
    function handleKeyDown(event: KeyboardEvent) {
      if (event.key === "Escape") setServicesOpen(false);
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
      if (event.matches) setMobileMenuOpen(false);
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

  const { categories, blogCard, socialLinks } = servicesDropdown;

  // Desktop mega-menu groups categories into 3 columns of 2
  const desktopColumns = [
    [categories[0], categories[1]],
    [categories[2], categories[3]],
    [categories[4], categories[5]],
  ];

  return (
    <header
      ref={headerRef}
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
        <button
          type="button"
          onClick={() => setServicesOpen((open) => !open)}
          aria-haspopup="true"
          aria-expanded={servicesOpen}
          className={`flex cursor-pointer items-center gap-2 text-base leading-[23px] transition-colors hover:text-teal ${isOnServicePage ? "text-teal" : "text-navy"}`}
        >
          {servicesLabel}
          <ChevronDown className={`size-3 transition-transform ${servicesOpen ? "rotate-180" : ""}`} />
        </button>

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
        onClick={() => setMobileMenuOpen((open) => !open)}
        aria-haspopup="true"
        aria-expanded={mobileMenuOpen}
        aria-label={mobileMenuOpen ? "Close menu" : "Open menu"}
        className="flex size-8 shrink-0 items-center justify-center text-navy xl:hidden"
      >
        {mobileMenuOpen ? <X className="size-8" /> : <Menu className="size-8" />}
      </button>

      {/* Desktop mega-menu backdrop + panel */}
      {servicesOpen && (
        <>
          <div
            className="fixed inset-0 z-40 hidden xl:block"
            onClick={() => setServicesOpen(false)}
            aria-hidden="true"
          />
          <div className="absolute left-1/2 top-full z-50 hidden w-[90dvw] -translate-x-1/2 flex-col rounded-b-lg bg-white shadow-[0px_4px_2px_rgba(0,0,0,0.15)] xl:flex">
            <div className="flex items-start justify-between px-20 pt-10">
              {desktopColumns.map((column, colIdx) => (
                <div key={colIdx} className="flex flex-col gap-10">
                  {column.map((category) => {
                    if (!category) return null;
                    const isCategoryActive = pathname.startsWith(category.href);
                    return (
                      <div key={category.label} className="flex flex-col gap-4">
                        <Link
                          href={category.href}
                          onClick={() => setServicesOpen(false)}
                          className={`font-heading text-[22px] font-semibold leading-[32px] tracking-[-0.0792px] transition-colors hover:text-teal ${isCategoryActive ? "text-teal" : "text-black"}`}
                        >
                          {category.label}
                        </Link>
                        {category.subItems && (
                          <div className="flex flex-col gap-4">
                            {category.subItems.map((sub) => {
                              const isSubActive = pathname === sub.href;
                              return (
                                <Link
                                  key={sub.label}
                                  href={sub.href}
                                  onClick={() => setServicesOpen(false)}
                                  className={`text-base leading-[23px] transition-colors hover:text-teal ${isSubActive ? "text-teal font-semibold" : "text-black"}`}
                                >
                                  {sub.label}
                                </Link>
                              );
                            })}
                          </div>
                        )}
                        <Link
                          href={category.href}
                          onClick={() => setServicesOpen(false)}
                          className="font-heading text-[15px] font-semibold leading-[27.2px] tracking-[0.56px] text-teal transition-colors hover:text-teal-pressed"
                        >
                          {category.exploreLabel}
                        </Link>
                      </div>
                    );
                  })}
                </div>
              ))}

              {/* Blog card */}
              <div className="flex w-[449px] shrink-0 flex-col gap-2 rounded-lg">
                <div className="relative h-[220px] w-full overflow-hidden rounded-lg">
                  <Image
                    src={blogCard.image.src}
                    alt={blogCard.image.alt}
                    fill
                    className="object-cover"
                  />
                </div>
                <div className="flex flex-col gap-2.5 rounded-lg bg-[#e7eeee] p-6">
                  <div className="flex flex-col gap-2.5 text-black">
                    <p className="font-heading text-base font-semibold leading-[23px] tracking-[0.16px]">
                      {blogCard.title}
                    </p>
                    <p className="text-sm leading-6">
                      {blogCard.description}
                    </p>
                  </div>
                  <div className="flex justify-end">
                    <Link
                      href={blogCard.buttonHref}
                      onClick={() => setServicesOpen(false)}
                      className="flex items-center gap-2 rounded-lg bg-white px-4 py-2"
                    >
                      <span className="font-heading text-[15px] font-semibold leading-[27.2px] tracking-[0.56px] text-navy">
                        {blogCard.buttonLabel}
                      </span>
                      <ArrowRight className="size-3.5 text-navy" />
                    </Link>
                  </div>
                </div>
              </div>
            </div>

            {/* Social footer */}
            <div className="flex items-center justify-end rounded-b-lg px-20 pt-10 pb-6">
              <div className="flex items-center gap-6">
                <p className="font-heading text-[15px] font-semibold leading-[27.2px] tracking-[0.56px] text-black">
                  Follow us on
                </p>
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
                        className="text-black transition-colors hover:text-teal"
                      >
                        <Icon className="size-6" />
                      </a>
                    );
                  })}
                </div>
              </div>
            </div>
          </div>
        </>
      )}

      {/* Mobile/tablet drawer */}
      {mobileMenuOpen && (
        <div className="absolute left-0 top-full z-50 flex max-h-[calc(100vh-100px)] w-full flex-col items-start gap-6 overflow-y-auto bg-white px-8 py-8 shadow-[0px_4px_2px_rgba(0,0,0,0.15)] xl:hidden">
          <div className="flex w-full flex-col items-start gap-4">
            <button
              type="button"
              onClick={() => { setMobileServicesOpen((o) => !o); setMobileExpandedCategory(null); }}
              aria-expanded={mobileServicesOpen}
              className={`flex w-full cursor-pointer items-center justify-between text-base leading-[23px] ${isOnServicePage ? "text-teal" : "text-navy"}`}
            >
              {servicesLabel}
              <ChevronDown className={`size-4 transition-transform ${mobileServicesOpen ? "rotate-180" : ""}`} />
            </button>

            {mobileServicesOpen && (
              <div className="flex w-full flex-col items-start gap-4 pl-4">
                {categories.map((category) => {
                  const isActive = pathname.startsWith(category.href);
                  const isExpanded = mobileExpandedCategory === category.label;
                  const hasSubItems = category.subItems && category.subItems.length > 0;
                  return (
                    <div key={category.label} className="flex w-full flex-col items-start gap-2">
                      {hasSubItems ? (
                        <button
                          type="button"
                          onClick={() => setMobileExpandedCategory(isExpanded ? null : category.label)}
                          className={`flex w-full cursor-pointer items-center justify-between font-heading text-base font-semibold ${isActive ? "text-teal" : "text-navy"}`}
                        >
                          {category.label}
                          <ChevronRight className={`size-3.5 transition-transform ${isExpanded ? "rotate-90" : ""}`} />
                        </button>
                      ) : (
                        <Link
                          href={category.href}
                          onClick={() => setMobileMenuOpen(false)}
                          className={`w-full font-heading text-base font-semibold ${isActive ? "text-teal" : "text-navy"}`}
                        >
                          {category.label}
                        </Link>
                      )}
                      {isExpanded && category.subItems && (
                        <div className="flex w-full flex-col items-start gap-2 pl-4">
                          {category.subItems.map((sub) => (
                            <Link
                              key={sub.label}
                              href={sub.href}
                              onClick={() => setMobileMenuOpen(false)}
                              className={`w-full whitespace-nowrap text-sm ${pathname === sub.href ? "text-teal font-semibold" : "text-navy"}`}
                            >
                              {sub.label}
                            </Link>
                          ))}
                        </div>
                      )}
                    </div>
                  );
                })}
              </div>
            )}
          </div>

          {links.map((link) => {
            const isActive = pathname === link.href || pathname.startsWith(link.href + "/");
            return (
              <Link
                key={link.label}
                href={link.href}
                onClick={() => setMobileMenuOpen(false)}
                className={`w-full whitespace-nowrap text-base leading-[23px] ${isActive ? "text-teal" : "text-navy"}`}
              >
                {link.label}
              </Link>
            );
          })}

          <Button href={ctaHref}>{ctaLabel}</Button>
        </div>
      )}
    </header>
  );
}
