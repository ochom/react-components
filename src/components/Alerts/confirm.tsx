import { Box, Stack, Typography } from "@mui/material"; 
import React, { createContext, useContext } from "react"; 
import { CButton, Modal } from "..";


export interface ConfirmProps {
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


const initState: ConfirmProps = { 
  title: "",
  message: "",
  showCancelButton: true,
  confirmButtonColor: "error",
  cancelButtonColor: "success",
  confirmButtonText: "Yes, Delete",
  cancelButtonText: "No, Cancel",
  onConfirm: () => {},
  onCancel: () => {},
};

export const ConfirmDialogContext = createContext({
  confirm: (options:ConfirmProps) => {},
});

export const ConfirmDialogProvider = ({ children }: any) => {
    const [open, setOpen] = React.useState(false);
  const [state, setState] = React.useState(initState);

  const handleClose = () => {
    setState(initState);
    setOpen(false);
  }

  const handleConfirm = () => {
    if (state.onConfirm) state.onConfirm();
    handleClose();
  };

  const handleCancel = () => {
    if (state.onCancel) state.onCancel();
    handleClose();
  };

  const confirm = (options: ConfirmProps) => {
    setState({ ...initState, ...options  });
    setOpen(true);
  };

  const buttons = [
    {
      text: state.confirmButtonText,
      color: state.confirmButtonColor,
      onClick: handleConfirm,
      hidden: false,
    },
    {
      text: state.cancelButtonText,
      color: state.cancelButtonColor,
      onClick: handleCancel,
      hidden: !state.showCancelButton,
    },
  ];

  return (
    <ConfirmDialogContext.Provider value={{ confirm }}>
      {children}
      <Modal
        isOpen={open}
        handleClose={handleClose}
        title={state.title}
        showClose={false}
      >
        <Box sx={{ width: "100%" }}>
          <Typography variant="body2">{state.message}</Typography>
          <Stack direction="row" spacing={2} sx={{ mt: 5 }}>
            {buttons.map((button, index) => (
              <CButton
                key={index}
                onClick={button.onClick}
                color={button.color}
                // hidden={button.hidden}
              >
                {button.text}
              </CButton>
            ))}
          </Stack>
        </Box>
      </Modal>
    </ConfirmDialogContext.Provider>
  );
};
