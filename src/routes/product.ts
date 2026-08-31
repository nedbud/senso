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

/** Server-side equivalent of what List.tsx used to do in a useEffect. */
export async function getProductsBySeries(opts: {
  series?: string | number;
  sort?: SortKey;
}): Promise<ProductMapInterface[]> {
  const series = opts.series ?? "all";
  const sort = opts.sort ?? "desc";
  const params = new URLSearchParams({
    series: String(series),
    best: String(sort === "best"),
    leatest: String(sort === "leatest"),
    trending: String(sort === "trending"),
    sort: sort === "asc" || sort === "desc" ? sort : "desc",
  });
  const json = await getJson<ApiList>(
    `${BASE}/api/senso/products/series?${params.toString()}`
  );
  return json?.data ?? [];
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
