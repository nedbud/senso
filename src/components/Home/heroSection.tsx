import { dict, type Lang } from "@/lib/i18n";
import { SITE } from "@/lib/site";
import { WhatsAppButton, CallButton } from "@/components/ui/Buttons";
import OpenStatus from "@/components/ui/OpenStatus";

/**
 * The hero used to be a single JPEG from the CMS with an absolutely
 * positioned "Contact Us" button at hardcoded pixel offsets, hidden below
 * lg. Every word of the message lived inside the image, so none of it
 * existed as text a search engine or a screen reader could read.
 */
export default function Hero({ lang }: { lang: Lang }) {
  const d = dict(lang);

  return (
    <section className="mx-auto max-w-3xl px-4 pb-10 pt-8 sm:pt-12 lg:px-8">
      <div className="flex flex-col gap-4">
        <p className="font-display font-semibold text-[15px] text-brand">
          {d.hero.eyebrow}
        </p>

        <h1 className="text-[clamp(30px,6.4vw,44px)] leading-[1.32] text-ink">
          {d.hero.title}
        </h1>

        <p className="max-w-prose text-xl text-ink-2">{d.hero.lede}</p>

        <div className="mt-1 grid gap-2.5 sm:grid-cols-2">
          <WhatsAppButton
            message={d.wa.appointment}
            label={d.hero.ctaWhatsapp}
            variant="brand"
          />
          <CallButton variant="outline" />
        </div>

        <div className="rounded-lg border border-line border-l-4 border-l-brand bg-paper-surface px-4 py-4 text-[17px] text-ink-2">
          <strong className="font-semibold text-ink">
            {d.hero.phoneNoteTitle}
          </strong>{" "}
          {d.hero.phoneNote}
        </div>

        <OpenStatus lang={lang} />
      </div>
    </section>
  );
}
