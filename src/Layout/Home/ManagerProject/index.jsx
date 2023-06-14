import { useState } from "react";

import LanguageIcon from "@mui/icons-material/Language";
import InfoSmallProject from "./InfoSmallProject";
import AddIcon from "@mui/icons-material/Add";

import Header from "../Header";
import { Button } from "@mui/material";
import Navigate from "../Navigate";
import MainManagerProject from "../MainManagerProject";
import { IoIosArrowBack } from "react-icons/io";

function ManagerProject({ setOpenModalAddNewProject }) {
  const [showSideBar, setShowSideBar] = useState(true);
  const [projects, setProjects] = useState([
    {
      name: "project",
      icon: (
        <LanguageIcon
          style={{
            width: "20",
            height: "20",
          }}
        ></LanguageIcon>
      ),
    },
    {
      name: "project",
      icon: (
        <LanguageIcon
          style={{
            width: "20",
            height: "20",
          }}
        ></LanguageIcon>
      ),
    },
  ]);

  return (
    <div
      className="font-family flex justify-start  "
      style={{
        width: "calc(100% - 3.5rem)",
      }}
    >
      <div
        onClick={(e) => setShowSideBar(!showSideBar)}
        style={{
          zIndex: "1000000",
        }}
        className={`${
          showSideBar ? "left-48 " : " left-10  rotate-180 "
        } transition-all fixed backdrop-blur-xl p-2  rounded-md  z-30 justify-center top-3  w-fit hover:dark:bg-dark-second hover:bg-light-second cursor-pointer items-center flex dark:bg-blur-dark bg-blur-light`}
      >
        <IoIosArrowBack className="text-md text-gray-500"></IoIosArrowBack>
      </div>
      <div
        style={{
          transform: showSideBar ? "" : "translateX(-15rem)",
          opacity: showSideBar ? "1" : 0,
          width: "12rem",
        }}
        className=" transition-all z-10 w-15rem fixed left-14 top-0 h-screen p-2 border-r-1 border-blur-light dark:border-blur-dark border-solid "
      >
        <h1 className="font-family font-bold text-sm border-b-4 border-solid border-blur-light dark:border-blur-dark rounded-sm">
          Dự án của bạn
        </h1>
        <div className="col-span-10 mt-10">
          {projects.map((pr, index) => {
            return <InfoSmallProject key={index} data={pr}></InfoSmallProject>;
          })}
        </div>
        <h1 className="font-family text-xs font-bold text-center hover:text-primary cursor-pointer">
          Xem thêm
        </h1>

        <h1 className="mt-4 font-family font-bold text-sm border-b-4 border-solid border-blur-light dark:border-blur-dark rounded-sm">
          Thời gian
        </h1>

        <div className="p-2 rounded-md border-1 border-blur-light dark:border-blur-dark border-solid mt-5">
          <h1 className="text-xs text-blur-light dark:text-blur-dark font-family">
            Tổng thời gian làm việc
          </h1>
          <h1 className=" text-primary mt-2  text-md font-family">23.7 giờ</h1>
        </div>

        <div className="mt-10 ml-auto mr-auto w-fit">
          <Button
            startIcon={<AddIcon></AddIcon>}
            sx={{
              backgroundColor: "transparent",
              color: "inherit",
              fontSize: "0.725rem",
              border: "1px dashed rgba(255, 255, 255, .1)",
            }}
            onClick={(e) => setOpenModalAddNewProject(true)}
          >
            Thêm mới dự án
          </Button>
        </div>
      </div>

      {showSideBar && (
        <div
          className="p-2 relative flex-shrink-0 z-0"
          style={{
            width: "12rem",
          }}
        ></div>
      )}

      <div
        className="flex-shrink-0 "
        style={{
          width: showSideBar ? "calc(100% - 12rem)" : "100%",
        }}
      >
        <Header></Header>
        <Navigate />
        <MainManagerProject></MainManagerProject>
      </div>
    </div>
  );
}

export default ManagerProject;
