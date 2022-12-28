import "./styles.css";

import { Box, Stack, Typography } from "@mui/material";

import { CircularLoader } from "../Monitors";
import ConstructionSVG from "./construction-svg";
import NetworkErrorSVG from "./network-svg";
import React from "react";
import Swal from "sweetalert2";

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

export interface ErrorPageProps {
  title: string;
  error: Error;
}

export const ErrorPage = ({ error, title = "Oops!" }: ErrorPageProps) => {
  return (
    <Stack sx={{ width: "100%", py: 3 }}>
      <NetworkErrorSVG />
      <Box>
        <Typography variant="h6" align="center" color="primary">
          {title}
        </Typography>
        <Box sx={{ py: 1 }}>
          <Typography align="center">{error.message}</Typography>
        </Box>
      </Box>
    </Stack>
  );
};

export interface PageConstructionProps {
  feature: string;
  mobile?: string;
  email?: string;
  delay?: number;
  color?: string;
}

export const PageConstruction = ({
  feature = "",
  mobile = "+254 708 113 456",
  email = "ochomrichard752@gmail.com",
  delay = 3000,
  color = "grey",
}: PageConstructionProps) => {
  const [loading, setLoading] = React.useState(true);

  React.useEffect(() => {
    const myTimeout = setTimeout(() => {
      setLoading(false);
    }, delay);
    return () => clearTimeout(myTimeout);
  }, []);

  if (loading) return <CircularLoader />;

  return (
    <Stack sx={{ width: "100%", py: 3 }}>
      <ConstructionSVG color={color} />
      <Box>
        <Typography variant="h6" align="center" color="primary">
          {feature} Feature Coming Soon
        </Typography>
        <Box sx={{ py: 2 }}>
          <Typography align="center">
            If you want to check in on the development, you are welcome to
            contribute.
          </Typography>
          <Typography align="center">
            Call Us: <b>{mobile}</b> or Email Us: <b>{email}</b>
          </Typography>
        </Box>
      </Box>
    </Stack>
  );
};

export { SnackProvider, SnackContext } from "./snack";
