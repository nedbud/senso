import { SITE, TESTS, TEST_PACKAGE, PARTS, formatTaka, toBengaliDigits } from "@/lib/site";
import { type Lang } from "@/lib/i18n";
import { WhatsAppButton } from "@/components/ui/Buttons";

/**
 * Fixed fees, published.
 *
 * Of the ten Bangladeshi hearing businesses surveyed, only one publishes
 * test fees at all and it gives ranges. A single number reads as a price;
 * a range reads as "we will decide once you are in the chair". These are
 * also the highest-intent searches in the category — people arrive with a
 * prescription and search the test by name.
 */

const TEST_COPY: Record<
  string,
  { bn: { name: string; what: string }; en: { name: string; what: string } }
> = {
  pta: {
    bn: { name: "PTA", what: "পিওর টোন অডিওমেট্রি — কোন কোন শব্দ কতটা কম শুনছেন" },
    en: { name: "PTA", what: "Pure tone audiometry — which sounds you are missing, and by how much" },
  },
  tympanometry: {
    bn: { name: "Tympanometry", what: "কানের পর্দা ও মধ্যকর্ণের অবস্থা" },
    en: { name: "Tympanometry", what: "The eardrum and middle ear" },
  },
  srt: {
    bn: { name: "Speech / SRT", what: "কথা কতটুকু বুঝতে পারছেন" },
    en: { name: "Speech / SRT", what: "How much speech you can make out" },
  },
};

const PART_COPY: Record<string, { bn: string; en: string }> = {
  battery: { bn: "ব্যাটারি — যেকোনো সাইজ (এক পাতা, ৬ পিস)", en: "Batteries — any size (strip of 6)" },
  earmould: { bn: "ইয়ার মোল্ড তৈরি", en: "Ear mould, made to fit" },
  earhook: { bn: "ইয়ার হুক", en: "Ear hook" },
  receiver: { bn: "রিসিভার", en: "Receiver" },
  servicing: { bn: "সার্ভিসিং ও ক্লিনিং (ওয়ারেন্টির পর)", en: "Servicing and cleaning (after warranty)" },
  repair: { bn: "মেরামত (গড়, ওয়ারেন্টি ছাড়া)", en: "Repair (average, outside warranty)" },
};

export default function TestsSection({ lang }: { lang: Lang }) {
  const bn = lang === "bn";
  const mins = (n: number) => (bn ? `${toBengaliDigits(n)} মিনিট` : `${n} min`);

  return (
    <section id="tests" className="mx-auto max-w-3xl px-4 py-12 lg:px-8">
      <h2 className="mb-3 text-[clamp(24px,4.6vw,31px)] text-ink">
        {bn ? "কান পরীক্ষা ও ফি" : "Hearing tests and fees"}
      </h2>
      <p className="mb-6 max-w-prose text-xl text-ink-2">
        {bn
          ? "ডাক্তার প্রেসক্রিপশনে কোনো টেস্ট লিখে দিলে নামটা মিলিয়ে নিন। প্রেসক্রিপশন না থাকলেও সমস্যা নেই — আমাদের অডিওলজিস্ট দেখে বলে দেবেন কোনটা লাগবে।"
          : "If a doctor has written a test on your prescription, find the name below. You do not need one — our audiologist will tell you which test you need."}
      </p>

      <div className="overflow-x-auto rounded-xl border border-line bg-paper-surface">
        <table className="w-full text-[17px]">
          <thead>
            <tr className="bg-paper-2">
              <th className="px-4 py-3 text-left font-display font-semibold text-ink-2">
                {bn ? "টেস্ট" : "Test"}
              </th>
              <th className="px-4 py-3 text-right font-display font-semibold text-ink-2">
                {bn ? "ফি" : "Fee"}
              </th>
            </tr>
          </thead>
          <tbody>
            {TESTS.map((test) => (
              <tr key={test.id} className="border-t border-line">
                <td className="px-4 py-3 align-top">
                  <span className="font-semibold">{TEST_COPY[test.id][lang].name}</span>
                  <span className="mt-0.5 block text-[14.5px] leading-snug text-ink-muted">
                    {TEST_COPY[test.id][lang].what} · <span className="num">{mins(test.minutes)}</span>
                  </span>
                </td>
                <td className="num whitespace-nowrap px-4 py-3 text-right font-semibold align-top">
                  {formatTaka(test.fee)}
                </td>
              </tr>
            ))}
            <tr className="border-t border-line bg-brand-tint">
              <td className="px-4 py-3 align-top">
                <span className="font-semibold">
                  {bn ? "তিনটি একসাথে — পূর্ণ পরীক্ষা" : "All three — full assessment"}
                </span>
                <span className="mt-0.5 block text-[14.5px] leading-snug text-ink-muted">
                  {bn
                    ? "বড়দের জন্য সাধারণত এটিই লাগে · "
                    : "The usual adult assessment · "}
                  <span className="num">{mins(TEST_PACKAGE.minutes)}</span>
                </span>
              </td>
              <td className="num whitespace-nowrap px-4 py-3 text-right font-semibold align-top">
                {formatTaka(TEST_PACKAGE.fee)}
              </td>
            </tr>
          </tbody>
        </table>
      </div>

      <p className="mt-3 text-[15.5px] text-ink-muted">
        {bn
          ? `রিপোর্ট কিছুক্ষণের মধ্যেই হাতে পাবেন। টেস্টগুলো ${toBengaliDigits(TESTS[0].minAge)} বছরের বেশি বয়সীদের জন্য — ছোট শিশুদের জন্য আলাদা ব্যবস্থা আছে, জিজ্ঞেস করে নিন।`
          : `You get the report within minutes. These tests are for ages ${TESTS[0].minAge} and up — there is a separate arrangement for younger children, so please ask.`}
      </p>

      <div className="mt-5">
        <WhatsAppButton
          message={
            bn
              ? "প্রেসক্রিপশনের ছবি পাঠাচ্ছি। কোন টেস্ট লাগবে জানাবেন।"
              : "I am sending a photo of my prescription. Please tell me which tests I need."
          }
          label={bn ? "প্রেসক্রিপশন পাঠান" : "Send your prescription"}
          variant="brand"
        />
      </div>

      <h3 className="mb-3 mt-12 font-display text-2xl font-semibold text-ink">
        {bn ? "ব্যাটারি, যন্ত্রাংশ ও সার্ভিস" : "Batteries, parts and service"}
      </h3>
      <div className="overflow-x-auto rounded-xl border border-line bg-paper-surface">
        <table className="w-full text-[17px]">
          <tbody>
            {PARTS.map((part) => (
              <tr key={part.id} className="border-b border-line last:border-b-0">
                <td className="px-4 py-3">{PART_COPY[part.id][lang]}</td>
                <td className="num whitespace-nowrap px-4 py-3 text-right font-semibold">
                  {"priceHigh" in part && part.priceHigh
                    ? `${formatTaka(part.price)} – ${formatTaka(part.priceHigh)}`
                    : formatTaka(part.price)}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <p className="mt-3 text-[15.5px] text-ink-muted">
        {bn
          ? `ReSound মেশিন বিদেশ থেকে কেনা হলেও সার্ভিস করি — নিজস্ব ল্যাবে সাধারণত ১ দিনে, ওভারসিজ পাঠাতে হলে ${SITE.service.overseasWeeks} সপ্তাহ। যন্ত্রাংশ কুরিয়ারে পাঠানো যায়। আমরা শুধু ReSound-এর ডিলার।`
          : `We service ReSound devices even if bought abroad — usually one day in our own lab, ${SITE.service.overseasWeeks} weeks if it has to go overseas. Parts can be couriered. We deal in ReSound only.`}
      </p>
    </section>
  );
}
