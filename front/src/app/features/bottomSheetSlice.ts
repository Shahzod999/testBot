import { createSlice } from "@reduxjs/toolkit";
import { RootState } from "../store";

interface BottomSheetState {
  bottomState: boolean;
}

const initialState: BottomSheetState = {
  bottomState: false,
};

export const bottomSheetSlice = createSlice({
  name: "bottomState",
  initialState,
  reducers: {
    setBottomState: (state) => {
      state.bottomState = true;
    },
    removeBottomState: (state) => {
      state.bottomState = false;
    },
  },
});

export const { setBottomState, removeBottomState } = bottomSheetSlice.actions;

export const selectBottomState = (state: RootState) =>
  state.bottomState.bottomState;

export default bottomSheetSlice.reducer;
