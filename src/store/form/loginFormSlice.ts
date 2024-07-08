import { createSlice } from "@reduxjs/toolkit";
import { createSliceOptions, isFormValid } from "./formPattern";
import { defaulInputField } from "./types";
import { RootState } from "..";
import { error_messages } from "../../utils/text";

const SignInSlice = createSlice(
  createSliceOptions("login", {
    username: { ...defaulInputField, error: error_messages.notEmpty },
    password: { ...defaulInputField, error: error_messages.notEmpty },
  })
);

export const selectIsFormValid = (state: RootState): boolean =>
  isFormValid(state.loginFormState);

export const { setInitialValues, setInputField, setTouchedAll, resetForm } =
  SignInSlice.actions;
export default SignInSlice.reducer;
