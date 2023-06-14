import { useState } from "react";

import MenuSideBar from "./MenuSideBar";
import ManagerProject from "./ManagerProject";
import Calender from "../../Component/Calender";
import Statistic from "./Statistic";
import Overview from "./Overview";
import Setting from "./Setting";

const Home = ({ setOpenModalAddNewProject }) => {
  const [active, setActive] = useState(0);

  return (
    <div className="dark:text-white text-black font-primary min-h-screen w-screen overflow-hidden  flex justify-start">
      <MenuSideBar active={active} setActive={setActive}></MenuSideBar>
      {active === 0 && (
        <Overview
          setOpenModalAddNewProject={setOpenModalAddNewProject}
        ></Overview>
      )}
      {active === 1 && (
        <ManagerProject
          setOpenModalAddNewProject={setOpenModalAddNewProject}
        ></ManagerProject>
      )}
      {active === 2 && (
        <div className="">
          <h1 className="pt-4 pl-0  ml-4 text-md border-b-4 border-solid border-primary w-fit mb-4 font-bold font-family">
            Lịch hoạt động
          </h1>
          <Calender />
        </div>
      )}

      {active === 3 && <Statistic></Statistic>}
      {active === 4 && <Setting></Setting>}
    </div>
  );
};
export default Home;
