import { createSlice } from "@reduxjs/toolkit";

const taskSlice = createSlice({
  name: "tasks",
  initialState: [],
  reducers: {
    init: (state, action) => {
      return [...action.payload];
    },
    changeOrder: (state, action) => {
      const { taskId, newOrder } = action.payload;
      return state.map((task) => {
        if (task._id === taskId) {
          return { ...task, order: newOrder.toString() };
        }
        return { ...task };
      });
    },

    changeStepTask: (state, action) => {
      const { taskId, index } = action.payload;
      return state.map((task) => {
        if (task._id === taskId) {
          return {
            ...task,
            index_task_step: index,
          };
        }
        return { ...task };
      });
    },

    sortTasks: (state, action) => {
      return [...state].sort((a, b) => {
        const orderA = Number(a.order);
        const orderB = Number(b.order);

        return orderA - orderB;
      });
    },

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

export const { actions: taskAction, reducer: taskReducer } = taskSlice;

function compareDates(date1, date2) {
  const dateCom1 = new Date(date1);
  const dateCom2 = new Date(date2);
  return (
    dateCom1.getMonth() === dateCom2.getMonth() &&
    dateCom1.getDate() === dateCom2.getDate() &&
    dateCom1.getFullYear() === dateCom2.getFullYear()
  );
}
