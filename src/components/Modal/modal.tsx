import { Dialog, DialogTitle } from "@mui/material";
import React from "react";

export interface ModalProps {
  open: boolean;
  showClose?: boolean;
  onClose?: () => void;
  title?: React.ReactNode;
  children: React.ReactNode;
  size?: "small" | "medium" | "large" | "full";
  width?: number | string;
  contentStyle?: any;
}

export const Modal = (props: ModalProps) => {
  return (
    <Dialog
      open={props.open}
      onClose={() => {
        if (props.onClose) {
          props.onClose();
        }
      }}
    >
      {props.title && <DialogTitle>{props.title}</DialogTitle>}
      {props.children}
    </Dialog>
  );
};

export default Modal;
