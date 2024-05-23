import React, { FormEvent } from "react";
import { Box, Button, Grid } from "@mui/material";
import TextInput from "./input/TextInput";
import PasswordInput from "./input/PasswordInput";
import { notEmpty } from "./errors";
import { error_messages, label_text } from "../../utils/text";
import { useForm } from "../../hooks/useForm";
import {
  resetForm,
  selectIsFormValid,
  setLoginInputField,
  setTouchedAll,
} from "../../store/form/loginFormSlice";
import { useAppSelector } from "../../store";
import { signIn } from "../../store/userSlice";
import { unwrapResult } from "@reduxjs/toolkit";
import LinearProgressBar from "../LinearProgressBar";
import { useSignIn } from "../../hooks/useSignIn";

const Login = () => {
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

  return (
    <Grid container id="login" className="login-form-container">
      <Box
        component="form"
        role="form"
        onSubmit={handleSubmit}
        sx={{ width: 300 }}
      >
        <TextInput
          fullWidth
          autoComplete="login"
          label={label_text.login}
          error={username.error}
          value={username.value}
          unTouched={username.unTouched}
          validateHelpers={[notEmpty]}
          onchange={(value, error) => {
            handleChange(value, error, "username");
          }}
        ></TextInput>
        <PasswordInput
          fullWidth
          label={label_text.password}
          error={password.error}
          value={password.value}
          unTouched={password.unTouched}
          validateHelpers={[notEmpty]}
          onchange={(value, error) => {
            handleChange(value, error, "password");
          }}
        ></PasswordInput>
        <Button
          sx={{ mb: 1, mt: 1 }}
          type="submit"
          fullWidth
          variant="contained"
        >
          ОК
        </Button>
        <LinearProgressBar show={loading} />
      </Box>
    </Grid>
  );
};

export default Login;
