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
    <Modal open={open} onClose={handleClose} title={title}>
      <Box sx={{ width: "100%" }}>
        {message}
        <Stack direction="row" spacing={2} sx={{ px: 3, pb: 3 }}>
          {buttons.map((button, index) => (
            <CButton key={index} onClick={button.onClick} color={button.color}>
              {button.text}
            </CButton>
          ))}
        </Stack>
      </Box>
    </Modal>
  );
}

export default ConfirmModal;
