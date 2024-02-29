import { LoadingButton, LoadingButtonProps } from "@mui/lab";

import React from "react";

const CButton = ({ children, ...rest }: LoadingButtonProps) => {
  rest.sx = { textTransform: "none", ...rest.sx };
  rest = { disableElevation: true, ...rest };
  return (
    <LoadingButton variant="contained" color="primary" {...rest}>
      {rest?.title || children}
    </LoadingButton>
  );
};

export { CButton };
