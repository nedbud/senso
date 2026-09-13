/**
 * Product data.
 *
 * All fetches are cached with `next: { revalidate }` rather than
 * `cache: "no-store"`. The previous setting meant every page view hit the
 * Laravel API again, on a connection where that is the slowest thing on the
 * page. Prices change rarely; an hour of staleness is fine and the pages
 * become statically renderable, which is what lets the product list be
 * server-rendered and therefore crawlable.
 */

const BASE = process.env.NEXT_PUBLIC_BASE_URL;
const HOUR = 3600;

export interface ProductMapInterface {
  id?: number;
  series_id?: number;
  brand: string;
  description?: string;
  image: string;
  name: string;
  price: string;
  series: string;
  slug: string;
}

export interface productsInterface {
  products: ProductMapInterface[];
}

export interface getBestProductsInterface {
  products: ProductMapInterface[];
}

type ApiList = { data?: ProductMapInterface[] };

async function getJson<T>(url: string, revalidate = HOUR): Promise<T | null> {
  try {
    const res = await fetch(url, { next: { revalidate } });
    if (!res.ok) return null;
    return (await res.json()) as T;
  } catch {
    // A dead API must not take the whole page down — the phone number, the
    // address and the opening hours still need to render.
    return null;
  }
}

export async function getBestProducts(): Promise<ProductMapInterface[]> {
  const json = await getJson<ApiList>(
    `${BASE}/api/senso/products/list?best=true`
  );
  return json?.data ?? [];
}

export async function getProducts(): Promise<ProductMapInterface[]> {
  const json = await getJson<ApiList>(`${BASE}/api/senso/products/list`);
  return json?.data ?? [];
}

export type SortKey = "best" | "trending" | "leatest" | "asc" | "desc";

/**
 * Series that are consumables rather than hearing aids.
 *
 * The catalogue mixes devices with batteries and spare parts, so anything
 * that computes "prices from ..." or an AggregateOffer over the whole list
 * ends up advertising hearing aids from BDT 300 — which is a battery.
 * ("Hearign Aid Battery" is spelled that way in the CMS.)
 */
export const ACCESSORY_SERIES = ["Hearign Aid Battery", "No Series"];

export function isAccessory(p: ProductMapInterface) {
  return ACCESSORY_SERIES.includes(p.series);
}

export function priceStats(products: ProductMapInterface[]) {
  const values = products
    .filter((p) => !isAccessory(p))
    .map((p) => parseFloat(p.price))
    .filter((n) => isFinite(n) && n > 0);
  if (!values.length) return null;
  return {
    low: Math.round(Math.min(...values)),
    high: Math.round(Math.max(...values)),
    count: values.length,
  };
}

/**
 * Filtering and sorting happen here, over the full catalogue, rather than
 * through /products/series.
 *
 * That endpoint returns 40 rows where /products/list returns 109, so using
 * it silently hid roughly two thirds of the catalogue — including whole
 * series. It also cost a network round trip per filter click. One cached
 * fetch of the full list and an in-memory filter is both complete and
 * faster. `best`, `trending` and `latest` are not present on the list
 * payload, so those three still ask the API.
 */
export async function getProductsBySeries(opts: {
  series?: string | number;
  sort?: SortKey;
  includeAccessories?: boolean;
}): Promise<ProductMapInterface[]> {
  const series = String(opts.series ?? "all");
  const sort = opts.sort ?? "desc";

  if (sort === "best" || sort === "trending" || sort === "leatest") {
    const params = new URLSearchParams({
      series,
      best: String(sort === "best"),
      leatest: String(sort === "leatest"),
      trending: String(sort === "trending"),
      sort: "desc",
    });
    const json = await getJson<ApiList>(
      `${BASE}/api/senso/products/series?${params.toString()}`
    );
    return json?.data ?? [];
  }

  let rows = await getProducts();

  if (!opts.includeAccessories) rows = rows.filter((p) => !isAccessory(p));

  if (series !== "all") {
    rows = rows.filter(
      (p) => String(p.series_id) === series || p.series === series
    );
  }

  return rows.sort((a, b) => {
    const x = parseFloat(a.price) || 0;
    const y = parseFloat(b.price) || 0;
    return sort === "asc" ? x - y : y - x;
  });
}

export interface ProductInterface {
  product: {
    name: string;
    version: string;
    brand: string;
    series: string;
    warranty: string;
    price: string;
    coverage: string;
    avatar: string;
    video_link: string;
    cover_image: string;
    images: { path: string }[];
    features: { value: string }[];
    description: string;
    contents: {
      title: string;
      content: string;
      image: string;
      created_at: string;
    }[];
    created_at: string;
  };
}

export async function getProduct(slug: string) {
  return getJson<{ data: ProductInterface["product"] }>(
    `${BASE}/api/senso/products/seo/${slug}`
  );
}

export interface SeriesInterface {
  series: { id?: number; name: string }[];
}

export async function getSeries(): Promise<{ id?: number; name: string }[]> {
  const json = await getJson<{ data?: { id?: number; name: string }[] }>(
    `${BASE}/api/senso/series/select`,
    HOUR * 24
  );
  return json?.data ?? [];
}
