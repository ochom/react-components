import { Box, Stack, Typography } from "@mui/material";

import ConstructionSVG from "../../assets/construction-svg";
import NetworkErrorSVG from "../../assets/network-svg";

export interface ErrorPageProps {
  title?: string;
  error: any | string;
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
          <Typography align="center">{error?.message || error}</Typography>
        </Box>
      </Box>
    </Stack>
  );
};

export interface PageConstructionProps {
  feature?: string;
  mobile?: string;
  email?: string;
  color?: string;
}

export const PageConstruction = ({
  feature = "",
  mobile = "+254 708 113 456",
  email = "ochomrichard752@gmail.com",
  color = "grey",
}: PageConstructionProps) => {
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
