import { altLanguages } from "@/lib/site";
import type { Metadata } from "next";
import HomeView from "@/components/views/HomeView";

export const revalidate = 3600;

/**
 * The home page had no metadata of its own — only the layout's defaults — while
 * the English one had a title and description written for it. This is the page
 * most people arrive on and the one most likely to be shared, in the language
 * most of them read.
 *
 * The title opens with what people type. "কানের মেশিনের দাম" is the search;
 * "সেনসো হিয়ারিং সেন্টার" is the answer, and it goes at the end where a brand
 * name belongs once the page has earned the click.
 */
export const metadata: Metadata = {
  title: "কানের মেশিনের দাম ও কান পরীক্ষা — সেনসো হিয়ারিং সেন্টার, পান্থপথ",
  description:
    "পান্থপথ, ঢাকা। ReSound-এর অনুমোদিত ডিলার। প্রতিটি মেশিনের দাম ওয়েবসাইটেই লেখা। পূর্ণ কান পরীক্ষা ৩৫ মিনিটে, রিপোর্ট একই দিনে।",
  alternates: {
    canonical: "/",
    languages: altLanguages("/", "/en"),
  },
  openGraph: { locale: "bn_BD" },
};

export default function Page() {
  return <HomeView lang="bn" />;
}
