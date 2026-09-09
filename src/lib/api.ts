import { fetchGraphQL } from "./graphql";
import { serviceIntroPlaceholder } from "@/content/mock";
import {
  HEADER_NAV_AND_BUTTON,
  SITE_ICON_AND_LOGO,
  FOOTER_QUERY,
  ALL_FOOTER_MENUS,
  HOME_PAGE_QUERY,
  SERVICE_CARDS_QUERY,
  FAQ_QUERY,
  LOCATIONS_LIST_QUERY,
  COMMERCIAL_PAGE_QUERY,
  SERVICE_SINGLE_PAGE_QUERY,
  SERVICE_PAGE_QUERY,
  LOCATIONS_HUB_PAGE_QUERY,
  ABOUT_PAGE_QUERY,
  TEAM_QUERY,
  FREE_QUOTE_PAGE_QUERY,
  GALLERY_PAGE_QUERY,
  GALLERY_ITEMS_QUERY,
  LOCATION_SINGLE_PAGE_QUERY,
  BLOG_ARCHIVE_PAGE_QUERY,
  BLOG_POSTS_CARDS_QUERY,
  KB_ARCHIVE_PAGE_QUERY,
  KNOWLEDGEBASE_CARDS_QUERY,
  POLICY_PAGE_QUERY,
  BLOG_SINGLE_PAGE_QUERY,
  KNOWLEDGE_BASE_SINGLE_PAGE_QUERY,
} from "./queries";
import type {
  NavContent,
  FooterContent,
  HeroContent,
  TrustBadgesContent,
  ProcessIntroContent,
  ServicesGlimpseContent,
  FeaturedCategoryContent,
  HowItWorksContent,
  QuoteGalleryContent,
  CommercialContent,
  RepairMaintenanceContent,
  LocationsContent,
  QuoteFormContent,
  FaqContent,
  ServiceCard,
  ServiceHowItWorksContent,
  ServiceAboutContent,
  CommercialHeroContent,
  CommercialPlacesContent,
  InstallationGalleryContent,
  CommercialQuoteFormContent,
  LocationsHeroContent,
  ServiceAreaPanelContent,
  ComingSoonStatesContent,
  ServiceInlinePageContent,
  AboutPageContent,
  FreeQuotePageContent,
  GalleryPageContent,
  CityPageContent,
  ResourcesPageContent,
  KnowledgeBasePageContent,
  LegalPageContent,
  BlogArticlePageContent,
  KnowledgeArticlePageContent,
  ConsultationCtaContent,
} from "@/types/content";

// ---------------------------------------------------------------------------
// Helpers
// ---------------------------------------------------------------------------

interface WPImage {
  node: { altText: string; title?: string; mediaItemUrl: string } | null;
}

function img(wp: WPImage | null | undefined): { src: string; alt: string } {
  return {
    src: wp?.node?.mediaItemUrl ?? "",
    alt: wp?.node?.altText ?? "",
  };
}

function stripHtml(html: string | null | undefined): string {
  if (!html) return "";
  return html
    .replace(/<[^>]*>/g, "")
    .replace(/&nbsp;/g, " ")
    .replace(/&#8217;/g, "’")
    .replace(/&#8220;/g, "“")
    .replace(/&#8221;/g, "”")
    .replace(/&#0*38;/g, "&")
    .replace(/&amp;/g, "&")
    .trim();
}

function toTitleCase(s: string): string {
  if (!s) return s;
  return s
    .toLowerCase()
    .replace(/\b\w/g, (c) => c.toUpperCase());
}

function parseSplHeading(raw: string): {
  prefix: string;
  highlight: string;
  suffix: string;
} {
  const match = raw.match(/^([\s\S]*?)<spl>([\s\S]*?)<(?:\/spl|spl)>([\s\S]*)$/);
  if (!match) return { prefix: raw, highlight: "", suffix: "" };
  return { prefix: match[1], highlight: match[2], suffix: match[3] };
}

function parseSplSegments(
  raw: string,
): Array<{ text: string; emphasis?: boolean }> {
  const segments: Array<{ text: string; emphasis?: boolean }> = [];
  const parts = raw.split(/<\/?spl>/);
  let inSpl = false;
  for (const part of parts) {
    if (part) segments.push({ text: part, emphasis: inSpl || undefined });
    inSpl = !inSpl;
  }
  return segments;
}

// ---------------------------------------------------------------------------
// WP response shapes (just enough typing to safely destructure)
// ---------------------------------------------------------------------------

interface WPMenuItem {
  label: string;
  uri: string;
  childItems?: { nodes: WPMenuItem[] };
}

interface WPMenuColumn {
  nodes: WPMenuItem[];
}

// ---------------------------------------------------------------------------
// Header
// ---------------------------------------------------------------------------

interface HeaderAPIResponse {
  page: {
    headerFields: {
      headerSiteLogo: WPImage;
      headerButtonText: string;
      headerButtonUrl: string;
    };
  };
  menuItems: { nodes: WPMenuItem[] };
  latestPosts: {
    nodes: Array<{ title: string; excerpt: string; uri: string; featuredImage: WPImage }>;
  };
  footerSocials: {
    footerFields: {
      socialIcon1: WPImage;
      socialUrl1: string;
      socialIcon2: WPImage;
      socialUrl2: string;
      socialIcon3: WPImage;
      socialUrl3: string;
      socialIcon4: WPImage;
      socialUrl4: string;
    };
  };
}

const NAV_CATEGORY_IMAGE_BY_LABEL: Record<string, string> = {
  Blinds: "/images/services/card-blinds.webp",
  Shades: "/images/services/card-shades.webp",
  Shutters: "/images/services/card-shutters.webp",
  "Curtains & Drapery": "/images/services/card-drapery.webp",
  "Drapery & Curtains": "/images/services/card-drapery.webp",
  "Motorized & Smart Home": "/images/services/card-motorized.webp",
  "Repairs & Maintenance": "/images/services/card-repairs.webp",
};

export async function fetchNav(): Promise<NavContent> {
  const [logoData, navData] = await Promise.all([
    fetchGraphQL<{ page: { headerFields: { headerSiteLogo: WPImage } } }>(
      SITE_ICON_AND_LOGO,
    ),
    fetchGraphQL<HeaderAPIResponse>(HEADER_NAV_AND_BUTTON),
  ]);

  const hf = navData.page.headerFields;
  const logoImg = img(logoData.page.headerFields.headerSiteLogo);
  const menuItems = navData.menuItems.nodes;

  const servicesItem = menuItems.find((m) => m.label === "Services");
  const otherLinks = menuItems
    .filter((m) => m.label !== "Services")
    .map((m) => ({
      label: m.label,
      href: m.uri.replace(/\/$/, "") || "/",
    }));

  const categories = (servicesItem?.childItems?.nodes ?? []).map((child) => ({
    label: child.label,
    href: child.uri.replace(/\/$/, ""),
    // WP menu items have no image field of their own, so this mirrors the
    // mock fallback: reuse each service's existing card image asset rather
    // than an unverified CMS field.
    image: { src: NAV_CATEGORY_IMAGE_BY_LABEL[child.label] ?? "/images/services/card-shades.webp", alt: child.label },
    subItems: (child.childItems?.nodes ?? []).map((sub) => ({
      label: sub.label,
      href: sub.uri.replace(/\/$/, ""),
    })),
    exploreLabel: `Explore ${child.label}`,
  }));

  const latestPost = navData.latestPosts.nodes[0];
  const sf = navData.footerSocials.footerFields;
  const socialLinks = [
    { icon: sf.socialIcon1, url: sf.socialUrl1 },
    { icon: sf.socialIcon2, url: sf.socialUrl2 },
    { icon: sf.socialIcon3, url: sf.socialUrl3 },
    { icon: sf.socialIcon4, url: sf.socialUrl4 },
  ].map((s) => ({
    platform: guessPlatform(s.icon?.node?.altText ?? ""),
    href: s.url,
    label: s.icon?.node?.altText ?? "",
  }));

  return {
    logo: { src: logoImg.src, alt: logoImg.alt, href: "/" },
    servicesLabel: "Services",
    servicesDropdown: {
      categories,
      blogCard: latestPost
        ? {
            image: img(latestPost.featuredImage),
            title: latestPost.title,
            description: stripHtml(latestPost.excerpt),
            buttonLabel: "Explore Blogs",
            buttonHref: "/resources",
          }
        : { image: { src: "", alt: "" }, title: "", description: "", buttonLabel: "", buttonHref: "" },
      socialLinks,
      // No CMS field confirmed for this block yet; copy and placeholder
      // phone number mirror the mock fallback (see mock.ts nav.helpBar).
      helpBar: {
        prefix: "Need help measuring?",
        ctaLabel: "Book Free Consultation",
        ctaHref: "#quote-form",
        phoneLabel: "Call Us: (800) XXX-XXXX",
      },
    },
    links: otherLinks,
    ctaLabel: toTitleCase(hf.headerButtonText),
    ctaHref: hf.headerButtonUrl,
  };
}

// ---------------------------------------------------------------------------
// Footer
// ---------------------------------------------------------------------------

interface FooterAPIResponse {
  page: {
    footerFields: {
      footerSiteLogo: WPImage;
      footerLogo1: WPImage;
      footerLogo2: WPImage;
      socialIcon1: WPImage;
      socialUrl1: string;
      socialIcon2: WPImage;
      socialUrl2: string;
      socialIcon3: WPImage;
      socialUrl3: string;
      socialIcon4: WPImage;
      socialUrl4: string;
    };
  };
}

interface FooterMenusResponse {
  footerCol1: WPMenuColumn;
  footerCol2: WPMenuColumn;
  footerCol3: WPMenuColumn;
  footerCol4: WPMenuColumn;
}

function guessPlatform(
  alt: string,
): "instagram" | "facebook" | "youtube" | "linkedin" {
  const lower = alt.toLowerCase();
  if (lower.includes("instagram")) return "instagram";
  if (lower.includes("facebook")) return "facebook";
  if (lower.includes("youtube")) return "youtube";
  return "linkedin";
}

function menuColumn(col: WPMenuColumn, title: string, showChevron = false) {
  const links = col.nodes.map((n) => ({
    label: n.label,
    href: n.uri.replace(/\/$/, "") || "#",
  }));
  return { title, links, ...(showChevron ? { showChevron } : {}) };
}

export async function fetchFooter(): Promise<FooterContent> {
  const [footerData, menusData] = await Promise.all([
    fetchGraphQL<FooterAPIResponse>(FOOTER_QUERY),
    fetchGraphQL<FooterMenusResponse>(ALL_FOOTER_MENUS),
  ]);

  const ff = footerData.page.footerFields;
  const logoImg = img(ff.footerSiteLogo);

  const socialLinks = [
    { icon: ff.socialIcon1, url: ff.socialUrl1 },
    { icon: ff.socialIcon2, url: ff.socialUrl2 },
    { icon: ff.socialIcon3, url: ff.socialUrl3 },
    { icon: ff.socialIcon4, url: ff.socialUrl4 },
  ].map((s) => ({
    platform: guessPlatform(s.icon?.node?.altText ?? ""),
    href: s.url,
    label: s.icon?.node?.altText ?? "",
  }));

  return {
    logo: { src: logoImg.src, alt: logoImg.alt, href: "/" },
    description: "Custom window coverings, measured and fitted across Florida.",
    badges: [
      { src: img(ff.footerLogo1).src, alt: img(ff.footerLogo1).alt, aspectRatio: "269/187" },
      { src: img(ff.footerLogo2).src, alt: img(ff.footerLogo2).alt, aspectRatio: "142/80" },
    ],
    columns: [
      menuColumn(menusData.footerCol1, "Explore"),
      menuColumn(menusData.footerCol2, "Services", true),
      menuColumn(menusData.footerCol3, "Inspiration"),
      menuColumn(menusData.footerCol4, "Contact"),
    ],
    contact: {
      servingAreaText: "Serving Broward County and Florida statewide",
      phone: "(555) 010-3456",
      email: "info@blindsndrapery.com",
      cta: { label: "Book consultation", href: "/free-quote" },
    },
    trustHighlights: [
      "Licensed & Insured",
      "10+ Years in Business",
      "Manufacturer Guarantee",
    ],
    copyright: `© ${new Date().getFullYear()} Blinds & Drapery Co. All rights reserved`,
    legalLinks: [
      { label: "Terms of Use", href: "/privacy-policy" },
      { label: "Privacy Policy", href: "/privacy-policy" },
    ],
    socialLinks,
  };
}

// ---------------------------------------------------------------------------
// Home page
// ---------------------------------------------------------------------------

interface HomePageResponse {
  page: {
    featuredImage: WPImage;
    homePageFields: Record<string, unknown>;
  };
}

export async function fetchHero(): Promise<HeroContent> {
  const data = await fetchGraphQL<HomePageResponse>(HOME_PAGE_QUERY);
  const hp = data.page.homePageFields;
  return {
    heading: hp.heroSectionHeading as string,
    subheading: hp.heroSectionText as string,
    ctaLabel: toTitleCase(hp.heroSectionButtonText as string),
    ctaHref: hp.heroSectionButtonUrl as string,
    backgroundImage: img(data.page.featuredImage),
  };
}

export async function fetchTrustBadges(): Promise<TrustBadgesContent> {
  const data = await fetchGraphQL<HomePageResponse>(HOME_PAGE_QUERY);
  const hp = data.page.homePageFields;
  const items = [];
  for (let i = 1; i <= 5; i++) {
    const iconField = hp[`iconListIcon${i}`] as WPImage | null;
    const text = hp[`iconListText${i}`] as string;
    items.push({ icon: iconField?.node?.mediaItemUrl ?? null, label: text });
  }
  return { items };
}

export async function fetchProcessIntro(): Promise<ProcessIntroContent> {
  const data = await fetchGraphQL<HomePageResponse>(HOME_PAGE_QUERY);
  const hp = data.page.homePageFields;
  const heading = parseSplHeading(hp.section2Heading as string);
  return {
    eyebrow: toTitleCase(hp.section2SubHeading as string),
    headingPrefix: heading.prefix,
    headingHighlight: heading.highlight,
    description: hp.section2Text as string,
    video: {
      poster: { src: hp.section2VideoUrl as string, alt: "Process video" },
      playIcon: { src: "", alt: "" },
    },
  };
}

export async function fetchServicesGlimpse(): Promise<ServicesGlimpseContent> {
  const [homeData, cardsData] = await Promise.all([
    fetchGraphQL<HomePageResponse>(HOME_PAGE_QUERY),
    fetchGraphQL<{
      services: {
        nodes: Array<{
          title: string;
          excerpt: string;
          uri: string;
          featuredImage: WPImage;
        }>;
      };
    }>(SERVICE_CARDS_QUERY),
  ]);

  const hp = homeData.page.homePageFields;
  const segments = parseSplSegments(hp.serviceSectionHeading as string);

  const cards = cardsData.services.nodes.map((s) => ({
    image: img(s.featuredImage),
    title: s.title,
    description: stripHtml(s.excerpt),
    href: s.uri.replace(/\/$/, ""),
  }));

  while (cards.length < 6)
    cards.push({ image: { src: "", alt: "" }, title: "", description: "", href: "#" });

  return {
    eyebrow: toTitleCase(hp.serviceSectionSubHeading as string),
    headingSegments: segments,
    servicesSummary: hp.serviceSectionText as string,
    ctaLabel: "Learn More",
    cards: cards.slice(0, 6) as ServicesGlimpseContent["cards"],
  };
}

export async function fetchFeaturedCategory(): Promise<FeaturedCategoryContent> {
  const data = await fetchGraphQL<HomePageResponse>(HOME_PAGE_QUERY);
  const hp = data.page.homePageFields;
  const heading = parseSplHeading(hp.section3Heading as string);
  const text = hp.section3Text as string;
  const paragraphs = text
    .split(/<\/?p>/)
    .map((s) => s.trim())
    .filter(Boolean);
  return {
    eyebrow: toTitleCase(hp.section3SubHeading as string),
    headingPrefix: heading.prefix,
    headingHighlight: heading.highlight,
    headingSuffix: heading.suffix,
    paragraphs,
    image: img(hp.section3Image as WPImage),
  };
}

export async function fetchHowItWorks(): Promise<HowItWorksContent> {
  const data = await fetchGraphQL<HomePageResponse>(HOME_PAGE_QUERY);
  const hp = data.page.homePageFields;
  const heading = parseSplHeading(hp.howWeWorkSectionHeading as string);
  const steps = [];
  for (let i = 1; i <= 4; i++) {
    steps.push({
      stepLabel: `Step ${i}`,
      icon: img(hp[`iconStep${i}`] as WPImage).src,
      title: (hp[`titleStep${i}`] as string).replace(/\s+/g, " ").trim(),
      description: hp[`paragraphStep${i}`] as string,
    });
  }
  return {
    eyebrow: toTitleCase(hp.howWeWorkSectionSubHeading as string),
    headingPrefix: heading.prefix,
    headingHighlight: heading.highlight,
    description: hp.howWeWorkSectionText as string,
    steps,
    ctaLabel: toTitleCase(hp.howWeWorkSectionButtonText as string),
    ctaHref: hp.howWeWorkSectionButtonUrl as string,
  };
}

export async function fetchQuoteGallery(): Promise<QuoteGalleryContent> {
  const data = await fetchGraphQL<HomePageResponse>(HOME_PAGE_QUERY);
  const hp = data.page.homePageFields;
  return {
    quote: stripHtml(hp.reviewSectionQuote as string),
    quoteIcon: { src: "/images/shared/icons/footer-icon-1.svg", alt: "" },
    images: [
      img(hp.reviewSectionGalleryImage1 as WPImage),
      img(hp.reviewSectionGalleryImage2 as WPImage),
      img(hp.reviewSectionGalleryImage3 as WPImage),
      img(hp.reviewSectionGalleryImage4 as WPImage),
    ] as QuoteGalleryContent["images"],
  };
}

export async function fetchCommercial(): Promise<CommercialContent> {
  const data = await fetchGraphQL<HomePageResponse>(HOME_PAGE_QUERY);
  const hp = data.page.homePageFields;
  const bodyRaw = hp.commercialSectionText as string;
  return {
    eyebrow: toTitleCase(hp.commercialSectionSubHeading as string),
    heading: hp.commercialSectionHeading as string,
    subheading: "",
    body: stripHtml(bodyRaw),
    ctaLabel: toTitleCase(hp.commercialSectionButtonText as string),
    ctaHref: hp.commercialSectionButtonUrl as string,
    image: img(hp.commercialSectionImage as WPImage),
  };
}

export async function fetchRepairMaintenance(): Promise<RepairMaintenanceContent> {
  const data = await fetchGraphQL<HomePageResponse>(HOME_PAGE_QUERY);
  const hp = data.page.homePageFields;
  const heading = parseSplHeading(hp.repairSectionHeading as string);
  return {
    eyebrow: toTitleCase(hp.repairSectionSubHeading as string),
    icon: img(hp.repairSectionIcon as WPImage).src,
    headingPrefix: heading.prefix,
    headingHighlight: heading.highlight,
    headingSuffix: heading.suffix,
    description: hp.repairSectionText as string,
  };
}

export async function fetchLocations(): Promise<LocationsContent> {
  const [homeData, locationsData] = await Promise.all([
    fetchGraphQL<HomePageResponse>(HOME_PAGE_QUERY),
    fetchGraphQL<{ locations: { nodes: Array<{ title: string; uri: string }> } }>(
      LOCATIONS_LIST_QUERY,
    ),
  ]);

  const hp = homeData.page.homePageFields;
  const pinIcons = [
    "/images/shared/icons/footer-icon-2.svg",
    "/images/shared/icons/footer-icon-3.svg",
    "/images/shared/icons/footer-icon-4.svg",
  ];
  const cities = locationsData.locations.nodes.map((loc, i) => ({
    icon: { src: pinIcons[i % pinIcons.length], alt: "" },
    name: loc.title,
  }));

  return {
    eyebrow: toTitleCase(hp.locationsSectionSubHeading as string),
    heading: hp.locationsSectionHeading as string,
    description: hp.locationsSectionText as string,
    cities,
  };
}

export async function fetchQuoteForm(): Promise<QuoteFormContent> {
  const data = await fetchGraphQL<HomePageResponse>(HOME_PAGE_QUERY);
  const hp = data.page.homePageFields;
  return {
    eyebrow: toTitleCase(hp.formSubHeading as string),
    heading: hp.formHeading as string,
    description: stripHtml(hp.formParagraph as string),
    nameLabel: "Name",
    namePlaceholder: "Your full name",
    emailLabel: "Email",
    emailPlaceholder: "name@email.com",
    phoneLabel: "Phone",
    phonePlaceholder: "(555) 555-5555",
    serviceLabel: "Service Interest",
    servicePlaceholder: "Select a service",
    serviceOptions: [
      "Blinds",
      "Shades",
      "Drapery & Curtains",
      "Shutters",
      "Motorized & Smart Home",
      "Repairs & Maintenance",
    ],
    projectLabel: "Tell us about your project",
    projectPlaceholder: "Describe your project...",
    submitLabel: "Submit Estimate Request",
    successMessage: "Thank you! We'll get back to you within 24 hours.",
  };
}

// ---------------------------------------------------------------------------
// FAQ
// ---------------------------------------------------------------------------

interface FaqAPIResponse {
  faqCategories: {
    nodes: Array<{
      name: string;
      slug: string;
      faqs: { nodes: Array<{ title: string; content: string }> };
    }>;
  };
}

export async function fetchFaq(): Promise<FaqContent> {
  const data = await fetchGraphQL<FaqAPIResponse>(FAQ_QUERY);
  const categories = data.faqCategories.nodes.map((c) => c.name);
  const items = data.faqCategories.nodes.flatMap((cat) =>
    cat.faqs.nodes.map((faq) => ({
      question: faq.title,
      answer: stripHtml(faq.content),
      category: cat.name,
    })),
  );

  return {
    eyebrow: "FAQ",
    heading: "Have Questions? We Have Answers",
    categories,
    items,
  };
}

// ---------------------------------------------------------------------------
// Service cards (reusable)
// ---------------------------------------------------------------------------

export async function fetchServiceCards(): Promise<ServiceCard[]> {
  const data = await fetchGraphQL<{
    services: {
      nodes: Array<{
        title: string;
        excerpt: string;
        uri: string;
        featuredImage: WPImage;
      }>;
    };
  }>(SERVICE_CARDS_QUERY);

  return data.services.nodes.map((s) => ({
    image: img(s.featuredImage),
    title: s.title,
    description: stripHtml(s.excerpt),
    href: s.uri.replace(/\/$/, ""),
  }));
}

// ---------------------------------------------------------------------------
// Aggregate home page fetch (single batched call avoids multiple round trips)
// ---------------------------------------------------------------------------

export async function fetchHomePage() {
  const [homeData, cardsData, locationsData, faqData] = await Promise.all([
    fetchGraphQL<HomePageResponse>(HOME_PAGE_QUERY),
    fetchGraphQL<{
      services: {
        nodes: Array<{
          title: string;
          excerpt: string;
          uri: string;
          featuredImage: WPImage;
        }>;
      };
    }>(SERVICE_CARDS_QUERY),
    fetchGraphQL<{ locations: { nodes: Array<{ title: string; uri: string }> } }>(
      LOCATIONS_LIST_QUERY,
    ),
    fetchGraphQL<FaqAPIResponse>(FAQ_QUERY),
  ]);

  const hp = homeData.page.homePageFields;

  const heroContent: HeroContent = {
    heading: hp.heroSectionHeading as string,
    subheading: hp.heroSectionText as string,
    ctaLabel: toTitleCase(hp.heroSectionButtonText as string),
    ctaHref: hp.heroSectionButtonUrl as string,
    backgroundImage: img(homeData.page.featuredImage),
  };

  const trustBadgesItems = [];
  for (let i = 1; i <= 5; i++) {
    const iconField = hp[`iconListIcon${i}`] as WPImage | null;
    const text = hp[`iconListText${i}`] as string;
    trustBadgesItems.push({ icon: iconField?.node?.mediaItemUrl ?? null, label: text });
  }
  const trustBadgesContent: TrustBadgesContent = { items: trustBadgesItems };

  const piHeading = parseSplHeading(hp.section2Heading as string);
  const processIntroContent: ProcessIntroContent = {
    eyebrow: toTitleCase(hp.section2SubHeading as string),
    headingPrefix: piHeading.prefix,
    headingHighlight: piHeading.highlight,
    description: hp.section2Text as string,
    video: {
      poster: { src: hp.section2VideoUrl as string, alt: "Process video" },
      playIcon: { src: "", alt: "" },
    },
  };

  const serviceCards = cardsData.services.nodes.map((s) => ({
    image: img(s.featuredImage),
    title: s.title,
    description: stripHtml(s.excerpt),
    href: s.uri.replace(/\/$/, ""),
  }));
  while (serviceCards.length < 6)
    serviceCards.push({ image: { src: "", alt: "" }, title: "", description: "", href: "#" });

  const servicesGlimpseContent: ServicesGlimpseContent = {
    eyebrow: toTitleCase(hp.serviceSectionSubHeading as string),
    headingSegments: parseSplSegments(hp.serviceSectionHeading as string),
    servicesSummary: hp.serviceSectionText as string,
    ctaLabel: "Learn More",
    cards: serviceCards.slice(0, 6) as ServicesGlimpseContent["cards"],
  };

  const fcHeading = parseSplHeading(hp.section3Heading as string);
  const fcText = hp.section3Text as string;
  const featuredCategoryContent: FeaturedCategoryContent = {
    eyebrow: toTitleCase(hp.section3SubHeading as string),
    headingPrefix: fcHeading.prefix,
    headingHighlight: fcHeading.highlight,
    headingSuffix: fcHeading.suffix,
    paragraphs: fcText
      .split(/<\/?p>/)
      .map((s) => s.trim())
      .filter(Boolean),
    image: img(hp.section3Image as WPImage),
    // Figma's "Explore Shutters" CTA on this fixed Shutters showcase block
    // has no corresponding WP field (the query has no section3Button*
    // fields — confirmed by a "Cannot query field" GraphQL error) — same
    // hardcoded precedent as the Shutters page's own about.cta below.
    cta: { label: "Explore Shutters", href: "/services/shutters" },
  };

  const hwwHeading = parseSplHeading(hp.howWeWorkSectionHeading as string);
  const hwwSteps = [];
  for (let i = 1; i <= 4; i++) {
    hwwSteps.push({
      stepLabel: `Step ${i}`,
      icon: img(hp[`iconStep${i}`] as WPImage).src,
      title: (hp[`titleStep${i}`] as string).replace(/\s+/g, " ").trim(),
      description: hp[`paragraphStep${i}`] as string,
    });
  }
  const howItWorksContent: HowItWorksContent = {
    eyebrow: toTitleCase(hp.howWeWorkSectionSubHeading as string),
    headingPrefix: hwwHeading.prefix,
    headingHighlight: hwwHeading.highlight,
    description: hp.howWeWorkSectionText as string,
    steps: hwwSteps,
    ctaLabel: toTitleCase(hp.howWeWorkSectionButtonText as string),
    ctaHref: hp.howWeWorkSectionButtonUrl as string,
  };

  const quoteGalleryContent: QuoteGalleryContent = {
    quote: stripHtml(hp.reviewSectionQuote as string),
    quoteIcon: { src: "/images/shared/icons/footer-icon-1.svg", alt: "" },
    images: [
      img(hp.reviewSectionGalleryImage1 as WPImage),
      img(hp.reviewSectionGalleryImage2 as WPImage),
      img(hp.reviewSectionGalleryImage3 as WPImage),
      img(hp.reviewSectionGalleryImage4 as WPImage),
    ] as QuoteGalleryContent["images"],
  };

  const commercialContent: CommercialContent = {
    eyebrow: toTitleCase(hp.commercialSectionSubHeading as string),
    heading: hp.commercialSectionHeading as string,
    subheading: "",
    body: stripHtml(hp.commercialSectionText as string),
    ctaLabel: toTitleCase(hp.commercialSectionButtonText as string),
    ctaHref: hp.commercialSectionButtonUrl as string,
    image: img(hp.commercialSectionImage as WPImage),
  };

  const rmHeading = parseSplHeading(hp.repairSectionHeading as string);
  const repairMaintenanceContent: RepairMaintenanceContent = {
    eyebrow: toTitleCase(hp.repairSectionSubHeading as string),
    icon: img(hp.repairSectionIcon as WPImage).src,
    headingPrefix: rmHeading.prefix,
    headingHighlight: rmHeading.highlight,
    headingSuffix: rmHeading.suffix,
    description: hp.repairSectionText as string,
  };

  const locationsContent: LocationsContent = {
    eyebrow: toTitleCase(hp.locationsSectionSubHeading as string),
    heading: hp.locationsSectionHeading as string,
    description: hp.locationsSectionText as string,
    cities: locationsData.locations.nodes.map((loc, i) => ({
      icon: { src: ["/images/shared/icons/footer-icon-2.svg", "/images/shared/icons/footer-icon-3.svg", "/images/shared/icons/footer-icon-4.svg"][i % 3], alt: "" },
      name: loc.title,
    })),
  };

  const quoteFormContent: QuoteFormContent = {
    eyebrow: toTitleCase(hp.formSubHeading as string),
    heading: hp.formHeading as string,
    description: stripHtml(hp.formParagraph as string),
    nameLabel: "Name",
    namePlaceholder: "Your full name",
    emailLabel: "Email",
    emailPlaceholder: "name@email.com",
    phoneLabel: "Phone",
    phonePlaceholder: "(555) 555-5555",
    serviceLabel: "Service Interest",
    servicePlaceholder: "Select a service",
    serviceOptions: [
      "Blinds",
      "Shades",
      "Drapery & Curtains",
      "Shutters",
      "Motorized & Smart Home",
      "Repairs & Maintenance",
    ],
    projectLabel: "Tell us about your project",
    projectPlaceholder: "Describe your project...",
    submitLabel: "Submit Estimate Request",
    successMessage: "Thank you! We'll get back to you within 24 hours.",
  };

  const faqCategories = faqData.faqCategories.nodes.map((c) => c.name);
  const faqItems = faqData.faqCategories.nodes.flatMap((cat) =>
    cat.faqs.nodes.map((faq) => ({
      question: faq.title,
      answer: stripHtml(faq.content),
      category: cat.name,
    })),
  );
  const faqContent: FaqContent = {
    eyebrow: "FAQ",
    heading: "Have Questions? We Have Answers",
    categories: faqCategories,
    items: faqItems,
  };

  return {
    hero: heroContent,
    trustBadges: trustBadgesContent,
    processIntro: processIntroContent,
    servicesGlimpse: servicesGlimpseContent,
    featuredCategory: featuredCategoryContent,
    howItWorks: howItWorksContent,
    quoteGallery: quoteGalleryContent,
    commercial: commercialContent,
    repairMaintenance: repairMaintenanceContent,
    locations: locationsContent,
    quoteForm: quoteFormContent,
    faq: faqContent,
  };
}

// ---------------------------------------------------------------------------
// Services hub page (/services)
// ---------------------------------------------------------------------------

interface ServicePageResponse {
  page: {
    featuredImage: WPImage;
    serviceArchivePageFields: Record<string, unknown>;
  };
}

export async function fetchServicePage() {
  const [pageData, cardsData, faqData] = await Promise.all([
    fetchGraphQL<ServicePageResponse>(SERVICE_PAGE_QUERY),
    fetchGraphQL<{
      services: {
        nodes: Array<{
          title: string;
          excerpt: string;
          uri: string;
          featuredImage: WPImage;
        }>;
      };
    }>(SERVICE_CARDS_QUERY),
    fetchGraphQL<FaqAPIResponse>(FAQ_QUERY),
  ]);

  const sp = pageData.page.serviceArchivePageFields;

  const hero: HeroContent = {
    heading: sp.heroSectionHeading as string,
    subheading: sp.heroSectionText as string,
    ctaLabel: toTitleCase(sp.heroSectionButtonText as string),
    ctaHref: sp.heroSectionButtonUrl as string,
    backgroundImage: img(pageData.page.featuredImage),
  };

  const serviceCards = cardsData.services.nodes.map((s) => ({
    image: img(s.featuredImage),
    title: s.title,
    description: stripHtml(s.excerpt),
    href: s.uri.replace(/\/$/, ""),
  }));
  while (serviceCards.length < 6)
    serviceCards.push({ image: { src: "", alt: "" }, title: "", description: "", href: "#" });

  const serviceGlimpse: ServicesGlimpseContent = {
    eyebrow: toTitleCase(sp.serviceSectionSubHeading as string),
    headingSegments: parseSplSegments(sp.serviceSectionHeading as string),
    servicesSummary: sp.serviceSectionText as string,
    ctaLabel: "Learn More",
    cards: serviceCards.slice(0, 6) as ServicesGlimpseContent["cards"],
  };

  const hiwHeading = parseSplHeading(sp.howItWorksSectionHeading as string);
  const hiwSteps = [];
  for (let i = 1; i <= 4; i++) {
    hiwSteps.push({
      number: `0${i}`,
      title: sp[`titleStep${i}`] as string,
      description: sp[`paragraphText${i}`] as string,
      image: img(sp[`stepImage${i}`] as WPImage),
    });
  }
  const howItWorks: ServiceHowItWorksContent = {
    eyebrow: toTitleCase(sp.howItWorksSectionSubHeading as string),
    headingPrefix: hiwHeading.prefix,
    headingHighlight: hiwHeading.highlight,
    headingSuffix: hiwHeading.suffix,
    description: sp.howItWorksSectionText as string,
    steps: hiwSteps,
  };

  const aboutHeading = parseSplHeading(sp.section3Heading as string);
  const about: ServiceAboutContent = {
    eyebrow: toTitleCase(sp.section3SubHeading as string),
    headingPrefix: aboutHeading.prefix,
    headingHighlight: aboutHeading.highlight,
    headingSuffix: aboutHeading.suffix,
    paragraph: stripHtml(sp.section3Paragraph as string),
    image: img(sp.section3Image as WPImage),
    // Figma's "Explore Shutters" CTA on this fixed Shutters showcase block
    // has no corresponding WP field (the query has no section3Button*
    // fields) — same "Learn More" precedent as serviceGlimpse.ctaLabel
    // above, hardcoded rather than risking an unknown-field GraphQL error.
    cta: { label: "Explore Shutters", href: "/services/shutters" },
  };

  const faqCategories = faqData.faqCategories.nodes.map((c) => c.name);
  const faqItems = faqData.faqCategories.nodes.flatMap((cat) =>
    cat.faqs.nodes.map((faq) => ({
      question: faq.title,
      answer: stripHtml(faq.content),
      category: cat.name,
    })),
  );
  const faq: FaqContent = {
    eyebrow: "FAQ",
    heading: "Have Questions? We Have Answers",
    categories: faqCategories,
    items: faqItems,
  };

  return { hero, serviceGlimpse, howItWorks, about, faq };
}

// ---------------------------------------------------------------------------
// Commercial page (/commercial)
// ---------------------------------------------------------------------------

interface CommercialPageResponse {
  page: {
    featuredImage: WPImage;
    commercialPageFields: Record<string, unknown>;
    commercialPageCarouselImages: Array<{
      title: string;
      altText: string;
      mediaItemUrl: string;
    }>;
  };
}

export async function fetchCommercialPage() {
  const [pageData, faqData] = await Promise.all([
    fetchGraphQL<CommercialPageResponse>(COMMERCIAL_PAGE_QUERY),
    fetchGraphQL<FaqAPIResponse>(FAQ_QUERY),
  ]);

  const cp = pageData.page.commercialPageFields;

  const hero: CommercialHeroContent = {
    breadcrumb: "HOME > commercial",
    heading: cp.heroSectionHeading as string,
    subheading: cp.heroSectionText as string,
    ctaLabel: toTitleCase(cp.heroSectionButtonText as string),
    ctaHref: cp.heroSectionButtonUrl as string,
    backgroundImage: img(pageData.page.featuredImage),
  };

  const placesHeading = parseSplHeading(cp.section2Heading as string);
  const placeCards = [];
  for (let i = 1; i <= 4; i++) {
    const iconField = cp[`sec2CardsIcon${i}`] as WPImage | null;
    placeCards.push({
      title: cp[`sec2CardsTitle${i}`] as string,
      description: cp[`sec2CardsParagraph${i}`] as string,
      icon: iconField?.node?.mediaItemUrl ?? "",
    });
  }
  const places: CommercialPlacesContent = {
    eyebrow: toTitleCase(cp.section2SubHeading as string),
    headingPrefix: placesHeading.prefix,
    headingHighlight: placesHeading.highlight,
    description: stripHtml(cp.section2Text as string),
    cards: placeCards as CommercialPlacesContent["cards"],
  };

  const installHeading = parseSplHeading(cp.section3Heading as string);
  const carouselImages = pageData.page.commercialPageCarouselImages ?? [];
  const installImages = carouselImages.slice(0, 3).map((ci) => ({
    src: ci.mediaItemUrl,
    alt: ci.altText,
  }));
  while (installImages.length < 3) installImages.push({ src: "", alt: "" });
  const installation: InstallationGalleryContent = {
    eyebrow: toTitleCase(cp.section3SubHeading as string),
    headingPrefix: installHeading.prefix,
    headingHighlight: installHeading.highlight,
    headingSuffix: installHeading.suffix,
    description: stripHtml(cp.section3Text as string),
    images: installImages as InstallationGalleryContent["images"],
  };

  const quoteForm: CommercialQuoteFormContent = {
    eyebrow: toTitleCase(cp.formSectionSubHeading as string),
    heading: "Submit Your Commercial Bid Request",
    description: "Our commercial desk will review your scope and architectural requirements within 24 business hours.",
    companyNameLabel: "Company Name",
    companyNamePlaceholder: "Company Name",
    contactNameLabel: "Contact Name",
    contactNamePlaceholder: "John Smith",
    emailLabel: "Email",
    emailPlaceholder: "john@example.com",
    phoneLabel: "Phone",
    phonePlaceholder: "+ (954) 555-1234",
    projectTypeLabel: "Project Type",
    projectTypePlaceholder: "Commercial",
    projectTypeOptions: [
      "Office Building",
      "Hospitality & Hotels",
      "Healthcare Facility",
      "Multi-Family & Retail",
      "Other",
    ],
    locationLabel: "Location",
    locationPlaceholder: "City, State",
    messageLabel: "Project Scope & Message",
    messagePlaceholder: "Describe your project scope...",
    uploadPrompt: "Upload architectural drawings or floor plans",
    uploadHint: "PDF, DWG, or JPG — max 10 MB",
    submitLabel: "Submit Bid Request",
    successMessage: "Thank you! Our commercial desk will review your request within 24 business hours.",
  };

  const faqCategories = faqData.faqCategories.nodes.map((c) => c.name);
  const faqItems = faqData.faqCategories.nodes.flatMap((cat) =>
    cat.faqs.nodes.map((faq) => ({
      question: faq.title,
      answer: stripHtml(faq.content),
      category: cat.name,
    })),
  );
  const faq: FaqContent = {
    eyebrow: "FAQ",
    heading: "Have Questions? We Have Answers",
    categories: faqCategories,
    items: faqItems,
  };

  return { hero, places, installation, quoteForm, faq };
}

// ---------------------------------------------------------------------------
// Locations hub page (/locations)
// ---------------------------------------------------------------------------

interface LocationsHubResponse {
  page: {
    locationHubPageFields: Record<string, unknown>;
  };
}

export async function fetchLocationsPage() {
  const [pageData, locationsData] = await Promise.all([
    fetchGraphQL<LocationsHubResponse>(LOCATIONS_HUB_PAGE_QUERY),
    fetchGraphQL<{ locations: { nodes: Array<{ title: string; uri: string }> } }>(
      LOCATIONS_LIST_QUERY,
    ),
  ]);

  const lp = pageData.page.locationHubPageFields;

  const hero: LocationsHeroContent = {
    breadcrumb: "HOME > locations hub",
    heading: lp.mainHeading as string,
    subheading: (lp.mainParagraph as string)
      .split(/<\/?p>/)
      .map((s) => stripHtml(s))
      .filter(Boolean),
  };

  const saHeading = parseSplHeading(lp.serviceAreaSectionHeading as string);
  const cityLinks = locationsData.locations.nodes.map((loc) => ({
    label: loc.title,
    href: loc.uri.replace(/\/$/, ""),
  }));
  const serviceArea: ServiceAreaPanelContent = {
    eyebrow: toTitleCase(lp.serviceAreaSectionSubHeading as string),
    headingPrefix: saHeading.prefix,
    headingHighlight: saHeading.highlight,
    description: stripHtml(lp.serviceAreaSectionParagraph as string),
    mapImage: { src: "/images/locations/florida-map.webp", alt: "Florida map" },
    primaryLink: { label: "Explore All Florida Services", href: "/locations" },
    cityLinks,
    photo: img(lp.serviceAreaSectionImage as WPImage),
  };

  const csHeading = parseSplHeading(lp.comingSoonSectionHeading as string);
  const csCards = [];
  for (let i = 1; i <= 3; i++) {
    csCards.push({
      title: lp[`comingSoonCardTitle${i}`] as string,
      description: lp[`comingSoonCardText${i}`] as string,
    });
  }
  const comingSoon: ComingSoonStatesContent = {
    headingPrefix: csHeading.prefix,
    headingHighlight: csHeading.highlight,
    description: stripHtml(lp.comingSoonSectionParagraph as string),
    badgeLabel: "COMING SOON",
    cards: csCards as ComingSoonStatesContent["cards"],
  };

  return { hero, serviceArea, comingSoon };
}

// ---------------------------------------------------------------------------
// Individual service page (/services/blinds, /services/drapery, etc.)
// ---------------------------------------------------------------------------

interface ServiceSingleResponse {
  service: {
    featuredImage: WPImage;
    servicesSinglePageFields: Record<string, unknown>;
    seo: {
      breadcrumbs: Array<{ text: string; url: string }>;
    };
    children: {
      nodes: Array<{
        id: string;
        title: string;
        excerpt: string;
        uri: string;
        featuredImage: WPImage;
      }>;
    };
  };
}

export async function fetchServiceSinglePage(uri: string) {
  const [serviceData, faqData] = await Promise.all([
    fetchGraphQL<ServiceSingleResponse>(SERVICE_SINGLE_PAGE_QUERY, { uri }),
    fetchGraphQL<FaqAPIResponse>(FAQ_QUERY),
  ]);

  const sf = serviceData.service.servicesSinglePageFields;
  const breadcrumbs = serviceData.service.seo?.breadcrumbs ?? [];
  const breadcrumb = breadcrumbs.map((b) => stripHtml(b.text)).join(" > ").toUpperCase();

  const aboutHeading = parseSplHeading(sf.section2Heading as string);
  const aboutText = sf.section2Text as string;
  const paragraphMatch = aboutText.match(
    /^([\s\S]*?)<span[^>]*><strong>([\s\S]*?)<\/strong><\/span>([\s\S]*)$/,
  );
  let paragraphPrefix = stripHtml(aboutText);
  let paragraphHighlight = "";
  let paragraphSuffix = "";
  if (paragraphMatch) {
    paragraphPrefix = stripHtml(paragraphMatch[1]);
    paragraphHighlight = stripHtml(paragraphMatch[2]);
    paragraphSuffix = stripHtml(paragraphMatch[3]);
  }

  const hiwHeaderHeading = parseSplHeading(sf.howItWorksSectionHeading as string);
  const timelineImage = img(sf.howItWorksSectionImage as WPImage);
  const timelineSteps = [];
  for (let i = 1; i <= 4; i++) {
    timelineSteps.push({
      number: `0${i}`,
      title: sf[`titleStep${i}`] as string,
      description: sf[`textStep${i}`] as string,
    });
  }

  const childServices = serviceData.service.children?.nodes ?? [];
  let subServices: ServiceInlinePageContent["subServices"];
  if (childServices.length > 0) {
    const subCategoryHeading = parseSplHeading(sf.serviceSubCategorySectionHeading as string);
    subServices = {
      eyebrow: toTitleCase(sf.serviceSubCategorySectionSubHeading as string),
      headingPrefix: subCategoryHeading.prefix,
      headingHighlight: subCategoryHeading.highlight,
      headingSuffix: subCategoryHeading.suffix,
      description: stripHtml(sf.serviceSubCategorySectionText as string),
      cards: childServices.map((child) => ({
        image: img(child.featuredImage),
        title: child.title,
        description: stripHtml(child.excerpt),
        href: child.uri.replace(/\/$/, ""),
      })),
    };
  }

  const content: ServiceInlinePageContent = {
    hero: {
      breadcrumb,
      heading: sf.mainHeading as string,
      subheading: sf.mainParagraph as string,
      backgroundImage: img(serviceData.service.featuredImage),
    },
    // No CMS field group exists for this section yet (confirmed against
    // SERVICE_SINGLE_PAGE_QUERY) — same "hardcode rather than guess at an
    // unverified GraphQL field" call as serviceGlimpse.ctaLabel elsewhere in
    // this file. Figma itself repeats this exact copy on every service page,
    // so the shared placeholder is the right content here, not a stopgap.
    intro: serviceIntroPlaceholder,
    subServices,
    about: {
      eyebrow: toTitleCase(sf.section2SubHeading as string),
      headingPrefix: aboutHeading.prefix,
      headingHighlight: aboutHeading.highlight,
      headingSuffix: aboutHeading.suffix,
      paragraphPrefix,
      paragraphHighlight,
      paragraphSuffix,
      features: [],
      gallery: [
        img(sf.section2Image1 as WPImage),
        img(sf.section2Image2 as WPImage),
        img(sf.section2Image3 as WPImage),
      ] as ServiceInlinePageContent["about"]["gallery"],
    },
    howItWorksHeader: {
      eyebrow: toTitleCase(sf.howItWorksSectionSubHeading as string),
      headingPrefix: hiwHeaderHeading.prefix,
      headingHighlight: hiwHeaderHeading.highlight,
      subtitle: sf.howItWorksSectionText as string,
    },
    timeline: {
      images: [timelineImage, timelineImage] as ServiceInlinePageContent["timeline"]["images"],
      steps: timelineSteps as ServiceInlinePageContent["timeline"]["steps"],
    },
    cta: {
      eyebrow: toTitleCase(sf.ctaBannerSubHeading as string),
      heading: sf.ctaBannerHeading as string,
      body: sf.ctaBannerText as string,
      ctaLabel: toTitleCase(sf.ctaBannerButtonText as string),
      ctaHref: sf.ctaBannerButtonUrl as string,
      image: img(sf.ctaBannerBackgroundImage as WPImage),
    },
  };

  const faqCategories = faqData.faqCategories.nodes.map((c) => c.name);
  const faqItems = faqData.faqCategories.nodes.flatMap((cat) =>
    cat.faqs.nodes.map((faq) => ({
      question: faq.title,
      answer: stripHtml(faq.content),
      category: cat.name,
    })),
  );
  const faq: FaqContent = {
    eyebrow: "FAQ",
    heading: "Have Questions? We Have Answers",
    categories: faqCategories,
    items: faqItems,
  };

  return { content, faq };
}

// ---------------------------------------------------------------------------
// About page (/about)
// ---------------------------------------------------------------------------

export async function fetchAboutPage() {
  const [aboutData, teamData, faqData] = await Promise.all([
    fetchGraphQL<{
      page: {
        featuredImage: WPImage;
        aboutPageFields: Record<string, unknown>;
      };
    }>(ABOUT_PAGE_QUERY),
    fetchGraphQL<{
      teamMembers: {
        nodes: Array<{ title: string; teamFields: { jobRole: string }; featuredImage: WPImage }>;
      };
    }>(TEAM_QUERY),
    fetchGraphQL<FaqAPIResponse>(FAQ_QUERY),
  ]);

  const ap = aboutData.page.aboutPageFields;
  const heading = parseSplHeading(ap.section2Heading as string);

  const hero: AboutPageContent["hero"] = {
    breadcrumb: "HOME > ABOUT",
    heading: ap.heroSectionHeading as string,
    subheading: ap.heroSectionParagraph as string,
    ctaLabel: toTitleCase(ap.heroSectionButtonText as string),
    ctaHref: ap.heroSectionButtonUrl as string,
    backgroundImage: img(aboutData.page.featuredImage),
  };

  const paragraphs = (ap.section2Paragraph as string)
    .split(/<\/?p>/)
    .map((s) => s.trim())
    .filter(Boolean);
  const mission: AboutPageContent["mission"] = {
    headingPrefix: heading.prefix,
    headingHighlight: heading.highlight,
    paragraphs,
  };

  // boxIcon is a single shared icon (teal, works on light or dark) reused
  // across all four Installation-section features; boxTitle1-4 are their
  // labels. This is a different field group from iconBoxFields below —
  // that one belongs to the Team section's badge row instead.
  const installationIcon = img(ap.boxIcon as WPImage);
  const installationFeatures: AboutPageContent["installation"]["features"] = [
    { icon: installationIcon, label: (ap.boxTitle1 as string) ?? "" },
    { icon: installationIcon, label: (ap.boxTitle2 as string) ?? "" },
    { icon: installationIcon, label: (ap.boxTitle3 as string) ?? "" },
    { icon: installationIcon, label: (ap.boxTitle4 as string) ?? "" },
  ];

  const installHeading = parseSplHeading(ap.section3Heading as string);
  const installation: AboutPageContent["installation"] = {
    eyebrow: toTitleCase(ap.section3SubHeading as string),
    heading: installHeading.prefix + installHeading.highlight + installHeading.suffix,
    description: stripHtml(ap.section3Text as string),
    features: installationFeatures,
  };

  // iconBoxFields is the paired icon+title structure the backend dev added
  // for the Team section's trust-badge row (Licensed & Insured, BBB A+
  // Accredited, etc.) — a different field group from boxIcon/boxTitle1-4
  // above, which belongs to the Installation section's features instead.
  const iconBoxFields = ap.iconBoxFields as Record<string, unknown> | null;
  const teamBadges: AboutPageContent["team"]["badges"] = iconBoxFields
    ? [
        { icon: img(iconBoxFields.icon1 as WPImage), label: (iconBoxFields.title1 as string)?.trim() ?? "" },
        { icon: img(iconBoxFields.icon2 as WPImage), label: (iconBoxFields.title2 as string)?.trim() ?? "" },
        { icon: img(iconBoxFields.icon3 as WPImage), label: (iconBoxFields.title3 as string)?.trim() ?? "" },
        { icon: img(iconBoxFields.icon4 as WPImage), label: (iconBoxFields.title4 as string)?.trim() ?? "" },
      ]
    : [];

  const team: AboutPageContent["team"] = {
    badges: teamBadges,
    members: teamData.teamMembers.nodes.slice(0, 4).map((m) => ({
      image: { ...img(m.featuredImage), alt: m.featuredImage?.node?.altText || m.title },
      name: m.title,
      role: m.teamFields?.jobRole ?? "",
    })) as AboutPageContent["team"]["members"],
  };

  const faqCategories = faqData.faqCategories.nodes.map((c) => c.name);
  const faqItems = faqData.faqCategories.nodes.flatMap((cat) =>
    cat.faqs.nodes.map((faq) => ({
      question: faq.title,
      answer: stripHtml(faq.content),
      category: cat.name,
    })),
  );
  const faq: FaqContent = {
    eyebrow: "FAQ",
    heading: "Have Questions? We Have Answers",
    categories: faqCategories,
    items: faqItems,
  };

  return { hero, mission, installation, team, faq };
}

// ---------------------------------------------------------------------------
// Free Quote page (/free-quote)
// ---------------------------------------------------------------------------

export async function fetchFreeQuotePage() {
  const [quoteData, faqData] = await Promise.all([
    fetchGraphQL<{
      page: { quotePageFields: Record<string, unknown> };
    }>(FREE_QUOTE_PAGE_QUERY),
    fetchGraphQL<FaqAPIResponse>(FAQ_QUERY),
  ]);

  const qp = quoteData.page.quotePageFields;

  const hero: FreeQuotePageContent["hero"] = {
    breadcrumb: "HOME > FREE QUOTE",
    heading: qp.mainTitle as string,
    subheading: qp.mainParagraph as string,
  };

  const processHeading = parseSplHeading(qp.section2Heading as string);
  const processSteps: FreeQuotePageContent["process"]["steps"] = [
    { number: "Step 01", title: qp.titleStep1 as string || "", description: qp.textStep1 as string || "" },
    { number: "Step 02", title: qp.titleStep2 as string || "", description: qp.textStep2 as string || "" },
    { number: "Step 03", title: qp.titleStep3 as string || "", description: qp.textStep3 as string || "" },
    { number: "Step 04", title: qp.titleStep4 as string || "", description: qp.textStep4 as string || "" },
    { number: "Step 05", title: qp.titleStep5 as string || "", description: qp.textStep5 as string || "" },
  ];
  const process: FreeQuotePageContent["process"] = {
    eyebrow: toTitleCase(qp.section2SubHeading as string),
    headingPrefix: processHeading.prefix,
    headingHighlight: processHeading.highlight,
    subtitle: qp.section2Text as string,
    steps: processSteps,
  };

  const introHeading = parseSplHeading(qp.section3Heading as string);
  const videoNode = (qp.section3Video as WPImage)?.node;
  const processIntro: FreeQuotePageContent["processIntro"] = {
    eyebrow: toTitleCase(qp.section3SubHeading as string),
    headingPrefix: introHeading.prefix,
    headingHighlight: introHeading.highlight,
    description: stripHtml(qp.section3Text as string),
    image: { src: videoNode?.mediaItemUrl ?? "", alt: videoNode?.altText ?? "" },
  };

  const formHeading = parseSplHeading(qp.formHeading as string);
  const form: FreeQuotePageContent["form"] = {
    eyebrow: toTitleCase(qp.formSubHeading as string),
    headingPrefix: formHeading.prefix,
    headingHighlight: formHeading.highlight,
    subtitle: qp.formText as string,
    nameLabel: "Name",
    namePlaceholder: "Your full name",
    emailLabel: "Email",
    emailPlaceholder: "name@email.com",
    phoneLabel: "Phone",
    phonePlaceholder: "(555) 555-5555",
    serviceLabel: "Service Interest",
    servicePlaceholder: "Select a service",
    serviceOptions: [
      "Blinds",
      "Shades",
      "Drapery & Curtains",
      "Shutters",
      "Motorized & Smart Home",
      "Repairs & Maintenance",
    ],
    projectLabel: "Tell us about your project",
    projectPlaceholder: "Describe your project...",
    submitLabel: "Submit Estimate Request",
    assistanceHeading: "Need Immediate Assistance?",
    callLabel: "Call Us",
    callNumber: "+ (954) 555-1234",
    textLabel: "Text Us",
    trustLine: "100% Satisfaction Guaranteed · Licensed & Insured · Florida Verified",
  };

  const faqCategories = faqData.faqCategories.nodes.map((c) => c.name);
  const faqItems = faqData.faqCategories.nodes.flatMap((cat) =>
    cat.faqs.nodes.map((faq) => ({
      question: faq.title,
      answer: stripHtml(faq.content),
      category: cat.name,
    })),
  );
  const faq: FaqContent = {
    eyebrow: "FAQ",
    heading: "Have Questions? We Have Answers",
    categories: faqCategories,
    items: faqItems,
  };

  return { hero, process, processIntro, form, faq };
}

// ---------------------------------------------------------------------------
// Gallery page (/gallery)
// ---------------------------------------------------------------------------

export async function fetchGalleryPage() {
  const [pageData, itemsData, faqData] = await Promise.all([
    fetchGraphQL<{
      page: { galleryPageFields: Record<string, unknown> };
    }>(GALLERY_PAGE_QUERY),
    fetchGraphQL<{
      productTypes: {
        nodes: Array<{
          name: string;
          slug: string;
          galleryItems: {
            nodes: Array<{ title: string; featuredImage: WPImage }>;
          };
        }>;
      };
      roomTypes: {
        nodes: Array<{
          name: string;
          slug: string;
          galleryItems: {
            nodes: Array<{ title: string; featuredImage: WPImage }>;
          };
        }>;
      };
    }>(GALLERY_ITEMS_QUERY),
    fetchGraphQL<FaqAPIResponse>(FAQ_QUERY),
  ]);

  const gp = pageData.page.galleryPageFields;
  const mainHeading = parseSplHeading(gp.mainTitle as string || "");

  const hero: GalleryPageContent["hero"] = {
    breadcrumb: "HOME > GALLERY",
    headingPrefix: mainHeading.prefix,
    headingHighlight: mainHeading.highlight,
    subheading: gp.mainParagraph as string || "",
  };

  const productOptions = itemsData.productTypes.nodes.map((pt) => pt.name);
  const roomOptions = itemsData.roomTypes.nodes.map((rt) => rt.name);

  const filters: GalleryPageContent["filters"] = {
    heading: gp.filterSectionTitle as string || "Filter by",
    filterGroups: [
      { label: "Product Type", options: productOptions },
      { label: "Room", options: roomOptions },
    ],
  };

  const allItems: GalleryPageContent["grid"]["items"] = [];
  for (const pt of itemsData.productTypes.nodes) {
    for (const item of pt.galleryItems.nodes) {
      allItems.push({
        image: img(item.featuredImage),
        category: pt.name,
        title: item.title,
      });
    }
  }

  const grid: GalleryPageContent["grid"] = {
    items: allItems,
    loadMoreLabel: "Load More",
  };

  const ctaHeading = parseSplHeading(gp.ctaBannerHeading as string || "");
  const cta: ConsultationCtaContent = {
    eyebrow: toTitleCase(gp.ctaBannerSubHeading as string || ""),
    heading: ctaHeading.prefix + ctaHeading.highlight + ctaHeading.suffix,
    body: gp.ctaBannerText as string || "",
    ctaLabel: toTitleCase(gp.ctaBannerButtonText as string || ""),
    ctaHref: gp.ctaBannerButtonUrl as string || "",
    image: img(gp.ctaBannerImage as WPImage),
  };

  const faqCategories = faqData.faqCategories.nodes.map((c) => c.name);
  const faqItems = faqData.faqCategories.nodes.flatMap((cat) =>
    cat.faqs.nodes.map((faq) => ({
      question: faq.title,
      answer: stripHtml(faq.content),
      category: cat.name,
    })),
  );
  const faq: FaqContent = {
    eyebrow: "FAQ",
    heading: "Have Questions? We Have Answers",
    categories: faqCategories,
    items: faqItems,
  };

  return { hero, filters, grid, cta, faq };
}

// ---------------------------------------------------------------------------
// Location single page (/locations/south-florida)
// ---------------------------------------------------------------------------

export async function fetchLocationSinglePage(uri: string) {
  const [locData, cardsData, faqData] = await Promise.all([
    fetchGraphQL<{
      location: {
        title: string;
        featuredImage: WPImage;
        locationSinglePageFields: Record<string, unknown>;
        seo: { breadcrumbs: Array<{ text: string; url: string }> };
      };
    }>(LOCATION_SINGLE_PAGE_QUERY, { uri }),
    fetchGraphQL<{
      services: {
        nodes: Array<{
          title: string;
          excerpt: string;
          uri: string;
          featuredImage: WPImage;
        }>;
      };
    }>(SERVICE_CARDS_QUERY),
    fetchGraphQL<FaqAPIResponse>(FAQ_QUERY),
  ]);

  if (!locData.location) return null;

  const lp = locData.location.locationSinglePageFields;
  const breadcrumbs = locData.location.seo?.breadcrumbs ?? [];
  const breadcrumb = breadcrumbs.map((b) => stripHtml(b.text)).join(" > ").toUpperCase();

  const hero: CityPageContent["hero"] = {
    breadcrumb,
    heading: lp.heroSectionHeading as string,
    subheading: lp.heroSectionParagraph as string,
    ctaLabel: toTitleCase(lp.heroSectionButtonText as string),
    ctaHref: lp.heroSectionButtonUrl as string,
    backgroundImage: img(locData.location.featuredImage),
  };

  const serviceHeading = parseSplSegments(lp.serviceSectionHeading as string);
  const serviceCards = cardsData.services.nodes.map((s) => ({
    image: img(s.featuredImage),
    title: s.title,
    description: stripHtml(s.excerpt),
    href: s.uri.replace(/\/$/, ""),
  }));
  while (serviceCards.length < 6)
    serviceCards.push({ image: { src: "", alt: "" }, title: "", description: "", href: "#" });

  const serviceGrid: CityPageContent["serviceGrid"] = {
    eyebrow: toTitleCase(lp.serviceSectionSubHeading as string),
    headingSegments: serviceHeading,
    summary: lp.serviceSectionText as string,
    cards: serviceCards.slice(0, 6) as CityPageContent["serviceGrid"]["cards"],
  };

  const consultation: CityPageContent["consultation"] = {
    eyebrow: toTitleCase(lp.formSectionSubHeading as string),
    heading: lp.formSectionHeading as string,
    description: stripHtml(lp.formSectionText as string),
    ctaLabel: "Submit",
  };

  const faqCategories = faqData.faqCategories.nodes.map((c) => c.name);
  const faqItems = faqData.faqCategories.nodes.flatMap((cat) =>
    cat.faqs.nodes.map((faq) => ({
      question: faq.title,
      answer: stripHtml(faq.content),
      category: cat.name,
    })),
  );
  const faq: FaqContent = {
    eyebrow: "FAQ",
    heading: "Have Questions? We Have Answers",
    categories: faqCategories,
    items: faqItems,
  };

  return { hero, serviceGrid, consultation, faq };
}

// ---------------------------------------------------------------------------
// Resources page (/resources — blog archive)
// ---------------------------------------------------------------------------

export async function fetchResourcesPage() {
  const [archiveData, postsData] = await Promise.all([
    fetchGraphQL<{
      page: { blogAndKbArchivePageFields: { mainTitle: string; mainParagraph: string } };
    }>(BLOG_ARCHIVE_PAGE_QUERY),
    fetchGraphQL<{
      posts: {
        nodes: Array<{
          title: string;
          excerpt: string;
          uri: string;
          featuredImage: WPImage;
        }>;
      };
    }>(BLOG_POSTS_CARDS_QUERY),
  ]);

  const af = archiveData.page.blogAndKbArchivePageFields;
  const posts = postsData.posts.nodes;

  const articles = posts.map((p) => ({
    image: img(p.featuredImage),
    title: p.title,
    description: stripHtml(p.excerpt),
    date: "",
    // WP's own post uri is top-level ("/slug/"), but the single-article
    // route this app actually built lives at /resources/[slug] (see
    // fetchBlogSinglePage's own `/${slug}/` query using the same bare
    // slug) — prefix it so "Read More" doesn't 404.
    href: `/resources${p.uri.replace(/\/$/, "")}`,
  }));

  const featured: ResourcesPageContent["featured"] = {
    badge: "Featured",
    category: "Blog",
    article: articles[0] ?? { image: { src: "", alt: "" }, title: "", description: "", date: "", href: "#" },
  };

  const result: ResourcesPageContent = {
    heading: af.mainTitle,
    description: af.mainParagraph,
    featured,
    articles: [
      articles[1] ?? { image: { src: "", alt: "" }, title: "", description: "", date: "", href: "#" },
      articles[2] ?? { image: { src: "", alt: "" }, title: "", description: "", date: "", href: "#" },
    ],
  };

  return result;
}

// ---------------------------------------------------------------------------
// Knowledge Base page (/knowledge-base)
// ---------------------------------------------------------------------------

export async function fetchKnowledgeBasePage() {
  const [archiveData, kbData] = await Promise.all([
    fetchGraphQL<{
      page: { blogAndKbArchivePageFields: { mainTitle: string; mainParagraph: string } };
    }>(KB_ARCHIVE_PAGE_QUERY),
    fetchGraphQL<{
      knowledgeBaseItems: {
        nodes: Array<{
          title: string;
          excerpt: string;
          categories: { nodes: Array<{ name: string; slug: string }> };
        }>;
      };
    }>(KNOWLEDGEBASE_CARDS_QUERY),
  ]);

  const af = archiveData.page.blogAndKbArchivePageFields;
  const items = kbData.knowledgeBaseItems.nodes;

  const articles = items.map((item) => ({
    category: item.categories?.nodes?.[0]?.name ?? "",
    title: item.title,
    description: stripHtml(item.excerpt),
    href: "#",
  }));

  while (articles.length < 6)
    articles.push({ category: "", title: "", description: "", href: "#" });

  const result: KnowledgeBasePageContent = {
    heading: af.mainTitle,
    subtitle: af.mainParagraph,
    articles: articles.slice(0, 6) as KnowledgeBasePageContent["articles"],
  };

  return result;
}

// ---------------------------------------------------------------------------
// Privacy Policy page (/privacy-policy)
// ---------------------------------------------------------------------------

export async function fetchPrivacyPolicyPage() {
  const data = await fetchGraphQL<{
    page: { title: string; content: string };
  }>(POLICY_PAGE_QUERY);

  const paragraphs = (data.page.content ?? "")
    .split(/<\/?p>/)
    .map((s) => s.trim())
    .filter(Boolean)
    .map((s) => stripHtml(s));

  const result: LegalPageContent = {
    heading: data.page.title,
    paragraphs,
  };

  return result;
}

// ---------------------------------------------------------------------------
// Blog single page (/resources/[slug])
// ---------------------------------------------------------------------------

export async function fetchBlogSinglePage(uri: string) {
  const data = await fetchGraphQL<{
    post: {
      title: string;
      content: string;
      date: string;
      featuredImage: WPImage;
      blogAuthorFields: {
        authorName: string;
        profileImage: WPImage;
      };
      seo: { breadcrumbs: Array<{ text: string; url: string }> };
    } | null;
  }>(BLOG_SINGLE_PAGE_QUERY, { uri });

  if (!data.post) return null;

  const post = data.post;
  const breadcrumbs = post.seo?.breadcrumbs ?? [];
  const breadcrumb = breadcrumbs.map((b) => stripHtml(b.text)).join(" > ").toUpperCase();

  const contentParagraphs = (post.content ?? "")
    .split(/<\/?p>/)
    .map((s) => s.trim())
    .filter(Boolean)
    .map((s) => stripHtml(s));

  const result: BlogArticlePageContent = {
    breadcrumb,
    heroImage: img(post.featuredImage),
    heroBadge: "Blog",
    date: post.date ? new Date(post.date).toLocaleDateString("en-US", { year: "numeric", month: "long", day: "numeric" }) : "",
    author: {
      name: post.blogAuthorFields?.authorName ?? "",
      avatar: img(post.blogAuthorFields?.profileImage),
    },
    readTime: `${Math.max(1, Math.ceil(contentParagraphs.join(" ").split(/\s+/).length / 200))} min read`,
    title: post.title,
    blocks: [{ type: "text", paragraphs: contentParagraphs }],
  };

  return result;
}

// ---------------------------------------------------------------------------
// Knowledge Base single page (/knowledge-base/[slug])
// ---------------------------------------------------------------------------

export async function fetchKnowledgeBaseSinglePage(uri: string) {
  const data = await fetchGraphQL<{
    knowledgeBaseItem: {
      title: string;
      content: string;
      date: string;
      featuredImage: WPImage;
      categories: { nodes: Array<{ name: string; slug: string }> };
      seo: { breadcrumbs: Array<{ text: string; url: string }> };
    } | null;
  }>(KNOWLEDGE_BASE_SINGLE_PAGE_QUERY, { uri });

  if (!data.knowledgeBaseItem) return null;

  const item = data.knowledgeBaseItem;
  const breadcrumbs = item.seo?.breadcrumbs ?? [];
  const breadcrumb = breadcrumbs.map((b) => stripHtml(b.text)).join(" > ").toUpperCase();

  const contentParagraphs = (item.content ?? "")
    .split(/<\/?p>/)
    .map((s) => s.trim())
    .filter(Boolean)
    .map((s) => stripHtml(s));

  const result: KnowledgeArticlePageContent = {
    breadcrumb,
    heroImage: img(item.featuredImage),
    categoryTag: item.categories?.nodes?.[0]?.name ?? "",
    date: item.date ? new Date(item.date).toLocaleDateString("en-US", { year: "numeric", month: "long", day: "numeric" }) : "",
    readTime: `${Math.max(1, Math.ceil(contentParagraphs.join(" ").split(/\s+/).length / 200))} min read`,
    title: item.title,
    blocks: [{ type: "section" as const, heading: "", paragraphs: contentParagraphs }],
  };

  return result;
}
