import { createSlice } from "@reduxjs/toolkit";
import { v4 as uuidv4 } from "uuid";
import { RootState } from "../store";
import {
  hapticVibration,
  hapticVibrationByType,
} from "../../hooks/hapticVibration";

export interface Toast {
  id: string;
  text: string;
  state: "error" | "success" | "info";
}

interface ToastState {
  message: Toast | null;
}

const initialState: ToastState = {
  message: null,
};

export const toastSlice = createSlice({
  name: "toast",
  initialState,
  reducers: {
    succesToast: (state, action) => {
      state.message = { id: uuidv4(), text: action.payload, state: "success" };
      hapticVibrationByType("success");
    },
    errorToast: (state, action) => {
      state.message = { id: uuidv4(), text: action.payload, state: "error" };
      hapticVibrationByType("error");
    },
    infoToast: (state, action) => {
      state.message = { id: uuidv4(), text: action.payload, state: "info" };
      hapticVibrationByType("warning");
    },
    removeToast: (state) => {
      state.message = null;
      hapticVibration("light");
    },
  },
});

export const { succesToast, errorToast, infoToast, removeToast } =
  toastSlice.actions;

export const selectToastMessage = (state: RootState) => state.toast.message;

export default toastSlice.reducer;
