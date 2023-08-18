import { useState } from 'react';

import CloseIcon from '@mui/icons-material/Close';
import SearchIcon from '@mui/icons-material/Search';
import SettingsIcon from '@mui/icons-material/Settings';
import NotificationsNoneIcon from '@mui/icons-material/NotificationsNone';
import LightModeIcon from '@mui/icons-material/LightMode';
import DarkModeIcon from '@mui/icons-material/DarkMode';

import { Fade } from 'react-awesome-reveal';
import { BsTrash } from 'react-icons/bs';
import Input from '../../../Component/Input';
import { Avatar, Badge } from '@mui/material';

import { useDispatch, useSelector } from 'react-redux';
import { themeAction } from '../../../Store/themeSlice';

function Header({ setActive = () => {} }) {
    const dispatch = useDispatch();
    const theme = useSelector((state) => state.reducer.theme);
    const dataLogin = useSelector((state) => state.reducer.dataLogin);
    const numberTrash = useSelector((state) => state.reducer.numberTrash);

    const handleThemeSwitch = () => {
        dispatch(themeAction.switchTheme(theme == 'dark' ? 'light' : 'dark'));
    };

    const [search, setSearch] = useState('');

    return (
        <div
            style={{
                width: 'calc(100%)',
                height: '4rem',
            }}
            className="sticky backdrop-blur-lg dark:bg-[#111827] bg-[#f5f3f7] z-10  top-0 flex p-1 pl-4 pr-4 h-fit pt-2 pb-2 justify-between items-center border-b-1 border-solid border-blur-light dark:border-blur-dark"
        >
            <div className="relative w-fit  ">
                <Input
                    placeholder="Nhập từ khóa"
                    className="w-64 h-2 text-xs rounded-md pl-10"
                    value={search}
                    onChange={(e) => setSearch(e.target.value)}
                ></Input>
                {search && (
                    <Fade>
                        <CloseIcon
                            onClick={(e) => setSearch('')}
                            className="absolute right-2 text-xs scale-75 hover:text-red-500 cursor-pointer top-1/2 -translate-y-1/2"
                        ></CloseIcon>
                    </Fade>
                )}

                <SearchIcon className="z-0 absolute left-2  hover:text-primary cursor-pointer top-1/2 -translate-y-1/2"></SearchIcon>
            </div>
            <div className="justify-end items-center flex">
                {theme === 'light' && (
                    <LightModeIcon className="cursor-pointer mr-4" onClick={handleThemeSwitch}></LightModeIcon>
                )}
                {theme === 'dark' && (
                    <DarkModeIcon className="cursor-pointer mr-4" onClick={handleThemeSwitch}></DarkModeIcon>
                )}
                <SettingsIcon className="mr-2"></SettingsIcon>
                <Badge badgeContent={numberTrash} color="primary" onClick={(e) => setActive(6)}>
                    <BsTrash className="hover:text-primary cursor-pointer text-xl"></BsTrash>
                </Badge>
                <h5 className="ml-6 font-bold font-family  text-xs mr-2 text-primary">
                    Xin chào , {dataLogin?.displayName}
                </h5>
                <Avatar src={dataLogin?.photoURL} sx={{ width: 30, height: 30 }} title="test"></Avatar>
            </div>
        </div>
    );
}

export default Header;
