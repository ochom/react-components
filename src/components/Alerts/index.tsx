import "./styles.css";


import { useContext } from "react";
import { SnackContext } from "./snack";
import { ConfirmDialogContext } from "./confirm";


export  {PageConstruction, ErrorPage} from "./pages";


export const useAlerts = () => {
  const {snackSuccess, snackError, snackWarning, closeSnack } = useContext(SnackContext)
  const {confirm} = useContext(ConfirmDialogContext)
  return {snackSuccess, snackError, snackWarning, closeSnack, confirm}
}

export { SnackProvider } from "./snack";
export { ConfirmDialogProvider } from './confirm';
