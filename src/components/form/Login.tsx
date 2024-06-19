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
          inputField={username}
          validateHelpers={[notEmpty]}
          onchange={handleChange("username")}
        ></TextInput>
        <PasswordInput
          fullWidth
          label={label_text.password}
          inputField={password}
          validateHelpers={[notEmpty]}
          onchange={handleChange("password")}
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
