import { memo, useEffect, useState } from "react";
import MoreVertIcon from "@mui/icons-material/MoreVert";
import FormatListBulletedIcon from "@mui/icons-material/FormatListBulleted";
import { Draggable } from "@hello-pangea/dnd";
import Checkbox from "@mui/material/Checkbox";
import { useDispatch } from "react-redux";
import { taskAction } from "../Store/tasksSlice";

function TaskBoardItem({ data, index, idCol, idNextCol, checked }) {
  const [checkDone, setCheckDone] = useState(false);
  const dispatch = useDispatch();

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
  return (
    <Draggable key={data.id} draggableId={data.id} index={index}>
      {(provided, snapshot) => (
        <div
          ref={provided.innerRef}
          {...provided.draggableProps}
          {...provided.dragHandleProps}
          className={`${
            snapshot.isDragging ? "drop-shadow-2xl" : ""
          } w-11/12 ignore mt-2 ml-auto mr-auto h-fit cursor-grab p-2 rounded-xl bg-blur-light dark:bg-dark-primary`}
        >
          <div className={`justify-between flex`}>
            <div
              className={`p-1 h-fit rounded-md w-14 text-sm text-center ${
                data.type === "ux"
                  ? "text-ux bg-ux"
                  : data.type === "design"
                  ? "text-design bg-design"
                  : data.type === "code"
                  ? "text-code bg-code"
                  : "text-success bg-success"
              }`}
            >
              {data.type}
            </div>
            {checked && (
              <Checkbox
                sx={{ color: "inherit" }}
                checked={checkDone}
                onChange={(e) => setCheckDone(e.target.checked)}
              />
            )}
            {/* <MoreVertIcon className="hover:text-primary cursor-pointer"></MoreVertIcon> */}
          </div>
          <h1 className="text-sm font-family font-bold mt-2 text-clip w-full">
            {data.name}
          </h1>
          <p className="text-xs font-family select-none mt-1 mb-1 text-blur-light dark:text-blur-dark">
            {data.description}
          </p>
          <div className="p-1 rounded-md justify-start w-fit bg-light-second dark:bg-dark-second items-center flex">
            <FormatListBulletedIcon></FormatListBulletedIcon>
            <h5 className="">1/5</h5>
          </div>
        </div>
      )}
    </Draggable>
  );
}

export default memo(TaskBoardItem);
