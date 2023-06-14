import { LuHistory } from "react-icons/lu";
import { BsPersonWorkspace } from "react-icons/bs";
import { MdOutlineAdd } from "react-icons/md";
import CardProject from "../../../Component/CardProject";
import { Tooltip } from "@mui/material";

function Overview({ setOpenModalAddNewProject }) {
  return (
    <div className="p-4 w-full">
      <div className="flex justify-start items-center">
        <LuHistory></LuHistory>
        <h5 className="font-family ml-2 font-bold text-md">
          Dự án đã xem gần đây
        </h5>
      </div>
      <div className="grid grid-cols-5 mt-5 gap-5">
        <CardProject
          data={{
            name: "test",
            priority: "high",
          }}
        ></CardProject>
        <CardProject
          data={{
            name: "test",
            priority: "high",
          }}
        ></CardProject>
        <CardProject
          data={{
            name: "test",
            priority: "high",
          }}
        ></CardProject>
      </div>
      <div className="flex justify-start mt-5 items-center">
        <BsPersonWorkspace></BsPersonWorkspace>
        <h5 className="font-family ml-2 font-bold text-md">
          Các dự án của bạn
        </h5>
      </div>
      <div className="grid grid-cols-5 mt-5 gap-5">
        <CardProject
          data={{
            name: "test",
            priority: "high",
          }}
        ></CardProject>
        <CardProject
          data={{
            name: "test",
            priority: "high",
          }}
        ></CardProject>
        <CardProject
          data={{
            name: "test",
            priority: "high",
          }}
        ></CardProject>
        <Tooltip title="Thêm dự án">
          <div
            onClick={(e) => setOpenModalAddNewProject(true)}
            className=" cursor-pointer hover:brightness-125 w-full justify-center items-center flex bg-light-second dark:bg-dark-second rounded-xl"
          >
            <MdOutlineAdd className="text-3xl"></MdOutlineAdd>
          </div>
        </Tooltip>
      </div>
    </div>
  );
}

export default Overview;
