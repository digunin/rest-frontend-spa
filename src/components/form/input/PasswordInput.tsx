import React, { FC } from "react";
import { TIProps } from "./TextInput";
import PasswordVisibilityButton from "./PasswordVisibilityButton";
import { TextField } from "@mui/material";
import { useTextInput } from "../../../hooks/useTextInput";

type PIProps = Omit<TIProps, "InputProps" | "autoComplete" | "password">;

const PasswordInput: FC<PIProps> = ({
  label,
  value,
  error,
  unTouched,
  fullWidth = false,
  onchange,
}) => {
  const { type, handleCLick, passwordVisibility } = useTextInput(true);
  return (
    <TextField
      fullWidth={fullWidth}
      autoComplete={"password"}
      value={value}
      label={label}
      error={!unTouched && !!error}
      helperText={(!unTouched && error) || " "}
      type={type}
      InputProps={{
        endAdornment: (
          <PasswordVisibilityButton
            onclick={handleCLick}
            show={passwordVisibility}
          />
        ),
      }}
      onChange={(e) => onchange(e.target.value, null)}
    ></TextField>
  );
};

export default PasswordInput;
