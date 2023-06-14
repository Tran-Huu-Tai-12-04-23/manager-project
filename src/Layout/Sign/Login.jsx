import { Button, Checkbox, TextField } from "@mui/material";
import CheckIcon from "@mui/icons-material/Check";
import LightModeIcon from "@mui/icons-material/LightMode";
import DarkModeIcon from "@mui/icons-material/DarkMode";

import logo from "../../assets/logo.png";
import logo_google from "../../assets/logo_google.png";
import logo_github from "../../assets/logo_github.png";

import { Slide } from "react-awesome-reveal";

import Input from "../../Component/Input";

function Login({ theme, handleThemeSwitch, setActiveLogin }) {
  return (
    <div className="p-10 flex min-h-screen justify-center items-center">
      <Slide direction={"left"} duration={800}>
        <div className="max-w-40 mr-10">
          <div className="flex justify-start items-center  mb-10 ">
            <img src={logo} className="w-18 h-16"></img>
            <h1 className="text-xl font-extrabold">
              Quản lý dự án và công việc nhanh hơn
            </h1>
          </div>
          <div className="flex justify-start mb-10 ml-10">
            <div className="p-1 h-fit bg-primary rounded-full justify-center flex">
              <CheckIcon className="text-white" />
            </div>
            <div className="flex flex-col">
              <h1 className="font-primary ml-2 text-xl">Get started quickly</h1>
              <span className="font-primary text-gray-400 ml-2 text-md">
                Integrate with developer-friendly APIs or choose low-code.
              </span>
            </div>
          </div>
          <div className="flex justify-start mb-10 ml-10">
            <div className="p-1 h-fit bg-primary rounded-full justify-center flex">
              <CheckIcon className="text-white" />
            </div>
            <div className="flex flex-col">
              <h1 className="font-primary ml-2 text-xl">Get started quickly</h1>
              <span className="font-primary text-gray-400 ml-2 text-md">
                Integrate with developer-friendly APIs or choose low-code.
              </span>
            </div>
          </div>
          <div className="flex justify-start ml-10">
            <div className="p-1 h-fit bg-primary rounded-full justify-center flex">
              <CheckIcon className="text-white" />
            </div>
            <div className="flex flex-col">
              <h1 className="font-primary ml-2 text-xl">Get started quickly</h1>
              <span className="font-primary text-gray-400 ml-2 text-md">
                Integrate with developer-friendly APIs or choose low-code.
              </span>
            </div>
          </div>
        </div>
      </Slide>
      <Slide direction={"right"} duration={800}>
        <div className="max-w-40 ">
          <div className="max-w-40 rounded-xl p-10 bg-light-second dark:bg-dark-second ">
            <div className="justify-start items-center flex">
              <h1 className="font-family font-bold text-3xl mr-2 mb-2">
                Đăng nhập
              </h1>

              {theme === "light" && (
                <LightModeIcon onClick={handleThemeSwitch}></LightModeIcon>
              )}
              {theme === "dark" && (
                <DarkModeIcon onClick={handleThemeSwitch}></DarkModeIcon>
              )}
            </div>

            <div className="w-full flex justify-between items-center mt-6">
              <Button
                sx={{
                  borderRadius: "1rem",
                  marginRight: ".5rem",
                  color: "inherit",
                  border: "1px solid rgba(0, 121, 255, .1)",
                  textTransform: "capitalize",
                }}
                startIcon={
                  <img className="h-8 scale-75" src={logo_google}></img>
                }
              >
                Đăng nhập với google
              </Button>
              <Button
                sx={{
                  color: "inherit",
                  borderRadius: "1rem",
                  marginLeft: ".5rem",
                  border: "1px solid rgba(0, 121, 255, .1)",
                  textTransform: "capitalize",
                }}
                startIcon={<img className="h-8" src={logo_github}></img>}
              >
                Đăng nhập với github
              </Button>
            </div>

            <div className="w-full flex items-center justify-center mt-6 gap-10">
              <div
                className="w-6/12  bg-gray-600"
                style={{ height: "1px" }}
              ></div>
              <h5 className="text-center font-family">Hoặc</h5>
              <div
                className="w-6/12  bg-gray-600"
                style={{ height: "1px" }}
              ></div>
            </div>

            <div className="w-full font-family mt-6 grid grid-cols-1 gap-6">
              <div className="grid-cols-1 grid gap-2 font-primary">
                <h5 className="text-md">Email</h5>
                <Input placeholder="example@gmail.com" />
              </div>
              <div className="grid-cols-1 grid gap-2 font-primary">
                <h5 className="text-md">Mật khẩu</h5>
                <Input type="password" placeholder="########" />

                <div className="flex justify-between items-center mt-5">
                  <div className="justify-start items-center flex">
                    <input
                      type="checkbox"
                      className="h-4 mr-1"
                      id="remember"
                    ></input>
                    <label htmlFor="remember" className="text-sm">
                      Nhớ mật khẩu
                    </label>
                  </div>
                  <h5 className="text-sm text-primary ">Quên mật khẩu ?</h5>
                </div>
              </div>

              <Button
                sx={{
                  background: "rgba(54, 94, 255, 1)",
                  color: "#fff",
                  borderRadius: "1rem",
                  padding: ".5rem 2rem",
                  "&:hover": {
                    background: "rgba(54, 94, 255,1)",
                    filter: "brightness(120%)",
                  },
                }}
              >
                Đăng nhập ngay
              </Button>

              <h5 className="text-sm font-family ">
                Bạn vẫn chưa có tài khoản?{" "}
                <span
                  className=" text-primary ml-2 cursor-pointer"
                  onClick={(e) => setActiveLogin(false)}
                >
                  Đăng ký
                </span>
              </h5>
            </div>
          </div>
        </div>
      </Slide>
    </div>
  );
}

export default Login;
