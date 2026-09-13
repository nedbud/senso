import { SITE, TEAM } from "@/lib/site";
import { clockLabel, type Lang } from "@/lib/i18n";

/**
 * The one dark band on the page, and the only place the design raises its
 * voice. It carries the two claims that cannot be copied: ReSound lists this
 * business on their own site, and these are the actual people, by name, with
 * the hours they sit.
 *
 * The market leader claims "10+ certified audiologists" and names none;
 * one competitor out of ten names a clinician at all. So the names are the
 * asset, not the logo.
 */
export default function TrustBand({ lang }: { lang: Lang }) {
  const bn = lang === "bn";

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

  return (
    <section id="about" className="bg-paper-deep text-ink-inverse">
      <div className="mx-auto max-w-5xl px-4 py-10 lg:px-8">
        <div className="grid gap-8 md:grid-cols-[1.1fr_1fr]">
          <div>
            <h2 className="text-xl font-bold leading-tight tracking-tightest">
              {bn
                ? "ReSound-এর অনুমোদিত ডিলার"
                : "An authorised ReSound dealer"}
            </h2>
            <p className="mt-2 max-w-prose text-base leading-relaxed text-white/70">
              {bn
                ? "বাংলাদেশের ডিলার হিসেবে ReSound তাদের নিজেদের ওয়েবসাইটে আমাদের নাম দিয়েছে — নিচের লিংকে দেখে নিতে পারেন।"
                : "ReSound names us as their Bangladesh dealer on their own website — the link below goes straight to it."}
            </p>

            <a
              href={lang === "en" ? "/en/about-us" : "/about-us"}
              className="mt-4 mr-5 inline-flex min-h-[44px] items-center font-ui text-white underline decoration-brand decoration-2 underline-offset-4 hover:decoration-white"
            >
              {bn ? "আমাদের সম্পর্কে" : "About us"}
            </a>
            <a
              href={SITE.dealer.proofUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="mt-4 inline-flex min-h-[44px] items-center font-ui text-white underline decoration-brand decoration-2 underline-offset-4 hover:decoration-white"
            >
              {bn ? "ReSound-এর তালিকায় দেখুন" : "See ReSound's listing"}
            </a>

            <dl className="mt-6 grid grid-cols-2 gap-x-6 gap-y-4 text-sm">
              <div>
                <dt className="text-white/50">
                  {bn ? "পান্থপথে" : "In Panthapath"}
                </dt>
                <dd className="num mt-0.5 font-medium">
                  {bn ? "২০০৭ সাল থেকে" : "Since 2007"}
                </dd>
              </div>
              <div>
                <dt className="text-white/50">
                  {bn ? "ওয়ারেন্টি" : "Warranty"}
                </dt>
                <dd className="mt-0.5 font-medium">
                  {bn
                    ? `${SITE.warranty.years} বছর, ৪ মাস পরপর ফলো-আপ`
                    : `${SITE.warranty.years} years, follow-up every ${SITE.warranty.followUpMonths} months`}
                </dd>
              </div>
              <div className="col-span-2">
                <dt className="text-white/50">
                  {bn ? "যেসব হাসপাতালের সাথে কাজ" : "We work with"}
                </dt>
                <dd className="mt-0.5 font-medium">
                  {SITE.hospitals.join(" · ")}
                </dd>
              </div>
            </dl>
          </div>

          <div>
            <h3 className="font-ui text-base font-semibold">
              {bn ? "কে কখন বসেন" : "Who sits when"}
            </h3>
            <ul className="mt-3 divide-y divide-white/10">
              {TEAM.map((member) => (
                <li key={member.nameEn} className="py-2.5">
                  <p className="font-ui text-base font-semibold">
                    {bn ? member.name : member.nameEn}
                    <span className="ml-2 font-sans text-sm font-normal text-white/50">
                      {ROLE[member.role]}
                    </span>
                  </p>
                  <p className="num mt-0.5 text-sm text-white/70">
                    {DAYS[member.days]}, {clockLabel(member.from, lang)} –{" "}
                    {clockLabel(member.to, lang)}
                  </p>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </section>
  );
}
