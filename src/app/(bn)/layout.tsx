import type { Metadata } from "next";
import RootShell from "../RootShell";
import { SITE, altLanguages } from "@/lib/site";

/**
 * Root layout for the Bangla subtree — the site's own URLs (/, /hearing-aids,
 * /about-us). Bangla is the default language, so it keeps the plain paths and
 * the ranking they already have.
 */
export const metadata: Metadata = {
  metadataBase: new URL(SITE.url),
  title: {
    default: "কানের মেশিনের দাম ও কান পরীক্ষা — সেনসো হিয়ারিং সেন্টার, পান্থপথ",
    template: "%s | Senso Hearing Centre",
  },
  description:
    "পান্থপথ, ঢাকা। ReSound-এর বাংলাদেশ পরিবেশক। কানের মেশিনের দাম খোলাখুলি লেখা, কান পরীক্ষার রিপোর্ট ৩৫ মিনিটে।",
  // The keywords meta tag was removed. It held ~46 entries including
  // "what is a hearing aids hearing aids hearing aids" and "where to get
  // hearing aids what is hearing aids". Google has ignored this tag since
  // 2009; all it did was look like keyword stuffing.
  alternates: {
    canonical: "/",
    languages: altLanguages("/", "/en"),
  },
  verification: { google: "D7V9ovCzKzcomUagIaPLjeDIrdnGWmw01YTBshq8gYY" },
  openGraph: {
    type: "website",
    locale: "bn_BD",
    alternateLocale: ["en_US"],
    siteName: SITE.name,
    url: SITE.url,
    title: "কানের মেশিনের দাম ও কান পরীক্ষা — সেনসো হিয়ারিং সেন্টার",
    description:
      "দাম খোলাখুলি লেখা। কান পরীক্ষায় ৩৫ মিনিট, রিপোর্ট একই দিনে। ReSound-এর বাংলাদেশ পরিবেশক।",
  },
  twitter: { card: "summary_large_image" },
  icons: { icon: "/favicon.ico", shortcut: "/favicon.ico", apple: "/favicon.ico" },
  manifest: "/manifest.webmanifest",
  category: "Hearing care",
};

export default function BanglaRootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <RootShell lang="bn">{children}</RootShell>;
}
