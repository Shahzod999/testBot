import { createSlice, PayloadAction } from "@reduxjs/toolkit";

export interface AnalyticsState {
  taxi: number;
  chat: number;
  route: number;
  call: number;
  share: number;
  applications: number;
  social_media: number;
  website: number;
  working_hours: number;
}

// Функция для загрузки данных из localStorage
const loadState = (): AnalyticsState | null => {
  try {
    const savedState = localStorage.getItem("analytics");
    return savedState ? JSON.parse(savedState) : null;
  } catch (error) {
    console.error("Ошибка загрузки аналитики:", error);
    return null;
  }
};

// Начальное состояние с загрузкой данных
const initialState: AnalyticsState = loadState() || {
  taxi: 0,
  chat: 0,
  route: 0,
  call: 0,
  share: 0,
  applications: 0,
  social_media: 0,
  website: 0,
  working_hours: 0,
};

const analyticsSlice = createSlice({
  name: "analytics",
  initialState,
  reducers: {
    trackEvent: (
      state,
      action: PayloadAction<{ event: keyof AnalyticsState }>,
    ) => {
      const { event } = action.payload;
      state[event] += 1;
      localStorage.setItem("analytics", JSON.stringify(state)); // Сохраняем в localStorage
    },
    resetAnalytics: (state) => {
      localStorage.removeItem("analytics"); // Очищаем localStorage
      state.taxi = 0;
      state.chat = 0;
      state.route = 0;
      state.call = 0;
      state.share = 0;
      state.applications = 0;
      state.social_media = 0;
      state.website = 0;
      state.working_hours = 0;
    },
  },
});

export const { trackEvent, resetAnalytics } = analyticsSlice.actions;
export default analyticsSlice.reducer;
