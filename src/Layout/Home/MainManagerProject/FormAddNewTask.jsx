import { useState, forwardRef } from "react";
import { v4 as uuid } from "uuid";
import Input from "../../../Component/Input";
import { MdOutlineClose } from "react-icons/md";
import { Avatar, Button } from "@mui/material";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";

import { MdOutlineEditCalendar, MdAdd } from "react-icons/md";

function FormAddNewTask({ action = (e) => {} }) {
  const [date, setDate] = useState(new Date());
  const [addNewSubTask, setAddNewSubTask] = useState(false);
  const [descriptions, setDescription] = useState("");

  const [priority, setPriority] = useState(0);

  const listPriority = [
    { name: "Thấp", value: 0, color: "text-low", background: "bg-low" },
    {
      name: "Vừa",
      value: 1,
      color: "text-medium",
      background: "bg-medium",
    },
    { name: "Cao", value: 2, color: "text-high", background: "bg-high" },
  ];

  const ExampleCustomInput = forwardRef(({ value, onClick }, ref) => (
    <div ref={ref} onClick={onClick}>
      <MdOutlineEditCalendar className="example-custom-input hover:text-primary text-xl cursor-pointer mt-2"></MdOutlineEditCalendar>
    </div>
  ));
  return (
    <div
      style={{
        backdropFilter: "blur(20px)",
        height: "calc(100vh - 6rem)",
        minHeight: "30rem",
      }}
      className="relative p-4 text-black dark:text-white bg-light-second dark:bg-dark-second rounded-md min-w-40rem w-1/2"
    >
      <div
        onClick={action}
        className="p-2 rounded-full hover:bg-blur-light hover:dark:bg-blur-dark cursor-pointer w-fit absolute right-2 top-2"
      >
        <MdOutlineClose></MdOutlineClose>
      </div>
      <h1 className="text-md border-b-4 border-solid border-primary rounded-sm w-fit">
        Nhập nội dung cần làm
      </h1>
      <div
        className=" overflow-auto pt-2 custom-scrollbar bd-radius-scroll pl-2 pr-2 pb-10"
        style={{ height: "calc(100% - 4rem)" }}
      >
        <div className="p-2text-black dark:text-white h-max ">
          <h5 className="text-xs mt-5  rounded-sm w-fit">Nhập tên công việc</h5>
          <Input
            placeholder="ví dụ: code html , css, home page,..."
            className={"mt-2 h-8 rounded-md"}
          ></Input>
          <select
            value={priority}
            className={`${listPriority[priority]?.color} ${listPriority[priority]?.background} ml-2 mt-2  mb-4 cursor-pointer appearance-none reset  p-1 rounded-md h-6 w-12 text-center  text-xs`}
            onChange={(e) => setPriority(e.target.value)}
          >
            {listPriority.map((pri, index) => {
              return (
                <option
                  key={index}
                  value={pri.value}
                  sx={{
                    color: "inherit",
                  }}
                  className={`${pri?.color} ${pri?.background} p-4 cursor-pointer rounded-md h-6 w-fit  text-xs`}
                >
                  {pri.name}
                </option>
              );
            })}
          </select>
          <h5 className="text-xs mt-5  rounded-sm w-fit">Nhập môt tả</h5>
          <textarea
            className="w-full bg-light-third dark:bg-dark-third reset p-2 mt-2 rounded-md focus:border-primary border-1 border-solid border-transparent"
            placeholder="ví dụ : công việc ..."
          ></textarea>
          <h5 className="text-xs mt-5  rounded-sm w-fit">Thêm tài liệu</h5>
          <div className="flex items-center justify-center w-full mt-2 h-max ">
            <label
              onDrop={(e) => {
                e.stopPropagation();
                e.preventDefault();
                let files = e.dataTransfer.files; // Lấy danh sách file từ sự kiện
                let fileInfo = "";
                for (var i = 0; i < files.length; i++) {
                  var file = files[i];
                  fileInfo +=
                    "Tên file: " +
                    file.name +
                    ", Kích thước: " +
                    file.size +
                    " bytes<br>";
                }
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
              className=" flex flex-col items-center justify-center w-full h-32 border-2 border-gray-500 border-dashed rounded-lg cursor-pointer dark:hover:bg-bray-800 dark:bg-gray-700 hover:bg-gray-100  "
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
                  <span className="font-semibold">Click to upload</span> or drag
                  and drop
                </p>
                <p className="text-xs text-gray-500 dark:text-gray-400">
                  SVG, PNG, JPG or GIF , word, pdf(MAX. 800x400px)
                </p>
              </div>
              <input id="dropzone-file" type="file" className="hidden" />
            </label>
          </div>
          <h5 className="text-xs mt-5  rounded-sm w-fit">Chọn ngày</h5>
          <div className="justify-start items-center flex">
            <div className="w-unset ">
              <DatePicker
                selected={date}
                onChange={(date) => {
                  console.log(date);
                  setDate(date);
                }}
                customInput={<ExampleCustomInput />}
              />
            </div>
            <h5 className="text-xs mt-1 rounded-sm w-fit ml-2">
              {date.toLocaleDateString()}
            </h5>
          </div>

          <div className="flex-shrink-0 justify-start items-center flex mt-10 border-t-1 border-solid pt-2 border-blur-light dark:border-blur-dark border-primary">
            <Avatar alt="huutia" src="" sx={{ width: 30, height: 30 }}></Avatar>
            <Input
              placeholder={"Nhập bình luận đầu tiên của bạn..."}
              className={"ml-2 h-6 mr-10"}
            ></Input>
            <Button style={{ marginLeft: "1rem" }}>Gửi</Button>
          </div>
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
        >
          Lưu lại
        </Button>
      </div>
    </div>
  );
}

export default FormAddNewTask;
