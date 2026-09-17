import { ServiceTemplate } from "@/components/ServiceTemplate";
import { fetchServiceSinglePage } from "@/lib/api";
import { mockContent } from "@/content/mock";
import { pageMetadata } from "@/lib/seo";

const TITLE = "Repairs & Maintenance | Blinds & Drapery";
const DESCRIPTION =
  "Expert window covering repair and maintenance services for all brands across South Florida.";

async function getData() {
  return fetchServiceSinglePage("/services/repairs-and-maintenance/").catch(() => undefined);
}

export async function generateMetadata() {
  const data = await getData();
  const image = data?.content?.hero.backgroundImage ?? mockContent.serviceRepairs.hero.backgroundImage;
  return pageMetadata({ path: "/services/repairs", title: TITLE, description: DESCRIPTION, image });
}

export default async function RepairsPage() {
  const data = await getData();
  return <ServiceTemplate contentKey="serviceRepairs" content={data?.content} faqContent={data?.faq} />;
}
