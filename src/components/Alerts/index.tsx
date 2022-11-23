import { Alert, Snackbar } from "@mui/material";

import React from "react";
import Swal from "sweetalert2";

export interface AlertProps {
  title: string;
  text: string;
  icon?: "warning" | "error" | "success" | "info" | "question";
  showCancelButton?: boolean;
  confirmButtonColor?: string;
  cancelButtonColor?: string;
  confirmButtonText?: string;
  cancelButtonText?: string;
  onConfirm?: () => void;
}

export const ConfirmDialog = ({
  title,
  text,
  icon = "warning",
  showCancelButton = true,
  confirmButtonColor = "#3085d6",
  cancelButtonColor = "#bababa",
  confirmButtonText = "Yes",
  cancelButtonText = "No",
  onConfirm = () => {},
}: AlertProps) => {
  return Swal.fire({
    title,
    text,
    icon,
    showCancelButton,
    confirmButtonColor,
    cancelButtonColor,
    confirmButtonText,
    cancelButtonText,
  }).then((res: any) => {
    if (res.isConfirmed) {
      onConfirm();
    }
  });
};

export interface SnackProps {
  open: boolean;
  message: string;
  severity: "success" | "info" | "warning" | "error";
  handleClose?: () => void;
  anchorOrigin?: {
    vertical: "top" | "bottom";
    horizontal: "left" | "center" | "right";
  };
  duration?: number;
}

export const CustomSnackBar = ({
  open = false,
  message = "",
  severity = "success",
  handleClose = () => {},
  anchorOrigin = {
    vertical: "bottom",
    horizontal: "right",
  },
  duration = 6000,
}: SnackProps) => {
  return (
    <Snackbar
      open={open}
      anchorOrigin={anchorOrigin}
      autoHideDuration={duration}
      onClose={handleClose}
    >
      <Alert severity={severity} sx={{ width: "100%" }} variant="filled">
        {message}
      </Alert>
    </Snackbar>
  );
};
