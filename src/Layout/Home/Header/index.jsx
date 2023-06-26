import { useState } from "react";

import CloseIcon from "@mui/icons-material/Close";
import SearchIcon from "@mui/icons-material/Search";
import SettingsIcon from "@mui/icons-material/Settings";
import NotificationsNoneIcon from "@mui/icons-material/NotificationsNone";
import LightModeIcon from "@mui/icons-material/LightMode";
import DarkModeIcon from "@mui/icons-material/DarkMode";

import { Fade } from "react-awesome-reveal";

import Input from "../../../Component/Input";
import { Avatar } from "@mui/material";

import { useDispatch, useSelector } from "react-redux";
import { themeAction } from "../../../Store/themeSlice";

function Header() {
  const dispatch = useDispatch();
  const theme = useSelector((state) => state.reducer.theme);
  const dataLogin = useSelector((state) => state.reducer.dataLogin);

  const handleThemeSwitch = () => {
    dispatch(themeAction.switchTheme(theme == "dark" ? "light" : "dark"));
  };

  const [search, setSearch] = useState("");

  return (
    <div
      style={{
        width: "calc(100% - 1rem)",
      }}
      className=" flex p-1 pl-4 pr-4 h-fit pt-2 pb-2 justify-between items-center border-b-1 border-solid border-blur-light dark:border-blur-dark"
    >
      <div className="relative w-fit  ">
        <Input
          placeholder="Nhập từ khóa"
          className="w-64 h-2 text-xs rounded-md pl-10"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        ></Input>
        {search && (
          <Fade>
            <CloseIcon
              onClick={(e) => setSearch("")}
              className="absolute right-2 text-xs scale-75 hover:text-red-500 cursor-pointer top-1/2 -translate-y-1/2"
            ></CloseIcon>
          </Fade>
        )}

        <SearchIcon className="z-0 absolute left-2  hover:text-primary cursor-pointer top-1/2 -translate-y-1/2"></SearchIcon>
      </div>
      <div className="justify-end items-center flex">
        {theme === "light" && (
          <LightModeIcon
            className="cursor-pointer mr-4"
            onClick={handleThemeSwitch}
          ></LightModeIcon>
        )}
        {theme === "dark" && (
          <DarkModeIcon
            className="cursor-pointer mr-4"
            onClick={handleThemeSwitch}
          ></DarkModeIcon>
        )}
        <SettingsIcon></SettingsIcon>
        <NotificationsNoneIcon className="ml-4 mr-4"></NotificationsNoneIcon>
        <h5 className="font-bold font-family  text-xs mr-2 text-primary">
          Xin chào , {dataLogin?.displayName}
        </h5>
        <Avatar
          src={dataLogin?.photoURL}
          sx={{ width: 30, height: 30 }}
          title="test"
        ></Avatar>
      </div>
    </div>
  );
}

export default Header;
