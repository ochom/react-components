import { Box, Typography } from "@mui/material";
import React from "react";

const Loading = () => {
  return (
    <Box
      sx={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        height: "100%",
      }}
    >
      <Typography variant="h6">Loading...</Typography>
    </Box>
  );
};

export default Loading;
