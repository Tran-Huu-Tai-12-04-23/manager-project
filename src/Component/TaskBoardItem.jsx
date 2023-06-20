import { memo, useEffect, useState } from "react";
import { Draggable } from "@hello-pangea/dnd";
import Checkbox from "@mui/material/Checkbox";
import { useDispatch } from "react-redux";
import { taskAction } from "../Store/taskSlice";

import { Tooltip } from "@mui/material";

function TaskBoardItem({ data, index, idCol, idNextCol, checked }) {
  const [checkDone, setCheckDone] = useState(false);
  const dispatch = useDispatch();
  const [priorityName, setPriorityName] = useState("Thấp");
  const [openMenu, setOpenMenu] = useState(false);
  const listPriority = [
    { name: "Thấp", value: 0, color: "text-low", background: "bg-low" },
    {
      name: "Vừa",
      value: 1,
      color: "text-medium",
      background: "bg-medium",
    },
    { name: "Cao", value: 2, color: "text-high", background: "bg-high" },
  ];

  useEffect(() => {
    if (data.priority === 0) {
      setPriorityName("Thấp");
    } else if (data.priority === 1) {
      setPriorityName("Vừa");
    } else if (data.priority === 2) {
      setPriorityName("Cao");
    } else if (data.priority === 3) {
      setPriorityName("Emergency");
    }
  }, [data]);

  useEffect(() => {
    if (checkDone === true) {
      let status = data.status + 1;
      data = { ...data, status: status };
      dispatch(
        taskAction.removeTask({
          idTask: data.id,
          idColTask: idCol,
        })
      );
      dispatch(
        taskAction.addTask({
          idColTask: idNextCol,
          newTask: data,
          index: 0,
        })
      );
    }
  }, [checkDone]);

  const handleMouseEnter = (event) => {
    setOpenMenu(true);
  };

  const handleMouseLeave = () => {
    setOpenMenu(false);
  };

  return (
    <Draggable key={data._id} draggableId={data._id} index={index}>
      {(provided, snapshot) => {
        return (
          <div
            ref={provided.innerRef}
            {...provided.draggableProps}
            {...provided.dragHandleProps}
            className={`${
              snapshot.isDragging ? "drop-shadow-2xl" : ""
            } ignore h-fit cursor-grab mt-2 ml-2 mr-2 p-2 rounded-xl bg-blur-light dark:bg-dark-primary`}
          >
            <div className={`justify-between flex`}>
              <div
                onMouseEnter={handleMouseEnter}
                onMouseLeave={handleMouseLeave}
                className={`p-1 h-fit relative rounded-md w-14 text-sm text-center ${
                  data.type === "ux"
                    ? "text-ux bg-ux"
                    : data.type === "design"
                    ? "text-design bg-design"
                    : data.type === "code"
                    ? "text-code bg-code"
                    : "text-success bg-success"
                }`}
              >
                {priorityName}

                {openMenu && (
                  <div className="p-2  bg-light-second dark:bg-dark-second absolute rounded-md bg-red w-fit min-w-[100px]">
                    <ul>
                      {listPriority.map((pri, index) => {
                        return (
                          <li
                            onMouseEnter={handleMouseEnter}
                            key={index}
                            value={pri.value}
                            sx={{
                              color: "inherit",
                            }}
                            className={`${pri?.color} backdrop-blur-3xl hover:brightness-125 cursor-auto ${pri?.background} p-2 mt-1 w-full cursor-pointer rounded-md  text-xs`}
                          >
                            {pri.name}
                          </li>
                        );
                      })}
                    </ul>
                  </div>
                )}
              </div>
              {checked && (
                <Checkbox
                  sx={{ color: "inherit" }}
                  checked={checkDone}
                  onChange={(e) => setCheckDone(e.target.checked)}
                />
              )}
            </div>
            <h1 className="capitalize text-sm font-family font-bold mt-2 text-clip w-full">
              {data.title}
            </h1>
            <h1 className=" text-xs text-blur-light dark:text-blur-dark font-family font-bold mt-2 text-clip w-full">
              {data.date}
            </h1>
          </div>
        );
      }}
    </Draggable>
  );
}

export default memo(TaskBoardItem);
