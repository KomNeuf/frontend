import { createSlice } from "@reduxjs/toolkit";

const authSlice = createSlice({
  name: "auth",
  initialState: {
    loginUser: null,
  },
  reducers: {
    login(state, action) {
      state.loginUser = action.payload;
      localStorage.setItem("loginUser", JSON.stringify(action.payload));
    },
    logout(state) {
      state.loginUser = null;
      localStorage.removeItem("loginUser");
    },
    loadUserFromStorage(state) {
      const storedUser = localStorage.getItem("loginUser");
      if (storedUser) {
        state.loginUser = JSON.parse(storedUser);
      }
    },
  },
});

export const { login, logout, loadUserFromStorage } = authSlice.actions;
export default authSlice.reducer;
