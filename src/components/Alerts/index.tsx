import { Alert, Box, Snackbar, Stack, Typography } from "@mui/material";

import React from "react";
import Swal from "sweetalert2";
import { CircularLoader } from "../Monitors";
import "./styles.css";

export interface AlertProps {
  title: string;
  text: string;
  icon?: "warning" | "error" | "success" | "info" | "question";
  showCancelButton?: boolean;
  confirmButtonColor?: string;
  cancelButtonColor?: string;
  confirmButtonText?: string;
  cancelButtonText?: string;
  onConfirm?: () => void;
}

export const ConfirmDialog = ({
  title,
  text,
  icon = "warning",
  showCancelButton = true,
  confirmButtonColor = "#db1212",
  cancelButtonColor = "#bababa",
  confirmButtonText = "Yes, Delete",
  cancelButtonText = "No, Cancel",
  onConfirm = () => {},
}: AlertProps) => {
  return Swal.fire({
    title,
    text,
    icon,
    showCancelButton,
    confirmButtonColor,
    cancelButtonColor,
    confirmButtonText,
    cancelButtonText,
  }).then((res: any) => {
    if (res.isConfirmed) {
      onConfirm();
    }
  });
};

export interface SnackProps {
  open: boolean;
  message: string;
  type: "success" | "info" | "warning" | "error";
  handleClose?: () => void;
  anchorOrigin?: {
    vertical: "top" | "bottom";
    horizontal: "left" | "center" | "right";
  };
  duration?: number;
}

export const CustomSnackBar = ({
  open = false,
  message = "",
  type = "success",
  handleClose = () => {},
  anchorOrigin = {
    vertical: "bottom",
    horizontal: "right",
  },
  duration = 6000,
}: SnackProps) => {
  return (
    <Snackbar
      open={open}
      anchorOrigin={anchorOrigin}
      autoHideDuration={duration}
      onClose={handleClose}
    >
      <Alert severity={type} sx={{ width: "100%" }} variant="filled">
        {message}
      </Alert>
    </Snackbar>
  );
};

export interface ErrorPageProps {
  title: string;
  error: Error;
}

export const ErrorPage = ({ error, title="Oops!" }: ErrorPageProps) => {
 return (
    <Stack className="network-error">
      <Box className="svg"></Box>
      <Box>
        <Typography variant="h4" align="center">
          {title}
        </Typography>
        <Typography align="center">{error.message}</Typography>
      </Box>
    </Stack>
  );
}

export interface PageConstructionProps {
  feature: string;
  mobile?: string;
  email?: string;
  delay?: number;
}

export const PageConstruction = ( { feature="", mobile = "+254 708 113 456", email = "ochomrichard752@gmail.com", delay = 3000 }: PageConstructionProps) => {
  const [loading, setLoading] = React.useState(true);

  React.useEffect(() => {
    const myTimeout = setTimeout(() => {
      setLoading(false);
    }, delay);
    return () => clearTimeout(myTimeout);
  }, []);

  if (loading) return <CircularLoader />;

  return (
    <Stack className="page-under-construction">
      <Box className="svg"></Box>
      <Box>
        <Typography variant="h4" align="center">
          {feature} Feature Coming Soon
        </Typography>
        <Box sx={{ py: 2 }}>
          <Typography align="center">
            If you want to check in on the development, you are welcome to
            contribute.
          </Typography>
          <Typography align="center">
            Call Us: <b>{mobile}</b> or Email Us:{" "}
            <b>{email}</b>
          </Typography>
        </Box>
      </Box>
    </Stack>
  );
};
