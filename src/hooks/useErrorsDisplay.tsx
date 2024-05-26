import { closeSnackbar, useSnackbar } from "notistack";
import React, { useEffect } from "react";
import { useSignIn } from "./useSignIn";
import SnackbarCloseButton from "../components/SnackbarCloseButton";

export const useErrorsDisplay = () => {
  const { enqueueSnackbar } = useSnackbar();
  const { error } = useSignIn();

  useEffect(() => {
    if (!error) return;
    enqueueSnackbar(error, {
      variant: "error",
      action: (key) => (
        <SnackbarCloseButton onclose={() => closeSnackbar(key)} />
      ),
    });
  }, [error]);
};
