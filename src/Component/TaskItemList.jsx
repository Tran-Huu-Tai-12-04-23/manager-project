import { forwardRef, useEffect, useState } from "react";
import { MdOutlineEditCalendar } from "react-icons/md";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { Draggable } from "@hello-pangea/dnd";
import { useDispatch } from "react-redux";

function TaskItemList({ data, index }) {
  console.log(data);
  const dispatch = useDispatch();
  const [date, setDate] = useState(data.createdAt ? new Date(data.createdAt) : new Date());
  const ExampleCustomInput = forwardRef(({ value, onClick }, ref) => (
    <div ref={ref} onClick={onClick}>
      <MdOutlineEditCalendar className=" hover:text-primary text-xl cursor-pointer ml-auto"></MdOutlineEditCalendar>
    </div>
  ));

  useEffect(() => {
    // dispatch(
    //   taskAction.changeDateOfTask({
    //     newDate: date.toString(),
    //     id: data.id,
    //   })
    // );
  }, [date]);

  return (
    <Draggable key={data._id} draggableId={data._id} index={index}>
      {(provided, snapshot) => (
        <div
          ref={provided.innerRef}
          {...provided.draggableProps}
          {...provided.dragHandleProps}
          className={`bg-design ignore p-2 flex flex-shrink-0 justify-between items-center ml-2 mr-2 mt-1 mb-1 rounded-md  `}
        >
          <div className="flex flex-col w-max">
            <h1 className="text-xs text-left overflow-visible capitalize">
              {data?.name}
            </h1>
            <h5 className="text-xs scale-75 text-blur-light dark:text-blur-dark text-left overflow-visible ">
              {new Date(data.createdAt).toLocaleDateString()}
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
