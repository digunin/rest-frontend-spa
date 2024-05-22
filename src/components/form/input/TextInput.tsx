import React, { FC } from "react";
import WithErrorHandling from "../errors/WithErrorHandling";
import {
  FilledInputProps,
  InputProps,
  OutlinedInputProps,
  TextField,
} from "@mui/material";
import { useTextInput } from "../../../hooks/useTextInput";

export type TIProps = {
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
  label,
  value,
  error,
  unTouched,
  fullWidth = false,
  autoComplete,
  password = false,
  InputProps,
  onchange,
}) => {
  const { type } = useTextInput(password);
  return (
    <TextField
      fullWidth={fullWidth}
      autoComplete={autoComplete}
      value={value}
      label={label}
      error={!unTouched && !!error}
      helperText={(!unTouched && error) || " "}
      type={type}
      InputProps={InputProps}
      onChange={(e) => onchange(e.target.value, null)}
    ></TextField>
  );
};

export default WithErrorHandling(TextInput);
