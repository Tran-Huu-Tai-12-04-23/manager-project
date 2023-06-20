import { memo, useState, useRef, useEffect } from "react";
import { v4 as uuid } from "uuid";
import { DragDropContext, Droppable } from "@hello-pangea/dnd";

import TaskBoardItem from "../../../Component/TaskBoardItem";
import AddIcon from "@mui/icons-material/Add";
import { Button, Tooltip } from "@mui/material";
import Input from "../../../Component/Input";
import { Fade, JackInTheBox } from "react-awesome-reveal";

import SubNavTaskCol from "./SubNavTaskCol";

import { MdClose } from "react-icons/md";
import ModalCustom from "../../../Component/Modal";
import FormAddNewTask from "./FormAddNewTask";

import ScrollContainer from "react-indiana-drag-scroll";

import { taskAction } from "../../../Store/taskSlice";
import { useDispatch } from "react-redux";
import { useSelector } from "react-redux";
import Service from "../../../Service";

function BoardTask() {
  const dispatch = useDispatch();
  const [openModalAddNewTask, setOpenModalAddNewTask] = useState(false);
  const [addListTask, setAddListTask] = useState(false);
  const [nameListTask, setNameListTask] = useState("");
  const projectDetail = useSelector((state) => state.reducer.projectDetail);
  const tasks = useSelector((state) => state.reducer.tasks);
  const [projectId, setProjectId] = useState(null);
  const [indexTask, setIndexTask] = useState(0);

  const onDragEnd = (result) => {
    const { res, dispatch, taskAction, tasks } = result;
    if (!res.destination) return;
    const { source, destination, draggableId } = res;
    const idColTaskSource = source.droppableId;
    const idColTaskDes = destination.droppableId;

    const taskDrag = tasks.find((task) => task._id === draggableId);

    const indexSource = source.index;
    const indexDes = destination.index;
    let taskOfCol = [];
    if (source.droppableId != destination.droppableId) {
      dispatch(
        taskAction.changeStepTask({
          taskId: draggableId,
          index: destination.droppableId,
        })
      );
      taskOfCol = tasks.filter((task) => task.index_task_step == idColTaskDes);
    } else {
      taskOfCol = tasks.filter(
        (task) => task.index_task_step == idColTaskSource
      );
    }
    console.log(taskOfCol);
    console.log(destination);
    const taskDes = taskOfCol.find((task, index) => index === indexDes);
    const taskDes2 = taskOfCol.find((task, index) => index === indexDes + 1);
    const order1 = taskDes?.order;
    const order2 = taskDes2?.order;
    console.log({ order1, order2 });
    let newOrder = 0;
    if (order2) {
      newOrder = (+order1 + +order2) / 2;
    } else {
      newOrder = +order1 + 1;
    }
    if (indexDes === 0) {
      newOrder = +order1 - 0.5;
    }
    if (!order1 && !order2) {
      newOrder = 0;
    }
    console.log(newOrder);

    if (indexDes === indexSource && idColTaskDes === idColTaskSource) {
      return;
    }
    dispatch(
      taskAction.changeOrder({
        taskId: draggableId,
        newOrder: newOrder,
      })
    );
    dispatch(taskAction.sortTasks());
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

  useEffect(() => {
    const initTaskOfProject = async () => {
      const result = await Service.getDataFromApi(
        "/project/get-tasks",
        `/?project_id=${projectDetail._id}`
      );

      if (result.status === true) {
        dispatch(taskAction.init(JSON.parse(result.data)));
      }
    };

    initTaskOfProject();
  }, [projectDetail]);

  return (
    <Fade>
      <div
        className="w-full h-full overflow-auto p-4 custom-scrollbar scrollable-div"
        style={{ cursor: "grab" }}
      >
        <DragDropContext
          onDragEnd={(res) =>
            onDragEnd((res = { res, dispatch, taskAction, tasks }))
          }
        >
          <ScrollContainer
            ignoreElements=".ignore"
            style={{ overflow: "auto" }}
          >
            <div className="flex justify-start w-max ">
              {projectDetail.step.map((data, index) => {
                const indexColNext = index + 1;
                return (
                  <Droppable
                    key={data.index}
                    droppableId={data.index.toString()}
                  >
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
                          action={(e) => setProjectId(projectDetail._id)}
                          index={index}
                          lastIndex={projectDetail.step.length - 1}
                          stepProject={projectDetail.step[index]}
                          setOpenModalAddNewTask={setOpenModalAddNewTask}
                          setIndexTask={setIndexTask}
                        ></SubNavTaskCol>
                        <div
                          ref={provided.innerRef}
                          {...provided.droppableProps}
                          className={`flex flex-col pb-2 h-full hidden-scroll overflow-auto`}
                        >
                          {tasks.map((task, index2) => {
                            const idNextCol =
                              projectDetail.step[indexColNext]?.id;
                            const check = task.index_task_step == index;

                            if (check === true) {
                              return (
                                <TaskBoardItem
                                  key={task._id}
                                  data={task}
                                  index={index2}
                                  checked={
                                    projectDetail.step.length - 1 > task.status
                                  }
                                  idCol={data.index.toString()}
                                  idNextCol={idNextCol}
                                ></TaskBoardItem>
                              );
                            }
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
                    className={"h-6 text-xs rounded-md"}
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
            projectId={projectId}
            indexTask={indexTask}
          ></FormAddNewTask>
        </JackInTheBox>
      </ModalCustom>
    </Fade>
  );
}

export default memo(BoardTask);
