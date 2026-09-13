import Link from "next/link";
import { SITE, whatsappLink, telLink } from "@/lib/site";
import { PhoneIcon, WhatsAppIcon } from "./Icons";

/**
 * Minimum 52px on primary actions. Over half of people over 65 have
 * arthritis and around a fifth have tremor, so WCAG's 24px floor is not
 * enough for this audience.
 */
const base =
  "inline-flex items-center justify-center gap-2 min-h-[52px] px-5 py-3 rounded-lg " +
  "font-display font-semibold text-lg leading-tight text-center border-[1.5px] " +
  "transition-colors focus-visible:outline focus-visible:outline-2";

export function WhatsAppButton({
  message,
  label,
  variant = "brand",
  className = "",
}: {
  message: string;
  label: string;
  variant?: "brand" | "outline";
  className?: string;
}) {
  const style =
    variant === "brand"
      ? "bg-brand text-white border-brand hover:bg-brand-deep hover:border-brand-deep"
      : "bg-paper-surface text-ink border-line-strong hover:border-ink-2";
  return (
    <a
      href={whatsappLink(message)}
      target="_blank"
      rel="noopener noreferrer"
      className={`${base} ${style} ${className}`}
    >
      <WhatsAppIcon className="h-5 w-5 shrink-0" />
      {label}
    </a>
  );
}

export function CallButton({
  label,
  showNumber = true,
  variant = "outline",
  className = "",
}: {
  label?: string;
  showNumber?: boolean;
  variant?: "brand" | "outline";
  className?: string;
}) {
  const style =
    variant === "brand"
      ? "bg-brand text-white border-brand hover:bg-brand-deep"
      : "bg-paper-surface text-ink border-line-strong hover:border-ink-2";
  return (
    <a href={telLink()} className={`${base} ${style} ${className}`}>
      <PhoneIcon className="h-[19px] w-[19px] shrink-0" />
      {showNumber ? (
        <span className="num">{SITE.phoneDisplay}</span>
      ) : (
        label
      )}
    </a>
  );
}

export function LinkButton({
  href,
  children,
  variant = "outline",
  className = "",
}: {
  href: string;
  children: React.ReactNode;
  variant?: "brand" | "outline";
  className?: string;
}) {
  const style =
    variant === "brand"
      ? "bg-brand text-white border-brand hover:bg-brand-deep"
      : "bg-paper-surface text-ink border-line-strong hover:border-ink-2";
  return (
    <Link href={href} className={`${base} ${style} ${className}`}>
      {children}
    </Link>
  );
}
