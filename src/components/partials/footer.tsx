import Image from "next/image";
import { SITE, telLink } from "@/lib/site";
import { dict, type Lang } from "@/lib/i18n";

export default function Footer({ lang }: { lang: Lang }) {
  const d = dict(lang);
  const bn = lang === "bn";

  return (
    <footer className="border-t border-line bg-paper-surface pb-24 pt-10 md:pb-10">
      <div className="mx-auto grid max-w-7xl gap-8 px-4 sm:grid-cols-2 lg:grid-cols-3 lg:px-8">
        <div className="space-y-3">
          <Image
            src="/assets/Images/Common/sensoLogo.png"
            alt="Senso Hearing Centre"
            width={379}
            height={229}
            className="h-12 w-auto"
          />
          <p className="text-ink-2">
            {bn ? SITE.address.lineBn : SITE.address.line}
            <br />
            {bn
              ? `${SITE.address.cityBn}-${SITE.address.postcode}`
              : `${SITE.address.city}-${SITE.address.postcode}`}
            <br />
            <span className="text-[15.5px] text-ink-muted">
              {bn ? SITE.address.landmarkBn : SITE.address.landmark}
              <br />
              {bn ? SITE.address.floorNoteBn : SITE.address.floorNote}
            </span>
          </p>
        </div>

        <div className="space-y-2">
          <p className="font-display text-[17px] font-bold text-ink">
            {d.footer.contact}
          </p>
          {SITE.phones.map((phone, i) => (
            <a
              key={phone}
              href={telLink(phone)}
              className="num block text-ink-2 hover:text-brand"
            >
              {i === 0 ? SITE.phoneDisplay : i === 1 ? SITE.phoneDisplay2 : phone.replace("+88", "")}
            </a>
          ))}
          <a
            href={`mailto:${SITE.email}`}
            className="block text-ink-2 hover:text-brand"
          >
            {SITE.email}
          </a>
        </div>

        <div className="space-y-2">
          <p className="font-display text-[17px] font-bold text-ink">
            {d.footer.hours}
          </p>
          <p className="text-ink-2">
            {d.footer.hoursValue}
            <br />
            {d.footer.closedFriday}
          </p>
          <p className="pt-2 text-[15.5px] leading-relaxed text-ink-muted">
            {d.footer.distributor}
          </p>
        </div>
      </div>
    </footer>
  );
}
