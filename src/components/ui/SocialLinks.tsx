import type { Clinic } from "@/routes/clinic";
import { FacebookIcon, YouTubeIcon } from "./Icons";
import type { Lang } from "@/lib/i18n";
import type { Dict } from "@/routes/dict";

/**
 * Facebook and YouTube.
 *
 * The Facebook page is not a vanity link here — it is where this clinic's
 * patients already are. The enquiries that started this whole rebuild came
 * in through Messenger, and the page has years of posts and replies behind
 * it. Sending someone there is sending them somewhere useful.
 *
 * The channel is listed beside it because they are one business and the two
 * profiles should point at each other, but it is not dressed up as a
 * destination: there is nothing on it yet.
 */
export default function SocialLinks({
  lang,
  clinic,
  d,
  size = "default",
}: {
  lang: Lang;
  clinic: Clinic;
  d: Dict;
  size?: "default" | "compact";
}) {
  const links = [
    {
      href: clinic.social.facebook,
      Icon: FacebookIcon,
      name: "Facebook",
      note: d.social.facebookNote,
    },
    {
      href: clinic.social.youtube,
      Icon: YouTubeIcon,
      name: "YouTube",
      note: d.social.youtubeNote,
    },
  ];

  if (size === "compact") {
    return (
      <div className="flex gap-2">
        {links.map(({ href, Icon, name }) => (
          <a
            key={name}
            href={href}
            target="_blank"
            rel="noopener noreferrer me"
            aria-label={name}
            className="inline-flex h-11 w-11 items-center justify-center rounded-full border-[1.5px] border-line-strong bg-paper-surface text-ink-2 transition-colors hover:border-ink-2 hover:text-ink"
          >
            <Icon className="h-[19px] w-[19px]" />
          </a>
        ))}
      </div>
    );
  }

  return (
    <ul className="flex flex-col gap-2">
      {links.map(({ href, Icon, name, note }) => (
        <li key={name}>
          <a
            href={href}
            target="_blank"
            rel="noopener noreferrer me"
            className="group inline-flex min-h-[44px] items-center gap-3 text-ink-2 hover:text-ink"
          >
            <span className="inline-flex h-9 w-9 shrink-0 items-center justify-center rounded-full border border-line bg-paper text-ink-2 transition-colors group-hover:border-ink-2 group-hover:text-ink">
              <Icon className="h-[17px] w-[17px]" />
            </span>
            <span className="leading-tight">
              <span className="font-ui block text-ink">{name}</span>
              <span className="block text-sm text-ink-muted">{note}</span>
            </span>
          </a>
        </li>
      ))}
    </ul>
  );
}
