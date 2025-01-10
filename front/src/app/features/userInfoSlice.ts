import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { RootState } from "../store";
import { UserInfoType } from "../types/userInfoType";

interface userInfoState {
  info: UserInfoType | null;
}

const initialState: userInfoState = {
  info: null,
};

export const userInfoSlice = createSlice({
  name: "userInfo",
  initialState,
  reducers: {
    setUserInfoSlice(state, action: PayloadAction<UserInfoType>) {
      state.info = action.payload;
    },
  },
});

export const { setUserInfoSlice } = userInfoSlice.actions;
export const selectedUserInfo = (state: RootState) => state.userInfo.info;
export default userInfoSlice.reducer;
