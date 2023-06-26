import { useEffect, useState } from "react";

import { Button, Tooltip } from "@mui/material";
import AddIcon from "@mui/icons-material/Add";
import { CiMenuKebab } from "react-icons/ci";
import MenuItem from "../../../Component/MenuItem";
import { BsTrash3 } from "react-icons/bs";
import ModalConfirmRemove from "../../../Component/ModalConfirmRemove";
import Service from "../../../Service";
import { toast } from "react-toastify";
import { projectDetailAction } from "../../../Store/projectDetailSlice";
import { projectAction } from "../../../Store/projectSlice";

import { useDispatch } from "react-redux";

function SubNavTaskCol({
  stepProject,
  setOpenModalAddNewTask,
  index,
  lastIndex = 0,
  action = (e) => {},
  setColSelect,
  open,
  dataCol,
  projectDetail,
}) {
  const [openModalConfirmRemoveCol, setOpenModalConfirmRemoveCol] =
    useState(false);
  const dispatch = useDispatch();
  const handleRemoveCol = async () => {
    if (dataCol && projectDetail) {
      const idCol = dataCol._id;

      const result = await Service.remove(
        "/project/remove-col",
        `/?colId=${idCol}&projectId=${projectDetail._id}`
      );

      if (result.status === true) {
        dispatch(
          projectAction.removeCol({
            colId: dataCol._id,
            projectId: projectDetail._id,
          })
        );
        dispatch(
          projectDetailAction.removeCol({
            colId: dataCol._id,
          })
        );
        toast.success("Xót cột thành công!", {
          position: toast.POSITION.TOP_CENTER,
          autoClose: 2000,
        });
        setColSelect();
        setOpenModalConfirmRemoveCol(false);
      } else {
        console.log(result);
      }
    }
  };
  return (
    <>
      <ModalConfirmRemove
        action={handleRemoveCol}
        open={openModalConfirmRemoveCol}
        setOpen={setOpenModalConfirmRemoveCol}
      ></ModalConfirmRemove>
      <div
        className={`${
          open ? "relative" : ""
        } p-2 justify-center items-center flex  border-b-1 border-solid border-blur-light dark:border-blur-dark`}
      >
        <MenuItem
          open={open}
          style={{
            top: "100%",
            left: "calc(100% - 80px)",
          }}
          className=" rounded-md flex items-center flex-wrap justify-center p-2"
        >
          <Tooltip title="Thêm công việc" placement="right">
            <Button
              startIcon={<AddIcon className="ml-2"></AddIcon>}
              sx={{
                backgroundColor: "transparent",
                height: "1.5rem",
                color: "inherit",
                fontSize: ".75rem",
                border: "1px dashed rgba(255, 255, 255, .1)",
                "&:hover": {
                  backgroundColor: "rgba(0, 121, 220, .4)",
                },
              }}
              onClick={(e) => {
                setOpenModalAddNewTask(true);
                action();
              }}
            ></Button>
          </Tooltip>

          <Tooltip title="Xóa cột" placement="right">
            <Button
              startIcon={<BsTrash3 className="ml-2 scale-75"></BsTrash3>}
              sx={{
                backgroundColor: "transparent",
                height: "1.5rem",
                color: "inherit",
                fontSize: ".75rem",
                border: "1px dashed rgba(255, 255, 255, .1)",
                marginTop: ".5rem",
                "&:hover": {
                  backgroundColor: "red",
                },
              }}
              onClick={(e) => {
                setOpenModalConfirmRemoveCol(true);
              }}
            ></Button>
          </Tooltip>
        </MenuItem>

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
          } block h-2 mr-2 ml-2 w-2 rounded-full `}
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
          } text-md capitalize `}
        >
          {stepProject.name}
        </span>

        <CiMenuKebab
          className="float-right ml-auto cursor-pointer hover:text-primary"
          onClick={(e) => {
            setColSelect();
          }}
        ></CiMenuKebab>
      </div>
    </>
  );
}

export default SubNavTaskCol;
