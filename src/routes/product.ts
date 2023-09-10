export interface getBestProductsInterface {
  products: {
    brand: string;
    description: string;
    image: string;
    name: string;
    price: string;
    series: string;
    slug: string;
  }[];
}

export async function getBestProducts() {
  const res = await fetch(
    `${process.env.NEXT_PUBLIC_BASE_URL}/api/senso/products/list?best=true`
  );

  return res.json();
}

export interface ProductMapInterface {
  brand: string;
  description: string;
  image: string;
  name: string;
  price: string;
  series: string;
  slug: string;
}

export interface productsInterface {
  products: ProductMapInterface[];
}

export async function getProducts() {
  const res = await fetch(
    `${process.env.NEXT_PUBLIC_BASE_URL}/api/senso/products/list`,
    { cache: "no-store" }
  );

  return res.json();
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
    images: {
      path: string;
    }[];
    features: {
      value: string;
    }[];
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
  const res = await fetch(
    `${process.env.NEXT_PUBLIC_BASE_URL}/api/senso/products/seo/${slug}`,
    { cache: "no-store" }
  );

  return res.json();
}

export interface SeriesInterface {
  series: {
    name: string;
  }[];
}

export async function getSeries() {
  const res = await fetch(
    `${process.env.NEXT_PUBLIC_BASE_URL}/api/senso/series/select`,
    { cache: "no-store" }
  );

  return res.json();
}
