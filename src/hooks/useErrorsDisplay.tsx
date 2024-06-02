import { useEffect } from "react";
import { useSignIn } from "./useSignIn";
import { useAppDatabase } from "./useAppDatabase";
import { useAppSnackbar } from "./useAppSnackbar";
import { error_messages, server_messages_RU } from "../utils/text";
import { useAppDispatch } from "../store";
import { setUser } from "../store/userSlice";

export const useErrorsDisplay = () => {
  const dispatch = useAppDispatch();
  const { showSnackbar } = useAppSnackbar();
  const { error: userError } = useSignIn();
  const { error: dataError } = useAppDatabase();

  useEffect(() => {
    if (userError) showSnackbar(userError);
    if (dataError) showSnackbar(dataError);
    if (dataError === server_messages_RU[error_messages.accessDeny])
      dispatch(setUser({ username: null, token: null }));
  }, [userError, dataError]);
};
