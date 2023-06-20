import { createSlice } from "@reduxjs/toolkit";

const projectSlice = createSlice({
  name: "task",
  initialState: [
    {
      _id: "648da3bbf796942184b7fc50",
      user_id_init: "648bcc42b500eef25dc543e3",
      title: "first project",
      description: "<ol><li>task 1 : asdasdsad</li></ol>",
      date_end: "Sat Jun 17 2023 19:14:22 GMT+0700 (Indochina Time)",
      member: "648ad8358bf0cd35e43a9e5e",
      step: [{ name: "Init", index: 0 }],
    },
  ],
  reducers: {
    init: (state, action) => {
      return [...action.payload];
    },
  },
});

export const { actions: projectAction, reducer: projectReducer } = projectSlice;
