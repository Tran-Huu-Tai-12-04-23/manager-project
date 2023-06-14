import { MdOutlineClose } from "react-icons/md";
import Input from "./Input";
import { useState } from "react";

import { Fade } from "react-awesome-reveal";
import { AiOutlineLink } from "react-icons/ai";
import { Button } from "@mui/material";

function FormAddNewMember({ action }) {
  const [emailOrName, setEmailOrName] = useState("");
  const [suggestResult, setSuggestResult] = useState(false);
  const [listEmail, setListEmail] = useState([
    "huutai@gmail.com",
    "nguye@gmail.com",
    "52100997@gmail.com",
  ]);
  const [listName, setListName] = useState(["Tran Huu Tai", "Lam"]);
  return (
    <div className=" relative p-4 text-black dark:text-white bg-light-second dark:bg-dark-second rounded-md min-w-40rem w-1/2">
      <div className="w-full">
        <div
          onClick={action}
          className="p-2 rounded-full hover:bg-blur-light hover:dark:bg-blur-dark cursor-pointer w-fit absolute right-2 top-2"
        >
          <MdOutlineClose></MdOutlineClose>
        </div>
        <h5 className="text-md font-bold w-fit">
          Mời người khác vào cùng làm việc
        </h5>
        <Input
          placeholder={"Nhập email hoặc tên, ví dụ: huutai@gmail.com"}
          className={"h-6 mt-4"}
          value={emailOrName}
          onChange={(e) => setEmailOrName(e.target.value)}
          onFocus={(e) => setSuggestResult(true)}
          onBlur={(e) => setSuggestResult(false)}
        />
        {suggestResult && (
          <Fade>
            <div
              style={{ width: "calc(100% - 2rem)" }}
              className="z-10  absolute mt-2 bg-white divide-y divide-gray-100 rounded-lg shadow dark:bg-gray-700"
            >
              <ul
                className="py-2 w-full text-sm text-gray-700 dark:text-gray-200"
                aria-labelledby="dropdownDefaultButton"
              >
                {listEmail.map((email, index) => {
                  return (
                    <li
                      key={index}
                      onClick={(e) => setEmailOrName(email)}
                      className="block px-4 py-2 w-full hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white"
                    >
                      {email}
                    </li>
                  );
                })}
                {listName.map((name, index) => {
                  return (
                    <li
                      key={index}
                      onClick={(e) => setEmailOrName(email)}
                      className="block px-4 py-2 w-full hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white"
                    >
                      {name}
                    </li>
                  );
                })}
              </ul>
            </div>
          </Fade>
        )}
        <div className="justify-start items-center flex mt-3">
          <div className="justify-center items-center mr-2 flex p-2 rounded-full bg-light-third dark:bg-dark-third">
            <AiOutlineLink className="text-xl"></AiOutlineLink>
          </div>
          <h5 className="text-xs font-bold w-fit">
            Mời thêm thành viên vào thông qua liên kết này
          </h5>
          <button className="reset text-xs ml-auto rounded-md hover:brightness-125 bg-light-third dark:bg-dark-third p-2">
            Tạo liên kết
          </button>
        </div>
      </div>
    </div>
  );
}

export default FormAddNewMember;
