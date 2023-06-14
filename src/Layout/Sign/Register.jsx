import { useState } from "react";
import { Button } from "@mui/material";
import LightModeIcon from "@mui/icons-material/LightMode";
import DarkModeIcon from "@mui/icons-material/DarkMode";
import logo from "../../assets/logo.png";
import pic2 from "../../assets/pic2.png";
import { Slide, JackInTheBox } from "react-awesome-reveal";
import Input from "../../Component/Input";

import Util from "../../Util";
import { toast } from "react-toastify";
import Service from "../../Service";
import ModalCustom from "../../Component/Modal";
import ModalConfirmEmail from "./ModalConfoirmEmail";
import { CircularProgress } from "@mui/material";

function Register({ theme, handleThemeSwitch, setActiveLogin }) {
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [email, setEmail] = useState("");
  const [openModalConfirmEmail, setOpenModalConfirmEmail] = useState(false);
  const [codeSent, setCodeSent] = useState("");
  const [openProcess, setOpenProcess] = useState(false);

  const register = async () => {
    const rest_url = "/user/register";
    const user = {
      email,
      password,
      confirm_password: confirmPassword,
    };

    const result = await Service.callApi(rest_url, user);
    console.log(result);
    if (result.status === true) {
      toast.success("Đăng ký thành công!", {
        position: toast.POSITION.TOP_CENTER,
        autoClose: 2000,
      });
      setActiveLogin(true);
      return true;
    } else {
      toast.error("Đăng ký tài khoản thất bại, đăng ký lại!", {
        position: toast.POSITION.TOP_CENTER,
        autoClose: 2000,
      });
      return false;
    }
  };

  const sendEmail = async (email) => {
    let result = await Service.callApi("/user/send-email", {
      email: email,
    });
    return result;
  };
  const handleConfirmRegister = async () => {
    let checkErr = false;
    if (!email) {
      toast.warning("Vui lòng nhập email của bạn!", {
        position: toast.POSITION.TOP_CENTER,
        autoClose: 2000,
      });
      checkErr = true;
    }
    if (!password) {
      toast.warning("Vui lòng nhập mật khẩu của bạn!", {
        position: toast.POSITION.TOP_CENTER,
        autoClose: 2000,
      });
      checkErr = true;
    }
    if (!password) {
      toast.warning("Vui lòng xác nhận mật khẩu của bạn!", {
        position: toast.POSITION.TOP_CENTER,
        autoClose: 2000,
      });
      checkErr = true;
    }
    if (!Util.isEmail(email) && email) {
      toast.warning("Email của bạn không đúng định dạng!", {
        position: toast.POSITION.TOP_CENTER,
        autoClose: 2000,
      });
      checkErr = true;
    }

    if (password !== confirmPassword) {
      toast.warning("Mật khẩu xác nhận không trùng khớp bạn nhé!", {
        position: toast.POSITION.TOP_CENTER,
        autoClose: 2000,
      });
      checkErr = true;
    }

    if (checkErr === false) {
      setOpenProcess(true);
      let result = await sendEmail(email);
      if (result.status === true) {
        setOpenProcess(false);
        setCodeSent(result.code);
        setOpenModalConfirmEmail(true);
        toast.success("Vui lòng kiểm tra email để lấy mã code!", {
          position: toast.POSITION.TOP_CENTER,
          autoClose: 2000,
        });
      } else {
        setOpenProcess(false);
        toast.error("Không gửi được email!", {
          position: toast.POSITION.TOP_CENTER,
          autoClose: 2000,
        });
      }
    }
  };

  return (
    <div className="p-10 flex min-h-screen justify-center items-center">
      <ModalCustom
        open={openModalConfirmEmail}
        setOpen={setOpenModalConfirmEmail}
      >
        <JackInTheBox duration={500}>
          <ModalConfirmEmail
            register={register}
            codeSent={codeSent}
            setOpenModalConfirmEmail={setOpenModalConfirmEmail}
            setCodeSent={setCodeSent}
            sendEmail={sendEmail}
            email={email}
          ></ModalConfirmEmail>
        </JackInTheBox>
      </ModalCustom>
      <Slide duration={800} direction="left">
        <div className="max-w-40 w-30rem">
          <div className="max-w-40 rounded-xl p-10 bg-light-second dark:bg-dark-second ">
            <div className="justify-start items-center flex">
              <h1 className="font-family font-bold text-3xl mr-2 mb-2">
                Chào mừng bạn
              </h1>

              {theme === "light" && (
                <LightModeIcon onClick={handleThemeSwitch}></LightModeIcon>
              )}
              {theme === "dark" && (
                <DarkModeIcon onClick={handleThemeSwitch}></DarkModeIcon>
              )}
            </div>

            <div className="w-full font-family mt-6 grid grid-cols-1 gap-6">
              <div className="grid-cols-1 grid gap-2 font-primary">
                <h5 className="text-md">Email</h5>
                <Input
                  placeholder="example@gmail.com"
                  value={email}
                  type="email"
                  onChange={(e) => setEmail(e.target.value)}
                />
              </div>
              <div className="grid-cols-1 grid gap-2 font-primary">
                <h5 className="text-md">Mật khẩu</h5>
                <Input
                  type="password"
                  placeholder="########"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                />
              </div>
              <div className="grid-cols-1 grid gap-2 font-primary">
                <h5 className="text-md">Nhập lại mật khẩu</h5>
                <Input
                  type="password"
                  placeholder="########"
                  value={confirmPassword}
                  onChange={(e) => setConfirmPassword(e.target.value)}
                />
              </div>

              {!openProcess && (
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
                  onClick={handleConfirmRegister}
                >
                  Đăng ký ngay
                </Button>
              )}
              {openProcess && (
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
                  <CircularProgress
                    sx={{
                      color: "#ffff",
                      height: "24px!important",
                      width: "24px!important",
                    }}
                  />
                </Button>
              )}

              <h5 className="text-sm font-family ">
                Bạn đã có tài khoản?
                <span
                  className=" text-primary ml-2 cursor-pointer"
                  onClick={(e) => setActiveLogin(true)}
                >
                  Đăng nhập ngay
                </span>
              </h5>
            </div>
          </div>
        </div>
      </Slide>
      <Slide duration={800} direction="right">
        <div className="max-w-40 ml-10">
          <div className="flex justify-start items-center  mb-10 ">
            <img src={logo} className="w-18 h-16"></img>
            <h1 className="text-xl font-extrabold">
              Quản lý công việc tốt hơn với chúng tôi
            </h1>
          </div>
          <img src={pic2}></img>
        </div>
      </Slide>
    </div>
  );
}

export default Register;
