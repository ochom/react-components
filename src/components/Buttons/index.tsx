import { Button, ButtonProps } from "@mui/material";
import { LoadingButton, LoadingButtonProps } from "@mui/lab";

import React from "react";

const CButton = ({ children, ...rest }: ButtonProps) => {
  const { disableElevation = true } = rest;
  return (
    <Button
      variant="contained"
      color="primary"
      disableElevation={disableElevation}
      sx={{ textTransform: "none" }}
      {...rest}
    >
      {children}
    </Button>
  );
};

const LButton = ({ children, ...rest }: LoadingButtonProps) => {
  const { disableElevation = true } = rest;
  return (
    <LoadingButton
      variant="contained"
      color="primary"
      disableElevation={disableElevation}
      sx={{ textTransform: "none" }}
      {...rest}
    >
      {children}
    </LoadingButton>
  );
};

export { CButton, LButton };
