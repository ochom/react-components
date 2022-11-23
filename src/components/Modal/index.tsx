import { Modal, ModalBody, ModalHeader } from "reactstrap";

import React from "react";

export interface ModalProps {
  isOpen: boolean;
  handleClose: () => void;
  title: string;
  children: React.ReactNode;
}

export default function CustomModal({
  isOpen,
  handleClose,
  title,
  children,
}: ModalProps) {
  return (
    <Modal isOpen={isOpen}>
      <ModalHeader toggle={handleClose}>{title}</ModalHeader>
      <ModalBody style={{ padding: "20px 20px 30px 20px" }}>
        {children}
      </ModalBody>
    </Modal>
  );
}
