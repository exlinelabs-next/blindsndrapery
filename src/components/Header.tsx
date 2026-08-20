"use client";

import { useEffect, useRef, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { ChevronDown, ChevronRight, Menu, X } from "lucide-react";
import { useContent } from "@/hooks/useContent";
import { Button } from "@/components/ui/Button";

// "use client" is required here: the "Services" nav item opens a mega-menu
// dropdown (Figma node "Frame 462", authored hidden right below the nav at
// the same x/y region) on click, which needs local open/close state plus an
// outside-click / Escape handler. Below `lg` (the confirmed tablet/mobile
// frames both replace the full nav row with a single hamburger icon,
// "pepicons-pop:menu"), the same header instead renders a slide-down drawer
// with its own open/close state.
export function Header() {
  const { logo, servicesLabel, servicesDropdown, links, ctaLabel, ctaHref } = useContent("nav");
  const [servicesOpen, setServicesOpen] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [mobileServicesOpen, setMobileServicesOpen] = useState(false);
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

  // If the viewport grows back past `xl` while the mobile drawer is open
  // (e.g. rotating a tablet, or resizing a desktop window back up), close it
  // so it can't be left open-but-hidden behind the now-visible desktop nav.
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

  const expandedCategories = servicesDropdown.categories.filter((category) => category.subItems);

  return (
    // Note: the Figma frame has `overflow-clip` on this container, but that's
    // dropped here on purpose — it would clip the mega-menu panel, which is
    // meant to render below the header, not inside its 108px height.
    <header
      ref={headerRef}
      className={`sticky top-0 z-50 flex h-[100px] w-full items-center justify-between border-b border-ice bg-white pl-12 pr-4 py-6 transition-transform duration-300 xl:h-[108px] xl:px-20 ${headerVisible ? "translate-y-0" : "-translate-y-full"}`}
    >
      <Link href={logo.href} className="shrink-0">
        {/* TODO: temporary Figma asset URL, expires ~7 days — export and commit to public/images/ before then. */}
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
          className="flex cursor-pointer items-center gap-2 text-base leading-[23px] text-navy"
        >
          {servicesLabel}
          <ChevronDown className={`size-3 transition-transform ${servicesOpen ? "rotate-180" : ""}`} />
        </button>

        {links.map((link) => (
          <Link
            key={link.label}
            href={link.href}
            className="whitespace-nowrap text-base leading-[23px] text-navy transition-colors hover:text-teal"
          >
            {link.label}
          </Link>
        ))}
      </nav>

      <Button href={ctaHref} className="hidden xl:inline-flex">
        {ctaLabel}
      </Button>

      {/* Hamburger toggle: only the icon changes in the confirmed frames
          (no separate "close" glyph shown), but swapping to X while open is
          a standard, low-risk affordance rather than a deviation. */}
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

      {servicesOpen && (
        <div className="absolute left-0 top-full z-50 hidden w-full items-start justify-between bg-white py-10 pl-20 shadow-[0px_4px_2px_rgba(0,0,0,0.15)] xl:flex">
          <div className="flex items-start gap-[120px]">
            <div className="flex w-[220px] flex-col items-start gap-4">
              {servicesDropdown.categories.map((category) =>
                category.subItems ? (
                  <div key={category.label} className="flex w-full items-center gap-4 rounded p-1">
                    {/* Design uses a one-off #4e7875 here rather than the
                        established teal token (#5f8f8b); kept on-token per
                        project convention instead of introducing a new hex. */}
                    <Link
                      href={category.href}
                      className="whitespace-nowrap text-lg font-semibold tracking-[-0.0648px] text-teal"
                    >
                      {category.label}
                    </Link>
                    {/* This chevron previously had a stray -rotate-90 left
                        over from following the Figma source's own
                        construction technique (Figma builds it from a
                        down-pointing Vector rotated -90deg to end up
                        pointing right) — applying that same -90 rotation to
                        lucide's ChevronRight, which already points right,
                        rotated it a second time into pointing up. Removed:
                        ChevronRight needs no rotation to point right. */}
                    <ChevronRight className="size-[10px] text-teal" />
                  </div>
                ) : (
                  <Link key={category.label} href={category.href} className="w-full text-base leading-[23px] text-navy">
                    {category.label}
                  </Link>
                ),
              )}
            </div>

            {expandedCategories.map((category) => (
              <div key={category.label} className="flex flex-col items-start gap-4 text-base leading-[23px] text-teal">
                {category.subItems?.map((sub) => (
                  <Link key={sub.label} href={sub.href} className="w-full whitespace-nowrap">
                    {sub.label}
                  </Link>
                ))}
              </div>
            ))}
          </div>

          <div className="relative h-[355px] w-[742px] shrink-0">
            {/* TODO: temporary Figma asset URL, expires ~7 days — export and commit to public/images/ before then. */}
            <Image
              src={servicesDropdown.image.src}
              alt={servicesDropdown.image.alt}
              fill
              className="object-cover"
            />
          </div>
        </div>
      )}

      {/* Mobile/tablet drawer: replaces the desktop nav row + mega-menu with
          a stacked list (services expandable inline, then the page links,
          then the CTA), matching the confirmed tablet (2806:1529) and
          mobile (2810:2235) frames. */}
      {mobileMenuOpen && (
        <div className="absolute left-0 top-full z-50 flex max-h-[calc(100vh-100px)] w-full flex-col items-start gap-6 overflow-y-auto bg-white px-8 py-8 shadow-[0px_4px_2px_rgba(0,0,0,0.15)] xl:hidden">
          <div className="flex w-full flex-col items-start gap-4">
            <button
              type="button"
              onClick={() => setMobileServicesOpen((open) => !open)}
              aria-expanded={mobileServicesOpen}
              className="flex w-full cursor-pointer items-center justify-between text-base leading-[23px] text-navy"
            >
              {servicesLabel}
              <ChevronDown className={`size-4 transition-transform ${mobileServicesOpen ? "rotate-180" : ""}`} />
            </button>

            {mobileServicesOpen && (
              <div className="flex w-full flex-col items-start gap-4 pl-4">
                {servicesDropdown.categories.map((category) =>
                  category.subItems ? (
                    <div key={category.label} className="flex w-full flex-col items-start gap-2">
                      <p className="whitespace-nowrap text-base font-semibold tracking-[-0.0648px] text-teal">
                        {category.label}
                      </p>
                      <div className="flex w-full flex-col items-start gap-2 pl-4">
                        {category.subItems.map((sub) => (
                          <Link
                            key={sub.label}
                            href={sub.href}
                            onClick={() => setMobileMenuOpen(false)}
                            className="w-full whitespace-nowrap text-sm text-navy"
                          >
                            {sub.label}
                          </Link>
                        ))}
                      </div>
                    </div>
                  ) : (
                    <Link
                      key={category.label}
                      href={category.href}
                      onClick={() => setMobileMenuOpen(false)}
                      className="w-full text-base text-navy"
                    >
                      {category.label}
                    </Link>
                  ),
                )}
              </div>
            )}
          </div>

          {links.map((link) => (
            <Link
              key={link.label}
              href={link.href}
              onClick={() => setMobileMenuOpen(false)}
              className="w-full whitespace-nowrap text-base leading-[23px] text-navy"
            >
              {link.label}
            </Link>
          ))}

          <Button href={ctaHref}>{ctaLabel}</Button>
        </div>
      )}
    </header>
  );
}
