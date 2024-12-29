import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { RootState } from "../store";

interface countRaitingStateState {
  count: number;
  confitti: boolean;
}

const initialState: countRaitingStateState = {
  count: 0,
  confitti: false,
};

export const countRaitingStateSlice = createSlice({
  name: "raitingCount",
  initialState,
  reducers: {
    setCountRaiting(state, action: PayloadAction<number>) {
      state.count = action.payload;
    },
    setConfitti(state) {
      state.confitti = !state.confitti;
    },
  },
});

export const { setCountRaiting, setConfitti } = countRaitingStateSlice.actions;
export const selectedRaitingCount = (state: RootState) =>
  state.raitingCount.count;
export const selectedConfitti = (state: RootState) =>
  state.raitingCount.confitti;
export default countRaitingStateSlice.reducer;
