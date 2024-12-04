import { apiSlice } from "./apiSlice";

export const companyApiSlice = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    getCompany: builder.query({
      query: () => ({
        url: "/company"
      })
    }),
    getCompanyById: builder.query({
      query: (id) => ({
        url: `/company/${id}`
      })
    }),
    getCommentsByCompany: builder.query({
      query: (id) => ({
        url: `/comment/get-by-company/${id}`
      })
    }),
    favoriteApi: builder.mutation({
      query: (id) => ({
        url: `/favorite/favorite/${id}`,
        method: "POST"
      })
    }),
    getCommentsbyCompany: builder.query({
      query: ({ id, limit }) => ({
        url: `comment/get-by-company/${id}`,
        params: {
          limit
        }
      })
    })
  }),
});
export const { useGetCompanyQuery, useGetCompanyByIdQuery, useGetCommentsByCompanyQuery, useFavoriteApiMutation, useGetCommentsbyCompanyQuery } = companyApiSlice;

