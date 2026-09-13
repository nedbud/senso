import { SITE, TESTS, TEST_PACKAGE, PARTS, formatTaka, toBengaliDigits } from "@/lib/site";
import { type Lang } from "@/lib/i18n";
import AskNaatiButton from "@/components/naati/AskNaatiButton";

/**
 * Fixed fees, published.
 *
 * Of the ten Bangladeshi hearing businesses surveyed, one publishes test
 * fees and gives ranges. A single number reads as a price; a range reads as
 * "we will decide once you are in the chair". These are also the highest
 * intent searches in the category — people arrive holding a prescription
 * and search the test by name.
 *
 * Parts are one line rather than a second table. The demand is real but it
 * is a returning customer's errand, not something a first-time visitor
 * needs to read past.
 */

const COPY: Record<string, Record<Lang, string>> = {
  pta: { bn: "PTA — কোন কোন শব্দ কম শুনছেন", en: "PTA — which sounds you are missing" },
  tympanometry: { bn: "Tympanometry — কানের পর্দা ও মধ্যকর্ণ", en: "Tympanometry — eardrum and middle ear" },
  srt: { bn: "Speech / SRT — কথা কতটুকু বোঝেন", en: "Speech / SRT — how much speech you make out" },
};

export default function TestsSection({ lang }: { lang: Lang }) {
  const bn = lang === "bn";
  const mins = (n: number) => (bn ? `${toBengaliDigits(n)} মিনিট` : `${n} min`);
  const battery = PARTS.find((p) => p.id === "battery")!;
  const mould = PARTS.find((p) => p.id === "earmould")!;

  return (
    <section id="tests" className="mx-auto max-w-3xl px-4 py-10 lg:px-8">
      <h2 className="text-xl font-bold tracking-tightest text-ink">
        {bn ? "পরীক্ষার ফি ও সময়" : "Test fees and how long they take"}
      </h2>
      <p className="mt-3 max-w-prose text-base text-ink-2">
        {bn
          ? "প্রেসক্রিপশন না থাকলেও চলবে — অডিওলজিস্ট দেখে বলে দেবেন কোনটা লাগবে।"
          : "You do not need a prescription — the audiologist will tell you which test you need."}
      </p>

      <ul className="mt-6 overflow-hidden rounded-2xl border border-line bg-paper-surface">
        {TESTS.map((test) => (
          <li
            key={test.id}
            className="flex items-baseline justify-between gap-4 border-b border-line px-5 py-3.5"
          >
            <span className="text-base text-ink-2">{COPY[test.id][lang]}</span>
            <span className="num shrink-0 font-ui text-base font-semibold text-ink">
              {formatTaka(test.fee)}
            </span>
          </li>
        ))}
        <li className="flex items-baseline justify-between gap-4 bg-brand-tint px-5 py-4">
          <span className="font-ui text-base font-semibold text-ink">
            {bn ? "তিনটি একসাথে" : "All three together"}
            <span className="num ml-2 font-sans text-sm font-normal text-ink-muted">
              {mins(TEST_PACKAGE.minutes)}
            </span>
          </span>
          <span className="num shrink-0 font-ui text-xl font-bold text-brand">
            {formatTaka(TEST_PACKAGE.fee)}
          </span>
        </li>
      </ul>

      <p className="mt-3 text-sm text-ink-muted">
        {bn
          ? `রিপোর্ট কিছুক্ষণের মধ্যেই। ${toBengaliDigits(TESTS[0].minAge)} বছরের বেশি বয়সীদের জন্য — ছোট শিশুদের জন্য আলাদা ব্যবস্থা আছে।`
          : `Report within minutes. For ages ${TESTS[0].minAge} and up — there is a separate arrangement for younger children.`}
      </p>

      <div className="mt-6">
        <AskNaatiButton
          lang={lang}
          seed={
            bn
              ? "প্রেসক্রিপশনের ছবি পাঠাচ্ছি। কোন টেস্ট লাগবে জানাবেন।"
              : "I am sending a photo of my prescription. Please tell me which tests I need."
          }
          label={bn ? "প্রেসক্রিপশন দেখান" : "Show your prescription"}
        />
      </div>

      <p className="mt-8 border-t border-line pt-6 text-base text-ink-2">
        {bn ? (
          <>
            <strong className="font-semibold text-ink">সার্ভিস ও যন্ত্রাংশ —</strong>{" "}
            ব্যাটারি {formatTaka(battery.price)} (এক পাতা), ইয়ার মোল্ড{" "}
            {formatTaka(mould.price)}। ReSound মেশিন বিদেশ থেকে কেনা হলেও সার্ভিস
            করি, নিজস্ব ল্যাবে সাধারণত ১ দিনে। যন্ত্রাংশ কুরিয়ারে পাঠানো যায়।
          </>
        ) : (
          <>
            <strong className="font-semibold text-ink">Service and parts —</strong>{" "}
            batteries {formatTaka(battery.price)} a strip, ear moulds{" "}
            {formatTaka(mould.price)}. We service ReSound devices even if bought
            abroad, usually within a day in our own lab. Parts can be couriered.
          </>
        )}
      </p>
    </section>
  );
}
