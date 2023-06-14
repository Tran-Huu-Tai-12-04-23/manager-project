import { createSlice } from "@reduxjs/toolkit";

const themeSlice = createSlice({
  name: "theme",
  initialState: "light",
  reducers: {
    switchTheme(state, action) {
      return action.payload;
    },
  },
});

export const { actions: themeAction, reducer: themeReducer } = themeSlice;
