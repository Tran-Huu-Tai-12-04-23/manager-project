import { Tooltip } from "@mui/material";
import { forwardRef, useEffect, useState } from "react";
import { IoIosArrowBack, IoIosArrowForward } from "react-icons/io";
import { v4 as uuid } from "uuid";
import { MdOutlineEditCalendar } from "react-icons/md";
import TaskItemList from "./TaskItemList";
import { DragDropContext, Droppable } from "@hello-pangea/dnd";
import { useSelector, useDispatch } from "react-redux";

import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import ScrollContainer from "react-indiana-drag-scroll";

const months = [
  "Tháng 1",
  "Tháng 2",
  "Tháng 3",
  "Tháng 4",
  "Tháng 5",
  "Tháng 6",
  "Tháng 7",
  "Tháng 8",
  "Tháng 9",
  "Tháng 10",
  "Tháng 11",
  "Tháng 12",
];
const weekdays = ["CN", "T2", "T3", "T4", "T5", "T6", "T7"];

const Calendar = () => {
  const taskList = useSelector((state) => state.reducer.task);
  const dispatch = useDispatch();
  const tasks = useSelector((state) => state.reducer.tasks);
  const [month, setMonth] = useState(new Date().getMonth());
  const [year, setYear] = useState(new Date().getFullYear());
  const [date, setDate] = useState(new Date());
  const ExampleCustomInput = forwardRef(({ value, onClick }, ref) => (
    <div ref={ref} onClick={onClick}>
      <MdOutlineEditCalendar className="example-custom-input hover:text-primary text-xl cursor-pointer mt-2"></MdOutlineEditCalendar>
    </div>
  ));

  const onDragEnd = (result) => {
    const { res, dispatch, taskManagerAction, tasks } = result;
    const idTask = res.draggableId;

    const idSource = res.source?.droppableId;
    const idDes = res.destination?.droppableId;

    const indexSource = res.source?.index;
    const indexDes = res.destination?.index;

    if (idSource !== idDes && idDes && tasks) {
      const taskDate = tasks.find((task) => task?.id === idTask).taskDate;
      const day = parseInt(idDes?.split("-").pop(), 10); // Parse the day value to an integer
      const newDate = new Date(taskDate);
      newDate.setDate(day);

      if (day && newDate) {
        dispatch(
          taskManagerAction.changeColTaskDate({
            idTask: idTask,
            newDate: newDate.toString(),
          })
        );
      }
    } else {
      if (indexDes) {
        dispatch(
          taskManagerAction.changeIndex({
            idTask: idTask,
            indexSource,
            indexDes,
          })
        );
      }
    }
  };

  useEffect(() => {
    const currentMonth = date.getMonth();
    setMonth(months[currentMonth]);
  }, [date]);

  const renderCalendar = () => {
    const currentYear = date.getFullYear();
    const currentMonth = date.getMonth();

    const firstDay = new Date(currentYear, currentMonth, 1);
    const lastDay = new Date(currentYear, currentMonth + 1, 0);

    const prevLastDay = new Date(currentYear, currentMonth, 0).getDate();
    const firstDayIndex = firstDay.getDay();
    const lastDayIndex = lastDay.getDay();
    const nextDays = 7 - lastDayIndex - 1;

    const renderDay = (
      day,
      weekday,
      currentYear = date.getFullYear(),
      currentMonth = date.getMonth()
    ) => {
      // console.log({ day, weekday, currentYear, currentMonth });
      return (
        <div
          key={day}
          style={{
            height: "calc(100vh - 6.5rem)",
          }}
          className={`${
            day === date.getDate() && currentMonth === date.getMonth()
              ? "bg-code"
              : ""
          } w-15rem pb-5 overflow-hidden text-center border-r-1 border-solid border-blur-light dark:border-blur-dark height-expand-scroll`}
        >
          <div className="flex flex-col border-b-1 border-dashed border-blur-light dark:border-blur-dark">
            <Tooltip
              title={`${weekday} , ngày ${day}, tháng ${
                currentMonth + 1
              }, năm ${year}`}
            >
              <div className="cursor-pointer">{weekday}</div>
            </Tooltip>
            <Tooltip
              title={`${weekday} , ngày ${day}, tháng ${
                currentMonth + 1
              }, năm ${year}}`}
            >
              <div className="cursor-pointer">{day}</div>
            </Tooltip>
          </div>

          <div
            className=" overflow-auto pt-5 pb-10 hidden-scroll h-full min-h-screen"
            style={{}}
          >
            <Droppable key={`day-${day}`} droppableId={`day-${day}`}>
              {(provided, snapshot) => (
                <div
                  className=" flex flex-col flex-shrink-0 h-max min-h-screen"
                  ref={provided.innerRef}
                  {...provided.droppableProps}
                >
                  {tasks.map((task, index) => {
                    const dateTask = new Date(task?.taskDate);
                    if (
                      dateTask.getDate() === day &&
                      dateTask.getMonth() === currentMonth &&
                      dateTask.getFullYear() === currentYear
                    )
                      return (
                        <TaskItemList
                          key={index}
                          index={index}
                          data={task}
                          className="p-4 rounded-xl"
                        ></TaskItemList>
                      );
                  })}
                  {provided.placeholder}
                </div>
              )}
            </Droppable>
          </div>
        </div>
      );
    };

    const renderPrevDays = () => {
      const prevMonth = currentMonth === 0 ? 11 : currentMonth - 1;
      const prevYear = prevMonth === 11 ? currentYear - 1 : currentYear;
      const prevLastDay = new Date(prevYear, prevMonth + 1, 0).getDate();
      const prevDays = [];

      for (let i = firstDayIndex - 1; i >= 0; i--) {
        const day = prevLastDay - i;
        const weekday = weekdays[i];

        prevDays.push(renderDay(day, weekday, prevYear, prevMonth));
      }

      return prevDays;
    };

    const renderCurrentMonthDays = () => {
      const currentMonthDays = [];

      for (let i = 1; i <= lastDay.getDate(); i++) {
        const day = i;
        const weekday = weekdays[(firstDayIndex + i - 1) % 7];

        currentMonthDays.push(renderDay(day, weekday));
      }

      return currentMonthDays;
    };

    const renderNextDays = () => {
      const nextMonth = currentMonth === 11 ? 0 : currentMonth + 1;
      const nextYear = nextMonth === 0 ? currentYear + 1 : currentYear;
      const nextDays = [];

      for (let i = 1; i <= nextDays; i++) {
        const day = i;
        const weekday = weekdays[(lastDayIndex + i) % 7];

        nextDays.push(renderDay(day, weekday, nextMonth, nextYear));
      }

      return nextDays;
    };

    return (
      <div className="pl-4 w-full overflow-auto">
        <ScrollContainer ignoreElements=".ignore" style={{ overflow: "auto" }}>
          <div className="flex justify-start w-max flex-shrink-0">
            {renderPrevDays()}
            {renderCurrentMonthDays()}
            {renderNextDays()}
          </div>
        </ScrollContainer>
      </div>
    );
  };

  const handlePrevMonth = () => {
    setDate(new Date(date.getFullYear(), date.getMonth() - 1));
  };

  const handleNextMonth = () => {
    setDate(new Date(date.getFullYear(), date.getMonth() + 1));
  };

  return (
    <>
      <div
        className=""
        style={{
          width: "calc(100vw - 3.5rem)",
        }}
      >
        <div className="w-full  pl-4 border-b-1 border-solid border-blur-light dark:border-blur-dark">
          <div className="w-full mb-1 flex justify-start flex-wrap items-center ">
            <div
              className="hover:bg-light-third h-8 hover:dark:bg-dark-third cursor-pointer bg-light-second dark:bg-dark-second text-sm rounded-md p-2 justify-center items-center flex "
              onClick={handlePrevMonth}
            >
              <IoIosArrowBack></IoIosArrowBack>
            </div>
            <div className="text-sm h-8 bg-light-second dark:bg-dark-second ml-2 mr-2 rounded-md p-2 justify-center items-center flex">
              {month}
            </div>
            <div
              className="hover:bg-light-third h-8 hover:dark:bg-dark-third cursor-pointer text-sm rounded-md p-2 justify-center items-center flex bg-light-second dark:bg-dark-second "
              onClick={handleNextMonth}
            >
              <IoIosArrowForward></IoIosArrowForward>
            </div>

            <div className="ml-2 justify-start flex items-center">
              <h5 className="text-sm font-family mr-2">
                {date?.toLocaleDateString()}
              </h5>
              <DatePicker
                selected={date}
                onChange={(date) => {
                  console.log(date);
                  setDate(date);
                }}
                customInput={<ExampleCustomInput />}
              />
            </div>
          </div>
        </div>

        <DragDropContext
          onDragEnd={(res) =>
            onDragEnd((res = { res, dispatch, taskManagerAction, tasks }))
          }
        >
          {renderCalendar()}
        </DragDropContext>
      </div>
    </>
  );
};

export default Calendar;
