import { useEffect } from "react";
import { useSignIn } from "./useSignIn";
import { useAppDatabase } from "./useAppDatabase";
import { useAppSnackbar } from "./useAppSnackbar";

export const useErrorsDisplay = () => {
  const { showSnackbar } = useAppSnackbar();
  const { error: userError } = useSignIn();
  const { error: dataError } = useAppDatabase();

  useEffect(() => {
    if (userError) showSnackbar(userError);
    if (dataError) showSnackbar(dataError);
  }, [userError, dataError]);
};
