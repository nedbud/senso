"use client";

import type { Lang } from "@/lib/i18n";
import NaatiFace from "./NaatiFace";

/**
 * The site's primary action, everywhere the WhatsApp and call buttons used
 * to be.
 *
 * Every route into Senso now goes through the conversation first. The phone
 * number has not gone anywhere — it is what the conversation ends with, once
 * there is actually something to book.
 */
export const NAATI_OPEN = "naati:open";

/** Open the panel from anywhere, optionally with the box already filled in. */
export function openNaati(text?: string) {
  window.dispatchEvent(new CustomEvent(NAATI_OPEN, { detail: { text } }));
}

const LABEL = {
  bn: { long: "নাতির সঙ্গে কথা বলুন", short: "নাতিকে জিজ্ঞেস করুন" },
  en: { long: "Talk to Naati", short: "Ask Naati" },
} as const;

export default function AskNaatiButton({
  lang,
  size = "large",
  label,
  seed,
  className = "",
}: {
  lang: Lang;
  size?: "large" | "compact";
  label?: string;
  /** Pre-fills the message box — used where the page already knows the question. */
  seed?: string;
  className?: string;
}) {
  const text = label ?? (size === "large" ? LABEL[lang].long : LABEL[lang].short);

  // In the header the label folds away on narrow screens — the logo and the
  // language toggle are already there, and his face alone is enough to tap.
  const box =
    size === "large"
      ? "min-h-[52px] gap-3 pl-2 pr-5 text-lg"
      : "min-h-[44px] gap-2 pl-1.5 pr-1.5 text-sm sm:pr-4";

  return (
    <button
      type="button"
      onClick={() => openNaati(seed)}
      className={`inline-flex items-center justify-center rounded-full border-[1.5px] border-brand bg-brand py-1.5 font-ui leading-tight text-white transition-colors hover:border-brand-deep hover:bg-brand-deep focus-visible:outline focus-visible:outline-2 ${box} ${className}`}
    >
      <NaatiFace
        state="idle"
        className={`${size === "large" ? "h-10 w-10" : "h-8 w-8"} ring-[1.5px] ring-white/40`}
      />
      <span className={size === "compact" ? "hidden sm:inline" : undefined}>{text}</span>
    </button>
  );
}
