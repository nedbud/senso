import { altLanguages } from "@/lib/site";
import type { Metadata } from "next";
import ProductsView from "@/components/views/ProductsView";

export const revalidate = 3600;

export const metadata: Metadata = {
  title: "কানের মেশিনের দাম — সব মডেল ও দাম",
  description:
    "ReSound কানের মেশিনের পূর্ণ তালিকা ও দাম। কোনটি আপনার লাগবে তা কান পরীক্ষার পর নির্ধারিত হয়। সেনসো হিয়ারিং সেন্টার, পান্থপথ, ঢাকা।",
  alternates: {
    canonical: "/hearing-aids",
    languages: altLanguages("/hearing-aids", "/en/hearing-aids"),
  },
};

export default function Page({
  searchParams,
}: {
  searchParams?: { series?: string; sort?: string };
}) {
  return <ProductsView lang="bn" searchParams={searchParams} />;
}
