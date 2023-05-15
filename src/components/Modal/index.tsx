import styled from "@emotion/styled";
import React, { createRef, useEffect, useRef } from "react";

const Dialog = styled.dialog`
  background-color: white;
  border-radius: 0.5rem;
  border: none;
  min-width: 300px;
  min-height: 50px;
  overflow: auto;
  margin: auto;
  margin-top: 50px;
  margin-top: 10vh;
  animation: fadeInOut 0.3s ease-in-out;
  opacity: 0;
  &[open] {
    opacity: 1;
    animation: fadeIn 0.3s ease-in-out;
  }

  @keyframes fadeIn {
    from {
      opacity: 0;
    }
    to {
      opacity: 1;
    }
  }

  @keyframes fadeInOut {
    0% {
      opacity: 0;
    }
    50% {
      opacity: 1;
    }
    100% {
      opacity: 0;
    }
  }

  &::backdrop {
    background-color: #0000007f;
  }
  &.small {
    width: 400px;
  }
  &.medium {
    width: 500px;
  }
  &.large {
    width: 700px;
  }
  &.full {
    width: 90%;
    height: 90%;
    margin: 5%;
  }
`;

const Title = styled.div`
  height: 50px;
  font-size: 1.2rem;
  font-weight: 500;
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 2rem 1.5rem;
  border-bottom: 1px solid #eee;
`;

const ModalClose = styled.button`
  cursor: pointer;
  border: none;
  background-color: transparent;
  padding: 0.3rem;
  border-radius: 0.3rem;
  margin: 0;
  transition: all 0.3s ease-in-out;
  display: flex;
  align-items: center;
  justify-content: center;
  svg {
    width: 24px;
    height: 24px;
    fill: #000;
  }
  &:hover {
    background-color: #eee;
    svg {
      fill: #666;
    }
  }
`;

const ModalContent = styled.div`
  padding: 1.5rem;
`;

const CloseButton = () => {
  return (
    <svg
      width="24"
      height="24"
      viewBox="0 0 24 24"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path d="M19 6.41L17.59 5 12 10.59 6.41 5 5 6.41 10.59 12 5 17.59 6.41 19 12 13.41 17.59 19 19 17.59 13.41 12z" />
    </svg>
  );
};

export interface ModalProps {
  isOpen: boolean;
  showClose?: boolean;
  handleClose: () => void;
  title: string;
  children: React.ReactNode;
  size?: "small" | "medium" | "large" | "full";
}

export const Modal = ({
  isOpen,
  handleClose,
  title,
  showClose = false,
  children,
  size = "medium",
}: ModalProps) => {
  const modalRef: any = useRef(null);

  useEffect(() => {
    if (isOpen) {
      modalRef.current?.showModal();
    } else {
      modalRef.current?.close();
    }
  }, [isOpen, modalRef.current]);

  useEffect(() => {
    const handleEscape = (event: any) => {
      if (event.key === "Escape" && isOpen) {
        handleClose();
      }
    };
    window.addEventListener("keydown", handleEscape);
    return () => {
      window.removeEventListener("keydown", handleEscape);
    };
  }, []);

  return (
    <Dialog className={`${size}`} ref={modalRef}>
      <Title>
        <span>{title}</span>
        {showClose && (
          <ModalClose
            type="button"
            onClick={handleClose}
            children={<CloseButton />}
          />
        )}
      </Title>
      <ModalContent>{children}</ModalContent>
    </Dialog>
  );
};

export default Modal;
