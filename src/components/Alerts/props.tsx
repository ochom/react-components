import { SnackbarOrigin } from "@mui/material";

export interface ConfirmProps {
    open: boolean;
    title: string;
    message: string; 
    showCancelButton?: boolean;
    confirmButtonColor?: "error" | "success" | "warning" | "info" | "primary" | "secondary" | "inherit" |   undefined;
    cancelButtonColor?:  "error" | "success" | "warning" | "info" | "primary" | "secondary" | "inherit"  | undefined;
    confirmButtonText?: string;
    cancelButtonText?: string;
    onConfirm?: () => void;
    onCancel?: () => void;
} 

export interface SnackProps {
    type: "success" | "error" | "warning";
    open: boolean; 
    message: string; 
    duration?: number;
    origin?: SnackbarOrigin;
    children: any;
}

export interface ConfirmModalProps  {
    handleClose: () => void;
    buttons: any[];
    data: ConfirmProps;
} 

export interface SnackAlertProps {
    data: SnackProps;
    closeSnack: () => void;
}