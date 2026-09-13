import { toBengaliDigits } from "@/lib/site";
import type { Lang } from "@/lib/i18n";
import type { Dict } from "@/routes/dict";
import type { Clinic } from "@/routes/clinic";
import type { Test } from "@/routes/details";

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
 * Every figure here is checkable, none is a marketing round number, and none
 * of them is written in this file any more: the warranty and the follow-up
 * come from the clinic record, the assessment time from the same place the
 * hero paragraph quotes it, the founding year from the profile. A figure that
 * changes changes here without anyone touching the site.
 */
export default function NumberBand({
  lang,
  clinic,
  d,
  tests,
}: {
  lang: Lang;
  clinic: Clinic;
  d: Dict;
  tests: Test[];
}) {
  const bn = lang === "bn";
  const n = (v: number | string) => (bn ? toBengaliDigits(v) : String(v));

  // The assessment time as the clinic states it; if it has not been filled in,
  // the tests themselves add up to the same number.
  const minutes =
    clinic.testPackage.minutes ||
    tests.reduce((total, test) => total + (test.minutes ?? 0), 0);

  const facts = [
    { value: n(minutes), unit: d.band.unitMin, label: d.band.testToReport },
    { value: n(clinic.warranty.years), unit: d.band.unitYears, label: d.band.warranty },
    { value: n(clinic.warranty.followUpMonths), unit: d.band.unitMonths, label: d.band.betweenFollowUps },
    { value: n(clinic.foundedYear), unit: "", label: d.band.since },
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
