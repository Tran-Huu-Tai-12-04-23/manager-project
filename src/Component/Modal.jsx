import React from "react";
import Modal from "@mui/material/Modal";

export default function ModalCustom({ open, setOpen, children }) {
  const handleClose = () => {
    setOpen(false);
  };

  return (
    <Modal
      sx={{
        color: "inherit",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
      }}
      open={open}
      onClose={handleClose}
    >
      <div>{children}</div>
    </Modal>
  );
}
