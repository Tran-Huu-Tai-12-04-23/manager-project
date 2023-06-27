import { AvatarGroup, Avatar, Tooltip } from "@mui/material";
import { useEffect, useState } from "react";
import { projectDetailAction } from ".././Store/projectDetailSlice";
import { useDispatch } from "react-redux";

import { AiOutlineEdit } from "react-icons/ai";
import { CiMenuKebab, CiTrash } from "react-icons/ci";
import ModalConfirmRemove from "./ModalConfirmRemove";
import Service from "../Service";

import { toast } from "react-toastify";
import { projectAction } from "../Store/projectSlice";

import FormAddNewProject from "./FormAddNewProject";

function compareDatesWithoutTime(date1, date2) {
  const year1 = date1.getFullYear();
  const month1 = date1.getMonth();
  const day1 = date1.getDate();

  const year2 = date2.getFullYear();
  const month2 = date2.getMonth();
  const day2 = date2.getDate();

  if (year1 === year2 && month1 === month2 && day1 === day2) {
    return 0; // Both dates are the same
  } else if (
    year1 > year2 ||
    (year1 === year2 && month1 > month2) ||
    (year1 === year2 && month1 === month2 && day1 > day2)
  ) {
    return 1; // Date 1 is after Date 2
  } else if (
    year1 < year2 ||
    (year1 === year2 && month1 < month2) ||
    (year1 === year2 && month1 === month2 && day1 < day2)
  ) {
    return 2; // Date 1 is before Date 2
  } else {
    return -1; // Invalid input
  }
}

function CardProject({
  data,
  setActive,
  activeEdit = false,
  setEditProject,
  setProjectSelect = () => {},
  handleEditProject = () => {},
  projectSelect,
}) {
  const [showEdit, setShowEdit] = useState(false);
  const [date, setDate] = useState(new Date(data.date_end));
  const [color, setColor] = useState("design");
  const [late, setLate] = useState(false);
  const [numberDay, setNumberDay] = useState(0);
  const [modalConfirmRemoveProject, setModalConfirmRemoveProject] =
    useState(false);
  const [openModalEditProject, setOpenModalEditProject] = useState(false);

  const dispatch = useDispatch();

  useEffect(() => {
    const timeDiff = Math.abs(date - new Date());
    const daysDiff = Math.ceil(timeDiff / (1000 * 60 * 60 * 24));

    setNumberDay(daysDiff);
    const checkDate = compareDatesWithoutTime(date, new Date());
    console.log(checkDate);
    if (checkDate === 2) {
      setLate(true);
    } else {
      setLate(false);
    }
  }, [date]);

  const handleChooseProject = () => {
    dispatch(projectDetailAction.initProjectDetail(data));
    setActive(1);
  };
  const handleRemoveProject = async () => {
    const result = await Service.remove(
      "/project/remove-soft-project",
      `/?projectId=${projectSelect._id}`
    );

    if (result.status === true) {
      toast.success(result.message, {
        position: toast.POSITION.TOP_CENTER,
        autoClose: 2000,
      });

      dispatch(projectAction.removeProject({ projectId: projectSelect._id }));
      setProjectSelect(null);
      setModalConfirmRemoveProject(false);
      setEditProject(false);
    } else {
      toast.error("Xóa không thành công!", {
        position: toast.POSITION.TOP_CENTER,
        autoClose: 2000,
      });
    }
  };

  return (
    <div
      onMouseEnter={(e) => setShowEdit(true)}
      onMouseLeave={(e) => setShowEdit(false)}
      className={`relative w-full h-fit dark:bg-dark-second bg-light-second p-2 rounded-md ${
        activeEdit ? "z-50" : ""
      }`}
    >
      {openModalEditProject && (
        <div className="fixed z-50 top-0 right-0 left-0 bottom-0">
          <FormAddNewProject
            data={projectSelect}
            type="edit"
            action={(e) => setOpenModalEditProject(false)}
          ></FormAddNewProject>
        </div>
      )}
      <ModalConfirmRemove
        open={modalConfirmRemoveProject}
        setOpen={setModalConfirmRemoveProject}
        action={handleRemoveProject}
      ></ModalConfirmRemove>

      <h5 className="font-family text-md capitalize">{data.name}</h5>
      <h5 className="font-family text-xs mt-2 mb-2 text-blur-light dark:text-blur-dark">
        Ngày hết hạn :
        <span className={`ml-2 text-design`}>{date.toLocaleDateString()}</span>
      </h5>

      {!late && numberDay !== 1 && (
        <h5 className={`font-family text-xs mt-2 mb-2  text-ux`}>
          Còn {numberDay} ngày nữa hết hạn
        </h5>
      )}
      {numberDay === 1 && (
        <h5 className={`font-family text-xs mt-2 mb-2  text-design`}>
          Hôm nay
        </h5>
      )}
      {late && (
        <h5 className={`font-family text-xs mt-2 mb-2  text-red-600`}>
          Đã hết hạn
        </h5>
      )}

      <div className="w-full pl-2 mt-2">
        <AvatarGroup
          total={data.member.length}
          sx={{
            fontSize: ".725rem",
            width: "unset",
            float: "right",
            marginRight: ".5rem",
            "& div": {
              width: 30,
              height: 30,
            },
          }}
        >
          {data.member.slice(0, 2).map((mem, index) => {
            return (
              <Tooltip
                key={index}
                title={mem.displayName ? mem.displayName : mem.email}
              >
                <Avatar
                  alt={mem.displayName ? mem.displayName : mem.email}
                  src={mem?.photoURL}
                  sx={{}}
                />
              </Tooltip>
            );
          })}
        </AvatarGroup>
      </div>

      <button
        onClick={handleChooseProject}
        className="reset right text-xs hover:bg-light-third dark:bg-dark-third p-2 rounded-md hover:brightness-125"
      >
        Chi tiết
      </button>
      {showEdit && (
        <CiMenuKebab
          className="absolute right-2 top-2 text-xl hover:text-red-500 cursor-pointer"
          onClick={(e) => {
            handleEditProject();
            if (!projectSelect) {
              setProjectSelect(data);
            } else {
              setProjectSelect(null);
            }
          }}
        />
      )}

      {activeEdit && (
        <div
          className="absolute w-fit top-0 "
          style={{
            left: "102%",
          }}
        >
          <div
            onClick={(e) => {
              e.stopPropagation();
              setModalConfirmRemoveProject(true);
            }}
            className="hover:text-red-400 cursor-pointer w-full  from-left-animation mb-1 border-dashed  rounded-md border-1 p-1 pl-6 pr-6 dark:border-blur-dark border-blur-light dark:bg-dark-third bg-light-third"
          >
            <CiTrash className="text-xl" />
          </div>
          <div
            onClick={(e) => {
              setOpenModalEditProject(true);
            }}
            className="w-full  hover:text-primary cursor-pointer from-left-animation animation-delay-150 dark:bg-dark-third  rounded-md bg-light-third p-1 pl-6 pr-6"
          >
            <AiOutlineEdit className="text-xl" />
          </div>
        </div>
      )}
    </div>
  );
}

export default CardProject;
