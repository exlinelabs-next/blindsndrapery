import type { Metadata } from "next";
import { ServiceTemplate } from "@/components/ServiceTemplate";
import { fetchServiceSinglePage } from "@/lib/api";

export const metadata: Metadata = {
  title: "Shutters | Blinds & Drapery",
  description:
    "Custom plantation and composite shutters designed for South Florida homes. Free in-home consultation and professional installation.",
};

export default async function ShuttersPage() {
  const data = await fetchServiceSinglePage("/services/shutters/").catch(() => undefined);
  return <ServiceTemplate contentKey="serviceShutters" content={data?.content} faqContent={data?.faq} />;
}
