import Link from "next/link";
import {
  LOSS_LABEL,
  LOSS_FEELS,
  filterByNeed,
  type Device,
  type LossLevel,
} from "@/lib/catalogue";
import { listHref, clearNeed, toNeed, type ListState } from "@/lib/listUrl";
import { toBengaliDigits } from "@/lib/site";
import type { Lang } from "@/lib/i18n";

/**
 * The way into the catalogue.
 *
 * This used to be a client component that ran the same matching logic and
 * then printed its own four-card shortlist above the real list — two lists
 * on one page, answering the same question twice, with the WhatsApp button
 * in between. The answers should not produce a second list; they should
 * change the one already there.
 *
 * So each answer is a link that sets a query parameter, the grid below is
 * filtered by those parameters on the server, and the count in the bar is
 * the count of what is left. Select, and the models start narrowing.
 *
 * This is still where the AI consultation slots in. The questions are the
 * attributes a model would reason over, the answers are a `Need`, and a
 * `Need` is now expressible as a URL — which means the eventual model does
 * not have to render anything at all. It reads what the person typed and
 * sends them to the catalogue already filtered.
 */

const LOSS_STEPS: LossLevel[] = ["mild", "moderate", "severe", "profound"];

const BUDGETS = [
  { max: 50000, bn: "৫০ হাজারের মধ্যে", en: "Under ৳ 50,000" },
  { max: 120000, bn: "১ লাখ ২০ হাজারের মধ্যে", en: "Under ৳ 120,000" },
];

export default function NeedPicker({
  lang,
  state,
  pool,
}: {
  lang: Lang;
  state: ListState;
  /** everything the series and sort leave in play, before these answers */
  pool: Device[];
}) {
  const bn = lang === "bn";

  /**
   * How many devices each option would leave, given the answers already
   * given. Without this a visitor can pick two reasonable things and land on
   * an empty page with no idea which one to undo — and 45 of the 104 devices
   * do not state their battery type at all, so some combinations really are
   * empty. Showing the number turns a dead end into an informed choice.
   */
  const countIf = (patch: Partial<ListState>) =>
    filterByNeed(pool, toNeed({ ...state, ...patch })).length;
  const active =
    state.loss !== undefined ||
    state.rech !== undefined ||
    state.hidden !== undefined ||
    state.max !== undefined;

  const chipClass = (on: boolean, dead: boolean) =>
    `inline-flex min-h-[44px] items-center gap-2 rounded-full border-[1.5px] px-3.5 font-ui text-sm transition-colors ${
      on
        ? "border-brand bg-brand text-white"
        : dead
        ? "cursor-not-allowed border-line bg-paper text-ink-muted"
        : "border-line-strong bg-paper-surface text-ink hover:border-ink-2"
    }`;

  const Choice = ({
    on,
    patch,
    children,
  }: {
    on: boolean;
    patch: Partial<ListState>;
    children: React.ReactNode;
  }) => {
    const n = countIf(patch);
    const dead = !on && n === 0;
    const body = (
      <>
        {children}
        <span className={`num text-xs ${on ? "text-white/70" : "text-ink-muted"}`}>
          {bn ? toBengaliDigits(n) : n}
        </span>
      </>
    );
    if (dead) {
      return (
        <span className={chipClass(false, true)} aria-disabled="true">
          {body}
        </span>
      );
    }
    return (
      <Link href={listHref(lang, state, patch)} className={chipClass(on, false)}>
        {body}
      </Link>
    );
  };

  const Row = ({
    label,
    hint,
    children,
  }: {
    label: string;
    hint?: string;
    children: React.ReactNode;
  }) => (
    <div>
      <p className="font-ui text-base text-ink">{label}</p>
      {hint && <p className="mt-0.5 text-sm leading-snug text-ink-muted">{hint}</p>}
      <div className="mt-2.5 flex flex-wrap gap-2">{children}</div>
    </div>
  );

  return (
    <section className="rounded-2xl border border-line bg-paper-surface p-5 sm:p-7">
      <div className="flex flex-wrap items-baseline justify-between gap-3">
        <h2 className="text-2xl text-ink">
          {bn ? "কোনটা আপনার জন্য?" : "Which one suits you?"}
        </h2>
        {active && (
          <Link
            href={listHref(lang, state, clearNeed(state))}
            className="font-ui text-sm text-brand underline underline-offset-4"
          >
            {bn ? "সব শর্ত বাদ দিন" : "Clear all"}
          </Link>
        )}
      </div>

      <p className="mt-2 max-w-prose text-base text-ink-2">
        {bn
          ? "যা যা মিলিয়ে নিতে চান বেছে নিন — নিচের তালিকা সেই অনুযায়ী ছোট হয়ে আসবে। চূড়ান্ত সিদ্ধান্ত অডিওগ্রামের পর।"
          : "Pick what matters and the list below narrows to match. The final choice is settled after the audiogram."}
      </p>

      <div className="mt-5 grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
        <Row
          label={bn ? "কতটা কম শুনছেন?" : "How much hearing is gone?"}
          hint={
            state.loss
              ? LOSS_FEELS[state.loss][lang]
              : bn
              ? "নিশ্চিত না হলে আন্দাজে বেছে নিন।"
              : "Guess if you are not sure."
          }
        >
          {LOSS_STEPS.map((level) => (
            <Choice
              key={level}
              on={state.loss === level}
              patch={{ loss: state.loss === level ? undefined : level }}
            >
              {LOSS_LABEL[level][lang]}
            </Choice>
          ))}
        </Row>

        <Row
          label={
            bn
              ? "ছোট ব্যাটারি বদলাতে অসুবিধা হয়?"
              : "Is changing a tiny battery a problem?"
          }
        >
          <Choice
            on={state.rech === true}
            patch={{ rech: state.rech === true ? undefined : true }}
          >
            {bn ? "হ্যাঁ, রিচার্জেবল চাই" : "Rechargeable"}
          </Choice>
          <Choice
            on={state.rech === false}
            patch={{ rech: state.rech === false ? undefined : false }}
          >
            {bn ? "না, ব্যাটারি চলবে" : "Battery is fine"}
          </Choice>
        </Row>

        <Row label={bn ? "বাজেট" : "Budget"}>
          {BUDGETS.map((b) => (
            <Choice
              key={b.max}
              on={state.max === b.max}
              patch={{ max: state.max === b.max ? undefined : b.max }}
            >
              {bn ? b.bn : b.en}
            </Choice>
          ))}
        </Row>

        <Row label={bn ? "দেখতে" : "Visibility"}>
          <Choice
            on={!!state.hidden}
            patch={{ hidden: state.hidden ? undefined : true }}
          >
            {bn ? "বাইরে থেকে দেখা না গেলে ভালো" : "Prefer it hidden"}
          </Choice>
        </Row>
      </div>

    </section>
  );
}
