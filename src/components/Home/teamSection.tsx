import { TEAM, toBengaliDigits } from "@/lib/site";
import { clockLabel, type Lang } from "@/lib/i18n";

/**
 * Patients ask for people, not institutions — the inbox has "Audiologist
 * Robin vai kokon bose?" verbatim. Of the Bangladeshi hearing businesses
 * surveyed, only one names a clinician at all; the market leader claims
 * "10+ certified audiologists" and names none.
 *
 * Qualifications were not supplied on the information form. Ask for degree,
 * institution and any registration number — that is what turns a name into
 * a credential, and it costs nothing.
 */

const ROLE: Record<string, { bn: string; en: string }> = {
  "in-charge": { bn: "ইন-চার্জ", en: "Centre in-charge" },
  audiologist: { bn: "অডিওলজিস্ট", en: "Audiologist" },
  audiometrician: { bn: "অডিওমেট্রিশিয়ান", en: "Audiometrician" },
  counsellor: { bn: "কাউন্সেলর", en: "Counsellor" },
  pro: { bn: "পাবলিক রিলেশন্স", en: "Public relations" },
};

const DAYS: Record<string, { bn: string; en: string }> = {
  "sat-thu": { bn: "শনি – বৃহস্পতি", en: "Sat – Thu" },
  "sun-thu": { bn: "রবি – বৃহস্পতি", en: "Sun – Thu" },
};

export default function TeamSection({ lang }: { lang: Lang }) {
  const bn = lang === "bn";

  return (
    <section id="team" className="mx-auto max-w-3xl px-4 py-12 lg:px-8">
      <h2 className="mb-3 text-[clamp(24px,4.6vw,31px)] text-ink">
        {bn ? "কে কখন বসেন" : "Who sits when"}
      </h2>
      <p className="mb-6 max-w-prose text-xl text-ink-2">
        {bn
          ? "কার কাছে আসছেন সেটা আগে থেকে জানা থাকলে সুবিধা। নির্দিষ্ট কারও কাছে আসতে চাইলে হোয়াটসঅ্যাপে বলে সিরিয়াল নিয়ে নিন।"
          : "It helps to know who you are coming to see. If you want a particular person, say so on WhatsApp when you book."}
      </p>

      <ul className="divide-y divide-line overflow-hidden rounded-xl border border-line bg-paper-surface">
        {TEAM.map((member) => (
          <li
            key={member.nameEn}
            className="flex flex-col gap-1 px-4 py-4 sm:flex-row sm:items-baseline sm:justify-between sm:gap-4"
          >
            <div>
              <p className="font-display text-lg font-semibold text-ink">
                {bn ? member.name : member.nameEn}
              </p>
              <p className="text-[15.5px] text-ink-muted">
                {ROLE[member.role][lang]}
              </p>
            </div>
            <p className="num whitespace-nowrap text-[16px] text-ink-2">
              {DAYS[member.days][lang]},{" "}
              {clockLabel(member.from, lang)} – {clockLabel(member.to, lang)}
            </p>
          </li>
        ))}
      </ul>

      <p className="mt-3 text-[15.5px] text-ink-muted">
        {bn
          ? `শুক্রবার ও সরকারি ছুটির দিন বন্ধ। সিরিয়াল ছাড়া এলে গড়ে ${toBengaliDigits(2)} ঘণ্টা পর্যন্ত অপেক্ষা করতে হতে পারে।`
          : "Closed Friday and on government holidays. Without an appointment the wait averages up to two hours."}
      </p>
    </section>
  );
}
