// store/slices/authSlice.js
import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  user: null,
  isLoggedIn: false,
};

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    loginSuccess: (state, action) => {
      state.user = action.payload;
      state.isLoggedIn = true;
    },
    logout: (state) => {
      state.user = null;
      state.isLoggedIn = false;
    },
     setFarmerInfo: (state, action) => {
      state.user = { ...state.user, ...action.payload }; // merge user + farmer data
    },
  },
});

export const { loginSuccess, logout, setFarmerInfo } = authSlice.actions;
export default authSlice.reducer;