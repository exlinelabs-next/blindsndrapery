import { ServiceTemplate } from "@/components/ServiceTemplate";
import { fetchServiceSinglePage } from "@/lib/api";
import { mockContent } from "@/content/mock";
import { pageMetadata } from "@/lib/seo";

const TITLE = "Blinds | Blinds & Drapery";
const DESCRIPTION =
  "Engineered faux wood, aluminum, and vertical blinds with professional installation across South Florida.";

async function getData() {
  return fetchServiceSinglePage("/services/blinds/").catch(() => undefined);
}

export async function generateMetadata() {
  const data = await getData();
  const image = data?.content?.hero.backgroundImage ?? mockContent.serviceBlinds.hero.backgroundImage;
  return pageMetadata({ path: "/services/blinds", title: TITLE, description: DESCRIPTION, image });
}

export default async function BlindsPage() {
  const data = await getData();
  return <ServiceTemplate contentKey="serviceBlinds" content={data?.content} faqContent={data?.faq} />;
}
