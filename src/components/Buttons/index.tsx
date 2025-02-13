import { Button, ButtonProps } from "@mui/material";

import React from "react";

const CButton = ({ children, ...rest }: ButtonProps) => {
  rest.sx = { textTransform: "none", ...rest.sx };
  rest = { disableElevation: true, ...rest };
  return (
    <Button variant="contained" color="primary" {...rest}>
      {rest?.title ?? children}
    </Button>
  );
};

export { CButton };
