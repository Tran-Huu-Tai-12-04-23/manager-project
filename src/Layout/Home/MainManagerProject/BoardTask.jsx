import { memo, useState, useRef, useEffect } from "react";
import { v4 as uuid } from "uuid";
import { DragDropContext, Droppable } from "@hello-pangea/dnd";

import TaskBoardItem from "../../../Component/TaskBoardItem";
import AddIcon from "@mui/icons-material/Add";
import { Button, Tooltip } from "@mui/material";
import Input from "../../../Component/Input";
import { Fade, JackInTheBox } from "react-awesome-reveal";

import { taskAction } from "../../../Store/tasksSlice";
import { useDispatch } from "react-redux";
import SubNavTaskCol from "./SubNavTaskCol";

import { MdClose } from "react-icons/md";
import ModalCustom from "../../../Component/Modal";
import FormAddNewTask from "./FormAddNewTask";

import ScrollContainer from "react-indiana-drag-scroll";

function BoardTask({ tasksData }) {
  const dispatch = useDispatch();
  const [openModalAddNewTask, setOpenModalAddNewTask] = useState(false);
  const [addListTask, setAddListTask] = useState(false);
  const [nameListTask, setNameListTask] = useState("");

  const onDragEnd = (result) => {
    const { res, dispatch, taskAction, tasksData } = result;
    if (!res.destination) return;
    const { source, destination, draggableId } = res;
    const idColTaskSource = source.droppableId;
    const idColTaskDes = destination.droppableId;
    const listTaskSources = tasksData.find((task, index) => {
      return task.id === idColTaskSource;
    })?.tasks;
    let task = listTaskSources.find((t) => {
      return t.id.toString() === draggableId;
    });
    const index = tasksData.findIndex((task) => task.id === idColTaskDes);
    // status of the task equals with index of list tasks
    task = {
      ...task,
      status: index,
    };

    const indexSource = source.index;
    const indexDes = destination.index;
    if (source.droppableId === destination.droppableId) {
      if (indexSource !== indexDes) {
        dispatch(
          taskAction.changeOffsetTask({
            indexSource,
            indexDes,
            taskColId: idColTaskSource,
          })
        );
      }
    } else {
      dispatch(
        taskAction.removeTask({
          idTask: draggableId,
          idColTask: idColTaskSource,
        })
      );
      dispatch(
        taskAction.addTask({
          idColTask: idColTaskDes,
          newTask: task,
          index: indexDes,
        })
      );
    }
  };

  const handleAddListTask = () => {
    if (nameListTask) {
      setNameListTask("");
      setAddListTask(false);
      dispatch(
        taskAction.addListTask({
          nameListTask: nameListTask,
          idListTask: uuid(),
        })
      );
    }
  };

  return (
    <Fade>
      <div
        className="w-full h-full overflow-auto p-4 custom-scrollbar scrollable-div"
        style={{ cursor: "grab" }}
      >
        <DragDropContext
          onDragEnd={(res) =>
            onDragEnd((res = { res, dispatch, taskAction, tasksData }))
          }
        >
          <ScrollContainer
            ignoreElements=".ignore"
            style={{ overflow: "auto" }}
          >
            <div className="flex justify-start w-max ">
              {tasksData.map((data, index) => {
                const indexColNext = index + 1;
                return (
                  <Droppable key={data.id} droppableId={data.id}>
                    {(provided, snapshot) => (
                      <div
                        style={{
                          height: "calc(100vh - 14.1rem)",
                        }}
                        className={`${
                          snapshot.draggingOverWith
                            ? "bg-blur-light dark:bg-blur-dark"
                            : ""
                        } m-2 rounded-xl flex flex-col h-full w-15rem border-1 border-solid border-blur-light dark:border-blur-dark`}
                      >
                        <SubNavTaskCol
                          tasksData={data}
                          setOpenModalAddNewTask={setOpenModalAddNewTask}
                        ></SubNavTaskCol>
                        <div
                          ref={provided.innerRef}
                          {...provided.droppableProps}
                          className={`flex flex-col pb-2 h-full hidden-scroll overflow-auto`}
                        >
                          {data.tasks.map((task, index2) => {
                            const idNextCol = tasksData[indexColNext]?.id;
                            return (
                              <TaskBoardItem
                                key={task.id}
                                data={task}
                                index={index2}
                                checked={tasksData.length - 1 > task.status}
                                idCol={data.id}
                                idNextCol={idNextCol}
                              ></TaskBoardItem>
                            );
                          })}
                          {provided.placeholder}
                        </div>
                      </div>
                    )}
                  </Droppable>
                );
              })}
              {!addListTask && (
                <Tooltip title="Thêm danh sách" sx={{}}>
                  <Button
                    startIcon={<AddIcon className="ml-2"></AddIcon>}
                    sx={{
                      width: "15rem",
                      height: "30px",
                      marginTop: ".6rem",
                      borderRadius: ".6rem",
                      backgroundColor: "transparent",
                      marginRight: "2rem",
                      marginLeft: ".5rem",
                      color: "inherit",
                      border: "1px dashed rgba(255, 255, 255, .1)",
                    }}
                    onClick={(e) => setAddListTask(true)}
                  ></Button>
                </Tooltip>
              )}

              {addListTask && (
                <div className="ignore p-4 mt-2 border-1 w-20rem h-fit ml-2 mr-10 rounded-xl border-dashed border-blur-light dark:border-blur-dark">
                  <Input
                    placeholder={"Nhập tiêu đề danh sách"}
                    className={"h-6 text-xs"}
                    onChange={(e) => setNameListTask(e.target.value)}
                    value={nameListTask}
                    onKeypressEnter={nameListTask}
                  ></Input>

                  <div className="mt-2 justify-start items-center flex">
                    <Button
                      sx={{
                        color: "rgb(55, 94, 255)",
                        backgroundColor: "rgba(55, 94, 255, .1)",
                        width: "4rem",
                        fontSize: ".75rem",
                        height: "1.5rem",
                        "&:hover": {
                          backgroundColor: "rgba(55, 94, 255, .1)",
                        },
                      }}
                      onClick={handleAddListTask}
                    >
                      Thêm
                    </Button>
                    <MdClose
                      className="text-md hover:text-red-500 cursor-pointer ml-2"
                      onClick={(e) => setAddListTask(false)}
                    ></MdClose>
                  </div>
                </div>
              )}
            </div>
          </ScrollContainer>
        </DragDropContext>
      </div>

      <ModalCustom open={openModalAddNewTask} setOpen={setOpenModalAddNewTask}>
        <JackInTheBox duration={500}>
          <FormAddNewTask
            action={(e) => setOpenModalAddNewTask(false)}
          ></FormAddNewTask>
        </JackInTheBox>
      </ModalCustom>
    </Fade>
  );
}

export default memo(BoardTask);
