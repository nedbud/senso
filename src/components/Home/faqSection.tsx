import type { Lang } from "@/lib/i18n";
import type { Dict } from "@/routes/dict";
import type { FaqItem } from "@/lib/faq";

// The questions arrive as a prop. The page that renders this already fetches
// them for its structured data, and a second read here would be the same
// request twice with a chance of the two disagreeing.
export default function FaqSection({
  lang,
  items,
  d,
}: {
  lang: Lang;
  items: FaqItem[];
  d: Dict;
}) {
  return (
    <section id="faq" className="mx-auto max-w-3xl px-4 py-10 lg:px-8">
      <h2 className="mb-6 text-xl font-bold tracking-tightest text-ink">
        {d.faq.heading}
      </h2>

      <div className="flex flex-col gap-2.5">
        {items.map((item) => (
          <details
            key={item.question}
            className="group rounded-lg border border-line bg-paper-surface px-4 open:pb-4"
          >
            <summary className="flex cursor-pointer items-center justify-between gap-4 py-4 font-ui text-lg font-semibold text-ink marker:content-['']">
              {item.question}
              <span
                aria-hidden="true"
                className="shrink-0 text-2xl leading-none text-brand"
              >
                <span className="group-open:hidden">+</span>
                <span className="hidden group-open:inline">−</span>
              </span>
            </summary>
            <p className="text-base text-ink-2">{item.answer}</p>
            {item.roman && (
              <p className="mt-2 text-sm text-ink-muted">{item.roman}</p>
            )}
          </details>
        ))}
      </div>
    </section>
  );
}
