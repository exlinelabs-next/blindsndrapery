import type { Metadata } from "next";
import { ServiceTemplate } from "@/components/ServiceTemplate";
import { fetchServiceSinglePage } from "@/lib/api";

export const metadata: Metadata = {
  title: "Blinds | Blinds & Drapery",
  description:
    "Engineered faux wood, aluminum, and vertical blinds with professional installation across South Florida.",
};

export default async function BlindsPage() {
  const data = await fetchServiceSinglePage("/services/blinds/").catch(() => undefined);
  return <ServiceTemplate contentKey="serviceBlinds" content={data?.content} faqContent={data?.faq} />;
}
