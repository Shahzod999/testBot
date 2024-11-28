import { configureStore } from "@reduxjs/toolkit";
import { setupListeners } from "@reduxjs/toolkit/query";
import CompanyStateSlice from "./features/companyStateSlice";
import { apiSlice } from "./api/apiSlice";

export const store = configureStore({
  reducer: {
    company: CompanyStateSlice,
    [apiSlice.reducerPath]: apiSlice.reducer,
  },

  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(apiSlice.middleware),
  devTools: true,
});

setupListeners(store.dispatch); //this

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
