import React from 'react';

export default function ModalCustom({ open, setOpen, children }) {
    const handleClose = () => {
        setOpen(false);
    };

    return (
        <div
            onClick={handleClose}
            className={`${
                open ? '' : 'hidden'
            } fixed z-[80] flex justify-center items-center top-0 bottom-0 right-0 left-0  bg-[rgba(255,255,255,0.3)] dark:bg-[rgba(0,0,0,0.3)]`}
        >
            {children}
        </div>
    );
}
