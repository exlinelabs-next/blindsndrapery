import type { Metadata } from "next";
import { AboutHero } from "@/components/AboutHero";
import { AboutMission } from "@/components/AboutMission";
import { AboutInstallation } from "@/components/AboutInstallation";
import { AboutTeam } from "@/components/AboutTeam";
import { FAQ } from "@/components/FAQ";

export const metadata: Metadata = {
  title: "About Us | Blinds & Drapery",
  description:
    "Florida's premier window coverings company — learn about our team, direct-to-consumer quoting, and statewide installation services.",
};

export default function AboutPage() {
  return (
    <main>
      <AboutHero />
      <AboutMission />
      <AboutInstallation />
      <AboutTeam />
      <FAQ />
    </main>
  );
}
