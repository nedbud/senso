import { apiSlice } from "../api/api.slice";

export const seriesApi = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    getSeries: builder.query({
      query: () => "/senso/series/select",
    }),
  }),
});

export const { useGetSeriesQuery } = seriesApi;
