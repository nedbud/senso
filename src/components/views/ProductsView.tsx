import ProductList from "@/components/HearingAids/List";
import Filters from "@/components/HearingAids/Filters";
import { ProductRangeJsonLd } from "@/components/ui/JsonLd";
import {
  getProductsBySeries,
  getSeries,
  priceStats,
  type SortKey,
} from "@/routes/product";
import { dict, type Lang } from "@/lib/i18n";
import { formatTaka } from "@/lib/site";

const SORTS: SortKey[] = ["best", "trending", "leatest", "asc", "desc"];

export default async function ProductsView({
  lang,
  searchParams,
}: {
  lang: Lang;
  searchParams?: { series?: string; sort?: string; parts?: string };
}) {
  const d = dict(lang);
  const bn = lang === "bn";
  const series = searchParams?.series ?? "all";
  const sort = (SORTS.includes(searchParams?.sort as SortKey)
    ? searchParams?.sort
    : "asc") as SortKey;
  const showParts = searchParams?.parts === "1";

  const [products, allSeries] = await Promise.all([
    getProductsBySeries({ series, sort, includeAccessories: showParts }),
    getSeries(),
  ]);

  const stats = priceStats(products);

  return (
    <div className="mx-auto max-w-7xl px-4 py-10 lg:px-8">
      {stats && (
        <ProductRangeJsonLd
          low={stats.low}
          high={stats.high}
          count={stats.count}
        />
      )}

      <div className="mb-6 flex max-w-3xl flex-col gap-3">
        <h1 className="text-[clamp(28px,5.4vw,38px)] text-ink">
          {showParts
            ? bn
              ? "ব্যাটারি ও যন্ত্রাংশ"
              : "Batteries and parts"
            : d.products.heading}
        </h1>
        <p className="max-w-prose text-xl text-ink-2">{d.products.lede}</p>
        <div className="flex flex-wrap items-baseline gap-x-4 gap-y-1">
          {stats && (
            <p className="num font-display text-lg font-semibold text-ink">
              {formatTaka(stats.low)} {d.products.from}
            </p>
          )}
          <p className="text-ink-muted">
            {bn
              ? `${products.length} টি দেখানো হচ্ছে`
              : `${products.length} shown`}
          </p>
        </div>
      </div>

      <div className="mb-8">
        <Filters
          lang={lang}
          series={allSeries}
          active={series}
          sort={sort}
          showParts={showParts}
        />
      </div>

      <ProductList products={products} lang={lang} />
    </div>
  );
}
