import { useRef } from 'react';
import { Avatar, Button } from '@mui/material';
import { useEffect, useState } from 'react';
import FormCreateProfile from '../../../Component/FormCreateProfile';
import FormChangePassword from '../../../Component/FormChangePassword';
import { useSelector } from 'react-redux';
import Service from '../../../Service';
import InfoUser from './InfoUser';
import Drawer from './Drawer';
import Modal from '../../../Component/Modal';
import FormEditProfile from '../../../Component/FormEditProfile';
import WaitLoadApi from '../../../Component/WaitLoadApi';

import { AiOutlineCamera } from 'react-icons/ai';
import { uploadImage } from '../../../firebase/index';
import { toast } from 'react-toastify';
import { useDispatch } from 'react-redux';
import { loginAction } from '../../../Store/dataLoginSlice';
import Util from '../../../Util';

function Setting({ setActive, preActive }) {
    const dispatch = useDispatch();
    const uploadAvatar = useRef(null);
    const uploadBackground = useRef(null);
    const [profileExist, setProfileExist] = useState(true);
    const [showDrawer, setShowDrawer] = useState(false);
    const dataLogin = useSelector((state) => state.reducer.dataLogin);
    const [openModalCreateProfile, setOpenModalCreateProfile] = useState(false);
    const [changePassword, setChangePassword] = useState(false);
    const [editProfile, setEditProfile] = useState(false);
    const [background, setBackground] = useState(null);
    const [waitUploadImage, setWaitUploadImage] = useState(false);
    const [profile, setProfile] = useState(null);

    useEffect(() => {
        const checkProfileExist = async () => {
            if (dataLogin.id) {
                const check = await Service.getDataFromApi('/user/profile/check-exist', `/?userId=${dataLogin.id}`);
                setProfileExist(check.exist);
                setShowDrawer(!check.exist);
            }
        };
        checkProfileExist();
    }, []);
    useEffect(() => {
        const getProfile = async () => {
            if (dataLogin.id) {
                const check = await Service.getDataFromApi('/user/profile', `/?userId=${dataLogin.id}`);
                const data = JSON.parse(check.data);
                setProfile(data);
                setBackground(data?.background);
            }
        };
        getProfile();
    }, []);

    useEffect(() => {
        const handleSaveLogin = (data) => {
            const encryptedData = Util.encryptObject(data, Util.secretKey);
            localStorage.setItem(Util.hashString('login'), encryptedData);
        };
        if (dataLogin) handleSaveLogin(dataLogin);
    }, [dataLogin]);

    const uploadAvatarImg = () => {
        if (uploadAvatar && uploadAvatar.current) {
            uploadAvatar.current.click();
        }
    };
    const uploadBackgroundImage = () => {
        if (uploadBackground && uploadBackground.current) {
            uploadBackground.current.click();
        }
    };

    const handleUploadAvatar = async (e) => {
        setWaitUploadImage(true);

        const result = await uploadImage(e.target.files[0]);
        if (result) {
            const uploadAvatarToDB = await Service.update('/user/avatar', {
                avatar: result,
                userId: dataLogin.id,
            });
            setWaitUploadImage(false);

            dispatch(
                loginAction.login({
                    ...dataLogin,
                    photoURL: result,
                }),
            );
            if (uploadAvatarToDB.data.status === true) {
                toast.success('Thay đổi ảnh đại diện thành công!', {
                    position: toast.POSITION.TOP_CENTER,
                    autoClose: 2000,
                });

                return;
            }
        }
        setWaitUploadImage(false);

        toast.error('Thay đổi ảnh đại diện thất bại!', {
            position: toast.POSITION.TOP_CENTER,
            autoClose: 2000,
        });
    };
    const handleUploadBackground = async (e) => {
        setWaitUploadImage(true);

        const result = await uploadImage(e.target.files[0]);
        if (result) {
            const uploadAvatarToDB = await Service.update('/user/profile/background', {
                userId: dataLogin.id,
                background: result,
            });
            setWaitUploadImage(false);

            if (uploadAvatarToDB.data.status === true) {
                setBackground(result);
                toast.success('Thay đổi ảnh nền thành công!', {
                    position: toast.POSITION.TOP_CENTER,
                    autoClose: 2000,
                });

                return;
            }
        }
        setWaitUploadImage(false);

        toast.error('Thay đổi ảnh nền thất bại!', {
            position: toast.POSITION.TOP_CENTER,
            autoClose: 2000,
        });
    };

    return (
        <>
            <Drawer
                open={showDrawer}
                setOpen={setShowDrawer}
                dataLogin={dataLogin}
                setActive={setActive}
                preActive={preActive}
                setProfileExist={setProfileExist}
            />
            <input
                ref={uploadAvatar}
                accept="img/*"
                type="file"
                className="hidden"
                onChange={handleUploadAvatar}
            ></input>
            <input
                ref={uploadBackground}
                accept="img/*"
                type="file"
                className="hidden"
                onChange={handleUploadBackground}
            ></input>

            {waitUploadImage && <WaitLoadApi />}

            {profileExist && (
                <div className=" max-w-[90%] mb-20 mt-10 ml-auto mr-auto p-4 rounded-md ">
                    <div
                        className=" relative bg-contain z-2 rounded-md h-[20rem] group"
                        style={{
                            background: `${
                                background
                                    ? `url(${background}) `
                                    : 'linear-gradient(90deg, rgba(40,28,237,.4) 0%, rgba(239,0,255,.5) 78%)'
                            }`,
                        }}
                    >
                        <div
                            onClick={uploadBackgroundImage}
                            className="hidden group-hover:flex z-45 justify-center items-center backdrop-blur-md bg-[rgba(0,0,0,0.1)] cursor-pointer absolute top-0 left-0 text-[#ccc] bottom-0 right-0"
                        >
                            <h5 className="">Chon anh tieu su</h5>
                        </div>
                    </div>
                    <div className="group w-full flex justify-center items-center cursor-pointer -translate-y-1/2">
                        <Avatar
                            alt={dataLogin.displayName}
                            src={dataLogin.photoURL}
                            sx={{ width: 100, height: 100 }}
                        ></Avatar>
                        <AiOutlineCamera
                            onClick={uploadAvatarImg}
                            className="group-hover:block hidden text-primary scale-125 absolute right-1/2 top-1/2 translate-x-1/2 -translate-y-1/2"
                        ></AiOutlineCamera>
                    </div>

                    <InfoUser setEditProfile={setEditProfile} data={profile} dataLogin={dataLogin}></InfoUser>
                    {!dataLogin.isLoginOtherPlatform && (
                        <button
                            onClick={() => setChangePassword(true)}
                            type="button"
                            className="py-2.5 mt-5 px-5 mr-2 mb-2 text-sm font-medium text-gray-900 focus:outline-none rounded-lg border hover:bg-gray-100 hover:text-blue-700 focus:z-10 focus:ring-4 focus:ring-gray-200 dark:focus:ring-gray-700 dark:bg-gray-800 dark:text-gray-400 dark:border-gray-600 dark:hover:text-white dark:hover:bg-gray-700"
                        >
                            Chỉnh sửa mật khẩu
                        </button>
                    )}
                </div>
            )}

            <Modal open={openModalCreateProfile} setOpen={setOpenModalCreateProfile}>
                <FormCreateProfile
                    action={(e) => setOpenModalCreateProfile(false)}
                    userId={dataLogin.id}
                    setProfile={setProfile}
                ></FormCreateProfile>
            </Modal>
            {profile && (
                <Modal open={editProfile} setOpen={setEditProfile}>
                    <FormEditProfile
                        action={() => setEditProfile(false)}
                        userId={dataLogin.id}
                        setProfile={setProfile}
                        data={profile}
                        doneStep={() => {
                            setEditProfile(false);
                        }}
                    ></FormEditProfile>
                </Modal>
            )}

            <Modal open={changePassword} setOpen={setChangePassword}>
                <FormChangePassword dataLogin={dataLogin} action={(e) => setChangePassword(false)}></FormChangePassword>
            </Modal>
        </>
    );
}

export default Setting;
