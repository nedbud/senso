import type { Metadata } from "next";
import AboutView from "@/components/views/AboutView";
import { altLanguages, SITE } from "@/lib/site";

export const revalidate = 86400;

export const metadata: Metadata = {
  title: "About us — Senso Hearing Centre, Panthapath",
  description:
    "In Panthapath since 2007. Authorised ReSound dealer. Who sits when, what happens here, and what we do not do.",
  alternates: {
    canonical: "/en/about-us",
    languages: altLanguages("/about-us", "/en/about-us"),
  },
  openGraph: {
    title: "About us — Senso Hearing Centre",
    url: `${SITE.url}/en/about-us`,
    locale: "en_US",
  },
};

export default function Page() {
  return <AboutView lang="en" />;
}
