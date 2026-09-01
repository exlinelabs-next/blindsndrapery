import type { Metadata } from "next";
import { ServiceTemplate } from "@/components/ServiceTemplate";
import { fetchServiceSinglePage } from "@/lib/api";

export const metadata: Metadata = {
  title: "Drapery & Curtains | Blinds & Drapery",
  description:
    "Custom drapery and curtains for South Florida homes. Professional measuring, fabrication, and installation services.",
};

export default async function DraperyPage() {
  const data = await fetchServiceSinglePage("/services/drapery-curtains/").catch(() => undefined);
  return <ServiceTemplate contentKey="serviceDrapery" content={data?.content} faqContent={data?.faq} />;
}
