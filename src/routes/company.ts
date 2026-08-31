/**
 * Company data from the CMS.
 *
 * NOTE: /api/senso/company-settings/1 currently returns seeder placeholder
 * data — phone "01234567", address "Recusandae Et dolor". Nothing on the site
 * reads name, phone or address from here for that reason; those live in
 * src/lib/site.ts. Only the cover image is used. Once the CMS record is filled
 * in properly, move the values back here.
 */

const BASE = process.env.NEXT_PUBLIC_BASE_URL;

export interface CompanySettings {
  name: string;
  phone: { key: string; value: string }[];
  address: { key: string; value: string }[];
  logo: string;
  cover: string;
}

export async function getCompanySettings(): Promise<CompanySettings | null> {
  try {
    const res = await fetch(`${BASE}/api/senso/company-settings/1`, {
      next: { revalidate: 86400 },
    });
    if (!res.ok) return null;
    const json = await res.json();
    return json?.data ?? null;
  } catch {
    return null;
  }
}

export interface CompanyAbout {
  carousel_heading: string;
  slug: string;
  description: string;
  brand: string;
  carousel_image: string;
}

export async function getCompanyAbout(): Promise<CompanyAbout[]> {
  try {
    const res = await fetch(`${BASE}/api/senso/company-abouts/select`, {
      next: { revalidate: 86400 },
    });
    if (!res.ok) return [];
    const json = await res.json();
    return json?.data ?? [];
  } catch {
    return [];
  }
}

/** Kept for the About components, which import this name. */
export type getCompanyAboutInterface = { about: CompanyAbout[] };
