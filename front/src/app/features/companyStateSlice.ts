import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { CompanyState } from "../types/companyType";
import { RootState } from "../store";

interface companyStateState {
  value: CompanyState | null;
  isDarkMode: boolean;
  distance: number;
}

const initialState: companyStateState = {
  value: null,
  isDarkMode: false,
  distance: 0,
};

export const companyStateSlice = createSlice({
  name: "company",
  initialState,
  reducers: {
    setCompany(state, action: PayloadAction<CompanyState>) {
      state.value = action.payload;
    },
    clearCompany(state) {
      state.value = null;
    },
    setDarkMode(state, action) {
      state.isDarkMode = action.payload;
    },
    setDistance(state, action) {
      state.distance = action.payload;
    },
  },
});

export const { setCompany, clearCompany, setDarkMode, setDistance } =
  companyStateSlice.actions;
export const selectedCompany = (state: RootState) => state.company.value;
export const selectedIsDarkMode = (state: RootState) =>
  state.company.isDarkMode;
export const selectedDistance = (state: RootState) => state.company.distance
export default companyStateSlice.reducer;
