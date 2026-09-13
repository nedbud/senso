"use client";

import { useMemo, useState } from "react";
import Link from "next/link";
import {
  match,
  LOSS_LABEL,
  LOSS_FEELS,
  lossRangeLabel,
  FORM_FACTOR,
  type Device,
  type LossLevel,
  type Need,
} from "@/lib/catalogue";
import { formatTaka } from "@/lib/site";
import type { Lang } from "@/lib/i18n";
import AskNaatiButton from "@/components/naati/AskNaatiButton";

/**
 * The consultation, as it exists today.
 *
 * A grid of 109 devices asks the visitor to already know what they need.
 * Nobody arriving here does — the questions in the inbox are "which one for
 * my father", not "show me the Nexia 461". So the catalogue is entered
 * through the three things that actually narrow it: how much hearing is
 * gone, whether tiny batteries are a problem, and how much can be spent.
 *
 * This is deliberately the same shape the AI consultation will take. The
 * questions are the features a model would reason over, the answers are a
 * `Need`, and the result is `match(devices, need)` from the catalogue. When
 * the model arrives it replaces how the Need is arrived at — free text
 * instead of buttons, follow-up questions, an audiogram photo read — and
 * everything below the Need stays exactly as it is. Nothing here has to be
 * thrown away to get there.
 *
 * Until then it still does real work: whatever the visitor chooses is
 * carried into the WhatsApp message, so the enquiry lands already
 * describing the person rather than saying "hi".
 */

const LOSS_STEPS: LossLevel[] = ["mild", "moderate", "severe", "profound"];

const BUDGETS = [
  { max: 50000, bn: "৫০ হাজারের মধ্যে", en: "under ৳ 50,000" },
  { max: 120000, bn: "১ লাখ ২০ হাজারের মধ্যে", en: "under ৳ 120,000" },
  { max: undefined, bn: "যেটা ভালো হয়", en: "whatever works best" },
];

export default function ConsultMatcher({
  devices,
  lang,
}: {
  devices: Device[];
  lang: Lang;
}) {
  const bn = lang === "bn";
  const [need, setNeed] = useState<Need>({});
  const [touched, setTouched] = useState(false);

  const results = useMemo(() => match(devices, need), [devices, need]);
  const set = (patch: Partial<Need>) => {
    setNeed((n) => ({ ...n, ...patch }));
    setTouched(true);
  };

  const chip = (active: boolean) =>
    `inline-flex min-h-[44px] items-center rounded-full border-[1.5px] px-3.5 font-ui text-sm transition-colors ${
      active
        ? "border-brand bg-brand text-white"
        : "border-line-strong bg-paper-surface text-ink hover:border-ink-2"
    }`;

  const summary = () => {
    const parts: string[] = [];
    if (need.loss)
      parts.push(
        bn
          ? `কম শোনার মাত্রা: ${LOSS_LABEL[need.loss].bn}`
          : `Hearing loss: ${LOSS_LABEL[need.loss].en}`
      );
    if (need.rechargeable !== undefined)
      parts.push(
        need.rechargeable
          ? bn ? "রিচার্জেবল চাই" : "Wants rechargeable"
          : bn ? "ব্যাটারি চললেও সমস্যা নেই" : "Battery is fine"
      );
    if (need.discreet)
      parts.push(bn ? "বাইরে থেকে দেখা না গেলে ভালো" : "Prefers it hidden");
    if (need.maxPrice)
      parts.push(
        bn ? `বাজেট ${formatTaka(need.maxPrice)}-এর মধ্যে` : `Budget under ${formatTaka(need.maxPrice)}`
      );
    const head = bn
      ? "আসসালামু আলাইকুম। আমার জন্য কোন মেশিনটা ভালো হবে জানতে চাই।"
      : "Hello. I would like advice on which device suits me.";
    return parts.length ? `${head}\n\n${parts.join("\n")}` : head;
  };

  const Question = ({
    label,
    children,
    hint,
  }: {
    label: string;
    hint?: string;
    children: React.ReactNode;
  }) => (
    <div>
      <p className="font-ui text-base text-ink">{label}</p>
      {hint && <p className="mt-0.5 text-sm text-ink-muted">{hint}</p>}
      <div className="mt-2.5 flex flex-wrap gap-2">{children}</div>
    </div>
  );

  return (
    <div className="rounded-2xl border border-line bg-paper-surface p-5 sm:p-7">
      <h2 className="text-2xl text-ink">
        {bn ? "কোনটা আপনার জন্য?" : "Which one suits you?"}
      </h2>
      <p className="mt-2 max-w-prose text-base text-ink-2">
        {bn
          ? "তিনটে প্রশ্নের উত্তর দিন — কোনগুলো আপনার জন্য মানানসই, নিচে দেখাবে। চূড়ান্ত সিদ্ধান্ত অডিওগ্রামের পর।"
          : "Answer three questions and the suitable devices appear below. The final choice is settled after the audiogram."}
      </p>

      <div className="mt-5 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
        <Question
          label={bn ? "কতটা কম শুনছেন?" : "How much hearing is gone?"}
          hint={
            need.loss
              ? LOSS_FEELS[need.loss][lang]
              : bn
              ? "নিশ্চিত না হলে আন্দাজে বেছে নিন — পরীক্ষায় ঠিক ধরা পড়বে।"
              : "Guess if you are not sure — the test will settle it."
          }
        >
          {LOSS_STEPS.map((level) => (
            <button
              key={level}
              type="button"
              onClick={() => set({ loss: need.loss === level ? undefined : level })}
              className={chip(need.loss === level)}
              aria-pressed={need.loss === level}
            >
              {LOSS_LABEL[level][lang]}
            </button>
          ))}
        </Question>

        <Question
          label={
            bn
              ? "ছোট ব্যাটারি বদলাতে অসুবিধা হয়?"
              : "Is changing a tiny battery a problem?"
          }
        >
          <button
            type="button"
            onClick={() =>
              set({ rechargeable: need.rechargeable === true ? undefined : true })
            }
            className={chip(need.rechargeable === true)}
            aria-pressed={need.rechargeable === true}
          >
            {bn ? "হ্যাঁ, রিচার্জেবল চাই" : "Yes — rechargeable please"}
          </button>
          <button
            type="button"
            onClick={() =>
              set({ rechargeable: need.rechargeable === false ? undefined : false })
            }
            className={chip(need.rechargeable === false)}
            aria-pressed={need.rechargeable === false}
          >
            {bn ? "না, ব্যাটারি চলবে" : "No — battery is fine"}
          </button>
        </Question>

        <Question
          label={bn ? "বাজেট" : "Budget"}
        >
          {BUDGETS.map((b) => (
            <button
              key={String(b.max)}
              type="button"
              onClick={() =>
                set({ maxPrice: need.maxPrice === b.max ? undefined : b.max })
              }
              className={chip(need.maxPrice === b.max && b.max !== undefined)}
              aria-pressed={need.maxPrice === b.max}
            >
              {bn ? b.bn : b.en}
            </button>
          ))}
        </Question>

        <Question label={bn ? "দেখতে" : "Visibility"}>
          <button
            type="button"
            onClick={() => set({ discreet: !need.discreet })}
            className={chip(!!need.discreet)}
            aria-pressed={!!need.discreet}
          >
            {bn ? "বাইরে থেকে দেখা না গেলে ভালো" : "Prefer it hidden"}
          </button>
        </Question>
      </div>

      <div className="mt-6 border-t border-line pt-5">
        <p className="font-ui text-base text-ink">
          {touched
            ? bn
              ? `${results.length} টি মানানসই`
              : `${results.length} suitable`
            : bn
            ? "সব মিলিয়ে"
            : "In total"}
          <span className="num ml-2 font-normal text-ink-muted">
            {results.length > 0 &&
              `${formatTaka(results[0].priceValue)} – ${formatTaka(
                results[results.length - 1].priceValue
              )}`}
          </span>
        </p>

        {results.length === 0 ? (
          <p className="mt-3 text-base text-ink-2">
            {bn
              ? "এই শর্তে কিছু পাওয়া গেল না। বাজেট বা শর্ত একটু বদলে দেখুন, অথবা আমাদের সরাসরি লিখুন — অনেক সময় বিকল্প বের করা যায়।"
              : "Nothing matches that combination. Try loosening one answer, or just write to us — there is usually a way round it."}
          </p>
        ) : (
          <ul className="mt-4 grid grid-cols-2 gap-3 lg:grid-cols-4">
            {results.slice(0, 4).map((d) => (
              <li key={d.slug}>
                <Link
                  href={`${lang === "en" ? "/en" : ""}/hearing-aids/${d.slug}`}
                  className="flex h-full flex-col rounded-xl border border-line bg-paper p-4 transition-colors hover:border-ink-2"
                >
                  <span className="text-sm text-ink-muted">{d.series}</span>
                  <span className="font-ui text-base leading-snug text-ink">
                    {d.title}
                  </span>
                  <span className="mt-1 text-sm text-ink-muted">
                    {lossRangeLabel(d, lang)}
                    {d.formFactor && ` · ${FORM_FACTOR[d.formFactor].short[lang]}`}
                  </span>
                  <span className="num mt-auto pt-3 font-ui text-lg font-semibold text-ink">
                    {formatTaka(d.priceValue)}
                  </span>
                </Link>
              </li>
            ))}
          </ul>
        )}

        <AskNaatiButton
          lang={lang}
          seed={summary()}
          label={bn ? "এই উত্তরগুলো নিয়ে নাতির সঙ্গে কথা বলুন" : "Talk it through with Naati"}
          className="mt-5 w-full sm:w-auto"
        />
      </div>
    </div>
  );
}
