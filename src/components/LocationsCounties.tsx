import Image from "next/image";
import Link from "next/link";
import { Navigation } from "lucide-react";
import { useContent } from "@/hooks/useContent";
import type { LocationCityCard, LocationCountySection } from "@/types/content";

// Figma "Desktop / Locations Hub " (node 4664:10194), tablet (4748:5900),
// mobile (4748:6080) — 3-column card grid at xl, single column below that,
// matching the tablet/mobile frames exactly (they stack, not just reflow).
export function LocationsCounties({ counties }: { counties?: LocationCountySection[] }) {
  const items = counties ?? useContent("locationsPage").counties;

  return (
    <section className="flex flex-col gap-16 bg-ice px-8 py-14 md:px-12 xl:gap-20 xl:px-20 xl:py-[100px]">
      {items.map((county) => (
        <div key={county.name} className="flex flex-col gap-10">
          <div className="flex flex-col gap-4">
            <p className="font-heading text-[28px] font-semibold leading-[42px] text-teal">
              {county.name}
            </p>
            <div className="flex flex-col gap-4 text-[16px] leading-[23px] text-black">
              {county.paragraphs.map((paragraph, i) => (
                <p key={i}>{paragraph}</p>
              ))}
            </div>
          </div>

          <div className="grid grid-cols-1 gap-6 xl:grid-cols-3">
            {county.cities.map((city) => (
              <LocationCard key={city.name} city={city} />
            ))}
          </div>

          {county.alsoCovering && (
            <div className="flex w-fit items-center gap-2 rounded-lg bg-white p-3">
              <Image
                src="/images/locations/location-group-icon.svg"
                alt=""
                width={24}
                height={24}
                className="size-6 shrink-0"
              />
              <p className="text-navy">
                <span className="text-[16px] leading-[23px]">Also covering:</span>{" "}
                <span className="font-heading text-[18px] font-semibold leading-[27px] tracking-[-0.0648px]">
                  {county.alsoCovering}
                </span>
              </p>
            </div>
          )}
        </div>
      ))}
    </section>
  );
}

// The navy background + decorative pin + white text is the card's :hover
// state (confirmed against Figma node 4692:4482 — the "Fort Lauderdale"
// frame is the hover variant of the same card component, not a permanent
// style for one card), so every card gets it uniformly rather than just
// the first one per county. The divider line that used to sit between the
// description and the link has also been removed from the design.
function LocationCard({ city }: { city: LocationCityCard }) {
  return (
    <div className="group relative flex h-full flex-col gap-10 overflow-hidden rounded-lg border border-[rgba(15,30,60,0.1)] bg-white p-6 shadow-[0px_4px_8px_rgba(0,0,0,0.05)] transition-colors duration-200 hover:bg-navy">
      <Image
        src="/images/locations/location-pin-decorative.svg"
        alt=""
        width={337}
        height={337}
        aria-hidden="true"
        className="pointer-events-none absolute -bottom-10 -right-10 size-[280px] opacity-0 transition-opacity duration-200 group-hover:opacity-100"
      />
      <div className="relative flex items-center gap-2.5">
        <Navigation
          className="size-[18px] shrink-0 text-navy transition-colors duration-200 group-hover:text-white"
          strokeWidth={1.5}
        />
        <p className="font-heading text-[18px] font-semibold leading-[27px] tracking-[-0.0648px] text-navy transition-colors duration-200 group-hover:text-white">
          {city.name}
        </p>
      </div>
      <div className="relative flex flex-1 flex-col items-start justify-between gap-4">
        <p className="text-[14px] leading-[24px] text-black transition-colors duration-200 group-hover:text-white">
          {city.description}
        </p>
        <Link
          href={city.href}
          className="font-heading text-[15px] font-semibold leading-[27.2px] tracking-[0.56px] text-[#3e605e] transition-colors duration-200 group-hover:text-[#cddcdb]"
        >
          Get an Estimate →
        </Link>
      </div>
    </div>
  );
}
