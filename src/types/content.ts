export interface HeroContent {
  heading: string;
  subheading: string;
  ctaLabel: string;
  ctaHref: string;
  backgroundImage: {
    src: string;
    alt: string;
  };
}

export interface NavLinkContent {
  label: string;
  href: string;
}

export interface NavDropdownSubItem {
  label: string;
  href: string;
}

export interface NavDropdownCategory {
  label: string;
  href: string;
  image: { src: string; alt: string };
  subItems?: NavDropdownSubItem[];
  exploreLabel: string;
}

export interface NavDropdownBlogCard {
  image: { src: string; alt: string };
  title: string;
  description: string;
  buttonLabel: string;
  buttonHref: string;
}

export interface NavHelpBarContent {
  prefix: string;
  ctaLabel: string;
  ctaHref: string;
  phoneLabel: string;
}

export interface NavContent {
  logo: {
    src: string;
    alt: string;
    href: string;
  };
  servicesLabel: string;
  servicesDropdown: {
    categories: NavDropdownCategory[];
    blogCard: NavDropdownBlogCard;
    socialLinks: FooterSocialLink[];
    helpBar: NavHelpBarContent;
  };
  links: NavLinkContent[];
  ctaLabel: string;
  ctaHref: string;
}

export interface TrustBadgeItem {
  /** lucide-react export name (e.g. "Gavel"); null when the item is text-only (e.g. the Google Reviews stars). */
  icon: string | null;
  label: string;
}

export interface TrustBadgesContent {
  items: TrustBadgeItem[];
}

export interface ProcessIntroContent {
  eyebrow: string;
  headingPrefix: string;
  headingHighlight: string;
  description: string;
  video: {
    poster: { src: string; alt: string };
  };
}

export interface ServiceCard {
  image: { src: string; alt: string };
  title: string;
  description: string;
  href: string;
}

export interface ServicesGlimpseContent {
  eyebrow: string;
  // Rich-text heading with per-segment emphasis (Figma alternates navy/teal
  // spans within one heading — a plain string can't carry that styling).
  headingSegments: Array<{ text: string; emphasis?: boolean }>;
  servicesSummary: string;
  ctaLabel: string;
  cards: [ServiceCard, ServiceCard, ServiceCard, ServiceCard, ServiceCard, ServiceCard];
}

export interface FeaturedCategoryContent {
  eyebrow: string;
  headingPrefix: string;
  headingHighlight: string;
  headingSuffix: string;
  paragraphs: string[];
  image: {
    src: string;
    alt: string;
  };
  cta?: { label: string; href: string };
}

export interface HowItWorksStep {
  stepLabel: string;
  icon: string;
  title: string;
  description: string;
}

export interface HowItWorksContent {
  eyebrow: string;
  headingPrefix: string;
  headingHighlight: string;
  description: string;
  steps: HowItWorksStep[];
  ctaLabel: string;
  ctaHref: string;
}

export interface TestimonialsContent {
  eyebrow: string;
  headingPrefix: string;
  headingHighlight: string;
  description: string;
  testimonials: Array<{
    quote: string;
    authorName: string;
    authorLocation: string;
    avatar: {
      src: string;
      alt: string;
    };
  }>;
}

export interface QuoteGalleryImage {
  src: string;
  alt: string;
}

export interface QuoteGalleryContent {
  quote: string;
  // Decorative mark rendered above the quote. `alt` is "" when purely
  // decorative (rendered with aria-hidden).
  quoteIcon: {
    src: string;
    alt: string;
  };
  // Exactly 4 — the component lays these out as a fixed asymmetric 2x2
  // grid (515/757 top row, 594/678 bottom row) matching the Figma design.
  images: [QuoteGalleryImage, QuoteGalleryImage, QuoteGalleryImage, QuoteGalleryImage];
}

export interface CommercialContent {
  eyebrow: string;
  heading: string;
  subheading: string;
  body: string;
  ctaLabel: string;
  ctaHref: string;
  image: {
    src: string;
    alt: string;
  };
}

export interface RepairMaintenanceContent {
  eyebrow: string;
  icon: string;
  headingPrefix: string;
  headingHighlight: string;
  headingSuffix: string;
  description: string;
}

export interface LocationsContent {
  eyebrow: string;
  heading: string;
  description: string;
  // Figma names this layer plainly "Vector" (not "lucide/..."), meaning it's
  // a hand-drawn decorative pin glyph rather than a real Lucide export — a
  // solid teardrop map pin, not the outline pin lucide-react ships. Per the
  // design-to-code icon rule ("reuse a project icon only if its glyph
  // clearly matches; otherwise use the exported asset"), it's modeled as an
  // image asset like quoteGallery/testimonials, not a lucide icon name.
  cities: Array<{ icon: { src: string; alt: string }; name: string }>;
}

export interface QuoteFormContent {
  eyebrow: string;
  heading: string;
  description: string;
  nameLabel: string;
  namePlaceholder: string;
  emailLabel: string;
  emailPlaceholder: string;
  phoneLabel: string;
  phonePlaceholder: string;
  serviceLabel: string;
  servicePlaceholder: string;
  serviceOptions: string[];
  projectLabel: string;
  projectPlaceholder: string;
  submitLabel: string;
  successMessage: string;
}

export interface FaqContent {
  eyebrow: string;
  heading: string;
  categories: string[];
  items: Array<{ question: string; answer: string; category: string }>;
}

export interface FooterLink {
  label: string;
  href: string;
}

export interface FooterColumn {
  title: string;
  links: FooterLink[];
  // Set for the "Services" column only — renders a trailing chevron on
  // each link (Figma: "lucide/chevron-down" rotated -90deg per row).
  showChevron?: boolean;
}

export interface FooterBadge {
  src: string;
  alt: string;
  // CSS aspect-ratio (e.g. "269/187"), since the two trust badges in the
  // design aren't uniformly sized.
  aspectRatio: string;
}

export interface FooterSocialLink {
  platform: "instagram" | "facebook" | "youtube" | "linkedin";
  href: string;
  label: string;
}

export interface FooterContact {
  servingAreaText?: string;
  phone?: string;
  email?: string;
  cta?: { label: string; href: string };
}

export interface FooterContent {
  logo: {
    src: string;
    alt: string;
    href: string;
  };
  description?: string;
  badges: FooterBadge[];
  columns: FooterColumn[];
  contact?: FooterContact;
  trustHighlights?: string[];
  copyright: string;
  legalLinks: FooterLink[];
  socialLinks: FooterSocialLink[];
}

export interface ServiceHowItWorksStep {
  number: string;
  title: string;
  description: string;
  image: { src: string; alt: string };
}

export interface ServiceHowItWorksContent {
  eyebrow: string;
  headingPrefix: string;
  headingHighlight: string;
  headingSuffix: string;
  description: string;
  steps: ServiceHowItWorksStep[];
}

export interface ServiceAboutContent {
  eyebrow: string;
  headingPrefix: string;
  headingHighlight: string;
  headingSuffix: string;
  paragraph: string;
  image: { src: string; alt: string };
  cta?: { label: string; href: string };
}

// Content specific to the "/services" hub page (Figma "Desktop / Service",
// node 2171:47) — kept as its own namespace rather than folded into the
// per-section content types above, since those (hero, services, faq) are
// shared verbatim with the homepage and this page adds a few sections/props
// that only it needs (the hero breadcrumb, the how-it-works ticker, the
// about-shutters block).
export interface ServicePageContent {
  heroBreadcrumb: string;
  howItWorks: ServiceHowItWorksContent;
  about: ServiceAboutContent;
}

// Content for the "/services/blinds" page (Figma "Desktop / Service Inline
// 2", node 2721:1622). This is a per-service detail-page template — a
// different layout from the "/services" hub page above, not a variant of it.
export interface ServiceInlineHeroContent {
  breadcrumb: string;
  heading: string;
  subheading: string;
  backgroundImage: { src: string; alt: string };
}

// New section confirmed via get_design_context on node 4481:4451/4463 — sits
// directly under the hero, before the (optional) sub-services grid and the
// existing "about" (materials/features) section below. A light ice-colored
// card (eyebrow + 2-segment heading + paragraphs) beside a photo, both at
// equal width. Figma repeats this exact copy verbatim across every single-
// service page (confirmed on both the Blinds and Shades source frames) —
// a placeholder, not page-specific content, same "preserve the design's own
// repeated copy faithfully" rule as the timeline steps' identical body text.
export interface ServiceIntroContent {
  eyebrow: string;
  headingPrefix: string;
  headingHighlight: string;
  paragraphs: string[];
  image: { src: string; alt: string };
}

// The intro paragraph has one inline highlighted phrase mid-sentence (bigger,
// semibold, teal) rather than a heading-style prefix/highlight/suffix split —
// modeled as 3 plain string segments joined in order, same idiom as the
// heading fields elsewhere in this file.
export interface ServiceInlineAboutContent {
  eyebrow: string;
  headingPrefix: string;
  headingHighlight: string;
  headingSuffix: string;
  paragraphPrefix: string;
  paragraphHighlight: string;
  paragraphSuffix: string;
  // Rendered as an expand/collapse accordion (Figma node 4573:8519) —
  // matches the real WP field (section2MaterielsText, a single WYSIWYG
  // field storing "<p><strong>Title</strong><br />description</p>" per
  // material), not a flat list of short tags.
  features: Array<{ title: string; description: string }>;
  // Exactly 3 — a fixed 3-up photo gallery (row on tablet/desktop, stacked
  // on mobile), not an arbitrary-length list.
  gallery: [{ src: string; alt: string }, { src: string; alt: string }, { src: string; alt: string }];
}

export interface ServiceTimelineStep {
  number: string;
  title: string;
  description: string;
}

export interface ServiceTimelineContent {
  images: [{ src: string; alt: string }, { src: string; alt: string }];
  steps: [ServiceTimelineStep, ServiceTimelineStep, ServiceTimelineStep, ServiceTimelineStep];
}

export interface ConsultationCtaContent {
  eyebrow: string;
  heading: string;
  body: string;
  ctaLabel: string;
  ctaHref: string;
  image: { src: string; alt: string };
}

export interface SubServiceCard {
  image: { src: string; alt: string };
  title: string;
  description: string;
  href: string;
}

export interface SubServicesGridContent {
  eyebrow: string;
  headingPrefix: string;
  headingHighlight: string;
  headingSuffix: string;
  description: string;
  cards: SubServiceCard[];
}

export interface ServiceHowItWorksHeader {
  eyebrow: string;
  headingPrefix: string;
  headingHighlight: string;
  subtitle: string;
}

export interface ServiceInlinePageContent {
  hero: ServiceInlineHeroContent;
  intro: ServiceIntroContent;
  subServices?: SubServicesGridContent;
  about: ServiceInlineAboutContent;
  howItWorksHeader: ServiceHowItWorksHeader;
  timeline: ServiceTimelineContent;
  cta: ConsultationCtaContent;
}

// Content for the "/commercial" page (Figma "Desktop / Commercial", node
// 2220:843). Named `CommercialPageContent`/`commercialPage` — NOT
// `CommercialContent`/`commercial` — because that name is already taken by
// the homepage's unrelated teal "Commercial Solutions" plug section
// (`src/components/Commercial.tsx`), a different, smaller component this
// page's own quote-form section deliberately doesn't reuse (see
// CommercialQuoteForm.tsx's comment for why).
export interface CommercialHeroContent {
  breadcrumb: string;
  heading: string;
  subheading: string;
  ctaLabel: string;
  ctaHref: string;
  backgroundImage: { src: string; alt: string };
}

export interface CommercialPlaceCard {
  title: string;
  description: string;
  // lucide-react export name (e.g. "Building2") — this Figma file names icon
  // layers after their real lucide export, confirmed for all 4 of these
  // (Building2, Hotel, SquareActivity, PaperBag all exist verbatim in the
  // installed lucide-react version), so no fallback-asset icon is needed.
  icon: string;
}

export interface CommercialPlacesContent {
  eyebrow: string;
  headingPrefix: string;
  headingHighlight: string;
  description: string;
  // Exactly 4 — the card row switches from a fixed 2-per-row wrap (desktop)
  // to a full-width stack (tablet/mobile), not an arbitrary-length list.
  cards: [CommercialPlaceCard, CommercialPlaceCard, CommercialPlaceCard, CommercialPlaceCard];
}

export interface InstallationGalleryContent {
  eyebrow: string;
  headingPrefix: string;
  headingHighlight: string;
  headingSuffix: string;
  description: string;
  // WP's own field is a carousel (`commercialPageCarouselImages`) and can
  // hold more than 3 — the gallery shows a sliding 3-wide window over
  // however many come back, so this is a plain array, minimum 3 (padded in
  // api.ts if WP ever returns fewer).
  images: { src: string; alt: string }[];
}

export interface CommercialQuoteFormContent {
  eyebrow: string;
  heading: string;
  description: string;
  companyNameLabel: string;
  companyNamePlaceholder: string;
  contactNameLabel: string;
  contactNamePlaceholder: string;
  emailLabel: string;
  emailPlaceholder: string;
  phoneLabel: string;
  phonePlaceholder: string;
  projectTypeLabel: string;
  projectTypePlaceholder: string;
  projectTypeOptions: string[];
  locationLabel: string;
  // Figma shows this field as an empty bordered box with no placeholder
  // text at any breakpoint (unlike every other field, which has one) — this
  // placeholder is inferred, same as QuoteForm's serviceOptions elsewhere in
  // this file, flagged here rather than presented as design-confirmed.
  locationPlaceholder: string;
  messageLabel: string;
  // Also inferred — same empty-box-with-no-placeholder gap as Location above.
  messagePlaceholder: string;
  uploadPrompt: string;
  uploadHint: string;
  submitLabel: string;
  successMessage: string;
}

export interface CommercialPageContent {
  hero: CommercialHeroContent;
  places: CommercialPlacesContent;
  installation: InstallationGalleryContent;
  quoteForm: CommercialQuoteFormContent;
}

// New page 2026-08-17: "/locations" (Figma "Desktop / Locations Hub", node
// 2251:68). Named `LocationsPageContent`/`locationsPage` — NOT `locations`,
// since that key is already taken by the homepage's own unrelated
// "Locations" teaser section (`src/components/Locations.tsx`/
// `LocationsContent`, a small pin-icon city list). Same key-collision
// pattern as `commercial`/`commercialPage`.
export interface LocationsHeroContent {
  breadcrumb: string;
  heading: string;
  // The CMS field is WYSIWYG rich text (multiple <p> blocks), so this is
  // pre-split into plain paragraph strings at the data layer — same
  // pattern as FeaturedCategoryContent.paragraphs — rather than rendered
  // with dangerouslySetInnerHTML.
  subheading: string[];
}

// Redesigned 2026-09-09 (Figma "Desktop / Locations Hub ", node 4664:10194,
// plus tablet 4748:5900 / mobile 4748:6080) — replaces the old map-panel
// "ServiceAreaPanel" section entirely with a county-by-county directory of
// individual cities. None of this content (county copy, ~25 city
// name/description pairs, "Also covering" notes) has a corresponding
// GraphQL field in the backend dev's schema reference — confirmed against
// locationsHubPageQuery, which only has serviceAreaSection* (now unused)
// and comingSoonSection* fields. Hardcoded here matching the Figma copy
// exactly; flagged for the backend dev, since a real fix likely means
// adding a "county" taxonomy to the existing `location` post type so this
// can eventually pull from real per-city entries instead.
export interface LocationCityCard {
  name: string;
  description: string;
  href: string;
}

export interface LocationCountySection {
  name: string;
  paragraphs: string[];
  cities: LocationCityCard[];
  alsoCovering?: string;
}

export interface ComingSoonStateCard {
  title: string;
  description: string;
}

export interface ComingSoonStatesContent {
  eyebrow: string;
  headingPrefix: string;
  headingHighlight: string;
  description: string;
  badgeLabel: string;
  cards: [ComingSoonStateCard, ComingSoonStateCard, ComingSoonStateCard];
}

export interface LocationsPageContent {
  hero: LocationsHeroContent;
  counties: LocationCountySection[];
  comingSoon: ComingSoonStatesContent;
}

export interface GalleryHeroContent {
  breadcrumb: string;
  headingPrefix: string;
  headingHighlight: string;
  subheading: string;
}

export interface GalleryFilterGroup {
  label: string;
  options: string[];
}

export interface GalleryFiltersContent {
  heading: string;
  filterGroups: [GalleryFilterGroup, GalleryFilterGroup];
}

export interface GalleryItem {
  id: number;
  image: { src: string; alt: string };
  category: string;
  room: string;
  title: string;
}

export interface GalleryGridContent {
  items: GalleryItem[];
  loadMoreLabel: string;
}

export interface GalleryPageContent {
  hero: GalleryHeroContent;
  filters: GalleryFiltersContent;
  grid: GalleryGridContent;
  cta: ConsultationCtaContent;
}

export interface AboutHeroContent {
  breadcrumb: string;
  heading: string;
  subheading: string;
  ctaLabel: string;
  ctaHref: string;
  backgroundImage: { src: string; alt: string };
}

export interface AboutMissionContent {
  headingPrefix: string;
  headingHighlight: string;
  paragraphs: string[];
}

export interface AboutInstallationFeature {
  icon: { src: string; alt: string };
  label: string;
}

export interface AboutInstallationContent {
  eyebrow: string;
  heading: string;
  description: string;
  features: [AboutInstallationFeature, AboutInstallationFeature, AboutInstallationFeature, AboutInstallationFeature];
}

export interface AboutTeamMember {
  image: { src: string; alt: string };
  name: string;
  role: string;
}

export interface AboutTeamContent {
  badges: Array<{ icon: { src: string; alt: string }; label: string }>;
  members: [AboutTeamMember, AboutTeamMember, AboutTeamMember, AboutTeamMember];
}

export interface AboutPageContent {
  hero: AboutHeroContent;
  mission: AboutMissionContent;
  installation: AboutInstallationContent;
  team: AboutTeamContent;
}

export interface ResourcesArticle {
  image: { src: string; alt: string };
  title: string;
  description: string;
  date: string;
  href: string;
}

export interface ResourcesFeaturedContent {
  badge: string;
  category: string;
  article: ResourcesArticle;
}

export interface ResourcesPageContent {
  heading: string;
  description: string;
  featured: ResourcesFeaturedContent;
  articles: [ResourcesArticle, ResourcesArticle];
}

export interface KnowledgeArticle {
  category: string;
  title: string;
  description: string;
  href: string;
}

export interface KnowledgeBasePageContent {
  heading: string;
  subtitle: string;
  articles: [KnowledgeArticle, KnowledgeArticle, KnowledgeArticle, KnowledgeArticle, KnowledgeArticle, KnowledgeArticle];
}

export type BlogContentBlock =
  | { type: "intro"; paragraphs: string[]; image: { src: string; alt: string } }
  | { type: "heading"; text: string }
  | { type: "text"; paragraphs: string[] }
  | { type: "pullQuote"; text: string }
  | { type: "image"; image: { src: string; alt: string } };

export interface BlogArticlePageContent {
  breadcrumb: string;
  heroImage: { src: string; alt: string };
  heroBadge: string;
  date: string;
  author: {
    name: string;
    avatar: { src: string; alt: string };
  };
  readTime: string;
  title: string;
  blocks: BlogContentBlock[];
}

export interface LegalPageContent {
  heading: string;
  paragraphs: string[];
}

export type KnowledgeContentBlock =
  | { type: "section"; heading: string; paragraphs: string[] }
  | { type: "imageGrid"; images: [{ src: string; alt: string }, { src: string; alt: string }, { src: string; alt: string }] };

export interface KnowledgeArticlePageContent {
  breadcrumb: string;
  heroImage: { src: string; alt: string };
  categoryTag: string;
  date: string;
  readTime: string;
  title: string;
  blocks: KnowledgeContentBlock[];
}

export interface CityServiceCard {
  image: { src: string; alt: string };
  title: string;
  description: string;
  href: string;
}

export interface CityServiceGridContent {
  eyebrow: string;
  headingSegments: Array<{ text: string; emphasis?: boolean }>;
  summary: string;
  cards: [CityServiceCard, CityServiceCard, CityServiceCard, CityServiceCard, CityServiceCard, CityServiceCard];
}

export interface CityConsultationContent {
  eyebrow: string;
  heading: string;
  description: string;
  ctaLabel: string;
}

export interface CityHeroContent {
  breadcrumb: string;
  heading: string;
  subheading: string;
  ctaLabel: string;
  ctaHref: string;
  backgroundImage: { src: string; alt: string };
}

export interface CityPageContent {
  hero: CityHeroContent;
  serviceGrid: CityServiceGridContent;
  consultation: CityConsultationContent;
}

export interface FreeQuoteHeroContent {
  breadcrumb: string;
  heading: string;
  subheading: string;
}

export interface FreeQuoteProcessStep {
  number: string;
  title: string;
  description: string;
}

export interface FreeQuoteProcessContent {
  eyebrow: string;
  headingPrefix: string;
  headingHighlight: string;
  subtitle: string;
  steps: [FreeQuoteProcessStep, FreeQuoteProcessStep, FreeQuoteProcessStep, FreeQuoteProcessStep, FreeQuoteProcessStep];
}

export interface FreeQuoteProcessIntroContent {
  eyebrow: string;
  headingPrefix: string;
  headingHighlight: string;
  description: string;
  image: { src: string; alt: string };
}

export interface FreeQuoteFormContent {
  eyebrow: string;
  headingPrefix: string;
  headingHighlight: string;
  subtitle: string;
  nameLabel: string;
  namePlaceholder: string;
  emailLabel: string;
  emailPlaceholder: string;
  phoneLabel: string;
  phonePlaceholder: string;
  serviceLabel: string;
  servicePlaceholder: string;
  serviceOptions: string[];
  projectLabel: string;
  projectPlaceholder: string;
  submitLabel: string;
  assistanceHeading: string;
  callLabel: string;
  callNumber: string;
  textLabel: string;
  trustLine: string;
}

export interface FreeQuotePageContent {
  hero: FreeQuoteHeroContent;
  process: FreeQuoteProcessContent;
  processIntro: FreeQuoteProcessIntroContent;
  form: FreeQuoteFormContent;
}

export interface PageContent {
  hero: HeroContent;
  nav: NavContent;
  trustBadges: TrustBadgesContent;
  processIntro: ProcessIntroContent;
  services: ServicesGlimpseContent;
  featuredCategory: FeaturedCategoryContent;
  howItWorks: HowItWorksContent;
  testimonials: TestimonialsContent;
  quoteGallery: QuoteGalleryContent;
  commercial: CommercialContent;
  repairMaintenance: RepairMaintenanceContent;
  locations: LocationsContent;
  quoteForm: QuoteFormContent;
  faq: FaqContent;
  footer: FooterContent;
  servicePage: ServicePageContent;
  serviceBlinds: ServiceInlinePageContent;
  serviceShades: ServiceInlinePageContent;
  serviceShutters: ServiceInlinePageContent;
  serviceDrapery: ServiceInlinePageContent;
  serviceMotorized: ServiceInlinePageContent;
  serviceRepairs: ServiceInlinePageContent;
  subServiceRollerShades: ServiceInlinePageContent;
  subServiceSolarShades: ServiceInlinePageContent;
  subServiceCellularShades: ServiceInlinePageContent;
  subServiceRomanShades: ServiceInlinePageContent;
  subServiceZebraShades: ServiceInlinePageContent;
  subServiceWovenWoodShades: ServiceInlinePageContent;
  commercialPage: CommercialPageContent;
  locationsPage: LocationsPageContent;
  galleryPage: GalleryPageContent;
  aboutPage: AboutPageContent;
  resourcesPage: ResourcesPageContent;
  knowledgeBasePage: KnowledgeBasePageContent;
  legalPage: LegalPageContent;
  blogArticlePage: BlogArticlePageContent;
  knowledgeArticlePage: KnowledgeArticlePageContent;
  cityPage: CityPageContent;
  freeQuotePage: FreeQuotePageContent;
}

export type ServiceContentKey =
  | "serviceBlinds"
  | "serviceShades"
  | "serviceShutters"
  | "serviceDrapery"
  | "serviceMotorized"
  | "serviceRepairs"
  | "subServiceRollerShades"
  | "subServiceSolarShades"
  | "subServiceCellularShades"
  | "subServiceRomanShades"
  | "subServiceZebraShades"
  | "subServiceWovenWoodShades";
