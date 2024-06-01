import React from "react";
import { closeSnackbar, useSnackbar } from "notistack";
import SnackbarCloseButton from "../components/SnackbarCloseButton";

export const useAppSnackbar = () => {
  const { enqueueSnackbar } = useSnackbar();
  const showSnackbar = (
    message: string,
    variant?: "default" | "error" | "success" | "warning" | "info"
  ) => {
    if (!message) return;
    enqueueSnackbar(message, {
      variant: variant || "error",
      action: (key) => (
        <SnackbarCloseButton onclose={() => closeSnackbar(key)} />
      ),
    });
  };
  return { showSnackbar };
};
