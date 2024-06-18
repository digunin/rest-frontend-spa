import React, { FC } from "react";
import WithErrorHandling from "../errors/WithErrorHandling";
import { TextField, TextFieldProps } from "@mui/material";
import { InputField } from "../../../store/form/types";

export type TIProps = TextFieldProps & {
  inputField: InputField;
  needHelperText?: boolean;
  onchange: (value: string, error: string) => void;
};

const TextInput: FC<TIProps> = ({
  inputField,
  onchange,
  needHelperText = true,
  ...textFieldProps
}) => {
  const { value, error, unTouched } = inputField;
  return (
    <TextField
      value={value}
      error={!unTouched && !!error}
      helperText={needHelperText ? (!unTouched && error) || " " : ""}
      onChange={(e) => onchange(e.target.value, "")}
      {...textFieldProps}
    ></TextField>
  );
};

export default WithErrorHandling(TextInput);
