import { Tooltip } from "@mui/material";
import { Droppable } from "@hello-pangea/dnd";
import TaskItemList from "./TaskItemList";

const DayOfWeek  = ({
    day,
    weekday,
    checkSameDay ,
    date,
    id,
    tasks,
    year = new Date().getFullYear(),
}) => {
    const currentYear = date.getFullYear();
    const currentMonth = date.getMonth();
    return (
        <div
          key={day}
          style={{
            height: "calc(100vh - 6.5rem)",
            width: 'calc((100vw - 3.5rem) / 7)'
          }}
          className={`${
            day === date.getDate() && checkSameDay
              ? "bg-code"
              : ""
          } pb-5 overflow-hidden text-center border-r-1 border-solid border-blur-light dark:border-blur-dark height-expand-scroll`}
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
            className=" overflow-auto  hidden-scroll h-full pt-5 pb-5"
            style={{
              height: 'calc(100vh - 13rem)',
            }}
          >
            <Droppable key={`day-${day}`} droppableId={id} >
              {(provided, snapshot) => (
                <div
                  className=" flex flex-col flex-shrink-0 h-max "
                  ref={provided.innerRef}
                  {...provided.droppableProps}
                  style={{
                    minHeight: 'calc(100vh - 15rem)'
                  }}
                >
                  {tasks.map((task, index) => {
                    const dateTask = new Date(task.createdAt);
                    if (
                      dateTask.getDate() === day 
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
}

export default DayOfWeek;