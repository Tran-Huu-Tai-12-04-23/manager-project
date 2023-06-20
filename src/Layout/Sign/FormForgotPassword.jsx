import Input from "../../Component/Input";
import { MdOutlineClose } from "react-icons/md";
import { JackInTheBox } from "react-awesome-reveal";
import { useState } from "react";
import { toast } from "react-toastify";

import { Button, CircularProgress } from "@mui/material";
import Service from "../../Service";
import Util from "../../Util";

function FormForgotPassword({ action = (e) => {} }) {
  const [code, setCode] = useState("");
  const [codeSent, setCodeSent] = useState("");
  const [openProcess, setOpenProcess] = useState(false);
  const [openProcessConfirm, setOpenProcessConfirm] = useState(false);
  const [email, setEmail] = useState("");
  const [isSendEmail, setIsSendEmail] = useState(false);
  const [isChangePassword, setIsChangePassword] = useState(false);
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [openProcessChangePass, setOpenProcessChangePass] = useState(false);

  const sendEmail = async (email) => {
    let result = await Service.callApi("/user/send-email", {
      email: email,
    });
    return result;
  };

  const handleSendCode = async () => {
    setOpenProcess(true);
    if (!email) {
      toast.warning("Vui lòng nhập email khôi phục của bạn", {
        position: toast.POSITION.TOP_CENTER,
        autoClose: 2000,
      });
      setOpenProcess(false);
      return;
    }

    if (!Util.isEmail(email)) {
      toast.warning("Email không hợp lệ, vui lòng nhập lại!", {
        position: toast.POSITION.TOP_CENTER,
        autoClose: 2000,
      });
      setOpenProcess(false);
      return;
    }

    const result = await sendEmail(email);
    if (result.status === true) {
      setOpenProcess(false);
      toast.success("Email xác thực đã gửi lại, vui lòng kiểm tra!", {
        position: toast.POSITION.TOP_CENTER,
        autoClose: 2000,
      });
    } else {
      setOpenProcess(false);
      toast.error("Không gửi được email lại!", {
        position: toast.POSITION.TOP_CENTER,
        autoClose: 2000,
      });
    }
  };
  const verifyEmail = async () => {
    if (!code) {
      toast.warning("Vui lòng nhập mã code!", {
        position: toast.POSITION.TOP_CENTER,
        autoClose: 2000,
      });
      return;
    }
    const result = await Service.callApi("/user/verify-code", { email, code });
    if (result.status === false) {
      toast.error("Mã code bạn nhập không đúng, vui lòng nhập lại!", {
        position: toast.POSITION.TOP_CENTER,
        autoClose: 2000,
      });
      return;
    }
    toast.success("Xác thực email successfully!", {
      position: toast.POSITION.TOP_CENTER,
      autoClose: 2000,
    });
    setIsChangePassword(true);
  };

  const handleChangePassword = async () => {
    if (!password) {
      toast.warning("Vui lòng nhập mật khẩu mới của bạn!", {
        position: toast.POSITION.TOP_CENTER,
        autoClose: 2000,
      });
      return;
    }
    if (!confirmPassword) {
      toast.warning("Vui lòng xác nhận lại mật khẩu của bạn!", {
        position: toast.POSITION.TOP_CENTER,
        autoClose: 2000,
      });
      return;
    }

    if (confirmPassword !== password) {
      toast.warning("Xác nhận mật khẩu không khớp!", {
        position: toast.POSITION.TOP_CENTER,
        autoClose: 2000,
      });
      return;
    }
    setOpenProcessChangePass(true);
    const result = await Service.update("/user/change-password", {
      password: password,
      confirm_password: confirmPassword,
      email: email,
    });

    if (result.data.status === true) {
      toast.success("Thay đổi mật khẩu thành công!", {
        position: toast.POSITION.TOP_CENTER,
        autoClose: 2000,
      });
    } else {
      toast.error(result.message, {
        position: toast.POSITION.TOP_CENTER,
        autoClose: 2000,
      });
    }
    setOpenProcessChangePass(false);
    setIsChangePassword(false);
    action();
  };
  return (
    <JackInTheBox duration={500}>
      <div
        style={{
          backdropFilter: "blur(20px)",
        }}
        className="relative p-4 pb-6 text-black dark:text-white bg-light-second dark:bg-dark-second rounded-md min-w-40rem w-1/2"
      >
        <div
          onClick={action}
          className="p-2 rounded-full hover:bg-blur-light hover:dark:bg-blur-dark cursor-pointer w-fit absolute right-2 top-2"
        >
          <MdOutlineClose></MdOutlineClose>
        </div>
        {!isChangePassword && (
          <>
            <h5 className="font-family font-bold text-md mb-2 ">
              Xác nhận email của bạn
            </h5>
            <div className="w-full flex justify-start items-center mb-4">
              <Input
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder={"ex: exmaple@gmail.com"}
                className={"h-8 rounded-md"}
              ></Input>
              {!openProcess && (
                <button
                  onClick={handleSendCode}
                  className="reset p-2 text-xs rounded-md w-24 ml-2 hover:brightness-125 bg-light-third dark:bg-dark-third"
                >
                  Gửi {isSendEmail && "lại"}
                </button>
              )}

              {openProcess && (
                <button className="reset p-2 text-xs rounded-md w-24 ml-2 hover:brightness-125 bg-light-third dark:bg-dark-third">
                  <CircularProgress
                    sx={{
                      height: "16px!important",
                      width: "16px!important",
                    }}
                  />
                </button>
              )}
            </div>
            <div className="flex justify-center items-start ">
              <Input
                width={"fit"}
                value={code}
                onChange={(e) => setCode(e.target.value)}
                placeholder={"ex: hkr35"}
                className={"h-8 w-32 rounded-md"}
              ></Input>

              {!openProcessConfirm && (
                <Button
                  sx={{
                    fontSize: ".75rem",
                  }}
                  onClick={verifyEmail}
                >
                  Xác nhận
                </Button>
              )}
              {openProcessConfirm && (
                <Button
                  sx={{
                    fontSize: ".75rem",
                  }}
                >
                  <CircularProgress
                    sx={{
                      height: "16px!important",
                      width: "16px!important",
                    }}
                  />
                </Button>
              )}
            </div>
          </>
        )}
        {isChangePassword && (
          <>
            <h5 className="font-family font-bold text-md mb-2 ">
              Thay đổi mật khẩu của bạn
            </h5>
            <h5 className="font-family font-bold text-xs mb-2 mt-3 ">
              Mật khẩu
            </h5>
            <Input
              value={confirmPassword}
              type="password"
              onChange={(e) => setConfirmPassword(e.target.value)}
              placeholder={"########"}
              className={"h-8 rounded-md"}
            ></Input>
            <h5 className="font-family font-bold text-xs mb-2 mt-3 ">
              Nhập lại mật khẩu
            </h5>
            <Input
              value={password}
              type="password"
              onChange={(e) => setPassword(e.target.value)}
              placeholder={"########"}
              className={"h-8 rounded-md"}
            ></Input>
            <div className="w-full flex mt-5  justify-center items-center ">
              {!openProcessChangePass && (
                <button
                  onClick={handleChangePassword}
                  className="reset p-2 text-xs rounded-md w-24 hover:brightness-125 bg-light-third dark:bg-dark-third"
                >
                  Lưu
                </button>
              )}

              {openProcessChangePass && (
                <button className="reset p-2 text-xs rounded-md w-24 ml-2 hover:brightness-125 bg-light-third dark:bg-dark-third">
                  <CircularProgress
                    sx={{
                      height: "16px!important",
                      width: "16px!important",
                    }}
                  />
                </button>
              )}
            </div>
          </>
        )}
      </div>
    </JackInTheBox>
  );
}

export default FormForgotPassword;
