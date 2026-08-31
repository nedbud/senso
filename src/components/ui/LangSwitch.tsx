"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import type { Lang } from "@/lib/i18n";

/**
 * Bangla lives at the existing URLs (/, /hearing-aids, ...) so no ranking
 * equity is lost; English mirrors them under /en. Separate URLs are what
 * Google requires for hreflang — a client-side toggle cannot be annotated.
 */
export default function LangSwitch({ lang }: { lang: Lang }) {
  const pathname = usePathname() || "/";
  const bnPath = pathname.startsWith("/en")
    ? pathname.replace(/^\/en/, "") || "/"
    : pathname;
  const enPath = pathname.startsWith("/en") ? pathname : `/en${pathname === "/" ? "" : pathname}`;

  const item = (active: boolean) =>
    `px-3 py-1.5 min-h-[38px] inline-flex items-center font-display font-semibold text-[15px] leading-none ${
      active ? "bg-ink text-paper" : "text-ink-muted hover:text-ink"
    }`;

  return (
    <div className="flex overflow-hidden rounded-full border-[1.5px] border-line-strong bg-paper-surface">
      <Link href={bnPath} className={item(lang === "bn")} hrefLang="bn" aria-current={lang === "bn"}>
        বাংলা
      </Link>
      <Link href={enPath} className={item(lang === "en")} hrefLang="en" aria-current={lang === "en"}>
        EN
      </Link>
    </div>
  );
}
