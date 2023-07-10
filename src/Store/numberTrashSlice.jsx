import { createSlice } from "@reduxjs/toolkit";

const numberTrashSlice = createSlice({
  name: "task",
  initialState: 0,
  reducers: {
    initNumberTrash: (state, action) => {
      const {number} = action.payload;
      if( number) {
        return number;
      }
      return state;
    },
    decrease: (state, action) => {
      const {number} = action.payload;
      return state - number;
    }
    ,
    increase: (state, action) => {
      const {number} = action.payload;
      return state + number;
    }
  },
});

export const { actions: numberTrashAction, reducer: numberTrashReducer } = numberTrashSlice;
