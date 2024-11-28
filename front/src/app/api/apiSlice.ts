import { fetchBaseQuery, createApi } from "@reduxjs/toolkit/query/react";

const baseQuery = fetchBaseQuery({
  baseUrl: "https://dev.admin13.uz/v1/delivery/bot",
  prepareHeaders: (headers) => {
    headers.set("telegram-id", "1815915910");
    return headers;
  },
});

export const apiSlice = createApi({
  baseQuery,
  tagTypes: [],
  endpoints: () => ({}),
});
