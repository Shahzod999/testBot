import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { CompanyState } from "../types/companyType";
import { RootState } from "../store";

const initialState: { value: CompanyState | null } = {
  value: null,
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
  },
});

export const { setCompany, clearCompany } = companyStateSlice.actions;
export const selectedCompany = (state: RootState) => state.company.value 
export default companyStateSlice.reducer;
