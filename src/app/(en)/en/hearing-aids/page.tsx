import type { Metadata } from "next";
import ProductsView from "@/components/views/ProductsView";
import { getSeries } from "@/routes/product";
import { altLanguages } from "@/lib/site";

export const revalidate = 3600;

type Props = {
  searchParams?: { series?: string; sort?: string; parts?: string; page?: string };
};

export async function generateMetadata({ searchParams }: Props): Promise<Metadata> {
  const series = searchParams?.series ?? "all";
  const parts = searchParams?.parts === "1";
  const page = Math.max(1, Number(searchParams?.page ?? 1) || 1);

  const all = await getSeries();
  const active = all.find((s) => String(s.id ?? s.name) === series);

  const name = parts
    ? "Hearing aid batteries and parts"
    : active
    ? `ReSound ${active.name} hearing aids`
    : "Hearing aid prices in Bangladesh";

  const suffix = page > 1 ? ` — page ${page}` : "";

  const params = new URLSearchParams();
  if (series !== "all") params.set("series", series);
  if (parts) params.set("parts", "1");
  if (page > 1) params.set("page", String(page));
  const qs = params.toString();
  const path = qs ? `/hearing-aids?${qs}` : "/hearing-aids";
  const enPath = qs ? `/en/hearing-aids?${qs}` : "/en/hearing-aids";

  return {
    title: `${name}${suffix} — Senso Hearing Centre`,
    description: parts
      ? "ReSound batteries, domes, receivers and spare parts. Senso Hearing Centre, Panthapath, Dhaka."
      : "The full ReSound range with prices. Which one you need is decided after the hearing test. Senso Hearing Centre, Panthapath, Dhaka.",
    alternates: {
      canonical: enPath,
      languages: altLanguages(path, enPath),
    },
    openGraph: { locale: "en_US" },
  };
}

export default function Page({ searchParams }: Props) {
  return <ProductsView lang="en" searchParams={searchParams} />;
}
