import { TEST_PACKAGE, formatTaka, getOpenState, toBengaliDigits } from "@/lib/site";
import { clockLabel, DAY_NAMES, type Lang } from "@/lib/i18n";

/**
 * The three questions the inbox asks before any other: what a device costs,
 * what the test costs, and whether the place is open right now. No
 * competitor in this market publishes any of the three.
 *
 * Set as a compact row of figures. Nobody reads a sentence to find a number.
 */
export default function FactStrip({
  lang,
  lowPrice,
}: {
  lang: Lang;
  lowPrice?: number;
}) {
  const bn = lang === "bn";
  const state = getOpenState();

  let openValue: string;
  if (state.isOpen && state.closesAt != null) {
    openValue = clockLabel(state.closesAt, lang);
  } else if (state.nextDay != null && state.nextOpensAt != null) {
    const today = new Date(
      new Date().toLocaleString("en-US", { timeZone: "Asia/Dhaka" })
    ).getDay();
    const label =
      state.nextDay === (today + 1) % 7
        ? bn ? "আগামীকাল" : "tomorrow"
        : DAY_NAMES[lang][state.nextDay];
    openValue = `${label} ${clockLabel(state.nextOpensAt, lang)}`;
  } else {
    openValue = bn ? "শনি – বৃহস্পতি" : "Sat – Thu";
  }

  const facts = [
    {
      label: bn ? "মেশিন" : "Devices",
      value: lowPrice ? formatTaka(lowPrice) : "—",
      note: bn ? "থেকে" : "from",
    },
    {
      label: bn ? "পূর্ণ পরীক্ষা" : "Full test",
      value: formatTaka(TEST_PACKAGE.fee),
      note: bn
        ? `${toBengaliDigits(TEST_PACKAGE.minutes)} মিনিট`
        : `${TEST_PACKAGE.minutes} min`,
    },
    {
      label: state.isOpen
        ? bn ? "এখন খোলা" : "Open now"
        : bn ? "এখন বন্ধ" : "Closed",
      value: openValue,
      note: bn ? "পর্যন্ত · শুক্র বন্ধ" : "till · closed Fri",
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
