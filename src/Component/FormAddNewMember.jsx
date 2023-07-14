import { useState, useEffect } from "react";
import { CopyToClipboard } from 'react-copy-to-clipboard';

import { CircularProgress } from "@mui/material";
import { MdOutlineClose } from "react-icons/md";
import { AiOutlineLink } from "react-icons/ai";
import {BsCheck2} from 'react-icons/bs';

import Input from "./Input";
import Service from "../Service/index";
import { useSelector } from "react-redux";
import { toast } from "react-toastify";
import { useDispatch } from "react-redux";
import { projectDetailAction } from "../Store/projectDetailSlice";

function FormAddNewMember({ action }) {
  const [emailOrName, setEmailOrName] = useState("");
  const [userSelect, setUserSelect] = useState(null);
  const [suggestResult, setSuggestResult] = useState(false);
  const [listUser, setListUser] = useState([]);
  const dataLogin = useSelector((state) => state.reducer.dataLogin);
  const projectDetail = useSelector((state) => state.reducer.projectDetail);
  const [waitAddMember, setWaitAddMember] = useState(false);
  const dispatch = useDispatch();
  const [waitCreateLink, setWaitCreateLink] = useState(false);
  const [link, setLink] = useState('');
  const [copy, setCopy] = useState(false);

  useEffect(() => {
    const initMember = async () => {
      const result = await Service.getDataFromApi(
        `/user/get-users-not-member/?projectId=${projectDetail._id}`
      );
      setListUser(
        JSON.parse(result.data).filter((member) => {
          return member.email !== dataLogin.email;
        })
      );
    };
    initMember();
  }, [dataLogin]);

  const handleCreateLink = async () => {
    const data ={
      userId : dataLogin.id, projectId: projectDetail._id, 
    }
    setWaitCreateLink(true);
    const result = await Service.callApi('/link/create-link-invite', data);
    setLink(result.link);
    setWaitCreateLink(false);
  }
  const handleAddMember = async () => {
    if (!userSelect) {
      toast.warning("Bạn chưa chọn!", {
        position: toast.POSITION.TOP_CENTER,
        autoClose: 2000,
      });
    }
    if (projectDetail && userSelect) {
      setWaitAddMember(true);
      const result = await Service.update("/project/add-member-to-project", {
        userId: userSelect._id,
        projectId: projectDetail._id,
      });

      if (result.data.status === true) {
        toast.success("Thêm thành viên thành công!", {
          position: toast.POSITION.TOP_CENTER,
          autoClose: 2000,
        });
        action();
        const newProject = result.data;
        dispatch(
          projectDetailAction.initProjectDetail(JSON.parse(newProject.data))
        );
      } else {
        console.log("Thêm thành viên không thành công!");
      }
      setWaitAddMember(false);
    }
  };

  const handleCopy = () => {
    setCopy(true);
  }

  return (
    <div
      onClick={(e) => setSuggestResult(false)}
      className=" relative p-4 text-black dark:text-white bg-light-second dark:bg-dark-second rounded-md min-w-40rem w-1/2"
    >
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
        <div className="flex  mt-4 justify-between items-center">
          <Input
            placeholder={"Nhập email hoặc tên, ví dụ: huutai@gmail.com"}
            className={"h-6  rounded-md"}
            value={emailOrName}
            onChange={(e) => setEmailOrName(e.target.value)}
            onFocus={(e) => {
              e.stopPropagation();
              setSuggestResult(true);
            }}
            onClick={(e) => e.stopPropagation()}
          />
          {!waitAddMember && (
            <button
              onClick={handleAddMember}
              className="reset h-8 w-32 ml-2 pl-4 pr-4 rounded-md text-md hover:brightness-125 cursor-pointer bg-light-third dark:bg-dark-third "
            >
              Thêm
            </button>
          )}
          {waitAddMember && (
            <button className="reset h-8 w-32  ml-2 pl-4 pr-4 rounded-md text-md hover:brightness-125 cursor-pointer bg-light-third dark:bg-dark-third ">
              <CircularProgress
                sx={{
                  color: "#ffff",
                  marginTop: "4px",
                  height: "20px!important",
                  width: "20px!important",
                }}
              />
            </button>
          )}
        </div>
        {suggestResult && (
          <div
            style={{ width: "calc(100% - 2rem)" }}
            className="z-10  absolute mt-2 bg-white divide-y divide-gray-100 rounded-lg shadow dark:bg-gray-700"
          >
            <ul className="py-2 w-full text-sm text-gray-700 dark:text-gray-200">
              {listUser.map((user, index) => {
                return (
                  <li
                    key={index}
                    onClick={(e) => {
                      e.stopPropagation();
                      setSuggestResult(false);
                      setUserSelect(user);
                      setEmailOrName(
                        user.email ? user.email : user?.displayName
                      );
                    }}
                    className="block px-4 py-2 w-full hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white"
                  >
                    {user.email ? user.email : user?.displayName}
                  </li>
                );
              })}
            </ul>
          </div>
        )}
        <div className="justify-start items-center flex mt-3">
          {
            !link && <>
              <div className="justify-center items-center mr-2 flex p-2 rounded-full bg-light-third dark:bg-dark-third">
                <AiOutlineLink className="text-xl"></AiOutlineLink>
              </div>
              <h5 className="text-xs font-bold w-fit">
                Mời thêm thành viên vào thông qua liên kết này
              </h5>
              {
                waitCreateLink && <button
                className="reset w-24 text-xs ml-auto rounded-md hover:brightness-125 bg-light-third dark:bg-dark-third p-2">
                  <CircularProgress 
                  sx={{
                    height: "16px!important",
                    width: "16px!important",
                  }}></CircularProgress>
                </button>
              }
              {
                !waitCreateLink &&  <button
                onClick={handleCreateLink}
                className="reset text-xs w-24 ml-auto rounded-md hover:brightness-125 bg-light-third dark:bg-dark-third p-2">
                  Tạo liên kết
                </button>
              }
             
            </>
          }
          {
            link && <>
              <div className="justify-center items-center mr-2 flex p-2 rounded-full bg-light-third dark:bg-dark-third">
                <AiOutlineLink className="text-xl"></AiOutlineLink>
              </div>
              <h5 className="underline text-xs font-bold w-fit text-primary">
                {link}
              </h5>
              <CopyToClipboard text={link} onCopy={handleCopy}>
                <button
                  className="reset text-xs w-24 flex justify-center items-center ml-auto rounded-md hover:brightness-125 bg-light-third dark:bg-dark-third p-2">
                    {
                      !copy ? 'Sao chép' : <BsCheck2 className="text-green-400 scale-125"></BsCheck2> 
                    }
                  </button>
              </CopyToClipboard>
            </>
          }
        </div>
      </div>
    </div>
  );
}

export default FormAddNewMember;
