/**
 * Turning a pasted link into something that plays.
 *
 * Whoever writes a product's content pastes what is in their address bar —
 * a youtu.be short link, a watch URL, a Facebook video page. Asking them to
 * find an embed code instead is asking them to stop writing and go learn
 * something, which is how a field ends up permanently empty.
 *
 * Anything not recognised is returned as null and rendered as an ordinary
 * link, which is better than an iframe that shows an error page.
 */
export type Embed = { src: string; title: string } | null;

export function toEmbed(url: string | null | undefined, title = "Video"): Embed {
  if (!url) return null;
  const raw = url.trim();
  if (!raw) return null;

  // youtu.be/ID  and  youtube.com/watch?v=ID  and  /shorts/ID  and  /embed/ID
  const yt =
    raw.match(/youtu\.be\/([\w-]{6,})/) ||
    raw.match(/[?&]v=([\w-]{6,})/) ||
    raw.match(/youtube\.com\/(?:shorts|embed|live)\/([\w-]{6,})/);
  if (yt) {
    return {
      // youtube-nocookie so a product page does not set an advertising cookie
      // on somebody who only came to read about a hearing aid.
      src: `https://www.youtube-nocookie.com/embed/${yt[1]}?rel=0`,
      title,
    };
  }

  if (/facebook\.com|fb\.watch/.test(raw)) {
    return {
      src: `https://www.facebook.com/plugins/video.php?href=${encodeURIComponent(
        raw
      )}&show_text=false`,
      title,
    };
  }

  return null;
}

/** The video's id, when it is one we can recognise. */
export function youtubeId(url: string | null | undefined): string | null {
  if (!url) return null;
  const raw = url.trim();
  const m =
    raw.match(/youtu\.be\/([\w-]{6,})/) ||
    raw.match(/[?&]v=([\w-]{6,})/) ||
    raw.match(/youtube\.com\/(?:shorts|embed|live)\/([\w-]{6,})/);
  return m ? m[1] : null;
}

/**
 * A still to put in the gallery.
 *
 * YouTube publishes one at a predictable address, so a video can sit in the
 * photo grid next to the photographs instead of being hidden further down the
 * page. Anything else returns null and gets a plain tile with a play mark —
 * better than a broken image.
 */
export function videoThumb(url: string | null | undefined): string | null {
  const id = youtubeId(url);
  return id ? `https://i.ytimg.com/vi/${id}/hqdefault.jpg` : null;
}
