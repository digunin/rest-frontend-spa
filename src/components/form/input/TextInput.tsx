import React, { FC } from "react";
import WithErrorHandling from "../errors/WithErrorHandling";
import {
  FilledInputProps,
  InputProps,
  OutlinedInputProps,
  TextField,
} from "@mui/material";

export type TIProps = {
  type?: "text" | "password";
  label: string;
  value: string;
  error: string | null;
  fullWidth?: boolean;
  autoComplete?: string;
  password?: boolean;
  unTouched: boolean;
  InputProps?:
    | Partial<FilledInputProps>
    | Partial<OutlinedInputProps>
    | Partial<InputProps>;
  onchange: (value: string, error: string | null) => void;
};

const TextInput: FC<TIProps> = ({
  type,
  label,
  value,
  error,
  unTouched,
  fullWidth = false,
  autoComplete,
  InputProps,
  onchange,
}) => {
  return (
    <TextField
      fullWidth={fullWidth}
      autoComplete={autoComplete}
      value={value}
      label={label}
      error={!unTouched && !!error}
      helperText={(!unTouched && error) || " "}
      type={type || "text"}
      InputProps={InputProps}
      onChange={(e) => onchange(e.target.value, null)}
    ></TextField>
  );
};

export default WithErrorHandling(TextInput);
