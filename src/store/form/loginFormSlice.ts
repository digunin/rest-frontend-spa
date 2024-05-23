import { createSlice } from "@reduxjs/toolkit";
import { createSliceOptions, isFormValid } from "./formPattern";
import { defaulInputField } from "./types";
import { RootState } from "..";
import { error_messages } from "../../utils/text";

const SignInSlice = createSlice(
  createSliceOptions(
    "login",
    {
      setLoginInputField: (state, action) => {
        state[action.payload.name] = action.payload.inputField;
      },
    },
    {
      username: { ...defaulInputField, error: error_messages.notEmpty },
      password: { ...defaulInputField, error: error_messages.notEmpty },
    }
  )
);

export const selectIsFormValid = (state: RootState): boolean =>
  isFormValid(state.loginFormState);

export const {
  setInitialValues,
  setLoginInputField,
  setTouched,
  setTouchedAll,
} = SignInSlice.actions;
export default SignInSlice.reducer;
