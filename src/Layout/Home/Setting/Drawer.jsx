import { useState } from 'react';
import Modal from '../../../Component/Modal';
import { motion, AnimatePresence } from 'framer-motion';
import FormCreateProfile from '../../../Component/FormCreateProfile';

const variants = {
    open: { opacity: 1, x: 0 },
    closed: { opacity: 0, x: '-100%' },
};
function Drawer({ setProfileExist, open, setOpen, dataLogin = {}, preActive, setActive, setCheck }) {
    const handleClose = () => {
        setOpen(false);
        setActive(preActive);
    };
    const [step, setStep] = useState(null);

    return (
        <>
            <Modal open={open} setOpen={setOpen}>
                <motion.img
                    onClick={(e) => {
                        e.stopPropagation();
                    }}
                    initial={{ scale: 180, scale: 0 }}
                    animate={{ rotate: 0, scale: 1.2 }}
                    transition={{
                        type: 'spring',
                        damping: 20,
                        duration: 1,
                    }}
                    exit={{
                        scale: 180,
                        scale: 0,
                    }}
                    src={
                        'https://cdn.dribbble.com/userupload/9361731/file/original-35efe46cb6ce1226c2a563364912e9af.png?resize=1504x1128'
                    }
                ></motion.img>
                <div
                    className="fixed top-0 right-0 left-0 bottom-0 bg-[rgba(0,0,0,0.6)]"
                    onClick={(e) => {
                        e.stopPropagation();
                    }}
                >
                    <AnimatePresence>
                        {step && (
                            <motion.div
                                transition={{
                                    duration: 0.5,
                                }}
                                className="fixed top-0 bottom-0 left-0 right-0 flex justify-center items-center"
                                layoutId={step}
                            >
                                <FormCreateProfile
                                    action={(e) => {
                                        setStep(null);
                                    }}
                                    doneStep={() => {
                                        setStep(null);
                                        setProfileExist(true);
                                        setOpen(false);
                                    }}
                                    userId={dataLogin.id}
                                ></FormCreateProfile>
                            </motion.div>
                        )}
                    </AnimatePresence>
                </div>
                <motion.div
                    animate={open ? 'open' : 'closed'}
                    variants={variants}
                    onClick={(e) => {
                        e.stopPropagation();
                    }}
                    className={`fixed top-0 bottom-0 z-40 left-0  h-screen p-4 transition-transform  bg-white min-w-[10rem] w-[20%] dark:bg-gray-800`}
                >
                    <h5
                        id="drawer-left-label"
                        className="inline-flex items-center mb-4 text-base font-semibold text-gray-500 dark:text-gray-400"
                    >
                        <svg
                            className="w-4 h-4 mr-2.5 "
                            aria-hidden="true"
                            xmlns="http://www.w3.org/2000/svg"
                            fill="currentColor"
                            viewBox="0 0 20 20"
                        >
                            <path d="M10 .5a9.5 9.5 0 1 0 9.5 9.5A9.51 9.51 0 0 0 10 .5ZM9.5 4a1.5 1.5 0 1 1 0 3 1.5 1.5 0 0 1 0-3ZM12 15H8a1 1 0 0 1 0-2h1v-3H8a1 1 0 0 1 0-2h2a1 1 0 0 1 1 1v4h1a1 1 0 0 1 0 2Z" />
                        </svg>
                        Bắt đầu với hồ sơ của bạn
                    </h5>
                    <motion.div
                        className=" absolute top-2.5 right-2.5"
                        whileHover={{ scale: 1.2, rotate: 90 }}
                        whileTap={{
                            scale: 0.8,
                            rotate: -90,
                            borderRadius: '100%',
                        }}
                    >
                        <button
                            onClick={handleClose}
                            type="button"
                            className="text-gray-400 bg-transparent hover:bg-gray-200 hover:text-gray-900 rounded-lg text-sm w-8 h-8  inline-flex items-center justify-center dark:hover:bg-gray-600 dark:hover:text-white"
                        >
                            <svg
                                className="w-3 h-3"
                                aria-hidden="true"
                                xmlns="http://www.w3.org/2000/svg"
                                fill="none"
                                viewBox="0 0 14 14"
                            >
                                <path
                                    stroke="currentColor"
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                    strokeWidth="2"
                                    d="m1 1 6 6m0 0 6 6M7 7l6-6M7 7l-6 6"
                                />
                            </svg>
                            <span className="sr-only">Close menu</span>
                        </button>
                    </motion.div>
                    <p className="mb-6 text-sm text-gray-500 dark:text-gray-400">
                        Bắt đầu với hồ sơ của bạn để mọi người có thể xem được thông tin của nhau. Cùng nhau làm việc.
                    </p>
                    <motion.div
                        exit={{
                            opacity: 0,
                        }}
                        className="grid grid-cols-1 gap-4"
                        layoutId={1}
                        onClick={() => setStep(1)}
                    >
                        <a
                            href="#"
                            className="m-auto group inline-flex items-center px-4 py-2 text-sm font-medium text-center hover:text-white bg-[rgba(29,78,216,0.3)]  text-blue-500 rounded-lg hover:bg-blue-800 "
                        >
                            Bắt đầu
                            <svg
                                className="w-3.5 h-3.5 ml-4 group-hover:ml-6 transition-all"
                                aria-hidden="true"
                                xmlns="http://www.w3.org/2000/svg"
                                fill="none"
                                viewBox="0 0 14 10"
                            >
                                <path
                                    stroke="currentColor"
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                    strokeWidth="2"
                                    d="M1 5h12m0 0L9 1m4 4L9 9"
                                />
                            </svg>
                        </a>
                    </motion.div>
                </motion.div>
            </Modal>
        </>
    );
}

export default Drawer;
