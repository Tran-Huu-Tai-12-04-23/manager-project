import { CircularProgress } from '@mui/material';

const WaitLoadApi = ({}) => {
    return (
        <div className="fixed top-0 z-[999999999]  bottom-0 right-0 left-0 bg-[rgba(0,0,0,0.5)] justify-center items-center flex">
            {/* <div className="loading">
                <span></span>
                <span></span>
                <span></span>
                <span></span>
                <span></span>
            </div> */}
            <CircularProgress></CircularProgress>
        </div>
    );
};

export default WaitLoadApi;
