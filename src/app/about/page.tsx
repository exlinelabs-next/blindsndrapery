import type { Metadata } from "next";
import { AboutHero } from "@/components/AboutHero";
import { AboutMission } from "@/components/AboutMission";
import { AboutInstallation } from "@/components/AboutInstallation";
import { FAQ } from "@/components/FAQ";
import { fetchAboutPage } from "@/lib/api";
import { pageMetadata } from "@/lib/seo";

export const metadata: Metadata = pageMetadata({
  path: "/about",
  title: "About Us | Blinds & Drapery",
  description:
    "Florida's premier window coverings company — learn about our team, direct-to-consumer quoting, and statewide installation services.",
});

export default async function AboutPage() {
  const data = await fetchAboutPage().catch(() => undefined);

  return (
    <main>
      <AboutHero content={data?.hero} />
      <AboutMission content={data?.mission} />
      <AboutInstallation content={data?.installation} />
      <FAQ content={data?.faq} />
    </main>
  );
}
