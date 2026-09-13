import Link from "next/link";
import { dict, type Lang } from "@/lib/i18n";
import { ACCESSORY_SERIES } from "@/routes/product";

/**
 * Filters are links that set query parameters, not Redux state.
 *
 * The old version kept series and sort in a Redux store, which meant the
 * filtered view had no URL — it could not be linked, shared, bookmarked or
 * indexed, and every filter change was invisible to the server. As URL state
 * each combination is a real page that Google can crawl.
 */
export default function Filters({
  lang,
  series,
  active,
  sort,
  showParts,
}: {
  lang: Lang;
  series: { id?: number; name: string }[];
  active: string;
  sort: string;
  showParts?: boolean;
}) {
  const d = dict(lang);
  const base = lang === "en" ? "/en/hearing-aids" : "/hearing-aids";

  const href = (next: { series?: string; sort?: string; parts?: boolean }) => {
    const params = new URLSearchParams();
    const s = next.series ?? active;
    const o = next.sort ?? sort;
    const parts = next.parts ?? showParts;
    if (s && s !== "all") params.set("series", s);
    if (o && o !== "asc") params.set("sort", o);
    if (parts) params.set("parts", "1");
    const qs = params.toString();
    return qs ? `${base}?${qs}` : base;
  };

  const chip = (isActive: boolean) =>
    `inline-flex min-h-[44px] items-center rounded-full border-[1.5px] px-4 font-ui ${
      isActive
        ? "border-brand bg-brand text-white"
        : "border-line-strong bg-paper-surface text-ink hover:border-ink-2"
    }`;

  const sorts: { key: string; label: Record<Lang, string> }[] = [
    { key: "asc", label: { bn: "কম দাম আগে", en: "Price: low to high" } },
    { key: "desc", label: { bn: "বেশি দাম আগে", en: "Price: high to low" } },
    { key: "best", label: { bn: "বেশি বিক্রি", en: "Best selling" } },
    { key: "leatest", label: { bn: "নতুন", en: "Latest" } },
  ];

  return (
    <div className="flex flex-col gap-5">
      <div>
        <p className="mb-2 font-ui text-ink-2">
          {d.products.filterSeries}
        </p>
        <div className="flex flex-wrap gap-2">
          <Link href={href({ series: "all" })} className={chip(active === "all")}>
            {d.products.allSeries}
          </Link>
          {series
            .filter((s) => !ACCESSORY_SERIES.includes(s.name))
            .map((s) => {
            const value = String(s.id ?? s.name);
            return (
              <Link
                key={value}
                href={href({ series: value })}
                className={chip(active === value)}
              >
                {s.name}
              </Link>
            );
          })}
        </div>
      </div>

      <div>
        <p className="mb-2 font-ui text-ink-2">
          {d.products.sortBy}
        </p>
        <div className="flex flex-wrap gap-2">
          {sorts.map((s) => (
            <Link
              key={s.key}
              href={href({ sort: s.key })}
              className={chip(sort === s.key)}
            >
              {s.label[lang]}
            </Link>
          ))}
        </div>
      </div>
      <div>
        <Link
          href={href({ parts: !showParts, series: "all" })}
          className={chip(!!showParts)}
        >
          {lang === "bn"
            ? "ব্যাটারি ও যন্ত্রাংশ"
            : "Batteries and parts"}
        </Link>
      </div>
    </div>
  );
}
