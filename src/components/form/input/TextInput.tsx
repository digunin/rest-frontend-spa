import React, { FC } from "react";
import WithErrorHandling from "../errors/WithErrorHandling";
import {
  FilledInputProps,
  InputProps,
  OutlinedInputProps,
  TextField,
} from "@mui/material";
import { InputField } from "../../../store/form/types";

export type TIProps = {
  type?: "text" | "password";
  label: string;
  inputField: InputField;
  fullWidth?: boolean;
  autoComplete?: string;
  password?: boolean;
  InputProps?:
    | Partial<FilledInputProps>
    | Partial<OutlinedInputProps>
    | Partial<InputProps>;
  onchange: (value: string, error: string | null) => void;
};

const TextInput: FC<TIProps> = ({
  type,
  label,
  inputField,
  fullWidth = false,
  autoComplete,
  InputProps,
  onchange,
}) => {
  const { value, error, unTouched } = inputField;
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
