import { Alert, Slide, Snackbar, SnackbarOrigin } from "@mui/material";
import React, { createContext, useContext, useState } from "react";

const TransitionUp = (props: any) => {
  return <Slide {...props} direction="up" />;
};

export const SnackContext = createContext({
  snackSuccess: (message: string) => {},
  snackError: (message: string) => {},
  snackWarning: (message: string) => {},
  closeSnack: () => {},
});

export interface SnackProviderProps {
  duration?: number;
  origin?: SnackbarOrigin;
  children: any;
}

export const SnackProvider = ({
  duration = 3000,
  origin = { vertical: "bottom", horizontal: "right" },
  children,
}: SnackProviderProps) => {
  const [open, setOpen] = useState(false);
  const [message, setMessage] = useState("");
  const [type, setType] = useState<"success" | "error" | "warning">("success");

  const createSnack = (
    message: string,
    type: "success" | "error" | "warning"
  ) => {
    setMessage(message);
    setType(type);
    setOpen(true);
  };

  const closeSnack = () => {
    setOpen(false);
  };

  const snackSuccess = (message: string) => {
    createSnack(message, "success");
  };

  const snackError = (message: string) => {
    createSnack(message, "error");
  };

  const snackWarning = (message: string) => {
    createSnack(message, "warning");
  };

  const providerProps = {
    snackSuccess,
    snackError,
    snackWarning,
    closeSnack,
  };

  return (
    <SnackContext.Provider value={providerProps}>
      {children}
      <Snackbar
        open={open}
        anchorOrigin={origin}
        autoHideDuration={duration}
        onClose={() => closeSnack()}
        TransitionComponent={TransitionUp}
      >
        <Alert severity={type} sx={{ width: "100%" }}>
          {message}
        </Alert>
      </Snackbar>
    </SnackContext.Provider>
  );
};

