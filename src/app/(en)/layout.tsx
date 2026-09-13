import type { Metadata } from "next";
import RootShell from "../RootShell";
import { SITE, altLanguages } from "@/lib/site";

/**
 * Root layout for the English subtree, everything under /en.
 *
 * The pages below already pass lang="en" to their views, so their own copy
 * was always right. What was wrong was everything around them — the topbar,
 * the footer, the sticky contact bar and `<html lang>` all came from the one
 * shared layout, which had no reliable way to know it was serving English.
 * Now it does, because the folder it lives in says so.
 */
export const metadata: Metadata = {
  metadataBase: new URL(SITE.url),
  title: {
    default: "Hearing aid prices and hearing tests — Senso Hearing Centre, Panthapath",
    template: "%s | Senso Hearing Centre",
  },
  description:
    "Panthapath, Dhaka. Authorised ReSound dealer. Prices published openly; hearing test report the same day, in 35 minutes.",
  alternates: {
    canonical: "/en",
    languages: altLanguages("/", "/en"),
  },
  openGraph: {
    type: "website",
    locale: "en_US",
    alternateLocale: ["bn_BD"],
    siteName: SITE.name,
    url: `${SITE.url}/en`,
    title: "Hearing aid prices and hearing tests — Senso Hearing Centre",
    description:
      "Prices published openly. A full hearing test takes 35 minutes and the report is yours the same day. Authorised ReSound dealer.",
      images: [
      {
        url: "/og.png",
        width: 1200,
        height: 630,
        alt: "Senso Hearing Centre, Panthapath — ২০০৭ সাল থেকে ২০ হাজার রোগীর সেবায়",
      },
    ],
},
  twitter: { card: "summary_large_image" },
  icons: { icon: "/favicon.ico", shortcut: "/favicon.ico", apple: "/favicon.ico" },
  manifest: "/manifest.webmanifest",
  category: "Hearing care",
};

export default function EnglishRootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <RootShell lang="en">{children}</RootShell>;
}
