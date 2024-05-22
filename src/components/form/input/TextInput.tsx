import React, { FC, useState } from "react";
import WithErrorHandling from "../errors/WithErrorHandling";
import { TextField } from "@mui/material";
import PasswordVisibilityButton from "./PasswordVisibilityButton";

export type TIProps = {
  label: string;
  value: string;
  error: string | null;
  fullWidth?: boolean;
  autoComplete?: string;
  password?: boolean;
  unTouched: boolean;
  onchange: (value: string, error: string | null) => void;
};

const TextInput: FC<TIProps> = ({
  label,
  value,
  error,
  unTouched,
  fullWidth = false,
  autoComplete,
  password = false,
  onchange,
}) => {
  const [passwordVisibility, setPasswordVisibility] = useState(false);
  const handleCLick = () => setPasswordVisibility((prev) => !prev);
  const tooltip = passwordVisibility ? "Скрыть пароль" : "Показать пароль";

  return (
    <TextField
      fullWidth={fullWidth}
      autoComplete={autoComplete}
      value={value}
      label={label}
      error={!unTouched && !!error}
      helperText={(!unTouched && error) || " "}
      type={!password || passwordVisibility ? "text" : "password"}
      InputProps={
        password
          ? {
              endAdornment: (
                <PasswordVisibilityButton
                  tooltip={tooltip}
                  onclick={handleCLick}
                  show={passwordVisibility}
                />
              ),
            }
          : {}
      }
      onChange={(e) => onchange(e.target.value, null)}
    ></TextField>
  );
};

export default WithErrorHandling(TextInput);
