import { dict, type Lang } from "@/lib/i18n";
import { FAQ } from "@/lib/faq";

export default function FaqSection({ lang }: { lang: Lang }) {
  const d = dict(lang);
  const items = FAQ[lang];

  return (
    <section id="faq" className="mx-auto max-w-3xl px-4 py-12 lg:px-8">
      <h2 className="mb-6 text-[clamp(24px,4.6vw,31px)] text-ink">
        {d.faq.heading}
      </h2>

      <div className="flex flex-col gap-2.5">
        {items.map((item) => (
          <details
            key={item.question}
            className="group rounded-lg border border-line bg-paper-surface px-4 open:pb-4"
          >
            <summary className="flex cursor-pointer items-center justify-between gap-4 py-4 font-display text-lg font-semibold text-ink marker:content-['']">
              {item.question}
              <span
                aria-hidden="true"
                className="shrink-0 text-2xl leading-none text-brand"
              >
                <span className="group-open:hidden">+</span>
                <span className="hidden group-open:inline">−</span>
              </span>
            </summary>
            <p className="text-[17px] text-ink-2">{item.answer}</p>
            {item.roman && (
              <p className="mt-2 text-[15px] text-ink-muted">{item.roman}</p>
            )}
          </details>
        ))}
      </div>
    </section>
  );
}
