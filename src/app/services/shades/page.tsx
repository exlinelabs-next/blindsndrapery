import type { Metadata } from "next";
import { ServiceTemplate } from "@/components/ServiceTemplate";
import { fetchServiceSinglePage } from "@/lib/api";

export const metadata: Metadata = {
  title: "Shades | Blinds & Drapery",
  description:
    "Explore premium solar, roller, cellular, roman, and zebra shades with professional installation across South Florida.",
};

export default async function ShadesPage() {
  const data = await fetchServiceSinglePage("/services/shades/").catch(() => undefined);
  return <ServiceTemplate contentKey="serviceShades" content={data?.content} faqContent={data?.faq} />;
}
