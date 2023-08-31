export interface SeriesMapInterface {
  id: number;
  name: string;
  slug: string;
  description: string | null;
  created_by: string;
  created_at: string;
}

export interface SeriesSelectInterface {
  data: SeriesMapInterface[];
}

export interface SeriesInterface {
  series: SeriesSelectInterface;
  loading: boolean;
}
