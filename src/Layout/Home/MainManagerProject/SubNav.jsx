import { Button, Tooltip } from "@mui/material";
import AddIcon from "@mui/icons-material/Add";

function SubNav({ bgColor, textColor, taskName }) {
  return (
    <div className="p-4 justify-center items-center flex  border-b-1 border-r-1 border-solid border-blur-light dark:border-blur-dark">
      <div className={`${bgColor} block h-4 mr-2 w-4 rounded-full `}></div>
      <span className={`${textColor}`}>{taskName.name}</span>
      <Tooltip title="Thêm công việc" sx={{}}>
        <Button
          startIcon={<AddIcon className="ml-2"></AddIcon>}
          sx={{
            backgroundColor: "transparent",
            marginLeft: "1rem",
            color: "inherit",
            border: "1px dashed rgba(255, 255, 255, .1)",
          }}
        ></Button>
      </Tooltip>
    </div>
  );
}

export default SubNav;
