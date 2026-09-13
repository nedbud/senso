import type { Lang } from "./i18n";
import type { LossLevel, Need } from "./catalogue";

/**
 * The catalogue's whole state lives in the URL — including what the visitor
 * says they need.
 *
 * Series, sort, page and the four "which one suits you" answers are all query
 * parameters rather than component state. That is what makes every view of
 * the catalogue a real page: linkable, shareable, back-button-able, and
 * server-rendered. It is also what lets the answers filter the actual list
 * instead of producing a second list beside it.
 *
 * Defaults are left out of the query, so the canonical listing stays
 * `/hearing-aids` with nothing after it.
 */
export type ListState = {
  series: string;
  sort: string;
  parts: boolean;
  page: number;
  /** degree of hearing loss the visitor picked */
  loss?: LossLevel;
  /** true wants rechargeable, false is happy with cells, undefined unasked */
  rech?: boolean;
  /** prefers something that cannot be seen */
  hidden?: boolean;
  /** budget ceiling in taka */
  max?: number;
};

export const DEFAULTS = {
  series: "all",
  sort: "asc",
  parts: false,
  page: 1,
};

const LOSS_VALUES: LossLevel[] = ["mild", "moderate", "severe", "profound"];

export function parseListState(q?: {
  series?: string;
  sort?: string;
  parts?: string;
  page?: string;
  loss?: string;
  rech?: string;
  hidden?: string;
  max?: string;
}): ListState {
  const page = Number(q?.page ?? 1);
  const max = Number(q?.max);
  return {
    series: q?.series ?? DEFAULTS.series,
    sort: q?.sort ?? DEFAULTS.sort,
    parts: q?.parts === "1",
    page: Number.isFinite(page) && page > 0 ? Math.floor(page) : 1,
    loss: LOSS_VALUES.includes(q?.loss as LossLevel)
      ? (q?.loss as LossLevel)
      : undefined,
    rech: q?.rech === "1" ? true : q?.rech === "0" ? false : undefined,
    hidden: q?.hidden === "1" ? true : undefined,
    max: Number.isFinite(max) && max > 0 ? max : undefined,
  };
}

export function toNeed(state: ListState): Need {
  return {
    loss: state.loss,
    rechargeable: state.rech,
    discreet: state.hidden,
    maxPrice: state.max,
  };
}

export function listBase(lang: Lang) {
  return lang === "en" ? "/en/hearing-aids" : "/hearing-aids";
}

/** Everything the visitor said they need, cleared in one go. */
export function clearNeed(state: ListState): Partial<ListState> {
  return { loss: undefined, rech: undefined, hidden: undefined, max: undefined };
}

export function listHref(
  lang: Lang,
  current: ListState,
  next: Partial<ListState>
) {
  const state: ListState = { ...current, ...next };

  // Anything that changes what is being listed returns to the first page.
  // Landing on page 4 of a filter with two pages is the classic way a
  // catalogue shows someone an empty screen.
  const changesList = (["series", "sort", "parts", "loss", "rech", "hidden", "max"] as const).some(
    (k) => k in next && next[k] !== current[k]
  );
  if (changesList) state.page = 1;

  const params = new URLSearchParams();
  if (state.series !== DEFAULTS.series) params.set("series", state.series);
  if (state.sort !== DEFAULTS.sort) params.set("sort", state.sort);
  if (state.parts) params.set("parts", "1");
  if (state.loss) params.set("loss", state.loss);
  if (state.rech !== undefined) params.set("rech", state.rech ? "1" : "0");
  if (state.hidden) params.set("hidden", "1");
  if (state.max) params.set("max", String(state.max));
  if (state.page > 1) params.set("page", String(state.page));

  const qs = params.toString();
  return qs ? `${listBase(lang)}?${qs}` : listBase(lang);
}
