import { createSlice } from "@reduxjs/toolkit";

export const authSlice = createSlice({
  name: "auth",
  initialState: {
    uid: null,
    refreshToken: null,
    accessToken: null,
    email: null,
    expirationTime: null,
    name: null,
  },
  reducers: {
    login: (state, action) => {
      state.uid = action.payload.uid;
      state.refreshToken = action.payload.refreshToken;
      state.accessToken = action.payload.accessToken;
      state.email = action.payload.email;
      state.expirationTime = action.payload.expirationTime;
      state.name = action.payload.name;
    },
    logout: (state) => {
      state.uid = null;
      state.refreshToken = null;
      state.accessToken = null;
      state.email = null;
      state.expirationTime = null;
      state.name = null;
    },
  },
});
export const { login, logout } = authSlice.actions;
export default authSlice.reducer;
