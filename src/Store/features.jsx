import { combineReducers } from "@reduxjs/toolkit";
import { themeReducer } from "./themeSlice";
import { taskReducer } from "./tasksSlice";
import { taskManagerReducer } from "./tasksManagerSlice";

const rootReducer = combineReducers({
  theme: themeReducer,
  task: taskReducer,
  taskManager: taskManagerReducer,
});

export default rootReducer;
