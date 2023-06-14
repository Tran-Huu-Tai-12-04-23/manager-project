// store.js
import { configureStore } from "@reduxjs/toolkit";
import rootReducer from "./features";

const store = configureStore({
  reducer: {
    reducer: rootReducer,
  },
});

export default store;
