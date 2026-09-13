import Link from "next/link";
import { dict, type Lang } from "@/lib/i18n";
import { ACCESSORY_SERIES } from "@/routes/product";
import { listHref, type ListState } from "@/lib/listUrl";
import { formatTaka } from "@/lib/site";

/**
 * The filter bar.
 *
 * The previous version stacked every control as wrapped chips: nine series
 * over five rows, four sort options over two more, then a parts toggle —
 * about eight hundred pixels of buttons before the first hearing aid on a
 * phone. Someone who came to see prices had to scroll past the entire
 * control panel to reach one.
 *
 * So the series become a single scrolling rail, the sort collapses into a
 * disclosure that shows the current choice, and the whole thing sticks under
 * the header while the grid scrolls beneath it. Everything is still a link —
 * no JavaScript, no client component, and each combination is its own
 * crawlable URL.
 */
export default function FilterBar({
  lang,
  series,
  state,
  total,
  low,
  high,
}: {
  lang: Lang;
  series: { id?: number; name: string }[];
  state: ListState;
  total: number;
  low?: number;
  high?: number;
}) {
  const d = dict(lang);
  const bn = lang === "bn";

  const chip = (isActive: boolean) =>
    `inline-flex min-h-[44px] shrink-0 snap-start items-center whitespace-nowrap rounded-full border-[1.5px] px-4 font-ui text-base transition-colors ${
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
  const activeSort = sorts.find((s) => s.key === state.sort) ?? sorts[0];

  const devices = series.filter((s) => !ACCESSORY_SERIES.includes(s.name));

  return (
    <div className="sticky top-16 z-30 -mx-4 border-y border-line bg-paper/95 backdrop-blur-md lg:-mx-8">
      {/* One row, scrolled sideways, rather than five rows of wrapped chips.
          The mask fades the right edge so it reads as continuing. */}
      <div
        className="flex gap-2 overflow-x-auto px-4 py-3 lg:px-8"
        style={{
          scrollSnapType: "x proximity",
          scrollbarWidth: "none",
          scrollPaddingLeft: "1rem",
          maskImage:
            "linear-gradient(to right, #000 calc(100% - 32px), transparent 100%)",
          WebkitMaskImage:
            "linear-gradient(to right, #000 calc(100% - 32px), transparent 100%)",
        }}
      >
        <Link
          href={listHref(lang, state, { series: "all", parts: false })}
          className={chip(state.series === "all" && !state.parts)}
        >
          {d.products.allSeries}
        </Link>
        {devices.map((s) => {
          const value = String(s.id ?? s.name);
          return (
            <Link
              key={value}
              href={listHref(lang, state, { series: value, parts: false })}
              className={chip(state.series === value && !state.parts)}
            >
              {s.name}
            </Link>
          );
        })}
        <Link
          href={listHref(lang, state, { parts: !state.parts, series: "all" })}
          className={chip(state.parts)}
        >
          {bn ? "ব্যাটারি ও যন্ত্রাংশ" : "Batteries and parts"}
        </Link>
      </div>

      <div className="flex items-center justify-between gap-3 border-t border-line/70 px-4 py-2.5 lg:px-8">
        <p className="text-sm text-ink-2">
          <span className="num font-ui text-ink">{total}</span>{" "}
          {bn ? "টি মেশিন" : total === 1 ? "device" : "devices"}
          {low !== undefined && high !== undefined && total > 1 && (
            <span className="num ml-2 hidden text-ink-muted sm:inline">
              {formatTaka(low)} – {formatTaka(high)}
            </span>
          )}
        </p>

        {/* A disclosure rather than a select, so it stays a set of real links
            and needs no JavaScript to work. Navigating closes it. */}
        <details className="relative">
          <summary className="flex min-h-[40px] cursor-pointer list-none items-center gap-2 rounded-full border-[1.5px] border-line-strong bg-paper-surface px-4 font-ui text-sm text-ink">
            <span className="text-ink-muted">{d.products.sortBy}</span>
            <span className="max-w-[9rem] truncate">
              {activeSort.label[lang]}
            </span>
            <span aria-hidden="true" className="text-brand">
              ▾
            </span>
          </summary>
          <ul className="absolute right-0 top-[calc(100%+8px)] z-40 w-64 overflow-hidden rounded-xl border border-line bg-paper-surface py-1 shadow-lg">
            {sorts.map((s) => (
              <li key={s.key}>
                <Link
                  href={listHref(lang, state, { sort: s.key })}
                  className={`flex min-h-[46px] items-center px-4 text-base ${
                    s.key === state.sort
                      ? "bg-brand-tint font-ui text-brand-deep"
                      : "text-ink hover:bg-paper-2"
                  }`}
                >
                  {s.label[lang]}
                </Link>
              </li>
            ))}
          </ul>
        </details>
      </div>
    </div>
  );
}
