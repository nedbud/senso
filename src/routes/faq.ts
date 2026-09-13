/**
 * The questions, from the CMS.
 *
 * They lived in src/lib/faq.ts, which meant correcting a price inside an
 * answer — and four of the eleven quote a price — took a developer and a
 * deployment. An FAQ whose answers have gone stale is worse than no FAQ: it is
 * the page people trust most and the one nobody remembers to update.
 *
 * The file stays as the fallback. If the CMS is unreachable, or nobody has
 * written a question yet, the site shows exactly what it shows today.
 */
import { FAQ as FALLBACK, type FaqItem } from "@/lib/faq";
import type { Lang } from "@/lib/i18n";

const BASE = (process.env.NEXT_PUBLIC_BASE_URL ?? "").replace(/\/+$/, "");
const HOUR = 3600;

interface FaqApi {
  id: number;
  question: { bn: string | null; en: string | null };
  answer: { bn: string | null; en: string | null };
  roman: string | null;
}

export async function getFaq(lang: Lang): Promise<FaqItem[]> {
  if (!BASE) return [...FALLBACK[lang]];

  try {
    const res = await fetch(`${BASE}/api/senso/faqs`, { next: { revalidate: HOUR } });
    if (!res.ok) return [...FALLBACK[lang]];
    if (!(res.headers.get("content-type") ?? "").includes("application/json")) {
      return [...FALLBACK[lang]];
    }

    const json = (await res.json()) as { data?: FaqApi[] };
    const rows = json?.data ?? [];

    const items = rows
      .map((row) => {
        // A question written in one language only is still worth showing — it
        // is the answer that matters, and a missing translation should not
        // silently drop the question from the page.
        const question = row.question?.[lang]?.trim() || row.question?.[lang === "bn" ? "en" : "bn"]?.trim();
        const answer = row.answer?.[lang]?.trim() || row.answer?.[lang === "bn" ? "en" : "bn"]?.trim();
        if (!question || !answer) return null;
        const item: FaqItem = { question, answer };
        // Assigned only when present: `roman: undefined` and no roman key at
        // all are the same thing to a reader and different things to the
        // type, and the optional property is the honest shape.
        if (row.roman) item.roman = row.roman;
        return item;
      })
      .filter((x): x is FaqItem => x !== null);

    return items.length ? items : [...FALLBACK[lang]];
  } catch {
    return [...FALLBACK[lang]];
  }
}
