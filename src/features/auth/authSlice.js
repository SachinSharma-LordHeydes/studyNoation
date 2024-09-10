import { createSlice } from "@reduxjs/toolkit";
import { createUserData } from './userDataStructure';

const initialState = {
  signupData: null,
  loading: false,
  otpSent: null,
  status: null,
  userData: createUserData(JSON.parse(localStorage.getItem("userData")) || {}),
};

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    setSignupData(state, action) {
      state.signupData = action.payload;
    },
    setLoading(state, action) {
      state.loading = action.payload;
    },
    setOtp(state, action) {
      state.otpSent = action.payload;
    },
    setStatus(state, action) {
      state.status = action.payload;
    },
    setData(state, action) {
      state.userData = createUserData({...state.userData, ...action.payload});
      localStorage.setItem("userData", JSON.stringify(state.userData));
    },
    removeData(state) {
      localStorage.removeItem("userData");
      state.userData = createUserData({});
    }
  },
});

export const { setSignupData, setLoading, setOtp, setStatus, setData, removeData } = authSlice.actions;
export default authSlice.reducer;