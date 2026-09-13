import Image from "next/image";
import { SITE, TEAM, TEST_PACKAGE, formatTaka, toBengaliDigits } from "@/lib/site";
import { clockLabel, type Lang } from "@/lib/i18n";
import AudiogramMark from "@/components/ui/AudiogramMark";
import AskNaatiButton from "@/components/naati/AskNaatiButton";

/**
 * The one page here that is read rather than scanned, so it is the one page
 * given room. Everything on it is checkable: a listing on ReSound's own
 * site, a trade licence number, named people with the hours they sit, and
 * an honest section on what this centre does not do.
 *
 * That last part is deliberate. In a market where the largest competitor
 * claims sixty-four districts and ten unnamed audiologists, the credible
 * move is not a bigger claim — it is a smaller, verifiable one.
 */

const FOUNDED = 2007;

export default function AboutView({ lang }: { lang: Lang }) {
  const bn = lang === "bn";
  const years = new Date().getFullYear() - FOUNDED;
  const n = (v: number | string) => (bn ? toBengaliDigits(v) : String(v));

  const ROLE: Record<string, string> = bn
    ? {
        "in-charge": "ইন-চার্জ",
        audiologist: "অডিওলজিস্ট",
        audiometrician: "অডিওমেট্রিশিয়ান",
        counsellor: "কাউন্সেলর",
        pro: "পাবলিক রিলেশন্স",
      }
    : {
        "in-charge": "Centre in-charge",
        audiologist: "Audiologist",
        audiometrician: "Audiometrician",
        counsellor: "Counsellor",
        pro: "Public relations",
      };

  const DAYS: Record<string, string> = bn
    ? { "sat-thu": "শনি – বৃহস্পতি", "sun-thu": "রবি – বৃহস্পতি" }
    : { "sat-thu": "Sat – Thu", "sun-thu": "Sun – Thu" };

  const stats = [
    { value: n(years) + (bn ? " বছর" : " years"), label: bn ? `${n(FOUNDED)} সাল থেকে` : `since ${FOUNDED}` },
    { value: "ReSound", label: bn ? "অনুমোদিত ডিলার" : "authorised dealer" },
    { value: n(SITE.hospitals.length), label: bn ? "হাসপাতালের সাথে কাজ" : "hospitals we work with" },
    { value: n(SITE.warranty.years) + (bn ? " বছর" : " years"), label: bn ? "ওয়ারেন্টি" : "warranty" },
  ];

  const steps = bn
    ? [
        { t: "পরীক্ষা", d: `PTA, Tympanometry ও Speech — ${toBengaliDigits(TEST_PACKAGE.minutes)} মিনিটে রিপোর্ট হাতে।` },
        { t: "মেশিন ঠিক করা", d: "অডিওগ্রাম দেখে কোন ক্ষমতার মেশিন লাগবে ঠিক করা হয় — কানে দিয়ে শুনে দেখতে পারবেন।" },
        { t: "ইয়ার মোল্ড", d: "আপনার কানের ছাঁচ নিয়ে নিজস্ব ল্যাবে তৈরি। ঠিকমতো না বসলে ভালো মেশিনও কাজ করে না।" },
        { t: "ফিটিং ও যাচাই", d: "কানের ভেতরে আসলে কতটুকু শব্দ পৌঁছাচ্ছে সেটা মেপে সেট করা হয় — বাক্সের গায়ে কী লেখা তা দিয়ে নয়।" },
        { t: "এরপরও পাশে", d: `প্রতি ${toBengaliDigits(SITE.warranty.followUpMonths)} মাসে ফলো-আপ ও টিউনিং। সার্ভিস, ব্যাটারি, যন্ত্রাংশ — সবই এখানে।` },
      ]
    : [
        { t: "The test", d: `PTA, tympanometry and speech — the report in your hand in ${TEST_PACKAGE.minutes} minutes.` },
        { t: "Choosing the device", d: "The audiogram decides how much power you need. You wear one and hear the difference before deciding." },
        { t: "The ear mould", d: "Cast from your own ear in our lab. Even a good device will not work if it does not seat properly." },
        { t: "Fitting and verification", d: "We measure how much sound actually reaches the eardrum and set it from that — not from what the box claims." },
        { t: "And afterwards", d: `Follow-up and re-tuning every ${SITE.warranty.followUpMonths} months. Service, batteries and parts, all here.` },
      ];

  const limits = bn
    ? [
        "আমরা শুধু ReSound-এর ডিলার — Signia, Phonak বা Oticon মেশিন আমরা বিক্রি বা সার্ভিস করি না।",
        "কিস্তি বা EMI-এর ব্যবস্থা এখন নেই। কার্ড, বিকাশ ও বাংলা QR চলে।",
        "একবার বিক্রি হয়ে গেলে মেশিন ফেরত নেওয়া হয় না — তাই কেনার আগেই শুনে, প্রশ্ন করে নিশ্চিত হয়ে নিন।",
        "ঢাকার বাইরে আমাদের নিজস্ব শাখা নেই। ডিলার পয়েন্ট আছে, আর যন্ত্রাংশ কুরিয়ারে পাঠানো যায়।",
      ]
    : [
        "We are a ReSound dealer only — we do not sell or service Signia, Phonak or Oticon.",
        "There is no instalment or EMI facility. Cards, bKash and Bangla QR are accepted.",
        "Once a device is sold it is not taken back — so hear it, ask your questions, and be sure first.",
        "We have no branches outside Dhaka. There are dealer points, and parts can be couriered.",
      ];

  return (
    <>
      {/* ── Opening ─────────────────────────────────────────────── */}
      <section className="relative overflow-hidden border-b border-line">
        <AudiogramMark className="pointer-events-none absolute -right-32 top-6 h-[340px] w-[620px] text-line-strong opacity-50 sm:-right-10 sm:h-[420px] sm:w-[760px]" />
        <div className="relative mx-auto max-w-3xl px-4 pb-12 pt-12 sm:pt-16 lg:px-8">
          <p className="font-ui text-sm font-semibold text-brand">
            {bn ? "আমরা কারা" : "About us"}
          </p>
          <h1 className="mt-3 max-w-[18ch] text-4xl font-bold leading-[1.18] tracking-tightest text-ink">
            {bn
              ? "কান পরীক্ষা করে, মেশিন বসিয়ে, তারপর পাশে থাকা।"
              : "We test, we fit, and then we stay with you."}
          </h1>
          <p className="mt-5 max-w-prose text-lg leading-relaxed text-ink-2">
            {bn
              ? `পান্থপথে ${n(FOUNDED)} সাল থেকে। কানের মেশিন বিক্রি করা আমাদের কাজের একটা অংশ মাত্র — বাকিটা হলো ঠিক মেশিনটা বেছে দেওয়া, ঠিকভাবে বসানো, আর তারপর বছরের পর বছর সেটা ঠিক রাখা।`
              : `In Panthapath since ${FOUNDED}. Selling a hearing aid is only part of what happens here — the rest is choosing the right one, setting it properly, and keeping it right for years afterwards.`}
          </p>
        </div>
      </section>

      {/* ── Figures ─────────────────────────────────────────────── */}
      <section className="border-b border-line">
        <dl className="mx-auto grid max-w-3xl grid-cols-2 gap-y-6 px-4 py-8 sm:grid-cols-4 lg:px-8">
          {stats.map((s) => (
            <div key={s.label}>
              <dt className="num font-ui text-xl font-bold leading-tight text-ink">
                {s.value}
              </dt>
              <dd className="mt-0.5 text-sm leading-snug text-ink-muted">
                {s.label}
              </dd>
            </div>
          ))}
        </dl>
      </section>

      {/* ── What happens here — a real sequence, so it is numbered ── */}
      <section className="mx-auto max-w-3xl px-4 py-12 lg:px-8">
        <h2 className="text-xl font-bold tracking-tightest text-ink">
          {bn ? "এখানে যা যা হয়" : "What happens here"}
        </h2>
        <ol className="mt-6 divide-y divide-line border-y border-line">
          {steps.map((step, i) => (
            <li key={step.t} className="flex gap-4 py-5 sm:gap-6">
              <span className="num shrink-0 pt-0.5 font-ui text-sm font-bold text-brand">
                {n(i + 1).padStart(2, bn ? "০" : "0")}
              </span>
              <div>
                <h3 className="font-ui text-lg font-semibold text-ink">
                  {step.t}
                </h3>
                <p className="mt-1 max-w-prose text-base leading-relaxed text-ink-2">
                  {step.d}
                </p>
              </div>
            </li>
          ))}
        </ol>
      </section>

      {/* ── The people ──────────────────────────────────────────── */}
      <section className="mx-auto max-w-3xl px-4 pb-12 lg:px-8">
        <h2 className="text-xl font-bold tracking-tightest text-ink">
          {bn ? "যাঁদের কাছে আসছেন" : "The people you will meet"}
        </h2>
        <p className="mt-2 max-w-prose text-base text-ink-2">
          {bn
            ? "নির্দিষ্ট কারও কাছে আসতে চাইলে হোয়াটসঅ্যাপে বলে সিরিয়াল নিয়ে নিন।"
            : "If you want to see a particular person, say so on WhatsApp when you book."}
        </p>

        <ul className="mt-6 grid gap-3 sm:grid-cols-2">
          {TEAM.map((member) => (
            <li
              key={member.nameEn}
              className="flex items-center gap-4 rounded-2xl border border-line bg-paper-surface p-4"
            >
              {/* TODO: replace with a real photograph — one per person was
                  asked for on the information form and has not arrived. */}
              <span
                aria-hidden="true"
                className="grid h-14 w-14 shrink-0 place-items-center rounded-full border border-dashed border-line-strong bg-paper-2 font-ui text-lg font-bold text-ink-muted"
              >
                {(bn ? member.name : member.nameEn).trim().charAt(0)}
              </span>
              <div className="min-w-0">
                <p className="font-ui text-base font-semibold leading-tight text-ink">
                  {bn ? member.name : member.nameEn}
                </p>
                <p className="text-sm text-ink-muted">{ROLE[member.role]}</p>
                <p className="num mt-0.5 text-sm text-ink-2">
                  {DAYS[member.days]}, {clockLabel(member.from, lang)} –{" "}
                  {clockLabel(member.to, lang)}
                </p>
              </div>
            </li>
          ))}
        </ul>
      </section>

      {/* ── Verification ────────────────────────────────────────── */}
      <section className="bg-paper-deep text-ink-inverse">
        <div className="mx-auto max-w-3xl px-4 py-12 lg:px-8">
          <h2 className="text-xl font-bold tracking-tightest">
            {bn ? "যাচাই করে নিন" : "Check it for yourself"}
          </h2>
          <p className="mt-3 max-w-prose text-base leading-relaxed text-white/70">
            {bn
              ? "বাংলাদেশের ডিলার হিসেবে ReSound তাদের নিজেদের ওয়েবসাইটে আমাদের নাম দিয়েছে। ঢাকার আর কোনো হিয়ারিং সেন্টার সম্পর্কে এই কথাটা যাচাই করা যায় না।"
              : "ReSound names us as their Bangladesh dealer on their own website. That is not something you can check about most hearing centres in Dhaka."}
          </p>

          <a
            href={SITE.dealer.proofUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="mt-4 inline-flex min-h-[44px] items-center font-ui underline decoration-brand decoration-2 underline-offset-4 hover:decoration-white"
          >
            {bn ? "ReSound-এর তালিকায় দেখুন" : "See ReSound's listing"}
          </a>

          <dl className="mt-8 grid gap-x-8 gap-y-5 border-t border-white/10 pt-6 sm:grid-cols-2">
            <div>
              <dt className="text-sm text-white/50">
                {bn ? "পান্থপথে" : "In Panthapath"}
              </dt>
              <dd className="num mt-1 font-medium">
                {bn ? `${toBengaliDigits(FOUNDED)} সাল থেকে` : `Since ${FOUNDED}`}
              </dd>
            </div>
            <div>
              <dt className="text-sm text-white/50">
                {bn ? "যেসব হাসপাতালের সাথে কাজ" : "Hospitals we work with"}
              </dt>
              <dd className="mt-1 font-medium">{SITE.hospitals.join(" · ")}</dd>
            </div>
          </dl>

          <figure className="mt-8">
            <Image
              src="/assets/Images/temp/Business_Excellence_award_2019.jpeg"
              alt={
                bn
                  ? "Business Excellence Award 2019"
                  : "Business Excellence Award 2019"
              }
              width={900}
              height={800}
              className="h-auto w-full max-w-sm rounded-xl border border-white/10 object-cover"
            />
            <figcaption className="mt-2 text-sm text-white/50">
              Business Excellence Award, 2019
            </figcaption>
          </figure>
        </div>
      </section>

      {/* ── Honest limits ───────────────────────────────────────── */}
      <section className="mx-auto max-w-3xl px-4 py-12 lg:px-8">
        <h2 className="text-xl font-bold tracking-tightest text-ink">
          {bn ? "যা আমরা করি না" : "What we do not do"}
        </h2>
        <p className="mt-2 max-w-prose text-base text-ink-2">
          {bn
            ? "আসার আগে জেনে রাখলে দুই পক্ষেরই সময় বাঁচে।"
            : "Knowing this before you come saves everyone's time."}
        </p>
        <ul className="mt-5 flex flex-col gap-3">
          {limits.map((line) => (
            <li
              key={line}
              className="border-l-2 border-line-strong pl-4 text-base leading-relaxed text-ink-2"
            >
              {line}
            </li>
          ))}
        </ul>
      </section>

      {/* ── Where, and the way in ───────────────────────────────── */}
      <section className="border-t border-line bg-paper-2">
        <div className="mx-auto max-w-3xl px-4 py-12 lg:px-8">
          <h2 className="text-xl font-bold tracking-tightest text-ink">
            {bn ? "কোথায় আসবেন" : "Where to find us"}
          </h2>
          <p className="mt-4 text-lg leading-snug text-ink">
            {bn ? SITE.address.lineBn : SITE.address.line}
            <br />
            {bn
              ? `${SITE.address.cityBn}-${SITE.address.postcode}`
              : `${SITE.address.city}-${SITE.address.postcode}`}
          </p>
          <p className="mt-1.5 text-base text-ink-muted">
            {bn ? SITE.address.landmarkBn : SITE.address.landmark}
            <br />
            {bn ? SITE.address.floorNoteBn : SITE.address.floorNote}
          </p>
          <p className="mt-3 text-base text-ink-2">
            {bn
              ? "শনি – বৃহস্পতি, সকাল ১০টা – রাত ৮টা। শুক্রবার ও সরকারি ছুটিতে বন্ধ।"
              : "Saturday – Thursday, 10 AM – 8 PM. Closed Friday and government holidays."}
          </p>

          <div className="mt-6 grid gap-2.5 sm:grid-cols-2">
            <AskNaatiButton
              lang={lang}
              label={bn ? "নাতির সঙ্গে কথা বলুন" : "Talk to Naati"}
            />
          </div>

          <a
            href={SITE.address.mapsUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="mt-3 inline-flex min-h-[44px] items-center font-ui text-brand underline underline-offset-4"
          >
            {bn ? "ম্যাপে দেখুন" : "Open in Maps"}
          </a>
        </div>
      </section>
    </>
  );
}
