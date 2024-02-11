import styled from "@emotion/styled";
import React from "react";

const BackDrop = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  width: 100vw;
  height: 100vh;
  z-index: 1500;
  background-color: rgba(0, 0, 0, 0.5);
  display: flex;
  flex-direction: column;
  transition: all 0.3s ease-in-out;
  &.closed {
    opacity: 0;
    visibility: hidden;
  }
  &.open {
    opacity: 1;
    visibility: visible;
  }
`;

const Dialog = styled.div`
  background-color: white;
  border-radius: 0.5rem;
  min-width: 300px;
  min-height: 50px;
  overflow: auto;
  display: block;
  margin: auto;
  margin-top: 50px;
  margin-top: 10vh;
  transition: all 0.5s ease-in-out;
  &.small {
    width: 400;
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
  &.open {
    opacity: 1;
    visibility: visible;
    margin-top: 50px;
  }
  &.closed {
    opacity: 0;
    visibility: hidden;
    margin-top: 0;
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

export interface ModalProps {
  open: boolean;
  showClose?: boolean;
  onClose?: () => void;
  title?: React.ReactNode;
  children: React.ReactNode;
  size?: "small" | "medium" | "large" | "full";
  width?: string;
  contentStyle?: any;
}

const Close = () => (
  <svg
    width="24"
    height="24"
    viewBox="0 0 24 24"
    xmlns="http://www.w3.org/2000/svg"
  >
    <path d="M19 6.41L17.59 5 12 10.59 6.41 5 5 6.41 10.59 12 5 17.59 6.41 19 12 13.41 17.59 19 19 17.59 13.41 12z" />
  </svg>
);

export const Modal = ({
  open,
  onClose,
  title,
  showClose = false,
  children,
  size = "medium",
  width,
  contentStyle = {},
}: ModalProps) => {
  return (
    <BackDrop className={open ? "open" : "closed"}>
      <Dialog
        className={`${size} ${open ? "open" : "closed"}`}
        style={{
          width: width ?? undefined,
        }}
      >
        {title && (
          <Title>
            <div>{title}</div>
            {showClose && (
              <ModalClose type="button" onClick={onClose}>
                <Close />
              </ModalClose>
            )}
          </Title>
        )}
        <div style={contentStyle}>{open ? children : null}</div>
      </Dialog>
    </BackDrop>
  );
};

export default Modal;
