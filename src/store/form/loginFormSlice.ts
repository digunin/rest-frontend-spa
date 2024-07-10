import { createSlice } from "@reduxjs/toolkit";
import {
  createSliceOptions,
  isFormValid,
  defaultInputField,
} from "simple-mui-redux-form";
import { RootState } from "..";
import { error_messages } from "../../utils/text";
import { LoginFormFieldName } from "./setup-forms.types";

const SignInSlice = createSlice(
  createSliceOptions<LoginFormFieldName>("login", {
    username: { ...defaultInputField, error: error_messages.notEmpty },
    password: { ...defaultInputField, error: error_messages.notEmpty },
  })
);

export const selectIsFormValid = (state: RootState): boolean =>
  isFormValid(state.loginFormState);

export const { setInitialValues, setInputField, setTouchedAll, resetForm } =
  SignInSlice.actions;
export default SignInSlice.reducer;
