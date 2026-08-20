import type { Metadata } from "next";
import { ServiceTemplate } from "@/components/ServiceTemplate";

export const metadata: Metadata = {
  title: "Motorized & Smart Home | Blinds & Drapery",
  description:
    "Motorized window coverings with smart home integration. Voice control, scheduling, and automated blinds and shades for South Florida.",
};

export default function MotorizedPage() {
  return <ServiceTemplate contentKey="serviceMotorized" />;
}
