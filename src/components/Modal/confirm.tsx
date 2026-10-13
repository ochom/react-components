import { Box, Button, Stack } from "@mui/material";
import React from "react";
import { Modal } from "./modal";
import { closeConfirm, confirm, useConfirmStore } from "./store";

type ButtonColor =
  | "primary"
  | "secondary"
  | "success"
  | "info"
  | "warning"
  | "error"
  | "inherit";

export type ConfirmProps = {
  title: string;
  message: React.ReactNode;
  confirmButtonText?: string;
  cancelButtonText?: string;
  confirmButtonColor?: ButtonColor;
  cancelButtonColor?: ButtonColor;
  onConfirm: () => void;
  onCancel?: () => void;
};

export function ConfirmHost() {
  const { isOpen, dialog } = useConfirmStore();

  return (
    <Modal open={isOpen} title={dialog.title}>
      <Stack sx={{ p: 3, pt: 0 }} spacing={1}>
        <Box>{dialog.message}</Box>
        <Stack direction={"row"} spacing={3}>
          <Button
            size="small"
            variant="contained"
            color={dialog.confirmButtonColor || "primary"}
            onClick={() => {
              dialog.onConfirm();
              closeConfirm();
            }}
          >
            {dialog.confirmButtonText || "Yes, confirm"}
          </Button>
          <Button
            size="small"
            variant="outlined"
            color={dialog.cancelButtonColor || "error"}
            onClick={() => {
              if (dialog.onCancel) {
                dialog.onCancel();
              }

              closeConfirm();
            }}
          >
            {dialog.cancelButtonText || "Cancel"}
          </Button>
        </Stack>
      </Stack>
    </Modal>
  );
}

export function muiConfirm(props: ConfirmProps) {
  confirm(props);
}
