import { Box, Stack, Typography } from "@mui/material";
import React from "react";
import { ConfirmModalProps } from "./props";
import Modal from "../Modal";
import { CButton } from "../Buttons";

function ConfirmModal(props: ConfirmModalProps) {
  const {
    data: { open, title, message },
    buttons,
    handleClose,
  } = props;
  return (
    <Modal
      isOpen={open}
      handleClose={handleClose}
      title={title}
      showClose={false}
    >
      <Box sx={{ width: "100%" }}>
        <Typography variant="body2">{message}</Typography>
        <Stack direction="row" spacing={2} sx={{ mt: 5 }}>
          {buttons.map((button, index) => (
            <CButton
              key={index}
              onClick={button.onClick}
              color={button.color}
              // hidden={button.hidden}
            >
              {button.text}
            </CButton>
          ))}
        </Stack>
      </Box>
    </Modal>
  );
}

export default ConfirmModal;
