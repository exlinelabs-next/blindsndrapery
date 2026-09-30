import { fetchGraphQL } from "./graphql";
import {
  HEADER_NAV_AND_BUTTON,
  SITE_ICON_AND_LOGO,
  FOOTER_QUERY,
  ALL_FOOTER_MENUS,
  HOME_PAGE_QUERY,
  SERVICE_CARDS_QUERY,
  FAQ_QUERY,
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
  KNOWLEDGEBASE_SLUGS_QUERY,
  POLICY_PAGE_QUERY,
  TERMS_PAGE_QUERY,
  BLOG_SINGLE_PAGE_QUERY,
  KNOWLEDGE_BASE_SINGLE_PAGE_QUERY,
  MEGA_MENU_IMAGES_QUERY,
  REVIEW_QUERY,
} from "./queries";
import type {
  RichParagraphs,
  NavContent,
  FooterContent,
  HeroContent,
  TrustBadgesContent,
  ProcessIntroContent,
  ServicesGlimpseContent,
  FeaturedCategoryContent,
  HowItWorksContent,
  TestimonialsContent,
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
  LocationCountySection,
  ComingSoonStatesContent,
  ServiceInlinePageContent,
  ServiceInlineAboutContent,
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

function decodeEntities(s: string): string {
  return s
    .replace(/&#(\d+);/g, (_, code) => String.fromCharCode(Number(code)))
    .replace(/&#x([0-9a-fA-F]+);/g, (_, hex) => String.fromCharCode(parseInt(hex, 16)))
    .replace(/&nbsp;/g, " ")
    .replace(/&amp;/g, "&")
    .replace(/&lt;/g, "<")
    .replace(/&gt;/g, ">")
    .replace(/&quot;/g, '"')
    .replace(/&#39;|&apos;/g, "'");
}

function stripHtml(html: string | null | undefined): string {
  if (!html) return "";
  return decodeEntities(html.replace(/<[^>]*>/g, "")).trim();
}

function toTitleCase(s: string): string {
  if (!s) return s;
  return s
    .toLowerCase()
    .replace(/\b\w/g, (c) => c.toUpperCase());
}

// WP returns FAQ categories in whatever order they were created in, which
// doesn't put "Common Questions" first — it's the catch-all category users
// expect to land on by default (the FAQ component defaults its active tab
// to categories[0]), so it's moved to the front here rather than left to
// however an editor happened to create the categories.
function sortFaqCategories(categories: string[]): string[] {
  const index = categories.findIndex((c) => c.toLowerCase() === "common questions");
  if (index <= 0) return categories;
  const sorted = [...categories];
  const [commonQuestions] = sorted.splice(index, 1);
  sorted.unshift(commonQuestions);
  return sorted;
}

function parseSplHeading(raw: string | null | undefined): {
  prefix: string;
  highlight: string;
  suffix: string;
} {
  if (!raw) return { prefix: "", highlight: "", suffix: "" };
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

// Splits WP WYSIWYG HTML on <p> boundaries (falling back to blank-line
// separation for fields that don't come back with real <p> tags), trimming
// and dropping any resulting empty paragraphs.
function splitParagraphHtml(html: string): string[] {
  const rawParagraphs = /<p[^>]*>/i.test(html)
    ? html.split(/<\/p>/i).map((p) => p.replace(/<p[^>]*>/gi, ""))
    : html.split(/(?:\r\n|\r|\n){2,}/);
  return rawParagraphs.map((p) => p.trim()).filter(Boolean);
}

// Rich body copy: WP-authored HTML made of <p> paragraphs, each optionally
// containing <spl>...</spl> runs for teal emphasis (same <spl> convention as
// parseSplHeading/parseSplSegments above, just spanning multiple paragraphs
// instead of one heading line). Any other markup is stripped per-segment —
// only <p> and <spl> are meaningful in these WP fields.
function parseRichParagraphs(html: string | null | undefined): RichParagraphs {
  if (!html) return [];
  return splitParagraphHtml(html)
    .map((paragraph) =>
      parseSplSegments(paragraph)
        .map((seg) => ({ ...seg, text: decodeEntities(seg.text.replace(/<[^>]*>/g, "")).trim() }))
        .filter((seg) => seg.text),
    )
    .filter((segments) => segments.length > 0);
}

// Same multi-paragraph splitting as parseRichParagraphs, but for WP fields
// that use raw WYSIWYG "<span><strong>...</strong></span>" markup for one
// inline highlighted phrase per paragraph instead of the <spl> convention
// (e.g. ServiceInlineAboutContent's "about" paragraph).
function parseInlineHighlightParagraphs(
  html: string | null | undefined,
): Array<{ prefix: string; highlight: string; suffix: string }> {
  if (!html) return [];
  return splitParagraphHtml(html).map((paragraph) => {
    const match = paragraph.match(
      /^([\s\S]*?)<span[^>]*><strong>([\s\S]*?)<\/strong><\/span>([\s\S]*)$/,
    );
    if (!match) return { prefix: stripHtml(paragraph), highlight: "", suffix: "" };
    return {
      prefix: stripHtml(match[1]),
      highlight: stripHtml(match[2]),
      suffix: stripHtml(match[3]),
    };
  });
}

// ---------------------------------------------------------------------------
// WP response shapes (just enough typing to safely destructure)
// ---------------------------------------------------------------------------

interface WPMenuItem {
  label: string;
  uri: string;
  childItems?: { nodes: WPMenuItem[] };
  // Populated only for menu items that link to a real `Service` page —
  // lets the mega menu show that page's own featured image (whatever the
  // backend team uploaded there) instead of a hardcoded local asset.
  connectedNode?: { node: { __typename: string; featuredImage?: WPImage } | null };
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
      contactNumber: string;
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
  const [logoData, navData, megaMenuData] = await Promise.all([
    fetchGraphQL<{ page: { headerFields: { headerSiteLogo: WPImage } } }>(
      SITE_ICON_AND_LOGO,
    ),
    fetchGraphQL<HeaderAPIResponse>(HEADER_NAV_AND_BUTTON),
    fetchGraphQL<{
      page: {
        megaMenuFields: {
          image1: WPImage;
          image2: WPImage;
          image3: WPImage;
          image4: WPImage;
          image5: WPImage;
          image6: WPImage;
          blogImage: WPImage;
          knowledgeBaseImage: WPImage;
          blogText: string;
          knowledgeBaseText: string;
        };
      };
    }>(MEGA_MENU_IMAGES_QUERY),
  ]);

  const hf = navData.page.headerFields;
  const logoImg = img(logoData.page.headerFields.headerSiteLogo);
  const menuItems = navData.menuItems.nodes;
  const mm = megaMenuData.page.megaMenuFields;
  // Editor-controlled images for the Services mega menu, one per category
  // slot in menu order (image1 = 1st category, ... image6 = 6th) — a
  // separate field group from each Service page's own featuredImage, same
  // pattern as blogImage/knowledgeBaseImage for the Resources dropdown.
  const megaMenuServiceImages = [mm.image1, mm.image2, mm.image3, mm.image4, mm.image5, mm.image6].map(img);

  const servicesItem = menuItems.find((m) => m.label === "Services");
  const otherLinks = menuItems
    .filter((m) => m.label !== "Services" && m.label !== "Resources")
    .map((m) => ({
      label: m.label,
      href: m.uri.replace(/\/$/, "") || "/",
    }));

  const categories = (servicesItem?.childItems?.nodes ?? []).map((child, i) => {
    const megaMenuImage = megaMenuServiceImages[i];
    const connectedImage = img(child.connectedNode?.node?.featuredImage);
    return {
      label: child.label,
      href: child.uri.replace(/\/$/, ""),
      // Prefer the dedicated mega-menu image for this slot (image1-6, in
      // menu order) — editors use these to control the mega menu's own
      // thumbnail independently of whatever's set as the Service page's
      // featuredImage. Fall back to that featuredImage, then a local asset,
      // only if WP genuinely has neither, so a missing upload never breaks
      // the menu.
      image: megaMenuImage?.src
        ? megaMenuImage
        : connectedImage.src
          ? connectedImage
          : { src: NAV_CATEGORY_IMAGE_BY_LABEL[child.label] ?? "/images/services/card-shades.webp", alt: child.label },
      subItems: (child.childItems?.nodes ?? []).map((sub) => ({
        label: sub.label,
        href: sub.uri.replace(/\/$/, ""),
      })),
      exploreLabel: `Explore ${child.label}`,
    };
  });

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
    resourcesLabel: "Resources",
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
      // "Need help measuring?" / "Book Free Consultation" have no CMS field
      // confirmed for this block yet (same "hardcode rather than guess"
      // call as elsewhere in this file) — but the phone number is real,
      // pulled from the same footerFields.contactNumber the footer itself
      // uses (page 113), not a placeholder.
      helpBar: {
        prefix: "Need help measuring?",
        ctaLabel: "Book Free Consultation",
        ctaHref: "#quote-form",
        phoneLabel: `Call Us: ${sf.contactNumber}`,
      },
    },
    // Real CMS field group (megaMenuFields, page 706) — no title/href field
    // exists for either card, so those two stay fixed to match the site's
    // own routes (same "hardcode what has no confirmed field" call as the
    // help bar above), but the image and description are real.
    resourcesDropdown: {
      blogsCard: {
        image: img(mm.blogImage),
        title: "Blogs",
        description: mm.blogText,
        href: "/resources",
      },
      knowledgeBaseCard: {
        image: img(mm.knowledgeBaseImage),
        title: "Knowledge Base",
        description: mm.knowledgeBaseText,
        href: "/knowledge-base",
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
      footerShortText: string;
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
      contactNumber: string;
      contactEmail: string;
      contactSectionText: string;
      pointText1: string;
      pointText2: string;
      pointText3: string;
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
    description: ff.footerShortText,
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
      servingAreaText: ff.contactSectionText,
      phone: ff.contactNumber,
      email: ff.contactEmail,
      cta: { label: "Request a Free Quote", href: "/free-quote" },
    },
    trustHighlights: [ff.pointText1, ff.pointText2, ff.pointText3],
    copyright: `© ${new Date().getFullYear()} Blinds & Drapery Co. All rights reserved`,
    legalLinks: [
      { label: "Terms of Use", href: "/terms" },
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
  const headingSegments = parseSplSegments(hp.section2Heading as string);
  return {
    eyebrow: toTitleCase(hp.section2SubHeading as string),
    headingSegments,
    description: parseRichParagraphs(hp.section2Text as string),
    video: {
      poster: { src: hp.section2VideoUrl as string, alt: "Process video" },
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
    servicesSummary: parseRichParagraphs(hp.serviceSectionText as string),
    ctaLabel: "Learn More",
    cards: cards.slice(0, 6) as ServicesGlimpseContent["cards"],
  };
}

export async function fetchFeaturedCategory(): Promise<FeaturedCategoryContent> {
  const data = await fetchGraphQL<HomePageResponse>(HOME_PAGE_QUERY);
  const hp = data.page.homePageFields;
  const heading = parseSplHeading(hp.section3Heading as string);
  return {
    eyebrow: toTitleCase(hp.section3SubHeading as string),
    headingPrefix: heading.prefix,
    headingHighlight: heading.highlight,
    headingSuffix: heading.suffix,
    paragraphs: parseRichParagraphs(hp.section3Text as string),
    image: img(hp.section3Image as WPImage),
  };
}

export async function fetchHowItWorks(): Promise<HowItWorksContent> {
  const data = await fetchGraphQL<HomePageResponse>(HOME_PAGE_QUERY);
  const hp = data.page.homePageFields;
  const headingSegments = parseSplSegments(hp.howWeWorkSectionHeading as string);
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
    headingSegments,
    description: parseRichParagraphs(hp.howWeWorkSectionText as string),
    steps,
    ctaLabel: toTitleCase(hp.howWeWorkSectionButtonText as string),
    ctaHref: hp.howWeWorkSectionButtonUrl as string,
  };
}

export async function fetchQuoteGallery(): Promise<QuoteGalleryContent> {
  const data = await fetchGraphQL<HomePageResponse>(HOME_PAGE_QUERY);
  const hp = data.page.homePageFields;
  return {
    quote: parseRichParagraphs(hp.reviewSectionQuote as string),
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
    body: parseRichParagraphs(bodyRaw),
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
    description: parseRichParagraphs(hp.repairSectionText as string),
  };
}

export async function fetchLocations(): Promise<LocationsContent> {
  const homeData = await fetchGraphQL<HomePageResponse>(HOME_PAGE_QUERY);
  const hp = homeData.page.homePageFields;
  const locationIcon = img(hp.locationsSectionIcon as WPImage);
  const cityNames = [
    hp.locationsSectionIconText1 as string,
    hp.locationsSectionIconText2 as string,
    hp.locationsSectionIconText3 as string,
  ].filter(Boolean);

  return {
    eyebrow: toTitleCase(hp.locationsSectionSubHeading as string),
    heading: hp.locationsSectionHeading as string,
    description: parseRichParagraphs(hp.locationsSectionText as string),
    cities: cityNames.map((name) => ({
      icon: locationIcon,
      name,
    })),
  };
}

export async function fetchQuoteForm(): Promise<QuoteFormContent> {
  const data = await fetchGraphQL<HomePageResponse>(HOME_PAGE_QUERY);
  const hp = data.page.homePageFields;
  return {
    eyebrow: toTitleCase(hp.formSubHeading as string),
    heading: hp.formHeading as string,
    description: parseRichParagraphs(hp.formParagraph as string),
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
    submitLabel: "Request My Free Quote",
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
  const categories = sortFaqCategories(data.faqCategories.nodes.map((c) => c.name));
  const items = data.faqCategories.nodes.flatMap((cat) =>
    cat.faqs.nodes.map((faq) => ({
      question: faq.title,
      answer: parseRichParagraphs(faq.content),
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
  const [homeData, cardsData, faqData, reviewData] = await Promise.all([
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
    fetchGraphQL<FaqAPIResponse>(FAQ_QUERY),
    fetchGraphQL<{
      testimonials: {
        nodes: Array<{ title: string; excerpt: string; content: string; featuredImage: WPImage }>;
      };
    }>(REVIEW_QUERY),
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
    const text = hp[`iconListText${i}`] as string | null;
    if (text) trustBadgesItems.push({ icon: iconField?.node?.mediaItemUrl ?? null, label: text });
  }
  const trustBadgesContent: TrustBadgesContent = { items: trustBadgesItems };

  const piHeadingSegments = parseSplSegments(hp.section2Heading as string);
  const processIntroContent: ProcessIntroContent = {
    eyebrow: toTitleCase(hp.section2SubHeading as string),
    headingSegments: piHeadingSegments,
    description: parseRichParagraphs(hp.section2Text as string),
    video: {
      poster: { src: hp.section2VideoUrl as string, alt: "Process video" },
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
    servicesSummary: parseRichParagraphs(hp.serviceSectionText as string),
    ctaLabel: "Learn More",
    cards: serviceCards.slice(0, 6) as ServicesGlimpseContent["cards"],
  };

  const fcHeading = parseSplHeading(hp.section3Heading as string);
  const featuredCategoryContent: FeaturedCategoryContent = {
    eyebrow: toTitleCase(hp.section3SubHeading as string),
    headingPrefix: fcHeading.prefix,
    headingHighlight: fcHeading.highlight,
    headingSuffix: fcHeading.suffix,
    paragraphs: parseRichParagraphs(hp.section3Text as string),
    image: img(hp.section3Image as WPImage),
    // Figma's "Explore Shutters" CTA on this fixed Shutters showcase block
    // has no corresponding WP field (the query has no section3Button*
    // fields — confirmed by a "Cannot query field" GraphQL error) — same
    // hardcoded precedent as the Shutters page's own about.cta below.
    cta: { label: "Explore Shutters", href: "/services/shutters" },
  };

  const hwwHeadingSegments = parseSplSegments(hp.howWeWorkSectionHeading as string);
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
    headingSegments: hwwHeadingSegments,
    description: parseRichParagraphs(hp.howWeWorkSectionText as string),
    steps: hwwSteps,
    ctaLabel: toTitleCase(hp.howWeWorkSectionButtonText as string),
    ctaHref: hp.howWeWorkSectionButtonUrl as string,
  };

  const reviewHeadingSegments = parseSplSegments(hp.reviewSectionHeading as string);
  const testimonialsContent: TestimonialsContent = {
    eyebrow: toTitleCase(hp.reviewSectionSubHeading as string),
    headingSegments: reviewHeadingSegments,
    description: parseRichParagraphs(hp.reviewSectionText as string),
    testimonials: reviewData.testimonials.nodes.map((t) => ({
      quote: stripHtml(t.content),
      authorName: t.title,
      authorLocation: stripHtml(t.excerpt),
      avatar: img(t.featuredImage),
    })),
  };

  const quoteGalleryContent: QuoteGalleryContent = {
    quote: parseRichParagraphs(hp.reviewSectionQuote as string),
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
    body: parseRichParagraphs(hp.commercialSectionText as string),
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
    description: parseRichParagraphs(hp.repairSectionText as string),
  };

  const locationIcon = img(hp.locationsSectionIcon as WPImage);
  const locationCityNames = [
    hp.locationsSectionIconText1 as string,
    hp.locationsSectionIconText2 as string,
    hp.locationsSectionIconText3 as string,
  ].filter(Boolean);
  const locationsContent: LocationsContent = {
    eyebrow: toTitleCase(hp.locationsSectionSubHeading as string),
    heading: hp.locationsSectionHeading as string,
    description: parseRichParagraphs(hp.locationsSectionText as string),
    cities: locationCityNames.map((name) => ({
      icon: locationIcon,
      name,
    })),
  };

  const quoteFormContent: QuoteFormContent = {
    eyebrow: toTitleCase(hp.formSubHeading as string),
    heading: hp.formHeading as string,
    description: parseRichParagraphs(hp.formParagraph as string),
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
    submitLabel: "Request My Free Quote",
    successMessage: "Thank you! We'll get back to you within 24 hours.",
  };

  const faqCategories = sortFaqCategories(faqData.faqCategories.nodes.map((c) => c.name));
  const faqItems = faqData.faqCategories.nodes.flatMap((cat) =>
    cat.faqs.nodes.map((faq) => ({
      question: faq.title,
      answer: parseRichParagraphs(faq.content),
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
    testimonials: testimonialsContent,
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
    servicesSummary: parseRichParagraphs(sp.serviceSectionText as string),
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
    description: parseRichParagraphs(sp.howItWorksSectionText as string),
    steps: hiwSteps,
  };

  const aboutHeading = parseSplHeading(sp.section3Heading as string);
  const about: ServiceAboutContent = {
    eyebrow: toTitleCase(sp.section3SubHeading as string),
    headingPrefix: aboutHeading.prefix,
    headingHighlight: aboutHeading.highlight,
    headingSuffix: aboutHeading.suffix,
    paragraph: parseRichParagraphs(sp.section3Paragraph as string),
    image: img(sp.section3Image as WPImage),
    // Figma's "Explore Shutters" CTA on this fixed Shutters showcase block
    // has no corresponding WP field (the query has no section3Button*
    // fields) — same "Learn More" precedent as serviceGlimpse.ctaLabel
    // above, hardcoded rather than risking an unknown-field GraphQL error.
    cta: { label: "Explore Shutters", href: "/services/shutters" },
  };

  const faqCategories = sortFaqCategories(faqData.faqCategories.nodes.map((c) => c.name));
  const faqItems = faqData.faqCategories.nodes.flatMap((cat) =>
    cat.faqs.nodes.map((faq) => ({
      question: faq.title,
      answer: parseRichParagraphs(faq.content),
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

  const placesHeadingSegments = parseSplSegments(cp.section2Heading as string);
  const placeCards = [];
  for (let i = 1; i <= 4; i++) {
    const iconField = cp[`sec2CardsIcon${i}`] as WPImage | null;
    placeCards.push({
      title: cp[`sec2CardsTitle${i}`] as string,
      description: stripHtml(cp[`sec2CardsParagraph${i}`] as string),
      icon: iconField?.node?.mediaItemUrl ?? "",
    });
  }
  const places: CommercialPlacesContent = {
    eyebrow: toTitleCase(cp.section2SubHeading as string),
    headingSegments: placesHeadingSegments,
    description: parseRichParagraphs(cp.section2Text as string),
    cards: placeCards as CommercialPlacesContent["cards"],
  };

  const installHeading = parseSplHeading(cp.section3Heading as string);
  const carouselImages = pageData.page.commercialPageCarouselImages ?? [];
  const installImages = carouselImages.map((ci) => ({
    src: ci.mediaItemUrl,
    alt: ci.altText,
  }));
  while (installImages.length < 3) installImages.push({ src: "", alt: "" });
  const installation: InstallationGalleryContent = {
    eyebrow: toTitleCase(cp.section3SubHeading as string),
    headingPrefix: installHeading.prefix,
    headingHighlight: installHeading.highlight,
    headingSuffix: installHeading.suffix,
    description: parseRichParagraphs(cp.section3Text as string),
    images: installImages as InstallationGalleryContent["images"],
  };

  const quoteForm: CommercialQuoteFormContent = {
    eyebrow: toTitleCase(cp.formSectionSubHeading as string),
    heading: cp.formSectionHeading as string,
    description: parseRichParagraphs(cp.formSectionText as string),
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

  const faqCategories = sortFaqCategories(faqData.faqCategories.nodes.map((c) => c.name));
  const faqItems = faqData.faqCategories.nodes.flatMap((cat) =>
    cat.faqs.nodes.map((faq) => ({
      question: faq.title,
      answer: parseRichParagraphs(faq.content),
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

// Hardcoded — no CMS field group exists for this yet (confirmed against
// locationsHubPageQuery). See the comment on LocationCountySection in
// content.ts for the full explanation.
const LOCATION_COUNTIES: LocationCountySection[] = [
  {
    name: "Broward County",
    paragraphs: [
      "Broward covers more ground than most people expect, and the requirements shift considerably across it. Coastal properties from Deerfield down through Hollywood need corrosion-rated hardware and moisture-stable materials that inland communities like Weston and Coral Springs simply do not. Housing stock varies just as widely, from mid-century townhouses with irregular openings to newer developments where entire streets share the same window dimensions.",
      "We hold a full installation team for the county, which means residential replacements, multi-unit and HOA schemes, and commercial fit-outs all run in parallel rather than queuing behind one another. We aim to respond within 24 hours across every area listed here.",
    ],
    cities: [
      { name: "Fort Lauderdale", href: "/free-quote", description: "One of our busiest areas, and one of the most varied. We cover everything from single-room replacements in Victoria Park townhouses to full commercial fit-outs along Las Olas. Waterfront properties here get salt-air rated hardware as standard, because the corrosion that ruins unrated mechanisms shows up within two seasons this close to the Intracoastal." },
      { name: "Coral Springs", href: "/free-quote", description: "Residential and multi-family work across the northwest of the county. A lot of Coral Springs housing stock was built to similar plans, which means we frequently already know the window dimensions before we arrive. Faux wood blinds and cellular shades are the most requested specifications here, the latter usually for the west-facing rooms that run hot from mid-afternoon." },
      { name: "Coral Gables", href: "/free-quote", description: "Period properties and larger residential specifications, frequently with architectural constraints. Original window openings are rarely square, and many are protected, so treatments have to fit what is there rather than what would be convenient. Interior shutters are popular here because they read as joinery rather than as something added." },
      { name: "Hollywood", href: "/free-quote", description: "A mix of residential and hospitality, including contract-grade commercial fit-outs along the beach. Hotel and short-let properties here need genuine blackout for guest sleep quality and fabric that survives daily handling by people who did not pay for it. Fire-rated specifications are available across the range." },
      { name: "Pompano Beach", href: "/free-quote", description: "Waterfront and near-waterfront homes where glare is the primary complaint. Solar shades are the most common answer, specified by openness factor per elevation so the water view survives the treatment. West-facing rooms usually take a tighter weave than the rest of the house." },
      { name: "Plantation", href: "/free-quote", description: "Established residential neighbourhoods and professional offices. Larger older properties here often have arched heads, bay windows and irregular openings that defeat off-the-shelf sizing, which is exactly the situation custom fabrication exists for. We template rather than estimate on anything non-rectangular." },
      { name: "Weston", href: "/free-quote", description: "Premium residential, and the area where we install the highest proportion of motorised systems. Tall stairwell glazing and wide runs above sliding doors are difficult to reach and tend to be left unused entirely without automation. App and scheduled control are specified more often here than anywhere else in the county." },
      { name: "Pembroke Pines", href: "/free-quote", description: "High-volume residential communities, including a significant amount of multi-unit and HOA work. We handle phased installation across occupied buildings and hold consistent specifications across a development so units match, which matters when a management company is signing off on the whole scheme." },
      // Figma's own label reads "Devis" — almost certainly a typo for "Davie"
      // (a real Broward city, and the only one missing from this list).
      // Kept as-is rather than silently corrected; flag to the content team.
      { name: "Devis", href: "/free-quote", description: "Larger residential properties and equestrian estates with the tall, wide glazing that comes with them. Motorised drapery tracks and oversized roller systems are common specifications here. Anything above standard reach gets automated as a matter of course rather than as an upgrade." },
    ],
    alsoCovering: "Sunrise, Coconut Creek and Miramar",
  },
  {
    name: "Miami Dade County",
    paragraphs: [
      "Miami-Dade is the largest market we serve and the most vertical. A significant share of the work is high-rise and condominium, where the building often dictates the job more than the specification does: restricted service hours, freight elevator bookings, and management approval before a contractor is admitted. We handle that paperwork as standard rather than treating it as an obstacle. Light is the other defining factor. Floor-to-ceiling glazing on east and south elevations produces glare and heat load that no fabric-weight decision alone will solve, so solar shading specified by openness factor does most of the work here.",
      "Our teams for the county are experienced in both the access requirements and the specification, and we aim to respond within 24 hours.",
    ],
    cities: [
      { name: "Miami", href: "/free-quote", description: "High-rise, condominium and commercial installations across the city. Building access rules shape the job more than the specification does here, so we schedule around approved service hours and handle the paperwork most management companies require before a contractor is admitted. Downtown and Brickell offices are the most common commercial requests." },
      { name: "Miami Beach", href: "/free-quote", description: "Coastal and hospitality work where salt air is relentless. Every mechanism specified here is corrosion-rated, and we steer clients away from finishes that will not survive the first year. Hotels and short-let apartments make up a significant share of the work, which means blackout performance and fabric durability drive most specifications." },
      { name: "Deerfield Beach", href: "/free-quote", description: "Coastal properties where humidity is the deciding factor rather than a consideration. Composite shutters and faux wood blinds are specified as standard in bathrooms, kitchens and anything within a few blocks of the ocean. Timber is available where the room is dry and conditioned, but we will tell you honestly when it is the wrong call." },
      { name: "Aventura", href: "/free-quote", description: "Condominium and multi-unit residential, much of it high-rise with floor-to-ceiling glazing. Solar shades dominate for glare control on east and south elevations, usually motorised because the openings are large and the operating position is inconvenient. Building-wide specifications are common where an HOA is standardising." },
      { name: "Doral", href: "/free-quote", description: "Commercial offices and modern residential developments. Office work here is mostly glare control on screens, which is a solar shade problem rather than a privacy one, and specification comes down to openness factor rather than opacity. We supply contract-grade mechanisms rated for daily cycling." },
      { name: "Kendall", href: "/free-quote", description: "Suburban residential across the southwest of the county. Larger family homes with a lot of windows, so the free in-home consultation matters here more than almost anywhere else. Faux wood blinds and roller shades are the most requested combination." },
      { name: "Hialeah", href: "/free-quote", description: "Residential and light commercial. Practical specifications, hard-wearing materials and straightforward installation, with faux wood and aluminum blinds handling most requirements. Repairs are a significant share of our Hialeah work, often on treatments fitted by companies no longer trading." },
      { name: "North Miami", href: "/free-quote", description: "Residential and multi-family developments, including a steady volume of rental and investment property work. Durability and cost per unit matter more than finish detail on those jobs, and we specify accordingly rather than pushing a premium option that will not be maintained." },
      { name: "Sunny Isles Beach", href: "/free-quote", description: "Oceanfront condominiums where the glazing is large, the light is unfiltered and the buildings are strict about contractor access. Motorised solar shades are the standard specification, frequently across an entire unit, and scheduling is arranged with building management before we attend." },
    ],
    alsoCovering: "Homestead and the southern communities.",
  },
  {
    name: "Palm Beach County",
    paragraphs: [
      "Palm Beach County spans a wider range of property types than either of its neighbours, from waterfront estates in Jupiter to equestrian properties in Wellington and dense multi-family developments through West Palm Beach. Specifications rarely repeat across a single job here, and a large property frequently needs three or four different treatments to work correctly room by room. That suits a made-to-measure operation better than a stock one.",
      "We supply and install the full range throughout the county, residential and commercial, with the same consultation-first process and the same accountable installation team across every area listed here.",
    ],
    cities: [
      { name: "Boca Raton", href: "/free-quote", description: "Residential and professional offices across the city. A mix of established properties and newer developments, with full-height interior shutters and motorised shades the two most requested specifications. Office work is mostly glare management for screen-facing desks." },
      { name: "Delray Beach", href: "/free-quote", description: "Coastal residential and hospitality. Proximity to the ocean drives material choice more than anything else, so composite and vinyl handle the wet and exposed rooms while timber is reserved for dry interiors. Restaurants and short-let properties make up a steady share of the commercial work." },
      { name: "West Palm Beach", href: "/free-quote", description: "Commercial, multi-family and residential across the county's largest city. Office buildings and multi-unit residential developments are the bulk of it, which means volume pricing, consistent specification across units and phased installation around occupancy." },
      { name: "Boynton Beach", href: "/free-quote", description: "Residential communities and light commercial, with a significant proportion of HOA and community association work. Consistency matters on those schemes, so we hold a single specification across a development and keep the records so replacements years later still match." },
      { name: "Jupiter", href: "/free-quote", description: "Waterfront and premium residential. Large glazing, strong afternoon light and a lot of view worth protecting, which makes solar shades and layered treatments the usual answer rather than anything solid. Motorisation is common on the taller openings." },
      { name: "Wellington", href: "/free-quote", description: "Larger residential properties and equestrian estates. Tall windows, wide spans and rooms that are difficult to treat with standard sizing. Custom fabrication and motorised operation are less an upgrade here than the only practical specification." },
      // Figma's own label reads "Palm Beach Grains" — almost certainly a typo
      // for "Palm Beach Gardens". Kept as-is rather than silently corrected;
      // flag to the content team.
      { name: "Palm Beach Grains", href: "/free-quote", description: "Residential estates and commercial offices. Mixed requirements across a single property are common, with solar shading on the exposed elevations, blackout in bedrooms and drapery where the room should feel finished rather than merely covered." },
    ],
  },
];

export async function fetchLocationsPage() {
  const pageData = await fetchGraphQL<LocationsHubResponse>(LOCATIONS_HUB_PAGE_QUERY);

  const lp = pageData.page.locationHubPageFields;

  const hero: LocationsHeroContent = {
    breadcrumb: "HOME > locations hub",
    heading: lp.mainHeading as string,
    subheading: parseRichParagraphs(lp.mainParagraph as string),
  };

  const csHeadingSegments = parseSplSegments(lp.comingSoonSectionHeading as string);
  const csCards = [];
  for (let i = 1; i <= 3; i++) {
    csCards.push({
      title: lp[`comingSoonCardTitle${i}`] as string,
      description: lp[`comingSoonCardText${i}`] as string,
    });
  }
  const comingSoon: ComingSoonStatesContent = {
    // No CMS field exists for this eyebrow — confirmed against
    // locationsHubPageQuery, same "hardcode rather than guess at an
    // unverified GraphQL field" call as elsewhere in this file.
    eyebrow: "EXPANDING",
    headingSegments: csHeadingSegments,
    description: parseRichParagraphs(lp.comingSoonSectionParagraph as string),
    badgeLabel: "COMING SOON",
    cards: csCards as ComingSoonStatesContent["cards"],
  };

  return { hero, counties: LOCATION_COUNTIES, comingSoon };
}

// ---------------------------------------------------------------------------
// Individual service page (/services/blinds, /services/drapery, etc.)
// ---------------------------------------------------------------------------

interface ServiceSingleResponse {
  service: {
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
  const serviceData = await fetchGraphQL<ServiceSingleResponse>(SERVICE_SINGLE_PAGE_QUERY, { uri });

  const sf = serviceData.service.servicesSinglePageFields;
  const breadcrumbs = serviceData.service.seo?.breadcrumbs ?? [];
  const breadcrumb = breadcrumbs.map((b) => stripHtml(b.text)).join(" > ").toUpperCase();

  const introHeadingSegments = parseSplSegments(sf.introSectionHeading as string);
  const introText = (sf.introSectionText as string) ?? "";

  const aboutHeading = parseSplHeading(sf.section2Heading as string);
  const aboutText = (sf.section2Text as string) ?? "";
  const aboutParagraphs = parseInlineHighlightParagraphs(aboutText);

  // One WYSIWYG field holding one material per title/description pair —
  // rendered as an expand/collapse accordion (Figma node 4573:8519). WP
  // authors have used two different shapes for this field: either the
  // title and description sharing one <p> ("<strong>Title</strong><br />
  // description"), or the title and description as two separate sibling
  // <p> tags ("<p><strong>Title.</strong></p><p>description</p>") — the
  // latter is what most service pages actually use. A trailing empty
  // "<p>&nbsp;</p>" block (present on several pages) is dropped rather
  // than becoming a blank accordion row.
  const materialsFeatures: ServiceInlineAboutContent["features"] = [];
  {
    const blocks = ((sf.section2MaterielsText as string) ?? "")
      .split(/<\/?p>/)
      .map((s) => s.trim())
      .filter(Boolean);

    for (let i = 0; i < blocks.length; i++) {
      const block = blocks[i];
      const inlineMatch = block.match(/^<strong>([\s\S]*?)<\/strong>\s*<br\s*\/?>\s*([\s\S]*)$/i);
      if (inlineMatch) {
        materialsFeatures.push({ title: stripHtml(inlineMatch[1]), description: stripHtml(inlineMatch[2]) });
        continue;
      }

      const titleOnlyMatch = block.match(/^<strong>([\s\S]*?)<\/strong>$/i);
      if (titleOnlyMatch) {
        const nextRaw = blocks[i + 1];
        const nextStripped = nextRaw ? stripHtml(nextRaw) : "";
        const nextIsTitle = nextRaw ? /^<strong>[\s\S]*<\/strong>$/i.test(nextRaw) : false;
        if (nextRaw && nextStripped && !nextIsTitle) {
          materialsFeatures.push({ title: stripHtml(titleOnlyMatch[1]), description: nextStripped });
          i++;
        } else {
          materialsFeatures.push({ title: stripHtml(titleOnlyMatch[1]), description: "" });
        }
        continue;
      }

      const title = stripHtml(block);
      if (title) materialsFeatures.push({ title, description: "" });
    }
  }

  const hiwHeaderHeadingSegments = parseSplSegments(sf.howItWorksSectionHeading as string);
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
      description: parseRichParagraphs(sf.serviceSubCategorySectionText as string),
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
      backgroundImage: img(sf.heroSectionImage as WPImage),
    },
    intro: {
      eyebrow: toTitleCase(sf.introSectionSubHeading as string),
      headingSegments: introHeadingSegments,
      paragraphs: parseRichParagraphs(introText),
      image: img(sf.introSectionImage as WPImage),
    },
    subServices,
    about: {
      eyebrow: toTitleCase(sf.section2SubHeading as string),
      headingPrefix: aboutHeading.prefix,
      headingHighlight: aboutHeading.highlight,
      headingSuffix: aboutHeading.suffix,
      paragraphs: aboutParagraphs,
      features: materialsFeatures,
      gallery: [
        img(sf.section2Image1 as WPImage),
        img(sf.section2Image2 as WPImage),
        img(sf.section2Image3 as WPImage),
      ] as ServiceInlinePageContent["about"]["gallery"],
    },
    howItWorksHeader: {
      eyebrow: toTitleCase(sf.howItWorksSectionSubHeading as string),
      headingSegments: hiwHeaderHeadingSegments,
      subtitle: parseRichParagraphs(sf.howItWorksSectionText as string),
    },
    timeline: {
      images: [timelineImage, timelineImage] as ServiceInlinePageContent["timeline"]["images"],
      steps: timelineSteps as ServiceInlinePageContent["timeline"]["steps"],
    },
    cta: {
      eyebrow: toTitleCase(sf.ctaBannerSubHeading as string),
      heading: sf.ctaBannerHeading as string,
      body: parseRichParagraphs(sf.ctaBannerText as string),
      ctaLabel: toTitleCase(sf.ctaBannerButtonText as string),
      ctaHref: sf.ctaBannerButtonUrl as string,
      image: img(sf.ctaBannerBackgroundImage as WPImage),
    },
  };

  // Service pages (and shade sub-pages, which use this same fetch) don't
  // use the generic sitewide FAQ block anymore — each one now has its own
  // 6 question/answer pairs authored directly on the service, via these
  // faqTitleN/faqAnswerN fields. A page with none of them filled in yet
  // gets no FAQ section at all rather than falling back to the generic one.
  const faqCategory = "General Questions";
  const faqItems = [1, 2, 3, 4, 5, 6]
    .map((n) => ({
      question: sf[`faqTitle${n}`] as string | undefined,
      answer: sf[`faqAnswer${n}`] as string | undefined,
    }))
    .filter((item): item is { question: string; answer: string } => Boolean(item.question && item.answer))
    .map((item) => ({
      question: item.question,
      answer: parseRichParagraphs(item.answer),
      category: faqCategory,
    }));

  const faq: FaqContent | undefined =
    faqItems.length > 0
      ? {
          eyebrow: toTitleCase(sf.faqSubHeading as string) || "FAQ",
          heading: (sf.faqHeading as string) || "Frequently Asked Questions",
          categories: [faqCategory],
          items: faqItems,
        }
      : undefined;

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
  const missionHeadingSegments = parseSplSegments(ap.section2Heading as string);

  const hero: AboutPageContent["hero"] = {
    breadcrumb: "HOME > ABOUT",
    heading: ap.heroSectionHeading as string,
    subheading: ap.heroSectionParagraph as string,
    ctaLabel: toTitleCase(ap.heroSectionButtonText as string),
    ctaHref: ap.heroSectionButtonUrl as string,
    backgroundImage: img(aboutData.page.featuredImage),
  };

  const mission: AboutPageContent["mission"] = {
    headingSegments: missionHeadingSegments,
    paragraphs: parseRichParagraphs(ap.section2Paragraph as string),
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
    description: parseRichParagraphs(ap.section3Text as string),
    features: installationFeatures,
  };

  // iconBoxFields is the paired icon+title structure the backend dev added
  // for the Team section's trust-badge row (Licensed & Insured, BBB A+
  // Accredited, etc.) — a different field group from boxIcon/boxTitle1-4
  // above, which belongs to the Installation section's features instead.
  const iconBoxFields = ap.iconBoxFields as Record<string, unknown> | null;
  const teamBadges: AboutPageContent["team"]["badges"] = [];
  if (iconBoxFields) {
    for (let i = 1; i <= 4; i++) {
      const label = (iconBoxFields[`title${i}`] as string)?.trim();
      if (label) teamBadges.push({ icon: img(iconBoxFields[`icon${i}`] as WPImage), label });
    }
  }

  const team: AboutPageContent["team"] = {
    badges: teamBadges,
    members: teamData.teamMembers.nodes.slice(0, 4).map((m) => ({
      image: { ...img(m.featuredImage), alt: m.featuredImage?.node?.altText || m.title },
      name: m.title,
      role: m.teamFields?.jobRole ?? "",
    })) as AboutPageContent["team"]["members"],
  };

  const faqCategories = sortFaqCategories(faqData.faqCategories.nodes.map((c) => c.name));
  const faqItems = faqData.faqCategories.nodes.flatMap((cat) =>
    cat.faqs.nodes.map((faq) => ({
      question: faq.title,
      answer: parseRichParagraphs(faq.content),
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

  const processHeadingSegments = parseSplSegments(qp.section2Heading as string);
  const processSteps: FreeQuotePageContent["process"]["steps"] = [
    { number: "Step 01", title: qp.titleStep1 as string || "", description: qp.textStep1 as string || "" },
    { number: "Step 02", title: qp.titleStep2 as string || "", description: qp.textStep2 as string || "" },
    { number: "Step 03", title: qp.titleStep3 as string || "", description: qp.textStep3 as string || "" },
    { number: "Step 04", title: qp.titleStep4 as string || "", description: qp.textStep4 as string || "" },
    { number: "Step 05", title: qp.titleStep5 as string || "", description: qp.textStep5 as string || "" },
  ];
  const process: FreeQuotePageContent["process"] = {
    eyebrow: toTitleCase(qp.section2SubHeading as string),
    headingSegments: processHeadingSegments,
    subtitle: parseRichParagraphs(qp.section2Text as string),
    steps: processSteps,
  };

  const processIntroHeadingSegments = parseSplSegments(qp.section3Heading as string);
  const videoNode = (qp.section3Video as WPImage)?.node;
  const processIntro: FreeQuotePageContent["processIntro"] = {
    eyebrow: toTitleCase(qp.section3SubHeading as string),
    headingSegments: processIntroHeadingSegments,
    description: parseRichParagraphs(qp.section3Text as string),
    image: { src: videoNode?.mediaItemUrl ?? "", alt: videoNode?.altText ?? "" },
  };

  const formHeadingSegments = parseSplSegments(qp.formHeading as string);
  const form: FreeQuotePageContent["form"] = {
    eyebrow: toTitleCase(qp.formSubHeading as string),
    headingSegments: formHeadingSegments,
    subtitle: parseRichParagraphs(qp.formText as string),
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
    submitLabel: "Request My Free Quote",
    assistanceHeading: "Need Immediate Assistance?",
    callLabel: "Call Us",
    callNumber: "+ (954) 555-1234",
    textLabel: "Text Us",
    trustLine: "100% Satisfaction Guaranteed · Licensed & Insured · Florida Verified",
  };

  const faqCategories = sortFaqCategories(faqData.faqCategories.nodes.map((c) => c.name));
  const faqItems = faqData.faqCategories.nodes.flatMap((cat) =>
    cat.faqs.nodes.map((faq) => ({
      question: faq.title,
      answer: parseRichParagraphs(faq.content),
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
      productTypes: { nodes: Array<{ name: string }> };
      roomTypes: { nodes: Array<{ name: string }> };
      galleryItems: {
        nodes: Array<{
          databaseId: number;
          title: string;
          featuredImage: WPImage;
          productTypes: { nodes: Array<{ name: string }> };
          roomTypes: { nodes: Array<{ name: string }> };
        }>;
      };
    }>(GALLERY_ITEMS_QUERY),
    fetchGraphQL<FaqAPIResponse>(FAQ_QUERY),
  ]);

  const gp = pageData.page.galleryPageFields;
  const mainHeadingSegments = parseSplSegments(gp.mainTitle as string || "");

  const hero: GalleryPageContent["hero"] = {
    breadcrumb: "HOME > GALLERY",
    headingSegments: mainHeadingSegments,
    subheading: gp.mainParagraph as string || "",
  };

  const productOptions = ["All", ...itemsData.productTypes.nodes.map((pt) => pt.name)];
  const roomOptions = ["All", ...itemsData.roomTypes.nodes.map((rt) => rt.name)];

  const filters: GalleryPageContent["filters"] = {
    heading: gp.filterSectionTitle as string || "Filter by",
    filterGroups: [
      { label: "Product Type", options: productOptions },
      { label: "Room", options: roomOptions },
    ],
  };

  const allItems: GalleryPageContent["grid"]["items"] = itemsData.galleryItems.nodes
    .map((item) => ({
      id: item.databaseId,
      image: img(item.featuredImage),
      category: item.productTypes.nodes[0]?.name ?? "",
      room: item.roomTypes.nodes[0]?.name ?? "",
      title: item.title,
    }));

  const grid: GalleryPageContent["grid"] = {
    items: allItems,
    loadMoreLabel: "Load More",
  };

  const ctaHeading = parseSplHeading(gp.ctaBannerHeading as string || "");
  const cta: ConsultationCtaContent = {
    eyebrow: toTitleCase(gp.ctaBannerSubHeading as string || ""),
    heading: ctaHeading.prefix + ctaHeading.highlight + ctaHeading.suffix,
    body: parseRichParagraphs(gp.ctaBannerText as string),
    ctaLabel: toTitleCase(gp.ctaBannerButtonText as string || ""),
    ctaHref: gp.ctaBannerButtonUrl as string || "",
    image: img(gp.ctaBannerImage as WPImage),
  };

  const faqCategories = sortFaqCategories(faqData.faqCategories.nodes.map((c) => c.name));
  const faqItems = faqData.faqCategories.nodes.flatMap((cat) =>
    cat.faqs.nodes.map((faq) => ({
      question: faq.title,
      answer: parseRichParagraphs(faq.content),
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
    summary: parseRichParagraphs(lp.serviceSectionText as string),
    cards: serviceCards.slice(0, 6) as CityPageContent["serviceGrid"]["cards"],
  };

  const consultation: CityPageContent["consultation"] = {
    eyebrow: toTitleCase(lp.formSectionSubHeading as string),
    heading: lp.formSectionHeading as string,
    description: parseRichParagraphs(lp.formSectionText as string),
    ctaLabel: "Submit",
  };

  const faqCategories = sortFaqCategories(faqData.faqCategories.nodes.map((c) => c.name));
  const faqItems = faqData.faqCategories.nodes.flatMap((cat) =>
    cat.faqs.nodes.map((faq) => ({
      question: faq.title,
      answer: parseRichParagraphs(faq.content),
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
    description: parseRichParagraphs(af.mainParagraph),
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
          slug: string;
          excerpt: string;
          categories: { nodes: Array<{ name: string; slug: string }> };
        }>;
      };
    }>(KNOWLEDGEBASE_CARDS_QUERY),
  ]);

  const af = archiveData.page.blogAndKbArchivePageFields;
  const items = kbData.knowledgeBaseItems.nodes;

  // Render however many articles are actually published — do not pad with
  // blank placeholder cards to hit a fixed count of 6. The grid is a
  // 1/2/3-column layout, so any real count lays out cleanly.
  const articles = items.map((item) => ({
    category: item.categories?.nodes?.[0]?.name ?? "",
    title: item.title,
    description: stripHtml(item.excerpt),
    href: `/knowledge-base/${item.slug}`,
  }));

  const result: KnowledgeBasePageContent = {
    heading: af.mainTitle,
    subtitle: parseRichParagraphs(af.mainParagraph),
    articles,
  };

  return result;
}

export async function fetchKnowledgeBaseSlugs(): Promise<string[]> {
  const data = await fetchGraphQL<{
    knowledgeBaseItems: { nodes: Array<{ slug: string }> };
  }>(KNOWLEDGEBASE_SLUGS_QUERY);
  return data.knowledgeBaseItems.nodes.map((n) => n.slug);
}

// ---------------------------------------------------------------------------
// Privacy Policy page (/privacy-policy)
// ---------------------------------------------------------------------------

export async function fetchPrivacyPolicyPage() {
  const data = await fetchGraphQL<{
    page: { title: string; content: string };
  }>(POLICY_PAGE_QUERY);

  const result: LegalPageContent = {
    heading: data.page.title,
    paragraphs: parseRichParagraphs(data.page.content),
  };

  return result;
}

// ---------------------------------------------------------------------------
// Terms of Use page (/terms)
// ---------------------------------------------------------------------------

export async function fetchTermsPage() {
  const data = await fetchGraphQL<{
    page: { title: string; content: string };
  }>(TERMS_PAGE_QUERY);

  const result: LegalPageContent = {
    heading: data.page.title,
    paragraphs: parseRichParagraphs(data.page.content),
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

  const contentParagraphs = parseRichParagraphs(post.content);
  const wordCount = contentParagraphs
    .flatMap((segments) => segments.map((s) => s.text))
    .join(" ")
    .split(/\s+/)
    .filter(Boolean).length;

  const result: BlogArticlePageContent = {
    breadcrumb,
    heroImage: img(post.featuredImage),
    heroBadge: "Blog",
    date: post.date ? new Date(post.date).toLocaleDateString("en-US", { year: "numeric", month: "long", day: "numeric" }) : "",
    author: {
      name: post.blogAuthorFields?.authorName ?? "",
      avatar: img(post.blogAuthorFields?.profileImage),
    },
    readTime: `${Math.max(1, Math.ceil(wordCount / 200))} min read`,
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

  const contentParagraphs = parseRichParagraphs(item.content);
  const wordCount = contentParagraphs
    .flatMap((segments) => segments.map((s) => s.text))
    .join(" ")
    .split(/\s+/)
    .filter(Boolean).length;

  const result: KnowledgeArticlePageContent = {
    breadcrumb,
    heroImage: img(item.featuredImage),
    categoryTag: item.categories?.nodes?.[0]?.name ?? "",
    date: item.date ? new Date(item.date).toLocaleDateString("en-US", { year: "numeric", month: "long", day: "numeric" }) : "",
    readTime: `${Math.max(1, Math.ceil(wordCount / 200))} min read`,
    title: item.title,
    blocks: [{ type: "section" as const, heading: "", paragraphs: contentParagraphs }],
  };

  return result;
}
