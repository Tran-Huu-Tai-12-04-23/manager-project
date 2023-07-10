import { useState, forwardRef } from "react";
import { v4 as uuid } from "uuid";
import Input from "./Input";
import { MdOutlineClose } from "react-icons/md";
import { Button } from "@mui/material";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import TextEditor from "./TextEditor";

import { MdOutlineEditCalendar } from "react-icons/md";
import { toast } from "react-toastify";
import MultiSelect from "../Component/MultiSelect";
import Service from "../Service";
import { useSelector } from "react-redux";
import { useDispatch } from "react-redux";
import { projectDetailAction } from "../Store/projectDetailSlice";
import { projectAction } from "../Store/projectSlice";

import Util from '../Util'

const members = [
  { title: "The Shawshank Redemption", year: 1994 },
  { title: "The Godfather", year: 1972 },
  { title: "The Godfather: Part II", year: 1974 },
  { title: "The Dark Knight", year: 2008 },
  { title: "12 Angry Men", year: 1957 },
  { title: "Schindler's List", year: 1993 },
  { title: "Pulp Fiction", year: 1994 },
];

function FormAddNewProject({ action = (e) => {}, type, data }) {
  const [date, setDate] = useState(data ?  new Date(data.date_end ):  new Date());
  const [title, setTitle] = useState(data?.name ? data.name : '');
  const [description, setDescription] = useState(data?.description ? data.description : '');
  const [memberSelected, setMemberSelected] = useState([]);
  const [document, setDocument] = useState([]);
  const dataLogin = useSelector((state) => state.reducer.dataLogin);
  const dispatch = useDispatch();

  const ExampleCustomInput = forwardRef(({ value, onClick }, ref) => (
    <div ref={ref} onClick={onClick}>
      <MdOutlineEditCalendar className="example-custom-input hover:text-primary text-xl cursor-pointer mt-2"></MdOutlineEditCalendar>
    </div>
  ));

  const handleSelectDocument = (e) => {
    const files = e.target.files;
    Array.from(files).forEach((file) => {
      if (
        file.type !== "application/zip" &&
        file.type !== "application/x-zip-compressed"
      ) {
        setDocument((prev) => {
          return [...prev, { data: file, id: uuid(), name: getInfoFile(file) }];
        });
      } else {
        toast.warning("File .zip không hợp lệ !", {
          position: toast.POSITION.TOP_CENTER,
          autoClose: 2000,
        });
      }
    });
  };

  const getInfoFile = (file) => {
    return file.name + ", Kích thước: " + file.size + " bytes";
  };

  const handleRemoveDocument = (id) => {
    setDocument((prev) => {
      return prev.filter((doc) => doc.id !== id);
    });
  };

  const verifyDataBeforeSend = () => {
    if (!title) {
      return {
        type: false,
        message: "Vui lòng nhập tiêu đề!",
      };
    }
    if (!description) {
      return {
        type: false,
        message: "Vui lòng nhập mô tả!",
      };
    }

    return {
      type: true,
      message: "",
    };
  };
  const clearForm = () => {
    setDate(new Date());
    setTitle("");
    setDescription("");
    setMemberSelected([]);
    setDocument([]);
  };
  const handleAddNewInFoProject = async () => {
    const check = verifyDataBeforeSend();

    if (check.type === false) {
      toast.warning(check.message, {
        position: toast.POSITION.TOP_CENTER,
        autoClose: 2000,
      });

      return;
    }

    const idMemberSelect = memberSelected.map((mem) => {
      return mem._id;
    });

    const listFileDocument = document.map((doc) => doc.data);
    const formData = new FormData();
    formData.append("user_id_init", dataLogin.id);
    formData.append("title", title);
    formData.append("description", description);
    formData.append("member", idMemberSelect);
    formData.append("date_end", date);
    listFileDocument.forEach((file) => {
      formData.append("file", file);
    });

    const result = await Service.callApi(
      "/project/create-new-info-project",
      formData
    );

    if (result.status === true) {
      const newInfoProject = JSON.parse(result.data);
      dispatch(projectAction.addNewProject({ newProject: newInfoProject }));
      dispatch(projectDetailAction.selectProject({ project: newInfoProject }));
      toast.success(result.message, {
        position: toast.POSITION.TOP_CENTER,
        autoClose: 2000,
      });
      clearForm();
      action();
    } else {
      toast.error("Tạo mới không thành công!", {
        position: toast.POSITION.TOP_CENTER,
        autoClose: 2000,
      });
    }
  };

  const handleUpdateProject = async () => {
    const check = verifyDataBeforeSend();
    if (check.type === false) {
      toast.warning(check.message, {
        position: toast.POSITION.TOP_CENTER,
        autoClose: 2000,
      });
      return;
    } 

    console.log(document.length > 0)
    let checkUpdateData = title === data.name && description === data.description && Util.compareDate(date , data.date_end)
    if( checkUpdateData && !document.length === 0) {
      toast.warning("Ban chua thay doi du lieu cua du an!!", {
        position: toast.POSITION.TOP_CENTER,
        autoClose: 2000,
      });
      return;
    }
    const listFileDocument = document.map((doc) => doc.data);
    const formData = new FormData();
    formData.append("name", title);
    formData.append("createBy", dataLogin.id);
    formData.append("description", description);
    formData.append("dateEnd", date);
    formData.append("projectId", data._id);
    listFileDocument.forEach((file) => {
      formData.append("file", file);
    });

    const result = await Service.update(
      "/project/edit-project",
      formData
    );

    if (result.data.status === true) {
      const newInfoProject = JSON.parse(result.data.data);
      dispatch(projectAction.updateProject({  projectId: data._id, newProject:  newInfoProject}));
      toast.success(result.data.message, {
        position: toast.POSITION.TOP_CENTER,
        autoClose: 2000,
      });
      clearForm();
      action();
    } else {
      toast.error("Tạo mới không thành công!", {
        position: toast.POSITION.TOP_CENTER,
        autoClose: 2000,
      });
    }


  }

  return (
    <div
      style={{
        backdropFilter: "blur(20px)",
        height: "100vh",
      }}
      className="z-50 relative overflow-hidden p-4 pb-6 text-black dark:text-white bg-light-second dark:bg-dark-second rounded-md w-screen "
    >
      <div
        onClick={action}
        className="p-2 rounded-full hover:bg-blur-light hover:dark:bg-blur-dark cursor-pointer w-fit absolute right-2 top-2"
      >
        <MdOutlineClose></MdOutlineClose>
      </div>
      {type === "edit" && (
        <h1 className="text-md border-b-4 border-solid border-primary rounded-sm w-fit">
          Chỉnh sửa nội dung dự án
        </h1>
      )}
      {type !== "edit" && (
        <h1 className="text-md border-b-4 border-solid border-primary rounded-sm w-fit">
          Nhập nội dung dự án
        </h1>
      )}

      <div
        className="overflow-auto pt-2 custom-scrollbar bd-radius-scroll pl-2 pr-2 pb-10"
        style={{ height: "calc(100% - 4rem)" }}
      >
        <div className="p-2text-black dark:text-white h-max ">
          <div className="grid xl:grid-cols-2 mt-5  lg:grid-cols-2 grid-cols-1 gap-10">
            <div className="w-full">
              <h5 className="text-xs rounded-sm w-fit">Nhập tên dự án</h5>
              <Input
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                placeholder="ví dụ: code html , css, home page,..."
                className={"mt-2 h-8 rounded-md"}
              ></Input>
            </div>
            <div className="w-full">
              <h5 className="text-xs  rounded-sm w-fit">Chọn ngày hết hạn</h5>
              <div className="justify-start items-center flex">
                <div className="w-unset mt-2 ">
                  <DatePicker
                    selected={date}
                    onChange={(date) => {
                      setDate(date);
                    }}
                    customInput={<ExampleCustomInput />}
                  />
                </div>
                <h5 className="text-xs mt-1 rounded-sm w-fit ml-2">
                  {date.toLocaleDateString()}
                </h5>
              </div>
            </div>
          </div>
          <div className="w-full mt-5">
            <h5 className="text-xs rounded-sm w-fit">Thêm tài liệu</h5>
            <div className="flex items-center justify-center w-full mt-2 h-max ">
              <label
                onDrop={(e) => {
                  e.stopPropagation();
                  e.preventDefault();
                  let files = e.dataTransfer.files;
                  Array.from(files).forEach((file) => {
                    if (
                      file.type !== "application/zip" &&
                      file.type !== "application/x-zip-compressed"
                    ) {
                      setDocument((prev) => {
                        return [
                          ...prev,
                          { data: file, id: uuid(), name: getInfoFile(file) },
                        ];
                      });
                    } else {
                      toast.warning("File .zip không hợp lệ !", {
                        position: toast.POSITION.TOP_CENTER,
                        autoClose: 2000,
                      });
                    }
                  });
                  e.target.classList.remove("border-primary");
                  e.target.classList.add("border-gray-500");
                }}
                onDragOver={(e) => {
                  e.stopPropagation();
                  e.preventDefault();
                  e.target.classList.add("border-primary");
                  e.target.classList.remove("border-gray-500");
                }}
                onDragLeave={(e) => {
                  e.stopPropagation();
                  e.preventDefault();
                  e.target.classList.remove("border-primary");
                  e.target.classList.add("border-gray-500");
                }}
                htmlFor="dropzone-file"
                className="flex flex-col items-center justify-center w-full h-32 border-2 border-gray-500 border-dashed rounded-lg cursor-pointer dark:hover:bg-bray-800 dark:bg-gray-700 hover:bg-gray-100  "
              >
                <div className="flex flex-col items-center justify-center pt-5 pb-6 ">
                  <svg
                    aria-hidden="true"
                    className="w-10 h-10 mb-3 text-gray-400"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v12"
                    ></path>
                  </svg>
                  <p className="mb-2 text-sm text-gray-500 dark:text-gray-400">
                    <span className="font-semibold">Click to upload</span> or
                    drag and drop
                  </p>
                  <p className="text-xs text-gray-500 dark:text-gray-400">
                    SVG, PNG, JPG or GIF , word, pdf(MAX. 800x400px)
                  </p>
                </div>
                <input
                  onChange={handleSelectDocument}
                  id="dropzone-file"
                  type="file"
                  className="hidden"
                  multiple
                />
              </label>
            </div>

            {document.length > 0 && (
              <div className="flex flex-wrap justify-start mt-5 items-center border-1 border-solid rounded-xl border-blur-light dark:border-blur-dark p-4 ">
                {document.map((doc, index) => {
                  return (
                    <div
                      className="flex justify-between scale-95 mt-1 mb-1 items-center p-2 bg-ux rounded-md"
                      key={index}
                    >
                      <h5
                        className="overflow-hidden text-ellipsis h-4 font-family text-xs text-gray-400 "
                        style={{}}
                      >
                        {doc.name}
                      </h5>
                      <MdOutlineClose
                        className="hover:text-red-500 cursor-pointer"
                        onClick={(e) => handleRemoveDocument(doc.id)}
                      ></MdOutlineClose>
                    </div>
                  );
                })}
              </div>
            )}
          </div>
          {type !== "edit" && (
            <div className="w-full mt-5">
              <h5 className="text-xs rounded-sm w-fit mb-2">Thành viên</h5>
              <MultiSelect
                memberSelected={memberSelected}
                setMemberSelected={setMemberSelected}
              ></MultiSelect>
            </div>
          )}

          <div className="w-full mt-5">
            <h5 className="text-xs rounded-sm w-fit mb-2">Thêm mô tả</h5>
            <TextEditor
              setDescription={setDescription}
              description={description}
            ></TextEditor>
          </div>
        </div>
      </div>
      <div className="justify-center items-center flex w-full ">
        {
          type !== 'edit' && (
            <Button
            sx={{
              marginLeft: "auto",
              marginRight: "auto",
              marginTop: "1rem",
              fontSize: ".75rem",
              marginBottom: "1rem",
            }}
            onClick={handleAddNewInFoProject}
          >
            Thêm
          </Button>
          )
        }
        {
          type === 'edit' && (
            <Button
            sx={{
              marginLeft: "auto",
              marginRight: "auto",
              marginTop: "1rem",
              fontSize: ".75rem",
              marginBottom: "1rem",
            }}
            onClick={handleUpdateProject}
          >
            Luu lai
          </Button>
          )
        }
      </div>
    </div>
  );
}

export default FormAddNewProject;
