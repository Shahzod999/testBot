import { createSlice } from "@reduxjs/toolkit";
import { RootState } from "../store";

const initialState: { companyId: string } = {
  companyId: "673a89577d6d20cabf0ad3cb",
};

export const getCompanyIdSlcie = createSlice({
  name: "companyId",
  initialState,
  reducers: {
    setCompanyId(state, action) {
      state.companyId = action.payload;
    },
  },
});

export const { setCompanyId } = getCompanyIdSlcie.actions;
export const selectedCompanyId = (state: RootState) =>
  state.companyId.companyId;
export default getCompanyIdSlcie.reducer;
