import { altLanguages } from "@/lib/site";
import type { Metadata } from "next";
import HomeView from "@/components/views/HomeView";

export const revalidate = 3600;

export const metadata: Metadata = {
  title: "Hearing aid prices and hearing tests — Senso Hearing Centre, Panthapath",
  description:
    "Panthapath, Dhaka. Authorised ReSound dealer. Prices published openly; hearing test report in 35 minutes.",
  alternates: {
    canonical: "/en",
    languages: altLanguages("/", "/en"),
  },
  openGraph: { locale: "en_US" },
};

export default function Page() {
  return <HomeView lang="en" />;
}
