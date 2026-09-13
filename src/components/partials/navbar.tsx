import Link from "next/link";
import Image from "next/image";
import { dict, type Lang } from "@/lib/i18n";
import { whatsappLink } from "@/lib/site";
import LangSwitch from "@/components/ui/LangSwitch";
import { WhatsAppIcon } from "@/components/ui/Icons";

export default function Navbar({ lang }: { lang: Lang }) {
  const d = dict(lang);
  const p = (path: string) => (lang === "en" ? `/en${path === "/" ? "" : path}` : path);

  const nav = [
    { name: d.nav.products, href: p("/hearing-aids") },
    { name: d.nav.about, href: p("/about-us") },
  ];

  return (
    <header className="sticky top-0 z-40 border-b border-line bg-paper/90 backdrop-blur">
      <div className="mx-auto flex max-w-7xl items-center justify-between gap-3 px-4 py-2.5 lg:px-8">
        <Link href={p("/")} className="shrink-0" aria-label={d.nav.home}>
          <Image
            src="/assets/Images/Common/sensoLogo.png"
            alt="Senso Hearing Centre"
            width={379}
            height={229}
            priority
            className="h-11 w-auto"
          />
        </Link>

        <nav className="hidden items-center gap-6 md:flex">
          {nav.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className="font-display font-semibold text-ink hover:text-brand"
            >
              {item.name}
            </Link>
          ))}
        </nav>

        <div className="flex items-center gap-2">
          <LangSwitch lang={lang} />
          <a
            href={whatsappLink(d.wa.general)}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex min-h-[44px] items-center gap-2 rounded-lg border-[1.5px] border-brand bg-brand px-3.5 font-display font-semibold text-white hover:bg-brand-deep"
          >
            <WhatsAppIcon className="h-[17px] w-[17px]" />
            <span className="hidden sm:inline">{d.nav.whatsapp}</span>
          </a>
        </div>
      </div>
    </header>
  );
}
