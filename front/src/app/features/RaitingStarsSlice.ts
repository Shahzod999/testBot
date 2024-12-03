import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { RootState } from "../store";

const initialState: { count: number } = {
  count: 0,
};

export const countRaitingStateSlice = createSlice({
  name: "raitingCount",
  initialState,
  reducers: {
    setCountRaiting(state, action: PayloadAction<number>) {
      state.count = action.payload;
    },
  },
});

export const { setCountRaiting } = countRaitingStateSlice.actions;
export const selectedRaitingCount = (state: RootState) => state.raitingCount.count 
export default countRaitingStateSlice.reducer;
