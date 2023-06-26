import { useEffect, useState } from "react";
import Input from "../../Component/Input";
import { toast } from "react-toastify";

import { Button, CircularProgress } from "@mui/material";
import Service from "../../Service";
function ModalConfirmEmail({
  codeSent,
  sendEmail,
  setCodeSent,
  setOpenModalConfirmEmail,
  email,
  register,
}) {
  const [code, setCode] = useState("");
  const [openProcess, setOpenProcess] = useState(false);
  const [openProcessConfirm, setOpenProcessConfirm] = useState(false);

  const handleResendCode = async () => {
    setOpenProcess(true);
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
    const result = await Service.callApi("/user/verify-code", {
      email,
      code,
    });

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
    setOpenProcessConfirm(true);
    const res = await register();
    setOpenModalConfirmEmail(false);
    setOpenProcessConfirm(false);
  };
  return (
    <>
      <div className="p-4 rounded-xl text-black dark:text-white bg-light-second dark:bg-dark-second min-w-20rem">
        <h5 className="font-family font-bold text-md mb-2 ">
          Xác nhận email của bạn
        </h5>
        <div className="w-full flex justify-start items-center">
          <Input
            value={code}
            onChange={(e) => setCode(e.target.value)}
            placeholder={"ex: hkr35"}
            className={"h-8 rounded-md"}
          ></Input>
          {!openProcess && (
            <button
              onClick={handleResendCode}
              className="reset p-2 text-xs rounded-md w-24 ml-2 hover:brightness-125 bg-light-third dark:bg-dark-third"
            >
              Gửi lại
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
        {!openProcessConfirm && (
          <Button
            sx={{
              fontSize: ".75rem",
              marginTop: "10px",
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
              marginTop: "10px",
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
  );
}

export default ModalConfirmEmail;
