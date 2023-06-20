import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

import { Button, CircularProgress } from "@mui/material";
import CheckIcon from "@mui/icons-material/Check";
import LightModeIcon from "@mui/icons-material/LightMode";
import DarkModeIcon from "@mui/icons-material/DarkMode";

import logo from "../../assets/logo.png";
import logo_google from "../../assets/logo_google.png";
import logo_github from "../../assets/logo_github.png";

import { Slide } from "react-awesome-reveal";
import Input from "../../Component/Input";

import Service from "../../Service";
import { toast } from "react-toastify";
import Util from "../../Util";
import {
  GoogleAuthProvider,
  signInWithPopup,
  GithubAuthProvider,
} from "firebase/auth";
import { auth } from "../../firebase";
import ModalCustom from "../../Component/Modal";
import { useSelector, useDispatch } from "react-redux";
import { loginAction } from "../../Store/dataLoginSlice";
import FormForgotPassword from "./FormForgotPassword";

function Login({ theme, handleThemeSwitch, setActiveLogin }) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [openProcessLogin, setOpenProcessLogin] = useState(false);
  const [waitForAuthentication, setWaitForAuthentication] = useState(false);
  const dispatch = useDispatch();
  const history = useNavigate();
  const [openModalForgotPass, setOpenModalForgotPass] = useState(false);

  const handleSaveLogin = (data) => {
    dispatch(loginAction.login(data));
    const encryptedData = Util.encryptObject(data, Util.secretKey);
    localStorage.setItem(Util.hashString("login"), encryptedData);
    history("/");
  };

  useEffect(() => {
    const data = localStorage.getItem(Util.hashString("login"));
    if (data) {
      const decryptObject = Util.decryptObject(data, Util.secretKey);
      dispatch(loginAction.login(decryptObject));
      if (decryptObject.isLogin) {
        history("/");
      }
    }
  }, []);

  const loginWithGoogle = async () => {
    try {
      await signInWithPopup(auth, new GoogleAuthProvider())
        .then(async (res) => {
          const user = res.user;
          setWaitForAuthentication(true);
          const { email, uid, photoURL, displayName } = user;
          if (user.metadata.creationTime === user.metadata.lastSignInTime) {
            await Service.callApi("/user/register", {
              email,
              uid,
              photoURL,
              displayName,
            });
          }

          const result = await Service.callApi("/user/get-id", {
            email: email,
            displayName: displayName,
          });

          if (result.status === true) {
            handleSaveLogin({
              email: email,
              id: result._id,
              photoURL,
              displayName,
              isLogin: true,
            });
            toast.success("Đăng nhập thành công!", {
              position: toast.POSITION.TOP_CENTER,
              autoClose: 2000,
            });
          }
          setWaitForAuthentication(false);
        })
        .catch((err) => {
          alert(err);
        });
    } catch (err) {
      console.error(err);
      alert(err.message);
    }
  };
  const loginWithGitHub = async () => {
    try {
      const res = await signInWithPopup(auth, new GithubAuthProvider());
      if (!res) {
        throw new Error("Could not complete signup");
      }
      setWaitForAuthentication(true);
      const user = res.user;
      const dataUser = user.providerData[0];
      const { uid, photoURL, displayName } = user;
      const email = dataUser.email;
      if (user.metadata.creationTime === user.metadata.lastSignInTime) {
        await Service.callApi("/user/register", {
          email: dataUser.uid + "-github",
          uid,
          photoURL,
          displayName,
        });
      }

      const result = await Service.callApi("/user/get-id", {
        email: dataUser.uid + "-github",
        displayName: displayName,
      });

      if (result.status === true) {
        handleSaveLogin({
          email: dataUser.uid + "-github",
          id: result._id,
          photoURL,
          displayName,
          isLogin: true,
        });
        toast.success("Đăng nhập thành công!", {
          position: toast.POSITION.TOP_CENTER,
          autoClose: 2000,
        });
      }
      setWaitForAuthentication(false);
    } catch (error) {
      console.log(error);
    }
  };
  const handleLogin = async () => {
    setOpenProcessLogin(true);
    if (!email) {
      toast.warning("Vui lòng nhập email của bạn!", {
        position: toast.POSITION.TOP_CENTER,
        autoClose: 2000,
      });
      setOpenProcessLogin(false);
      return;
    }
    if (!password) {
      toast.warning("Vui lòng nhập mật khẩu của bạn!", {
        position: toast.POSITION.TOP_CENTER,
        autoClose: 2000,
      });
      setOpenProcessLogin(false);
      return;
    }
    if (!Util.isEmail(email)) {
      toast.warning("Email của bạn không hợp lệ!", {
        position: toast.POSITION.TOP_CENTER,
        autoClose: 2000,
      });
      setOpenProcessLogin(false);
      return;
    }

    let result = await Service.callApi("/user/login", {
      email: email,
      password: password,
    });

    if (result.status === true) {
      setOpenProcessLogin(false);
      handleSaveLogin({
        ...JSON.parse(result.user),
        isLogin: true,
      });
      toast.success(result.message, {
        position: toast.POSITION.TOP_CENTER,
        autoClose: 2000,
      });
    } else {
      setOpenProcessLogin(false);
      toast.error(result.message, {
        position: toast.POSITION.TOP_CENTER,
        autoClose: 2000,
      });
    }
  };
  return (
    <div className="p-10 flex min-h-screen justify-center items-center">
      {waitForAuthentication && (
        <ModalCustom open={true}>
          <CircularProgress></CircularProgress>
        </ModalCustom>
      )}
      {openModalForgotPass && (
        <ModalCustom
          open={openModalForgotPass}
          setOpen={setOpenModalForgotPass}
        >
          <FormForgotPassword
            action={(e) => setOpenModalForgotPass(false)}
          ></FormForgotPassword>
        </ModalCustom>
      )}
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
                onClick={loginWithGoogle}
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
                onClick={loginWithGitHub}
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
                <Input
                  className={"rounded-lg"}
                  placeholder="example@gmail.com"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                />
              </div>
              <div className="grid-cols-1 grid gap-2 font-primary">
                <h5 className="text-md">Mật khẩu</h5>
                <Input
                  type="password"
                  placeholder="########"
                  className={"rounded-lg"}
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                />

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
                  <h5
                    className="cursor-pointer text-sm text-primary "
                    onClick={(e) => setOpenModalForgotPass(true)}
                  >
                    Quên mật khẩu ?
                  </h5>
                </div>
              </div>

              {!openProcessLogin && (
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
                  onClick={handleLogin}
                >
                  Đăng nhập ngay
                </Button>
              )}

              {openProcessLogin && (
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
