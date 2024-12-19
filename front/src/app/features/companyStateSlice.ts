import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { CompanyState } from "../types/companyType";
import { RootState } from "../store";

interface companyStateState {
  value: CompanyState | null;
  isDarkMode: boolean;
}

const initialState: companyStateState = {
  value: null,
  isDarkMode: false,
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
  },
});

export const { setCompany, clearCompany, setDarkMode } =
  companyStateSlice.actions;
export const selectedCompany = (state: RootState) => state.company.value;
export const selectedIsDarkMode = (state: RootState) =>
  state.company.isDarkMode;
export default companyStateSlice.reducer;
