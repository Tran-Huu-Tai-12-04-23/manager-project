import { useState } from 'react';

import LanguageIcon from '@mui/icons-material/Language';
import InfoSmallProject from './InfoSmallProject';
import AddIcon from '@mui/icons-material/Add';

import Header from '../Header';
import { Button } from '@mui/material';
import Navigate from '../Navigate';
import MainManagerProject from '../MainManagerProject';
import { IoIosArrowBack } from 'react-icons/io';
import { useSelector } from 'react-redux';
import Alert from '@mui/material/Alert';

function ManagerProject({ setOpenModalAddNewProject }) {
    const [showSideBar, setShowSideBar] = useState(true);
    const [activeTab, setActiveTab] = useState(0);
    const projects = useSelector((state) => state.reducer.projects);
    const projectDetail = useSelector((state) => state.reducer.projectDetail);
    const [amountPreview, setAmountPreview] = useState(2);

    return (
        <div
            className="font-family flex justify-start  "
            style={{
                width: 'calc(100% - 3.5rem)',
                height: 'calc(100% - 4rem)',
            }}
        >
            <div
                onClick={(e) => setShowSideBar(!showSideBar)}
                style={{
                    zIndex: '2',
                }}
                className={`${
                    showSideBar ? 'left-48 ' : ' left-10  rotate-180 '
                } transition-all fixed backdrop-blur-xl p-2  rounded-md   justify-center top-3  w-fit hover:dark:bg-dark-second hover:bg-light-second cursor-pointer items-center flex dark:bg-blur-dark bg-blur-light`}
            >
                <IoIosArrowBack className="text-md text-gray-500"></IoIosArrowBack>
            </div>

            {showSideBar && (
                <div
                    style={{
                        transform: showSideBar ? '' : 'translateX(-15rem)',
                        opacity: showSideBar ? '1' : 0,
                        width: '12rem',
                    }}
                    className=" transition-all w-15rem h-screen p-2 border-r-1 border-blur-light dark:border-blur-dark border-solid "
                >
                    <h1 className="font-family font-bold text-sm border-b-4 border-solid border-blur-light dark:border-blur-dark rounded-sm">
                        Dự án của bạn
                    </h1>
                    <div className="col-span-10 mt-10 ">
                        {projects.map((pr, index) => {
                            if (amountPreview > index) {
                                return <InfoSmallProject key={index} data={pr}></InfoSmallProject>;
                            }
                        })}
                    </div>
                    {amountPreview < projects.length && (
                        <h1
                            onClick={(e) => setAmountPreview((prev) => prev + 5)}
                            className="font-family text-xs font-bold text-center hover:text-primary cursor-pointer"
                        >
                            Xem thêm
                        </h1>
                    )}

                    <div className="mt-10 ml-auto mr-auto w-fit">
                        <Button
                            startIcon={<AddIcon></AddIcon>}
                            sx={{
                                backgroundColor: 'transparent',
                                color: 'inherit',
                                fontSize: '0.725rem',
                                border: '1px dashed rgba(255, 255, 255, .1)',
                            }}
                            onClick={(e) => setOpenModalAddNewProject(true)}
                        >
                            Thêm mới dự án
                        </Button>
                    </div>
                </div>
            )}

            <div
                className="flex-shrink-0 "
                style={{
                    width: showSideBar ? 'calc(100% - 12rem)' : '100%',
                }}
            >
                <Header></Header>
                {projectDetail && (
                    <>
                        <Navigate setActiveTab={setActiveTab} activeTab={activeTab} />
                        <MainManagerProject activeTab={activeTab}></MainManagerProject>
                    </>
                )}
                {!projectDetail && (
                    <Alert
                        severity="info"
                        sx={{
                            margin: '2rem',
                            background: 'rgba(24, 147, 213, .2)',
                            backdropFilter: 'blur(20px)',
                            color: 'inherit',
                        }}
                    >
                        Vui lòng chọn dự án!
                    </Alert>
                )}
            </div>
        </div>
    );
}

export default ManagerProject;
