import { createSlice } from "@reduxjs/toolkit";
import { RootState } from "../store";

interface getCompanyState {
  companyId: string;
  userTelegramId: string;
}

const initialState: getCompanyState = {
  companyId: "",
  userTelegramId: "",
};

export const getCompanyIdSlcie = createSlice({
  name: "companyId",
  initialState,
  reducers: {
    setCompanyId(state, action) {
      state.companyId = action.payload;
    },
    setUserTelegramId(state, action) {
      state.userTelegramId = action.payload;
    },
  },
});

export const { setCompanyId, setUserTelegramId } = getCompanyIdSlcie.actions;
export const selectedCompanyId = (state: RootState) =>
  state.companyId.companyId;
export const selectedUserTelegramId = (state: RootState) =>
  state.companyId.userTelegramId;
export default getCompanyIdSlcie.reducer;
