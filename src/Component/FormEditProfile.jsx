import { MdOutlineClose } from 'react-icons/md';
import { Button } from '@mui/material';
import Input from './Input';
import DropDown from './DropDown';
import { useState } from 'react';
import { toast } from 'react-toastify';
import Service from '../Service';
import WaitLoadApi from './WaitLoadApi';
import Modal from './Modal';
import { useDispatch, useSelector } from 'react-redux';
import { loginAction } from '../Store/dataLoginSlice';
import Util from '../Util';

function FormEditProfile({ action, userId, doneStep = () => {}, setProfile, data }) {
    const dataLogin = useSelector((state) => state.reducer.dataLogin);
    const dispatch = useDispatch();
    const [waitCreate, setWaitCreate] = useState(false);
    const [name, setName] = useState(data.full_name);
    const [address, setAddress] = useState(data.address);
    const [work, setWork] = useState(data.role_work);
    const [description, setDescription] = useState(data.description);
    const [phoneNumber, setPhoneNumber] = useState(data.phone_number);
    const [email, setEmail] = useState(data.email || 'Updating...');
    const [open, setOpen] = useState(false);
    const [yourWorks, setYourWorks] = useState([
        'AI (Artificial Intelligence)',
        'Cybersecurity',
        'Blockchain',
        'IoT (Internet of Things)',
        'Data Science & Analytics',
        'Cloud Computing',
        'VR/AR (Virtual Reality/Augmented Reality)',
        'Robotics',
        'Biotechnology',
        'Renewable Energy',
        'other',
    ]);

    const renderOptions = () => {
        return yourWorks.map((w, index) => {
            return (
                <li
                    key={index}
                    onClick={(e) => {
                        setWork(w);
                        e.stopPropagation();
                        setOpen(false);
                    }}
                    className="w-full cursor-pointer text-xs p-2 rounded-md  hover:dark:bg-blur-dark hover:bg-blur-light"
                >
                    {w}
                </li>
            );
        });
    };
    const verifyData = () => {
        if (!name) {
            return {
                status: false,
                message: 'Vui lòng nhập tên của bạn!',
            };
        }
        if (!address) {
            return {
                status: false,
                message: 'Vui lòng nhập address của bạn!',
            };
        }
        if (!work) {
            return {
                status: false,
                message: 'Vui lòng chọn công việc của bạn!',
            };
        }
        if (!description) {
            return {
                status: false,
                message: 'Vui lòng nhập mô tả về bạn!',
            };
        }
        if (!phoneNumber) {
            return {
                status: false,
                message: 'Vui lòng nhập số điện thoại của bạn!',
            };
        }
        if (!email) {
            return {
                status: false,
                message: 'Vui lòng nhập số điện thoại của bạn!',
            };
        }
        const checkPhone = Util.isValidPhoneNumber(phoneNumber);
        if (!checkPhone) {
            return {
                status: false,
                message: 'Số điện thoại không hợp lệ!',
            };
        }
        const checkEmail = Util.isEmail(email);
        if (!checkEmail) {
            return {
                status: false,
                message: 'Email không hợp lệ!',
            };
        }
        return true;
    };

    const checkEditData = () => {
        if (
            phoneNumber === data.phone_number &&
            email === data.email &&
            description === data.description &&
            work === data.role_work &&
            address === data.address &&
            name === data.name
        ) {
            return false;
        }
        return true;
    };
    const updateProfile = async () => {
        const check = verifyData();

        if (check !== true) {
            toast.warning(check.message, {
                position: toast.POSITION.TOP_CENTER,
                autoClose: 2000,
            });
            return;
        }

        const checkEditedData = checkEditData();

        if (checkEditedData) {
            await createNewProfile();
            dispatch(
                loginAction.login({
                    ...dataLogin,
                    email: email,
                }),
            );
        }

        doneStep();
    };

    const createNewProfile = async () => {
        if (userId) {
            const data = {
                fullName: name,
                address: address,
                description,
                roleWork: work,
                userId,
                phone_number: phoneNumber,
                email: email,
            };
            setWaitCreate(true);
            const result = await Service.update('/user/profile', data);
            if (result.data.status === true) {
                setProfile(JSON.parse(result.data.profile));
                toast.success('Chỉnh sửa hồ sơ thành công!', {
                    position: toast.POSITION.TOP_CENTER,
                    autoClose: 2000,
                });
            } else {
                toast.error('Chỉnh sửa hồ sơ thất bại!', {
                    position: toast.POSITION.TOP_CENTER,
                    autoClose: 2000,
                });
            }
            setWaitCreate(false);
            doneStep();
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
            {waitCreate && (
                <Modal open={true}>
                    <WaitLoadApi></WaitLoadApi>
                </Modal>
            )}
            <div
                onClick={action}
                className="p-2 rounded-full hover:bg-blur-light hover:dark:bg-blur-dark cursor-pointer w-fit absolute right-2 top-2"
            >
                <MdOutlineClose></MdOutlineClose>
            </div>
            <h1 className="text-md border-b-4 border-solid border-primary rounded-sm w-fit">Chỉnh sửa hồ sơ của bạn</h1>
            <div>
                <div className="p-2text-black dark:text-white h-max ">
                    <h5 className="text-sm mt-5  rounded-sm w-fit">Chỉnh sửa tên của bạn</h5>
                    <Input
                        value={name}
                        onChange={(e) => {
                            setName(e.target.value);
                        }}
                        placeholder="ví dụ: Trần Hữu Tài"
                        className={'mt-2 h-8 rounded-md text-sm pl-2'}
                    ></Input>
                    <h5 className="text-sm mt-5  rounded-sm w-fit">Chỉnh sửa email của bạn</h5>
                    <Input
                        value={email}
                        onChange={(e) => {
                            setEmail(e.target.value);
                        }}
                        className={'mt-2 h-8 rounded-md text-sm pl-2'}
                    ></Input>
                    <h5 className="text-sm mt-5  rounded-sm w-fit">Chỉnh sửa số điện thoại của bạn</h5>
                    <Input
                        value={phoneNumber}
                        onChange={(e) => setPhoneNumber(e.target.value)}
                        placeholder="ví dụ: 0376XXXXXX"
                        type="phoneNumber"
                        className={'mt-2 h-8 rounded-md text-sm pl-2'}
                    ></Input>
                    <h5 className="text-sm mt-5  rounded-sm w-fit">Chỉnh sửa địa chỉ của bạn</h5>
                    <Input
                        value={address}
                        onChange={(e) => setAddress(e.target.value)}
                        placeholder="ví dụ: HCM City"
                        type="address"
                        className={'mt-2 h-8 rounded-md text-sm pl-2'}
                    ></Input>
                    <h5 className="text-sm mt-5  rounded-sm w-fit">Bạn là</h5>

                    <DropDown
                        className={''}
                        open={open}
                        setOpen={setOpen}
                        drop={
                            <Input
                                value={work}
                                onChange={(e) => setWork(e.target.value)}
                                onFocus={(e) => setOpen(true)}
                                placeholder="ví dụ: website developer"
                                className={'mt-2 h-8 rounded-md text-sm w-full p-0'}
                            ></Input>
                        }
                    >
                        <ul className="w-full max-h-[12rem] overflow-auto" onClick={(e) => setOpen(true)}>
                            {renderOptions()}
                        </ul>
                    </DropDown>
                    <h5 className="text-xs mt-5  rounded-sm w-fit">Chỉnh sửa môt tả của bạn</h5>
                    <textarea
                        value={description}
                        onChange={(e) => setDescription(e.target.value)}
                        className="w-full text-sm bg-light-third dark:bg-dark-third reset p-2 mt-2 rounded-md focus:border-primary border-1 border-solid border-transparent"
                        placeholder="ví dụ : ..."
                    ></textarea>
                </div>
            </div>
            <div className="justify-center items-center flex w-full ">
                <Button
                    sx={{
                        marginLeft: 'auto',
                        marginRight: 'auto',
                        marginTop: '1rem',
                        fontSize: '.75rem',
                    }}
                    onClick={updateProfile}
                >
                    Lưu lại
                </Button>
            </div>
        </div>
    );
}

export default FormEditProfile;
