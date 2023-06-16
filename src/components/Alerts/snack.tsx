import { Alert, Slide, Snackbar } from "@mui/material";
import React from "react";
import { SnackAlertProps } from "./props";

const TransitionUp = (props: any) => {
  return <Slide {...props} direction="left" />;
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
