import { FormEvent, useEffect } from "react";
import { unwrapResult } from "@reduxjs/toolkit";
import { useSnackbar } from "notistack";
import { useAppSelector } from "../store";
import {
  resetForm,
  selectIsFormValid,
  setLoginInputField,
  setTouchedAll,
} from "../store/form/loginFormSlice";
import { signIn } from "../store/userSlice";
import { useForm } from "./useForm";
import { useSignIn } from "./useSignIn";

export const useLoginForm = () => {
  const { enqueueSnackbar } = useSnackbar();
  const inputFields = useAppSelector((state) => state.loginFormState);
  const isFormValid = useAppSelector(selectIsFormValid);
  const { handleChange, formPayload, dispatch } = useForm(
    inputFields,
    setLoginInputField
  );
  const { loading, error } = useSignIn();

  useEffect(() => {
    if (!error) return;
    enqueueSnackbar(error, { variant: "error" });
  }, [error]);

  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (loading) return;
    dispatch(setTouchedAll());
    if (!isFormValid) return;
    dispatch(signIn(formPayload))
      .then(unwrapResult)
      .then(() => {
        dispatch(resetForm());
      })
      .catch((err) => {});
  };

  return { handleSubmit, handleChange, inputFields, loading, error };
};
