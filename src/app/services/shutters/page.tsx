import { ServiceTemplate } from "@/components/ServiceTemplate";
import { fetchServiceSinglePage } from "@/lib/api";
import { mockContent } from "@/content/mock";
import { pageMetadata } from "@/lib/seo";

const TITLE = "Shutters | Blinds & Drapery";
const DESCRIPTION =
  "Custom interior and composite shutters designed for South Florida homes. Free in-home consultation and professional installation.";

async function getData() {
  return fetchServiceSinglePage("/services/shutters/").catch(() => undefined);
}

export async function generateMetadata() {
  const data = await getData();
  const image = data?.content?.hero.backgroundImage ?? mockContent.serviceShutters.hero.backgroundImage;
  return pageMetadata({ path: "/services/shutters", title: TITLE, description: DESCRIPTION, image });
}

export default async function ShuttersPage() {
  const data = await getData();
  return <ServiceTemplate contentKey="serviceShutters" content={data?.content} faqContent={data?.faq} />;
}
