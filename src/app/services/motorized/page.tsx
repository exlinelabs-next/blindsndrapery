import type { Metadata } from "next";
import { ServiceTemplate } from "@/components/ServiceTemplate";
import { fetchServiceSinglePage } from "@/lib/api";

export const metadata: Metadata = {
  title: "Motorized & Smart Home | Blinds & Drapery",
  description:
    "Motorized window coverings with smart home integration. Voice control, scheduling, and automated blinds and shades for South Florida.",
};

export default async function MotorizedPage() {
  const data = await fetchServiceSinglePage("/services/motorized-smart-home/").catch(() => undefined);
  return <ServiceTemplate contentKey="serviceMotorized" content={data?.content} faqContent={data?.faq} />;
}
