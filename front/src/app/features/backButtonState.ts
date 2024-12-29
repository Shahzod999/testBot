import { createSlice } from "@reduxjs/toolkit";
import { RootState } from "../store";

interface BackButtonState {
  stack: string[]; // Стек функций для обработки нажатия BackButton
}

const initialState: BackButtonState = {
  stack: [], // Изначально стек пуст
};

const callbackMap = new Map<string, () => void>();

export const backButtonSlice = createSlice({
  name: "backbutton",
  initialState,
  reducers: {
    pushBackButtonHandler(state, action) {
      const { id, callback } = action.payload;

      if (!callbackMap.has(id)) {
        callbackMap.set(id, callback); // Сохраняем функцию в карту
        state.stack.push(id); // Добавляем идентификатор в стек
      }
    },
    popBackButtonHandler(state) {
      const id = state.stack.pop();
      if (id) {
        callbackMap.delete(id); // Удаляем функцию из карты
      }
    },
    clearBackButtonHandlers(state) {
      state.stack.forEach((id) => callbackMap.delete(id)); // Очищаем карту
      state.stack = []; // Очищаем стек
    },
    executeBackButtonHandler(state) {
      const id = state.stack[state.stack.length - 1];
      if (id && callbackMap.has(id)) {
        callbackMap.get(id)?.(); // Выполняем функцию обратного вызова
      }
    },
  },
});

export const {
  pushBackButtonHandler,
  popBackButtonHandler,
  clearBackButtonHandlers,
  executeBackButtonHandler,
} = backButtonSlice.actions;

export const selectBackButtonStack = (state: RootState) =>
  state.backbutton.stack;

export default backButtonSlice.reducer;
