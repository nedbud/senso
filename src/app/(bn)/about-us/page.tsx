import type { Metadata } from "next";
import AboutView from "@/components/views/AboutView";
import { altLanguages, SITE } from "@/lib/site";

export const revalidate = 86400;

export const metadata: Metadata = {
  title: "আমরা কারা — সেনসো হিয়ারিং সেন্টার, পান্থপথ",
  description:
    "পান্থপথে ২০০৭ সাল থেকে। ReSound-এর অনুমোদিত ডিলার। অডিওলজিস্ট কে কখন বসেন, কী কী করা হয়, আর কী করা হয় না।",
  alternates: {
    canonical: "/about-us",
    languages: altLanguages("/about-us", "/en/about-us"),
  },
  openGraph: { title: "আমরা কারা — সেনসো হিয়ারিং সেন্টার", url: `${SITE.url}/about-us` },
};

export default function Page() {
  return <AboutView lang="bn" />;
}
