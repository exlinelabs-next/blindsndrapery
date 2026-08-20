import type { Metadata } from "next";
import { ServiceTemplate } from "@/components/ServiceTemplate";

export const metadata: Metadata = {
  title: "Blinds | Blinds & Drapery",
  description:
    "Engineered faux wood, aluminum, and vertical blinds with professional installation across South Florida.",
};

export default function BlindsPage() {
  return <ServiceTemplate contentKey="serviceBlinds" />;
}
