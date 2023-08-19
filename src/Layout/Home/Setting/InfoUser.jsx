import { FiEdit } from 'react-icons/fi';
import { Tooltip } from '@mui/material';

function InfoUser({ data, dataLogin, setEditProfile }) {
    return (
        <div className="mt-5 relative">
            <h1 className="font-medium mt-5 mb-5">Giới thiệu về bạn</h1>
            {/* <h1 className="font-extralight absolute right-6 top-4 mt-6 text-[#757575]">Ai có thể xem?</h1> */}

            <div className="relative rounded-md border-solid dark:border-[rgba(255,255,255,0.1)] border-[rgba(0,0,0,0.1)] p-4 border-[1px]">
                <div>
                    <h5 className="font-bold">Họ tên đầy đủ</h5>
                    <div className="flex justify-between items-center mt-2">
                        <h5 className="font-extrabold text-[#757575]">{data?.full_name}</h5>
                    </div>
                </div>
                <div className="mt-2">
                    <h5 className="font-bold">Công việc hiện tại</h5>
                    <div className="flex justify-between items-center mt-2">
                        <h5 className="font-extrabold text-[#757575]">{data?.role_work}</h5>
                    </div>
                </div>
                <div className="mt-2">
                    <h5 className="font-bold">Địa chỉ hiện tại</h5>
                    <div className="flex justify-between items-center mt-2">
                        <h5 className="font-extrabold text-[#757575]">{data?.address}</h5>
                    </div>
                </div>
                <div className="mt-2">
                    <h5 className="font-bold">Số điện thoại</h5>
                    <div className="flex justify-between items-center mt-2">
                        <h5 className="font-extrabold text-[#757575]">{data?.phone_number}</h5>
                    </div>
                </div>

                <div className="mt-2">
                    <h5 className="font-bold">Email liên hệ</h5>
                    <div className="flex justify-between items-center mt-2">
                        <h5 className="font-extrabold text-[#757575]">
                            {data?.email ? data?.email : dataLogin?.email}
                        </h5>
                    </div>
                </div>

                <div className="mt-2">
                    <h5 className="font-bold">Mô tả về bạn</h5>
                    <div className="flex justify-between items-center mt-2">
                        <h5 className="font-extrabold text-[#757575]">{data?.description}</h5>
                    </div>
                </div>

                <Tooltip title={'Chỉnh sửa'}>
                    <div className="absolute right-10 bottom-10">
                        <FiEdit
                            onClick={() => setEditProfile(true)}
                            className="text-xl cursor-pointer hover:text-primary hover:scale-125 transition-all"
                        />
                    </div>
                </Tooltip>
            </div>
        </div>
    );
}

export default InfoUser;
