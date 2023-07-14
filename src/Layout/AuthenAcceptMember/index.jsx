import { Button } from "@mui/material";
import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import Service from "../../Service";

import { toast } from "react-toastify";


const AuthenAcceptMember = ({setIsInvite , isInvite}) => {
    const history = useNavigate();
    const dataLogin = useSelector(state => state.reducer.dataLogin);
    const [authenSuccess, setAuthenSuccess] = useState(false);

    useEffect(() => {
        const urlParams = new URLSearchParams(window.location.search);
        const token = urlParams.get('token');
        setIsInvite({
            process: true, 
            token: token, 
        });
        if( dataLogin.isLogin === false ) {
            // history('/sign');
        }
    }, [])

    const handleAcceptInvite = async() => {
        const result = await Service.getDataFromApi('/link/authentication-link-invite/', `?token=${isInvite.token}&userId=${dataLogin.id}`)
        if( result.status === true ) {
            toast.success("Bạn đã tham gia dự án!!", {
                position: toast.POSITION.TOP_CENTER,
                autoClose: 2000,
            });
            setAuthenSuccess(true);
        }else {
            toast.error(result.message, {
                position: toast.POSITION.TOP_CENTER,
                autoClose: 2000,
            });
        }
    }

    return <div className="flex justify-center items-center min-h-screen dark:text-white text-black overflow-hidden">
        {
            !authenSuccess && <div className="rounded-xl shadow-xl p-4 flex flex-col justify-center items-center h-32 bg-blur-light dark:bg-blur-dark backdrop-blur-xl">
                                <h5 className="text- font-family mt-2">Chấp nhận lời mời!</h5>
                                <Button 
                                    onClick={handleAcceptInvite}
                                    sx={{
                                        marginTop: '.5rem',
                                        fontSize: '.85rem'
                                    }}>
                                    Chấp nhận
                                </Button>
                            </div>
        }
        {
            authenSuccess && <div className="rounded-xl shadow-xl p-4 flex flex-col justify-center items-center h-32 bg-blur-light dark:bg-blur-dark backdrop-blur-xl"> 
                            <Button 
                                    onClick={e  => history('/')}
                                    sx={{
                                        marginTop: '.5rem',
                                        fontSize: '.85rem'
                                    }}>
                                   Quay về trang chủ
                            </Button>
                    </div>
        }
    </div>
}
export default AuthenAcceptMember;