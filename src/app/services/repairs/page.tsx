import type { Metadata } from "next";
import { ServiceTemplate } from "@/components/ServiceTemplate";
import { fetchServiceSinglePage } from "@/lib/api";

export const metadata: Metadata = {
  title: "Repairs & Maintenance | Blinds & Drapery",
  description:
    "Expert window covering repair and maintenance services for all brands across South Florida. Same-week service available.",
};

export default async function RepairsPage() {
  const data = await fetchServiceSinglePage("/services/repairs-and-maintenance/").catch(() => undefined);
  return <ServiceTemplate contentKey="serviceRepairs" content={data?.content} faqContent={data?.faq} />;
}
