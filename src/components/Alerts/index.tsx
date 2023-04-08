import React, { createContext, useContext, useState } from "react";
import ConfirmModal from "./confirm";
import { ConfirmProps, SnackProps, SupportedColors } from "./props";
import SnackAlert from "./snack";

const initConfirmState: ConfirmProps = {
  open: false,
  title: "",
  message: "",
  showCancelButton: true,
  confirmButtonColor: "error",
  cancelButtonColor: "success",
  confirmButtonText: "Yes, Delete",
  cancelButtonText: "No, Cancel",
  onConfirm: () => {},
  onCancel: () => {},
};

const initSnackState: SnackProps = {
  type: "success",
  open: false,
  message: "",
  duration: 3000,
  origin: { vertical: "bottom", horizontal: "right" },
  children: null,
};

const AlertContext = createContext({
  createConfirm: (options: ConfirmProps) => {},
  alertSuccess: (message: string) => {},
  alertError: (message: string) => {},
  alertWarning: (message: string) => {},
});

export const AlertProvider = ({ children }: any) => {
  const [confirmState, setConfirmState] = useState(initConfirmState);
  const [snackState, setSnackState] = useState(initSnackState);

  const handleCloseConfirm = () => {
    setConfirmState(initConfirmState);
  };

  const handleConfirm = () => {
    if (confirmState.onConfirm) confirmState.onConfirm();
    handleCloseConfirm();
  };

  const handleCancel = () => {
    if (confirmState.onCancel) confirmState.onCancel();
    handleCloseConfirm();
  };

  const confirmButtons = [
    {
      text: confirmState.confirmButtonText,
      color: confirmState.confirmButtonColor,
      onClick: handleConfirm,
      hidden: false,
    },
    {
      text: confirmState.cancelButtonText,
      color: confirmState.cancelButtonColor,
      onClick: handleCancel,
      hidden: !confirmState.showCancelButton,
    },
  ];

  const createConfirm = (options: ConfirmProps) => {
    setConfirmState({ ...confirmState, ...options, open: true });
  };

  const createSnack = (message: string, type: SupportedColors) => {
    setSnackState({
      ...snackState,
      message,
      type,
      open: true,
    });
  };

  const closeSnack = () => setSnackState({ ...snackState, open: false });

  const alertSuccess = (message: string) => {
    createSnack(message, "success");
  };

  const alertError = (message: string) => {
    createSnack(message, "error");
  };

  const alertWarning = (message: string) => {
    createSnack(message, "warning");
  };

  const providerProps = {
    createConfirm,
    alertSuccess,
    alertError,
    alertWarning,
  };

  return (
    <AlertContext.Provider value={providerProps}>
      {children}
      <ConfirmModal
        data={confirmState}
        handleClose={handleCloseConfirm}
        buttons={confirmButtons}
      />
      <SnackAlert data={snackState} closeSnack={closeSnack} />
    </AlertContext.Provider>
  );
};

export const useAlerts = () => {
  const {
    alertSuccess,
    alertError,
    alertWarning,
    createConfirm: confirm,
  } = useContext(AlertContext);
  return { alertSuccess, alertError, alertWarning, confirm };
};
