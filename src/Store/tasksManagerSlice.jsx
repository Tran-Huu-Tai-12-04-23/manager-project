import { createSlice } from "@reduxjs/toolkit";

const tasksManagerSlice = createSlice({
  name: "task",
  initialState: [
    {
      id: "f1b441ab-76cf-4276-b970-615dd232c3d4",
      name: "Task 1",
      description: "Task₁work about , create some page html , css ....",
      status: 1,
      playListSubTask: 8,
      type: "ux",
      taskDate: "Thu Jun 08 2023 23:12:14 GMT+0700 (Indochina Time)",
    },
    {
      id: "d501709f-4789-49f4-b150-1caf8207d832",
      name: "Task 2",
      description: "Task₁work about , create some page html , css ....",
      status: 1,
      playListSubTask: 8,
      type: "ux",
      taskDate: "Thu Jun 08 2023 23:12:14 GMT+0700 (Indochina Time)",
    },
    {
      id: "517080b3-428a-43ed-8c31-9815a50eaa5c",
      name: "Task 3",
      description: "Task₁work about , create some page html , css ....",
      status: 1,
      playListSubTask: 8,
      type: "design",
      taskDate: "Thu Jun 08 2023 23:12:14 GMT+0700 (Indochina Time)",
    },
    {
      id: "63738414-1949-437e-ac2b-b29e76e735b2",
      name: "Task 4",
      description: "Task₁work about , create some page html , css ....",
      status: 1,
      playListSubTask: 8,
      type: "ux",
      taskDate: "Thu Jun 08 2023 23:12:14 GMT+0700 (Indochina Time)",
    },
    {
      id: "5033926b-31c9-42c9-82c5-9c177875438c",
      name: "Task 5",
      description: "Task₁work about , create some page html , css ....",
      status: 1,
      playListSubTask: 8,
      type: "ux",
      taskDate: "Thu Jun 08 2023 23:12:14 GMT+0700 (Indochina Time)",
    },
    {
      id: "834c5935-fbb2-4299-ac30-6a2535b27c13",
      name: "Task 6",
      description: "Task₁work about , create some page html , css ....",
      status: 1,
      playListSubTask: 8,
      type: "design",
      taskDate: "Thu Jun 08 2023 23:12:14 GMT+0700 (Indochina Time)",
    },
    {
      id: "07271a3f-990a-4bc6-86ec-244ceb484e9b",
      name: "Task 7",
      description: "Task₁work about , create some page html , css ....",
      status: 1,
      playListSubTask: 8,
      type: "ux",
      taskDate: "Thu Jun 08 2023 23:12:14 GMT+0700 (Indochina Time)",
    },
    {
      id: "196befd6-e130-42ec-ba00-34a8d04815f0",
      name: "Task 8",
      description: "Task₁work about , create some page html , css ....",
      status: 1,
      playListSubTask: 8,
      type: "ux",
      taskDate: "Thu Jun 08 2023 23:12:14 GMT+0700 (Indochina Time)",
    },
    {
      id: "f183891e-b1be-451c-aacb-1f5d116175d2",
      name: "Task 9",
      description: "Task₁work about , create some page html , css ....",
      status: 1,
      playListSubTask: 8,
      type: "design",
      taskDate: "Thu Jun 07 2023 23:12:14 GMT+0700 (Indochina Time)",
    },
  ],
  reducers: {
    changeDateOfTask: (state, action) => {
      const { newDate, id } = action.payload;
      return state.map((task) => {
        if (task.id === id) {
          return { ...task, taskDate: newDate };
        }
        return task;
      });
    },

    changeIndex: (state, action) => {
      const { indexSource, indexDes, idTask } = action.payload;
      const newArray = [...state];
      let dateTask = newArray.find((task) => task.id === idTask)?.taskDate;
      const arrayWithDate = newArray.filter((task) =>
        compareDates(task.taskDate, dateTask)
      );
      const arrayWithDate2 = newArray.filter(
        (task) => !compareDates(task.taskDate, dateTask)
      );

      const item = arrayWithDate[indexSource];
      arrayWithDate.splice(indexSource, 1);
      arrayWithDate.splice(indexDes, 0, item);

      const updatedArray = newArray.map((task) => {
        if (compareDates(task.taskDate, dateTask)) {
          return arrayWithDate.shift();
        }
        return task;
      });

      return updatedArray;
    },

    changeColTaskDate: (state, action) => {
      const { idTask, newDate } = action.payload;
      return state.map((task) => {
        if (task.id === idTask) {
          return { ...task, taskDate: newDate };
        } else {
          return { ...task };
        }
      });
    },
  },
});

export const { actions: taskManagerAction, reducer: taskManagerReducer } =
  tasksManagerSlice;

function compareDates(date1, date2) {
  const dateCom1 = new Date(date1);
  const dateCom2 = new Date(date2);
  return (
    dateCom1.getMonth() === dateCom2.getMonth() &&
    dateCom1.getDate() === dateCom2.getDate() &&
    dateCom1.getFullYear() === dateCom2.getFullYear()
  );
}
