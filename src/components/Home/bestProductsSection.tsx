import Link from "next/link";
import { dict, type Lang } from "@/lib/i18n";
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


  return (
    <section className="mx-auto max-w-5xl px-4 py-10 lg:px-8">
      <div className="mb-6 flex max-w-3xl flex-col gap-3">
        <h2 className="text-xl font-bold tracking-tightest text-ink">
          {d.products.heading}
        </h2>
        <p className="max-w-prose text-base text-ink-2">{d.products.lede}</p>

      </div>

      <div className="grid grid-cols-2 gap-4 md:grid-cols-3">
        {products.map((product) => (
          <ProductCard key={product.slug} item={product} lang={lang} />
        ))}
      </div>

      <div className="mt-8 text-center">
        <Link
          href={lang === "en" ? "/en/hearing-aids" : "/hearing-aids"}
          className="inline-flex min-h-[52px] items-center justify-center rounded-lg border-[1.5px] border-line-strong bg-paper-surface px-6 font-ui text-lg font-semibold text-ink hover:border-ink-2"
        >
          {d.products.all}
        </Link>
      </div>
    </section>
  );
}
