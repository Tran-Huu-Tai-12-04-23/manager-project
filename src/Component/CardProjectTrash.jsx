import { AvatarGroup, Avatar, Tooltip } from "@mui/material";
import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";

import ModalConfirmRemove from "./ModalConfirmRemove";
import Service from "../Service";

import { toast } from "react-toastify";
import { projectAction } from "../Store/projectSlice";

import {LuArchiveRestore } from 'react-icons/lu'
import {BsTrash } from 'react-icons/bs'
import { projectTrashAction } from "../Store/projectTrashSlice";
import { numberTrashAction } from "../Store/numberTrashSlice";


function CardProjectTrash({data}) {
  const dispatch = useDispatch();
  const [openModalConfirmRemove, setOpenModalConfirmRemove] = useState(false);

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

  const restoreProject = async () => {
    const result = await Service.update(
      "/project/restore-project",
      {
        projectId: data._id
      }
    );
    if (result.data.status === true) {
      toast.success("Khôi phục dự án thành công!", {
        position: toast.POSITION.TOP_CENTER,
        autoClose: 2000,
      });
      dispatch(projectAction.addNewProject({newProject : data}));
      dispatch(projectTrashAction.restore({projectId : data._id}));
      dispatch(numberTrashAction.decrease({number : 1}));
    } else {
      toast.error("Khôi phục dự án thất bại!", {
        position: toast.POSITION.TOP_CENTER,
        autoClose: 2000,
      });
    }
  }

  return (
    <div
      className={`relative w-full min-h-[100px] flex flex-col justify-between h-fit transition-all cursor-pointer dark:bg-dark-second bg-light-second p-2 rounded-md      }`}
    >
      <ModalConfirmRemove
        open={openModalConfirmRemove}
        setOpen={setOpenModalConfirmRemove}
        action={handleRemoveProject}
      ></ModalConfirmRemove>
      <div className="w-full flex h-[30px] justify-between items-center">
        <h5 className="font-family text-md capitalize">{data.name}</h5>
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
     <div className="flex justify-start items-center mt-5" > 
            <Tooltip title='khôi phục'>
              <button
              onClick={restoreProject}
              className="text-xs mr-2 rounded-md text-primary bg-design p-2 hover:brightness-125">
                <LuArchiveRestore></LuArchiveRestore>
              </button>   
            </Tooltip>
            <Tooltip title='Xóa'>
              <button onClick={e => setOpenModalConfirmRemove(true)} className="text-xs mr-2 text-red-500 rounded-md bg-ux p-2 hover:brightness-125">
                <BsTrash></BsTrash>
              </button>  
            </Tooltip>
      </div>
    </div>
  );
}

export default CardProjectTrash;
