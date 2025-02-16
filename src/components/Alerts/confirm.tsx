import { Box, Button, Stack } from "@mui/material";
import React from "react";
import Modal from "../Modal";
import { ConfirmModalProps } from "./props";

function ConfirmModal(props: ConfirmModalProps) {
  const {
    data: { open, title, message, sx },
    buttons,
    handleClose,
  } = props;
  return (
    <Modal open={open} onClose={handleClose} title={title}>
      <Box sx={{ width: "100%", p: 3, pt: 0, ...sx }}>
        <Box sx={{ py: 3 }}>{message}</Box>
        <Stack direction="row" spacing={2} sx={{ mt: 2 }}>
          {buttons.map((button, index) => (
            <Button key={index} onClick={button.onClick} color={button.color}>
              {button.text}
            </Button>
          ))}
        </Stack>
      </Box>
    </Modal>
  );
}

export default ConfirmModal;
