import { Button, Tooltip } from "@mui/material";
import AddIcon from "@mui/icons-material/Add";

function SubNavTaskCol({
  stepProject,
  setOpenModalAddNewTask,
  index,
  lastIndex = 0,
  action = (e) => {},
  setIndexTask,
}) {
  return (
    <div className="p-2 justify-center items-center flex  border-b-1 border-solid border-blur-light dark:border-blur-dark">
      <div
        className={`${
          index === "0"
            ? "bg-todo"
            : index === "1"
            ? "bg-process"
            : index === "2"
            ? "bg-review"
            : index === lastIndex
            ? "bg-done"
            : "bg-other"
        } block h-2 mr-2 w-2 rounded-full `}
      ></div>
      <span
        className={`${
          index === "0"
            ? "text-todo"
            : index === "1"
            ? "text-process"
            : index === "2"
            ? "text-review"
            : index === lastIndex
            ? "text-done"
            : "text-other"
        } text-md`}
      >
        {stepProject.name}
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
          onClick={(e) => {
            setOpenModalAddNewTask(true);
            action();
            setIndexTask(index);
          }}
        ></Button>
      </Tooltip>
    </div>
  );
}

export default SubNavTaskCol;
