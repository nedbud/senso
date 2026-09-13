import { LOSS_LABEL, type Device, type LossLevel } from "@/lib/catalogue";
import type { Lang } from "@/lib/i18n";

const ORDER: LossLevel[] = ["mild", "moderate", "severe", "profound"];

/**
 * Which part of the hearing range this device is fitted for.
 *
 * The audiogram is the one drawing every patient here leaves with, and its
 * logic — quiet at the top, loss deepening downward — is the only visual
 * language in this trade that is native rather than decorative. Here it is
 * turned on its side into a scale, so a person can place themselves on it
 * without being able to read an audiogram at all.
 */
export default function LossScale({
  device,
  lang,
}: {
  device: Device;
  lang: Lang;
}) {
  const from = ORDER.indexOf(device.lossFrom);
  const to = ORDER.indexOf(device.lossTo);

  return (
    <div>
      <div className="flex gap-1.5" aria-hidden="true">
        {ORDER.map((level, i) => {
          const active = i >= from && i <= to;
          return (
            <div key={level} className="flex-1">
              <div
                className={`h-2 rounded-full ${
                  active ? "bg-brand" : "bg-line"
                }`}
                style={{ opacity: active ? 0.45 + (i - from) * 0.18 : 1 }}
              />
            </div>
          );
        })}
      </div>
      <div className="mt-2 flex gap-1.5">
        {ORDER.map((level, i) => {
          const active = i >= from && i <= to;
          return (
            <p
              key={level}
              className={`flex-1 text-xs leading-tight ${
                active ? "font-medium text-ink" : "text-ink-muted"
              }`}
            >
              {LOSS_LABEL[level][lang]}
            </p>
          );
        })}
      </div>
      <p className="sr-only">
        {lang === "bn"
          ? `এই মেশিনটি ${LOSS_LABEL[device.lossFrom].bn} থেকে ${LOSS_LABEL[device.lossTo].bn} মাত্রার শ্রবণক্ষয়ের জন্য।`
          : `Fitted for ${LOSS_LABEL[device.lossFrom].en} to ${LOSS_LABEL[device.lossTo].en} hearing loss.`}
      </p>
    </div>
  );
}
