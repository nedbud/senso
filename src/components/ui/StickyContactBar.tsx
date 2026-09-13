"use client";

import { useEffect, useState } from "react";
import { SITE, whatsappLink, telLink } from "@/lib/site";
import { dict, type Lang } from "@/lib/i18n";
import { PhoneIcon, WhatsAppIcon } from "./Icons";

/**
 * Appears only once the hero has scrolled away.
 *
 * The hero already carries the same two buttons, so showing the bar over it
 * duplicates them in the first screen and crowds the one part of the page
 * that should feel calm. Past the hero it earns its place: an older reader
 * scrolling slowly should never have to remember where the button was.
 */
export default function StickyContactBar({ lang }: { lang: Lang }) {
  const d = dict(lang);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const hero = document.querySelector("section");
    if (!hero) {
      setVisible(true);
      return;
    }
    const observer = new IntersectionObserver(
      ([entry]) => setVisible(!entry.isIntersecting),
      { rootMargin: "-80px 0px 0px 0px" }
    );
    observer.observe(hero);
    return () => observer.disconnect();
  }, []);

  return (
    <nav
      aria-label={d.nav.call}
      aria-hidden={!visible}
      className={`fixed inset-x-0 bottom-0 z-50 grid grid-cols-2 gap-2 border-t border-line-strong bg-paper-surface px-3 py-2 pb-[calc(0.5rem+env(safe-area-inset-bottom))] transition-transform duration-200 md:hidden ${
        visible ? "translate-y-0" : "translate-y-full"
      }`}
    >
      <a
        href={telLink()}
        tabIndex={visible ? 0 : -1}
        className="inline-flex min-h-[52px] items-center justify-center gap-2 rounded-lg border-[1.5px] border-line-strong bg-paper-surface px-4 font-ui text-ink"
      >
        <PhoneIcon className="h-[19px] w-[19px]" />
        {d.nav.call}
      </a>
      <a
        href={whatsappLink(d.wa.appointment)}
        target="_blank"
        rel="noopener noreferrer"
        tabIndex={visible ? 0 : -1}
        className="inline-flex min-h-[52px] items-center justify-center gap-2 rounded-lg border-[1.5px] border-brand bg-brand px-4 font-ui text-white"
      >
        <WhatsAppIcon className="h-[19px] w-[19px]" />
        {d.nav.whatsapp}
      </a>
    </nav>
  );
}
