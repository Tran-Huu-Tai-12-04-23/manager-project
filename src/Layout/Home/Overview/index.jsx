import { useState, memo } from 'react';

import { LuHistory } from 'react-icons/lu';
import { BsPersonWorkspace } from 'react-icons/bs';
import { MdOutlineAdd } from 'react-icons/md';
import CardProject from '../../../Component/CardProject';
import { Tooltip } from '@mui/material';
import { useSelector } from 'react-redux';
import WaitLoadApi from '../../../Component/WaitLoadApi';
import { AnimatePresence, motion } from 'framer-motion';
import FormAddNewProject from '../../../Component/FormAddNewProject';
import ModalConfirmRemove from '../../../Component/ModalConfirmRemove';
import Service from '../../../Service';
import { toast } from 'react-toastify';
import { projectAction } from '../../../Store/projectSlice';
import { numberTrashAction } from '../../../Store/numberTrashSlice';
import { useDispatch } from 'react-redux';

function Overview({ setOpenModalAddNewProject, setActive, waitCallApi }) {
    const dispatch = useDispatch();
    const projects = useSelector((state) => state.reducer.projects);
    const [waitLoad, setWaitLoad] = useState(false);
    const [editProject, setEditProject] = useState(false);
    const [projectSelect, setProjectSelect] = useState(null);
    const [projectSelectEdit, setProjectSelectEdit] = useState(null);
    const [projectSelectRemove, setProjectSelectRemove] = useState(null);

    const handleRemoveProject = async () => {
        const result = await Service.remove('/project/remove-soft-project', `/?projectId=${projectSelect._id}`);

        if (result.status === true) {
            toast.success(result.message, {
                position: toast.POSITION.TOP_CENTER,
                autoClose: 2000,
            });

            dispatch(projectAction.removeProject({ projectId: projectSelect._id }));
            setProjectSelect(null);
            setEditProject(false);
            dispatch(numberTrashAction.increase({ number: 1 }));
        } else {
            toast.error('Xóa không thành công!', {
                position: toast.POSITION.TOP_CENTER,
                autoClose: 2000,
            });
        }
    };

    return (
        <div
            className="p-4 w-full "
            style={{
                height: 'calc(100% - 4rem)',
            }}
        >
            <AnimatePresence>
                {projectSelectEdit && (
                    <motion.div
                        onClick={() => {
                            setProjectSelectEdit(null);
                        }}
                        className="fixed z-50 backdrop-blur-sm top-0 bottom-0 right-0 left-0"
                    >
                        <FormAddNewProject
                            data={projectSelect}
                            type="edit"
                            action={(e) => {
                                setProjectSelectEdit(null);
                            }}
                        ></FormAddNewProject>
                    </motion.div>
                )}
                {projectSelectRemove && (
                    <motion.div
                        onClick={() => {
                            setProjectSelectRemove(null);
                        }}
                        className="fixed z-50 backdrop-blur-sm top-0 bottom-0 right-0 left-0"
                    >
                        <ModalConfirmRemove
                            open={true}
                            setOpen={() => {
                                setProjectSelectRemove(null);
                            }}
                            action={async () => {
                                if (projectSelect) {
                                    await handleRemoveProject();
                                    setProjectSelectRemove(null);
                                }
                            }}
                        ></ModalConfirmRemove>
                    </motion.div>
                )}
            </AnimatePresence>
            {/* <Modal open={openModalEditProject} setOpen={setOpenModalEditProject}>
              
            </Modal> */}
            {editProject && (
                <div
                    className="fixed transition-all  top-0 left-0 right-0 bottom-0  z-30"
                    style={{
                        backgroundColor: 'rgba(0,0,0,0.6)',
                    }}
                    onClick={(e) => {
                        setEditProject(false);
                        setProjectSelect(null);
                    }}
                ></div>
            )}
            <div className="flex justify-start items-center">
                <LuHistory></LuHistory>
                <h5 className="font-family ml-2 font-bold text-md">Dự án đã xem gần đây</h5>
            </div>
            {waitLoad && (
                <div className="w-full flex justify-center items-center">
                    <WaitLoadApi></WaitLoadApi>
                </div>
            )}
            {!waitLoad && (
                <div className="grid grid-cols-5 mt-5 gap-5">
                    {/* {projects.map((project, index) => {
            return (
              <CardProject
                projectSelect={projectSelect}
                activeEdit={projectSelect?._id === project._id}
                handleEditProject={(e) => {
                  setEditProject(!editProject);
                }}
                ={setOpenModalAddNewProject}
                setProjectSelect={setProjectSelect}
                setActive={setActive}
                data={project}
                key={index}
                setEditProject={setEditProject}
              ></CardProject>
            );
          })} */}
                </div>
            )}
            <div className="flex justify-start mt-5 items-center">
                <BsPersonWorkspace></BsPersonWorkspace>
                <h5 className="font-family ml-2 font-bold text-md">Các dự án của bạn</h5>
            </div>

            {waitCallApi && (
                <div className="w-full flex justify-center items-center">
                    <WaitLoadApi></WaitLoadApi>
                </div>
            )}
            {!waitCallApi && (
                <div className="grid grid-cols-5 mt-5 gap-5">
                    {projects.map((project, index) => {
                        return (
                            <CardProject
                                projectSelectRemove={projectSelectRemove}
                                setProjectSelectRemove={setProjectSelectRemove}
                                projectSelectEdit={projectSelectEdit}
                                setProjectSelectEdit={setProjectSelectEdit}
                                projectSelect={projectSelect}
                                activeEdit={projectSelect?._id === project._id}
                                handleEditProject={(e) => {
                                    setEditProject(!editProject);
                                }}
                                setProjectSelect={setProjectSelect}
                                setActive={setActive}
                                data={project}
                                key={index}
                                setEditProject={setEditProject}
                            ></CardProject>
                        );
                    })}
                    <Tooltip title="Thêm dự án">
                        <div
                            onClick={(e) => setOpenModalAddNewProject(true)}
                            className=" cursor-pointer hover:brightness-125 w-full justify-center items-center flex bg-light-second dark:bg-dark-second rounded-xl"
                        >
                            <MdOutlineAdd className="text-3xl"></MdOutlineAdd>
                        </div>
                    </Tooltip>
                </div>
            )}
        </div>
    );
}

export default memo(Overview);
