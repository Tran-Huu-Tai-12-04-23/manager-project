import { MdOutlineClose } from "react-icons/md";
import { Button } from "@mui/material";
import Input from "./Input";
import DropDown from "./DropDown";
import { useState } from "react";
import { toast } from "react-toastify";

function FormCreateProfile({ action }) {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [work, setWork] = useState("");
  const [description, setDescription] = useState("");
  const [open, setOpen] = useState(false);
  const [yourWorks, setYourWorks] = useState([
    "AI (Artificial Intelligence)",
    "Cybersecurity",
    "Blockchain",
    "IoT (Internet of Things)",
    "Data Science & Analytics",
    "Cloud Computing",
    "VR/AR (Virtual Reality/Augmented Reality)",
    "Robotics",
    "Biotechnology",
    "Renewable Energy",
    "other",
  ]);
  const renderOptions = () => {
    return yourWorks.map((w, index) => {
      return (
        <li
          key={index}
          onClick={(e) => {
            setWork(w);
            e.stopPropagation();
            setOpen(false);
          }}
          className="w-full cursor-pointer text-xs p-2 rounded-md  hover:dark:bg-blur-dark hover:bg-blur-light"
        >
          {w}
        </li>
      );
    });
  };
  const verifyData = () => {
    if (!name) {
      return {
        status: false,
        message: "Vui lòng nhập tên của bạn!",
      };
    }
    if (!email) {
      return {
        status: false,
        message: "Vui lòng nhập email của bạn!",
      };
    }
    if (!work) {
      return {
        status: false,
        message: "Vui lòng chọn công việc của bạn!",
      };
    }
    if (!work) {
      return {
        status: false,
        message: "Vui lòng nhập mô tả về bạn!",
      };
    }
    return true;
  };
  const saveProfile = () => {
    const check = verifyData();
    if (!check.status) {
      toast.error(check.message, {
        position: toast.POSITION.TOP_CENTER,
        autoClose: 2000,
      });
    }
  };
  return (
    <div
      style={{
        backdropFilter: "blur(20px)",
        maxHeight: "calc(100vh - 6rem)",
      }}
      className="font-family relative p-4 text-black dark:text-white bg-light-second dark:bg-dark-second rounded-md min-w-40rem w-1/2"
    >
      <div
        onClick={action}
        className="p-2 rounded-full hover:bg-blur-light hover:dark:bg-blur-dark cursor-pointer w-fit absolute right-2 top-2"
      >
        <MdOutlineClose></MdOutlineClose>
      </div>
      <h1 className="text-md border-b-4 border-solid border-primary rounded-sm w-fit">
        Tạo hồ sơ của bạn
      </h1>
      <div>
        <div className="p-2text-black dark:text-white h-max ">
          <h5 className="text-sm mt-5  rounded-sm w-fit">Nhập tên của bạn</h5>
          <Input
            value={name}
            onChange={(e) => {
              setName(e.target.value);
            }}
            placeholder="ví dụ: Trần Hữu Tài"
            className={"mt-2 h-8 rounded-md text-sm pl-2"}
          ></Input>
          <h5 className="text-sm mt-5  rounded-sm w-fit">Nhập email của bạn</h5>
          <Input
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="ví dụ: example@gmail.com"
            type="email"
            className={"mt-2 h-8 rounded-md text-sm pl-2"}
          ></Input>
          <h5 className="text-sm mt-5  rounded-sm w-fit">Bạn là</h5>

          <DropDown
            className={""}
            open={open}
            setOpen={setOpen}
            drop={
              <Input
                value={work}
                onChange={(e) => setWork(e.target.value)}
                onFocus={(e) => setOpen(true)}
                placeholder="ví dụ: website developer"
                className={"mt-2 h-8 rounded-md text-sm w-full p-0"}
              ></Input>
            }
          >
            <ul className="w-full" onClick={(e) => setOpen(true)}>
              {renderOptions()}
            </ul>
          </DropDown>
          <h5 className="text-xs mt-5  rounded-sm w-fit">
            Nhập môt tả của bạn
          </h5>
          <textarea
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            className="w-full text-sm bg-light-third dark:bg-dark-third reset p-2 mt-2 rounded-md focus:border-primary border-1 border-solid border-transparent"
            placeholder="ví dụ : dự án làm về  ..."
          ></textarea>
        </div>
      </div>
      <div className="justify-center items-center flex w-full ">
        <Button
          sx={{
            marginLeft: "auto",
            marginRight: "auto",
            marginTop: "1rem",
            fontSize: ".75rem",
          }}
          onClick={saveProfile}
        >
          Thêm
        </Button>
      </div>
    </div>
  );
}

export default FormCreateProfile;
