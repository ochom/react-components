import { Alert, Slide, Snackbar, SnackbarOrigin } from "@mui/material";
import React, { createContext, useContext, useState } from "react";
import { SnackAlertProps } from "./props";

const TransitionUp = (props: any) => {
  return <Slide {...props} direction="up" />;
};

function SnackAlert({ data, closeSnack }: SnackAlertProps) {
  const { type, open, message, duration, origin } = data;
  return (
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
  );
}

export default SnackAlert;
