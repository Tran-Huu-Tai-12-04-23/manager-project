import { createSlice } from "@reduxjs/toolkit";

const projectTrashSlice = createSlice({
  name: "projetcTrash",
  initialState: [],
  reducers: {
    intiProjectTrash: (state, action) => {
      const {data } = action.payload;
      if( data ) {
        return data;
      }
      return state;
    }
    ,
    restore: (state, action) => {
      const {projectId} = action.payload;
      return state.filter(project => project._id !== projectId);
    }
  },
});

export const { actions: projectTrashAction, reducer: projectTrashReducer } = projectTrashSlice;
