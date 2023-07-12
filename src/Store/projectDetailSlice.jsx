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

    updateTask: (state, action) => {
      const {task} = action.payload;
      if( Array.isArray(state.columns) ) {
        return {
          ...state, columns: state.columns.map( col => {
            return {
              ...col, tasks: col.tasks.map( t => {
                if( t._id === task._id ) {
                  return task;
                }
                return t;
              })
            }
          })
        }
      }
      return state;
    },

    removeTask: (state, action) => {
      const { taskId, colId } = action.payload;
      if (state) {
        return {
          ...state,
          columns: state.columns.map((col) => {

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
    removeTaskOnlyTaskId: (state, action) => {
      const { taskId } = action.payload;
      if (state) {
        return {
         ...state,
          columns: state.columns.map((col) => {
              return {
                ...col,
                tasks: col.tasks.filter((task) => task._id!== taskId),
              };
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
            const isAlreadyTask = col.tasks.find(t => t.name === task.name);
            if (col._id === colId && !isAlreadyTask) {
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
