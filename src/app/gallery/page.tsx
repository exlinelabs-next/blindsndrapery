import type { Metadata } from "next";
import { GalleryHero } from "@/components/GalleryHero";
import { GalleryContent } from "@/components/GalleryContent";
import { ConsultationCTA } from "@/components/ConsultationCTA";
import { FAQ } from "@/components/FAQ";
import { useContent } from "@/hooks/useContent";

export const metadata: Metadata = {
  title: "Inspiration Gallery | Blinds & Drapery",
  description:
    "Browse completed window treatment installations from South Florida homes and businesses — blinds, shades, shutters, and drapery.",
};

export default function GalleryPage() {
  const ctaContent = useContent("galleryPage").cta;

  return (
    <main>
      <GalleryHero />
      <GalleryContent />
      <ConsultationCTA content={ctaContent} />
      <FAQ />
    </main>
  );
}
