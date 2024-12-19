import {
  ErrorComment,
  SendingComment,
  SuccessComment,
  SuccessUploadImg,
} from "../types/commentType";
import { apiSlice } from "./apiSlice";

export const companyApiSlice = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    getCompany: builder.query({
      query: () => ({
        url: "/delivery/bot/company",
      }),
    }),
    getCompanyById: builder.query({
      query: ({ id, lat, long }) => ({
        url: `/delivery/bot/company/${id}`,
        params: { lat, long },
      }),
    }),
    sendCommentByCompany: builder.mutation<
      SuccessComment | ErrorComment,
      SendingComment
    >({
      query: ({ id, data }) => ({
        url: `/delivery/bot/comment/${id}`,
        method: "POST",
        body: data,
      }),
      invalidatesTags: ["Comment"],
    }),
    favoriteApi: builder.mutation({
      query: (id) => ({
        url: `/delivery/bot/favorite/favorite/${id}`,
        method: "POST",
        body: {
          type: "company",
        },
      }),
    }),
    getCommentsbyCompany: builder.query({
      query: ({ id, limit }) => ({
        url: `/delivery/bot/comment/get-by-company/${id}`,
        params: {
          limit,
        },
      }),
      providesTags: ["Comment"],
    }),
    uploadImage: builder.mutation<SuccessUploadImg, FormData>({
      query: (formData) => ({
        url: "/image/upload",
        method: "POST",
        body: formData,
      }),
    }),
    updateRequest: builder.mutation({
      query: ({ id, data }) => ({
        url: `/delivery/bot/company/update-request/${id}`,
        method: "POST", 
        body: data, 
      }),
    }),
  }),
});
export const {
  useGetCompanyQuery,
  useGetCompanyByIdQuery,
  useFavoriteApiMutation,
  useGetCommentsbyCompanyQuery,
  useSendCommentByCompanyMutation,
  useUploadImageMutation,
  useUpdateRequestMutation
} = companyApiSlice;

// https://dev.admin13.uz/v1/delivery/bot/comment/673a89577d6d20cabf0ad3cb // company_id
