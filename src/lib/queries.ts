export const SITE_ICON_AND_LOGO = `
  query getSiteIconAndLogo {
    page(id: "125", idType: DATABASE_ID) {
      headerFields {
        headerSiteLogo {
          node {
            altText
            title
            mediaItemUrl
          }
        }
        siteFavIcon {
          node {
            altText
            title
            mediaItemUrl
          }
        }
      }
    }
  }
`;

export const HEADER_NAV_AND_BUTTON = `
  query headerNavAndButton {
    page(id: "125", idType: DATABASE_ID) {
      headerFields {
        headerButtonText
        headerButtonUrl
      }
    }
    menuItems(where: {location: MENU_1, parentDatabaseId: 0}) {
      nodes {
        label
        uri
        childItems {
          nodes {
            label
            uri
            childItems {
              nodes {
                label
                uri
              }
            }
          }
        }
      }
    }
    latestPosts: posts(first: 1) {
      nodes {
        title
        excerpt
        uri
        featuredImage {
          node {
            altText
            title
            mediaItemUrl
          }
        }
      }
    }
    footerSocials: page(id: "113", idType: DATABASE_ID) {
      footerFields {
        socialIcon1 { node { altText } }
        socialUrl1
        socialIcon2 { node { altText } }
        socialUrl2
        socialIcon3 { node { altText } }
        socialUrl3
        socialIcon4 { node { altText } }
        socialUrl4
      }
    }
  }
`;

export const FOOTER_QUERY = `
  query footerQuery {
    page(id: "113", idType: DATABASE_ID) {
      footerFields {
        footerSiteLogo {
          node {
            altText
            title
            mediaItemUrl
          }
        }
        footerLogo1 {
          node {
            altText
            title
            mediaItemUrl
          }
        }
        footerLogo2 {
          node {
            altText
            title
            mediaItemUrl
          }
        }
        socialIcon1 {
          node {
            altText
            title
            mediaItemUrl
          }
        }
        socialUrl1
        socialIcon2 {
          node {
            altText
            title
            mediaItemUrl
          }
        }
        socialUrl2
        socialIcon3 {
          node {
            altText
            title
            mediaItemUrl
          }
        }
        socialUrl3
        socialIcon4 {
          node {
            altText
            title
            mediaItemUrl
          }
        }
        socialUrl4
      }
    }
  }
`;

export const ALL_FOOTER_MENUS = `
  query getAllFooterMenus {
    footerCol1: menuItems(where: {location: FOOTER_COLUMN_1}) {
      nodes {
        label
        uri
        childItems {
          nodes {
            label
            uri
          }
        }
      }
    }
    footerCol2: menuItems(where: {location: FOOTER_COLUMN_2}) {
      nodes {
        label
        uri
        childItems {
          nodes {
            label
            uri
          }
        }
      }
    }
    footerCol3: menuItems(where: {location: FOOTER_COLUMN_3}) {
      nodes {
        label
        uri
        childItems {
          nodes {
            label
            uri
          }
        }
      }
    }
    footerCol4: menuItems(where: {location: FOOTER_COLUMN_4}) {
      nodes {
        label
        uri
        childItems {
          nodes {
            label
            uri
          }
        }
      }
    }
  }
`;

export const HOME_PAGE_QUERY = `
  query homePageQuery {
    page(id: "7", idType: DATABASE_ID) {
      featuredImage {
        node {
          altText
          title
          mediaItemUrl
        }
      }
      homePageFields {
        heroSectionHeading
        heroSectionText
        heroSectionButtonText
        heroSectionButtonUrl
        iconListIcon1 { node { altText title mediaItemUrl } }
        iconListText1
        iconListIcon2 { node { altText title mediaItemUrl } }
        iconListText2
        iconListIcon3 { node { altText title mediaItemUrl } }
        iconListText3
        iconListIcon4 { node { altText title mediaItemUrl } }
        iconListText4
        iconListIcon5 { node { altText title mediaItemUrl } }
        iconListText5
        section2SubHeading
        section2Heading
        section2Text
        section2VideoUrl
        serviceSectionSubHeading
        serviceSectionHeading
        serviceSectionText
        section3SubHeading
        section3Heading
        section3Text
        section3Image { node { altText title mediaItemUrl } }
        howWeWorkSectionSubHeading
        howWeWorkSectionHeading
        howWeWorkSectionText
        howWeWorkSectionButtonText
        howWeWorkSectionButtonUrl
        iconStep1 { node { altText title mediaItemUrl } }
        iconStep2 { node { altText title mediaItemUrl } }
        iconStep3 { node { altText title mediaItemUrl } }
        iconStep4 { node { altText title mediaItemUrl } }
        titleStep1
        titleStep2
        titleStep3
        titleStep4
        paragraphStep1
        paragraphStep2
        paragraphStep3
        paragraphStep4
        reviewSectionSubHeading
        reviewSectionHeading
        reviewSectionText
        reviewSectionQuote
        reviewSectionGalleryImage1 { node { altText title mediaItemUrl } }
        reviewSectionGalleryImage2 { node { altText title mediaItemUrl } }
        reviewSectionGalleryImage3 { node { altText title mediaItemUrl } }
        reviewSectionGalleryImage4 { node { altText title mediaItemUrl } }
        commercialSectionSubHeading
        commercialSectionHeading
        commercialSectionText
        commercialSectionButtonText
        commercialSectionButtonUrl
        commercialSectionImage { node { altText title mediaItemUrl } }
        repairSectionHeading
        repairSectionText
        repairSectionIcon { node { altText title mediaItemUrl } }
        repairSectionSubHeading
        locationsSectionSubHeading
        locationsSectionHeading
        locationsSectionText
        formSubHeading
        formHeading
        formParagraph
      }
      seo {
        canonical
        title
        metaDesc
        metaRobotsNofollow
        metaRobotsNoindex
        opengraphTitle
        opengraphDescription
        opengraphImage {
          sourceUrl
          mediaDetails {
            height
            width
          }
        }
        twitterTitle
        twitterDescription
        twitterImage {
          sourceUrl
        }
        schema {
          articleType
          pageType
        }
      }
    }
  }
`;

export const SERVICE_CARDS_QUERY = `
  query serviceCardsQuery {
    services(where: {parent: "0"}) {
      nodes {
        title
        excerpt
        featuredImage {
          node {
            altText
            title
            mediaItemUrl
          }
        }
        uri
      }
    }
  }
`;

export const SERVICE_PAGE_QUERY = `
  query servicePageQuery {
    page(id: "222", idType: DATABASE_ID) {
      featuredImage {
        node {
          altText
          title
          mediaItemUrl
        }
      }
      serviceArchivePageFields {
        heroSectionHeading
        heroSectionText
        heroSectionButtonText
        heroSectionButtonUrl
        serviceSectionSubHeading
        serviceSectionHeading
        serviceSectionText
        howItWorksSectionSubHeading
        howItWorksSectionHeading
        howItWorksSectionText
        stepImage1 { node { altText title mediaItemUrl } }
        stepImage2 { node { altText title mediaItemUrl } }
        stepImage3 { node { altText title mediaItemUrl } }
        stepImage4 { node { altText title mediaItemUrl } }
        titleStep1
        titleStep2
        titleStep3
        titleStep4
        paragraphText1
        paragraphText2
        paragraphText3
        paragraphText4
        section3SubHeading
        section3Heading
        section3Paragraph
        section3Image { node { altText title mediaItemUrl } }
      }
      seo {
        title
        metaDesc
        canonical
        metaRobotsNofollow
        metaRobotsNoindex
        opengraphTitle
        opengraphDescription
        opengraphImage {
          sourceUrl
          mediaDetails {
            height
            width
          }
        }
        twitterTitle
        twitterDescription
        twitterImage {
          sourceUrl
        }
        schema {
          articleType
          pageType
        }
      }
    }
  }
`;

export const SERVICE_SINGLE_PAGE_QUERY = `
  query serviceSinglePageQuery($uri: ID!) {
    service(id: $uri, idType: URI) {
      featuredImage {
        node {
          altText
          title
          mediaItemUrl
        }
      }
      servicesSinglePageFields {
        mainHeading
        mainParagraph
        section2SubHeading
        section2Heading
        section2Text
        section2Point1
        section2Point2
        section2Point3
        section2Point4
        section2Image1 { node { altText title mediaItemUrl } }
        section2Image2 { node { altText title mediaItemUrl } }
        section2Image3 { node { altText title mediaItemUrl } }
        howItWorksSectionSubHeading
        howItWorksSectionHeading
        howItWorksSectionText
        howItWorksSectionImage { node { altText title mediaItemUrl } }
        titleStep1
        textStep1
        titleStep2
        textStep2
        titleStep3
        textStep3
        titleStep4
        textStep4
        ctaBannerSubHeading
        ctaBannerHeading
        ctaBannerText
        ctaBannerButtonText
        ctaBannerButtonUrl
        ctaBannerBackgroundImage { node { altText title mediaItemUrl } }
        serviceSubCategorySectionSubHeading
        serviceSubCategorySectionHeading
        serviceSubCategorySectionText
      }
      seo {
        breadcrumbs {
          text
          url
        }
        canonical
        title
        metaDesc
        metaRobotsNofollow
        metaRobotsNoindex
        opengraphTitle
        opengraphDescription
        opengraphImage {
          sourceUrl
          mediaDetails {
            height
            width
          }
        }
        twitterTitle
        twitterDescription
        twitterImage {
          sourceUrl
        }
        schema {
          articleType
          pageType
        }
      }
      children {
        nodes {
          ... on Service {
            id
            title
            excerpt
            uri
            featuredImage {
              node {
                altText
                title
                mediaItemUrl
              }
            }
          }
        }
      }
    }
  }
`;

export const COMMERCIAL_PAGE_QUERY = `
  query commercialPageQuery {
    page(id: "178", idType: DATABASE_ID) {
      featuredImage {
        node {
          altText
          title
          mediaItemUrl
        }
      }
      commercialPageFields {
        heroSectionHeading
        heroSectionText
        heroSectionButtonText
        heroSectionButtonUrl
        section2SubHeading
        section2Heading
        section2Text
        sec2CardsIcon1 { node { altText title mediaItemUrl } }
        sec2CardsTitle1
        sec2CardsParagraph1
        sec2CardsIcon2 { node { altText title mediaItemUrl } }
        sec2CardsTitle2
        sec2CardsParagraph2
        sec2CardsIcon3 { node { altText title mediaItemUrl } }
        sec2CardsTitle3
        sec2CardsParagraph3
        sec2CardsIcon4 { node { altText title mediaItemUrl } }
        sec2CardsTitle4
        sec2CardsParagraph4
        section3SubHeading
        section3Heading
        section3Text
        formSectionSubHeading
      }
      commercialPageCarouselImages {
        title
        altText
        mediaItemUrl
      }
      seo {
        breadcrumbs {
          text
          url
        }
        canonical
        title
        metaDesc
        metaRobotsNofollow
        metaRobotsNoindex
        opengraphTitle
        opengraphDescription
        opengraphImage {
          sourceUrl
          mediaDetails {
            height
            width
          }
        }
        twitterTitle
        twitterDescription
        twitterImage {
          sourceUrl
        }
        schema {
          articleType
          pageType
        }
      }
    }
  }
`;

export const LOCATIONS_HUB_PAGE_QUERY = `
  query locationsHubPageQuery {
    page(id: "329", idType: DATABASE_ID) {
      locationHubPageFields {
        mainHeading
        mainParagraph
        serviceAreaSectionSubHeading
        serviceAreaSectionHeading
        serviceAreaSectionParagraph
        serviceAreaSectionImage { node { altText title mediaItemUrl } }
        serviceAreaSectionMapImage { node { altText title mediaItemUrl } }
        comingSoonSectionHeading
        comingSoonSectionParagraph
        comingSoonCardIcon1 { node { altText title mediaItemUrl } }
        comingSoonCardTitle1
        comingSoonCardText1
        comingSoonCardIcon2 { node { altText title mediaItemUrl } }
        comingSoonCardTitle2
        comingSoonCardText2
        comingSoonCardIcon3 { node { altText title mediaItemUrl } }
        comingSoonCardTitle3
        comingSoonCardText3
      }
      seo {
        breadcrumbs {
          text
          url
        }
        canonical
        title
        metaDesc
        metaRobotsNofollow
        metaRobotsNoindex
        opengraphTitle
        opengraphDescription
        opengraphImage {
          sourceUrl
          mediaDetails {
            height
            width
          }
        }
        twitterTitle
        twitterDescription
        twitterImage {
          sourceUrl
        }
        schema {
          articleType
          pageType
        }
      }
    }
  }
`;

export const LOCATIONS_LIST_QUERY = `
  query locationsListQuery {
    locations(where: {orderby: {field: DATE, order: ASC}}) {
      nodes {
        title
        uri
      }
    }
  }
`;

export const LOCATION_SINGLE_PAGE_QUERY = `
  query locationsSinglePageQuery($uri: ID!) {
    location(id: $uri, idType: URI) {
      featuredImage {
        node {
          altText
          title
          mediaItemUrl
        }
      }
      locationSinglePageFields {
        heroSectionHeading
        heroSectionParagraph
        heroSectionButtonText
        heroSectionButtonUrl
        serviceSectionSubHeading
        serviceSectionHeading
        serviceSectionText
        formSectionSubHeading
        formSectionHeading
        formSectionText
      }
      seo {
        breadcrumbs {
          text
          url
        }
        canonical
        title
        metaDesc
        metaRobotsNofollow
        metaRobotsNoindex
        opengraphTitle
        opengraphDescription
        opengraphImage {
          sourceUrl
          mediaDetails {
            height
            width
          }
        }
        twitterTitle
        twitterDescription
        twitterImage {
          sourceUrl
        }
        schema {
          articleType
          pageType
        }
      }
    }
  }
`;

export const FAQ_QUERY = `
  query faqQueryNew {
    faqCategories {
      nodes {
        termTaxonomyId
        name
        slug
        faqs {
          nodes {
            title
            content
          }
        }
      }
    }
  }
`;

export const GALLERY_PAGE_QUERY = `
  query galleryPageQuery {
    page(id: "379", idType: DATABASE_ID) {
      galleryPageFields {
        mainTitle
        mainParagraph
        filterSectionTitle
        ctaBannerSubHeading
        ctaBannerHeading
        ctaBannerText
        ctaBannerButtonText
        ctaBannerButtonUrl
        ctaBannerImage {
          node {
            altText
            title
            mediaItemUrl
          }
        }
      }
      seo {
        breadcrumbs {
          text
          url
        }
        canonical
        title
        metaDesc
        metaRobotsNofollow
        metaRobotsNoindex
        opengraphTitle
        opengraphDescription
        opengraphImage {
          sourceUrl
          mediaDetails {
            height
            width
          }
        }
        twitterTitle
        twitterDescription
        twitterImage {
          sourceUrl
        }
        schema {
          articleType
          pageType
        }
      }
    }
  }
`;

export const GALLERY_ITEMS_QUERY = `
  query galleryItemsQuery {
    productTypes {
      nodes {
        termTaxonomyId
        name
        slug
        galleryItems {
          nodes {
            title
            featuredImage {
              node {
                altText
                title
                mediaItemUrl
              }
            }
          }
        }
      }
    }
    roomTypes {
      nodes {
        termTaxonomyId
        name
        slug
        galleryItems {
          nodes {
            title
            featuredImage {
              node {
                altText
                title
                mediaItemUrl
              }
            }
          }
        }
      }
    }
  }
`;

export const ABOUT_PAGE_QUERY = `
  query aboutPageQuery {
    page(id: "180", idType: DATABASE_ID) {
      featuredImage {
        node {
          altText
          title
          mediaItemUrl
        }
      }
      aboutPageFields {
        heroSectionHeading
        heroSectionParagraph
        heroSectionButtonText
        heroSectionButtonUrl
        section2Heading
        section2Paragraph
        section3SubHeading
        section3Heading
        section3Text
        boxIcon {
          node {
            mediaItemUrl
          }
        }
        boxTitle1
        boxTitle2
        boxTitle3
        boxTitle4
        iconBoxFields {
          icon1 {
            node {
              mediaItemUrl
            }
          }
          title1
          icon2 {
            node {
              mediaItemUrl
            }
          }
          title2
          icon3 {
            node {
              mediaItemUrl
            }
          }
          title3
          icon4 {
            node {
              mediaItemUrl
            }
          }
          title4
        }
      }
      seo {
        breadcrumbs {
          text
          url
        }
        canonical
        title
        metaDesc
        metaRobotsNofollow
        metaRobotsNoindex
        opengraphTitle
        opengraphDescription
        opengraphImage {
          sourceUrl
          mediaDetails {
            height
            width
          }
        }
        twitterTitle
        twitterDescription
        twitterImage {
          sourceUrl
        }
        schema {
          articleType
          pageType
        }
      }
    }
  }
`;

export const TEAM_QUERY = `
  query teamQuery {
    teamMembers {
      nodes {
        title
        teamFields {
          jobRole
        }
        featuredImage {
          node {
            altText
            title
            mediaItemUrl
          }
        }
      }
    }
  }
`;

export const FREE_QUOTE_PAGE_QUERY = `
  query freeQuotePageQuery {
    page(id: "182", idType: DATABASE_ID) {
      quotePageFields {
        mainTitle
        mainParagraph
        section2SubHeading
        section2Heading
        section2Text
        titleStep1
        textStep1
        titleStep2
        textStep2
        titleStep3
        textStep3
        titleStep4
        textStep4
        titleStep5
        textStep5
        section3SubHeading
        section3Heading
        section3Text
        section3Video {
          node {
            altText
            title
            mediaItemUrl
          }
        }
        formSubHeading
        formHeading
        formText
      }
      seo {
        breadcrumbs {
          text
          url
        }
        canonical
        title
        metaDesc
        metaRobotsNofollow
        metaRobotsNoindex
        opengraphTitle
        opengraphDescription
        opengraphImage {
          sourceUrl
          mediaDetails {
            height
            width
          }
        }
        twitterTitle
        twitterDescription
        twitterImage {
          sourceUrl
        }
        schema {
          articleType
          pageType
        }
      }
    }
  }
`;

export const BLOG_POSTS_CARDS_QUERY = `
  query blogPostsCardsQuery {
    posts {
      nodes {
        title
        excerpt
        featuredImage {
          node {
            altText
            title
            mediaItemUrl
          }
        }
        uri
      }
    }
  }
`;

export const KNOWLEDGEBASE_CARDS_QUERY = `
  query knowledgebaseCardsQuery {
    knowledgeBaseItems {
      nodes {
        title
        excerpt
        categories {
          nodes {
            termTaxonomyId
            name
            slug
          }
        }
      }
    }
  }
`;

export const POLICY_PAGE_QUERY = `
  query policyPageQuery {
    page(id: "490", idType: DATABASE_ID) {
      title
      content
      seo {
        breadcrumbs {
          text
          url
        }
        canonical
        title
        metaDesc
        metaRobotsNofollow
        metaRobotsNoindex
        opengraphTitle
        opengraphDescription
        opengraphImage {
          sourceUrl
          mediaItemUrl
        }
        twitterTitle
        twitterDescription
        twitterImage {
          sourceUrl
        }
        schema {
          articleType
          pageType
        }
      }
    }
  }
`;

export const BLOG_ARCHIVE_PAGE_QUERY = `
  query blogArchivePageQuery {
    page(id: "463", idType: DATABASE_ID) {
      blogAndKbArchivePageFields {
        mainTitle
        mainParagraph
      }
      seo {
        title
        metaDesc
        metaRobotsNofollow
        metaRobotsNoindex
        opengraphTitle
        opengraphDescription
        opengraphImage {
          sourceUrl
          mediaDetails {
            height
            width
          }
        }
        twitterTitle
        twitterDescription
        twitterImage {
          sourceUrl
        }
        schema {
          articleType
          pageType
        }
      }
    }
  }
`;

export const KB_ARCHIVE_PAGE_QUERY = `
  query KBArchivePageQuery {
    page(id: "473", idType: DATABASE_ID) {
      blogAndKbArchivePageFields {
        mainTitle
        mainParagraph
      }
      seo {
        title
        metaDesc
        metaRobotsNofollow
        metaRobotsNoindex
        opengraphTitle
        opengraphDescription
        opengraphImage {
          sourceUrl
          mediaDetails {
            height
            width
          }
        }
        twitterTitle
        twitterDescription
        twitterImage {
          sourceUrl
        }
        schema {
          articleType
          pageType
        }
      }
    }
  }
`;

export const BLOG_SINGLE_PAGE_QUERY = `
  query blogSinglePageQuery($uri: ID!) {
    post(id: $uri, idType: URI) {
      title
      featuredImage {
        node {
          altText
          title
          mediaItemUrl
        }
      }
      date
      blogAuthorFields {
        authorName
        profileImage {
          node {
            altText
            title
            mediaItemUrl
          }
        }
      }
      content
      seo {
        breadcrumbs {
          text
          url
        }
        canonical
        title
        metaDesc
        metaRobotsNofollow
        metaRobotsNoindex
        opengraphTitle
        opengraphDescription
        opengraphImage {
          sourceUrl
          mediaDetails {
            height
            width
          }
        }
        twitterTitle
        twitterDescription
        twitterImage {
          sourceUrl
        }
        schema {
          articleType
          pageType
        }
      }
    }
  }
`;

export const KNOWLEDGE_BASE_SINGLE_PAGE_QUERY = `
  query knowledgeBaseSinglePageQuery($uri: ID!) {
    knowledgeBaseItem(id: $uri, idType: URI) {
      title
      featuredImage {
        node {
          altText
          title
          mediaItemUrl
        }
      }
      categories {
        nodes {
          termTaxonomyId
          name
          slug
        }
      }
      date
      content
      seo {
        breadcrumbs {
          text
          url
        }
        canonical
        title
        metaDesc
        metaRobotsNofollow
        metaRobotsNoindex
        opengraphTitle
        opengraphDescription
        opengraphImage {
          sourceUrl
          mediaDetails {
            height
            width
          }
        }
        twitterTitle
        twitterDescription
        twitterImage {
          sourceUrl
        }
        schema {
          articleType
          pageType
        }
      }
    }
  }
`;
