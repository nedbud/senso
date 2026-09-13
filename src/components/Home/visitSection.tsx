"use client";

import { SITE } from "@/lib/site";
import { dict, type Lang } from "@/lib/i18n";
import AskNaatiButton from "@/components/naati/AskNaatiButton";
import SocialLinks from "@/components/ui/SocialLinks";

/**
 * Contact and directions in one place.
 *
 * The callback form that used to sit behind the disclosure at the bottom is
 * gone. It submitted the visitor's name, number and a description of their
 * hearing problem from their own browser to EmailJS in the United States,
 * with no notice and no consent — health data about an identified person,
 * leaving the country. See contactSection.tsx, which had the same form and
 * the same problem. Naati now does the job properly and books a real serial.
 */
export default function VisitSection({ lang }: { lang: Lang }) {
  const d = dict(lang);
  const bn = lang === "bn";

  return (
    <section id="visit" className="mx-auto max-w-3xl px-4 py-10 lg:px-8">
      <h2 className="text-xl font-bold tracking-tightest text-ink">
        {bn ? "কোথায় আসবেন" : "Finding us"}
      </h2>

      <div className="mt-5 overflow-hidden rounded-2xl border border-line bg-paper-surface">
        <div className="flex flex-col gap-1 px-5 py-5">
          <p className="text-lg leading-snug text-ink">
            {bn ? SITE.address.lineBn : SITE.address.line}
            <br />
            {bn
              ? `${SITE.address.cityBn}-${SITE.address.postcode}`
              : `${SITE.address.city}-${SITE.address.postcode}`}
          </p>
          <p className="text-base text-ink-muted">
            {bn ? SITE.address.landmarkBn : SITE.address.landmark}
            <br />
            {bn ? SITE.address.floorNoteBn : SITE.address.floorNote}
          </p>
          <p className="mt-2 text-base text-ink-2">
            {bn
              ? "শনি – বৃহস্পতি, সকাল ১০টা – রাত ৮টা। শুক্রবার ও সরকারি ছুটিতে বন্ধ।"
              : "Saturday – Thursday, 10 AM – 8 PM. Closed Friday and government holidays."}
          </p>
        </div>

        <div className="grid gap-2.5 border-t border-line p-4 sm:grid-cols-2">
          <AskNaatiButton lang={lang} className="w-full" />
          <a
            href={SITE.address.mapsUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex min-h-[52px] items-center justify-center rounded-lg border-[1.5px] border-line-strong px-4 font-ui text-ink hover:border-ink-2"
          >
            {d.common.map}
          </a>
        </div>
      </div>

      <p className="mt-3 text-sm text-ink-muted">
        {bn
          ? "সিরিয়াল নিয়ে এলে ভালো — সিরিয়াল ছাড়া গড়ে ২ ঘণ্টা পর্যন্ত অপেক্ষা করতে হতে পারে। ঢাকার বাইরে থেকে এলে সকাল ১০টার মধ্যে পৌঁছালে এক দিনেই সব শেষ হয়ে যায় (৩–৪ ঘণ্টা)।"
          : "Book ahead if you can — without an appointment the wait averages up to two hours. Coming from outside Dhaka, arrive by 10 AM and it can all be done in one day (three to four hours)."}
      </p>

      {/* Messenger is where most of this clinic's enquiries actually arrive —
          the whole rebuild started from a folder of them — so the page says
          so here rather than leaving the page to be found in the footer. */}
      <div className="mt-6 flex flex-wrap items-center gap-x-4 gap-y-3 border-t border-line pt-6">
        <p className="max-w-prose text-base text-ink-2">
          {bn
            ? "ফেসবুকেও মেসেজ করতে পারেন — দিনের বেশিরভাগ সময় আমরা সেখানেই থাকি।"
            : "You can message us on Facebook too — that is where we are most of the day."}
        </p>
        <SocialLinks lang={lang} size="compact" />
      </div>

    </section>
  );
}
