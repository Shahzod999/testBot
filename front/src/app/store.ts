import { configureStore } from "@reduxjs/toolkit";
import { setupListeners } from "@reduxjs/toolkit/query";
import CompanyStateSlice from "./features/companyStateSlice";
import { apiSlice } from "./api/apiSlice";
import countRaitingStateSlice from "./features/RaitingStarsSlice";
import getCompanyIdSlcie from "./features/getCompanyIdSlice";
import toastReducer from "./features/toastSlice";
import userLocationSlice from "./features/userLocationSlice";
import bottomSheetSlice from "./features/bottomSheetSlice";
import userInfoSlice from "./features/userInfoSlice";
import analyticsSlice from "./features/analyticsSlice";

export const store = configureStore({
  reducer: {
    company: CompanyStateSlice,
    [apiSlice.reducerPath]: apiSlice.reducer,
    raitingCount: countRaitingStateSlice,
    companyId: getCompanyIdSlcie,
    toast: toastReducer,
    userLocation: userLocationSlice,
    bottomState: bottomSheetSlice,
    userInfo: userInfoSlice,
    analytics: analyticsSlice,
  },

  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(apiSlice.middleware),
  devTools: true,
});

setupListeners(store.dispatch); //this

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
