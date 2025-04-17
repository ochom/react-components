import { Card, Modal as ModalBox } from "@mui/material";
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

const sizes = {
  small: 300,
  medium: 500,
  large: 800,
  full: "100%",
};

export const Modal = (props: ModalProps) => {
  const width = props.width || sizes[props.size || "medium"];

  return (
    <ModalBox
      open={props.open}
      onClose={() => {
        if (props.onClose) {
          props.onClose();
        }
      }}
    >
      <Card
        sx={{
          width: width,
          maxWidth: "100%",
          maxHeight: "90vh",
          overflowY: "auto",
          ...props.contentStyle,
        }}
      >
        {props.children}
      </Card>
    </ModalBox>
  );
};

export default Modal;
