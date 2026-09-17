import { ServiceTemplate } from "@/components/ServiceTemplate";
import { fetchServiceSinglePage } from "@/lib/api";
import { mockContent } from "@/content/mock";
import { pageMetadata } from "@/lib/seo";

const TITLE = "Drapery & Curtains | Blinds & Drapery";
const DESCRIPTION =
  "Custom drapery and curtains for South Florida homes. Professional measuring, fabrication, and installation services.";

async function getData() {
  return fetchServiceSinglePage("/services/drapery-curtains/").catch(() => undefined);
}

export async function generateMetadata() {
  const data = await getData();
  const image = data?.content?.hero.backgroundImage ?? mockContent.serviceDrapery.hero.backgroundImage;
  return pageMetadata({ path: "/services/drapery", title: TITLE, description: DESCRIPTION, image });
}

export default async function DraperyPage() {
  const data = await getData();
  return <ServiceTemplate contentKey="serviceDrapery" content={data?.content} faqContent={data?.faq} />;
}
