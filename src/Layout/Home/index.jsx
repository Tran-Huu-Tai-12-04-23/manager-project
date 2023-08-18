import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';

import MenuSideBar from './MenuSideBar';
import ManagerProject from './ManagerProject';
import Calender from '../../Component/Calender';
import Statistic from './Statistic';
import Overview from './Overview';
import Setting from './Setting';
import Trash from './Trash';

import { useSelector, useDispatch } from 'react-redux';
import { projectAction } from '../../Store/projectSlice';
import Header from './Header';
import Service from '../../Service';

const Home = ({ setOpenModalAddNewProject }) => {
    const [active, setActive] = useState(0);
    const [preActive, setPreActive] = useState(0);
    const history = useNavigate();
    const dataLogin = useSelector((state) => state.reducer.dataLogin);
    const dispatch = useDispatch();
    const [waitCallApi, setWaitCallApi] = useState(true);

    useEffect(() => {
        if (!dataLogin.isLogin) {
            history('/sign');
        }
    }, []);

    useEffect(() => {
        const intiProjects = async () => {
            const result = await Service.getDataFromApi('/project/get-projects', `/?user_id=${dataLogin.id}`);
            if (result.status === true) {
                dispatch(projectAction.init(JSON.parse(result.data)));
            }
            setWaitCallApi(false);
        };

        if (dataLogin.id) intiProjects();
    }, []);

    return (
        <div className="dark:text-white text-black font-primary min-h-screen w-screen overflow-hidden flex justify-start">
            <MenuSideBar active={active} setActive={setActive} setPreActive={setPreActive}></MenuSideBar>
            {active === 1 && <ManagerProject setOpenModalAddNewProject={setOpenModalAddNewProject}></ManagerProject>}
            {active !== 1 && (
                <div className="w-full h-screen overflow-auto">
                    {active !== 1 && <Header setActive={setActive}></Header>}
                    {active === 0 && (
                        <Overview
                            waitCallApi={waitCallApi}
                            setActive={setActive}
                            setOpenModalAddNewProject={setOpenModalAddNewProject}
                        ></Overview>
                    )}

                    {active === 2 && (
                        <div className="w-full">
                            <h1 className="pt-4 pl-0  ml-4 text-md border-b-4 border-solid border-primary w-fit mb-4 font-bold font-family">
                                Lịch hoạt động
                            </h1>
                            <Calender />
                        </div>
                    )}

                    {active === 3 && <Statistic></Statistic>}
                    {active === 4 && <Setting setActive={setActive} preActive={preActive}></Setting>}
                    {active === 6 && <Trash></Trash>}
                </div>
            )}
        </div>
    );
};
export default Home;
