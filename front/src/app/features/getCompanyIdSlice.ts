import { createSlice } from "@reduxjs/toolkit";
import { RootState } from "../store";

interface getCompanyState {
  companyId: string;
  userTelegramId: string;
}

const initialState: getCompanyState = {
  companyId: "673a89567d6d20cabf0ad3bf",
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
