import { dict, type Lang } from "@/lib/i18n";
import type { ProductMapInterface } from "@/routes/product";
import ProductCard from "@/components/Home/Card__bestProducts";

/**
 * Server component.
 *
 * This was `"use client"` with a useEffect fetch, so /hearing-aids shipped an
 * empty grid in its HTML and the products only appeared after JavaScript ran.
 * The category page that should rank for "hearing aid price in bangladesh"
 * had no products and no prices in its source. Product detail pages were
 * already server-rendered; only the list was not.
 */
export default function ProductList({
  products,
  lang,
}: {
  products: ProductMapInterface[];
  lang: Lang;
}) {
  const d = dict(lang);

  if (!products.length) {
    return <p className="py-10 text-ink-muted">{d.products.empty}</p>;
  }

  return (
    <div className="grid grid-cols-2 gap-4 md:grid-cols-3 xl:grid-cols-4">
      {products.map((item, i) => (
        // The first row is above the fold on every screen size, so those
        // images are the ones worth loading eagerly.
        <ProductCard key={item.slug} item={item} lang={lang} priority={i < 4} />
      ))}
    </div>
  );
}
