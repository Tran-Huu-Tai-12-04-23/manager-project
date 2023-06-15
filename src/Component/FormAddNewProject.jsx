import { useState, forwardRef } from "react";
import { v4 as uuid } from "uuid";
import Input from "./Input";
import { MdOutlineClose } from "react-icons/md";
import { Avatar, Button } from "@mui/material";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import TextEditor from "./TextEditor";

import { MdOutlineEditCalendar } from "react-icons/md";

import { Autocomplete, Chip, TextField } from "@mui/material";

const top100Films = [
  { title: "The Shawshank Redemption", year: 1994 },
  { title: "The Godfather", year: 1972 },
  { title: "The Godfather: Part II", year: 1974 },
  { title: "The Dark Knight", year: 2008 },
  { title: "12 Angry Men", year: 1957 },
  { title: "Schindler's List", year: 1993 },
  { title: "Pulp Fiction", year: 1994 },
  {
    title: "The Lord of the Rings: The Return of the King",
    year: 2003,
  },
  { title: "The Good, the Bad and the Ugly", year: 1966 },
  { title: "Fight Club", year: 1999 },
  {
    title: "The Lord of the Rings: The Fellowship of the Ring",
    year: 2001,
  },
];

function FormAddNewProject({ action = (e) => {} }) {
  const [date, setDate] = useState(new Date());
  const [addNewSubTask, setAddNewSubTask] = useState(false);
  const [descriptions, setDescription] = useState("");

  const ExampleCustomInput = forwardRef(({ value, onClick }, ref) => (
    <div ref={ref} onClick={onClick}>
      <MdOutlineEditCalendar className="example-custom-input hover:text-primary text-xl cursor-pointer mt-2"></MdOutlineEditCalendar>
    </div>
  ));
  return (
    <div
      style={{
        backdropFilter: "blur(20px)",
        maxHeight: "calc(100vh - 6rem)",
        height: "90vh",
      }}
      className="relative p-4 pb-6 text-black dark:text-white bg-light-second dark:bg-dark-second rounded-md min-w-40rem w-1/2"
    >
      <div
        onClick={action}
        className="p-2 rounded-full hover:bg-blur-light hover:dark:bg-blur-dark cursor-pointer w-fit absolute right-2 top-2"
      >
        <MdOutlineClose></MdOutlineClose>
      </div>
      <h1 className="text-md border-b-4 border-solid border-primary rounded-sm w-fit">
        Nhập nội dung dự án
      </h1>
      <div
        className=" overflow-auto pt-2 custom-scrollbar bd-radius-scroll pl-2 pr-2 pb-10"
        style={{ height: "calc(100% - 4rem)" }}
      >
        <div className="p-2text-black dark:text-white h-max ">
          <h5 className="text-xs mt-5  rounded-sm w-fit">Nhập tên dự án</h5>
          <Input
            placeholder="ví dụ: code html , css, home page,..."
            className={"mt-2 h-8 rounded-md"}
          ></Input>
          <h5 className="text-xs mt-5  rounded-sm w-fit">Nhập môt tả</h5>
          <textarea
            className="w-full bg-light-third dark:bg-dark-third reset p-2 mt-2 rounded-md focus:border-primary border-1 border-solid border-transparent"
            placeholder="ví dụ : dự án làm về  ..."
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
          <h5 className="text-xs mt-5  rounded-sm w-fit">Chọn ngày hết hạn</h5>
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
          <h5 className="text-xs mt-5  rounded-sm w-fit">Thành viên</h5>
          <Autocomplete
            multiple
            sx={{
              color: "inherit",
              height: "unset",
              marginTop: "1rem",
              fontSize: ".75rem",
              "& div": {
                border: "none",
                color: "inherit",
              },
              "& *": {
                fontSize: ".75rem",
                color: "inherit",
                height: "unset",
              },
            }}
            options={top100Films.map((option) => option.title)}
            defaultValue={[top100Films[1]?.title]}
            freeSolo
            renderTags={(value, getTagProps) =>
              value.map((option, index) => (
                <Chip
                  sx={{
                    color: "rgba(55, 94, 255, 1)",
                    height: 24,
                    fontSize: ".75rem",
                    border: "none",
                    backgroundColor: "rgba(55, 94, 255, .3)",
                    color: "inherit",
                  }}
                  variant="outlined"
                  label={option}
                  {...getTagProps({ index })}
                ></Chip>
              ))
            }
            renderInput={(params) => (
              <TextField
                sx={{
                  color: "inherit",
                  fontSize: ".75rem",
                  "& *": {
                    fontSize: ".75rem",
                    color: "inherit",
                  },
                }}
                {...params}
                variant="filled"
                placeholder="Nhập email của họ"
              />
            )}
          />
          <h5 className="text-xs mt-5  rounded-sm w-fit mb-2">Thêm ghi chú</h5>
          <TextEditor></TextEditor>
        </div>
      </div>
      <div className="justify-center items-center flex w-full ">
        <Button
          sx={{
            marginLeft: "auto",
            marginRight: "auto",
            marginTop: "1rem",
            fontSize: ".75rem",
            marginBottom: "1rem",
          }}
        >
          Thêm
        </Button>
      </div>
    </div>
  );
}

export default FormAddNewProject;
