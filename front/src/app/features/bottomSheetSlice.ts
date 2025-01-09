import { createSlice } from "@reduxjs/toolkit";
import { RootState } from "../store";

interface BottomSheetState {
  bottomState: boolean;
  loadingState: boolean;
}

const initialState: BottomSheetState = {
  bottomState: false,
  loadingState: false,
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
    toggleLoading: (state, action) => {
      state.loadingState = action.payload;
    },
  },
});

export const { setBottomState, removeBottomState, toggleLoading } =
  bottomSheetSlice.actions;

export const selectBottomState = (state: RootState) =>
  state.bottomState.bottomState;
export const selectedLoadingState = (state: RootState) =>
  state.bottomState.loadingState;

export default bottomSheetSlice.reducer;
