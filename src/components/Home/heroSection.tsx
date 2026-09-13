import Image from "next/image";
import { toBengaliDigits } from "@/lib/site";
import Link from "next/link";
import { fill, type Lang } from "@/lib/i18n";
import type { Dict } from "@/routes/dict";
import type { Clinic } from "@/routes/clinic";
import AskNaatiButton from "@/components/naati/AskNaatiButton";
import FactStrip from "@/components/ui/FactStrip";

/**
 * A product-led hero.
 *
 * This replaced a documentary photograph of a World Hearing Day rally.
 * The photograph was real and local, which is worth a great deal, but it was
 * another organisation's event and it was full of identifiable faces — not
 * something a business can put on its own cover.
 *
 * The device itself is the honest alternative and the one the category
 * actually leads with. It is the thing being sold, Senso is authorised to
 * show it, nobody's likeness is involved, and it answers the unspoken first
 * question every visitor has: what does this thing look like, and how big is
 * it really. The render is set large and lit from behind rather than dropped
 * in small, because a product used timidly reads as a product you are
 * apologetic about.
 *
 * On a phone the device comes first and the headline follows, so the fold
 * carries both. On a wide screen they sit side by side.
 */
export default function Hero({
  lang,
  clinic,
  lowPrice,
  d,
}: {
  lang: Lang;
  clinic: Clinic;
  lowPrice?: number;
  d: Dict;
}) {
  const prefix = lang === "en" ? "/en" : "";
  const minutes =
    lang === "bn"
      ? toBengaliDigits(clinic.testPackage.minutes)
      : String(clinic.testPackage.minutes);

  return (
    <section>
      <div className="relative isolate overflow-hidden border-b border-line bg-paper-2">
        {/* A single soft light behind the device, so it sits in the page
            rather than floating on a flat panel. */}
        <div
          aria-hidden="true"
          className="pointer-events-none absolute left-1/2 top-[22%] h-[90vmin] w-[90vmin] -translate-x-1/2 -translate-y-1/4 lg:left-auto lg:right-[-6%] lg:top-1/2 lg:translate-x-0 lg:-translate-y-1/2"
          style={{
            background:
              "radial-gradient(circle, rgba(255,253,250,0.95) 0%, rgba(255,253,250,0.55) 45%, rgba(255,253,250,0) 70%)",
          }}
        />

        <div className="relative mx-auto grid max-w-6xl items-center gap-6 px-4 pb-10 pt-8 lg:grid-cols-[minmax(0,6fr)_minmax(0,5fr)] lg:gap-12 lg:px-8 lg:pb-16 lg:pt-14">
          <div className="order-2 lg:order-1">
            <p className="font-ui text-sm text-brand">{d.hero.eyebrow}</p>

            <h1 className="mt-2 max-w-[13ch] font-display text-hero font-extrabold leading-[1.05] tracking-tightest text-ink">
              {d.hero.title}
            </h1>

            <p className="mt-4 max-w-prose text-lg leading-relaxed text-ink-2">
              {fill(d.hero.lede, { minutes })}
            </p>

            <div className="mt-6 grid gap-2.5 sm:grid-cols-2 lg:max-w-lg">
              <AskNaatiButton lang={lang} />
            </div>

            <p className="mt-3 text-sm text-ink-muted">{d.hero.phoneShort}</p>
          </div>

          <div className="order-1 lg:order-2">
            <div className="relative mx-auto aspect-[4/3] w-full max-w-[26rem] lg:max-w-none">
              <Image
                src="/assets/Images/latest_products/ReSound_OMNIA_461_RIE.png"
                alt={d.hero.deviceAlt}
                fill
                priority
                sizes="(max-width: 1024px) 90vw, 520px"
                className="object-contain"
              />
            </div>

            <p className="mt-1 text-center text-sm text-ink-muted lg:text-left">
              {d.hero.deviceCaption}
              <Link
                href={`${prefix}/hearing-aids`}
                className="underline underline-offset-4 hover:text-ink"
              >
                {d.hero.everyModel}
              </Link>
            </p>
          </div>
        </div>
      </div>

      <div className="mx-auto max-w-6xl px-4 py-6 lg:px-8">
        <FactStrip lang={lang} clinic={clinic} d={d} lowPrice={lowPrice} />
      </div>
    </section>
  );
}
