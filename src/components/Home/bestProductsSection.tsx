import Link from "next/link";
import { dict, type Lang } from "@/lib/i18n";
import { formatTaka } from "@/lib/site";
import type { ProductMapInterface } from "@/routes/product";
import ProductCard from "./Card__bestProducts";

/**
 * Was an autoplaying Swiper carousel introduced by filler copy
 * ("Bestselling products excel with innovation, quality, and consumer
 * love..."). Autoplay is a WCAG 2.2.2 problem and carousels hide most of
 * their content from crawlers; a plain grid shows every device at once and
 * is entirely in the HTML source.
 */
export default function BestProducts({
  products,
  lang,
}: {
  products: ProductMapInterface[];
  lang: Lang;
}) {
  const d = dict(lang);
  if (!products.length) return null;

  const prices = products
    .map((p) => parseFloat(p.price))
    .filter((n) => isFinite(n) && n > 0);
  const low = prices.length ? Math.min(...prices) : 0;

  return (
    <section className="mx-auto max-w-7xl px-4 py-12 lg:px-8">
      <div className="mx-auto mb-6 flex max-w-3xl flex-col gap-3">
        <h2 className="text-[clamp(24px,4.6vw,31px)] text-ink">
          {d.products.heading}
        </h2>
        <p className="max-w-prose text-xl text-ink-2">{d.products.lede}</p>
        {low > 0 && (
          <p className="font-display text-lg font-semibold text-ink">
            <span className="num">{formatTaka(low)}</span> {d.products.from}
          </p>
        )}
      </div>

      <div className="grid grid-cols-2 gap-4 md:grid-cols-3 lg:grid-cols-4">
        {products.map((product) => (
          <ProductCard key={product.slug} item={product} lang={lang} />
        ))}
      </div>

      <div className="mt-8 text-center">
        <Link
          href={lang === "en" ? "/en/hearing-aids" : "/hearing-aids"}
          className="inline-flex min-h-[52px] items-center justify-center rounded-lg border-[1.5px] border-line-strong bg-paper-surface px-6 font-display text-lg font-semibold text-ink hover:border-ink-2"
        >
          {d.products.all}
        </Link>
      </div>
    </section>
  );
}
