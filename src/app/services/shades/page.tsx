import type { Metadata } from "next";
import { ServiceTemplate } from "@/components/ServiceTemplate";

export const metadata: Metadata = {
  title: "Shades | Blinds & Drapery",
  description:
    "Explore premium solar, roller, cellular, roman, and zebra shades with professional installation across South Florida.",
};

export default function ShadesPage() {
  return <ServiceTemplate contentKey="serviceShades" />;
}
