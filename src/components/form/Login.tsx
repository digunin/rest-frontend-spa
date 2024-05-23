import React, { FormEvent } from "react";
import { Box, Button, Grid } from "@mui/material";
import TextInput from "./input/TextInput";
import PasswordInput from "./input/PasswordInput";
import { notEmpty } from "./errors";
import { label_text } from "../../utils/text";
import { useForm } from "../../hooks/useForm";
import { setLoginInputField } from "../../store/form/loginFormSlice";
import { useAppSelector } from "../../store";

const Login = () => {
  const inputFields = useAppSelector((state) => state.loginFormState);
  const { handleChange, onSubmit } = useForm(inputFields, setLoginInputField);
  const { username, password } = inputFields;
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
