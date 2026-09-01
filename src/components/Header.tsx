"use client";

import { useEffect, useRef, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { ChevronDown, Menu, X, ArrowRight } from "lucide-react";
import { FaFacebook, FaInstagram, FaLinkedin, FaYoutube } from "react-icons/fa6";
import { useContent } from "@/hooks/useContent";
import { Button } from "@/components/ui/Button";
import type { NavContent } from "@/types/content";

const SOCIAL_ICONS = {
  instagram: FaInstagram,
  facebook: FaFacebook,
  youtube: FaYoutube,
  linkedin: FaLinkedin,
} as const;

export function Header({ navContent }: { navContent?: NavContent }) {
  const fallback = useContent("nav");
  const { logo, servicesLabel, servicesDropdown, links, ctaLabel, ctaHref } = navContent ?? fallback;
  const pathname = usePathname();
  const isOnServicePage = pathname.startsWith("/services");
  const [servicesOpen, setServicesOpen] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
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
          <div className="absolute left-0 top-full z-50 hidden w-full flex-col rounded-b-lg bg-white shadow-[0px_4px_2px_rgba(0,0,0,0.15)] xl:flex">
            <div className="flex items-start gap-5 px-20 pt-10">
              <div className="grid flex-1 grid-cols-3 gap-x-5 gap-y-10">
                {categories.map((category) => {
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

              {/* Blog card */}
              <div className="flex w-[449px] shrink-0 flex-col gap-2 rounded-lg">
                {blogCard.image.src && (
                  <div className="relative h-[220px] w-full overflow-hidden rounded-lg">
                    <Image
                      src={blogCard.image.src}
                      alt={blogCard.image.alt}
                      fill
                      className="object-cover"
                    />
                  </div>
                )}
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
        <div className="absolute left-0 top-full z-50 flex max-h-[calc(100vh-100px)] w-full overflow-y-auto bg-white shadow-[0px_4px_2px_rgba(0,0,0,0.15)] xl:hidden">
          <div className="flex w-full justify-center px-8 py-10 md:px-12">
            <div className="flex w-full flex-col gap-10 md:w-[672px]">
              <div className="flex flex-col gap-6">
                <div className="flex flex-col gap-4 md:gap-6">
                  {categories.map((category) => {
                    const isActive = pathname.startsWith(category.href);
                    return (
                      <Link
                        key={category.label}
                        href={category.href}
                        onClick={() => setMobileMenuOpen(false)}
                        className={`flex items-center justify-between font-heading font-semibold ${
                          isActive
                            ? "text-[18px] leading-[27px] tracking-[-0.0648px] text-teal-pressed md:text-[22px] md:leading-[32px] md:tracking-[-0.0792px]"
                            : "text-base leading-[23px] tracking-[0.16px] text-black md:text-[22px] md:leading-[32px] md:tracking-[-0.0792px]"
                        }`}
                      >
                        {category.label}
                        {isActive && <ArrowRight className="size-3.5 shrink-0 text-teal-pressed" />}
                      </Link>
                    );
                  })}
                </div>
                <Button href={ctaHref} className="w-full">
                  {ctaLabel}
                </Button>
              </div>

              {blogCard.title && (
                <div className="flex flex-col gap-2 rounded-lg">
                  {blogCard.image.src && (
                    <div className="relative h-[188px] w-full overflow-hidden rounded-lg md:h-[258px]">
                      <Image
                        src={blogCard.image.src}
                        alt={blogCard.image.alt}
                        fill
                        className="object-cover"
                      />
                    </div>
                  )}
                  <div className="flex flex-col items-end gap-2.5 rounded-lg bg-[#e7eeee] p-6">
                    <div className="flex w-full flex-col gap-2.5 text-black">
                      <p className="font-heading text-base font-semibold leading-[23px] tracking-[0.16px]">
                        {blogCard.title}
                      </p>
                      <p className="line-clamp-3 text-sm leading-6 md:line-clamp-2">
                        {blogCard.description}
                      </p>
                    </div>
                    <Link
                      href={blogCard.buttonHref}
                      onClick={() => setMobileMenuOpen(false)}
                      className="flex items-center gap-2 rounded-lg bg-white px-4 py-2"
                    >
                      <span className="font-heading text-[15px] font-semibold leading-[27.2px] tracking-[0.56px] text-navy">
                        {blogCard.buttonLabel}
                      </span>
                      <ArrowRight className="size-3.5 text-navy" />
                    </Link>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      )}
    </header>
  );
}
