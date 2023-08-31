import { apiSlice } from "../api/api.slice";
import { store } from "@/redux/store";

export const productsApi = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    getProducts: builder.query({
      query: () =>
        `/senso/products/list?series=${
          store?.getState()?.products.series
        }&best=${store?.getState()?.products.best}&trending=${
          store?.getState()?.products.trending
        }&latest=${store?.getState()?.products.latest}&sort=${
          store?.getState()?.products.sort
        }`,
    }),
    getProduct: builder.query({
      query: (id) => `/senso/products/seo/${id}`,
    }),
  }),
});

export const { useGetProductsQuery, useGetProductQuery } = productsApi;
