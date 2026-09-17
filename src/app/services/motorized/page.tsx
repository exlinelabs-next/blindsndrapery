import { ServiceTemplate } from "@/components/ServiceTemplate";
import { fetchServiceSinglePage } from "@/lib/api";
import { mockContent } from "@/content/mock";
import { pageMetadata } from "@/lib/seo";

const TITLE = "Motorized & Smart Home | Blinds & Drapery";
const DESCRIPTION =
  "Motorized window coverings with smart home integration. Voice control, scheduling, and automated blinds and shades for South Florida.";

async function getData() {
  return fetchServiceSinglePage("/services/motorized-smart-home/").catch(() => undefined);
}

export async function generateMetadata() {
  const data = await getData();
  const image = data?.content?.hero.backgroundImage ?? mockContent.serviceMotorized.hero.backgroundImage;
  return pageMetadata({ path: "/services/motorized", title: TITLE, description: DESCRIPTION, image });
}

export default async function MotorizedPage() {
  const data = await getData();
  return <ServiceTemplate contentKey="serviceMotorized" content={data?.content} faqContent={data?.faq} />;
}
