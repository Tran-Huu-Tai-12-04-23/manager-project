import { combineReducers } from "@reduxjs/toolkit";
import { themeReducer } from "./themeSlice";
import { taskReducer } from "./taskSlice";
import { loginReducer } from "./dataLoginSlice";
import { projectReducer } from "./projectSlice";
import { projectDetailReducer } from "./projectDetailSlice";

const rootReducer = combineReducers({
  theme: themeReducer,
  tasks: taskReducer,
  dataLogin: loginReducer,
  projects: projectReducer,
  projectDetail: projectDetailReducer,
});

export default rootReducer;
