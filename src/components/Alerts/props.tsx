import { SnackbarOrigin } from "@mui/material";
import React from "react";

export type SupportedColors = "error" | "success" | "warning" | undefined;

export interface ConfirmProps {
  open: boolean;
  title: string;
  message: React.ReactNode;
  showCancelButton?: boolean;
  confirmButtonColor?: SupportedColors;
  cancelButtonColor?: SupportedColors;
  confirmButtonText?: string;
  cancelButtonText?: string;
  onConfirm?: () => void;
  onCancel?: () => void;
  sx: any;
}

export interface SnackProps {
  type: SupportedColors;
  open: boolean;
  message: string;
  duration?: number;
  origin?: SnackbarOrigin;
  variant?: "filled" | "outlined" | "standard";
  children: any;
}

export interface ConfirmModalProps {
  handleClose: () => void;
  buttons: any[];
  data: ConfirmProps;
}

export interface SnackAlertProps {
  data: SnackProps;
  closeSnack: () => void;
}
