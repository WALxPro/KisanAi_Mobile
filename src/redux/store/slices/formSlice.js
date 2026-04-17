// store/formSlice.js
import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  basic: null,       // { fullName, email, phone, password }
  otpVerified: false,
  profileUrl: null,  // Cloudinary URL
  cropDetails: null, // { cropName, cropType, etc. }
};

const formSlice = createSlice({
  name: "form",
  initialState,
  reducers: {
    saveBasic: (state, action) => { state.basic = action.payload },
    markOtpVerified: (state) => { state.otpVerified = true },
saveProfile: (state, action) => { state.profileUrl = action.payload },
    saveCrop: (state, action) => { state.cropDetails = action.payload },
    resetForm: () => initialState,
  },
});

export const { saveBasic, markOtpVerified, saveProfile, saveCrop, resetForm } = formSlice.actions;
export default formSlice.reducer;