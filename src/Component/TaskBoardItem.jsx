import { memo, useEffect, useState } from 'react';
import { Draggable } from '@hello-pangea/dnd';
import { useDispatch, useSelector } from 'react-redux';
import { taskAction } from '../Store/taskSlice';

import { CircularProgress, Tooltip } from '@mui/material';
import { CiEdit } from 'react-icons/ci';
import { BsTrash } from 'react-icons/bs';
import Service from '../Service';
import { toast } from 'react-toastify';

import Modal from '../Component/Modal';
import ModalConfirmRemove from '../Component/ModalConfirmRemove';
import { projectAction } from '../Store/projectSlice';
import { projectDetailAction } from '../Store/projectDetailSlice';

function TaskBoardItem({ data, index, setTaskSelectToEdit }) {
    const projectDetail = useSelector((state) => state.reducer.projectDetail);
    const [checkDone, setCheckDone] = useState(false);
    const dispatch = useDispatch();
    const [priorityName, setPriorityName] = useState('Thấp');
    const [showFeature, setShowFeature] = useState(false);
    const [showModalConfirmRemove, setShowModalConfirmRemove] = useState(false);
    const [waitCallApi, setWaitCallApi] = useState(false);

    const handleRemoveProject = async () => {
        if (data) {
            setWaitCallApi(true);
            const result = await Service.remove('/task/remove', `/?taskId=${data._id}`);

            if (result.status === true) {
                toast.success('Xóa thành công!', {
                    position: toast.POSITION.TOP_CENTER,
                    autoClose: 2000,
                });
                dispatch(taskAction.removeTask({ taskId: data._id }));
                dispatch(projectAction.removeTask({ taskId: data._id, projectId: projectDetail._id }));
                dispatch(projectDetailAction.removeTaskOnlyTaskId({ taskId: data._id }));
                setShowModalConfirmRemove(false);
            } else {
                toast.error('Xóa Không thành công!', {
                    position: toast.POSITION.TOP_CENTER,
                    autoClose: 2000,
                });
            }

            setWaitCallApi(false);
        }
    };

    useEffect(() => {
        if (data.priority === 0) {
            setPriorityName('Thấp');
        } else if (data.priority == 1) {
            setPriorityName('Vừa');
        } else if (data.priority == 2) {
            setPriorityName('Cao');
        } else if (data.priority == 3) {
            setPriorityName('Emergency');
        }
    }, [data]);

    useEffect(() => {
        if (checkDone === true) {
            let status = data.status + 1;
            data = { ...data, status: status };
        }
    }, [checkDone]);

    return (
        <>
            <Draggable key={data._id} draggableId={data._id} index={index}>
                {(provided, snapshot) => {
                    return (
                        <div
                            ref={provided.innerRef}
                            {...provided.draggableProps}
                            {...provided.dragHandleProps}
                            onMouseOver={(e) => setShowFeature(true)}
                            onMouseLeave={(e) => setShowFeature(false)}
                            className={`${
                                snapshot.isDragging ? 'drop-shadow-2xl' : ''
                            } ignore flex-shrink-0 overflow-hidden cursor-grab mt-2 ml-2 mr-2 p-3 rounded-xl bg-blur-light dark:bg-dark-primary`}
                        >
                            <div
                                className="transition-all "
                                style={{
                                    height: showFeature ? '5.5rem' : '3.5rem',
                                }}
                            >
                                <div className={`justify-between flex`}>
                                    <div
                                        className={`p-1 h-fit rounded-md w-14 text-xs text-center ${
                                            data.priority == '0'
                                                ? 'bg-low text-low'
                                                : data.priority == '1'
                                                ? 'bg-medium text-medium'
                                                : 'bg-high text-high'
                                        }`}
                                    >
                                        {priorityName}
                                    </div>
                                </div>
                                <div className="flex justify-between items-center">
                                    <h1 className="capitalize text-sm h-4 truncate text-ellipsis font-family font-bold mt-2 w-full">
                                        {data.name}
                                    </h1>
                                    <h1 className=" text-xs text-end text-blur-light dark:text-blur-dark font-family font-bold mt-2 text-clip w-full">
                                        {new Date(data.createdAt).toLocaleDateString()}
                                    </h1>
                                </div>

                                <div
                                    className="w-full flex mt-2 items-center justify-end transition-all"
                                    style={{
                                        display: showFeature ? 'flex' : 'none',
                                    }}
                                >
                                    <CiEdit
                                        onClick={(e) => {
                                            setTaskSelectToEdit(data);
                                        }}
                                        className="text-2xl mr-2 mt-2 hover:text-primary cursor-pointer"
                                    />
                                    <BsTrash
                                        onClick={(e) => {
                                            setShowModalConfirmRemove(true);
                                        }}
                                        className="text-xl mt-2 hover:text-rose-700 cursor-pointer"
                                    />
                                </div>
                            </div>
                        </div>
                    );
                }}
            </Draggable>

            <Modal open={showModalConfirmRemove} setOpen={setShowModalConfirmRemove}>
                <ModalConfirmRemove
                    action={handleRemoveProject}
                    open={showModalConfirmRemove}
                    setOpen={setShowModalConfirmRemove}
                ></ModalConfirmRemove>
            </Modal>

            {waitCallApi && (
                <div className="z-[1000000] fixed top-0 bottom-0 left-0 right-0 bg-[rgba(0,0,0,.4)] justify-center items-center flex">
                    <CircularProgress></CircularProgress>
                </div>
            )}
        </>
    );
}

export default memo(TaskBoardItem);
