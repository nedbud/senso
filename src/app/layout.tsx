import "./globals.css";
import type { Metadata } from "next";
import { headers } from "next/headers";
import Navbar from "@/components/partials/navbar";
import Footer from "@/components/partials/footer";
import StickyContactBar from "@/components/ui/StickyContactBar";
import { ClinicJsonLd } from "@/components/ui/JsonLd";
import { SITE, altLanguages } from "@/lib/site";
import type { Lang } from "@/lib/i18n";

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
  icons: { icon: "./favicon.ico", shortcut: "./favicon.ico", apple: "./favicon.ico" },
  manifest: "./manifest.webmanifest",
  category: "Hearing care",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const pathname = headers().get("x-pathname") ?? "/";
  const lang: Lang = pathname.startsWith("/en") ? "en" : "bn";

  return (
    <html lang={lang}>
      <head>
        {/* Only the two faces above the fold are preloaded; the rest arrive
            with the stylesheet. */}
        <link rel="preload" as="font" type="font/woff2" crossOrigin="anonymous"
          href="/font/hind-bengali-400.woff2" />
        <link rel="preload" as="font" type="font/woff2" crossOrigin="anonymous"
          href="/font/anek-bengali-700.woff2" />
      </head>
      <body suppressHydrationWarning>
        <ClinicJsonLd />
        <Navbar lang={lang} />
        <main>{children}</main>
        <Footer lang={lang} />
        <StickyContactBar lang={lang} />
      </body>
    </html>
  );
}
