import { createSlice } from "@reduxjs/toolkit";

const projectSlice = createSlice({
  name: "task",
  initialState: [],
  reducers: {
    init: (state, action) => {
      if (Array.isArray(action.payload)) {
        return [...action.payload];
      } else {
        // Handle non-iterable payload here
        return state; // or return a default value based on your requirements
      }
    },
    addTaskToCol: (state, action) => {
      const { task, colId, projectId } = action.payload;
      const newState = state.map(project => {
        if (project._id === projectId && Array.isArray(project.columns)) {
          const updatedColumns = project.columns.map(col => {
            if (col._id === colId) {
              return {
                ...col,
                tasks: [...col.tasks, task]
              };
            }
            return col;
          });
          return {
            ...project,
            columns: updatedColumns
          };
        }
        return project;
      });
      return newState;
    },
    updateTask: (state, action ) => {
      const { projectId, task} = action.payload;
      return state.map( project => {
        if( project._id === projectId) {
          return {
          ...project,
            columns: project.columns.map( col => {
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
        return project;
      } )
    },
    removeTask: (state, action) => {
      const {taskId, projectId} = action.payload;
      return state.map( pro => {
        if( pro._id === projectId) {
          return {
          ...pro,
            columns: pro.columns.map( col => {
              return {
               ...col, tasks: col.tasks.filter( t => {
                  if( t._id === taskId ) {
                    return false;
                  }
                  return true;
                })
              }
            }) 
          }
        }
        return pro;
      })
    },
    addNewCol: (state, action) => {
      const { newCol, projectId } = action.payload;
      return state.map((project) => {
        if (project._id === projectId) {
          return { ...project, columns: [...project.columns, newCol] };
        }
        return { ...project };
      });
    },
    removeCol: (state, action) => {
      const { colId, projectId } = action.payload;
      return state.map((pro) => {
        if (pro._id === projectId) {
          return {
            ...pro,
            columns: pro.columns.filter((col) => col.id !== colId),
          };
        }
        return pro;
      });
    },

    addNewProject: (state, action) => {
      const { newProject } = action.payload;
      return [...state, newProject];
    },

    removeProject: (state, action) => {
      const { projectId } = action.payload;
      return state.filter((project) => project._id !== projectId);
    },

    updateProject: (state, action) => {
      const {projectId, newProject} = action.payload;
      return state.map( project => {
        if( project._id === projectId) {
          return {
            ... newProject
          }
        }
        return project;
      })
    }
  },
});

export const { actions: projectAction, reducer: projectReducer } = projectSlice;
