import { SITE, TEST_PACKAGE, toBengaliDigits } from "@/lib/site";
import type { Lang } from "@/lib/i18n";

/**
 * Bangla numerals at display scale.
 *
 * With three usable photographs, photography cannot be this page's
 * structural rhythm — something else has to carry a band. Numerals set in
 * Anek Condensed ExtraBold do it, and Bangla numerals are genuinely
 * beautiful large. No hearing business in this market, and none of the
 * international brands surveyed, uses its own script's numerals as a
 * graphic device; it costs nothing and needs no assets.
 *
 * Every figure here is checkable. None of them is a marketing round number.
 */
const FOUNDED = 2007;

export default function NumberBand({ lang }: { lang: Lang }) {
  const bn = lang === "bn";
  const n = (v: number | string) => (bn ? toBengaliDigits(v) : String(v));

  const facts = [
    {
      value: n(TEST_PACKAGE.minutes),
      unit: bn ? "মিনিট" : "min",
      label: bn ? "পরীক্ষা থেকে রিপোর্ট" : "test to report",
    },
    {
      value: n(SITE.warranty.years),
      unit: bn ? "বছর" : "years",
      label: bn ? "ওয়ারেন্টি" : "warranty",
    },
    {
      value: n(SITE.warranty.followUpMonths),
      unit: bn ? "মাসে" : "months",
      label: bn ? "পর পর ফলো-আপ" : "between follow-ups",
    },
    {
      value: n(FOUNDED),
      unit: "",
      label: bn ? "সাল থেকে পান্থপথে" : "in Panthapath since",
    },
  ];

  return (
    <section className="border-y border-line bg-paper-2">
      <dl className="mx-auto grid max-w-5xl grid-cols-2 gap-x-6 gap-y-8 px-4 py-12 sm:grid-cols-4 lg:px-8">
        {facts.map((fact) => (
          <div key={fact.label}>
            <dt className="num font-display text-hero leading-[0.9] text-brand">
              {fact.value}
              {fact.unit && (
                <span className="ml-1.5 align-baseline font-ui text-lg text-ink-2">
                  {fact.unit}
                </span>
              )}
            </dt>
            <dd className="mt-2 max-w-[16ch] text-sm leading-snug text-ink-2">
              {fact.label}
            </dd>
          </div>
        ))}
      </dl>
    </section>
  );
}
