import { createSlice } from "@reduxjs/toolkit";
import { RootState } from "../store";

interface getCompanyState {
  companyId: string;
  userTelegramId: string;
  platform: "" | "android" | "ios";
}

const initialState: getCompanyState = {
  companyId: "",
  userTelegramId: "",
  platform: "",
};

export const getCompanyIdSlcie = createSlice({
  name: "companyId",
  initialState,
  reducers: {
    setCompanyId(state, action) {
      state.companyId = action.payload;
    },
    setPlatform(state, action) {
      state.platform = action.payload;
    },
    setUserTelegramId(state, action) {
      state.userTelegramId = action.payload;
    },
  },
});

export const { setCompanyId, setUserTelegramId, setPlatform } =
  getCompanyIdSlcie.actions;
export const selectedCompanyId = (state: RootState) =>
  state.companyId.companyId;
export const selectedUserTelegramId = (state: RootState) =>
  state.companyId.userTelegramId;
export const selectedPlatform = (state: RootState) => state.companyId.platform;

export default getCompanyIdSlcie.reducer;
