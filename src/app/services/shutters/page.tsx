import type { Metadata } from "next";
import { ServiceTemplate } from "@/components/ServiceTemplate";

export const metadata: Metadata = {
  title: "Shutters | Blinds & Drapery",
  description:
    "Custom plantation and composite shutters designed for South Florida homes. Free in-home consultation and professional installation.",
};

export default function ShuttersPage() {
  return <ServiceTemplate contentKey="serviceShutters" />;
}
