"use client";

import { SITE, whatsappLink, telLink } from "@/lib/site";
import { dict, type Lang } from "@/lib/i18n";
import { PhoneIcon, WhatsAppIcon } from "./Icons";

/**
 * Always within thumb reach on mobile. The argument is not conversion
 * folklore — it is that an older reader scrolling slowly should never have
 * to remember where the button was or scroll back to find it.
 */
export default function StickyContactBar({ lang }: { lang: Lang }) {
  const d = dict(lang);
  return (
    <nav
      aria-label={d.nav.call}
      className="fixed inset-x-0 bottom-0 z-50 grid grid-cols-2 gap-2 border-t border-line-strong bg-paper-surface px-3 py-2 pb-[calc(0.5rem+env(safe-area-inset-bottom))] md:hidden"
    >
      <a
        href={telLink()}
        className="inline-flex min-h-[52px] items-center justify-center gap-2 rounded-lg border-[1.5px] border-line-strong bg-paper-surface px-4 font-display font-semibold text-ink"
      >
        <PhoneIcon className="h-[19px] w-[19px]" />
        {d.nav.call}
      </a>
      <a
        href={whatsappLink(d.wa.appointment)}
        target="_blank"
        rel="noopener noreferrer"
        className="inline-flex min-h-[52px] items-center justify-center gap-2 rounded-lg border-[1.5px] border-brand bg-brand px-4 font-display font-semibold text-white"
      >
        <WhatsAppIcon className="h-[19px] w-[19px]" />
        {d.nav.whatsapp}
      </a>
    </nav>
  );
}
