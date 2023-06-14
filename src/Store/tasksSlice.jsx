import { createSlice } from "@reduxjs/toolkit";
import { v4 as uuid } from "uuid";

const tasksSlice = createSlice({
  name: "task",
  initialState: [
    {
      name: "Đang chờ",
      color: "todo",
      id: uuid(),
      tasks: [
        {
          id: uuid(),
          name: "Task 4",
          description: "Task₁work about , create some page html , css ....",
          status: 1,
          playListSubTask: 8,
          type: "ux",
          taskDate: "Thu Jun 08 2023 23:12:14 GMT+0700 (Indochina Time)",
        },
        {
          id: uuid(),
          name: "Task 5",
          description: "Task₁work about , create some page html , css ....",
          status: 1,
          playListSubTask: 8,
          type: "ux",
          taskDate: "Thu Jun 08 2023 23:12:14 GMT+0700 (Indochina Time)",
        },
        {
          id: uuid(),
          name: "Task 6",
          description: "Task₁work about , create some page html , css ....",
          status: 1,
          playListSubTask: 8,
          type: "design",
          taskDate: "Thu Jun 08 2023 23:12:14 GMT+0700 (Indochina Time)",
        },
        {
          id: uuid(),
          name: "Task 4",
          description: "Task₁work about , create some page html , css ....",
          status: 1,
          playListSubTask: 8,
          type: "ux",
          taskDate: "Thu Jun 08 2023 23:12:14 GMT+0700 (Indochina Time)",
        },
        {
          id: uuid(),
          name: "Task 5",
          description: "Task₁work about , create some page html , css ....",
          status: 1,
          playListSubTask: 8,
          type: "ux",
          taskDate: "Thu Jun 08 2023 23:12:14 GMT+0700 (Indochina Time)",
        },
        {
          id: uuid(),
          name: "Task 6",
          description: "Task₁work about , create some page html , css ....",
          status: 1,
          playListSubTask: 8,
          type: "design",
          taskDate: "Thu Jun 08 2023 23:12:14 GMT+0700 (Indochina Time)",
        },
      ],
    },
    {
      name: "Đang làm",
      color: "process",
      id: uuid(),
      tasks: [
        {
          id: uuid(),
          name: "Task 4",
          description: "Task₁work about , create some page html , css ....",
          status: 1,
          playListSubTask: 8,
          type: "ux",
          taskDate: "Thu Jun 08 2023 23:12:14 GMT+0700 (Indochina Time)",
        },
        {
          id: uuid(),
          name: "Task 5",
          description: "Task₁work about , create some page html , css ....",
          status: 1,
          playListSubTask: 8,
          type: "ux",
          taskDate: "Thu Jun 08 2023 23:12:14 GMT+0700 (Indochina Time)",
        },
        {
          id: uuid(),
          name: "Task 6",
          description: "Task₁work about , create some page html , css ....",
          status: 1,
          playListSubTask: 8,
          type: "design",
          taskDate: "Thu Jun 07 2023 23:12:14 GMT+0700 (Indochina Time)",
        },
      ],
    },
    {
      name: "Chờ đánh giá",
      color: "review",
      id: uuid(),
      tasks: [],
    },
    {
      name: "Hoàn thành",
      color: "done",
      id: uuid(),
      tasks: [],
    },
  ],
  reducers: {
    removeTask: (state, action) => {
      const { idTask, idColTask } = action.payload;
      const updatedColumns = state.map((column) => {
        if (column.id === idColTask) {
          const updatedTasks = column.tasks.filter(
            (task) => task.id !== idTask
          );
          return { ...column, tasks: updatedTasks };
        }
        return column;
      });
      return updatedColumns;
    },

    addTask: (state, action) => {
      const { idColTask, newTask, index } = action.payload;
      const updatedColumns = state.map((column) => {
        if (column.id === idColTask) {
          const updatedTasks = [...column.tasks];
          updatedTasks.splice(index, 0, newTask);
          return { ...column, tasks: updatedTasks };
        }
        return column;
      });
      return updatedColumns;
    },

    changeOffsetTask: (state, action) => {
      const { indexSource, indexDes, taskColId } = action.payload;

      const updatedColumns = state.map((taskCol) => {
        console.log(taskCol.id === taskColId);
        if (taskCol.id === taskColId) {
          const newList = [...taskCol.tasks];
          const [item] = newList.splice(indexSource, 1);
          newList.splice(indexDes, 0, item);
          return {
            ...taskCol,
            tasks: newList,
          };
        } else {
          return taskCol;
        }
      });
      console.log(updatedColumns);

      return updatedColumns;
    },

    addListTask: (state, action) => {
      const { nameListTask, idListTask } = action.payload;
      return [
        ...state,
        {
          name: nameListTask,
          color: "other",
          id: idListTask,
          tasks: [],
        },
      ];
    },
  },
});

export const { actions: taskAction, reducer: taskReducer } = tasksSlice;
