import { createSlice } from "@reduxjs/toolkit";

const authSlice = createSlice({
  name: "auth",

  initialState: {
    token: "",
    username: "",
  },
  reducers: {
    loginSuccess: (state, { payload }) => {
      state.token = payload.token;
      state.username = payload.user.username;
    },
  },
});

export const { loginSuccess } = authSlice.actions;
export default authSlice.reducer;
