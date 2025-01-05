import { SingleProdTypeTotal } from "../types/menuType";
import { apiSlice } from "./apiSlice";

export const companyApiSlice = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    getMenu: builder.query({
      query: ({ company_id, category_id }) => ({
        url: "/delivery/bot/product?page=1&limit=15",
        params: {
          company_id,
          category_id,
        },
      }),
    }),
    getSingleProd: builder.query<SingleProdTypeTotal, String | undefined>({
      query: (id) => ({
        url: `/delivery/bot/product/${id}`,
      }),
    }),
    getCategory: builder.query({
      query: ({ company_id }) => ({
        url: "/delivery/bot/category",
        params: {
          company_id,
        },
      }),
    }),
  }),
});
export const { useGetMenuQuery, useGetSingleProdQuery, useGetCategoryQuery } =
  companyApiSlice;
