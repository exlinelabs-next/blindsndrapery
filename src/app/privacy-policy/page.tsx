import type { Metadata } from "next";
import { LegalContent } from "@/components/LegalContent";

export const metadata: Metadata = {
  title: "Privacy Policy & Terms | Blinds & Drapery",
  description:
    "Read the Blinds & Drapery privacy policy and terms of service for our window treatment solutions.",
};

export default function PrivacyPolicyPage() {
  return (
    <main>
      <LegalContent />
    </main>
  );
}
