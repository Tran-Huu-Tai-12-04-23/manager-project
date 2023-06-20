import { useRef } from "react";

import { v4 as uuid } from "uuid";
import { CircularProgress } from "@mui/material";
import { useEffect, useState } from "react";
import { IoCloseOutline } from "react-icons/io5";

import Service from "../Service";
import { useSelector } from "react-redux";
import { data } from "autoprefixer";

function MultiSelect({
  className,
  width = "full",
  memberSelected,
  setMemberSelected,
}) {
  const [members, setMembers] = useState([]);
  const [open, setOpen] = useState(false);
  const [waitCallApi, setWaitCallApi] = useState(false);
  const [searchNameMember, setSearchNameMember] = useState("");
  const input = useRef(null);
  const dataLogin = useSelector((state) => state.reducer.dataLogin);

  useEffect(() => {
    const windowClick = () => {
      setOpen(false);
    };
    window.addEventListener("click", windowClick);

    return () => {
      window.removeEventListener("click", windowClick);
    };
  }, []);

  useEffect(() => {
    const initMember = async () => {
      const result = await Service.getDataFromApi("/user/get-users");
      setMembers(
        JSON.parse(result.data).filter((member) => {
          return member.email !== dataLogin.email;
        })
      );
    };
    initMember();
  }, []);

  useEffect(() => {}, [searchNameMember]);

  useEffect(() => {
    const filteredMembers = members.filter((member) => {
      const checkMemberAlreadyExists = memberSelected.find(
        (mem) => mem._id === member._id
      );
      return !checkMemberAlreadyExists;
    });
    setMembers(filteredMembers);
  }, [memberSelected]);
  return (
    <div
      onClick={(e) => {
        e.stopPropagation();
        if (input) {
          input?.current.focus();
          setOpen(!open);
        }
      }}
      className={`${className} w-${width}   hover:brightness-125 flex-wrap relative  z-10 flex justify-start items-start bg-light-third p-2 dark:bg-dark-third rounded-md text-xs w-full pl-2 pr-2 reset bg-transparent`}
    >
      {memberSelected &&
        memberSelected.length > 0 &&
        memberSelected.map((member, index) => {
          return (
            <div
              key={index}
              className="xl:w-1/12 lg:w-2/12 md:w-2/6 w-1/4 overflow-hidden rounded-xl mt-2 scale-95 flex justify-start items-center bg-design p-1 pl-2 pr-2"
            >
              <h5 className="text-xs mr-2 max-w-1/2 overflow-hidden text-ellipsis">
                {member.email ? member.email : member.displayName}
              </h5>
              <IoCloseOutline
                className="hover:text-red-500 cursor-pointer text-xl"
                onClick={(e) => {
                  e.stopPropagation();
                  setMemberSelected((prev) => {
                    return prev.filter((mem) => {
                      return mem.key !== member.key;
                    });
                  });
                  setMembers((prev) => {
                    return [...prev, member];
                  });
                }}
              />
            </div>
          );
        })}
      <input
        ref={input}
        onFocus={(e) => {
          e.stopPropagation();
          setOpen(true);
        }}
        onClick={(e) => {
          e.stopPropagation();
        }}
        className=" bg-light-third h-8 mt-2 dark:bg-dark-third rounded-md  w-1/4 text-xs pl-2 pr-2 reset bg-transparent"
      ></input>
      {open && (
        <div
          onClick={(e) => e.stopPropagation()}
          style={{
            top: "100%",
          }}
          className="absolute shadow-2xl translate-y-1 flex justify-center items-center bg-light-third dark:bg-dark-third left-0 right-0 w-full z-10  p-1 rounded-lg"
        >
          {!waitCallApi && members.length > 0 && (
            <ul className="w-full">
              {members.map((mem, index) => {
                return (
                  <li
                    key={index}
                    onClick={(e) => {
                      e.stopPropagation();
                      const checkMemberAlready = memberSelected.find(
                        (member) => member._id === mem._id
                      );

                      if (!checkMemberAlready) {
                        setMemberSelected((prev) => {
                          return [
                            ...prev,
                            {
                              ...mem,
                              key: uuid(),
                            },
                          ];
                        });
                      }
                    }}
                    className=" p-2 cursor-pointer hover:brightness-125  bg-light-third dark:bg-dark-third rounded-md"
                  >
                    {mem.email ? mem.email : mem.displayName}
                  </li>
                );
              })}
            </ul>
          )}
          {waitCallApi && (
            <div className="w-full p-4 justify-center flex items-center">
              <CircularProgress
                sx={{
                  width: "24px!important",
                  marginTop: "1rem",
                  marginBottom: "1rem",
                  height: "24px!important",
                }}
              ></CircularProgress>
            </div>
          )}

          {members.length === 0 && (
            <div className="h-32 p-4">Không có thành viên hợp lệ!</div>
          )}
        </div>
      )}
    </div>
  );
}

export default MultiSelect;
