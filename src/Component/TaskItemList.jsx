import { forwardRef, useEffect, useState } from "react";
import { MdOutlineEditCalendar } from "react-icons/md";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { Draggable } from "@hello-pangea/dnd";
import { useDispatch } from "react-redux";
import { taskAction } from "../Store/taskSlice";

function TaskItemList({ data, index }) {
  const dispatch = useDispatch();
  const [date, setDate] = useState(new Date(data.taskDate));
  const ExampleCustomInput = forwardRef(({ value, onClick }, ref) => (
    <div ref={ref} onClick={onClick}>
      <MdOutlineEditCalendar className=" hover:text-primary text-xl cursor-pointer ml-auto"></MdOutlineEditCalendar>
    </div>
  ));

  useEffect(() => {
    dispatch(
      taskAction.changeDateOfTask({
        newDate: date.toString(),
        id: data.id,
      })
    );
  }, [date]);
  return (
    <Draggable key={data.id} draggableId={data.id} index={index}>
      {(provided, snapshot) => (
        <div
          ref={provided.innerRef}
          {...provided.draggableProps}
          {...provided.dragHandleProps}
          className={`bg-${data.type} ignore p-2 flex flex-shrink-0 justify-between items-center ml-2 mr-2 mt-1 mb-1 rounded-md  `}
        >
          <div className="flex flex-col">
            <h1 className="text-xs  w-40 text-left overflow-visible mr-2">
              {data.name}
            </h1>
            <h5 className="text-xs scale-75 text-blur-light dark:text-blur-dark w-40 text-left overflow-visible mr-2">
              {data.description}
            </h5>
          </div>
          <DatePicker
            selected={date}
            onChange={(date) => {
              setDate(date);
            }}
            customInput={<ExampleCustomInput />}
          />
        </div>
      )}
    </Draggable>
  );
}

export default TaskItemList;
