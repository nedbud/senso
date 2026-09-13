import Link from "next/link";
import Image from "next/image";
import { dict, type Lang } from "@/lib/i18n";
import LangSwitch from "@/components/ui/LangSwitch";
import AskNaatiButton from "@/components/naati/AskNaatiButton";

export default function Navbar({ lang }: { lang: Lang }) {
  const d = dict(lang);
  const p = (path: string) => (lang === "en" ? `/en${path === "/" ? "" : path}` : path);

  const nav = [
    { name: d.nav.products, href: p("/hearing-aids") },
    { name: d.nav.about, href: p("/about-us") },
  ];

  return (
    <header className="sticky top-0 z-40 border-b border-line bg-paper/85 backdrop-blur-md">
      <div className="mx-auto flex max-w-7xl items-center justify-between gap-3 px-4 py-2.5 lg:px-8">
        <Link href={p("/")} className="shrink-0" aria-label={d.nav.home}>
          <Image
            src="/assets/Images/Common/sensoLogo.png"
            alt="Senso Hearing Centre"
            width={379}
            height={229}
            priority
            className="h-10 w-auto"
          />
        </Link>

        <nav className="hidden items-center gap-6 md:flex">
          {nav.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className="font-ui text-ink hover:text-brand"
            >
              {item.name}
            </Link>
          ))}
        </nav>

        <div className="flex items-center gap-2">
          <LangSwitch lang={lang} />
          <AskNaatiButton lang={lang} size="compact" />
        </div>
      </div>
    </header>
  );
}
