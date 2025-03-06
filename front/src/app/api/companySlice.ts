import { setCompany, setDistance } from "../features/companyStateSlice";
import { setUserInfoSlice } from "../features/userInfoSlice";
import {
  ErrorComment,
  SendingComment,
  SuccessComment,
  SuccessUploadImg,
} from "../types/commentType";
import { TaxiType } from "../types/companyType";
import i18n from "../utils/i18n";
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
      async onQueryStarted(_, { dispatch, queryFulfilled }) {
        try {
          const { data } = await queryFulfilled;
          if (data?.data) {
            dispatch(setCompany(data.data));
            dispatch(setDistance(data.data.distance));
          }
        } catch (error) {
          console.error("Failed to fetch taxi info:", error);
        }
      },
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
    getYandexPrice: builder.query<TaxiType, any>({
      query: ({ from_address, to_address }) => ({
        url: "/common/bot/taxi-price/checker/",
        method: "POST",
        body: {
          from_address,
          to_address,
        },
      }),
    }),
    getUserInfo: builder.query({
      query: ({ id }) => ({
        url: `/bot/me?telegram_id=${id}`,
      }),
      async onQueryStarted(_, { dispatch, queryFulfilled }) {
        try {
          const { data } = await queryFulfilled;
          if (data?.data) {
            dispatch(setUserInfoSlice(data.data));
          }
          const userLang = data.data.lang;
          if (userLang) {
            i18n.changeLanguage(userLang);
          } else {
            console.warn(`Invalid or missing language: ${userLang}`);
          }
        } catch (error) {
          console.error("Failed to fetch taxi info:", error);
        }
      },
    }),
    updateAnalytics: builder.mutation({
      query: ({ company_id, data }) => ({
        url: `/delivery/bot/analytic/${company_id}`,
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
  useUpdateRequestMutation,
  useGetYandexPriceQuery,
  useGetUserInfoQuery,
  useUpdateAnalyticsMutation,
} = companyApiSlice;

// https://dev.admin13.uz/v1/delivery/bot/comment/673a89577d6d20cabf0ad3cb // company_id
