import Link from "next/link";

/**
 * The WhatsApp and call buttons that used to live here are gone — every
 * route into Senso now starts with the assistant, and the phone number is
 * what a conversation ends with rather than what a page opens with.
 *
 * Minimum 52px on primary actions. Over half of people over 65 have
 * arthritis and around a fifth have tremor, so WCAG's 24px floor is not
 * enough for this audience.
 */
const base =
  "inline-flex items-center justify-center gap-2 min-h-[52px] px-5 py-3 rounded-lg " +
  "font-ui text-lg leading-tight text-center border-[1.5px] " +
  "transition-colors focus-visible:outline focus-visible:outline-2";

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
