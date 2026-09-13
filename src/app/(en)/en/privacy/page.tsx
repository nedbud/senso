import type { Metadata } from "next";
import PrivacyView from "@/components/views/PrivacyView";
import { altLanguages, SITE } from "@/lib/site";

export const revalidate = 86400;

export const metadata: Metadata = {
  title: "Privacy — Senso Hearing Centre",
  description:
    "What we collect, why, where it goes, how long we keep it, and what to do if you would rather we did not.",
  alternates: {
    canonical: "/en/privacy",
    languages: altLanguages("/gopaniyota", "/en/privacy"),
  },
  openGraph: { title: "Privacy — Senso Hearing Centre", url: `${SITE.url}/en/privacy` },
};

export default function Page() {
  return <PrivacyView lang="en" />;
}
