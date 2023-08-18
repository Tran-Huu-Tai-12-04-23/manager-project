import { MdOutlineClose } from 'react-icons/md';
import { Button } from '@mui/material';
import Input from './Input';
import DropDown from './DropDown';
import { useState } from 'react';
import { toast } from 'react-toastify';
import CircularProgress from '@mui/material/CircularProgress';
import { Fade } from 'react-awesome-reveal';

function FormChangePassword({ action }) {
    const [passwordOld, setPasswordOld] = useState('');
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [email, setEmail] = useState('');
    const [code, setCode] = useState('');
    const [confirmed, setConfirmed] = useState(false);

    const confirmCode = () => {
        setConfirmed(true);
    };
    return (
        <div
            onClick={(e) => {
                e.stopPropagation();
            }}
            style={{
                backdropFilter: 'blur(20px)',
                maxHeight: 'calc(100vh - 6rem)',
            }}
            className="font-family relative p-4 text-black dark:text-white bg-light-second dark:bg-dark-second rounded-md min-w-40rem w-1/2"
        >
            <div
                onClick={action}
                className="p-2 rounded-full hover:bg-blur-light hover:dark:bg-blur-dark cursor-pointer w-fit absolute right-2 top-2"
            >
                <MdOutlineClose></MdOutlineClose>
            </div>
            <h1 className="text-md border-b-4 border-solid border-primary rounded-sm w-fit">
                Thay đổi mật khẩu của bạn
            </h1>
            {!confirmed && (
                <div className="p-2text-black dark:text-white h-max ">
                    <h5 className="text-sm mt-5 mb-2 rounded-sm w-fit">Nhập mật khẩu củ của bạn</h5>
                    <Input
                        value={passwordOld}
                        type="password"
                        onChange={(e) => {
                            setPasswordOld(e.target.value);
                        }}
                        placeholder="########"
                        className={' h-8 rounded-md text-sm pl-2'}
                    ></Input>
                    <h5 className="text-sm mt-5  rounded-sm w-fit">Email nhận mã code để khôi phục</h5>
                    <div className="justify-between items-center flex mt-2 ">
                        <Input
                            value={email}
                            onChange={(e) => {
                                setEmail(e.target.value);
                            }}
                            type="email"
                            placeholder="ví dụ: example@gmail.com"
                            className={'h-8 rounded-md text-sm pl-2'}
                        ></Input>
                        <button className="reset text-xs p-2 ml-2 pl-4 pr-4 hover:brightness-125 cursor-pointer bg-light-third dark:bg-dark-third rounded-md">
                            Gửi
                            {/* <CircularProgress
              sx={{
                height: "16px!important",
                width: "16px!important",
              }}
            /> */}
                        </button>
                    </div>
                    <h5 className="text-sm mt-5 mb-2 rounded-sm w-fit">Nhập mã code</h5>
                    <Input
                        value={code}
                        onChange={(e) => {
                            setCode(e.target.value);
                        }}
                        placeholder="hk12312"
                        className={' h-8 rounded-md text-sm pl-2'}
                    ></Input>
                    <div className="justify-center items-center flex w-full ">
                        <Button
                            sx={{
                                marginLeft: 'auto',
                                marginRight: 'auto',
                                marginTop: '1rem',
                                fontSize: '.75rem',
                            }}
                            onClick={confirmCode}
                        >
                            Tiếp
                        </Button>
                    </div>
                </div>
            )}
            {confirmed && (
                <Fade>
                    <div className="p-2text-black dark:text-white h-max ">
                        <h5 className="text-sm mt-5 mb-2 rounded-sm w-fit">Nhập mật khẩu mới</h5>
                        <Input
                            value={password}
                            type="password"
                            onChange={(e) => {
                                setPassword(e.target.value);
                            }}
                            placeholder="########"
                            className={' h-8 rounded-md text-sm pl-2'}
                        ></Input>
                        <h5 className="text-sm mt-5 mb-2 rounded-sm w-fit">Xác nhận mật khẩu mới</h5>
                        <Input
                            value={confirmPassword}
                            type="password"
                            onChange={(e) => {
                                setConfirmPassword(e.target.value);
                            }}
                            placeholder="########"
                            className={' h-8 rounded-md text-sm pl-2'}
                        ></Input>

                        <div className="justify-center items-center flex w-full ">
                            <Button
                                sx={{
                                    background: 'rgba(11, 90, 184, 0.2)',
                                    width: '10rem',
                                    marginLeft: 'auto',
                                    marginRight: 'auto',
                                    textTransform: 'capitalize',
                                    '&:hover': {
                                        background: 'rgba(11, 90, 184, 0.8)',
                                        color: '#ffff',
                                    },
                                }}
                                onClick={''}
                            >
                                Lưu lại
                            </Button>
                        </div>
                    </div>
                </Fade>
            )}
        </div>
    );
}

export default FormChangePassword;
