import { FormEvent } from "react";
import { unwrapResult } from "@reduxjs/toolkit";
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
import { error_messages } from "../utils/text";

export const useLoginForm = () => {
  const inputFields = useAppSelector((state) => state.loginFormState);
  const isFormValid = useAppSelector(selectIsFormValid);
  const { handleChange, formPayload, dispatch } = useForm(
    inputFields,
    setLoginInputField
  );
  const { username, password } = inputFields;
  const { loading } = useSignIn();

  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    dispatch(setTouchedAll());
    if (!isFormValid) return;
    dispatch(signIn(formPayload))
      .then(unwrapResult)
      .then(() => {
        dispatch(resetForm());
      })
      .catch((err: { message: string }) => {
        const error =
          err.message === error_messages.accessDeny
            ? "Неверный логин или пароль"
            : err.message;
        dispatch(
          setLoginInputField({
            name: "username",
            inputField: { ...username, error },
          })
        );
        dispatch(
          setLoginInputField({
            name: "password",
            inputField: { ...password, error },
          })
        );
      });
  };

  return { handleSubmit, handleChange, inputFields, loading };
};
