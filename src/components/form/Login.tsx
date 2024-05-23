import React, { FormEvent } from "react";
import { Box, Button, Grid } from "@mui/material";
import TextInput from "./input/TextInput";
import PasswordInput from "./input/PasswordInput";
import {
  setLoginInputField,
  setTouchedAll,
} from "../../store/form/loginFormSlice";
import { useAppDispatch, useAppSelector } from "../../store";
import { LoginFormFieldName } from "../../store/form/setup-forms.types";
import { notEmpty } from "./errors";
import { label_text } from "../../utils/text";

const Login = () => {
  const dispatch = useAppDispatch();
  const { username, password } = useAppSelector(
    (state) => state.loginFormState
  );
  const onSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    dispatch(setTouchedAll());
  };
  const handleChange = (
    value: string,
    error: string | null,
    name: LoginFormFieldName
  ) => {
    dispatch(
      setLoginInputField({
        name,
        inputField: {
          value,
          error,
          unTouched: false,
        },
      })
    );
  };
  return (
    <Grid container id="login" className="login-form-container">
      <Box component="form" role="form" onSubmit={onSubmit} sx={{ width: 300 }}>
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
      </Box>
    </Grid>
  );
};

export default Login;
