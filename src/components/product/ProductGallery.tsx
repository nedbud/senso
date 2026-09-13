import Image from "next/image";
import { fill, type Lang } from "@/lib/i18n";
import type { Dict } from "@/routes/dict";

export type Shot = {
  src: string | null;
  caption: string;
  video?: boolean;
  href?: string;
};

/**
 * The photo strip at the top of the page.
 *
 * A profile shows its pictures before it shows its writing, and people read
 * that band without being told what it is — it is the fastest way to answer
 * "what does this actually look like", which is the first question anyone has
 * about an object they are going to wear.
 *
 * The shape follows the number of pictures rather than forcing them into one
 * grid: one large tile beside four small ones only reads as deliberate when
 * there are five to place. With two, two tiles side by side is the honest
 * arrangement. With one there is nothing to show that the header has not
 * already shown, so the band does not appear at all.
 *
 * Nothing here is uploaded for the band. Every picture arrived attached to
 * something somebody wrote about the product.
 */
export default function ProductGallery({
  shots,
  lang,
  d,
  title,
}: {
  shots: Shot[];
  lang: Lang;
  d: Dict;
  title: string;
}) {
  const bn = lang === "bn";
  if (shots.length < 2) return null;

  const n = shots.length;
  const shown = n >= 5 ? shots.slice(0, 5) : shots.slice(0, 4);
  const more = n - shown.length;

  // The layout, chosen by how many there are to lay out.
  const grid =
    n >= 5
      ? "grid-cols-4 grid-rows-2 h-[260px] sm:h-[320px]"
      : n === 4
      ? "grid-cols-4 grid-rows-1 h-[180px] sm:h-[220px]"
      : n === 3
      ? "grid-cols-3 grid-rows-2 h-[220px] sm:h-[280px]"
      : "grid-cols-2 grid-rows-1 h-[200px] sm:h-[250px]";

  const tileSpan = (i: number) => {
    if (n >= 5) return i === 0 ? "col-span-2 row-span-2" : "";
    if (n === 3) return i === 0 ? "col-span-2 row-span-2" : "";
    return "";
  };

  return (
    <section id="photos" className="mx-auto max-w-6xl scroll-mt-32 px-4 pt-6 lg:px-8">
      <div className="mb-2.5 flex items-baseline justify-between gap-4">
        <h2 className="font-ui text-sm font-semibold text-ink">
          {d.gallery.heading}
        </h2>
        <p className="num font-ui text-xs text-ink-muted">
          {fill(d.gallery.count, { n: bn ? toBn(n) : n })}
        </p>
      </div>

      <div className={`grid gap-1.5 overflow-hidden rounded-2xl ${grid}`}>
        {shown.map((s, i) => {
          const isLast = i === shown.length - 1 && more > 0;

          const inner = (
            <>
              {s.src ? (
                <Image
                  src={s.src}
                  alt={s.caption || `${title} — ${i + 1}`}
                  fill
                  sizes={i === 0 && n >= 5 ? "(max-width: 640px) 50vw, 480px" : "240px"}
                  className={`transition duration-500 group-hover:scale-[1.05] ${
                    s.video ? "object-cover" : "object-contain p-3"
                  }`}
                />
              ) : (
                <span className="absolute inset-0 bg-paper-deep" />
              )}

              {s.video && !isLast && (
                <span
                  aria-hidden="true"
                  className="absolute inset-0 flex items-center justify-center bg-black/25 transition group-hover:bg-black/10"
                >
                  <span className="flex h-10 w-10 items-center justify-center rounded-full bg-white/90 pl-0.5 text-xs text-ink shadow-lg">
                    ▶
                  </span>
                </span>
              )}

              {/* The last tile carries the count of everything not shown,
                  which is what stops the band from looking like the whole
                  set when it is only the front of it. */}
              {isLast && (
                <span className="absolute inset-0 flex items-center justify-center bg-black/55 font-display text-2xl font-bold text-white">
                  +{bn ? toBn(more) : more}
                </span>
              )}

              {s.caption && !isLast && (
                <span className="pointer-events-none absolute inset-x-0 bottom-0 bg-gradient-to-t from-black/75 to-transparent px-3 pb-2 pt-8 text-micro leading-tight text-white opacity-0 transition group-hover:opacity-100">
                  {s.caption}
                </span>
              )}
            </>
          );

          const className = `group relative block overflow-hidden bg-paper-2 ${tileSpan(i)}`;

          return s.href ? (
            <a
              key={`${s.src ?? "v"}-${i}`}
              href={s.href}
              className={className}
              title={s.caption || undefined}
            >
              {inner}
            </a>
          ) : (
            <div key={`${s.src ?? "v"}-${i}`} className={className}>
              {inner}
            </div>
          );
        })}
      </div>
    </section>
  );
}

function toBn(n: number): string {
  return String(n).replace(/\d/g, (d) => "০১২৩৪৫৬৭৮৯"[Number(d)]);
}
