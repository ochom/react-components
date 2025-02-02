import styled from "@emotion/styled";
import { Icon } from "@iconify/react";
import { Box, IconButton, useTheme } from "@mui/material";
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

const Dialog = styled(Box)`
  border-radius: 0.5rem;
  min-width: 300px;
  max-width: 90%;
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
  font-size: 1.2rem;
  font-weight: 500;
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 1rem 1.5rem;
  border-bottom: 1px solid #eee;
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
  const theme = useTheme();
  return (
    <BackDrop className={open ? "open" : "closed"}>
      <Dialog
        className={`${size} ${open ? "open" : "closed"}`}
        sx={{
          width: width ?? undefined,
          backgroundColor: theme.palette.background.paper,
        }}
      >
        {title && (
          <Title>
            <div>{title}</div>
            {showClose && (
              <IconButton type="button" onClick={onClose}>
                <Icon icon="material-symbols:close" />
              </IconButton>
            )}
          </Title>
        )}
        <div style={contentStyle}>{open && children}</div>
      </Dialog>
    </BackDrop>
  );
};

export default Modal;
