import {
  Backdrop,
  Button,
  Card,
  Divider,
  Stack,
  Typography,
} from "@mui/material";
import { closeConfirm, confirm, useConfirmStore } from "./store";

type ButtonColor =
  | "primary"
  | "secondary"
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
    <Backdrop
      sx={(theme) => ({ zIndex: theme.zIndex.drawer + 1 })}
      open={isOpen}
      onClick={() => {
        closeConfirm();
      }}
    >
      <Card sx={{ py: 2, minWidth: 400 }}>
        <Typography variant="h6" fontWeight={500} sx={{ pl: 3 }}>
          {dialog.title}
        </Typography>
        <Divider />
        <Typography sx={{ px: 3, py: 1, pb: 2 }}>{dialog.message}</Typography>
        <Stack direction={"row"} spacing={2} sx={{ px: 3 }}>
          <Button
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
      </Card>
    </Backdrop>
  );
}

export function muiConfirm(props: ConfirmProps) {
  confirm(props);
}
