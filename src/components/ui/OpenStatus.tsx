import { getOpenState, SITE } from "@/lib/site";
import { dict, clockLabel, fill, DAY_NAMES, type Lang } from "@/lib/i18n";

/**
 * "Is it open today?" is the single most frequent question in the Facebook
 * and WhatsApp inbox. Answering it above the fold removes a whole class of
 * message. Rendered on the server in Asia/Dhaka time and revalidated with
 * the page, so it is correct in the HTML source rather than appearing after
 * hydration.
 */
export default function OpenStatus({ lang }: { lang: Lang }) {
  const d = dict(lang);
  const state = getOpenState();

  let detail: string = d.hero.hoursFallback;
  if (state.isOpen && state.closesAt != null) {
    detail = fill(d.hero.openUntil, { hour: clockLabel(state.closesAt, lang) });
  } else if (state.nextDay != null && state.nextOpensAt != null) {
    const today = new Date(
      new Date().toLocaleString("en-US", { timeZone: "Asia/Dhaka" })
    ).getDay();
    const isTomorrow = state.nextDay === (today + 1) % 7;
    const dayName = isTomorrow
      ? d.hero.tomorrow
      : DAY_NAMES[lang][state.nextDay];
    detail = fill(d.hero.opensAt, {
      day: dayName,
      hour: clockLabel(state.nextOpensAt, lang),
    });
  }

  return (
    <div className="flex flex-wrap items-center gap-x-4 gap-y-2 rounded-lg border border-line bg-paper-surface px-4 py-3 text-base">
      <span
        className={`inline-flex items-center gap-2 rounded-full px-3 py-0.5 font-ui text-base ${
          state.isOpen
            ? "bg-open-tint text-open"
            : "bg-shut-tint text-shut"
        }`}
      >
        <span
          className={`h-2.5 w-2.5 rounded-full ${
            state.isOpen ? "bg-open" : "bg-shut"
          }`}
        />
        {state.isOpen ? d.hero.openNow : d.hero.closedNow}
      </span>
      <span className="text-ink-2">{detail}</span>
    </div>
  );
}
