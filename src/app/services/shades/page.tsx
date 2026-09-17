import { ServiceTemplate } from "@/components/ServiceTemplate";
import { fetchServiceSinglePage } from "@/lib/api";
import { mockContent } from "@/content/mock";
import { pageMetadata } from "@/lib/seo";

const TITLE = "Shades | Blinds & Drapery";
const DESCRIPTION =
  "Explore premium solar, roller, cellular, roman, and zebra shades with professional installation across South Florida.";

async function getData() {
  return fetchServiceSinglePage("/services/shades/").catch(() => undefined);
}

export async function generateMetadata() {
  const data = await getData();
  const image = data?.content?.hero.backgroundImage ?? mockContent.serviceShades.hero.backgroundImage;
  return pageMetadata({ path: "/services/shades", title: TITLE, description: DESCRIPTION, image });
}

export default async function ShadesPage() {
  const data = await getData();
  return <ServiceTemplate contentKey="serviceShades" content={data?.content} faqContent={data?.faq} />;
}
