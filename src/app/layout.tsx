import type { Metadata } from "next";
import { Plus_Jakarta_Sans, Inter, DM_Mono } from "next/font/google";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { fetchNav, fetchFooter } from "@/lib/api";
import { SITE_URL, pageMetadata } from "@/lib/seo";
import "./globals.css";

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
      </body>
    </html>
  );
}
