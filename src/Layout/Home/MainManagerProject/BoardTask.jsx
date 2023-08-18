import { memo, useState, useEffect } from 'react';
import { DragDropContext, Droppable } from '@hello-pangea/dnd';

import TaskBoardItem from '../../../Component/TaskBoardItem';
import AddIcon from '@mui/icons-material/Add';
import { Button, Tooltip } from '@mui/material';
import Input from '../../../Component/Input';
import { Fade } from 'react-awesome-reveal';

import SubNavTaskCol from './SubNavTaskCol';

import { MdClose } from 'react-icons/md';
import FormAddNewTask from './FormAddNewTask';

import ScrollContainer from 'react-indiana-drag-scroll';

import { taskAction } from '../../../Store/taskSlice';
import { projectAction } from '../../../Store/projectSlice';
import { projectDetailAction } from '../../../Store/projectDetailSlice';
import { useDispatch } from 'react-redux';
import { useSelector } from 'react-redux';
import Service from '../../../Service';
import WaitLoadApi from '../../../Component/WaitLoadApi';
import Modal from '../../../Component/Modal';

function BoardTask() {
    const dispatch = useDispatch();
    const [openModalAddNewTask, setOpenModalAddNewTask] = useState(false);
    const [addListTask, setAddListTask] = useState(false);
    const [nameListTask, setNameListTask] = useState('');
    const projectDetail = useSelector((state) => state.reducer.projectDetail);
    const tasks = useSelector((state) => state.reducer.tasks);
    const dataLogin = useSelector((state) => state.reducer.dataLogin);
    const [projectId, setProjectId] = useState(null);
    const [dataCol, setDataCol] = useState(null);
    const [dataChangeTaskFromCol, setDataChangeTaskFromCol] = useState(null);
    const [taskSelectToEdit, setTaskSelectToEdit] = useState(null);
    const [waitAddCol, setWaitAddCol] = useState(false);

    const updateTaskInDatabase = async (idColTaskSource, idColTaskDes, draggableId) => {
        const result = await Service.callApi('/task/change-col-for-task', {
            colIdSource: idColTaskSource,
            colIdDes: idColTaskDes,
            taskId: draggableId,
        });
    };

    const onDragEnd = (result) => {
        const { res, dispatch, columns, setDataChangeTaskFromCol } = result;
        if (!res.destination) return;
        const { source, destination, draggableId } = res;
        const idColTaskSource = source.droppableId;
        const idColTaskDes = destination.droppableId;

        const indexSource = source.index;
        const indexDes = destination.index;

        if (source.droppableId !== destination.droppableId) {
            const sourceColumn = columns.find((col) => col._id === idColTaskSource);
            const destinationColumn = columns.find((col) => col._id === idColTaskDes);

            if (sourceColumn && destinationColumn) {
                const taskItemDrag = sourceColumn.tasks.find((task) => task._id === draggableId);
                if (taskItemDrag) {
                    dispatch(
                        projectDetailAction.removeTask({
                            taskId: draggableId,
                            colId: idColTaskSource,
                        }),
                    );
                    dispatch(
                        projectDetailAction.addTaskToCol({
                            task: taskItemDrag,
                            colId: idColTaskDes,
                        }),
                    );
                    setDataChangeTaskFromCol({
                        idColTaskSource,
                        idColTaskDes,
                        draggableId,
                    });
                }
            }
        } else {
            // Handle dragging within the same column
            // const column = columns.find((col) => col._id === idColTaskSource);
            // if (column) {
            //   const newTasks = Array.from(column.tasks);
            //   const [task] = newTasks.splice(indexSource, 1);
            //   newTasks.splice(indexDes, 0, task);
            //   dispatch(
            //     projectDetailAction.updateColumnTasks({
            //       colId: idColTaskSource,
            //       tasks: newTasks,
            //     })
            //   );
            //   const result = await Service.callApi("/project/update-tasks-order", {
            //     colId: idColTaskSource,
            //     tasks: newTasks,
            //   });
            //   console.log(result);
            // }
        }
    };

    const handleAddListTask = async () => {
        if (dataLogin.id && projectDetail._id && nameListTask) {
            setWaitAddCol(true);
            const result = await Service.callApi('/col/create-new-col', {
                userId: dataLogin.id,
                projectId: projectDetail._id,
                nameCol: nameListTask,
            });

            if (result.status === true) {
                let newCol = JSON.parse(result.data);
                setNameListTask('');
                setAddListTask(false);
                dispatch(
                    projectAction.addNewCol({
                        newCol,
                        projectId: projectDetail._id,
                    }),
                );
                dispatch(
                    projectDetailAction.addNewCol({
                        newCol,
                    }),
                );
                console.log('Create new col successfully!s');
            }
            setWaitAddCol(false);
        }
    };

    const handleSelectCol = (data) => {
        if (dataCol && data._id === dataCol._id) {
            setDataCol(null);
        } else {
            setDataCol(data);
        }
    };

    useEffect(() => {
        const handleUpdateDb = async () => {
            const result = await updateTaskInDatabase(
                dataChangeTaskFromCol.idColTaskSource,
                dataChangeTaskFromCol.idColTaskDes,
                dataChangeTaskFromCol.draggableId,
            );

            setDataChangeTaskFromCol(null);
        };
        if (dataChangeTaskFromCol) {
            handleUpdateDb();
        }
    }, [dataChangeTaskFromCol]);

    useEffect(() => {
        if (taskSelectToEdit) {
            setOpenModalAddNewTask(true);
        }
    }, [taskSelectToEdit]);

    return (
        <>
            <Fade>
                <div className="w-full overflow-auto p-4 custom-scrollbar scrollable-div">
                    {dataCol && (
                        <div
                            className="fixed transition-all  top-0 left-0 right-0 bottom-0 "
                            style={{
                                backgroundColor: 'rgba(0,0,0,0.6)',
                            }}
                            onClick={(e) => setDataCol(null)}
                        ></div>
                    )}

                    <DragDropContext
                        onDragEnd={(res) =>
                            onDragEnd(
                                (res = {
                                    res,
                                    dispatch,
                                    taskAction,
                                    columns: projectDetail.columns,
                                    setDataChangeTaskFromCol,
                                }),
                            )
                        }
                    >
                        <ScrollContainer ignoreElements=".ignore" style={{ overflow: 'auto' }}>
                            <div className="flex justify-start w-max ">
                                {projectDetail &&
                                    projectDetail.columns.map((data, index) => {
                                        const indexColNext = index + 1;
                                        return (
                                            <Droppable key={index} droppableId={data._id}>
                                                {(provided, snapshot) => (
                                                    <div
                                                        style={{
                                                            height: 'calc(100vh - 15rem)',
                                                        }}
                                                        className={`${
                                                            snapshot.draggingOverWith
                                                                ? 'bg-blur-light dark:bg-blur-dark'
                                                                : ''
                                                        } m-2 ${
                                                            dataCol?._id === data._id ? 'relative z-30' : ''
                                                        } rounded-xl flex  flex-col h-full w-15rem border-1 border-solid border-blur-light dark:border-blur-dark`}
                                                    >
                                                        <SubNavTaskCol
                                                            action={(e) => setProjectId(projectDetail._id)}
                                                            index={index}
                                                            lastIndex={projectDetail.columns.length - 1}
                                                            stepProject={projectDetail.columns[index]}
                                                            setOpenModalAddNewTask={setOpenModalAddNewTask}
                                                            setColSelect={(e) => {
                                                                handleSelectCol(data);
                                                            }}
                                                            dataCol={dataCol}
                                                            open={data._id === dataCol?._id}
                                                            projectDetail={projectDetail}
                                                        ></SubNavTaskCol>
                                                        <div
                                                            ref={provided.innerRef}
                                                            {...provided.droppableProps}
                                                            className={`flex flex-col pb-2 h-full hidden-scroll overflow-auto`}
                                                        >
                                                            {data?.tasks.map((task, index2) => {
                                                                const idNextCol = data[indexColNext]?.id;
                                                                return (
                                                                    <TaskBoardItem
                                                                        key={task._id}
                                                                        data={task}
                                                                        index={index2}
                                                                        idNextCol={idNextCol}
                                                                        setTaskSelectToEdit={setTaskSelectToEdit}
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
                                                width: '15rem',
                                                height: '30px',
                                                marginTop: '.6rem',
                                                borderRadius: '.6rem',
                                                backgroundColor: 'transparent',
                                                marginRight: '2rem',
                                                marginLeft: '.5rem',
                                                color: 'inherit',
                                                border: '1px dashed rgba(255, 255, 255, .1)',
                                            }}
                                            onClick={(e) => setAddListTask(true)}
                                        ></Button>
                                    </Tooltip>
                                )}

                                {addListTask && (
                                    <div className="ignore p-4 mt-2 border-1 w-20rem h-fit ml-2 mr-10 rounded-xl border-dashed border-blur-light dark:border-blur-dark">
                                        <Input
                                            placeholder={'Nhập tiêu đề danh sách'}
                                            className={'h-6 text-xs rounded-md'}
                                            onChange={(e) => setNameListTask(e.target.value)}
                                            value={nameListTask}
                                            onKeypressEnter={nameListTask}
                                        ></Input>

                                        <div className="mt-2 justify-start items-center flex">
                                            <Button
                                                sx={{
                                                    color: 'rgb(55, 94, 255)',
                                                    backgroundColor: 'rgba(55, 94, 255, .1)',
                                                    width: '4rem',
                                                    fontSize: '.75rem',
                                                    height: '1.5rem',
                                                    '&:hover': {
                                                        backgroundColor: 'rgba(55, 94, 255, .1)',
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
                                        {waitAddCol && (
                                            <div className="ml-aut mr-auto">
                                                <WaitLoadApi></WaitLoadApi>
                                            </div>
                                        )}
                                    </div>
                                )}
                            </div>
                        </ScrollContainer>
                    </DragDropContext>
                </div>

                <Modal
                    open={openModalAddNewTask}
                    setOpen={(e) => {
                        setOpenModalAddNewTask(!openModalAddNewTask);
                        setTaskSelectToEdit(null);
                    }}
                >
                    <FormAddNewTask
                        data={taskSelectToEdit}
                        type={taskSelectToEdit ? 'edit' : 'no-edit'}
                        action={(e) => {
                            setOpenModalAddNewTask(false);
                            setDataCol(null);
                            setTaskSelectToEdit(null);
                        }}
                        dataCol={dataCol}
                    ></FormAddNewTask>
                </Modal>
            </Fade>
        </>
    );
}

export default memo(BoardTask);
