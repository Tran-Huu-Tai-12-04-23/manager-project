import { useState, forwardRef, useEffect } from "react";
import { v4 as uuid } from "uuid";
import Input from "../../../Component/Input";
import { MdOutlineClose } from "react-icons/md";
import { Avatar, Button } from "@mui/material";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";

import { MdOutlineEditCalendar, MdAdd } from "react-icons/md";
import TextEditor from "../../../Component/TextEditor";
import { useSelector } from "react-redux";
import Service from "../../../Service";
import { toast } from "react-toastify";

import { useDispatch } from "react-redux";
import { projectDetailAction } from "../../../Store/projectDetailSlice";
import { projectAction } from "../../../Store/projectSlice";

import WaitLoadApi from '../../../Component/WaitLoadApi'
import { taskAction } from "../../../Store/taskSlice";

function FormAddNewTask({ action = (e) => {}, dataCol , data, type='no-edit'}) {
  const dataLogin = useSelector((state) => state.reducer.dataLogin);
  const projectDetail = useSelector((state) => state.reducer.projectDetail);
  const projects = useSelector((state) => state.reducer.projects);
  const [date, setDate] = useState(new Date());
  const [description, setDescription] = useState("");
  const [name, setName] = useState("");
  const [priority, setPriority] = useState(0);
  const dispatch = useDispatch();
  const [waitCallApi, setWaitCallApi] = useState(false);

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

  const verifyDataBeforeSend = () => {
    if (!name) {
      return {
        type: false,
        message: "Vui lòng nhập tiêu đề!",
      };
    }
    return {
      type: true,
      message: "",
    };
  };
  
  const handleAddNewTask = async () => {
    const check = verifyDataBeforeSend();

    if (check.type === false) {
      toast.warning(check.message, {
        position: toast.POSITION.TOP_CENTER,
        autoClose: 2000,
      });

      return;
    }
    if (dataCol) {
      const formData = {
        createBy: dataLogin.id,
        name,
        description,
        date,
        colId: dataCol._id,
        priority,
      };
      setWaitCallApi(true);
      const result = await Service.callApi(
        "/task/create-new-task",
        formData
      );

      if (result.status === true) {
        const newTask = JSON.parse(result.data);
        dispatch(
          projectDetailAction.addTaskToCol({
            task: newTask,
            colId: dataCol._id,
          })
        );
        
        dispatch( projectAction.addTaskToCol({
          task:newTask, colId: dataCol._id,projectId: projectDetail._id
        }));

        toast.success(result.message, {
          position: toast.POSITION.TOP_CENTER,
          autoClose: 2000,
        });
        action();
      }
      setWaitCallApi(false);
    } else {
      toast.error("Tạo mới không thành công!", {
        position: toast.POSITION.TOP_CENTER,
        autoClose: 2000,
      });
    }
  };

  const handleUpdateTask = async () => {
    if(priority === data.priority &&  name === data.name  && date.toISOString() === data.createdAt && description === data.description) {
      toast.warning('Bạn chưa thay đổi nội dung!', {
        position: toast.POSITION.TOP_CENTER,
        autoClose: 2000,
      });
      return ;
    }

    const formData = {
      taskId: data._id,
      name,
      description,
      date,
      priority,
    };
    setWaitCallApi(true);
    const  result = await Service.update('/task/update', formData);
    if( result.data.status === true  ) {
      const newTask = JSON.parse(result.data.data);
      dispatch(projectAction.updateTask({projectId : projectDetail._id, task: newTask}));
      dispatch(projectDetailAction.updateTask({task: newTask}));
      dispatch(taskAction.update({task: newTask}));
      toast.success('Cập nhật thành công!', {
        position: toast.POSITION.TOP_CENTER,
        autoClose: 2000,
      })
    }else {
      toast.error('Cập nhật thất bại!', {
        position: toast.POSITION.TOP_CENTER,
        autoClose: 2000,
      });
    }
    setWaitCallApi(false);

  }


  const ExampleCustomInput = forwardRef(({ value, onClick }, ref) => (
    <div ref={ref} onClick={onClick}>
      <MdOutlineEditCalendar className="example-custom-input hover:text-primary text-xl cursor-pointer mt-2"></MdOutlineEditCalendar>
    </div>
  ));

  useEffect(() => {
    if( data) {
      setPriority(data.priority);
      setName(data.name);
      setDate(new Date(data.createdAt));
      setDescription(data.description);
    }
  }, [data])

  return (
    <div
      style={{
        backdropFilter: "blur(20px)",
        height: "calc(100vh - 6rem)",
        minHeight: "30rem",
        width: "calc(100vw - 30rem)",
      }}
      className="relative p-4 text-black dark:text-white bg-light-second dark:bg-dark-second rounded-md min-w-40rem"
    >
      {
        waitCallApi && 
        <div className=" fixed flex justify-center items-center backdrop-blur-xl z-50 top-0 bottom-0 right-0 left-0">
          <WaitLoadApi/>
        </div>
      }
      <div
        onClick={action}
        className="p-2 rounded-full hover:bg-blur-light hover:dark:bg-blur-dark cursor-pointer w-fit absolute right-2 top-2"
      >
        <MdOutlineClose></MdOutlineClose>
      </div>
      <h1 className="text-md border-b-4 border-solid border-primary rounded-sm w-fit">
        {
          type === 'no-edit' ? 'Nhập nội dung cần làm' : 'Chỉnh sửa nội dung công việc'
        }
      </h1>
      <div
        className=" overflow-auto pt-2 custom-scrollbar bd-radius-scroll pl-2 pr-2 pb-10"
        style={{ height: "calc(100% - 4rem)" }}
      >
        <div className="p-2text-black dark:text-white h-max ">
          <h5 className="text-xs mt-5  rounded-sm w-fit">Nhập tên công việc</h5>
          <Input
            value={name}
            onChange={(e) => setName(e.target.value)}
            placeholder="ví dụ: code html , css, home page,..."
            className={"mt-2 h-8 rounded-md"}
          ></Input>
          <select
            value={priority}
            className={`${listPriority[priority]?.color} ${listPriority[priority]?.background} mt-2  mb-4 cursor-pointer appearance-none reset  p-1 rounded-md h-6 w-12 text-center  text-xs`}
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
          <h5 className="text-xs  rounded-sm w-fit mb-2 mt-5">Nhập môt tả</h5>
          <TextEditor setDescription={setDescription}></TextEditor>
        </div>
      </div>
      <div className="justify-center items-center flex w-full ">
        {
          type === 'no-edit' && 
          <Button
            sx={{
              marginLeft: "auto",
              marginRight: "auto",
              marginTop: "1rem",
              fontSize: ".75rem",
            }}
            onClick={async (e) => {
              await handleAddNewTask();
              action();
            }}
          >
            Lưu lại
          </Button>
        }
        {
          type=== 'edit' && <Button
            sx={{
              marginLeft: "auto",
              marginRight: "auto",
              marginTop: "1rem",
              fontSize: ".75rem",
            }}
            onClick={async (e) => {
              await handleUpdateTask();
              action();
            }}
          >
            Lưu
          </Button>
        }
      </div>
    </div>
  );
}

export default FormAddNewTask;
