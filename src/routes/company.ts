export interface getCompanySettingsInterface {
  company: {
    name: string;
    phone: string;
    address: string;
    logo: string;
    cover: string;
  };
}

export async function getCompanySettings() {
  const res = await fetch(
    `${process.env.NEXT_PUBLIC_BASE_URL}/api/senso/company-settings/1`
  );
  return res.json();
}

export interface getCompanyAboutInterface {
  about: {
    carousel_heading: string;
    slug: string;
    description: string;
    brand: string;
    carousel_image: string;
  }[];
}

export async function getCompanyAbout() {
  const res = await fetch(
    `${process.env.NEXT_PUBLIC_BASE_URL}/api/senso/company-abouts/select`
  );
  return res.json();
}
