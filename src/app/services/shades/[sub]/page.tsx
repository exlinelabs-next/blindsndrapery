import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { ServiceTemplate } from "@/components/ServiceTemplate";
import { fetchServiceSinglePage } from "@/lib/api";
import type { ServiceContentKey } from "@/types/content";

const subServiceMap: Record<string, { contentKey: ServiceContentKey; title: string; description: string; wpUri?: string }> = {
  "roller-shades": {
    contentKey: "subServiceRollerShades",
    title: "Roller Shades",
    description: "Custom roller shades with professional installation across South Florida. Sleek, modern, and available in light-filtering and blackout fabrics.",
    wpUri: "/services/shades/roller-shades/",
  },
  "solar-shades": {
    contentKey: "subServiceSolarShades",
    title: "Solar Shades",
    description: "Premium solar shades that reduce glare and UV rays while maintaining your view. Professional installation across South Florida.",
    wpUri: "/services/shades/solar-shades/",
  },
  "cellular-shades": {
    contentKey: "subServiceCellularShades",
    title: "Cellular Shades",
    description: "Energy-efficient honeycomb cellular shades with professional installation. Superior insulation for South Florida homes.",
    wpUri: "/services/shades/cellular-shades/",
  },
  "roman-shades": {
    contentKey: "subServiceRomanShades",
    title: "Roman Shades",
    description: "Classic custom roman shades in designer fabrics. Professional measuring and installation across South Florida.",
    wpUri: "/services/shades/roman-shades/",
  },
  "zebra-shades": {
    contentKey: "subServiceZebraShades",
    title: "Zebra Shades",
    description: "Modern dual-layer zebra shades for versatile light and privacy control. Professional installation across South Florida.",
  },
  "woven-wood-shades": {
    contentKey: "subServiceWovenWoodShades",
    title: "Woven Wood Shades",
    description: "Natural bamboo and woven wood shades for organic warmth. Professional installation across South Florida.",
    // WP's own page slug is "woven-shades" (see the redirect in next.config.ts
    // for the reverse direction — the CMS-driven sub-services grid links out
    // using this uri, which doesn't match this app's public route).
    wpUri: "/services/shades/woven-shades/",
  },
};

export async function generateStaticParams() {
  return Object.keys(subServiceMap).map((sub) => ({ sub }));
}

export async function generateMetadata({ params }: { params: Promise<{ sub: string }> }): Promise<Metadata> {
  const { sub } = await params;
  const entry = subServiceMap[sub];
  if (!entry) return {};
  return {
    title: `${entry.title} | Blinds & Drapery`,
    description: entry.description,
  };
}

export default async function SubServicePage({ params }: { params: Promise<{ sub: string }> }) {
  const { sub } = await params;
  const entry = subServiceMap[sub];
  if (!entry) notFound();
  const data = entry.wpUri
    ? await fetchServiceSinglePage(entry.wpUri).catch(() => undefined)
    : undefined;
  return <ServiceTemplate contentKey={entry.contentKey} content={data?.content} faqContent={data?.faq} />;
}
