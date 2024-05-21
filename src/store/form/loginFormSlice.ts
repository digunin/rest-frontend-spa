import { createSlice } from "@reduxjs/toolkit";
import { createSliceOptions, isFormValid } from "./formPattern";
import { defaulInputField } from "./types";
import { RootState } from "..";

const SignInSlice = createSlice(
  createSliceOptions(
    "login",
    {
      setLoginInputField: (state, action) => {
        state[action.payload.name] = action.payload.inputField;
      },
    },
    {
      username: defaulInputField,
      password: defaulInputField,
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
