import type { Metadata } from "next";
import ProductsView from "@/components/views/ProductsView";
import { getSeries } from "@/routes/product";
import { altLanguages, toBengaliDigits } from "@/lib/site";

export const revalidate = 3600;

type Props = {
  searchParams?: { series?: string; sort?: string; parts?: string; page?: string };
};

/**
 * Metadata varies with the filter, because the filtered views are real pages.
 *
 * `sort` is deliberately left out of the canonical URL: sorting changes the
 * order of a list, not its contents, so all four sorts of the same filter
 * point at one canonical page instead of competing with each other.
 */
export async function generateMetadata({ searchParams }: Props): Promise<Metadata> {
  const series = searchParams?.series ?? "all";
  const parts = searchParams?.parts === "1";
  const page = Math.max(1, Number(searchParams?.page ?? 1) || 1);

  const all = await getSeries();
  const active = all.find((s) => String(s.id ?? s.name) === series);

  const name = parts
    ? "ব্যাটারি ও যন্ত্রাংশ"
    : active
    ? `ReSound ${active.name}`
    : "কানের মেশিনের দাম";

  const suffix = page > 1 ? ` — পাতা ${toBengaliDigits(page)}` : "";

  const params = new URLSearchParams();
  if (series !== "all") params.set("series", series);
  if (parts) params.set("parts", "1");
  if (page > 1) params.set("page", String(page));
  const qs = params.toString();
  const path = qs ? `/hearing-aids?${qs}` : "/hearing-aids";
  const enPath = qs ? `/en/hearing-aids?${qs}` : "/en/hearing-aids";

  return {
    title: `${name}${suffix} — সেনসো হিয়ারিং সেন্টার`,
    description: parts
      ? "ReSound মেশিনের ব্যাটারি, ডোম, রিসিভার ও যন্ত্রাংশ। সেনসো হিয়ারিং সেন্টার, পান্থপথ, ঢাকা।"
      : "ReSound কানের মেশিনের পূর্ণ তালিকা ও দাম। কোনটি আপনার লাগবে তা কান পরীক্ষার পর নির্ধারিত হয়। সেনসো হিয়ারিং সেন্টার, পান্থপথ, ঢাকা।",
    alternates: {
      canonical: path,
      languages: altLanguages(path, enPath),
    },
  };
}

export default function Page({ searchParams }: Props) {
  return <ProductsView lang="bn" searchParams={searchParams} />;
}
