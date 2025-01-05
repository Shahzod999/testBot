import { apiSlice } from "./apiSlice";

export const companyApiSlice = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    getMenu: builder.query({
      query: () => ({
        url: "/delivery/bot/product?page=1&limit=15&company_id=&category_id=6769a149357ff3ec0ca848af",
      }),
    }),
    getSingleProd: builder.query({
      query: ({ id }) => ({
        url: `/delivery/bot/product/${id}`,
      }),
    }),
  }),
});
export const { useGetMenuQuery, useGetSingleProdQuery } = companyApiSlice;
