import { Button, Tooltip } from "@mui/material";
import AddIcon from "@mui/icons-material/Add";

function SubNavTaskCol({ tasksData, setOpenModalAddNewTask }) {
  return (
    <div className="p-2 justify-center items-center flex  border-b-1 border-solid border-blur-light dark:border-blur-dark">
      <div
        className={`${
          tasksData.color === "todo"
            ? "bg-todo"
            : tasksData.color === "process"
            ? "bg-process"
            : tasksData.color === "review"
            ? "bg-review"
            : tasksData.color === "done"
            ? "bg-done"
            : "bg-other"
        } block h-2 mr-2 w-2 rounded-full `}
      ></div>
      <span
        className={`${
          tasksData.color === "todo"
            ? "text-todo"
            : tasksData.color === "process"
            ? "text-process"
            : tasksData.color === "review"
            ? "text-review"
            : tasksData.color === "done"
            ? "text-done"
            : ""
        } text-xs`}
      >
        {tasksData.name}
      </span>
      <Tooltip title="Thêm công việc" sx={{}}>
        <Button
          startIcon={<AddIcon className="ml-2"></AddIcon>}
          sx={{
            backgroundColor: "transparent",
            marginLeft: "1rem",
            height: "1.5rem",
            color: "inherit",
            fontSize: ".75rem",
            border: "1px dashed rgba(255, 255, 255, .1)",
          }}
          onClick={(e) => setOpenModalAddNewTask(true)}
        ></Button>
      </Tooltip>
    </div>
  );
}

export default SubNavTaskCol;
