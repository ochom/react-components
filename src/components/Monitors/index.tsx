import { Box, CircularProgress, LinearProgress } from "@mui/material";

import React from "react";

export function CircularLoader(props: any) {
  return (
    <Box className="py-5 d-flex justify-content-center">
      <CircularProgress />
    </Box>
  );
}

export function BarLoader(props: any) {
  return (
    <Box sx={{ width: "100%" }}>
      <LinearProgress variant="indeterminate" />
    </Box>
  );
}
