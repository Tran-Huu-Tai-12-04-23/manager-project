import { useEffect, useState } from "react";
import { Avatar, AvatarGroup, Button } from "@mui/material";
import AddIcon from "@mui/icons-material/Add";
import { useSelector } from "react-redux";

import SubNavigate from "./SubNavigate";

import { JackInTheBox } from "react-awesome-reveal";
import ModalCustom from "../../../Component/Modal";
import FormAddNewTask from "../../../Component/FormAddNewMember";

function Navigate({ setActiveTab, activeTab }) {
  const tasks = useSelector((state) => state.reducer.tasks);
  const [numberTask, setNumberTask] = useState(1);
  const [openModalAddNewMember, setOpenModalAddNewMember] = useState(false);
  const projectDetail = useSelector((state) => state.reducer.projectDetail);
  const tabs = [
    {
      name: "Công việc",
    },
    {
      name: "Ghi chú",
    },
  ];
  useEffect(() => {
    if (Array.isArray(tasks)) {
      let countTask = 0;
      tasks.forEach((dt) => {});
      setNumberTask(countTask);
    }
  }, [tasks]);

  return (
    <div className="w-full pr-4 grid grid-cols-1 gap-0 pt-4  border-b-1 border-blur-light dark:border-blur-dark border-solid">
      <div className="flex p-4 justify-between items-center">
        <div className="justify-start items-center flex  w-1/2">
          <Avatar
            src={""}
            alt="Huu Tai"
            sx={{ borderRadius: ".4rem", width: 30, height: 30 }}
          ></Avatar>
          <div className="flex flex-col ml-2 w-full">
            <h5 className="text-sm font-family font-bold capitalize">
              {projectDetail.title}
            </h5>
          </div>
        </div>
        <div className="justify-end flex items-center ">
          <AvatarGroup
            total={24}
            sx={{
              width: "30px",
              height: "30px",
              fontSize: ".725rem",
              scale: "70%",
              transform: "translateY(-10px)",
            }}
          >
            <Avatar alt="Remy Sharp" src="" />
            <Avatar alt="Travis Howard" src="" />
            <Avatar alt="Agnes Walker" src="" />
          </AvatarGroup>
          <Button
            onClick={(e) => setOpenModalAddNewMember(true)}
            startIcon={<AddIcon></AddIcon>}
            sx={{
              backgroundColor: "rgba(0, 121, 255, .1)",
              color: "inherit",
              marginLeft: "1rem",
              fontSize: ".725rem",
              border: "1px dashed rgba(255, 255, 255, .1)",
              color: "rgba(0, 121, 255, 1)",
              "&:hover": {
                backgroundColor: "rgba(0, 121, 255, .1)",
              },
            }}
          >
            Thêm thành viên
          </Button>
        </div>
      </div>
      <div className="justify-between flex items-center">
        <SubNavigate
          activeTab={activeTab}
          setActiveTab={setActiveTab}
          tabs={tabs}
        ></SubNavigate>
      </div>
      <ModalCustom
        open={openModalAddNewMember}
        setOpen={setOpenModalAddNewMember}
      >
        <JackInTheBox duration={500}>
          <FormAddNewTask
            action={(e) => setOpenModalAddNewMember(false)}
          ></FormAddNewTask>
        </JackInTheBox>
      </ModalCustom>
    </div>
  );
}

export default Navigate;
