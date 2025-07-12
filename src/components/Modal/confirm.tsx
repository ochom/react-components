import { Button, Stack, Typography } from "@mui/material";
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
  message: string;
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
      <Stack sx={{ p: 3, pt: 0 }} spacing={2}>
        <Typography>{dialog.message}</Typography>
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
