import type { Metadata } from "next";
import AboutView from "@/components/views/AboutView";
import { altLanguages, SITE } from "@/lib/site";
import { getDict } from "@/routes/dict";

export const revalidate = 86400;

export async function generateMetadata(): Promise<Metadata> {
  const d = await getDict("bn");
  return {
    title: d.seo.aboutTitle,
    description: d.seo.aboutDescription,
    alternates: {
      canonical: "/about-us",
      languages: altLanguages("/about-us", "/en/about-us"),
    },
    openGraph: { title: d.seo.aboutOgTitle, url: `${SITE.url}/about-us` },
  };
}

export default function Page() {
  return <AboutView lang="bn" />;
}
