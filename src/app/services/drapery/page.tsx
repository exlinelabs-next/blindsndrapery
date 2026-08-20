import type { Metadata } from "next";
import { ServiceTemplate } from "@/components/ServiceTemplate";

export const metadata: Metadata = {
  title: "Drapery & Curtains | Blinds & Drapery",
  description:
    "Custom drapery and curtains for South Florida homes. Professional measuring, fabrication, and installation services.",
};

export default function DraperyPage() {
  return <ServiceTemplate contentKey="serviceDrapery" />;
}
