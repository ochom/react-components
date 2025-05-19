import { Button, Divider, Stack, Typography } from "@mui/material";
import Modal from "./modal";
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
    <Modal open={isOpen}>
      <Stack sx={{ pb: 3 }}>
        <Typography variant="h6" fontWeight={500} sx={{ px: 3, mt: 1 }}>
          {dialog.title}
        </Typography>
        <Divider />
        <Typography sx={{ px: 3, py: 2 }}>{dialog.message}</Typography>
        <Stack direction={"row"} spacing={3} sx={{ px: 3 }}>
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
