import { FormEvent } from "react";
import { unwrapResult } from "@reduxjs/toolkit";
import { useAppDispatch, useAppSelector } from "../store";
import {
  resetForm,
  selectIsFormValid,
  setInputField as setLoginInputField,
  setTouchedAll,
} from "../store/form/loginFormSlice";
import { useLoginMutation } from "../api/authAPI";
import { useForm } from "simple-mui-redux-form";
import { LoginFormFieldName } from "../store/form/setup-forms.types";

export const useLoginForm = () => {
  const dispatch = useAppDispatch();
  const inputFields = useAppSelector((state) => state.loginFormState);
  const isFormValid = useAppSelector(selectIsFormValid);
  const { handleChange, formPayload } = useForm<LoginFormFieldName>(
    inputFields,
    setLoginInputField
  );
  const [signIn, { isLoading }] = useLoginMutation();

  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (isLoading) return;
    dispatch(setTouchedAll());
    if (!isFormValid) return;
    signIn(formPayload)
      .unwrap()
      .then(() => {
        dispatch(resetForm());
      })
      .catch((err) => {});
  };

  return { handleSubmit, handleChange, inputFields, loading: isLoading };
};
