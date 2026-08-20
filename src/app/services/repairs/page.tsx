import type { Metadata } from "next";
import { ServiceTemplate } from "@/components/ServiceTemplate";

export const metadata: Metadata = {
  title: "Repairs & Maintenance | Blinds & Drapery",
  description:
    "Expert window covering repair and maintenance services for all brands across South Florida. Same-week service available.",
};

export default function RepairsPage() {
  return <ServiceTemplate contentKey="serviceRepairs" />;
}
