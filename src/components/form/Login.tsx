import React from "react";
import { Box, Button, Grid } from "@mui/material";
import TextInput from "./input/TextInput";
import PasswordInput from "./input/PasswordInput";
import LinearProgressBar from "../LinearProgressBar";
import { useLoginForm } from "../../hooks/useLoginForm";
import { notEmpty } from "./errors";
import { label_text } from "../../utils/text";

const Login = () => {
  const { handleSubmit, inputFields, handleChange, loading } = useLoginForm();
  const { username, password } = inputFields;

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
            handleChange("username", value, error);
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
            handleChange("password", value, error);
          }}
        ></PasswordInput>
        <Button
          sx={{ mb: 1, mt: 1 }}
          type="submit"
          fullWidth
          variant="contained"
          disabled={loading}
        >
          ОК
        </Button>
        <LinearProgressBar show={loading} />
      </Box>
    </Grid>
  );
};

export default Login;
