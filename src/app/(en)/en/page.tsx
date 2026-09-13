import { altLanguages } from "@/lib/site";
import type { Metadata } from "next";
import HomeView from "@/components/views/HomeView";
import { getDict } from "@/routes/dict";

export const revalidate = 3600;

export async function generateMetadata(): Promise<Metadata> {
  const d = await getDict("en");
  return {
    title: d.seo.homeTitle,
    description: d.seo.homeDescription,
    alternates: {
      canonical: "/en",
      languages: altLanguages("/", "/en"),
    },
    openGraph: { locale: "en_US" },
  };
}

export default function Page() {
  return <HomeView lang="en" />;
}
