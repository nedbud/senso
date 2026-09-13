import type { Metadata } from "next";
import PrivacyView from "@/components/views/PrivacyView";
import { altLanguages, SITE } from "@/lib/site";

export const revalidate = 86400;

export const metadata: Metadata = {
  title: "গোপনীয়তা ও তথ্য — সেনসো হিয়ারিং সেন্টার",
  description:
    "আমরা কী কী তথ্য নিই, কেন নিই, কোথায় রাখি, কতদিন রাখি, আর আপনি না চাইলে কী করবেন।",
  alternates: {
    canonical: "/gopaniyota",
    languages: altLanguages("/gopaniyota", "/en/privacy"),
  },
  openGraph: { title: "গোপনীয়তা ও তথ্য — সেনসো হিয়ারিং সেন্টার", url: `${SITE.url}/gopaniyota` },
};

export default function Page() {
  return <PrivacyView lang="bn" />;
}
