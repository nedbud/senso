import { clockLabel, fill, type Lang } from "@/lib/i18n";
import type { Dict } from "@/routes/dict";
import type { Clinic } from "@/routes/clinic";
import { say, type Member } from "@/routes/details";

/**
 * The one dark band on the page, and the only place the design raises its
 * voice. It carries the two claims that cannot be copied: ReSound lists this
 * business on their own site, and these are the actual people, by name, with
 * the hours they sit.
 *
 * The market leader claims "10+ certified audiologists" and names none;
 * one competitor out of ten names a clinician at all. So the names are the
 * asset, not the logo — which is why they are now a list somebody at the
 * centre keeps current rather than five lines in this file.
 *
 * The role and day labels used to be lookup tables here, keyed by "in-charge"
 * and "sat-thu". They are written on the row now: a new role, or a person who
 * sits alternate Saturdays, no longer needs the website changed.
 */
export default function TrustBand({
  lang,
  clinic,
  d,
  team,
}: {
  lang: Lang;
  clinic: Clinic;
  d: Dict;
  team: Member[];
}) {
  const brand = clinic.dealer.brand;

  return (
    <section id="about" className="bg-paper-deep text-ink-inverse">
      <div className="mx-auto max-w-5xl px-4 py-10 lg:px-8">
        <div className="grid gap-8 md:grid-cols-[1.1fr_1fr]">
          <div>
            <h2 className="text-xl font-bold leading-tight tracking-tightest">
              {fill(d.trust.heading, { brand })}
            </h2>
            <p className="mt-2 max-w-prose text-base leading-relaxed text-white/70">
              {fill(d.trust.lede, { brand })}
            </p>

            <a
              href={lang === "en" ? "/en/about-us" : "/about-us"}
              className="mt-4 mr-5 inline-flex min-h-[44px] items-center font-ui text-white underline decoration-brand decoration-2 underline-offset-4 hover:decoration-white"
            >
              {d.trust.about}
            </a>
            <a
              href={clinic.dealer.proofUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="mt-4 inline-flex min-h-[44px] items-center font-ui text-white underline decoration-brand decoration-2 underline-offset-4 hover:decoration-white"
            >
              {fill(d.trust.verify, { brand })}
            </a>

            <dl className="mt-6 grid grid-cols-2 gap-x-6 gap-y-4 text-sm">
              <div>
                <dt className="text-white/50">{d.trust.sinceLabel}</dt>
                <dd className="num mt-0.5 font-medium">
                  {fill(d.trust.sinceValue, { year: clinic.foundedYear })}
                </dd>
              </div>
              <div>
                <dt className="text-white/50">{d.trust.warrantyLabel}</dt>
                <dd className="mt-0.5 font-medium">
                  {fill(d.trust.warrantyValue, {
                    years: clinic.warranty.years,
                    months: clinic.warranty.followUpMonths,
                  })}
                </dd>
              </div>
              <div className="col-span-2">
                <dt className="text-white/50">{d.trust.hospitalsLabel}</dt>
                <dd className="mt-0.5 font-medium">
                  {clinic.hospitals.join(" · ")}
                </dd>
              </div>
            </dl>
          </div>

          {/* An empty list hides the panel rather than leaving a heading over
              nothing — the heading is a promise the page cannot keep alone. */}
          {team.length > 0 && (
            <div>
              <h3 className="font-ui text-base font-semibold">{d.trust.whoSits}</h3>
              <ul className="mt-3 divide-y divide-white/10">
                {team.map((member, index) => (
                  <li key={`${say(member.name, lang)}-${index}`} className="py-2.5">
                    <p className="font-ui text-base font-semibold">
                      {say(member.name, lang)}
                      <span className="ml-2 font-sans text-sm font-normal text-white/50">
                        {say(member.role, lang)}
                      </span>
                    </p>
                    <p className="num mt-0.5 text-sm text-white/70">
                      {say(member.days, lang)}, {clockLabel(member.from, lang)} –{" "}
                      {clockLabel(member.to, lang)}
                    </p>
                  </li>
                ))}
              </ul>
            </div>
          )}
        </div>
      </div>
    </section>
  );
}
