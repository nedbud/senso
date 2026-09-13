/**
 * The visitor's side of proving consent.
 *
 * The law puts the burden of showing that consent was properly obtained on the
 * clinic. The difficulty is that almost nobody using the chat has told us who
 * they are, and collecting a name purely so we can prove we asked permission
 * would be collecting more in order to comply with a rule about collecting
 * less.
 *
 * So the browser makes up a reference that means nothing — random characters,
 * no derivation from anything about the person or their device — and that
 * reference is what travels with the consent record and with any booking made
 * in the same visit. It lives in sessionStorage, so it is gone when the tab
 * closes, the same as the consent itself.
 */

const REF_KEY = "naati.consent-ref.v1";

/**
 * The wording currently in force. Bump it whenever the privacy notice or
 * either consent line changes, so an old agreement is never quietly counted as
 * agreement to new terms.
 */
export const NOTICE_VERSION = "2026-09-12";

export type ConsentKind = "chat_image" | "booking";

function makeRef(): string {
  const bytes = new Uint8Array(16);
  crypto.getRandomValues(bytes);
  return Array.from(bytes, (b) => b.toString(16).padStart(2, "0")).join("");
}

/** The reference for this visit, made on first use. */
export function consentRef(): string {
  try {
    const existing = sessionStorage.getItem(REF_KEY);
    if (existing) return existing;
    const fresh = makeRef();
    sessionStorage.setItem(REF_KEY, fresh);
    return fresh;
  } catch {
    // Private windows and locked-down browsers. A reference that lasts only as
    // long as this page is still better than none.
    return makeRef();
  }
}

/**
 * Files the agreement. Never throws and never blocks: a consent record that
 * failed to save is a problem for the clinic's paperwork, not a reason to stop
 * someone getting an answer about their hearing.
 */
export function recordConsent(kind: ConsentKind, lang: "bn" | "en"): string {
  const ref = consentRef();

  void fetch("/api/consent", {
    method: "POST",
    headers: { "content-type": "application/json" },
    body: JSON.stringify({ ref, kind, notice_version: NOTICE_VERSION, lang }),
    keepalive: true,
  }).catch(() => {});

  return ref;
}
