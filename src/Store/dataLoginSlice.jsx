import { createSlice } from "@reduxjs/toolkit";

const dataLoginSlice = createSlice({
  name: "theme",
  initialState: {
    isLogin: false,
    displayName: null,
    photoUrl: null,
    id: null,
    email: null,
  },
  reducers: {
    login: (state, action) => {
      return { state, ...action.payload };
    },
    logout: (state, action) => {
      return {
        isLogin: false,
        displayName: null,
        photoUrl: null,
        id: null,
        email: null,
      };
    },
  },
});

export const { actions: loginAction, reducer: loginReducer } = dataLoginSlice;
