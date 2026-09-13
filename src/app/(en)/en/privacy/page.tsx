import type { Metadata } from "next";
import PrivacyView from "@/components/views/PrivacyView";
import { altLanguages, SITE } from "@/lib/site";
import { getDict } from "@/routes/dict";

export const revalidate = 86400;

export async function generateMetadata(): Promise<Metadata> {
  const d = await getDict("en");
  return {
    title: d.seo.privacyTitle,
    description: d.seo.privacyDescription,
    alternates: {
      canonical: "/en/privacy",
      languages: altLanguages("/gopaniyota", "/en/privacy"),
    },
    openGraph: { title: d.seo.privacyTitle, url: `${SITE.url}/en/privacy` },
  };
}

export default function Page() {
  return <PrivacyView lang="en" />;
}
