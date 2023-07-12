import { forwardRef, useEffect, useState } from "react";
import { MdOutlineEditCalendar } from "react-icons/md";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { Draggable } from "@hello-pangea/dnd";
import { useDispatch } from "react-redux";

function TaskItemList({ data, index }) {
  const dispatch = useDispatch();
  const [date, setDate] = useState(data.createdAt ? new Date(data.createdAt) : new Date());
  const [late, setLate] = useState(false);
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

  useEffect(() => {
    const dateFirst = new Date(data.createdAt);
    const dateSecond = new Date();
    if( dateFirst.getFullYear() < dateSecond.getFullYear() ){
      setLate(true);
      return;
    }

    if( dateFirst.getMonth() < dateSecond.getMonth()) {
      setLate(true);
      return;
    }

    if( date.getDate() < dateSecond.getDate()) {
      setLate(true);
      return;
    }
  }, [])

  console.log(late);

  return (
    <Draggable key={data._id} draggableId={data._id} index={index}>
      {(provided, snapshot) => (
        <div
          ref={provided.innerRef}
          {...provided.draggableProps}
          {...provided.dragHandleProps}
          className={`${late ? 'bg-red-900' : 'bg-design'} ignore p-2 flex flex-col flex-shrink-0 justify-between items-start ml-2 mr-2 mt-1 mb-1 rounded-md  `}
        >
          <div className="flex justify-between w-full" >
            <div className="flex flex-col w-max">
              <h1 className="text-md text-left overflow-visible capitalize">
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
          {
            late && <p className="text-red-200 text-xs">Quá hạn</p>
          }
        </div>
      )}
    </Draggable>
  );
}

export default TaskItemList;
