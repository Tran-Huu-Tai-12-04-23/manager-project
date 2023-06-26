import { createSlice } from "@reduxjs/toolkit";

const projectDetailSlice = createSlice({
  name: "task",
  initialState: null,
  reducers: {
    initProjectDetail: (state, action) => {
      return { ...action.payload };
    },
    addNewCol: (state, action) => {
      const { newCol } = action.payload;
      const checkExist = state.columns.find((col) => col._id === newCol._id);
      if (!checkExist) return { ...state, columns: [...state.columns, newCol] };
      return { ...state };
    },

    removeTask: (state, action) => {
      const { taskId, colId } = action.payload;
      if (state) {
        return {
          ...state,
          columns: state.columns.map((col) => {
            console.log(col);
            if (col._id === colId) {
              return {
                ...col,
                tasks: col.tasks.filter((task) => task._id !== taskId),
              };
            }
            return col;
          }),
        };
      }
      return state;
    },
    addTaskToCol: (state, action) => {
      const { colId, task } = action.payload;
      if (state) {
        return {
          ...state,
          columns: state.columns.map((col) => {
            if (col._id === colId) {
              return { ...col, tasks: [...col.tasks, task] };
            }
            return col;
          }),
        };
      }

      return state;
    },

    removeCol: (state, action) => {
      const { colId } = action.payload;
      if (state) {
        return {
          ...state,
          columns: state.columns.filter((col) => col._id !== colId),
        };
      }
      return state;
    },

    selectProject: (state, action) => {
      const { project } = action.payload;
      return { ...project };
    },
  },
});

export const { actions: projectDetailAction, reducer: projectDetailReducer } =
  projectDetailSlice;
