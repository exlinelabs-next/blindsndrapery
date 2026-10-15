import type { PageContent, KnowledgeArticlePageContent, BlogArticlePageContent, ServiceIntroContent } from '@/types/content';

// Shared across every single-service page's new "intro" section (confirmed
// via get_design_context on node 4481:4451/4463) — Figma repeats this exact
// copy verbatim on every service page's own frame (confirmed on both the
// Blinds and Shades sources), so it's a genuine placeholder rather than
// unique per-service content. Kept as one referenced constant instead of
// pasted into all 12 service content keys below.
export const serviceIntroPlaceholder: ServiceIntroContent = {
  eyebrow: 'about',
  headingSegments: [{ text: 'Soft Light Control ' }, { text: 'Without the', emphasis: true }, { text: ' Hardware' }],
  paragraphs: [
    [{ text: 'A blind gives you a slat line and a shutter reads as architecture. A shade does neither, and that is the point. Fabric rolls or folds away and leaves the window essentially clear, which is why window shades Florida homes use tend to end up in rooms where the architecture or the view is doing the work.' }],
    [{ text: 'The trade is that fabric has to be specified properly. Weight determines whether a shade holds a flat line across a wide span or waves in the air conditioning. Opacity determines whether a room is filtered or dark. Get either wrong and you notice daily.' }],
    [{ text: 'We fit shades Broward County wide and out across the state, and the specification changes by elevation rather than by preference.' }],
  ],
  image: {
    // TODO: temporary Figma asset URL, expires ~7 days — export and commit to public/images/services/ before then.
    src: 'https://www.figma.com/api/mcp/asset/e8ce72f9-17a3-4659-85ca-8d8540c72bc3.png',
    alt: 'Dining room with sheer curtains and a chandelier over a set table',
  },
};

export const mockContent: PageContent = {
  hero: {
    heading: 'The Premier Window Covering Company for Modern Blinds & Shades',
    subheading: 'Enhance your South Florida home with elegant blinds and shades now!',
    ctaLabel: 'Book consultation',
    ctaHref: '#quote-form',
    backgroundImage: {
      // Organized by page: images/<page>/<name>, so the public/ folder scales
      // cleanly as more sections/pages get their own assets.
      src: '/images/home/hero_image.webp',
      alt: 'Modern living room with floor-to-ceiling windows fitted with roller blinds, palm trees and a pool visible outside',
    },
  },
  nav: {
    logo: {
      src: '/images/shared/logo.svg',
      alt: 'blindsndrapery logo',
      href: '/',
    },
    servicesLabel: 'Services',
    resourcesLabel: 'Resources',
    servicesDropdown: {
      // Order and per-category images confirmed via get_design_context on
      // 4311:2976 (desktop hover mega-menu) — only Shades has real distinct
      // sub-pages in this app, matching Figma's own example (every other
      // category shows just its image + explore button, no subitem grid).
      categories: [
        {
          label: 'Blinds',
          href: '/services/blinds',
          image: { src: '/images/services/card-blinds.webp', alt: 'Blinds' },
          exploreLabel: 'Explore Blinds',
        },
        {
          label: 'Shades',
          href: '/services/shades',
          image: { src: '/images/services/card-shades.webp', alt: 'Shades' },
          exploreLabel: 'Explore Shades',
          subItems: [
            { label: 'Roller Shades', href: '/services/shades/roller-shades' },
            { label: 'Solar Shades', href: '/services/shades/solar-shades' },
            { label: 'Cellular Shades', href: '/services/shades/cellular-shades' },
            { label: 'Roman Shades', href: '/services/shades/roman-shades' },
            { label: 'Woven Shades', href: '/services/shades/woven-wood-shades' },
          ],
        },
        {
          label: 'Shutters',
          href: '/services/shutters',
          image: { src: '/images/services/card-shutters.webp', alt: 'Shutters' },
          exploreLabel: 'Explore Shutters',
        },
        {
          label: 'Curtains & Drapery',
          href: '/services/drapery',
          image: { src: '/images/services/card-drapery.webp', alt: 'Curtains & Drapery' },
          exploreLabel: 'Explore Curtains & Drapery',
        },
        {
          label: 'Motorized & Smart Home',
          href: '/services/motorized',
          image: { src: '/images/services/card-motorized.webp', alt: 'Motorized & Smart Home' },
          exploreLabel: 'Explore Smart Homes',
        },
        {
          label: 'Repairs & Maintenance',
          href: '/services/repairs',
          image: { src: '/images/services/card-repairs.webp', alt: 'Repairs & Maintenance' },
          exploreLabel: 'Explore Repairs',
        },
      ],
      blogCard: {
        image: {
          src: '/images/home/hero_image.webp',
          alt: 'Living room with modern window treatments',
        },
        title: 'Protect Your Florida Home from UV Damage',
        description: 'Florida sunshine is one of the reasons people love living in the state. Bright natural light can make a home feel...',
        buttonLabel: 'Explore Blogs',
        buttonHref: '/resources',
      },
      socialLinks: [
        { platform: 'instagram', href: 'https://www.instagram.com', label: 'Instagram' },
        { platform: 'facebook', href: 'https://www.facebook.com', label: 'Facebook' },
        { platform: 'youtube', href: 'https://www.youtube.com', label: 'YouTube' },
        { platform: 'linkedin', href: 'https://www.linkedin.com', label: 'LinkedIn' },
      ],
      // Copy and placeholder phone number preserved verbatim from Figma
      // (node 4311:2976) — the design itself uses "(800) XXX-XXXX" as an
      // unfilled placeholder, so it's reproduced as plain text rather than
      // a tel: link.
      helpBar: {
        prefix: 'Need help measuring?',
        ctaLabel: 'Book Free Consultation',
        ctaHref: '#quote-form',
        phoneLabel: 'Call Us: (800) XXX-XXXX',
      },
    },
    // Fixed copy/images matching Figma's "Expanded Mega menu" (node
    // 4902:3378) — Resources has no child menu items in WP, unlike Services.
    resourcesDropdown: {
      blogsCard: {
        image: {
          src: '/images/home/hero_image.webp',
          alt: 'Living room with palm trees visible through floor-to-ceiling windows',
        },
        title: 'Blogs',
        description: 'Explore our latest insights and expert tips on home care, design trends, and lifestyle enhancements. ',
        href: '/resources',
      },
      knowledgeBaseCard: {
        image: {
          src: '/images/resources/knowledge-hero.webp',
          alt: 'Poolside patio surrounded by tropical landscaping',
        },
        title: 'Knowledge Base',
        description: 'Dive into detailed guides, how-tos, and expert advice to help you master home maintenance, design innovations, and everyday living improvements.',
        href: '/knowledge-base',
      },
    },
    links: [
      { label: 'Commercial', href: '/commercial' },
      { label: 'Locations', href: '/locations' },
      { label: 'Gallery', href: '/gallery' },
      { label: 'About', href: '/about' },
    ],
    ctaLabel: 'Request a Free Quote',
    ctaHref: '#quote-form',
  },
  trustBadges: {
    items: [
      { icon: null, label: 'Google Reviews ★★★★★' },
      { icon: '/images/shared/icons/shield-cog-corner.svg', label: 'BBB A+ Accredited' },
      { icon: '/images/shared/icons/gavel.svg', label: 'Licensed & Insured' },
      { icon: '/images/shared/icons/timer-reset.svg', label: '10+ Years in Business' },
      { icon: '/images/shared/icons/badge-check.svg', label: 'Manufacturer Guarantee' },
    ],
  },
  processIntro: {
    eyebrow: 'PROCESS INTRODUCTION',
    headingSegments: [{ text: 'Free in home consultation, Precise measurement, ' }, { text: 'Custom Fabrication. Professional Installation.', emphasis: true }],
    description:
      [[{ text: 'Start with a free in-home consultation, followed by precise measurements. Next, we craft your custom blinds with care, and finally, our expert team handles the flawless installation.' }]],
    video: {
      poster: {
        src: '/images/home/process-poster.jpg',
        alt: 'Technician installing white venetian blinds on a large double window',
      },
    },
  },
  services: {
    eyebrow: 'SERVICES GLIMPSE',
    headingSegments: [
      { text: 'Discover the ' },
      { text: 'Best', emphasis: true },
      { text: ' in Modern' },
      { text: ' Window Blinds & Shades', emphasis: true },
    ],
    servicesSummary:
      [[{ text: 'Blinds · Shades · Drapery & Curtains · Shutters · Motorized Systems & Smart Home Integration · Repairs & Maintenance' }]],
    ctaLabel: 'View Details',
    cards: [
      {
        image: {
          src: '/images/services/card-blinds.webp',
          alt: 'Living room windows fitted with wood blinds',
        },
        title: 'Blinds',
        description: 'Versatile light control with timeless wood, faux wood, and aluminum configurations.',
        href: '/services/blinds',
      },
      {
        image: {
          src: '/images/services/card-shutters.webp',
          alt: 'Bedroom window fitted with interior shutters',
        },
        title: 'Shutters',
        description: 'Permanent architectural window furniture built for durability and South Florida humidity.',
        href: '/services/shutters',
      },
      {
        image: {
          src: '/images/services/card-shades.webp',
          alt: 'Floor-to-ceiling windows fitted with roller shades',
        },
        title: 'Shades',
        description: 'Engineered for privacy and energy efficiency with roller, solar, and cellular options.',
        href: '/services/shades',
      },
      {
        image: {
          src: '/images/services/card-motorized.webp',
          alt: 'Wall-mounted smart home thermostat control panel',
        },
        title: 'Motorized & Smart Home',
        description: 'Automated systems compatible with Alexa, Google Home, and professional control systems.',
        href: '/services/motorized',
      },
      {
        image: {
          src: '/images/services/card-drapery.webp',
          alt: 'Living room with floor-length drapery curtains',
        },
        title: 'Drapery & Curtains',
        description: 'Custom-tailored fabrics providing architectural scale and acoustic dampening.',
        href: '/services/drapery',
      },
      {
        image: {
          src: '/images/services/card-repairs.webp',
          alt: 'Technician performing window covering repair and maintenance',
        },
        title: 'Repairs & Maintenance',
        description: 'Keep your investments functioning perfectly with our expert repair and tune-up services.',
        href: '/services/repairs',
      },
    ],
  },
  featuredCategory: {
    eyebrow: 'INTERIOR SHUTTERS',
    headingPrefix: 'Custom ',
    headingHighlight: 'Interior Shutters',
    headingSuffix: ' for Any Space',
    paragraphs: [
      [{ text: 'Elevate your home with our custom interior shutters, designed to fit any room perfectly. Crafted from premium materials, these shutters provide both style and functionality, enhancing your living space with timeless elegance.' }],
      [{ text: 'Our expert team ensures precise measurements and flawless installation, delivering shutters that complement your décor and offer excellent light control and privacy. Discover the perfect shutters to transform your home today.' }],
    ],
    image: {
      // TODO: temporary Figma asset URL, expires ~7 days — export and commit to public/images/home/shutters/ before then.
      src: 'https://www.figma.com/api/mcp/asset/758ac310-96a9-4208-80ed-0049e29039ab.png',
      alt: 'Elegant white interior shutters framing a sunlit window in a cozy living room with neutral furnishings',
    },
    cta: { label: 'Explore Shutters', href: '/services/shutters' },
  },
  howItWorks: {
    eyebrow: 'process',
    headingSegments: [{ text: 'How We ' }, { text: 'Work', emphasis: true }],
    description:
      [[{ text: 'Elevate your home with our custom interior shutters, designed to fit any room perfectly. Crafted from premium materials, these shutters provide both style and functionality, enhancing your living space with timeless elegance.' }]],
    steps: [
      {
        stepLabel: 'STEP 1',
        icon: 'Ruler',
        title: 'Free in home consultation',
        description: 'In-Home Measurement by our local Broward County installer',
      },
      {
        stepLabel: 'STEP 4',
        icon: 'Ruler',
        title: 'Precise measurement',
        description: 'Instant pricing based on your preliminary dimensions.',
      },
      {
        stepLabel: 'STEP 2',
        icon: 'Ruler',
        title: 'Custom Fabrication',
        description: 'Instant pricing based on your preliminary dimensions.',
      },
      {
        stepLabel: 'STEP 3',
        icon: 'Ruler',
        title: 'Professional Installation',
        description: 'Instant pricing based on your preliminary dimensions.',
      },
    ],
    ctaLabel: 'Book consultation',
    ctaHref: '#quote-form',
  },
  testimonials: {
    eyebrow: 'Why Customers Choose Us',
    headingSegments: [{ text: 'Trusted Experts, Proven ' }, { text: 'Customer Satisfaction', emphasis: true }],
    description:
      [[{ text: '“Every installer on our team is a full-time employee, never subcontracted. This ensures you receive consistent, top-tier craftsmanship along with a secure and professional installation experience in your home, backed by our commitment to quality and safety.”' }]],
    // Four distinct real testimonials (matching the live `testimonials` CPT
    // query), not the single placeholder repeated — confirmed via
    // get_design_context on node 3309:2232, which shows four different
    // quote/author pairs, alternating quote-on-top vs author-on-top per card.
    testimonials: [
      {
        quote:
          'Living in Miami, the sun is relentless — but since getting our window treatments installed, our home stays cool and our furniture is finally protected. The design consultation was so helpful, and the end result looks absolutely stunning.',
        authorName: 'Riya Shankar',
        authorLocation: 'Miami',
        avatar: {
          // Figma temp asset URL expired (404) and was replaced with a local placeholder;
          // swap in the real exported portrait when available.
          src: '/images/home/testimonials/avatar-placeholder.png',
          alt: 'Portrait of Riya Shankar, a Miami customer',
        },
      },
      {
        quote:
          'Exceptional service from start to finish! The team was punctual, professional, and the custom blinds they installed have beautifully transformed my living room. I highly recommend them for anyone seeking quality and style.',
        authorName: 'Maria Gonzalez',
        authorLocation: 'Miami, FL',
        avatar: {
          src: '/images/home/testimonials/avatar-placeholder.png',
          alt: 'Portrait of Maria Gonzalez, a Miami, FL customer',
        },
      },
      {
        quote:
          "Outstanding experience from beginning to end! The crew arrived on time, worked with professionalism, and the custom blinds they installed have completely refreshed my living room's ambiance.",
        authorName: 'James Williams',
        authorLocation: 'Tampa, FL',
        avatar: {
          src: '/images/home/testimonials/avatar-placeholder.png',
          alt: 'Portrait of James Williams, a Tampa, FL customer',
        },
      },
      {
        quote:
          'After renovating our Naples beach house, the team recommended perfect motorized shutters. They block out the afternoon heat, and I can control them from my phone. Absolutely love them!',
        authorName: 'Linda Chen',
        authorLocation: 'Naples, FL',
        avatar: {
          src: '/images/home/testimonials/avatar-placeholder.png',
          alt: 'Portrait of Linda Chen, a Naples, FL customer',
        },
      },
    ],
  },
  quoteGallery: {
    quote:
      [[{ text: '“Every installer on our team is a full-time employee, never subcontracted. This ensures you receive consistent, top-tier craftsmanship along with a secure and professional installation experience in your home, backed by our commitment to quality and safety.”' }]],
    quoteIcon: {
      // TODO: temporary Figma asset URL — re-exported 2026-08-13, these can expire faster than the
      // nominal ~7 days, so export and commit to public/images/home/gallery/ soon.
      src: '/images/shared/icons/footer-icon-1.svg',
      alt: '',
    },
    images: [
      {
        // TODO: temporary Figma asset URL — re-exported 2026-08-13, these can expire faster than the
        // nominal ~7 days, so export and commit to public/images/home/gallery/ soon.
        src: 'https://www.figma.com/api/mcp/asset/8a9fbee6-3a97-483d-ba14-35e587ed0123.png',
        alt: 'Two installers measuring and fitting a sliding glass door track in a South Florida home',
      },
      {
        // TODO: temporary Figma asset URL — re-exported 2026-08-13, these can expire faster than the
        // nominal ~7 days, so export and commit to public/images/home/gallery/ soon.
        src: 'https://www.figma.com/api/mcp/asset/3d496cbf-72dc-4cc9-bd73-635fb02f7ade.png',
        alt: 'Installer using a drill to mount a roller shade bracket above a large window while a colleague holds the shade fabric',
      },
      {
        // TODO: temporary Figma asset URL — re-exported 2026-08-13, these can expire faster than the
        // nominal ~7 days, so export and commit to public/images/home/gallery/ soon.
        src: 'https://www.figma.com/api/mcp/asset/6b54a780-82bf-451e-8c6c-f4a48ea78f7b.png',
        alt: 'Installer showing a smiling homeowner a cellular shade at her living room window',
      },
      {
        // TODO: temporary Figma asset URL — re-exported 2026-08-13, these can expire faster than the
        // nominal ~7 days, so export and commit to public/images/home/gallery/ soon.
        src: 'https://www.figma.com/api/mcp/asset/b932c54a-333b-45ac-a5b1-b2feff686dc6.png',
        alt: 'The full team of full-time installers standing together in a driveway in front of a company van',
      },
    ],
  },
  commercial: {
    eyebrow: 'COMMERCIAL',
    heading: 'Commercial Window Treatments & Office Solutions',
    subheading: 'Need a solution for a commercial space?',
    body: [[{ text: 'Need a solution for a commercial space? We provide heavy-duty, automated, and energy-efficient window coverings for offices, restaurants, and residential complexes across South Florida.' }]],
    ctaLabel: 'Browse our commercial solutions',
    ctaHref: '/commercial',
    image: {
      // TODO: temporary Figma asset URL, expires ~7 days — export and commit to public/images/home/commercial/ before then.
      src: 'https://www.figma.com/api/mcp/asset/93027c12-c2f3-4489-a1ab-ab4c2efc22a0.png',
      alt: 'Hotel corridor with warm lighting, patterned carpet, and two people walking past guest room doors',
    },
  },
  repairMaintenance: {
    eyebrow: 'REPAIR & MAINTENANCE',
    icon: 'Wrench',
    headingPrefix: 'Professional ',
    headingHighlight: 'Blind & Shade Repair',
    headingSuffix: ' Services',
    description:
      [[{ text: 'Our technical team provides professional repair services for all major brands and motorized systems. From cord replacements to motor recalibration, we ensure your window treatments operate with factory-level precision.' }]],
  },
  locations: {
    eyebrow: 'LOCATIONS',
    heading: 'We bring everything to you',
    description: [[{ text: 'Serving Broward County and South Florida with mobile showrooms.' }]],
    cities: [
      {
        // TODO: temporary Figma asset URL — re-exported 2026-08-13, these can expire faster than the
        // nominal ~7 days, so export and commit to public/images/home/locations/ soon.
        icon: { src: '/images/shared/icons/footer-icon-2.svg', alt: '' },
        name: 'Fort Lauderdale',
      },
      {
        // TODO: temporary Figma asset URL — re-exported 2026-08-13, these can expire faster than the
        // nominal ~7 days, so export and commit to public/images/home/locations/ soon.
        icon: { src: '/images/shared/icons/footer-icon-3.svg', alt: '' },
        name: 'Coral Springs',
      },
      {
        // TODO: temporary Figma asset URL — re-exported 2026-08-13, these can expire faster than the
        // nominal ~7 days, so export and commit to public/images/home/locations/ soon.
        icon: { src: '/images/shared/icons/footer-icon-4.svg', alt: '' },
        name: 'Deerfield Beach',
      },
    ],
  },
  quoteForm: {
    eyebrow: 'Quote form',
    heading: 'Get Your Free Quote',
    description:
      [[{ text: 'Complete the form below and one of our experts will follow up to schedule your free in-home consultation. No pressure, just professional advice to help you plan.' }]],
    nameLabel: 'Name',
    namePlaceholder: 'John Doe',
    emailLabel: 'Email',
    emailPlaceholder: 'john@example.com',
    phoneLabel: 'Phone',
    phonePlaceholder: '+ (954) 555-1234',
    serviceLabel: 'Service Interest',
    servicePlaceholder: 'Select a category',
    serviceOptions: [
      'Blinds',
      'Shades',
      'Curtains & Drapery',
      'Shutters',
      'Motorized Systems & Smart Home',
      'Repairs & Maintenance',
    ],
    projectLabel: 'Tell us about your Project',
    projectPlaceholder: 'Tell us about your project....',
    submitLabel: 'Request My Free Quote',
    successMessage: "Thanks! We've received your request and one of our experts will follow up shortly to schedule your free consultation.",
  },
  faq: {
    eyebrow: 'FAQ',
    heading: 'Frequently Asked Questions',
    categories: ['Common Questions', 'Locations', 'Our Process', 'Timeline'],
    items: [
      {
        category: 'Common Questions',
        question: 'How long does a custom installation take?',
        answer:
          [[{ text: 'Most custom blinds and shades installations are completed in a single visit, typically 2 to 4 hours depending on the number of windows.' }]],
      },
      {
        category: 'Common Questions',
        question: 'Do you offer smart home integration for motorized shades?',
        answer:
          [[{ text: 'Yes, our motorized shades integrate with popular smart home systems like Google Home, Amazon Alexa, and Lutron for seamless voice and app control.' }]],
      },
      {
        category: 'Common Questions',
        question: 'Are your shutters humidity resistant for Florida homes?',
        answer:
          [[{ text: "Yes, our shutters are built with moisture-resistant materials specifically selected to withstand South Florida's humidity and coastal climate." }]],
      },
      {
        category: 'Common Questions',
        question: 'Do you provide warranties on your products?',
        answer:
          [[{ text: 'Yes, all of our products are backed by manufacturer warranties, and our installation work is covered by our own workmanship guarantee.' }]],
      },
      {
        category: 'Common Questions',
        question: 'Can you repair motorized blinds from other companies?',
        answer:
          [[{ text: "Yes, our technicians repair and service motorized blinds and shades from most major manufacturers, not just the products we originally installed." }]],
      },
      {
        category: 'Common Questions',
        question: 'What types of window coverings do you offer?',
        answer:
          [[{ text: 'We offer a full range including blinds, shades, shutters, drapery and curtains, and motorized smart home solutions, all custom-made to fit your windows perfectly.' }]],
      },
      {
        category: 'Locations',
        question: 'Which areas in South Florida do you serve?',
        answer:
          [[{ text: 'We serve all of South Florida including Fort Lauderdale, Coral Springs, Deerfield Beach, Boca Raton, Pompano Beach, and surrounding Broward County communities.' }]],
      },
      {
        category: 'Locations',
        question: 'Do you offer services outside of Broward County?',
        answer:
          [[{ text: 'Our primary service area is Broward County, but we also serve parts of Palm Beach and Miami-Dade counties. Contact us to confirm availability in your area.' }]],
      },
      {
        category: 'Locations',
        question: 'Is there an additional charge for distant locations?',
        answer:
          [[{ text: 'There is no additional charge for locations within our standard service area. For locations outside our primary zone, a small travel fee may apply — we will let you know upfront.' }]],
      },
      {
        category: 'Locations',
        question: 'Can I visit a showroom to see products in person?',
        answer:
          [[{ text: 'We operate primarily as an in-home consultation service, bringing samples directly to you so you can see how materials look in your own space with your lighting.' }]],
      },
      {
        category: 'Our Process',
        question: 'What happens during the in-home consultation?',
        answer:
          [[{ text: 'A professional visits your home to measure your windows in person, bring product samples, and talk through your options — so your written quote is based on exact measurements, not estimates.' }]],
      },
      {
        category: 'Our Process',
        question: 'How do I get started with a consultation?',
        answer:
          [[{ text: 'Simply fill out our online quote form or call us to schedule a free in-home consultation. Our specialist will visit your home with samples to help you choose the perfect window coverings.' }]],
      },
      {
        category: 'Our Process',
        question: 'How long does the entire process take from estimate to installation?',
        answer:
          [[{ text: 'The typical timeline from your initial consultation to completed installation is 2 to 4 weeks, depending on the product type and any custom manufacturing requirements.' }]],
      },
      {
        category: 'Our Process',
        question: 'Do I need to be home during the installation?',
        answer:
          [[{ text: 'Yes, an adult (18+) must be present during installation to grant access, confirm placement preferences, and sign off on the completed work.' }]],
      },
      {
        category: 'Timeline',
        question: 'How quickly will I hear back after I submit an enquiry?',
        answer:
          [[{ text: 'We aim to contact you within 24 hours of submitting the form to schedule your free in-home consultation.' }]],
      },
      {
        category: 'Timeline',
        question: 'How long does manufacturing take for custom orders?',
        answer:
          [[{ text: 'Custom manufacturing typically takes 1 to 3 weeks depending on the product type, materials selected, and current production schedules.' }]],
      },
      {
        category: 'Timeline',
        question: 'Can I expedite my order if I need it sooner?',
        answer:
          [[{ text: 'Rush options are available for select products at an additional cost. Let your consultant know your timeline and we will do our best to accommodate your needs.' }]],
      },
      {
        category: 'Timeline',
        question: 'What happens if my installation needs to be rescheduled?',
        answer:
          [[{ text: 'We understand schedules change. You can reschedule your installation with at least 48 hours notice at no additional charge by contacting our team.' }]],
      },
    ],
  },
  footer: {
    logo: {
      src: '/images/shared/logo.svg',
      alt: 'blindsndrapery',
      href: '/',
    },
    badges: [
      {
        // TODO: temporary Figma asset URL, expires ~7 days — export and commit to public/images/shared/ before then.
        src: 'https://www.figma.com/api/mcp/asset/2bf21edb-bec4-4d6d-9838-cf7707e8a433.png',
        alt: 'BBB Accredited Business A+ rating badge',
        aspectRatio: '269/187',
      },
      {
        // TODO: temporary Figma asset URL, expires ~7 days — export and commit to public/images/shared/ before then.
        src: 'https://www.figma.com/api/mcp/asset/dfc5a07c-b6a3-4f08-9968-3196022150e0.png',
        alt: 'Google Reviews five-star rating badge',
        aspectRatio: '142/80',
      },
    ],
    description: 'Custom window coverings, measured and fitted across Florida.',
    columns: [
      {
        title: 'Explore',
        links: [
          { label: 'Commercial', href: '/commercial' },
          { label: 'Company', href: '/about' },
          { label: 'Legal', href: '/privacy-policy' },
          { label: 'Locations', href: '/locations' },
        ],
      },
      {
        title: 'Services',
        showChevron: true,
        links: [
          { label: 'Blinds', href: '/services/blinds' },
          { label: 'Shades', href: '/services/shades' },
          { label: 'Curtains & Drapery', href: '/services/drapery' },
          { label: 'Shutters', href: '/services/shutters' },
          { label: 'Motorized & Smart Homes', href: '/services/motorized' },
          { label: 'Repairs & Maintenance', href: '/services/repairs' },
        ],
      },
      {
        title: 'Inspiration',
        links: [
          { label: 'Gallery', href: '/gallery' },
          { label: 'Blogs', href: '/resources' },
          { label: 'Knowledge Base', href: '/knowledge-base' },
        ],
      },
      {
        title: 'Contact',
        links: [
          { label: 'Areas We Serve', href: '/locations' },
          { label: 'FAQ', href: '/faq' },
        ],
      },
    ],
    contact: {
      servingAreaText: 'Serving Broward County and Florida statewide',
      phone: '424-777-2140',
      email: 'info@blindsndrapery.com',
      cta: { label: 'Request a Free Quote', href: '/free-quote' },
    },
    trustHighlights: ['Licensed & Insured', '10+ Years in Business', 'Manufacturer Guarantee'],
    copyright: '© 2026 Blinds & Drapery Co. All rights reserved',
    legalLinks: [
      { label: 'Terms of Use', href: '/terms' },
      { label: 'Privacy Policy', href: '/privacy-policy' },
    ],
    socialLinks: [
      { platform: 'instagram', href: 'https://www.instagram.com', label: 'Instagram' },
      { platform: 'facebook', href: 'https://www.facebook.com', label: 'Facebook' },
      { platform: 'youtube', href: 'https://www.youtube.com', label: 'YouTube' },
      { platform: 'linkedin', href: 'https://www.linkedin.com', label: 'LinkedIn' },
    ],
  },
  servicePage: {
    heroBreadcrumb: 'HOME > SERVICES',
    howItWorks: {
      eyebrow: 'HOW IT WORKS',
      headingPrefix: 'Professional ',
      headingHighlight: 'Window Blind Installation',
      headingSuffix: ' in Florida',
      // Note: the Figma source reuses the About-Shutters intro paragraph
      // here verbatim (a copy-paste leftover, not this section's own
      // copy) — kept as-is per the project's rule of preserving the
      // design's own content faithfully rather than silently rewriting it.
      description:
        [[{ text: 'Elevate your home with our custom interior shutters, designed to fit any room perfectly. Crafted from premium materials, these shutters provide both style and functionality, enhancing your living space with timeless elegance.' }]],
      // Note: all 4 steps share identical body copy in the Figma source
      // (a placeholder repeated verbatim, not a per-step description) —
      // same "preserve the design's own content" call as HowWeWork's
      // repeated step copy on the homepage.
      steps: [
        {
          number: '01',
          title: 'Request your free quote online.',
          description:
            'Submit your details and project through our simple online form. No pressure, no obligation — just the information our team needs to schedule your free in-home consultation.',
          image: {
            src: '/images/services/step-1.webp',
            alt: 'Customer submitting a free quote request online',
          },
        },
        {
          number: '02',
          title: 'Broward County and South Florida installers conduct precise in-home measurement.',
          description:
            'A specialist visits your home with samples in hand, taking exact measurements and walking you through material and style options in person.',
          image: {
            src: '/images/services/step-2.webp',
            alt: 'Installer taking precise window measurements in a home',
          },
        },
        {
          number: '03',
          title: 'Custom fabrication.',
          description:
            'Your blinds are fabricated to the exact measurements taken in your home, in the material, color, and style you selected during your consultation.',
          image: {
            src: '/images/services/step-3.webp',
            alt: 'Custom blinds being fabricated in a workshop',
          },
        },
        {
          number: '04',
          title: 'Professional final installation.',
          description:
            'A professional installer mounts your finished blinds and confirms everything operates smoothly before the job is complete.',
          image: {
            src: '/images/services/step-4.webp',
            alt: 'Installer mounting finished blinds on a window',
          },
        },
      ],
    },
    about: {
      eyebrow: 'ABOUT SHUTTERS',
      headingPrefix: 'Durable ',
      headingHighlight: 'Shutters & Professional Window',
      headingSuffix: ' Treatments',
      paragraph:
        [[{ text: "Explore our durable shutters crafted from premium composite and natural wood, designed to withstand Florida's humid climate. Choose from classic tier-on-tier styles that offer versatile light control and privacy, combining timeless elegance with lasting performance." }]],
      image: {
        src: '/images/services/about-shutters.webp',
        alt: 'Living room with white interior shutters covering large windows',
      },
      cta: { label: 'Explore Shutters', href: '/services/shutters' },
    },
  },
  serviceBlinds: {
    hero: {
      // Preserved verbatim from Figma, including the odd lowercase "inline
      // service" trailing segment — a placeholder crumb, not a real label,
      // same "keep the design's own content faithfully" rule as elsewhere.
      breadcrumb: 'HOME > SERVICES > inline service',
      heading: 'Modern Window Blinds & Professional Installation Services',
      subheading: 'Free in-home consultation, precise measurement, and professional installation — for any Florida city.',
      backgroundImage: {
        // TODO: temporary Figma asset URL, expires ~7 days — export and commit to public/images/services/blinds/ before then.
        src: 'https://www.figma.com/api/mcp/asset/a8477728-5aec-45ac-8a20-3975d4727cd8.png',
        alt: 'Two installers fitting roller shades on large windows in a bright, plant-filled living room',
      },
    },
    intro: serviceIntroPlaceholder,
    about: {
      // Note: the tablet/mobile Figma frames used as the structural/layout
      // reference for this page (Tablet & Mobile "Service Inline 1" — see
      // ServiceInlineHero.tsx etc.) show this eyebrow as "SOCIAL PROOF
      // BLOCK" instead of "ABOUT". That's Inline 1's own (different service)
      // content, not this page's — Desktop "Service Inline 2" (this page's
      // actual confirmed source, node 2721:1622) says "ABOUT", so that's
      // what's used here; only layout/spacing values were borrowed from the
      // Inline 1 responsive frames, never their copy.
      eyebrow: 'ABOUT',
      headingPrefix: 'Engineered Faux ',
      headingHighlight: 'Wood, Aluminum, and Vertical',
      headingSuffix: ' Blinds',
      paragraphs: [{ prefix: 'Our window treatments are engineered specifically for the demands of the ', highlight: 'Broward County & South Florida', suffix: ' environment. We prioritize high-performance, moisture-resistant materials like engineered faux-wood and marine-grade aluminum that withstand coastal humidity without warping or fading.' }],
      features: [
        { title: 'Moisture Resistant', description: 'Holds its shape and finish in bathrooms, kitchens, and coastal humidity without warping.' },
        { title: 'Waterproof', description: 'Engineered materials that won\'t swell, blister, or degrade from direct water contact.' },
        { title: 'Light', description: 'Slim slats and lightweight construction make for smooth, effortless operation.' },
        { title: 'UV Resistant', description: 'Finishes are formulated to resist fading under direct Florida sun.' },
      ],
      gallery: [
        {
          // TODO: temporary Figma asset URL, expires ~7 days — export and commit to public/images/services/blinds/ before then.
          src: 'https://www.figma.com/api/mcp/asset/d373d392-f595-4771-b699-e26901610eb6.png',
          alt: 'Close-up of engineered faux-wood blind slats catching natural light',
        },
        {
          // TODO: temporary Figma asset URL, expires ~7 days — export and commit to public/images/services/blinds/ before then.
          src: 'https://www.figma.com/api/mcp/asset/100854a9-8821-4f9a-a416-3a0e2bfc6106.png',
          alt: 'Wood shutters fitted along a hallway window with warm afternoon light',
        },
        {
          // TODO: temporary Figma asset URL, expires ~7 days — export and commit to public/images/services/blinds/ before then.
          src: 'https://www.figma.com/api/mcp/asset/13db3a87-6dd7-4c05-bd13-1ae5e9c79eca.png',
          alt: 'Floor-to-ceiling shutters in a bright living room with a sofa and dining table',
        },
      ],
    },
    howItWorksHeader: {
      eyebrow: 'PROCESS',
      headingSegments: [{ text: 'How It ' }, { text: 'Works', emphasis: true }],
      subtitle: [[{ text: 'Blinds · Shades · Drapery & Curtains · Shutters · Motorized Systems & Smart Home Integration · Repairs & Maintenance' }]],
    },
    timeline: {
      images: [
        {
          src: '/images/services/blinds/timeline-photo-1.webp',
          alt: 'Installer showing a client blind options on a tablet in a bright hallway',
        },
        {
          src: '/images/services/blinds/timeline-photo-2.webp',
          alt: 'Installer discussing window treatment options with a homeowner',
        },
      ],
      steps: [
        {
          number: '1',
          title: 'In-Home Measurement',
          description: 'We visit your home to discuss your vision and explore materials tailored to your space.',
        },
        {
          number: '2',
          title: 'Custom Fabrication',
          description: 'We visit your home to discuss your vision and explore materials tailored to your space.',
        },
        {
          number: '3',
          title: 'Professional Installation',
          description: 'We visit your home to discuss your vision and explore materials tailored to your space.',
        },
        {
          number: '4',
          title: 'Aftercare & Warranty Support',
          description: 'We visit your home to discuss your vision and explore materials tailored to your space.',
        },
      ],
    },
    cta: {
      eyebrow: 'BOOK CONSULTATION',
      heading: 'Arrange Your Consultation Appointment',
      // Verbatim match of `commercial.body` in the Figma source — kept
      // as-is rather than rewritten, same "preserve the design's own
      // content faithfully" rule as elsewhere in this file.
      body: [[{ text: 'Need a solution for a commercial space? We provide heavy-duty, automated, and energy-efficient window coverings for offices, restaurants, and residential complexes across South Florida.' }]],
      ctaLabel: 'Book consultation',
      ctaHref: '#quote-form',
      image: {
        // TODO: temporary Figma asset URL, expires ~7 days — export and commit to public/images/services/blinds/ before then.
        src: 'https://www.figma.com/api/mcp/asset/eb69fb8f-4ca3-419b-8ec5-91235dd12411.png',
        alt: 'Person relaxing on a sofa near large windows in a softly lit living room',
      },
    },
  },
  serviceShades: {
    hero: {
      breadcrumb: 'HOME > SERVICES > Shades',
      heading: 'Premium Window Shades & Professional Installation Services',
      subheading: 'Free in-home consultation, precise measurement, and professional installation — for any Florida city.',
      backgroundImage: {
        src: '/images/services/card-shades.webp',
        alt: 'Floor-to-ceiling windows fitted with modern roller shades in a contemporary living room',
      },
    },
    intro: serviceIntroPlaceholder,
    subServices: {
      eyebrow: 'SHADES CATEGORIES',
      headingPrefix: 'Explore ',
      headingHighlight: 'Premium Shades',
      headingSuffix: ' for Every Room and Style',
      description:
        [[{ text: 'From light-filtering solar shades to blackout-ready cellular and roller options, find the right fit for every window in your South Florida home.' }]],
      cards: [
        {
          image: { src: '/images/services/card-shades.webp', alt: 'Living room with solar shades filtering sunlight' },
          title: 'Solar Shades',
          description: 'Versatile light control with timeless wood, faux wood, and aluminum configurations.',
          href: '/services/shades/solar-shades',
        },
        {
          image: { src: '/images/services/card-shades.webp', alt: 'Bedroom window with roller shades' },
          title: 'Roller Shades',
          description: 'Versatile light control with timeless wood, faux wood, and aluminum configurations.',
          href: '/services/shades/roller-shades',
        },
        {
          image: { src: '/images/services/card-shades.webp', alt: 'Kitchen window with cellular shades' },
          title: 'Cellular Shades',
          description: 'Versatile light control with timeless wood, faux wood, and aluminum configurations.',
          href: '/services/shades/cellular-shades',
        },
        {
          image: { src: '/images/services/card-shades.webp', alt: 'Office with roman shades on large windows' },
          title: 'Roman Shades',
          description: 'Versatile light control with timeless wood, faux wood, and aluminum configurations.',
          href: '/services/shades/roman-shades',
        },
        {
          image: { src: '/images/services/card-shades.webp', alt: 'Living room with zebra shades providing partial privacy' },
          title: 'Zebra Shades',
          description: 'Versatile light control with timeless wood, faux wood, and aluminum configurations.',
          href: '/services/shades/zebra-shades',
        },
        {
          image: { src: '/images/services/card-shades.webp', alt: 'Modern room with woven wood shades' },
          title: 'Woven Wood Shades',
          description: 'Versatile light control with timeless wood, faux wood, and aluminum configurations.',
          href: '/services/shades/woven-wood-shades',
        },
      ],
    },
    about: {
      eyebrow: 'ABOUT',
      headingPrefix: 'Engineered Faux ',
      headingHighlight: 'Wood, Aluminum, and Vertical',
      headingSuffix: ' Blinds',
      paragraphs: [{ prefix: 'Our window treatments are engineered specifically for the demands of the ', highlight: 'Broward County & South Florida', suffix: ' environment. We prioritize high-performance, moisture-resistant materials like engineered faux-wood and marine-grade aluminum that withstand coastal humidity without warping or fading.' }],
      features: [
        { title: 'Moisture Resistant', description: 'Fabric and hardware rated for humid rooms without sagging or mildew.' },
        { title: 'Waterproof', description: 'Suitable for bathrooms and other wet areas where standard fabrics would fail.' },
        { title: 'Light', description: 'Lightweight rollers and fabric keep operation smooth even on wide windows.' },
        { title: 'UV Resistant', description: 'Fabric coatings that block harmful rays without losing color over time.' },
      ],
      gallery: [
        {
          src: 'https://www.figma.com/api/mcp/asset/d373d392-f595-4771-b699-e26901610eb6.png',
          alt: 'Close-up of engineered faux-wood blind slats catching natural light',
        },
        {
          src: 'https://www.figma.com/api/mcp/asset/100854a9-8821-4f9a-a416-3a0e2bfc6106.png',
          alt: 'Wood shutters fitted along a hallway window with warm afternoon light',
        },
        {
          src: 'https://www.figma.com/api/mcp/asset/13db3a87-6dd7-4c05-bd13-1ae5e9c79eca.png',
          alt: 'Floor-to-ceiling shutters in a bright living room with a sofa and dining table',
        },
      ],
    },
    howItWorksHeader: {
      eyebrow: 'PROCESS',
      headingSegments: [{ text: 'How It ' }, { text: 'Works', emphasis: true }],
      subtitle: [[{ text: 'Blinds · Shades · Drapery & Curtains · Shutters · Motorized Systems & Smart Home Integration · Repairs & Maintenance' }]],
    },
    timeline: {
      images: [
        {
          src: '/images/services/blinds/timeline-photo-1.webp',
          alt: 'Installer showing a client shade options on a tablet in a bright hallway',
        },
        {
          src: '/images/services/blinds/timeline-photo-2.webp',
          alt: 'Installer discussing window treatment options with a homeowner',
        },
      ],
      steps: [
        {
          number: '1',
          title: 'Free in home consultation',
          description: 'We visit your home to discuss your vision and explore materials tailored to your space.',
        },
        {
          number: '2',
          title: 'Precise measurement',
          description: 'We visit your home to discuss your vision and explore materials tailored to your space.',
        },
        {
          number: '3',
          title: 'Custom Fabrication',
          description: 'We visit your home to discuss your vision and explore materials tailored to your space.',
        },
        {
          number: '4',
          title: 'Professional Installation',
          description: 'We visit your home to discuss your vision and explore materials tailored to your space.',
        },
      ],
    },
    cta: {
      eyebrow: 'BOOK CONSULTATION',
      heading: 'Arrange Your Consultation Appointment',
      body: [[{ text: 'Need a solution for a commercial space? We provide heavy-duty, automated, and energy-efficient window coverings for offices, restaurants, and residential complexes across South Florida.' }]],
      ctaLabel: 'Book consultation',
      ctaHref: '#quote-form',
      image: {
        src: 'https://www.figma.com/api/mcp/asset/eb69fb8f-4ca3-419b-8ec5-91235dd12411.png',
        alt: 'Person relaxing on a sofa near large windows in a softly lit living room',
      },
    },
  },
  subServiceRollerShades: {
    hero: {
      breadcrumb: 'HOME > SERVICES > SHADES > Roller Shades',
      heading: 'Custom Roller Shades & Professional Installation',
      subheading: 'Sleek, modern roller shades with smooth operation and clean lines for any room in your South Florida home.',
      backgroundImage: { src: '/images/services/card-shades.webp', alt: 'Modern roller shades on a large window' },
    },
    intro: serviceIntroPlaceholder,
    about: {
      eyebrow: 'ABOUT',
      headingPrefix: 'Modern ',
      headingHighlight: 'Roller Shade',
      headingSuffix: ' Solutions',
      paragraphs: [{ prefix: 'Our roller shades combine sleek aesthetics with practical functionality for ', highlight: 'South Florida homes', suffix: '. Available in light-filtering and blackout fabrics, they roll up neatly into a compact cassette for a clean, uncluttered look.' }],
      features: [
        { title: 'Light Filtering', description: 'Diffuses harsh sun into soft, even daylight without losing the view.' },
        { title: 'Blackout Options', description: 'Fully opaque fabrics available for bedrooms and media rooms.' },
        { title: 'Motorized Available', description: 'Upgrade to app or remote-controlled operation on any width.' },
        { title: 'Easy Maintenance', description: 'Smooth-rolling fabric that wipes clean and resists dust buildup.' },
      ],
      gallery: [
        { src: '/images/services/card-shades.webp', alt: 'Roller shades in a living room' },
        { src: '/images/services/card-shades.webp', alt: 'Blackout roller shade in a bedroom' },
        { src: '/images/services/card-shades.webp', alt: 'Motorized roller shade close-up' },
      ],
    },
    howItWorksHeader: {
      eyebrow: 'PROCESS',
      headingSegments: [{ text: 'How It ' }, { text: 'Works', emphasis: true }],
      subtitle: [[{ text: 'Blinds · Shades · Drapery & Curtains · Shutters · Motorized Systems & Smart Home Integration · Repairs & Maintenance' }]],
    },
    timeline: {
      images: [
        { src: '/images/services/blinds/timeline-photo-1.webp', alt: 'Installer showing roller shade fabric samples' },
        { src: '/images/services/blinds/timeline-photo-2.webp', alt: 'Professional mounting roller shades' },
      ],
      steps: [
        { number: '1', title: 'In-Home Consultation', description: 'We visit your home to discuss your vision and explore roller shade options tailored to your space.' },
        { number: '2', title: 'Precise Measurement', description: 'Our specialists take exact measurements for a perfect fit in every window.' },
        { number: '3', title: 'Custom Fabrication', description: 'Your roller shades are crafted with your chosen fabric and operating mechanism.' },
        { number: '4', title: 'Professional Installation', description: 'Our expert installers mount your roller shades for smooth, reliable operation.' },
      ],
    },
    cta: {
      eyebrow: 'BOOK CONSULTATION',
      heading: 'Arrange Your Consultation Appointment',
      body: [[{ text: 'Ready for sleek, modern roller shades? Schedule a free in-home consultation and explore our fabric and color options.' }]],
      ctaLabel: 'Book consultation',
      ctaHref: '#quote-form',
      image: { src: '/images/services/card-shades.webp', alt: 'Room with modern roller shades' },
    },
  },
  subServiceSolarShades: {
    hero: {
      breadcrumb: 'HOME > SERVICES > SHADES > Solar Shades',
      heading: 'Custom Solar Shades & Professional Installation',
      subheading: 'Reduce glare and UV rays while maintaining your view with premium solar shades for South Florida homes.',
      backgroundImage: { src: '/images/services/card-shades.webp', alt: 'Solar shades filtering sunlight in a living room' },
    },
    intro: serviceIntroPlaceholder,
    about: {
      eyebrow: 'ABOUT',
      headingPrefix: 'Premium ',
      headingHighlight: 'Solar Shade',
      headingSuffix: ' Solutions',
      paragraphs: [{ prefix: 'Our solar shades are designed to reduce heat and glare while preserving your view of ', highlight: 'South Florida\'s beautiful outdoors', suffix: '. Choose from a range of openness factors to control how much light and visibility you want, with UV-blocking fabrics that protect your furnishings.' }],
      features: [
        { title: 'UV Protection', description: 'Blocks up to 99% of UV rays while the fabric itself resists fading.' },
        { title: 'Glare Reduction', description: 'Cuts screen and eye glare without shutting out natural light.' },
        { title: 'View Preservation', description: 'See-through weaves keep the outside view intact even when lowered.' },
        { title: 'Energy Efficient', description: 'Reduces solar heat gain, easing the load on air conditioning.' },
      ],
      gallery: [
        { src: '/images/services/card-shades.webp', alt: 'Solar shades on floor-to-ceiling windows' },
        { src: '/images/services/card-shades.webp', alt: 'Solar shades filtering afternoon sun' },
        { src: '/images/services/card-shades.webp', alt: 'Exterior view through solar shades' },
      ],
    },
    howItWorksHeader: {
      eyebrow: 'PROCESS',
      headingSegments: [{ text: 'How It ' }, { text: 'Works', emphasis: true }],
      subtitle: [[{ text: 'Blinds · Shades · Drapery & Curtains · Shutters · Motorized Systems & Smart Home Integration · Repairs & Maintenance' }]],
    },
    timeline: {
      images: [
        { src: '/images/services/blinds/timeline-photo-1.webp', alt: 'Consultant showing solar shade samples' },
        { src: '/images/services/blinds/timeline-photo-2.webp', alt: 'Installer fitting solar shades' },
      ],
      steps: [
        { number: '1', title: 'In-Home Consultation', description: 'We assess your sun exposure and recommend the ideal openness factor for each window.' },
        { number: '2', title: 'Precise Measurement', description: 'Our specialists measure your windows for a perfect custom fit.' },
        { number: '3', title: 'Custom Fabrication', description: 'Your solar shades are made with UV-blocking fabric in your chosen color and openness.' },
        { number: '4', title: 'Professional Installation', description: 'We install your solar shades for smooth operation and optimal sun protection.' },
      ],
    },
    cta: {
      eyebrow: 'BOOK CONSULTATION',
      heading: 'Arrange Your Consultation Appointment',
      body: [[{ text: 'Ready to reduce glare while keeping your view? Schedule a free consultation to explore our solar shade options.' }]],
      ctaLabel: 'Book consultation',
      ctaHref: '#quote-form',
      image: { src: '/images/services/card-shades.webp', alt: 'Room with solar shades' },
    },
  },
  subServiceCellularShades: {
    hero: {
      breadcrumb: 'HOME > SERVICES > SHADES > Cellular Shades',
      heading: 'Custom Cellular Shades & Professional Installation',
      subheading: 'Energy-efficient honeycomb shades that insulate your home while providing elegant light control.',
      backgroundImage: { src: '/images/services/card-shades.webp', alt: 'Cellular shades on a kitchen window' },
    },
    intro: serviceIntroPlaceholder,
    about: {
      eyebrow: 'ABOUT',
      headingPrefix: 'Energy-Efficient ',
      headingHighlight: 'Cellular Shade',
      headingSuffix: ' Solutions',
      paragraphs: [{ prefix: 'Our cellular shades feature a unique honeycomb construction that traps air for superior insulation in ', highlight: 'South Florida\'s warm climate', suffix: '. Available in single, double, and triple cell configurations, they reduce energy costs while providing soft, diffused light.' }],
      features: [
        { title: 'Energy Saving', description: 'Honeycomb pockets trap air, insulating windows against Florida heat.' },
        { title: 'Sound Dampening', description: 'Cellular construction absorbs sound for a quieter room.' },
        { title: 'Cordless Options', description: 'Lift and lower smoothly with no dangling cords, child- and pet-safe.' },
        { title: 'Top-Down Bottom-Up', description: 'Lower from the top for privacy while still letting light in from below.' },
      ],
      gallery: [
        { src: '/images/services/card-shades.webp', alt: 'Cellular shades in a bedroom' },
        { src: '/images/services/card-shades.webp', alt: 'Honeycomb shade cross-section' },
        { src: '/images/services/card-shades.webp', alt: 'Top-down bottom-up cellular shades' },
      ],
    },
    howItWorksHeader: {
      eyebrow: 'PROCESS',
      headingSegments: [{ text: 'How It ' }, { text: 'Works', emphasis: true }],
      subtitle: [[{ text: 'Blinds · Shades · Drapery & Curtains · Shutters · Motorized Systems & Smart Home Integration · Repairs & Maintenance' }]],
    },
    timeline: {
      images: [
        { src: '/images/services/blinds/timeline-photo-1.webp', alt: 'Consultant showing cellular shade options' },
        { src: '/images/services/blinds/timeline-photo-2.webp', alt: 'Installer mounting cellular shades' },
      ],
      steps: [
        { number: '1', title: 'In-Home Consultation', description: 'We evaluate your insulation needs and recommend the right cell configuration for each room.' },
        { number: '2', title: 'Precise Measurement', description: 'Our specialists measure every window for a perfect inside or outside mount fit.' },
        { number: '3', title: 'Custom Fabrication', description: 'Your cellular shades are built with precision honeycomb cells in your chosen color and opacity.' },
        { number: '4', title: 'Professional Installation', description: 'We install your shades with the operating system of your choice — cordless, motorized, or top-down.' },
      ],
    },
    cta: {
      eyebrow: 'BOOK CONSULTATION',
      heading: 'Arrange Your Consultation Appointment',
      body: [[{ text: 'Ready to improve your home\'s energy efficiency? Schedule a free consultation to explore our cellular shade options.' }]],
      ctaLabel: 'Book consultation',
      ctaHref: '#quote-form',
      image: { src: '/images/services/card-shades.webp', alt: 'Room with cellular shades' },
    },
  },
  subServiceRomanShades: {
    hero: {
      breadcrumb: 'HOME > SERVICES > SHADES > Roman Shades',
      heading: 'Custom Roman Shades & Professional Installation',
      subheading: 'Classic fabric shades that fold into elegant pleats, adding warmth and sophistication to any room.',
      backgroundImage: { src: '/images/services/card-shades.webp', alt: 'Roman shades on large windows' },
    },
    intro: serviceIntroPlaceholder,
    about: {
      eyebrow: 'ABOUT',
      headingPrefix: 'Classic ',
      headingHighlight: 'Roman Shade',
      headingSuffix: ' Designs',
      paragraphs: [{ prefix: 'Our roman shades bring a timeless, tailored look to ', highlight: 'South Florida interiors', suffix: '. Choose from flat, hobbled, or cascade fold styles in hundreds of designer fabrics. They combine the softness of drapery with the clean function of a shade.' }],
      features: [
        { title: 'Designer Fabrics', description: 'A wide range of textures and patterns to match any interior.' },
        { title: 'Multiple Fold Styles', description: 'Choose flat, hobbled, or relaxed folds to suit the room.' },
        { title: 'Blackout Linings', description: 'Optional linings block light fully for bedrooms and screening rooms.' },
        { title: 'Cordless Safety', description: 'Cord-free lift systems keep the look clean and homes child-safe.' },
      ],
      gallery: [
        { src: '/images/services/card-shades.webp', alt: 'Flat-fold roman shades in a dining room' },
        { src: '/images/services/card-shades.webp', alt: 'Hobbled roman shade in a bedroom' },
        { src: '/images/services/card-shades.webp', alt: 'Cascade roman shade fabric detail' },
      ],
    },
    howItWorksHeader: {
      eyebrow: 'PROCESS',
      headingSegments: [{ text: 'How It ' }, { text: 'Works', emphasis: true }],
      subtitle: [[{ text: 'Blinds · Shades · Drapery & Curtains · Shutters · Motorized Systems & Smart Home Integration · Repairs & Maintenance' }]],
    },
    timeline: {
      images: [
        { src: '/images/services/blinds/timeline-photo-1.webp', alt: 'Designer showing roman shade fabric samples' },
        { src: '/images/services/blinds/timeline-photo-2.webp', alt: 'Installer hanging roman shades' },
      ],
      steps: [
        { number: '1', title: 'Design Consultation', description: 'We bring fabric samples and help you choose the perfect fold style for your room.' },
        { number: '2', title: 'Precise Measurement', description: 'Our specialists measure for the ideal fit and drop length.' },
        { number: '3', title: 'Custom Fabrication', description: 'Your roman shades are sewn to order with your chosen fabric, lining, and fold pattern.' },
        { number: '4', title: 'Professional Installation', description: 'We install your roman shades and ensure smooth, balanced operation.' },
      ],
    },
    cta: {
      eyebrow: 'BOOK CONSULTATION',
      heading: 'Arrange Your Consultation Appointment',
      body: [[{ text: 'Ready for the elegance of custom roman shades? Schedule a free consultation to explore our fabric collections.' }]],
      ctaLabel: 'Book consultation',
      ctaHref: '#quote-form',
      image: { src: '/images/services/card-shades.webp', alt: 'Room with roman shades' },
    },
  },
  subServiceZebraShades: {
    hero: {
      breadcrumb: 'HOME > SERVICES > SHADES > Zebra Shades',
      heading: 'Custom Zebra Shades & Professional Installation',
      subheading: 'Dual-layer shades with alternating sheer and opaque bands for versatile light and privacy control.',
      backgroundImage: { src: '/images/services/card-shades.webp', alt: 'Zebra shades providing partial privacy' },
    },
    intro: serviceIntroPlaceholder,
    about: {
      eyebrow: 'ABOUT',
      headingPrefix: 'Versatile ',
      headingHighlight: 'Zebra Shade',
      headingSuffix: ' Solutions',
      paragraphs: [{ prefix: 'Our zebra shades offer a modern twist on light control with alternating sheer and solid bands that slide past each other for ', highlight: 'infinite adjustment', suffix: '. Align the bands for filtered light and a view, or overlap them for full privacy — all without raising the shade.' }],
      features: [
        { title: 'Dual Layer Control', description: 'Alternating sheer and solid bands adjust from full privacy to full view.' },
        { title: 'Modern Aesthetic', description: 'A clean, banded look that suits contemporary interiors.' },
        { title: 'No Cords', description: 'Continuous-loop or motorized operation keeps the window cord-free.' },
        { title: 'Motorized Available', description: 'Automate the dual-layer adjustment with a remote or app.' },
      ],
      gallery: [
        { src: '/images/services/card-shades.webp', alt: 'Zebra shades in open position' },
        { src: '/images/services/card-shades.webp', alt: 'Zebra shades in closed position' },
        { src: '/images/services/card-shades.webp', alt: 'Close-up of zebra shade bands' },
      ],
    },
    howItWorksHeader: {
      eyebrow: 'PROCESS',
      headingSegments: [{ text: 'How It ' }, { text: 'Works', emphasis: true }],
      subtitle: [[{ text: 'Blinds · Shades · Drapery & Curtains · Shutters · Motorized Systems & Smart Home Integration · Repairs & Maintenance' }]],
    },
    timeline: {
      images: [
        { src: '/images/services/blinds/timeline-photo-1.webp', alt: 'Consultant showing zebra shade options' },
        { src: '/images/services/blinds/timeline-photo-2.webp', alt: 'Installer fitting zebra shades' },
      ],
      steps: [
        { number: '1', title: 'In-Home Consultation', description: 'We help you choose the right fabric density and color for your light control needs.' },
        { number: '2', title: 'Precise Measurement', description: 'Our specialists measure each window for a seamless inside-mount fit.' },
        { number: '3', title: 'Custom Fabrication', description: 'Your zebra shades are crafted with precision-aligned alternating bands.' },
        { number: '4', title: 'Professional Installation', description: 'We install and calibrate your shades for smooth, even band alignment.' },
      ],
    },
    cta: {
      eyebrow: 'BOOK CONSULTATION',
      heading: 'Arrange Your Consultation Appointment',
      body: [[{ text: 'Ready for versatile light control with modern style? Schedule a free consultation to explore our zebra shades.' }]],
      ctaLabel: 'Book consultation',
      ctaHref: '#quote-form',
      image: { src: '/images/services/card-shades.webp', alt: 'Room with zebra shades' },
    },
  },
  subServiceWovenWoodShades: {
    hero: {
      breadcrumb: 'HOME > SERVICES > SHADES > Woven Wood Shades',
      heading: 'Custom Woven Wood Shades & Professional Installation',
      subheading: 'Natural bamboo, grass, and reed shades that bring organic warmth and texture to your South Florida home.',
      backgroundImage: { src: '/images/services/card-shades.webp', alt: 'Woven wood shades in a modern room' },
    },
    intro: serviceIntroPlaceholder,
    about: {
      eyebrow: 'ABOUT',
      headingPrefix: 'Natural ',
      headingHighlight: 'Woven Wood Shade',
      headingSuffix: ' Options',
      paragraphs: [{ prefix: 'Our woven wood shades are handcrafted from natural materials like bamboo, jute, and grasses, bringing an organic, textured look to ', highlight: 'South Florida living spaces', suffix: '. Each shade is unique in pattern and tone, adding warmth and character while filtering light naturally.' }],
      features: [
        { title: 'Natural Materials', description: 'Woven from bamboo, jute, and reed for an organic, textured look.' },
        { title: 'Unique Textures', description: 'No two weaves are exactly alike, adding warmth to any room.' },
        { title: 'Liner Options', description: 'Add a liner for privacy and light control without losing the texture.' },
        { title: 'Eco-Friendly', description: 'Made from rapidly renewable natural fibers.' },
      ],
      gallery: [
        { src: '/images/services/card-shades.webp', alt: 'Bamboo woven shades in a sunroom' },
        { src: '/images/services/card-shades.webp', alt: 'Woven grass shade texture close-up' },
        { src: '/images/services/card-shades.webp', alt: 'Woven wood shades with privacy liner' },
      ],
    },
    howItWorksHeader: {
      eyebrow: 'PROCESS',
      headingSegments: [{ text: 'How It ' }, { text: 'Works', emphasis: true }],
      subtitle: [[{ text: 'Blinds · Shades · Drapery & Curtains · Shutters · Motorized Systems & Smart Home Integration · Repairs & Maintenance' }]],
    },
    timeline: {
      images: [
        { src: '/images/services/blinds/timeline-photo-1.webp', alt: 'Consultant showing woven shade material samples' },
        { src: '/images/services/blinds/timeline-photo-2.webp', alt: 'Installer mounting woven wood shades' },
      ],
      steps: [
        { number: '1', title: 'In-Home Consultation', description: 'We bring natural material samples so you can see how different weaves and tones complement your decor.' },
        { number: '2', title: 'Precise Measurement', description: 'Our specialists measure each window for the perfect fit and drop.' },
        { number: '3', title: 'Custom Fabrication', description: 'Your woven shades are handcrafted from natural materials with optional privacy liners.' },
        { number: '4', title: 'Professional Installation', description: 'We install your woven wood shades and ensure smooth, reliable operation.' },
      ],
    },
    cta: {
      eyebrow: 'BOOK CONSULTATION',
      heading: 'Arrange Your Consultation Appointment',
      body: [[{ text: 'Ready to bring natural warmth to your windows? Schedule a free consultation to explore our woven wood shade collection.' }]],
      ctaLabel: 'Book consultation',
      ctaHref: '#quote-form',
      image: { src: '/images/services/card-shades.webp', alt: 'Room with woven wood shades' },
    },
  },
  serviceShutters: {
    hero: {
      breadcrumb: 'HOME > SERVICES > Shutters',
      heading: 'Custom Interior Shutters & Professional Installation Services',
      subheading: 'Premium interior and composite shutters crafted for South Florida homes. Free in-home consultation available.',
      backgroundImage: {
        src: '/images/services/card-shutters.webp',
        alt: 'Bedroom window fitted with white interior shutters',
      },
    },
    intro: serviceIntroPlaceholder,
    about: {
      eyebrow: 'ABOUT',
      headingPrefix: 'Premium ',
      headingHighlight: 'Interior & Composite',
      headingSuffix: ' Shutters',
      paragraphs: [{ prefix: 'Our shutters are crafted from premium materials designed to thrive in ', highlight: 'South Florida\'s coastal climate', suffix: '. Choose from classic louvered styles, tier-on-tier configurations, and composite options that resist moisture, warping, and fading while providing elegant light control.' }],
      features: [
        { title: 'Moisture Resistant', description: 'Composite and vinyl panels that won\'t warp, crack, or swell in humidity.' },
        { title: 'UV Protected', description: 'Finishes hold their color under direct, sustained Florida sun.' },
        { title: 'Energy Efficient', description: 'Solid panels and a tight frame add real insulation at the glass.' },
        { title: 'Custom Fitted', description: 'Every frame is built to the exact opening, including arches and bays.' },
      ],
      gallery: [
        { src: '/images/services/card-shutters.webp', alt: 'White interior shutters on a large window' },
        { src: '/images/services/card-shutters.webp', alt: 'Tier-on-tier shutters in a living room' },
        { src: '/images/services/card-shutters.webp', alt: 'Composite shutters fitted in a bathroom' },
      ],
    },
    howItWorksHeader: {
      eyebrow: 'PROCESS',
      headingSegments: [{ text: 'How It ' }, { text: 'Works', emphasis: true }],
      subtitle: [[{ text: 'Blinds · Shades · Drapery & Curtains · Shutters · Motorized Systems & Smart Home Integration · Repairs & Maintenance' }]],
    },
    timeline: {
      images: [
        { src: '/images/services/blinds/timeline-photo-1.webp', alt: 'Installer measuring a window for custom shutters' },
        { src: '/images/services/blinds/timeline-photo-2.webp', alt: 'Professional installing interior shutters' },
      ],
      steps: [
        { number: '1', title: 'In-Home Consultation', description: 'We visit your home to discuss your vision and explore shutter styles tailored to your space.' },
        { number: '2', title: 'Precise Measurement', description: 'Our specialists take exact measurements to ensure a perfect custom fit for every window.' },
        { number: '3', title: 'Custom Fabrication', description: 'Your shutters are handcrafted using premium materials selected for durability and style.' },
        { number: '4', title: 'Professional Installation', description: 'Our expert installers mount your shutters with precision for a flawless finish.' },
      ],
    },
    cta: {
      eyebrow: 'BOOK CONSULTATION',
      heading: 'Arrange Your Consultation Appointment',
      body: [[{ text: 'Ready to transform your windows with premium shutters? Schedule a free in-home consultation and let our experts help you choose the perfect style for your home.' }]],
      ctaLabel: 'Book consultation',
      ctaHref: '#quote-form',
      image: { src: '/images/services/card-shutters.webp', alt: 'Living room with elegant interior shutters' },
    },
  },
  serviceDrapery: {
    hero: {
      breadcrumb: 'HOME > SERVICES > Drapery & Curtains',
      heading: 'Custom Drapery & Curtains Installation Services',
      subheading: 'Elegant custom drapery and curtains designed to complement your South Florida home. Professional measuring and installation included.',
      backgroundImage: {
        src: '/images/services/card-drapery.webp',
        alt: 'Living room with floor-length drapery curtains',
      },
    },
    intro: serviceIntroPlaceholder,
    about: {
      eyebrow: 'ABOUT',
      headingPrefix: 'Elegant ',
      headingHighlight: 'Custom Drapery & Curtain',
      headingSuffix: ' Solutions',
      paragraphs: [{ prefix: 'From sheer panels to blackout drapes, our custom drapery is designed for ', highlight: 'South Florida living', suffix: '. We offer a wide selection of fabrics, linings, and hardware options to create the perfect look for any room, combining beauty with practical light and privacy control.' }],
      features: [
        { title: 'Custom Fabrics', description: 'Choose from a full range of designer fabrics, weights, and linings.' },
        { title: 'Blackout Options', description: 'Triple-weave linings block light fully for bedrooms and theaters.' },
        { title: 'Motorized Tracks', description: 'Remote or app-controlled tracks for wide or hard-to-reach windows.' },
        { title: 'UV Protection', description: 'Linings that shield furniture and flooring from fading.' },
      ],
      gallery: [
        { src: '/images/services/card-drapery.webp', alt: 'Floor-length sheer curtains in a sunlit room' },
        { src: '/images/services/card-drapery.webp', alt: 'Elegant blackout drapery in a bedroom' },
        { src: '/images/services/card-drapery.webp', alt: 'Custom curtains with decorative hardware' },
      ],
    },
    howItWorksHeader: {
      eyebrow: 'PROCESS',
      headingSegments: [{ text: 'How It ' }, { text: 'Works', emphasis: true }],
      subtitle: [[{ text: 'Blinds · Shades · Drapery & Curtains · Shutters · Motorized Systems & Smart Home Integration · Repairs & Maintenance' }]],
    },
    timeline: {
      images: [
        { src: '/images/services/blinds/timeline-photo-1.webp', alt: 'Designer showing fabric samples to a homeowner' },
        { src: '/images/services/blinds/timeline-photo-2.webp', alt: 'Installer hanging custom drapery on a rod' },
      ],
      steps: [
        { number: '1', title: 'Design Consultation', description: 'We bring fabric samples to your home so you can see how materials look with your decor and lighting.' },
        { number: '2', title: 'Precise Measurement', description: 'Our specialists measure your windows to ensure perfect drape length and fullness.' },
        { number: '3', title: 'Custom Fabrication', description: 'Your drapery is sewn to order using your chosen fabric, lining, and finishing details.' },
        { number: '4', title: 'Professional Installation', description: 'We install your drapery hardware and curtains, ensuring smooth operation and a polished look.' },
      ],
    },
    cta: {
      eyebrow: 'BOOK CONSULTATION',
      heading: 'Arrange Your Consultation Appointment',
      body: [[{ text: 'Ready to add elegance to your home with custom drapery? Schedule a free in-home consultation and explore our fabric collections.' }]],
      ctaLabel: 'Book consultation',
      ctaHref: '#quote-form',
      image: { src: '/images/services/card-drapery.webp', alt: 'Room with elegant custom curtains' },
    },
  },
  serviceMotorized: {
    hero: {
      breadcrumb: 'HOME > SERVICES > Motorized & Smart Home',
      heading: 'Motorized Window Coverings & Smart Home Integration',
      subheading: 'Automate your blinds, shades, and curtains with smart home technology. Voice control, scheduling, and seamless integration.',
      backgroundImage: {
        src: '/images/services/card-motorized.webp',
        alt: 'Smart motorized blinds with home automation controls',
      },
    },
    intro: serviceIntroPlaceholder,
    about: {
      eyebrow: 'ABOUT',
      headingPrefix: 'Smart ',
      headingHighlight: 'Motorized & Automated Window',
      headingSuffix: ' Solutions',
      paragraphs: [{ prefix: 'Our motorized systems bring convenience and energy savings to ', highlight: 'modern South Florida homes', suffix: '. Integrate with Google Home, Amazon Alexa, and Lutron for voice and app control. Schedule your window coverings to adjust automatically with the sun for optimal comfort and energy efficiency.' }],
      features: [
        { title: 'Voice Control', description: 'Works with major smart home platforms for hands-free operation.' },
        { title: 'App Scheduling', description: 'Set schedules or trigger scenes right from your phone.' },
        { title: 'Energy Efficient', description: 'Automated schedules help manage heat gain through the day.' },
        { title: 'Battery & Hardwired', description: 'Choose battery-powered or hardwired motors depending on the install.' },
      ],
      gallery: [
        { src: '/images/services/card-motorized.webp', alt: 'Motorized roller shades in a living room' },
        { src: '/images/services/card-motorized.webp', alt: 'Smart home tablet controlling window coverings' },
        { src: '/images/services/card-motorized.webp', alt: 'Motorized curtain track system' },
      ],
    },
    howItWorksHeader: {
      eyebrow: 'PROCESS',
      headingSegments: [{ text: 'How It ' }, { text: 'Works', emphasis: true }],
      subtitle: [[{ text: 'Blinds · Shades · Drapery & Curtains · Shutters · Motorized Systems & Smart Home Integration · Repairs & Maintenance' }]],
    },
    timeline: {
      images: [
        { src: '/images/services/blinds/timeline-photo-1.webp', alt: 'Technician demonstrating motorized shade controls' },
        { src: '/images/services/blinds/timeline-photo-2.webp', alt: 'Smart home integration setup for window coverings' },
      ],
      steps: [
        { number: '1', title: 'Smart Home Assessment', description: 'We evaluate your home automation setup and recommend the best motorized solutions for your needs.' },
        { number: '2', title: 'System Design', description: 'We design a motorized window covering system with the right motors, controls, and integration points.' },
        { number: '3', title: 'Custom Fabrication', description: 'Your motorized window coverings are built with precision motors and premium materials.' },
        { number: '4', title: 'Installation & Setup', description: 'We install, wire, and program your system, including smart home integration and scheduling.' },
      ],
    },
    cta: {
      eyebrow: 'BOOK CONSULTATION',
      heading: 'Arrange Your Consultation Appointment',
      body: [[{ text: 'Ready to automate your window coverings? Schedule a free consultation to explore motorized and smart home solutions for your space.' }]],
      ctaLabel: 'Book consultation',
      ctaHref: '#quote-form',
      image: { src: '/images/services/card-motorized.webp', alt: 'Modern living room with motorized window coverings' },
    },
  },
  serviceRepairs: {
    hero: {
      breadcrumb: 'HOME > SERVICES > Repairs & Maintenance',
      heading: 'Window Covering Repairs & Maintenance Services',
      subheading: 'Expert repair and maintenance for all types of blinds, shades, shutters, and motorized systems across South Florida.',
      backgroundImage: {
        src: '/images/services/card-repairs.webp',
        alt: 'Technician performing window covering repair and maintenance',
      },
    },
    intro: serviceIntroPlaceholder,
    about: {
      eyebrow: 'ABOUT',
      headingPrefix: 'Professional ',
      headingHighlight: 'Repair & Maintenance',
      headingSuffix: ' Services',
      paragraphs: [{ prefix: 'We service and repair window coverings from all major manufacturers across ', highlight: 'Broward County and South Florida', suffix: '. From broken cords and stuck mechanisms to motorized system troubleshooting, our experienced technicians diagnose and fix issues quickly to restore your window coverings to perfect working order.' }],
      features: [
        { title: 'All Brands Serviced', description: 'We repair treatments we didn\'t originally install, any major brand.' },
        { title: 'Motorized Repairs', description: 'Diagnose and fix motors, remotes, and smart-home integrations.' },
        { title: 'Cord Replacement', description: 'Restring or convert to cordless on blinds and shades.' },
        { title: 'Prompt Scheduling', description: 'We prioritize repair requests to get your window coverings back in working order quickly.' },
      ],
      gallery: [
        { src: '/images/services/card-repairs.webp', alt: 'Technician repairing a window blind mechanism' },
        { src: '/images/services/card-repairs.webp', alt: 'Blind cord replacement service' },
        { src: '/images/services/card-repairs.webp', alt: 'Motorized shade motor servicing' },
      ],
    },
    howItWorksHeader: {
      eyebrow: 'PROCESS',
      headingSegments: [{ text: 'How It ' }, { text: 'Works', emphasis: true }],
      subtitle: [[{ text: 'Blinds · Shades · Drapery & Curtains · Shutters · Motorized Systems & Smart Home Integration · Repairs & Maintenance' }]],
    },
    timeline: {
      images: [
        { src: '/images/services/blinds/timeline-photo-1.webp', alt: 'Technician inspecting a window covering issue' },
        { src: '/images/services/blinds/timeline-photo-2.webp', alt: 'Repair specialist fixing a motorized shade motor' },
      ],
      steps: [
        { number: '1', title: 'Diagnosis Visit', description: 'Our technician visits your home to inspect the issue and provide a clear repair estimate.' },
        { number: '2', title: 'Parts Sourcing', description: 'We source genuine replacement parts from the original manufacturer when available.' },
        { number: '3', title: 'Expert Repair', description: 'Our trained technicians complete the repair on-site or in our workshop for complex jobs.' },
        { number: '4', title: 'Quality Check', description: 'We test every repaired unit thoroughly before sign-off to ensure smooth, reliable operation.' },
      ],
    },
    cta: {
      eyebrow: 'BOOK CONSULTATION',
      heading: 'Schedule Your Repair Service',
      body: [[{ text: 'Have a broken blind, stuck shade, or motorized system issue? Schedule a repair visit and our technicians will get your window coverings working like new.' }]],
      ctaLabel: 'Book consultation',
      ctaHref: '#quote-form',
      image: { src: '/images/services/card-repairs.webp', alt: 'Technician servicing window coverings' },
    },
  },
  commercialPage: {
    hero: {
      // The confirmed desktop source (this page's own node 2220:843) says
      // "HOME > commercial" — but the tablet AND mobile frames both instead
      // say "HOME > SERVICES", identical to the /services page's own
      // breadcrumb, on BOTH breakpoints consistently. That's not a one-off
      // typo, it reads as a copy-pasted leftover from another page's
      // breadcrumb component that never got updated for Commercial's
      // responsive frames. Per this project's standing rule (content comes
      // from the confirmed PRIMARY desktop source, tablet/mobile frames are
      // for layout), this page uses desktop's own "HOME > commercial" value
      // at every breakpoint rather than propagating that leftover.
      breadcrumb: 'HOME > commercial',
      heading: 'Commercial Window Treatments & Blinds Installation Services',
      // Verbatim from Figma, including the "FLorida" typo (capital L) and
      // the fact that this is near-word-for-word the SAME placeholder
      // subheading as the homepage's own hero (`hero.subheading`, which
      // spells it correctly as "Florida") — same "duplicated/inconsistent
      // placeholder copy across pages" pattern documented elsewhere in this
      // file, preserved rather than silently corrected.
      subheading: 'Enhance your South FLorida home with elegant blinds and shades now!',
      ctaLabel: 'Book consultation',
      ctaHref: '#quote-form',
      backgroundImage: {
        // TODO: temporary Figma asset URL, expires ~7 days — export and commit to public/images/commercial/ before then.
        src: 'https://www.figma.com/api/mcp/asset/8f97d591-8f3e-43a0-8575-150ce095a6fe.png',
        alt: 'Two installers assembling window coverings on a rooftop terrace of a commercial building',
      },
    },
    places: {
      eyebrow: 'Commercial places',
      headingSegments: [{ text: 'High-Volume Window Covering Supply for ' }, { text: 'Offices, Hospitality & Healthcare', emphasis: true }],
      description:
        [[{ text: "Explore our durable shutters crafted from premium composite and natural wood, designed to withstand Florida's humid climate. Choose from classic tier-on-tier styles that offer versatile light control and privacy, combining timeless elegance with lasting performance." }]],
      // All 4 cards literally share the identical description string
      // "Custom Window Treatments for Office Buildings" in the Figma source
      // (confirmed via get_metadata on nodes 2227:1351 / 2227:1342 /
      // 2227:1360 — not a mistake introduced here) — only the title and icon
      // actually differ per card in the design. Reproduced verbatim per this
      // project's standing rule of preserving genuine Figma content
      // inconsistencies rather than silently writing new copy.
      cards: [
        {
          title: 'Office Buildings',
          description: 'Custom Window Treatments for Office Buildings',
          icon: 'Building2',
        },
        {
          title: 'Hospitality & Hotels',
          description: 'Custom Window Treatments for Office Buildings',
          icon: 'Hotel',
        },
        {
          title: 'Healthcare Facilities',
          description: 'Custom Window Treatments for Office Buildings',
          icon: 'SquareActivity',
        },
        {
          title: 'Multi-Family & Retail',
          description: 'Custom Window Treatments for Office Buildings',
          icon: 'PaperBag',
        },
      ],
    },
    installation: {
      eyebrow: 'INSTALLATION',
      headingPrefix: 'Scalable ',
      headingHighlight: 'Commercial Installation',
      headingSuffix: ' Across Florida',
      // Verbatim duplicate of `places.description` in the Figma source —
      // same "reused placeholder paragraph across sections" pattern seen
      // throughout this file (e.g. serviceBlinds.cta.body === commercial.body).
      description:
        [[{ text: "Explore our durable shutters crafted from premium composite and natural wood, designed to withstand Florida's humid climate. Choose from classic tier-on-tier styles that offer versatile light control and privacy, combining timeless elegance with lasting performance." }]],
      images: [
        {
          // TODO: temporary Figma asset URL, expires ~7 days — export and commit to public/images/commercial/ before then.
          src: 'https://www.figma.com/api/mcp/asset/9a8c0037-445e-470d-8af1-6897f4cfa92b.png',
          alt: 'Bright open-plan office with floor-to-ceiling windows fitted with roller shades',
        },
        {
          // TODO: temporary Figma asset URL, expires ~7 days — export and commit to public/images/commercial/ before then.
          src: 'https://www.figma.com/api/mcp/asset/6fd99ca6-faaa-49f7-9bfe-bc704ee07525.png',
          alt: 'Hotel corridor with large windows fitted with motorized shades',
        },
        {
          // TODO: temporary Figma asset URL, expires ~7 days — export and commit to public/images/commercial/ before then.
          src: 'https://www.figma.com/api/mcp/asset/f5dd45f8-1d26-4908-97a3-6a59c35d1c13.png',
          alt: 'Installer on a ladder fitting blinds in a commercial space',
        },
      ],
    },
    quoteForm: {
      eyebrow: 'commercial quote form',
      heading: 'Submit Your Commercial Bid Request',
      description: [
        [
          {
            text: 'Send us the drawings and we will price the job properly. Office blinds installation Broward County and statewide projects can be quoted from a window schedule, an architectural drawing set, or a formal RFP document.',
          },
        ],
        [{ text: 'Tell us the handover date if it is set. It changes the specification more than anything else on a commercial project.' }],
      ],
      companyNameLabel: 'Company Name',
      companyNamePlaceholder: 'Company Name',
      contactNameLabel: 'Contact Name',
      // Figma's own mockup literally reuses "Company Name" as this field's
      // placeholder too (a copy-paste leftover, same pattern as the
      // breadcrumb above) — corrected to a real name placeholder here rather
      // than reproducing the leftover, since an actual site visitor typing
      // their name would find "Company Name" inside a "Contact Name" field
      // confusing, and nothing about the design intent depends on the
      // literal wrong string.
      contactNamePlaceholder: 'John Smith',
      emailLabel: 'Email',
      emailPlaceholder: 'john@example.com',
      phoneLabel: 'Phone',
      phonePlaceholder: '+ (954) 555-1234',
      projectTypeLabel: 'Project Type',
      // Figma shows this dropdown with "Commercial" as its resting display
      // text (styled identically to every other field's gray placeholder) —
      // treated as the placeholder here rather than a locked value, with the
      // actual selectable options inferred from this page's own "places"
      // card categories above plus a generic catch-all, since Figma doesn't
      // specify a real options list for this field.
      projectTypePlaceholder: 'Commercial',
      projectTypeOptions: ['Office Buildings', 'Hospitality & Hotels', 'Healthcare Facilities', 'Multi-Family & Retail', 'Other'],
      locationLabel: 'Location',
      locationPlaceholder: 'City, State',
      messageLabel: 'Project Scope & Message',
      messagePlaceholder: 'Tell us about your project scope, timeline, and any specific requirements...',
      uploadPrompt: 'Click to upload architectural drawings or blueprints',
      uploadHint: 'PDF, DWG, OR JPG (MAX 25MB)',
      submitLabel: 'Submit my bid request',
      successMessage: "Thanks — your bid request has been received. Our commercial desk will follow up within 24 business hours.",
    },
  },
  galleryPage: {
    hero: {
      breadcrumb: 'HOME > gallery',
      headingSegments: [{ text: 'Modern Window Coverings' }, { text: ' Inspiration Gallery', emphasis: true }],
      subheading:
        'Browse completed window treatment installations from South Florida homes and businesses. Copywriter to supply.',
    },
    filters: {
      heading: 'Browse Photos of Custom Blinds, Shades, and Shutters',
      filterGroups: [
        {
          label: 'By Product Type',
          options: ['All', 'Blinds', 'Shades', 'Shutters', 'Drapery', 'Motorized'],
        },
        {
          label: 'By Room',
          options: ['All', 'Living Room', 'Bedroom', 'Kitchen', 'Office', 'Commercial'],
        },
      ],
    },
    grid: {
      items: [
        {
          id: 1,
          // TODO: temporary Figma asset URL — export and commit to public/images/gallery/ before expiry.
          image: { src: 'https://www.figma.com/api/mcp/asset/c48521ed-488a-4396-946f-51176a467f13.png', alt: 'White venetian blinds catching light in a bright bathroom' },
          category: 'Blinds',
          room: 'Bedroom',
          title: 'Refined Classic Window Blinds',
        },
        {
          id: 2,
          image: { src: 'https://www.figma.com/api/mcp/asset/18291d5e-0899-4b30-a198-269dfce893d8.png', alt: 'Floor-length sheer curtains beside a coastal view' },
          category: 'Curtains & Drapery',
          room: 'Living Room',
          title: 'Elegant Coastal Sheer Drapery',
        },
        {
          id: 3,
          image: { src: 'https://www.figma.com/api/mcp/asset/d8700be0-3216-45a4-aae8-b8d01069794e.png', alt: 'Blue horizontal blinds filtering afternoon light' },
          category: 'Blinds',
          room: 'Living Room',
          title: 'Contemporary Horizontal Blinds',
        },
        {
          id: 4,
          image: { src: 'https://www.figma.com/api/mcp/asset/75b02106-d1f7-4e3d-b909-899e362695d0.png', alt: 'Modern living room with roller shades on large windows' },
          category: 'Blinds',
          room: 'Living Room',
          title: 'Modern Living Room Roller Shades',
        },
        {
          id: 5,
          image: { src: 'https://www.figma.com/api/mcp/asset/466ef774-b07e-49ba-9a9c-b5dcf12b606d.png', alt: 'Large sliding glass doors with solar shades overlooking a pool' },
          category: 'Shades',
          room: 'Living Room',
          title: 'Poolside Solar Shade Installation',
        },
        {
          id: 6,
          image: { src: 'https://www.figma.com/api/mcp/asset/dbb27973-024c-455e-ada2-73d4cc868a4a.png', alt: 'Bedroom with dark roller shades and sheer curtains' },
          category: 'Curtains & Drapery',
          room: 'Bedroom',
          title: 'Layered Bedroom Window Treatments',
        },
        {
          id: 7,
          image: { src: 'https://www.figma.com/api/mcp/asset/457b7513-67ec-4ce0-8837-e81fcc97f0f1.png', alt: 'Home office with floor-length curtains and a desk by the window' },
          category: 'Curtains & Drapery',
          room: 'Office',
          title: 'Home Office Floor-Length Curtains',
        },
        {
          id: 8,
          image: { src: 'https://www.figma.com/api/mcp/asset/59fe285c-a741-47bf-ba35-b1e77ad5cfa0.png', alt: 'Living room with tall French-door blinds and natural light' },
          category: 'Blinds',
          room: 'Living Room',
          title: 'French Door Blinds With Natural Light',
        },
        {
          id: 9,
          image: { src: 'https://www.figma.com/api/mcp/asset/2d8fc4af-a63a-4f19-87b0-e4bbcb323d5c.png', alt: 'Kitchen with white blinds and a breakfast nook' },
          category: 'Blinds',
          room: 'Kitchen',
          title: 'Bright Kitchen Window Blinds',
        },
        {
          id: 10,
          image: { src: 'https://www.figma.com/api/mcp/asset/ab335d76-33ff-4d71-bf60-d51090818a33.png', alt: 'Contemporary living room with automated blinds on large windows' },
          category: 'Blinds',
          room: 'Living Room',
          title: 'Automated Contemporary Blinds',
        },
        {
          id: 11,
          image: { src: 'https://www.figma.com/api/mcp/asset/7730f05b-7091-4307-b2f5-b10d01001834.png', alt: 'Installer adjusting motorized blinds on a ladder' },
          category: 'Blinds',
          room: 'Living Room',
          title: 'Professional Motorized Installation',
        },
        {
          id: 12,
          image: { src: 'https://www.figma.com/api/mcp/asset/53b7af90-8cd3-411e-9874-9c653bfaccb7.png', alt: 'Modern commercial office with floor-to-ceiling drapery panels' },
          category: 'Curtains & Drapery',
          room: 'Commercial',
          title: 'Commercial Drapery Panels',
        },
      ],
      loadMoreLabel: 'Load More',
    },
    cta: {
      eyebrow: 'BOOK CONSULTATION',
      heading: 'Get Your Free Estimate Today',
      body: [[{ text: 'Need a solution for a commercial space? We provide heavy-duty, automated, and energy-efficient window coverings for offices, restaurants, and residential complexes across South Florida.' }]],
      ctaLabel: 'Book consultation',
      ctaHref: '#quote-form',
      image: {
        // TODO: temporary Figma asset URL — export and commit to public/images/gallery/ before expiry.
        src: 'https://www.figma.com/api/mcp/asset/6609fe17-2c11-4423-bf86-504c76ddc180.png',
        alt: 'Person relaxing on a sofa near large windows with warm evening light',
      },
    },
  },
  locationsPage: {
    hero: {
      breadcrumb: 'HOME > locations hub',
      heading: 'Window Treatment Services Across Florida',
      subheading: [[{ text: 'Serving Broward County and South Florida — expanding to additional states soon.' }]],
    },
    // Redesigned 2026-09-09 — see the comment on LocationCountySection in
    // src/types/content.ts for why this is hardcoded rather than pulled
    // from a query.
    counties: [
      {
        name: 'Broward County',
        paragraphs: [
          "Broward covers more ground than most people expect, and the requirements shift considerably across it. Coastal properties from Deerfield down through Hollywood need corrosion-rated hardware and moisture-stable materials that inland communities like Weston and Coral Springs simply do not. Housing stock varies just as widely, from mid-century townhouses with irregular openings to newer developments where entire streets share the same window dimensions.",
          'We hold a full installation team for the county, which means residential replacements, multi-unit and HOA schemes, and commercial fit-outs all run in parallel rather than queuing behind one another. We aim to respond within 24 hours across every area listed here.',
        ],
        cities: [
          { name: 'Fort Lauderdale', href: '/free-quote', description: 'One of our busiest areas, and one of the most varied. We cover everything from single-room replacements in Victoria Park townhouses to full commercial fit-outs along Las Olas. Waterfront properties here get salt-air rated hardware as standard, because the corrosion that ruins unrated mechanisms shows up within two seasons this close to the Intracoastal.' },
          { name: 'Coral Springs', href: '/free-quote', description: 'Residential and multi-family work across the northwest of the county. A lot of Coral Springs housing stock was built to similar plans, which means we frequently already know the window dimensions before we arrive. Faux wood blinds and cellular shades are the most requested specifications here, the latter usually for the west-facing rooms that run hot from mid-afternoon.' },
          { name: 'Coral Gables', href: '/free-quote', description: 'Period properties and larger residential specifications, frequently with architectural constraints. Original window openings are rarely square, and many are protected, so treatments have to fit what is there rather than what would be convenient. Interior shutters are popular here because they read as joinery rather than as something added.' },
          { name: 'Hollywood', href: '/free-quote', description: 'A mix of residential and hospitality, including contract-grade commercial fit-outs along the beach. Hotel and short-let properties here need genuine blackout for guest sleep quality and fabric that survives daily handling by people who did not pay for it. Fire-rated specifications are available across the range.' },
          { name: 'Pompano Beach', href: '/free-quote', description: 'Waterfront and near-waterfront homes where glare is the primary complaint. Solar shades are the most common answer, specified by openness factor per elevation so the water view survives the treatment. West-facing rooms usually take a tighter weave than the rest of the house.' },
          { name: 'Plantation', href: '/free-quote', description: 'Established residential neighbourhoods and professional offices. Larger older properties here often have arched heads, bay windows and irregular openings that defeat off-the-shelf sizing, which is exactly the situation custom fabrication exists for. We template rather than estimate on anything non-rectangular.' },
          { name: 'Weston', href: '/free-quote', description: 'Premium residential, and the area where we install the highest proportion of motorised systems. Tall stairwell glazing and wide runs above sliding doors are difficult to reach and tend to be left unused entirely without automation. App and scheduled control are specified more often here than anywhere else in the county.' },
          { name: 'Pembroke Pines', href: '/free-quote', description: 'High-volume residential communities, including a significant amount of multi-unit and HOA work. We handle phased installation across occupied buildings and hold consistent specifications across a development so units match, which matters when a management company is signing off on the whole scheme.' },
          // Figma's own label reads "Devis" — almost certainly a typo for
          // "Davie". Kept as-is rather than silently corrected.
          { name: 'Devis', href: '/free-quote', description: 'Larger residential properties and equestrian estates with the tall, wide glazing that comes with them. Motorised drapery tracks and oversized roller systems are common specifications here. Anything above standard reach gets automated as a matter of course rather than as an upgrade.' },
        ],
        alsoCovering: 'Sunrise, Coconut Creek and Miramar',
      },
      {
        name: 'Miami Dade County',
        paragraphs: [
          'Miami-Dade is the largest market we serve and the most vertical. A significant share of the work is high-rise and condominium, where the building often dictates the job more than the specification does: restricted service hours, freight elevator bookings, and management approval before a contractor is admitted. We handle that paperwork as standard rather than treating it as an obstacle. Light is the other defining factor. Floor-to-ceiling glazing on east and south elevations produces glare and heat load that no fabric-weight decision alone will solve, so solar shading specified by openness factor does most of the work here.',
          'Our teams for the county are experienced in both the access requirements and the specification, and we aim to respond within 24 hours.',
        ],
        cities: [
          { name: 'Miami', href: '/free-quote', description: 'High-rise, condominium and commercial installations across the city. Building access rules shape the job more than the specification does here, so we schedule around approved service hours and handle the paperwork most management companies require before a contractor is admitted. Downtown and Brickell offices are the most common commercial requests.' },
          { name: 'Miami Beach', href: '/free-quote', description: 'Coastal and hospitality work where salt air is relentless. Every mechanism specified here is corrosion-rated, and we steer clients away from finishes that will not survive the first year. Hotels and short-let apartments make up a significant share of the work, which means blackout performance and fabric durability drive most specifications.' },
          { name: 'Deerfield Beach', href: '/free-quote', description: 'Coastal properties where humidity is the deciding factor rather than a consideration. Composite shutters and faux wood blinds are specified as standard in bathrooms, kitchens and anything within a few blocks of the ocean. Timber is available where the room is dry and conditioned, but we will tell you honestly when it is the wrong call.' },
          { name: 'Aventura', href: '/free-quote', description: 'Condominium and multi-unit residential, much of it high-rise with floor-to-ceiling glazing. Solar shades dominate for glare control on east and south elevations, usually motorised because the openings are large and the operating position is inconvenient. Building-wide specifications are common where an HOA is standardising.' },
          { name: 'Doral', href: '/free-quote', description: 'Commercial offices and modern residential developments. Office work here is mostly glare control on screens, which is a solar shade problem rather than a privacy one, and specification comes down to openness factor rather than opacity. We supply contract-grade mechanisms rated for daily cycling.' },
          { name: 'Kendall', href: '/free-quote', description: 'Suburban residential across the southwest of the county. Larger family homes with a lot of windows, so the free in-home consultation matters here more than almost anywhere else. Faux wood blinds and roller shades are the most requested combination.' },
          { name: 'Hialeah', href: '/free-quote', description: 'Residential and light commercial. Practical specifications, hard-wearing materials and straightforward installation, with faux wood and aluminum blinds handling most requirements. Repairs are a significant share of our Hialeah work, often on treatments fitted by companies no longer trading.' },
          { name: 'North Miami', href: '/free-quote', description: 'Residential and multi-family developments, including a steady volume of rental and investment property work. Durability and cost per unit matter more than finish detail on those jobs, and we specify accordingly rather than pushing a premium option that will not be maintained.' },
          { name: 'Sunny Isles Beach', href: '/free-quote', description: 'Oceanfront condominiums where the glazing is large, the light is unfiltered and the buildings are strict about contractor access. Motorised solar shades are the standard specification, frequently across an entire unit, and scheduling is arranged with building management before we attend.' },
        ],
        alsoCovering: 'Homestead and the southern communities.',
      },
      {
        name: 'Palm Beach County',
        paragraphs: [
          'Palm Beach County spans a wider range of property types than either of its neighbours, from waterfront estates in Jupiter to equestrian properties in Wellington and dense multi-family developments through West Palm Beach. Specifications rarely repeat across a single job here, and a large property frequently needs three or four different treatments to work correctly room by room. That suits a made-to-measure operation better than a stock one.',
          'We supply and install the full range throughout the county, residential and commercial, with the same consultation-first process and the same accountable installation team across every area listed here.',
        ],
        cities: [
          { name: 'Boca Raton', href: '/free-quote', description: 'Residential and professional offices across the city. A mix of established properties and newer developments, with full-height interior shutters and motorised shades the two most requested specifications. Office work is mostly glare management for screen-facing desks.' },
          { name: 'Delray Beach', href: '/free-quote', description: 'Coastal residential and hospitality. Proximity to the ocean drives material choice more than anything else, so composite and vinyl handle the wet and exposed rooms while timber is reserved for dry interiors. Restaurants and short-let properties make up a steady share of the commercial work.' },
          { name: 'West Palm Beach', href: '/free-quote', description: "Commercial, multi-family and residential across the county's largest city. Office buildings and multi-unit residential developments are the bulk of it, which means volume pricing, consistent specification across units and phased installation around occupancy." },
          { name: 'Boynton Beach', href: '/free-quote', description: 'Residential communities and light commercial, with a significant proportion of HOA and community association work. Consistency matters on those schemes, so we hold a single specification across a development and keep the records so replacements years later still match.' },
          { name: 'Jupiter', href: '/free-quote', description: 'Waterfront and premium residential. Large glazing, strong afternoon light and a lot of view worth protecting, which makes solar shades and layered treatments the usual answer rather than anything solid. Motorisation is common on the taller openings.' },
          { name: 'Wellington', href: '/free-quote', description: 'Larger residential properties and equestrian estates. Tall windows, wide spans and rooms that are difficult to treat with standard sizing. Custom fabrication and motorised operation are less an upgrade here than the only practical specification.' },
          // Figma's own label reads "Palm Beach Grains" — almost certainly a
          // typo for "Palm Beach Gardens". Kept as-is rather than silently
          // corrected.
          { name: 'Palm Beach Grains', href: '/free-quote', description: 'Residential estates and commercial offices. Mixed requirements across a single property are common, with solar shading on the exposed elevations, blackout in bedrooms and drapery where the room should feel finished rather than merely covered.' },
        ],
      },
    ],
    comingSoon: {
      eyebrow: 'EXPANDING',
      headingSegments: [{ text: 'Coming Soon — ' }, { text: 'Future States', emphasis: true }],
      description:
        [[{ text: 'Expanding our expert window treatment services to Texas, California and much more. Stay tuned for updates on new locations and offerings coming your way soon.' }]],
      badgeLabel: 'COMING SOON',
      // All 3 cards share the identical description string in the Figma
      // source itself (confirmed via get_design_context on nodes 2280:379 /
      // 2280:443 / 2280:453, byte-identical, including the leftover
      // "Lone Star State" reference inside the California and Other States
      // cards) — only the title differs per card in the design. Reproduced
      // verbatim per this project's standing rule on preserving genuine
      // Figma content inconsistencies rather than writing new copy, same
      // pattern as the Commercial page's places cards.
      cards: [
        {
          title: 'Texas',
          description: 'Strategic expansion into the Lone Star State is currently in planning stages.',
        },
        {
          title: 'California',
          description: 'Strategic expansion into the Lone Star State is currently in planning stages.',
        },
        {
          title: 'Other States',
          description: 'Strategic expansion into the Lone Star State is currently in planning stages.',
        },
      ],
    },
  },
  aboutPage: {
    hero: {
      breadcrumb: 'HOME > about us',
      heading: "Florida's Premier Window Coverings Company",
      subheading: 'Custom blinds, shades, shutters, and drapery — professionally measured, fabricated, and installed across South Florida.',
      ctaLabel: 'Book consultation',
      ctaHref: '#quote-form',
      backgroundImage: {
        src: 'https://www.figma.com/api/mcp/asset/e7b4400b-29de-4d70-b827-6be2da39964f.png',
        alt: 'Team at work installing window coverings in a modern Florida home',
      },
    },
    mission: {
      headingSegments: [{ text: 'Custom Blinds and Shades for ' }, { text: 'Homes & Commercial Spaces', emphasis: true }],
      paragraphs: [
        [{ text: 'Blindsndrapery.com delivers comprehensive window covering solutions tailored for both single-family residences and large-scale commercial properties.' }],
        [{ text: 'We support projects of every size, ensuring consistent quality and service whether outfitting a single room or an entire multi-unit complex.' }],
      ],
    },
    installation: {
      eyebrow: 'INSTALLATION',
      heading: 'Direct-to-Consumer Quoting & Statewide Installation',
      description:
        [[{ text: 'Skip the traditional retail sales process and work directly with our team from your first enquiry through installation. We manage every step in-house — measurement, fabrication, and scheduling — backed by our vetted installation partners across key Broward County locations, so you have a single point of contact and consistent accountability from start to finish.' }]],
      features: [
        {
          icon: {
            src: 'https://www.figma.com/api/mcp/asset/4eee8fc1-6faa-4f40-892c-09b33d8d825a.svg',
            alt: '',
          },
          label: 'Single-Point Accountability',
        },
        {
          icon: {
            src: 'https://www.figma.com/api/mcp/asset/e57c758e-78d1-4d04-b8c9-aa2842098ea1.svg',
            alt: '',
          },
          label: 'Statewide Installation',
        },
        {
          icon: {
            src: 'https://www.figma.com/api/mcp/asset/a741ecfa-abb1-487d-b7f4-f41eca888b58.svg',
            alt: '',
          },
          label: 'Free Estimate',
        },
        {
          icon: {
            src: 'https://www.figma.com/api/mcp/asset/d2bbf8a3-e810-4beb-b375-60f8f32339f9.svg',
            alt: '',
          },
          label: 'Fort Lauderdale',
        },
      ],
    },
    team: {
      badges: [
        {
          icon: {
            src: 'https://www.figma.com/api/mcp/asset/d9da426a-ea1f-442f-a535-3a619c0a21de.svg',
            alt: '',
          },
          label: 'Licensed & Insured',
        },
        {
          icon: {
            src: 'https://www.figma.com/api/mcp/asset/26ed175e-1079-4a4d-8ed7-f5653c10598c.svg',
            alt: '',
          },
          label: 'BBB A+ Accredited',
        },
        {
          icon: {
            src: 'https://www.figma.com/api/mcp/asset/012d4938-0c82-4906-975a-cb942425c3cc.svg',
            alt: '',
          },
          label: 'Years in Business',
        },
        {
          icon: {
            src: 'https://www.figma.com/api/mcp/asset/9464232d-78ee-4baa-a60c-42e9dc387c4a.svg',
            alt: '',
          },
          label: '5–10yr Manufacturer Guarantee',
        },
      ],
      members: [
        {
          image: {
            src: 'https://www.figma.com/api/mcp/asset/245cad30-6b14-45e3-810d-593b9d1d17de.png',
            alt: 'Team member portrait',
          },
          name: 'Name',
          role: 'Role description',
        },
        {
          image: {
            src: 'https://www.figma.com/api/mcp/asset/245cad30-6b14-45e3-810d-593b9d1d17de.png',
            alt: 'Team member portrait',
          },
          name: 'Name',
          role: 'Role description',
        },
        {
          image: {
            src: 'https://www.figma.com/api/mcp/asset/245cad30-6b14-45e3-810d-593b9d1d17de.png',
            alt: 'Team member portrait',
          },
          name: 'Name',
          role: 'Role description',
        },
        {
          image: {
            src: 'https://www.figma.com/api/mcp/asset/245cad30-6b14-45e3-810d-593b9d1d17de.png',
            alt: 'Team member portrait',
          },
          name: 'Name',
          role: 'Role description',
        },
      ],
    },
  },

  resourcesPage: {
    heading: 'Window Treatment Tips & Industry Insights',
    description:
      [[{ text: 'Explore expert installation tips, detailed product comparisons, and the latest Florida home decor trends. Stay informed on smart home integration and get practical advice for commercial window treatments to enhance your space.' }]],
    featured: {
      badge: 'Featured',
      category: 'Blog',
      article: {
        image: {
          src: 'https://www.figma.com/api/mcp/asset/750f3c20-a0cb-483f-8b00-818520cc6a3f.png',
          alt: 'Modern living room with large windows and natural light',
        },
        title: '5 Ways to Protect Your Florida Home from UV Damage',
        description:
          'Solar shades provide a critical barrier against intense Florida sunlight, preserving your interior furniture and flooring. Learn how the right UV protection ratings can significantly extend the life of your home investments.',
        date: 'JULY 15, 2025',
        href: '/resources/5-ways-to-protect-your-florida-home-from-uv-damage',
      },
    },
    articles: [
      {
        image: {
          src: 'https://www.figma.com/api/mcp/asset/3d891a94-3602-41dc-8a3e-bd28b9c2ac38.png',
          alt: 'Elegant kitchen with patterned blinds on windows',
        },
        title: 'Choosing the Right Blinds for High-Humidity Rooms',
        description:
          'Solar shades provide a critical barrier against intense Florida sunlight, preserving your interior furniture and flooring. Learn how the right UV protection ratings can significantly extend the life of your home investments.',
        date: 'July 2026',
        href: '/resources/choosing-the-right-blinds-for-high-humidity-rooms',
      },
      {
        image: {
          src: 'https://www.figma.com/api/mcp/asset/ee8e1302-c513-4fff-a95e-6a569cb2228b.png',
          alt: 'Person using smartphone to control motorized shades',
        },
        title: 'Smart Home Integration: Motorized Shades 101',
        description:
          'Solar shades provide a critical barrier against intense Florida sunlight, preserving your interior furniture and flooring. Learn how the right UV protection ratings can significantly extend the life of your home investments.',
        date: 'July 2026',
        href: '/resources/smart-home-integration-motorized-shades-101',
      },
    ],
  },
  knowledgeBasePage: {
    heading: 'Window Treatment Knowledge Base',
    subtitle: [[{ text: 'Expert answers to common window treatment questions.' }]],
    articles: [
      {
        category: 'Maintenance Tips',
        title: 'How to Maintain Your Window Treatments Year-Round',
        description:
          'Regular maintenance extends the life of your blinds and shades. Learn simple seasonal routines that keep your window treatments looking fresh and functioning smoothly in Florida\'s climate.',
        href: '/knowledge-base/maintenance-tips',
      },
      {
        category: 'Cleaning Guidelines',
        title: 'The Ultimate Guide to Cleaning Blinds & Shades',
        description:
          'From dusting to deep cleaning, discover the best methods for every type of window treatment. Our expert tips help you maintain pristine blinds without risking damage to delicate materials.',
        href: '/knowledge-base/cleaning-guidelines',
      },
      {
        category: 'Choosing Blinds',
        title: 'How to Choose the Perfect Blinds for Every Room',
        description:
          'Selecting the right blinds involves balancing light control, privacy, and style. This comprehensive guide walks you through material options, sizing considerations, and design tips for each space.',
        href: '/knowledge-base/choosing-blinds',
      },
      {
        category: 'Fabric Care Guide',
        title: 'Caring for Fabric Window Treatments in Humid Climates',
        description:
          'Florida\'s humidity presents unique challenges for fabric shades and drapes. Learn proven techniques to prevent mold, fading, and wear while keeping your treatments looking beautiful.',
        href: '/knowledge-base/fabric-care',
      },
      {
        category: 'Wooden Blinds Tutorial',
        title: 'Everything You Need to Know About Wooden Blinds',
        description:
          'Wooden blinds add warmth and character to any room. Explore the differences between real wood and faux wood options, learn about finishing techniques, and find the perfect style for your home.',
        href: '/knowledge-base/wooden-blinds',
      },
      {
        category: 'Window Treatment Styles',
        title: 'Trending Window Treatment Styles for Modern Homes',
        description:
          'Stay current with the latest design trends in window coverings. From minimalist roller shades to layered treatments, discover styles that complement contemporary Florida interiors.',
        href: '/knowledge-base/treatment-styles',
      },
    ],
  },
  blogArticlePage: {
    breadcrumb: 'HOME > BLOG > 5 Ways to Protect Your Florida Home from UV Damage',
    heroImage: {
      src: 'https://www.figma.com/api/mcp/asset/99427000-8259-43d3-9359-46cf1295b1fa.png',
      alt: 'Modern living room with large windows overlooking a pool and tropical landscape',
    },
    heroBadge: 'Featured',
    date: 'JULY 15, 2025',
    author: {
      name: 'Professional Name',
      avatar: {
        src: 'https://www.figma.com/api/mcp/asset/cec6e836-c931-4680-b22e-6cecd8f7b27e.png',
        alt: 'Author portrait',
      },
    },
    readTime: '05 MIN READ',
    title: '5 Ways to Protect Your Florida Home from UV Damage',
    blocks: [
      {
        type: 'intro',
        paragraphs: [
          [{ text: 'Florida sunshine is one of the reasons people love living in the state. Bright natural light can make a home feel warm, spacious, and welcoming. However, constant exposure to intense sunlight can also cause gradual UV damage to your home\'s interiors.' }],
          [{ text: 'Over time, UV rays can contribute to fading furniture, flooring, rugs, artwork, and fabrics. Direct sunlight can also create uncomfortable glare and increase indoor heat, making your air-conditioning system work harder.' }],
          [{ text: 'Fortunately, protecting your home does not mean blocking out natural light completely. With the right window treatments and a few practical strategies, you can enjoy the sunshine while helping protect your interiors.' }],
          [{ text: 'Here are five effective ways to protect your Florida home from UV damage.' }],
        ],
        image: {
          src: 'https://www.figma.com/api/mcp/asset/40d5295f-1f60-416e-be2f-27a6f3777832.png',
          alt: 'Window with blinds filtering sunlight in a modern room',
        },
      },
      {
        type: 'heading',
        text: '1. Install UV-Blocking Window Treatments',
      },
      {
        type: 'text',
        paragraphs: [
          [{ text: 'Your windows are one of the primary ways sunlight enters your home. Large windows, sliding glass doors, and floor-to-ceiling glass can expose interiors to significant amounts of sunlight throughout the day.' }],
          [{ text: 'UV-blocking window treatments can help reduce the amount of harmful sunlight reaching your interior spaces. Depending on the fabric and design, blinds and shades can filter sunlight while still allowing comfortable levels of natural light into your home.' }],
          [{ text: 'This protection is particularly valuable for rooms containing expensive furniture, hardwood flooring, artwork, or delicate fabrics. When choosing window treatments, consider the direction your windows face. South- and west-facing windows may receive stronger sunlight during certain parts of the day and could benefit from additional solar protection.' }],
        ],
      },
      {
        type: 'pullQuote',
        text: 'The goal isn\'t necessarily to eliminate sunlight. Instead, choose a solution that provides the right balance of natural light, UV protection, privacy, and visibility.',
      },
      {
        type: 'image',
        image: {
          src: 'https://www.figma.com/api/mcp/asset/0f4927d2-c64b-4453-bb4a-48372835c610.png',
          alt: 'Elegant living space with premium window treatments installed',
        },
      },
      {
        type: 'heading',
        text: '2. Protect Furniture, Flooring, and Décor',
      },
      {
        type: 'text',
        paragraphs: [
          [{ text: 'UV damage often happens slowly, making it easy to overlook until the effects become noticeable. A sofa positioned near a sunny window may gradually fade. Hardwood flooring can develop uneven coloration when one area receives more sunlight than another. Rugs, curtains, artwork, and photographs can also lose their original appearance after prolonged exposure.' }],
          [{ text: 'Protecting your interior furnishings from direct sunlight can help preserve their appearance and extend their lifespan. One simple approach is to rearrange particularly sensitive items away from direct sunlight. However, furniture placement isn\'t always practical, especially in smaller rooms or homes with large windows.' }],
          [{ text: 'This is where adjustable window treatments become especially useful. Shades and blinds allow you to control sunlight during the brightest parts of the day without permanently changing your room layout. For homeowners who have invested in premium furniture, flooring' }],
        ],
      },
      {
        type: 'pullQuote',
        text: 'Lastly, educate yourself and your family about the importance of UV protection. Understanding the risks associated with prolonged UV exposure can motivate everyone to take proactive measures. Regularly check UV index levels and plan outdoor activities accordingly. By combining these strategies, you can effectively safeguard your Florida home from UV damage, ensuring a comfortable and stylish living environment.',
      },
    ],
  },
  knowledgeArticlePage: {
    breadcrumb: 'HOME > BLOG > 5 Ways to Protect Your Florida Home from UV Damage',
    heroImage: {
      src: '/images/resources/knowledge-hero.webp',
      alt: 'Modern living room with large windows overlooking tropical landscape',
    },
    categoryTag: 'Blog',
    date: 'JULY 15, 2025',
    readTime: '05 MIN READ',
    title: '5 Ways to Protect Your Florida Home from UV Damage',
    blocks: [
      {
        type: 'section',
        heading: '1. Install UV-Blocking Window Treatments',
        paragraphs: [
          [{ text: 'Your windows are one of the primary ways sunlight enters your home. Large windows, sliding glass doors, and floor-to-ceiling glass can expose interiors to significant amounts of sunlight throughout the day.' }],
          [{ text: 'UV-blocking window treatments can help reduce the amount of harmful sunlight reaching your interior spaces. Depending on the fabric and design, blinds and shades can filter sunlight while still allowing comfortable levels of natural light into your home.' }],
          [{ text: 'This protection is particularly valuable for rooms containing expensive furniture, hardwood flooring, artwork, or delicate fabrics. When choosing window treatments, consider the direction your windows face. South- and west-facing windows may receive stronger sunlight during certain parts of the day and could benefit from additional solar protection.' }],
        ],
      },
      {
        type: 'section',
        heading: '2. Protect Furniture, Flooring, and Décor',
        paragraphs: [
          [{ text: 'UV damage often happens slowly, making it easy to overlook until the effects become noticeable. A sofa positioned near a sunny window may gradually fade. Hardwood flooring can develop uneven coloration when one area receives more sunlight than another. Rugs, curtains, artwork, and photographs can also lose their original appearance after prolonged exposure.' }],
          [{ text: 'Protecting your interior furnishings from direct sunlight can help preserve their appearance and extend their lifespan. One simple approach is to rearrange particularly sensitive items away from direct sunlight. However, furniture placement isn\'t always practical, especially in smaller rooms or homes with large windows.' }],
          [{ text: 'This is where adjustable window treatments become especially useful. Shades and blinds allow you to control sunlight during the brightest parts of the day without permanently changing your room layout. For homeowners who have invested in premium furniture, flooring' }],
        ],
      },
      {
        type: 'section',
        heading: '3. Consider Window Films and Coatings',
        paragraphs: [
          [{ text: 'UV damage often happens slowly, making it easy to overlook until the effects become noticeable. A sofa positioned near a sunny window may gradually fade. Hardwood flooring can develop uneven coloration when one area receives more sunlight than another. Rugs, curtains, artwork, and photographs can also lose their original appearance after prolonged exposure.' }],
          [{ text: 'Protecting your interior furnishings from direct sunlight can help preserve their appearance and extend their lifespan. One simple approach is to rearrange particularly sensitive items away from direct sunlight. However, furniture placement isn\'t always practical, especially in smaller rooms or homes with large windows.' }],
          [{ text: 'This is where adjustable window treatments become especially useful. Shades and blinds allow you to control sunlight during the brightest parts of the day without permanently changing your room layout. For homeowners who have invested in premium furniture, flooring' }],
        ],
      },
      {
        type: 'imageGrid',
        images: [
          { src: '/images/resources/knowledge-grid-1.webp', alt: 'Modern home with elegant window treatments' },
          { src: '/images/resources/knowledge-grid-2.webp', alt: 'Interior room with UV-blocking blinds installed' },
          { src: '/images/resources/knowledge-grid-3.webp', alt: 'Living space featuring protective window shades' },
        ],
      },
      {
        type: 'section',
        heading: '4. Create a Comprehensive Protection Plan',
        paragraphs: [
          [{ text: 'UV damage often happens slowly, making it easy to overlook until the effects become noticeable. A sofa positioned near a sunny window may gradually fade. Hardwood flooring can develop uneven coloration when one area receives more sunlight than another. Rugs, curtains, artwork, and photographs can also lose their original appearance after prolonged exposure.' }],
          [{ text: 'Protecting your interior furnishings from direct sunlight can help preserve their appearance and extend their lifespan. One simple approach is to rearrange particularly sensitive items away from direct sunlight. However, furniture placement isn\'t always practical, especially in smaller rooms or homes with large windows.' }],
          [{ text: 'This is where adjustable window treatments become especially useful. Shades and blinds allow you to control sunlight during the brightest parts of the day without permanently changing your room layout. For homeowners who have invested in premium furniture, flooring' }],
        ],
      },
    ],
  },
  cityPage: {
    hero: {
      breadcrumb: 'HOME > SERVICES',
      heading: 'We proudly serve all South Florida communities',
      subheading: 'Enhance your South Florida home with elegant blinds and shades now!',
      ctaLabel: 'Book consultation',
      ctaHref: '#quote-form',
      backgroundImage: {
        src: '/images/city/hero-bg.webp',
        alt: 'Aerial view of South Florida waterfront community with palm trees',
      },
    },
    serviceGrid: {
      eyebrow: 'SERVICE GLIMPSE',
      headingSegments: [
        { text: 'Discover the ' },
        { text: 'Best', emphasis: true },
        { text: ' in Modern ' },
        { text: 'Window Blinds, Shades & Drapery', emphasis: true },
      ],
      summary:
        [[{ text: 'Blinds · Shades · Drapery & Curtains · Shutters · Motorized Systems & Smart Home Integration · Repairs & Maintenance' }]],
      cards: [
        {
          image: { src: '/images/city/service-blinds.webp', alt: 'Modern window blinds in a bright living space' },
          title: 'Blinds',
          description: 'Versatile light control with timeless wood, faux wood, and aluminum configurations.',
          href: '/services/blinds',
        },
        {
          image: { src: '/images/city/service-shades.webp', alt: 'Roller shades on a large window' },
          title: 'Shades',
          description: 'Versatile light control with timeless wood, faux wood, and aluminum configurations.',
          href: '/services/shades',
        },
        {
          image: { src: '/images/city/service-drapery.webp', alt: 'Elegant drapery and curtains in a living room' },
          title: 'Drapery & Curtains',
          description: 'Versatile light control with timeless wood, faux wood, and aluminum configurations.',
          href: '/services/drapery',
        },
        {
          image: { src: '/images/city/service-shutters.webp', alt: 'Interior shutters on a hallway window' },
          title: 'Shutters',
          description: 'Versatile light control with timeless wood, faux wood, and aluminum configurations.',
          href: '/services/shutters',
        },
        {
          image: { src: '/images/city/service-motorized.webp', alt: 'Smart motorized blinds with home automation controls' },
          title: 'Smart & Motorized Home',
          description: 'Versatile light control with timeless wood, faux wood, and aluminum configurations.',
          href: '/services/motorized',
        },
        {
          image: { src: '/images/city/service-repairs.webp', alt: 'Technician installing window blinds' },
          title: 'Repairs & Maintenance',
          description: 'Versatile light control with timeless wood, faux wood, and aluminum configurations.',
          href: '/services/repairs',
        },
      ],
    },
    consultation: {
      eyebrow: 'BOOK CONSULTATION',
      heading: 'Schedule Your Consultation',
      description:
        [[{ text: 'Complete the form below and one of our experts will provide a preliminary estimate for your project. No pressure, just professional data to help you plan.' }]],
      ctaLabel: 'Send my estimate request',
    },
  },
  freeQuotePage: {
    hero: {
      breadcrumb: 'HOME > FREE QUOTE',
      heading: 'Get Your Free Quote Today',
      subheading: 'Serving Broward County and South Florida — expanding to additional states soon.',
    },
    process: {
      eyebrow: 'PROCESS',
      headingSegments: [{ text: "Here's How " }, { text: 'It Works', emphasis: true }],
      subtitle:
        [[{ text: 'Blinds · Shades · Drapery & Curtains · Shutters · Motorized Systems & Smart Home Integration · Repairs & Maintenance' }]],
      steps: [
        {
          number: '01',
          title: 'Submit your estimate request online — instantly',
          description:
            'Easily submit your estimate request online and receive a prompt, personalized quote tailored to your project needs.',
        },
        {
          number: '02',
          title: 'What happens after submission: call? email? automated response?',
          description:
            'Easily submit your estimate request online and receive a prompt, personalized quote tailored to your project needs.',
        },
        {
          number: '03',
          title: 'Our local installer visits your property for exact measurements',
          description:
            'Easily submit your estimate request online and receive a prompt, personalized quote tailored to your project needs.',
        },
        {
          number: '04',
          title: 'You receive a detailed quote',
          description:
            'Easily submit your estimate request online and receive a prompt, personalized quote tailored to your project needs.',
        },
        {
          number: '05',
          title: 'We arrange custom fabrication and professional installation',
          description:
            'Easily submit your estimate request online and receive a prompt, personalized quote tailored to your project needs.',
        },
      ],
    },
    processIntro: {
      eyebrow: 'PROCESS INTRODUCTION',
      headingSegments: [{ text: 'In-home measurement, installation, or ' }, { text: 'digital process. Autoplay muted.', emphasis: true }],
      description:
        [[{ text: 'Start with a free in-home consultation, followed by precise measurements. Next, we craft your custom blinds with care, and finally, our expert team handles the flawless installation.' }]],
      image: {
        src: '/images/free-quote/process-intro.webp',
        alt: 'Technician adjusting white venetian blinds by a sunlit window',
      },
    },
    form: {
      eyebrow: 'Quote form',
      headingSegments: [{ text: 'Request Your ' }, { text: 'Estimate Quickly', emphasis: true }],
      subtitle: [[{ text: 'Fill out the form below and our team will contact you within 24 hours' }]],
      nameLabel: 'Name',
      namePlaceholder: 'John Doe',
      emailLabel: 'Email',
      emailPlaceholder: 'john@example.com',
      phoneLabel: 'Phone',
      phonePlaceholder: '+ (954) 555-1234',
      serviceLabel: 'Service Interest',
      servicePlaceholder: 'Select a category',
      serviceOptions: [
        'Blinds',
        'Shades',
        'Curtains & Drapery',
        'Shutters',
        'Motorized Systems & Smart Home',
        'Repairs & Maintenance',
      ],
      projectLabel: 'Tell us about your Project',
      projectPlaceholder: 'Tell us about your project....',
      submitLabel: 'Request My Free Quote',
      assistanceHeading: 'Need immediate assistance?',
      callLabel: 'Call',
      callNumber: '424-777-2140',
      textLabel: 'Text us',
      trustLine: 'Licensed & Insured · No obligation · We come to you',
    },
  },
  legalPage: {
    heading: 'Privacy Policy / Terms & Conditions',
    paragraphs: [
      [{ text: 'Welcome to the Blinds & Drapery Privacy Policy and Terms of Service. This document details the conditions for using our expert window treatment solutions, including bespoke blinds, stylish drapery, expert installation, and reliable maintenance. By choosing our services, you agree to adhere to all relevant laws and regulations governing our industry and your use of our products.' }],
      [{ text: 'At Blinds & Drapery, your privacy is paramount. We gather only the essential information needed to provide and improve our offerings, such as your contact information, design preferences, and payment details. All personal data is stored securely with state-of-the-art encryption and protection protocols.' }],
      [{ text: 'We do not share your personal information with third parties except when necessary to process your orders, comply with legal obligations, or protect our rights. We are dedicated to openness and will notify you promptly of any changes to this policy or any data-related incidents.' }],
      [{ text: 'By continuing to use Blinds & Drapery services, you accept the terms outlined here. We recommend reviewing this policy regularly to stay updated on how we safeguard your privacy and rights. For any questions or concerns, our customer support team is ready to assist you.' }],
      [{ text: 'Thank you for trusting Blinds & Drapery to bring elegance and privacy to your home.' }],
    ],
    noindex: true,
  },
};

const knowledgeArticles: Record<string, KnowledgeArticlePageContent> = {
  'maintenance-tips': {
    breadcrumb: 'HOME > KNOWLEDGE BASE > How to Maintain Your Window Treatments Year-Round',
    heroImage: {
      src: '/images/resources/knowledge-hero.webp',
      alt: 'Well-maintained window treatments in a bright living room',
    },
    categoryTag: 'Maintenance Tips',
    date: 'JUNE 20, 2025',
    readTime: '06 MIN READ',
    title: 'How to Maintain Your Window Treatments Year-Round',
    blocks: [
      {
        type: 'section',
        heading: '1. Establish a Regular Dusting Routine',
        paragraphs: [
          [{ text: 'Dust is one of the most common enemies of window treatments. In Florida\'s humid climate, dust can combine with moisture and create stubborn residue that becomes increasingly difficult to remove over time.' }],
          [{ text: 'For blinds and shutters, use a microfiber cloth or a specialized blind duster to wipe each slat individually. Work from top to bottom to prevent redistributing dust onto already-cleaned surfaces. For fabric shades and drapes, a vacuum with a soft brush attachment works best.' }],
          [{ text: 'Aim to dust your window treatments at least once every two weeks. High-traffic rooms or homes near the coast may benefit from weekly attention due to increased dust and salt air exposure.' }],
        ],
      },
      {
        type: 'section',
        heading: '2. Seasonal Deep Cleaning',
        paragraphs: [
          [{ text: 'Beyond regular dusting, schedule a thorough deep cleaning at least twice a year — ideally at the start of Florida\'s dry season and again before the humid summer months arrive.' }],
          [{ text: 'For aluminum and faux wood blinds, you can remove them and soak in a bathtub with mild soap. Real wood blinds should never be soaked — instead, use a damp cloth with wood-safe cleaner. Fabric treatments may benefit from professional cleaning, especially if they\'ve absorbed cooking odors or pet dander.' }],
          [{ text: 'Deep cleaning not only improves appearance but also extends the functional lifespan of your window treatments by preventing material degradation from built-up grime.' }],
        ],
      },
      {
        type: 'section',
        heading: '3. Inspect Hardware and Mechanisms',
        paragraphs: [
          [{ text: 'Window treatment hardware — brackets, cords, chains, and motorized components — needs periodic inspection to ensure smooth operation. A stuck cord or misaligned bracket can cause uneven wear on your blinds or shades.' }],
          [{ text: 'Check that all mounting brackets are secure and that the treatments hang level. For corded systems, inspect for fraying or tangling. Motorized systems should have their batteries replaced or recharged according to manufacturer guidelines.' }],
          [{ text: 'Addressing small mechanical issues early prevents costly replacements down the line and keeps your window treatments operating safely.' }],
        ],
      },
      {
        type: 'imageGrid',
        images: [
          { src: '/images/resources/knowledge-grid-1.webp', alt: 'Person cleaning window blinds with microfiber cloth' },
          { src: '/images/resources/knowledge-grid-2.webp', alt: 'Well-maintained interior shutters in a sunlit room' },
          { src: '/images/resources/knowledge-grid-3.webp', alt: 'Close-up of window treatment hardware inspection' },
        ],
      },
      {
        type: 'section',
        heading: '4. Protect Against Humidity and Mold',
        paragraphs: [
          [{ text: 'Florida\'s humidity presents a unique challenge for window treatment maintenance. Excess moisture can lead to mold growth, fabric discoloration, and warping of wood components.' }],
          [{ text: 'Ensure adequate ventilation in rooms with fabric window treatments. In bathrooms and kitchens, consider moisture-resistant materials like faux wood or aluminum. If you notice any signs of mold, address it immediately with a mild bleach solution for hard surfaces or professional cleaning for fabrics.' }],
          [{ text: 'Running a dehumidifier during the wettest months can significantly reduce moisture-related damage across all your window treatments.' }],
        ],
      },
    ],
  },
  'cleaning-guidelines': {
    breadcrumb: 'HOME > KNOWLEDGE BASE > The Ultimate Guide to Cleaning Blinds & Shades',
    heroImage: {
      src: '/images/resources/knowledge-hero.webp',
      alt: 'Sparkling clean blinds in a modern Florida home',
    },
    categoryTag: 'Cleaning Guidelines',
    date: 'MAY 28, 2025',
    readTime: '07 MIN READ',
    title: 'The Ultimate Guide to Cleaning Blinds & Shades',
    blocks: [
      {
        type: 'section',
        heading: '1. Understanding Different Material Needs',
        paragraphs: [
          [{ text: 'Not all window treatments should be cleaned the same way. The material of your blinds or shades determines the best cleaning approach, and using the wrong method can cause permanent damage.' }],
          [{ text: 'Wood blinds are sensitive to moisture and should only be cleaned with a dry or slightly damp cloth. Faux wood and vinyl can handle more moisture, making them ideal for kitchens and bathrooms. Aluminum blinds are the most durable and can even be soaked in water for deep cleaning.' }],
          [{ text: 'Fabric shades require the gentlest approach — spot cleaning with appropriate fabric cleaners is usually safest. Always test any cleaning solution on a small, inconspicuous area first.' }],
        ],
      },
      {
        type: 'section',
        heading: '2. Daily and Weekly Maintenance',
        paragraphs: [
          [{ text: 'The key to keeping blinds and shades looking their best is consistent, light maintenance rather than infrequent heavy cleaning sessions.' }],
          [{ text: 'Daily, close your blinds fully and give them a quick once-over with a feather duster or dry microfiber cloth. Weekly, use a vacuum with a brush attachment on fabric shades, running it gently along each fold or pleat.' }],
          [{ text: 'For horizontal blinds, close them in one direction, dust, then reverse and dust again to reach both sides of each slat. This simple routine prevents dust buildup that leads to more intensive cleaning needs.' }],
        ],
      },
      {
        type: 'section',
        heading: '3. Deep Cleaning Techniques',
        paragraphs: [
          [{ text: 'When regular dusting is no longer enough, it\'s time for a deeper clean. Remove blinds from their brackets and lay them flat on a clean surface or hang them on a clothesline outdoors.' }],
          [{ text: 'For non-fabric treatments, fill a bathtub or large basin with warm water and a few drops of mild dish soap. Submerge the blinds and let them soak for 15-20 minutes. Use a soft sponge to gently scrub each slat, paying extra attention to the bottom slats that collect the most grime.' }],
          [{ text: 'Rinse thoroughly with clean water and allow to dry completely before rehanging. Never rehang damp blinds, as trapped moisture can promote mold growth — especially important in Florida\'s humid environment.' }],
        ],
      },
      {
        type: 'imageGrid',
        images: [
          { src: '/images/resources/knowledge-grid-1.webp', alt: 'Cleaning supplies arranged for blind maintenance' },
          { src: '/images/resources/knowledge-grid-2.webp', alt: 'Freshly cleaned roller shades in a bedroom' },
          { src: '/images/resources/knowledge-grid-3.webp', alt: 'Professional deep cleaning of fabric drapes' },
        ],
      },
      {
        type: 'section',
        heading: '4. When to Call a Professional',
        paragraphs: [
          [{ text: 'Some cleaning jobs are best left to professionals. Delicate fabrics, motorized systems with integrated components, and heavily soiled treatments may require specialized equipment and expertise.' }],
          [{ text: 'Professional cleaning services use ultrasonic cleaning technology that can remove deep-set dirt without the agitation that damages delicate materials. They can also treat stains, apply UV protectants, and identify early signs of wear.' }],
          [{ text: 'As a rule of thumb, if your window treatments haven\'t been cleaned in over a year, or if you notice persistent odors or visible staining, a professional cleaning is a worthwhile investment.' }],
        ],
      },
    ],
  },
  'choosing-blinds': {
    breadcrumb: 'HOME > KNOWLEDGE BASE > How to Choose the Perfect Blinds for Every Room',
    heroImage: {
      src: '/images/resources/knowledge-hero.webp',
      alt: 'Variety of blind samples displayed in a showroom',
    },
    categoryTag: 'Choosing Blinds',
    date: 'APRIL 10, 2025',
    readTime: '08 MIN READ',
    title: 'How to Choose the Perfect Blinds for Every Room',
    blocks: [
      {
        type: 'section',
        heading: '1. Assess Your Room\'s Primary Function',
        paragraphs: [
          [{ text: 'The purpose of each room should drive your blind selection. A bedroom prioritizes blackout capability and privacy, while a living room may favor filtered natural light and aesthetic appeal.' }],
          [{ text: 'Kitchens and bathrooms need moisture-resistant materials that can handle steam and splashes. Home offices benefit from blinds that reduce glare on screens while maintaining comfortable ambient light levels.' }],
          [{ text: 'Consider how you use the room throughout the day. A south-facing family room might need adjustable blinds that can handle intense afternoon sun, while a north-facing study may need treatments that maximize the softer light available.' }],
        ],
      },
      {
        type: 'section',
        heading: '2. Material Matters',
        paragraphs: [
          [{ text: 'Your choice of material affects durability, maintenance, appearance, and cost. Real wood blinds offer warmth and natural beauty but are susceptible to humidity damage — a critical consideration in Florida.' }],
          [{ text: 'Faux wood provides a similar aesthetic with significantly better moisture resistance, making it the most popular choice for Florida homes. Aluminum blinds are lightweight, affordable, and ideal for contemporary spaces or high-humidity areas.' }],
          [{ text: 'Fabric blinds and cellular shades offer excellent insulation and a soft, elegant look. They\'re particularly effective at reducing energy costs by creating an insulating air pocket between the window and the room.' }],
        ],
      },
      {
        type: 'section',
        heading: '3. Sizing and Mounting Options',
        paragraphs: [
          [{ text: 'Proper sizing is crucial for both appearance and function. Inside-mount blinds fit within the window frame for a clean, built-in look, while outside-mount blinds cover the entire frame and can make windows appear larger.' }],
          [{ text: 'Measure each window individually — even windows that appear identical can vary by fractions of an inch, which matters for inside mounts. Width should be measured at the top, middle, and bottom; use the narrowest measurement.' }],
          [{ text: 'For depth, check that your window frame is deep enough for an inside mount. Most blinds need at least 2-3 inches of depth. If your frames are too shallow, outside mount is the better option.' }],
        ],
      },
      {
        type: 'imageGrid',
        images: [
          { src: '/images/resources/knowledge-grid-1.webp', alt: 'Real wood blinds in a traditional living room' },
          { src: '/images/resources/knowledge-grid-2.webp', alt: 'Faux wood blinds installed in a modern bathroom' },
          { src: '/images/resources/knowledge-grid-3.webp', alt: 'Cellular shades providing insulation in a bedroom' },
        ],
      },
      {
        type: 'section',
        heading: '4. Light Control and Privacy Features',
        paragraphs: [
          [{ text: 'Different blind types offer varying degrees of light control. Venetian blinds allow precise angle adjustment for filtering light throughout the day. Roller shades come in light-filtering and blackout varieties.' }],
          [{ text: 'For maximum versatility, consider top-down/bottom-up shades that let you adjust coverage from either direction — allowing natural light from above while maintaining privacy at eye level.' }],
          [{ text: 'Layering treatments (such as sheer shades behind drapes) gives you the most flexibility, letting you shift between full light, filtered light, and complete privacy without compromising on style.' }],
        ],
      },
    ],
  },
  'fabric-care': {
    breadcrumb: 'HOME > KNOWLEDGE BASE > Caring for Fabric Window Treatments in Humid Climates',
    heroImage: {
      src: '/images/resources/knowledge-hero.webp',
      alt: 'Elegant fabric drapes in a coastal Florida home',
    },
    categoryTag: 'Fabric Care Guide',
    date: 'MARCH 15, 2025',
    readTime: '06 MIN READ',
    title: 'Caring for Fabric Window Treatments in Humid Climates',
    blocks: [
      {
        type: 'section',
        heading: '1. Choose Humidity-Resistant Fabrics',
        paragraphs: [
          [{ text: 'Prevention starts with selection. In Florida\'s subtropical climate, not all fabrics perform equally. Synthetic materials like polyester and acrylic resist moisture absorption far better than natural fibers like cotton or linen.' }],
          [{ text: 'If you prefer natural fabrics for their look and feel, consider blends that combine aesthetic appeal with practical durability. A cotton-polyester blend, for example, offers the softness of cotton with improved moisture resistance.' }],
          [{ text: 'For rooms with the highest humidity exposure — bathrooms, kitchens, and covered patios — look for fabrics specifically rated for high-humidity environments or consider alternatives like faux wood or vinyl.' }],
        ],
      },
      {
        type: 'section',
        heading: '2. Managing Moisture and Preventing Mold',
        paragraphs: [
          [{ text: 'Mold and mildew are the primary threats to fabric window treatments in humid climates. These organisms thrive in warm, moist environments — exactly the conditions found in many Florida rooms.' }],
          [{ text: 'Improve air circulation around your window treatments by leaving a small gap between the fabric and the wall. Avoid bunching or tying back drapes in ways that trap moisture against the fabric.' }],
          [{ text: 'Use a dehumidifier in rooms where you notice condensation on windows. If your windows sweat regularly, the moisture will inevitably transfer to adjacent fabric treatments, creating ideal conditions for mold growth.' }],
        ],
      },
      {
        type: 'section',
        heading: '3. Cleaning and Stain Removal',
        paragraphs: [
          [{ text: 'Regular vacuuming with a soft brush attachment removes dust before it can combine with humidity to create stubborn stains. Focus on folds, pleats, and the bottom hems where dust accumulates most.' }],
          [{ text: 'For spot cleaning, always blot — never rub — to avoid spreading the stain or damaging the fabric weave. Use a cleaning solution appropriate for the specific fabric type and test on a hidden area first.' }],
          [{ text: 'Schedule professional cleaning at least once a year for drapes and curtains. Professional services can treat the fabric with anti-microbial solutions that help prevent mold growth between cleanings.' }],
        ],
      },
      {
        type: 'imageGrid',
        images: [
          { src: '/images/resources/knowledge-grid-1.webp', alt: 'Close-up of humidity-resistant fabric shades' },
          { src: '/images/resources/knowledge-grid-2.webp', alt: 'Proper air circulation around drapes demonstration' },
          { src: '/images/resources/knowledge-grid-3.webp', alt: 'Professional fabric treatment cleaning process' },
        ],
      },
      {
        type: 'section',
        heading: '4. UV Protection for Fabric Longevity',
        paragraphs: [
          [{ text: 'Florida\'s intense sunlight doesn\'t just fade fabrics — it weakens the fibers themselves over time. UV-degraded fabric becomes brittle and can tear or fray even with gentle handling.' }],
          [{ text: 'Consider lining your fabric treatments with UV-blocking liner material. This protects both the treatment itself and the furnishings behind it. Many manufacturers offer UV-protective coatings that can be applied during or after installation.' }],
          [{ text: 'Rotate or reposition fabric treatments periodically to ensure even UV exposure across the full width. This prevents the uneven fading patterns that are telltale signs of sun damage.' }],
        ],
      },
    ],
  },
  'wooden-blinds': {
    breadcrumb: 'HOME > KNOWLEDGE BASE > Everything You Need to Know About Wooden Blinds',
    heroImage: {
      src: '/images/resources/knowledge-hero.webp',
      alt: 'Beautiful wooden blinds in a contemporary living space',
    },
    categoryTag: 'Wooden Blinds Tutorial',
    date: 'FEBRUARY 22, 2025',
    readTime: '07 MIN READ',
    title: 'Everything You Need to Know About Wooden Blinds',
    blocks: [
      {
        type: 'section',
        heading: '1. Real Wood vs. Faux Wood',
        paragraphs: [
          [{ text: 'The first decision when considering wooden blinds is whether to go with genuine wood or faux wood alternatives. Both offer the classic warmth and beauty of wood grain, but they differ significantly in performance and maintenance.' }],
          [{ text: 'Real wood blinds are typically made from basswood, oak, or cherry. They\'re lighter, available in more stain options, and have the authentic look and feel that many homeowners prefer. However, they\'re more susceptible to warping and discoloration in humid environments.' }],
          [{ text: 'Faux wood blinds are made from PVC, composite materials, or vinyl. They\'re heavier but more durable, completely moisture-resistant, and typically cost 20-30% less. For Florida homes, faux wood is often the more practical choice without sacrificing visual appeal.' }],
        ],
      },
      {
        type: 'section',
        heading: '2. Slat Sizes and Their Impact',
        paragraphs: [
          [{ text: 'Wooden blinds come in several slat widths, each creating a different visual effect. The most common sizes are 1 inch, 2 inches, and 2.5 inches.' }],
          [{ text: 'Narrower 1-inch slats create a more refined, traditional look and work well on smaller windows. They provide more precise light control due to the greater number of slats per window.' }],
          [{ text: 'Wider 2-inch and 2.5-inch slats offer a bolder, more contemporary appearance and allow a clearer view when open. They also collect less dust per unit area and are easier to clean. For large windows, wider slats maintain better proportions.' }],
        ],
      },
      {
        type: 'section',
        heading: '3. Finishes and Customization',
        paragraphs: [
          [{ text: 'Wood blinds offer extensive customization options. Stains range from light natural tones to deep espresso, and painted finishes in white, ivory, or custom colors complement any interior design scheme.' }],
          [{ text: 'Decorative tapes — fabric strips that cover the ladder cords — add a design element and come in dozens of colors and patterns. They also hide the small holes where the lift cords pass through each slat.' }],
          [{ text: 'Valances, cornices, and holdbacks provide finishing touches. A contoured or crown valance gives a polished, furniture-like appearance that elevates the entire window treatment.' }],
        ],
      },
      {
        type: 'imageGrid',
        images: [
          { src: '/images/resources/knowledge-grid-1.webp', alt: 'Side-by-side comparison of real wood and faux wood blinds' },
          { src: '/images/resources/knowledge-grid-2.webp', alt: 'Different slat widths displayed on adjacent windows' },
          { src: '/images/resources/knowledge-grid-3.webp', alt: 'Decorative tape options on wooden blinds' },
        ],
      },
      {
        type: 'section',
        heading: '4. Installation and Care Tips',
        paragraphs: [
          [{ text: 'Proper installation is critical for wooden blinds. Ensure your window frame has sufficient depth for inside mounting — most wood blinds require at least 2.75 inches. Verify that the frame is square and level before drilling.' }],
          [{ text: 'For ongoing care, dust regularly with a soft cloth or blind-specific duster. Avoid water on real wood — use a wood-safe cleaner applied to the cloth, not directly to the blinds. Faux wood can handle a damp cloth for heavier cleaning.' }],
          [{ text: 'If real wood blinds begin to show signs of humidity damage (warping or discoloration), consider moving them to a drier room and replacing them with faux wood in the humid location. Early intervention prevents further damage.' }],
        ],
      },
    ],
  },
  'treatment-styles': {
    breadcrumb: 'HOME > KNOWLEDGE BASE > Trending Window Treatment Styles for Modern Homes',
    heroImage: {
      src: '/images/resources/knowledge-hero.webp',
      alt: 'Contemporary styled room with modern window treatments',
    },
    categoryTag: 'Window Treatment Styles',
    date: 'JANUARY 18, 2025',
    readTime: '05 MIN READ',
    title: 'Trending Window Treatment Styles for Modern Homes',
    blocks: [
      {
        type: 'section',
        heading: '1. Minimalist Roller Shades',
        paragraphs: [
          [{ text: 'Clean lines and simplicity define the current trend toward minimalist roller shades. These treatments offer a sleek, unobtrusive look that complements modern and contemporary interiors without competing for attention.' }],
          [{ text: 'Solar roller shades are particularly popular in Florida, providing UV protection while maintaining outward visibility. Available in a range of openness factors (1% to 14%), they let you fine-tune the balance between sun protection and view preservation.' }],
          [{ text: 'Motorized options with smart home integration represent the cutting edge of this category. Voice-controlled or app-scheduled shades that adjust automatically based on time of day or sun position are increasingly standard in new Florida homes.' }],
        ],
      },
      {
        type: 'section',
        heading: '2. Natural and Woven Textures',
        paragraphs: [
          [{ text: 'Organic materials are experiencing a major resurgence in window treatment design. Woven wood shades, bamboo blinds, and jute roller shades bring natural texture and warmth to contemporary spaces.' }],
          [{ text: 'These materials pair beautifully with Florida\'s coastal and tropical design aesthetics. The natural imperfections in woven materials create visual interest that mass-produced alternatives can\'t replicate.' }],
          [{ text: 'For practicality, look for woven options with UV-protective liner backing. This preserves the natural look from the room side while adding the sun protection and privacy that raw natural materials alone can\'t provide.' }],
        ],
      },
      {
        type: 'section',
        heading: '3. Layered Treatment Combinations',
        paragraphs: [
          [{ text: 'The trend toward layering multiple window treatments offers both design flexibility and functional versatility. A common combination pairs sheer curtain panels with cellular shades behind them.' }],
          [{ text: 'Layering allows you to shift between different levels of light, privacy, and insulation throughout the day without changing any single treatment. Sheers soften harsh sunlight; the shade behind provides full blackout when needed.' }],
          [{ text: 'Color coordination across layers creates depth and sophistication. A monochromatic approach (varying shades of the same color) reads as elegant, while contrasting layers make a bolder design statement.' }],
        ],
      },
      {
        type: 'imageGrid',
        images: [
          { src: '/images/resources/knowledge-grid-1.webp', alt: 'Minimalist motorized roller shade in a modern office' },
          { src: '/images/resources/knowledge-grid-2.webp', alt: 'Woven bamboo shades in a coastal living room' },
          { src: '/images/resources/knowledge-grid-3.webp', alt: 'Layered sheer curtains with cellular shades behind' },
        ],
      },
      {
        type: 'section',
        heading: '4. Bold Color and Pattern Revival',
        paragraphs: [
          [{ text: 'After years of neutral dominance, bold colors and patterns are returning to window treatments. Deep jewel tones — emerald, sapphire, and burgundy — add drama and sophistication to rooms that previously played it safe.' }],
          [{ text: 'Geometric patterns and botanical prints on roller shades and roman shades bring personality without requiring a full room redesign. These statement treatments work best when the rest of the room maintains a neutral palette.' }],
          [{ text: 'For those not ready to commit fully, colored trim, banding, and borders on otherwise neutral treatments offer a measured way to incorporate the trend while keeping the flexibility to update the look seasonally.' }],
        ],
      },
    ],
  },
};

// Keyed by WordPress's own post slug (not a shortened/invented one) so a
// route param built from the real CMS uri — see fetchBlogSinglePage's
// `/${slug}/` query — actually matches a live post instead of always
// missing and permanently falling back to this mock content. Old short
// slugs redirect to these in next.config.ts.
const blogArticles: Record<string, BlogArticlePageContent> = {
  '5-ways-to-protect-your-florida-home-from-uv-damage': mockContent.blogArticlePage,
  'choosing-the-right-blinds-for-high-humidity-rooms': {
    breadcrumb: 'HOME > BLOG > Choosing the Right Blinds for High-Humidity Rooms',
    heroImage: {
      src: 'https://www.figma.com/api/mcp/asset/3d891a94-3602-41dc-8a3e-bd28b9c2ac38.png',
      alt: 'Elegant kitchen with patterned blinds on windows',
    },
    heroBadge: 'Latest',
    date: 'JULY 2026',
    author: {
      name: 'Professional Name',
      avatar: {
        src: 'https://www.figma.com/api/mcp/asset/cec6e836-c931-4680-b22e-6cecd8f7b27e.png',
        alt: 'Author portrait',
      },
    },
    readTime: '06 MIN READ',
    title: 'Choosing the Right Blinds for High-Humidity Rooms',
    blocks: [
      {
        type: 'intro',
        paragraphs: [
          [{ text: 'Bathrooms, kitchens, laundry rooms, and covered patios all share one common challenge: elevated moisture levels. Standard window treatments that perform beautifully in a living room can warp, discolor, or develop mold within months when exposed to persistent humidity.' }],
          [{ text: 'In Florida, where outdoor humidity regularly exceeds 70%, even interior rooms can feel the effects — especially those with poor ventilation or proximity to water sources.' }],
          [{ text: 'Choosing the right blinds for these spaces means prioritizing materials and designs that shrug off moisture while still delivering the style and light control you expect from quality window treatments.' }],
          [{ text: 'Here\'s what you need to know to make the right choice.' }],
        ],
        image: {
          src: 'https://www.figma.com/api/mcp/asset/3d891a94-3602-41dc-8a3e-bd28b9c2ac38.png',
          alt: 'Modern bathroom with moisture-resistant blinds',
        },
      },
      {
        type: 'heading',
        text: '1. Why Humidity Destroys Standard Blinds',
      },
      {
        type: 'text',
        paragraphs: [
          [{ text: 'Real wood blinds are the most vulnerable to humidity damage. Wood absorbs moisture from the air, causing slats to swell, warp, and eventually crack. The finish can bubble or peel, and trapped moisture creates ideal conditions for mold growth.' }],
          [{ text: 'Fabric shades face similar risks. Natural fibers absorb moisture and can develop musty odors, mildew spots, and structural weakness. Even with regular cleaning, fabric treatments in high-humidity rooms tend to degrade faster than their expected lifespan.' }],
          [{ text: 'Even metal components aren\'t immune — steel hardware can rust, and the cords in corded systems can weaken and fray when exposed to persistent moisture.' }],
        ],
      },
      {
        type: 'heading',
        text: '2. Best Materials for Wet Environments',
      },
      {
        type: 'text',
        paragraphs: [
          [{ text: 'Faux wood blinds top the list for high-humidity rooms. Made from PVC or composite materials, they\'re completely impervious to moisture. Modern faux wood options are nearly indistinguishable from real wood, offering the same warmth and elegance without the vulnerability.' }],
          [{ text: 'Aluminum blinds are another excellent choice — lightweight, rust-resistant, and available in a wide range of finishes. They\'re particularly well-suited for kitchens where grease and steam are constant companions.' }],
          [{ text: 'For a softer look, consider vinyl roller shades or polyester cellular shades. Both resist moisture absorption and can be wiped clean easily. Cellular shades also provide insulation, helping to regulate the temperature swings common in humid rooms.' }],
        ],
      },
      {
        type: 'pullQuote',
        text: 'The best window treatment for a humid room is one that looks great on day one and still looks great after a year of daily showers, cooking steam, or Florida rain blowing through an open window.',
      },
      {
        type: 'heading',
        text: '3. Ventilation and Installation Tips',
      },
      {
        type: 'text',
        paragraphs: [
          [{ text: 'Even with moisture-resistant materials, proper ventilation extends the life of your window treatments. Ensure bathroom exhaust fans are running during and after showers. In kitchens, use range hoods to redirect steam away from nearby windows.' }],
          [{ text: 'Mount blinds with enough clearance from the window glass to allow air circulation behind them. Condensation on window glass is common in air-conditioned Florida homes, and trapped moisture between glass and blinds accelerates any potential issues.' }],
          [{ text: 'Consider outside-mount installations in humid rooms. This allows more airflow around the treatment and makes cleaning easier — simply lift the blinds away from the window for a thorough wipe-down.' }],
        ],
      },
    ],
  },
  'smart-home-integration-motorized-shades-101': {
    breadcrumb: 'HOME > BLOG > Smart Home Integration: Motorized Shades 101',
    heroImage: {
      src: 'https://www.figma.com/api/mcp/asset/ee8e1302-c513-4fff-a95e-6a569cb2228b.png',
      alt: 'Person using smartphone to control motorized shades',
    },
    heroBadge: 'Latest',
    date: 'JULY 2026',
    author: {
      name: 'Professional Name',
      avatar: {
        src: 'https://www.figma.com/api/mcp/asset/cec6e836-c931-4680-b22e-6cecd8f7b27e.png',
        alt: 'Author portrait',
      },
    },
    readTime: '07 MIN READ',
    title: 'Smart Home Integration: Motorized Shades 101',
    blocks: [
      {
        type: 'intro',
        paragraphs: [
          [{ text: 'Motorized window shades have evolved from a luxury feature to an increasingly standard component of modern Florida homes. Today\'s systems integrate seamlessly with popular smart home platforms, offering convenience, energy savings, and enhanced security.' }],
          [{ text: 'Whether you\'re building a new home, renovating, or simply upgrading your existing window treatments, understanding the options available helps you make an informed investment.' }],
          [{ text: 'This guide covers everything from basic motorization concepts to advanced smart home integration, helping you decide what\'s right for your lifestyle and budget.' }],
          [{ text: 'Let\'s start with the fundamentals.' }],
        ],
        image: {
          src: 'https://www.figma.com/api/mcp/asset/ee8e1302-c513-4fff-a95e-6a569cb2228b.png',
          alt: 'Smart home control panel for motorized shades',
        },
      },
      {
        type: 'heading',
        text: '1. How Motorized Shades Work',
      },
      {
        type: 'text',
        paragraphs: [
          [{ text: 'At their core, motorized shades use a small electric motor housed within the roller tube or headrail. This motor drives the shade up or down via a control signal — either from a remote, a wall switch, a smartphone app, or an automated schedule.' }],
          [{ text: 'Power sources vary by system. Hardwired installations connect directly to your home\'s electrical system and never need battery changes. Battery-powered motors offer easier installation with no wiring required, though batteries need replacement or recharging every 6-12 months.' }],
          [{ text: 'Solar-powered options use a small panel attached to the window frame to keep an internal battery charged. These work particularly well in Florida, where abundant sunlight keeps the system running indefinitely with zero maintenance.' }],
        ],
      },
      {
        type: 'heading',
        text: '2. Smart Home Platform Integration',
      },
      {
        type: 'text',
        paragraphs: [
          [{ text: 'Modern motorized shades connect to the major smart home ecosystems: Apple HomeKit, Google Home, Amazon Alexa, and Samsung SmartThings. This means you can control your shades with voice commands, include them in automated routines, and monitor their position remotely.' }],
          [{ text: 'Integration unlocks powerful automation possibilities. Set your shades to lower automatically when the indoor temperature exceeds a threshold, raise when your morning alarm goes off, or close at sunset for privacy — all without touching a button.' }],
          [{ text: 'For the most seamless experience, choose a shade system that supports your existing smart home platform natively rather than requiring a separate bridge or hub. This reduces latency and improves reliability.' }],
        ],
      },
      {
        type: 'pullQuote',
        text: 'The real value of motorized shades isn\'t the convenience of a remote control — it\'s the automation that makes your home more comfortable, efficient, and secure without you having to think about it.',
      },
      {
        type: 'image',
        image: {
          src: 'https://www.figma.com/api/mcp/asset/ee8e1302-c513-4fff-a95e-6a569cb2228b.png',
          alt: 'Motorized shade system integrated with smart home display',
        },
      },
      {
        type: 'heading',
        text: '3. Energy Savings and UV Protection',
      },
      {
        type: 'text',
        paragraphs: [
          [{ text: 'Automated shades can meaningfully reduce your energy costs. By programming shades to close during peak sun hours, you reduce solar heat gain and ease the burden on your air conditioning system — a significant consideration in Florida where cooling costs dominate energy bills.' }],
          [{ text: 'Studies suggest that properly automated window treatments can reduce cooling costs by 15-25%. Sun-tracking schedules that adjust shade positions throughout the day based on the sun\'s angle maximize this benefit.' }],
          [{ text: 'UV protection is an added bonus. Automated schedules ensure your shades are always closed when the sun is strongest, protecting furniture, flooring, and artwork from fading even when you\'re not home to manually adjust them.' }],
        ],
      },
    ],
  },
};

export function getKnowledgeArticle(slug: string): KnowledgeArticlePageContent | undefined {
  return knowledgeArticles[slug];
}

export function getKnowledgeArticleSlugs(): string[] {
  return Object.keys(knowledgeArticles);
}

export function getBlogArticle(slug: string): BlogArticlePageContent | undefined {
  return blogArticles[slug];
}

export function getBlogArticleSlugs(): string[] {
  return Object.keys(blogArticles);
}
