import { Avatar, Button } from "@mui/material";
import ModalCustom from "../../../Component/Modal";
import { useState } from "react";
import FormCreateProfile from "../../../Component/FormCreateProfile";
import FormChangePassword from "../../../Component/FormChangePassword";
import { JackInTheBox } from "react-awesome-reveal";

function Setting() {
  const [openModal, setOpenModal] = useState(false);
  const [openModalChangePassword, setOpenModalChangePass] = useState(false);
  return (
    <div className="w-full relative">
      <div
        className="w-full h-80"
        style={{
          background:
            "linear-gradient(90deg, rgba(40,28,237,.4) 0%, rgba(239,0,255,.5) 78%)",
        }}
      ></div>
      <div className="absolute top-64 left-1/2 -translate-x-1/2">
        <Avatar alt="huutai" src="" sx={{ width: 100, height: 100 }}></Avatar>
      </div>
      <div className="mt-20 w-full justify-center items-center flex">
        <Button onClick={(e) => setOpenModal(true)} sx={{ fontSize: ".75rem" }}>
          Tạo hồ sơ
        </Button>
      </div>
      {/* <div className="xl:w-20rem lg:w-20rem md:w-20rem  w-full p-2 ml-auto rounded-xl mr-auto bg-light-second dark:bg-dark-second mt-20">
        <h5 className="font-bold text-md">Giới thiệu về bạn</h5>
        <div className="flex flex-col mt-5 items-center ">
          <div className=" justify-start flex flex-col items-center">
            <h5 className="text-md">Họ tên của bạn</h5>
            <h5 className="text-md mt-2 text-slate-400 font-bold">
              Trần Hữu Tài
            </h5>
          </div>
          <div className=" justify-start flex flex-col items-center mt-5 border-t-1 border-solid border-blur-light dark:border-blur-dark">
            <h5 className="text-md">Email của bạn</h5>
            <h5 className="text-md mt-2 text-slate-400 font-bold">
              hutt@gmail.com
            </h5>
          </div>
          <div className=" justify-start flex flex-col items-center mt-5 border-t-1 border-solid border-blur-light dark:border-blur-dark">
            <h5 className="text-md">Bạn đang là</h5>
            <h5 className="text-md mt-2 text-slate-400 font-bold">
              Website Developer
            </h5>
          </div>
          <div className=" justify-start flex flex-col items-center mt-5 border-t-1 border-solid border-blur-light dark:border-blur-dark">
            <h5 className="text-md">Mô tả của bạn</h5>
            <h5 className="text-md mt-2 text-slate-400 font-bold">....</h5>
          </div>
        </div>
      </div> */}
      <div className="mt-20 w-full justify-center items-center flex">
        <Button
          onClick={(e) => setOpenModalChangePass(true)}
          sx={{ fontSize: ".75rem" }}
        >
          Chỉnh sửa mật khẩu của bạn
        </Button>
      </div>
      <ModalCustom
        open={openModalChangePassword}
        setOpen={setOpenModalChangePass}
      >
        <JackInTheBox duration={500}>
          <FormChangePassword
            action={(e) => setOpenModalChangePass(false)}
          ></FormChangePassword>
        </JackInTheBox>
      </ModalCustom>
      <ModalCustom open={openModal} setOpen={setOpenModal}>
        <JackInTheBox duration={500}>
          <FormCreateProfile
            action={(e) => setOpenModal(false)}
          ></FormCreateProfile>
        </JackInTheBox>
      </ModalCustom>
    </div>
  );
}

export default Setting;
