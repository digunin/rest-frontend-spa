import React, { FC } from "react";
import WithErrorHandling from "../errors/WithErrorHandling";
import { TextField, TextFieldProps } from "@mui/material";
import { InputField } from "../../../store/form/types";

export type TIProps = TextFieldProps & {
  inputField: InputField;
  onchange: (value: string, error: string) => void;
};

const TextInput: FC<TIProps> = ({
  inputField,
  onchange,
  ...textFieldProps
}) => {
  const { value, error, unTouched } = inputField;
  return (
    <TextField
      value={value}
      error={!unTouched && !!error}
      helperText={(!unTouched && error) || " "}
      onChange={(e) => onchange(e.target.value, "")}
      {...textFieldProps}
    ></TextField>
  );
};

export default WithErrorHandling(TextInput);
