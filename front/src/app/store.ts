import { configureStore } from '@reduxjs/toolkit'
import { setupListeners } from "@reduxjs/toolkit/query";
import CounterSlice from './features/CounterSlice'
import { apiSlice } from './api/apiSlice'

export const store = configureStore({
  reducer: {
    counter: CounterSlice,
    [apiSlice.reducerPath]: apiSlice.reducer
  },

  middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat(apiSlice.middleware),
  devTools: true
})

setupListeners(store.dispatch)//this

export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch