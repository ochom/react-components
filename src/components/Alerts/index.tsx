import "./styles.css";

import { Box, Stack, Typography } from "@mui/material";

import { CircularLoader } from "../Monitors";
import ConstructionSVG from "./construction-svg";
import NetworkErrorSVG from "./network-svg";
import React, { useContext } from "react";
import { SnackContext } from "./snack";
import { ConfirmDialogContext } from "./confirm";
import { PageConstruction } from "./pages";


export  {PageConstruction, ErrorPage} from "./pages";


export const useAlerts = () => {
  const {snackSuccess, snackError, snackWarning, closeSnack } = useContext(SnackContext)
  const {confirm} = useContext(ConfirmDialogContext)
  return {snackSuccess, snackError, snackWarning, closeSnack, confirm}
}

export { SnackProvider } from "./snack";
export { ConfirmDialogProvider } from './confirm';
