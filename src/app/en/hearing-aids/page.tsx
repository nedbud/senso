import { altLanguages } from "@/lib/site";
import type { Metadata } from "next";
import ProductsView from "@/components/views/ProductsView";

export const revalidate = 3600;

export const metadata: Metadata = {
  title: "Hearing aid prices in Bangladesh — every model",
  description:
    "The full ReSound range with prices. Which one you need is decided after the hearing test. Senso Hearing Centre, Panthapath, Dhaka.",
  alternates: {
    canonical: "/en/hearing-aids",
    languages: altLanguages("/hearing-aids", "/en/hearing-aids"),
  },
  openGraph: { locale: "en_US" },
};

export default function Page({
  searchParams,
}: {
  searchParams?: { series?: string; sort?: string };
}) {
  return <ProductsView lang="en" searchParams={searchParams} />;
}
