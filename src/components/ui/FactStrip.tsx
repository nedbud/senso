import { formatTaka, getOpenState, toBengaliDigits } from "@/lib/site";
import { clockLabel, fill, DAY_NAMES, type Lang } from "@/lib/i18n";
import type { Dict } from "@/routes/dict";
import type { Clinic } from "@/routes/clinic";

/**
 * The three questions the inbox asks before any other: what a device costs,
 * what the test costs, and whether the place is open right now. No
 * competitor in this market publishes any of the three.
 *
 * Set as a compact row of figures. Nobody reads a sentence to find a number.
 */
export default function FactStrip({
  lang,
  clinic,
  d,
  lowPrice,
}: {
  lang: Lang;
  clinic: Clinic;
  d: Dict;
  lowPrice?: number;
}) {
  const bn = lang === "bn";
  // The clinic's own hours, not the ones compiled into the site: somebody who
  // changes the closing time in the panel is changing exactly this line.
  const state = getOpenState(clinic.hours);

  let openValue: string;
  if (state.isOpen && state.closesAt != null) {
    openValue = clockLabel(state.closesAt, lang);
  } else if (state.nextDay != null && state.nextOpensAt != null) {
    const today = new Date(
      new Date().toLocaleString("en-US", { timeZone: "Asia/Dhaka" })
    ).getDay();
    const label =
      state.nextDay === (today + 1) % 7
        ? d.strip.tomorrow
        : DAY_NAMES[lang][state.nextDay];
    openValue = `${label} ${clockLabel(state.nextOpensAt, lang)}`;
  } else {
    openValue = d.strip.daysFallback;
  }

  const facts = [
    {
      label: d.strip.devices,
      value: lowPrice ? formatTaka(lowPrice) : "—",
      note: d.strip.devicesNote,
    },
    {
      label: d.strip.fullTest,
      value: formatTaka(clinic.testPackage.fee),
      note: fill(d.tests.minutes, {
        n: bn
          ? toBengaliDigits(clinic.testPackage.minutes)
          : clinic.testPackage.minutes,
      }),
    },
    {
      label: state.isOpen ? d.strip.openNow : d.strip.closedNow,
      value: openValue,
      note: d.strip.openNote,
      dot: state.isOpen,
      status: true,
    },
  ];

  return (
    /* Three columns is right on a wide screen and wrong on a phone: at 390px
       each cell is about 118px, and "আগামীকাল সকাল ১০টা" set at 16px does not
       come close to fitting — it ran straight out of the card. On a phone the
       three facts become three rows instead, label left and figure right,
       which is both readable and shorter than three stacked blocks. */
    <dl className="grid grid-cols-1 divide-y divide-line rounded-xl border border-line bg-paper-surface sm:grid-cols-3 sm:divide-x sm:divide-y-0">
      {facts.map((fact) => (
        <div
          key={fact.label}
          className="flex items-baseline justify-between gap-3 px-4 py-2.5 sm:block sm:px-4 sm:py-3"
        >
          <dt className="flex min-w-0 items-center gap-1.5 text-xs font-medium text-ink-muted">
            {fact.status && (
              <span
                className={`h-1.5 w-1.5 shrink-0 rounded-full ${
                  fact.dot ? "bg-open" : "bg-shut"
                }`}
              />
            )}
            {fact.label}
          </dt>
          <div className="shrink-0 text-right sm:text-left">
            <dd className="num font-ui text-base font-bold leading-tight text-ink sm:mt-0.5 sm:text-lg">
              {fact.value}
            </dd>
            <dd className="text-xs text-ink-muted sm:text-xs">{fact.note}</dd>
          </div>
        </div>
      ))}
    </dl>
  );
}
