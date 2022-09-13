import { createSlice } from "@reduxjs/toolkit";

interface StateTypes {
  user: any;
  isLoggedIn: boolean;
  isAuthLogin: boolean;
  userId: string;
  userNickname: string;
  userImage: string;
}

const initialState: StateTypes = {
  user: {},
  isLoggedIn: false,
  isAuthLogin: false,
  userId: "",
  userNickname: "",
  userImage: "",
};

export const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    SET_ACTIVE_USER: (state, action) => {
      const { isLoggedIn, isAuthLogin, userId, userNickname, userImage } =
        action.payload;
      state.isLoggedIn = isLoggedIn;
      state.isAuthLogin = isAuthLogin;
      state.userId = userId;
      state.userNickname = userNickname;
      state.userImage = userImage;
    },
    REMOVE_ACTIVE_USER: (state, action) => {
      state.isLoggedIn = false;
      state.isAuthLogin = false;
      state.userId = "";
      state.userNickname = "";
      state.userImage = "";
    },
  },
});

export const { SET_ACTIVE_USER, REMOVE_ACTIVE_USER } = authSlice.actions;

export const selectIsLoggedIn = (state: { auth: StateTypes }) =>
  state.auth.isLoggedIn;
export const selectIsAuthLogin = (state: { auth: StateTypes }) =>
  state.auth.isAuthLogin;
export const selectUserId = (state: { auth: StateTypes }) => state.auth.userId;
export const selectUserNickname = (state: { auth: StateTypes }) =>
  state.auth.userNickname;
export const selectUserImage = (state: { auth: StateTypes }) =>
  state.auth.userImage;

export default authSlice.reducer;
