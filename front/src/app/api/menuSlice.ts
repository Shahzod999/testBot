import { SingleProdTypeTotal } from "../types/menuType";
import { apiSlice } from "./apiSlice";

export const companyApiSlice = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    getMenu: builder.query({
      query: ({ company_id, category_id, limit = "" }) => ({
        url: "/delivery/bot/product",
        params: {
          company_id,
          category_id,
          limit,
        },
      }),
    }),
    getSingleProd: builder.query<
      SingleProdTypeTotal,
      { id: string | undefined; companyId: string | undefined }
    >({
      query: ({ id, companyId }) => ({
        url: `/delivery/bot/product/${id}?company_id=${companyId}`,
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
