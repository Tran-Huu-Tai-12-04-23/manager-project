import { MdOutlineClose } from 'react-icons/md';
import { Button } from '@mui/material';
import Input from './Input';
import { useState } from 'react';
import { toast } from 'react-toastify';
import CircularProgress from '@mui/material/CircularProgress';
import Util from '../Util';
import Service from '../Service';
import WaitLoadApi from './WaitLoadApi';
import Modal from './Modal';

function FormChangePassword({ action, dataLogin }) {
    const [password, setPassword] = useState('');
    const [oldPassword, setOldPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [email, setEmail] = useState(dataLogin?.email || 'Nhập');
    const [code, setCode] = useState('');
    const [confirmed, setConfirmed] = useState(false);
    const [waitSendEmail, setWaitSendEmail] = useState(false);
    const [changePasswordByEmail, setChangePasswordByEmail] = useState(false);
    const [waitChangePassword, setWaitChangePassword] = useState(false);
    const [isChangePassword, setIsChangePassword] = useState(false);

    const sendEmail = async () => {
        const checkEmail = Util.isEmail(email);
        if (!checkEmail) {
            toast.warning('Email không hợp lệ!', {
                position: toast.POSITION.TOP_CENTER,
                autoClose: 2000,
            });
        }
        setWaitSendEmail(true);
        const result = await Service.callApi('/user/send-email', {
            email: email,
        });
        setWaitSendEmail(false);

        if (result.status === true) {
            toast.success('Gửi email thành công, Vui lòng kiểm tra email của bạn!', {
                position: toast.POSITION.TOP_CENTER,
                autoClose: 2000,
            });
        } else {
            toast.error('Gửi email không thành công!', {
                position: toast.POSITION.TOP_CENTER,
                autoClose: 2000,
            });
        }
    };

    const verifyEmail = async () => {
        if (!code) {
            toast.warning('Vui lòng nhập mã code!', {
                position: toast.POSITION.TOP_CENTER,
                autoClose: 2000,
            });
            return;
        }
        const result = await Service.callApi('/user/verify-code', { email, code });
        if (result.status === false) {
            toast.error('Mã code bạn nhập không đúng, vui lòng nhập lại!', {
                position: toast.POSITION.TOP_CENTER,
                autoClose: 2000,
            });
            return;
        }
        toast.success('Xác thực email successfully!', {
            position: toast.POSITION.TOP_CENTER,
            autoClose: 2000,
        });
        setIsChangePassword(true);
    };
    const clear = () => {
        setPassword('');
        setOldPassword('');
        setConfirmPassword('');
    };
    const handleSaveNewPasswordWithOldPassword = async () => {
        if (!oldPassword) {
            toast.warning('Vui lòng nhập mật khẩu cũ của bạn!', {
                position: toast.POSITION.TOP_CENTER,
                autoClose: 2000,
            });
        }
        if (!password) {
            toast.warning('Vui lòng nhập mật khẩu mới của bạn!', {
                position: toast.POSITION.TOP_CENTER,
                autoClose: 2000,
            });
        }

        if (!confirmPassword) {
            toast.warning('Vui lòng xác nhận mật khẩu mới của bạn!', {
                position: toast.POSITION.TOP_CENTER,
                autoClose: 2000,
            });
        }

        if (confirmPassword !== password) {
            toast.warning('Xác nhận mật khẩu không trùng khớp, vui lòng nhập lại!', {
                position: toast.POSITION.TOP_CENTER,
                autoClose: 2000,
            });
        }
        setWaitChangePassword(true);
        const result = await Service.update('/user/password', {
            oldPassword: oldPassword,
            newPassword: password,
            newConfirmPassword: confirmPassword,
            userId: dataLogin.id,
        });
        setWaitChangePassword(false);

        if (result.data.status === true) {
            toast.success('Thay đổi mật khẩu thành công!', {
                position: toast.POSITION.TOP_CENTER,
                autoClose: 2000,
            });
            action();
            clear();
        } else {
            toast.error(result.data.message, {
                position: toast.POSITION.TOP_CENTER,
                autoClose: 2000,
            });
        }
    };

    const handleChangePassword = async () => {
        if (!password) {
            toast.warning('Vui lòng nhập mật khẩu mới của bạn!', {
                position: toast.POSITION.TOP_CENTER,
                autoClose: 2000,
            });
        }

        if (!confirmPassword) {
            toast.warning('Vui lòng xác nhận mật khẩu mới của bạn!', {
                position: toast.POSITION.TOP_CENTER,
                autoClose: 2000,
            });
        }

        setWaitChangePassword(true);
        const result = await Service.update('/user/password', {
            newPassword: password,
            newConfirmPassword: confirmPassword,
            userId: dataLogin.id,
        });
        setWaitChangePassword(false);

        if (result.data.status === true) {
            toast.success('Thay đổi mật khẩu thành công!', {
                position: toast.POSITION.TOP_CENTER,
                autoClose: 2000,
            });
            action();
            clear();
        } else {
            toast.error(result.data.message, {
                position: toast.POSITION.TOP_CENTER,
                autoClose: 2000,
            });
        }
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
            {waitChangePassword && (
                <Modal open={true} setOpen={() => {}}>
                    <WaitLoadApi></WaitLoadApi>
                </Modal>
            )}
            <div
                onClick={action}
                className="p-2 rounded-full hover:bg-blur-light hover:dark:bg-blur-dark cursor-pointer w-fit absolute right-2 top-2"
            >
                <MdOutlineClose></MdOutlineClose>
            </div>
            <h1 className="text-md border-b-4 border-solid border-primary rounded-sm w-fit">
                Thay đổi mật khẩu của bạn
            </h1>
            {!changePasswordByEmail && (
                <div className="p-2text-black dark:text-white h-max ">
                    <h5 className="text-sm mt-5 mb-2 rounded-sm w-fit">Nhập mật khẩu củ của bạn</h5>
                    <Input
                        value={oldPassword}
                        type="password"
                        onChange={(e) => {
                            setOldPassword(e.target.value);
                        }}
                        placeholder="########"
                        className={' h-8 rounded-md text-sm pl-2'}
                    ></Input>
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
                        <h5
                            onClick={(e) => setChangePasswordByEmail(true)}
                            className="mt-4  w-fit text-xs text-primary text-underline hover:brightness-125 hover:cursor-pointer"
                        >
                            Sử dụng email để đổi
                        </h5>
                        <div className="justify-center mt-5 items-center flex w-full ">
                            <Button
                                sx={{
                                    background: 'rgba(11, 90, 184, 0.2)',
                                    marginLeft: 'auto',
                                    padding: '0.4rem 2rem',
                                    marginRight: 'auto',
                                    textTransform: 'capitalize',
                                    '&:hover': {
                                        background: 'rgba(11, 90, 184, 0.8)',
                                        color: '#ffff',
                                    },
                                }}
                                onClick={handleSaveNewPasswordWithOldPassword}
                            >
                                Thay đổi
                            </Button>
                        </div>
                    </div>
                </div>
            )}

            {changePasswordByEmail && !isChangePassword && (
                <>
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
                        <button
                            onClick={async () => {
                                if (!waitSendEmail) {
                                    await sendEmail();
                                }
                            }}
                            className="reset text-xs p-2 ml-2 w-32 pt-2 pb-2 pl-4 pr-4 hover:brightness-125 cursor-pointer bg-light-third dark:bg-dark-third rounded-md"
                        >
                            {!waitSendEmail && 'Gửi'}
                            {waitSendEmail && (
                                <CircularProgress
                                    sx={{
                                        height: '14px!important',
                                        width: '14px!important',
                                    }}
                                />
                            )}
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
                    <h5
                        onClick={(e) => setChangePasswordByEmail(false)}
                        className="mt-4 w-fit text-xs text-primary text-underline hover:brightness-125 hover:cursor-pointer"
                    >
                        Sử dụng mật khẩu để đổi
                    </h5>
                    <div className="justify-center items-center flex w-full ">
                        <Button
                            sx={{
                                marginLeft: 'auto',
                                marginRight: 'auto',
                                marginTop: '1rem',
                                fontSize: '.75rem',
                            }}
                            onClick={verifyEmail}
                        >
                            Xác nhận
                        </Button>
                    </div>
                </>
            )}
            {isChangePassword && (
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
                    <div className="justify-center mt-5 items-center flex w-full ">
                        <Button
                            sx={{
                                background: 'rgba(11, 90, 184, 0.2)',
                                marginLeft: 'auto',
                                padding: '0.4rem 2rem',
                                marginRight: 'auto',
                                textTransform: 'capitalize',
                                '&:hover': {
                                    background: 'rgba(11, 90, 184, 0.8)',
                                    color: '#ffff',
                                },
                            }}
                            onClick={handleChangePassword}
                        >
                            Thay đổi
                        </Button>
                    </div>
                </div>
            )}
        </div>
    );
}

export default FormChangePassword;
