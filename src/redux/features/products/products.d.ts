export interface ProductMapInterface {
  id: number;
  name: string;
  slug: string;
  price: string;
  image: string;
}

export interface ProductsInterface {
  loading: boolean;
  products: {
    data: ProductMapInterface[];
  };
}

export interface SeriesInterface {
  id: number;
  name: string;
}

export interface BrandInterface {
  id: number;
  name: string;
}

export interface WarrantyInterface {
  id: number;
  duration: string;
  duration_type: string;
}

export interface ProductImagesInterface {
  path: string;
}

export interface ProductFeaturesInterface {
  value: string;
}

export interface ProductInterface extends ProductFeaturesInterface {
  id: number;
  name: string;
  brand: BrandInterface;
  series: SeriesInterface;
  features: ProductFeaturesInterface[];
  warranty: WarrantyInterface;
  images: ProductImagesInterface[];
  price: string;
  coverage: string;
  video_link: string;
  avatar: string;
  cover_image: string;
}

export interface ProductApiSliceInterface {
  setCurrentApi: (api: string) => void;
}
