import ProductList from "@/components/HearingAids/List";
import Filters from "@/components/HearingAids/Filters";
import { ProductRangeJsonLd } from "@/components/ui/JsonLd";
import { getProductsBySeries, getSeries, type SortKey } from "@/routes/product";
import { dict, type Lang } from "@/lib/i18n";
import { formatTaka } from "@/lib/site";

const SORTS: SortKey[] = ["best", "trending", "leatest", "asc", "desc"];

export default async function ProductsView({
  lang,
  searchParams,
}: {
  lang: Lang;
  searchParams?: { series?: string; sort?: string };
}) {
  const d = dict(lang);
  const series = searchParams?.series ?? "all";
  const sort = (SORTS.includes(searchParams?.sort as SortKey)
    ? searchParams?.sort
    : "desc") as SortKey;

  const [products, allSeries] = await Promise.all([
    getProductsBySeries({ series, sort }),
    getSeries(),
  ]);

  const prices = products
    .map((p) => parseFloat(p.price))
    .filter((n) => isFinite(n) && n > 0);

  return (
    <div className="mx-auto max-w-7xl px-4 py-10 lg:px-8">
      {prices.length > 0 && (
        <ProductRangeJsonLd
          low={Math.round(Math.min(...prices))}
          high={Math.round(Math.max(...prices))}
          count={prices.length}
        />
      )}

      <div className="mb-6 flex max-w-3xl flex-col gap-3">
        <h1 className="text-[clamp(28px,5.4vw,38px)] text-ink">
          {d.products.heading}
        </h1>
        <p className="max-w-prose text-xl text-ink-2">{d.products.lede}</p>
        {prices.length > 0 && (
          <p className="num font-display text-lg font-semibold text-ink">
            {formatTaka(Math.min(...prices))} {d.products.from}
          </p>
        )}
      </div>

      <div className="mb-8">
        <Filters lang={lang} series={allSeries} active={series} sort={sort} />
      </div>

      <ProductList products={products} lang={lang} />
    </div>
  );
}
