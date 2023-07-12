import { createSlice } from "@reduxjs/toolkit";

const dateSlice = createSlice({
  name: "dateCalender",
  initialState: new Date().toISOString(),
  reducers: {
    changeDate: (state, action) => {
      const {newDate} = action.payload;
      if( newDate ) {
        return newDate;
      }
      return state;
    }
  },
});

export const { actions: dateAction, reducer: dateReducer } = dateSlice;

