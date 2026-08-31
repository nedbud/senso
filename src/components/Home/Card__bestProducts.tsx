import Link from "next/link";
import Image from "next/image";
import { formatTaka } from "@/lib/site";
import { dict, type Lang } from "@/lib/i18n";
import type { ProductMapInterface } from "@/routes/product";

/**
 * The old card rotated the product image -6deg and rendered the name in one
 * of three colours chosen by array index, which made the name hard to read
 * and meant nothing. It also never showed the price — `price` was not even
 * in the component's props interface — on cards whose titles literally end
 * "...price in Bangladesh".
 */
export default function ProductCard({
  item,
  lang,
}: {
  item: ProductMapInterface;
  lang: Lang;
}) {
  const d = dict(lang);
  const href = `${lang === "en" ? "/en" : ""}/hearing-aids/${item.slug}`;
  const image =
    item.image && item.image.length > 50
      ? item.image
      : "/assets/Images/Common/senso_404_not_found.png";

  // Product names in the CMS carry the SEO phrase, e.g. "Resound key 461 DRW
  // RIE hearing aid price in Bangladesh". Trim it for display; the full
  // string stays in the alt text and on the detail page.
  const display = item.name
    .replace(/\s*hearing aid price in bangladesh\s*$/i, "")
    .trim();

  return (
    <Link
      href={href}
      className="group flex h-full flex-col overflow-hidden rounded-xl border border-line bg-paper-surface transition-colors hover:border-brand"
    >
      <div className="relative aspect-[4/3] w-full bg-paper-2">
        <Image
          src={image}
          alt={item.name}
          fill
          sizes="(max-width: 640px) 50vw, (max-width: 1024px) 33vw, 280px"
          className="object-contain p-4"
        />
      </div>

      <div className="flex flex-1 flex-col gap-1 p-4">
        <p className="font-display text-lg font-semibold leading-snug text-ink">
          {display}
        </p>
        <p className="text-[15px] text-ink-muted">
          {item.series}
        </p>
        <p className="num mt-auto pt-3 font-display text-2xl font-bold text-brand">
          {formatTaka(item.price)}
        </p>
        <span className="font-display text-[15px] font-semibold text-ink-2 group-hover:text-brand">
          {d.products.details} →
        </span>
      </div>
    </Link>
  );
}
