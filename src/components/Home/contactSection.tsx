"use client";

import { useRef, useState } from "react";
import emailjs from "@emailjs/browser";
import { toast } from "react-toastify";
import { SITE, telLink, whatsappLink } from "@/lib/site";
import { dict, type Lang } from "@/lib/i18n";
import { PhoneIcon, WhatsAppIcon } from "@/components/ui/Icons";

/**
 * Text and voice get equal weight, and the form is the third option rather
 * than the first. Almost everyone who contacts this business does it by
 * message, and asking someone with hearing loss to phone you as the price of
 * admission is the wrong default for a hearing clinic.
 *
 * The form keeps four fields. Stripping forms to name+email is folklore; the
 * "best time to call" field is friction that buys reassurance, because it
 * tells the person a human will ring at a moment they control.
 */
export default function Contact({ lang }: { lang: Lang }) {
  const d = dict(lang);
  const bn = lang === "bn";
  const form = useRef<HTMLFormElement>(null);
  const [sending, setSending] = useState(false);

  const serviceId = process.env.NEXT_PUBLIC_EMAILJS_SERVICE_ID || "";
  const templateId = process.env.NEXT_PUBLIC_EMAILJS_TEMPLATE_ID || "";
  const accountId = process.env.NEXT_PUBLIC_EMAILJS_ACCOUNT_ID || "";

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!form.current || sending) return;
    setSending(true);
    try {
      const result = await emailjs.sendForm(
        serviceId,
        templateId,
        form.current,
        accountId
      );
      if (result.text === "OK") {
        toast.success(
          bn
            ? "পেয়েছি। আমরা শীঘ্রই ফোন করব।"
            : "Got it. We will call you shortly."
        );
        form.current.reset();
      } else {
        throw new Error(result.text);
      }
    } catch {
      toast.error(
        bn
          ? "পাঠানো গেল না। সরাসরি হোয়াটসঅ্যাপে লিখুন বা ফোন করুন।"
          : "That did not send. Please message us on WhatsApp or call instead."
      );
    } finally {
      setSending(false);
    }
  };

  const label = "block font-display font-semibold text-ink mb-1.5";
  const input =
    "w-full min-h-[52px] rounded-lg border-[1.5px] border-line-strong bg-paper-surface px-4 text-[17px] text-ink focus:border-ink-2 focus:outline-none";

  return (
    <section id="contact" className="mx-auto max-w-3xl px-4 py-12 lg:px-8">
      <h2 className="mb-3 text-[clamp(24px,4.6vw,31px)] text-ink">
        {bn ? "যোগাযোগ করুন" : "Get in touch"}
      </h2>
      <p className="mb-6 max-w-prose text-xl text-ink-2">
        {bn
          ? "যেভাবে আপনার সুবিধা — লিখে, ফোনে, অথবা সরাসরি চলে এসে।"
          : "However suits you — message, call, or simply walk in."}
      </p>

      <div className="mb-8 grid gap-2.5 sm:grid-cols-2">
        <a
          href={whatsappLink(d.wa.appointment)}
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex min-h-[52px] items-center justify-center gap-2 rounded-lg border-[1.5px] border-brand bg-brand px-5 font-display text-lg font-semibold text-white hover:bg-brand-deep"
        >
          <WhatsAppIcon className="h-5 w-5" />
          {d.hero.ctaWhatsapp}
        </a>
        <a
          href={telLink()}
          className="inline-flex min-h-[52px] items-center justify-center gap-2 rounded-lg border-[1.5px] border-line-strong bg-paper-surface px-5 font-display text-lg font-semibold text-ink hover:border-ink-2"
        >
          <PhoneIcon className="h-[19px] w-[19px]" />
          <span className="num">{SITE.phoneDisplay}</span>
        </a>
      </div>

      <div className="rounded-xl border border-line bg-paper-surface p-5">
        <h3 className="mb-1 font-display text-xl font-semibold text-ink">
          {bn ? "অথবা নম্বর রেখে যান, আমরা ফোন করব" : "Or leave your number and we will call you"}
        </h3>
        <p className="mb-5 text-[17px] text-ink-2">
          {bn
            ? "কোন সময়ে ফোন করলে আপনার সুবিধা হবে সেটাও লিখে দিন।"
            : "Tell us when it suits you to be called."}
        </p>

        <form ref={form} onSubmit={handleSubmit} className="flex flex-col gap-4">
          <div>
            <label className={label} htmlFor="name">
              {bn ? "নাম" : "Name"}
            </label>
            <input id="name" name="name" type="text" required className={input} />
          </div>

          <div>
            <label className={label} htmlFor="phone">
              {bn ? "ফোন নম্বর" : "Phone number"}
            </label>
            <input
              id="phone"
              name="phone"
              type="tel"
              inputMode="tel"
              required
              className={`${input} num`}
              placeholder="01XXXXXXXXX"
            />
          </div>

          <div>
            <label className={label} htmlFor="besttime">
              {bn ? "কখন ফোন করলে সুবিধা" : "Best time to call"}
            </label>
            <input
              id="besttime"
              name="besttime"
              type="text"
              className={input}
              placeholder={bn ? "যেমন: বিকেল ৪টার পর" : "e.g. after 4 PM"}
            />
          </div>

          <div>
            <label className={label} htmlFor="message">
              {bn ? "কানের সমস্যাটা কী?" : "What is happening with your hearing?"}
            </label>
            <textarea
              id="message"
              name="message"
              rows={4}
              className={`${input} py-3`}
            />
          </div>

          {/* emailjs template still expects an email field */}
          <input type="hidden" name="email" value={SITE.email} readOnly />

          <button
            type="submit"
            disabled={sending}
            className="inline-flex min-h-[52px] items-center justify-center rounded-lg border-[1.5px] border-brand bg-brand px-5 font-display text-lg font-semibold text-white hover:bg-brand-deep disabled:opacity-60"
          >
            {sending
              ? bn
                ? "পাঠানো হচ্ছে…"
                : "Sending…"
              : bn
              ? "ফোন করার অনুরোধ পাঠান"
              : "Ask us to call you"}
          </button>
        </form>
      </div>

      <div className="mt-8 flex flex-col gap-2 text-[17px] text-ink-2">
        <p className="font-display font-semibold text-ink">
          {bn ? "কোথায় আসবেন" : "Where to find us"}
        </p>
        <p>
          {bn ? SITE.address.lineBn : SITE.address.line},{" "}
          {bn
            ? `${SITE.address.cityBn}-${SITE.address.postcode}`
            : `${SITE.address.city}-${SITE.address.postcode}`}
          <br />
          <span className="text-ink-muted">
            {bn ? SITE.address.landmarkBn : SITE.address.landmark}
          </span>
        </p>
        <a
          href={SITE.address.mapsUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="font-display font-semibold text-brand underline"
        >
          {d.common.map}
        </a>
      </div>
    </section>
  );
}
