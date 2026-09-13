import Link from "next/link";
import { listHref, type ListState } from "@/lib/listUrl";
import { toBengaliDigits } from "@/lib/site";
import type { Lang } from "@/lib/i18n";

/**
 * Paging, as links.
 *
 * A hundred and four hearing aids in one grid is a twenty-thousand-pixel
 * page: slow to load on mobile data, impossible to hold a place in, and
 * indistinguishable from every other page of the catalogue to a crawler.
 * Twenty-four to a page gives four short pages, each with its own URL and
 * its own place in the sitemap.
 *
 * Rendered as real anchors so the browser's back button, middle click and
 * Googlebot all behave. `rel="prev"`/`rel="next"` state the sequence.
 */
export default function Pagination({
  lang,
  state,
  pages,
}: {
  lang: Lang;
  state: ListState;
  pages: number;
}) {
  if (pages <= 1) return null;
  const bn = lang === "bn";
  const current = state.page;
  const n = (x: number) => (bn ? toBengaliDigits(x) : String(x));

  // First, last, and a window around the current page — with gaps marked
  // rather than rendered as another twenty links on a phone.
  const candidates = [1, pages, current - 1, current, current + 1];
  if (current <= 2) candidates.push(3);
  if (current >= pages - 1) candidates.push(pages - 2);
  const shown = candidates
    .filter((p, i) => p >= 1 && p <= pages && candidates.indexOf(p) === i)
    .sort((a, b) => a - b);

  const box =
    "inline-flex h-11 min-w-[44px] items-center justify-center rounded-lg border-[1.5px] px-3 font-ui text-base";
  // On a narrow phone the words push "next" onto its own row; the arrows
  // carry the meaning on their own at that size.
  const word = "hidden sm:inline";

  return (
    <nav
      aria-label={bn ? "পাতা" : "Pagination"}
      className="mt-10 flex flex-wrap items-center justify-center gap-2"
    >
      {current > 1 ? (
        <Link
          href={listHref(lang, state, { page: current - 1 })}
          rel="prev"
          className={`${box} border-line-strong bg-paper-surface text-ink hover:border-ink-2`}
        >
          ← <span className={word}>{bn ? "আগের" : "Previous"}</span>
        </Link>
      ) : (
        <span className={`${box} border-line bg-paper text-ink-muted`} aria-hidden="true">
          ← <span className={word}>{bn ? "আগের" : "Previous"}</span>
        </span>
      )}

      {shown.map((p, i) => (
        <span key={p} className="contents">
          {i > 0 && shown[i - 1] !== p - 1 && (
            <span className="px-1 text-ink-muted" aria-hidden="true">
              …
            </span>
          )}
          {p === current ? (
            <span
              aria-current="page"
              className={`${box} num border-brand bg-brand text-white`}
            >
              {n(p)}
            </span>
          ) : (
            <Link
              href={listHref(lang, state, { page: p })}
              className={`${box} num border-line-strong bg-paper-surface text-ink hover:border-ink-2`}
            >
              {n(p)}
            </Link>
          )}
        </span>
      ))}

      {current < pages ? (
        <Link
          href={listHref(lang, state, { page: current + 1 })}
          rel="next"
          className={`${box} border-line-strong bg-paper-surface text-ink hover:border-ink-2`}
        >
          <span className={word}>{bn ? "পরের" : "Next"}</span> →
        </Link>
      ) : (
        <span className={`${box} border-line bg-paper text-ink-muted`} aria-hidden="true">
          <span className={word}>{bn ? "পরের" : "Next"}</span> →
        </span>
      )}
    </nav>
  );
}
