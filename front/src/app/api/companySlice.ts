import { ErrorComment, SendingComment, SuccessComment } from "../types/commentType";
import { apiSlice } from "./apiSlice";

export const companyApiSlice = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    getCompany: builder.query({
      query: () => ({
        url: "/company",
      }),
    }),
    getCompanyById: builder.query({
      query: (id) => ({
        url: `/company/${id}`,
      }),
    }),
    sendCommentByCompany: builder.mutation<SuccessComment | ErrorComment, SendingComment>({
      query: ({ id, data }) => ({
        url: `/comment/${id}`,
        method: "POST",
        body: data,
      }),
      invalidatesTags: ["Comment"],
    }),
    favoriteApi: builder.mutation({
      query: (id) => ({
        url: `/favorite/favorite/${id}`,
        method: "POST",
        body: {
          type: "company",
        },
      }),
    }),
    getCommentsbyCompany: builder.query({
      query: ({ id, limit }) => ({
        url: `comment/get-by-company/${id}`,
        params: {
          limit,
        },
      }),
      providesTags: ["Comment"]
    }),
  }),
});
export const {
  useGetCompanyQuery,
  useGetCompanyByIdQuery,
  useFavoriteApiMutation,
  useGetCommentsbyCompanyQuery,
  useSendCommentByCompanyMutation,
} = companyApiSlice;

// https://dev.admin13.uz/v1/delivery/bot/comment/673a89577d6d20cabf0ad3cb // company_id
