import { apiSlice } from "../api/api.slice";

export const companyApi = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    getDetails: builder.query({
      query: () => "senso/company-settings/1",
    }),
    getAbout: builder.query({
      query: () => "senso/company-abouts/select",
    }),
  }),
});

export const { useGetDetailsQuery, useGetAboutQuery } = companyApi;
