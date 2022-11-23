import { Modal, ModalBody, ModalHeader } from "reactstrap";

import { CircularLoader } from "../Monitors";
import React from "react";
import { Typography } from "@mui/material";

export interface ModalProps {
  isOpen: boolean;
  handleClose: () => void;
  title: string;
  children: React.ReactNode;
  loading?: boolean;
  error?: Error;
}

export default function CustomModal({
  isOpen,
  handleClose,
  title,
  children,
  loading,
  error,
}: ModalProps) {
  if (loading) return <CircularLoader />;
  if (error) return <Typography>{error.message}</Typography>;

  return (
    <Modal isOpen={isOpen}>
      <ModalHeader toggle={handleClose}>{title}</ModalHeader>
      <ModalBody style={{ padding: "20px 20px 30px 20px" }}>
        {children}
      </ModalBody>
    </Modal>
  );
}
