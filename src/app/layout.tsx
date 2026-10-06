import type { Metadata } from "next";
import { GoogleAnalytics } from "@next/third-parties/google";
import { Plus_Jakarta_Sans, Inter, DM_Mono } from "next/font/google";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { ScrollProgress } from "@/components/ScrollProgress";
import { fetchNav, fetchFooter } from "@/lib/api";
import { SITE_URL, pageMetadata } from "@/lib/seo";
import "./globals.css";

// GA4 property "Blindsndrapery". Loaded via Next's official
// @next/third-parties wrapper (gtag.js, fetched after hydration) rather
// than a raw <script> in <head>; its domains are allowed in the CSP in
// next.config.ts.
const GA_MEASUREMENT_ID = "G-0D3QNX580T";

// Font choices come straight from the Figma variable defs, not a guess:
// Heading/H1/H2/H3 + Button/CTA all use Plus Jakarta Sans, Body/Regular uses
// Inter, and Label/Mono (the small uppercase eyebrow tags) uses DM Mono.
const plusJakartaSans = Plus_Jakarta_Sans({
  variable: "--font-plus-jakarta-sans",
  subsets: ["latin"],
  weight: ["600", "700"],
  display: "swap",
});

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
  weight: ["400", "500", "600"],
  display: "swap",
});

const dmMono = DM_Mono({
  variable: "--font-dm-mono",
  subsets: ["latin"],
  weight: ["400", "500"],
  display: "swap",
});

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  ...pageMetadata({
    path: "/",
    title: "Blinds & Drapery | Custom Window Coverings in South Florida",
    description:
      "Custom blinds, shades, shutters, and drapery for South Florida homes and businesses. Free in-home consultation.",
  }),
};

export default async function RootLayout({ children }: LayoutProps<"/">) {
  const [navData, footerData] = await Promise.all([
    fetchNav().catch(() => undefined),
    fetchFooter().catch(() => undefined),
  ]);

  return (
    <html
      lang="en"
      className={`${plusJakartaSans.variable} ${inter.variable} ${dmMono.variable} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col bg-white font-body text-navy">
        <Header navContent={navData} />
        {children}
        <Footer footerContent={footerData} />
        <ScrollProgress />
      </body>
      <GoogleAnalytics gaId={GA_MEASUREMENT_ID} />
    </html>
  );
}
