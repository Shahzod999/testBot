import { createSlice } from "@reduxjs/toolkit";
import { RootState } from "../store";

interface BackButtonState {
  stack: (() => void)[]; // Стек функций для обработки нажатия BackButton
}

const initialState: BackButtonState = {
  stack: [], // Изначально стек пуст
};

export const backButtonSlice = createSlice({
  name: "backbutton",
  initialState,
  reducers: {
    pushBackButtonHandler(state, action) {
      // Добавление обработчика в стек
      state.stack.push(action.payload);
    },
    popBackButtonHandler(state) {
      // Удаление обработчика из стека
      state.stack.pop();
    },
    clearBackButtonHandlers(state) {
      // Полностью очищает стек
      state.stack = [];
    },
  },
});

export const {
  pushBackButtonHandler,
  popBackButtonHandler,
  clearBackButtonHandlers,
} = backButtonSlice.actions;

export const selectBackButtonStack = (state: RootState) =>
  state.backbutton.stack;

export default backButtonSlice.reducer;
