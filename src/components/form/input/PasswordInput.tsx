import React, { FC } from "react";
import TextInput, { TIProps } from "./TextInput";
import PasswordVisibilityButton from "./PasswordVisibilityButton";
import { useTextInput } from "../../../hooks/useTextInput";
import { WithHandlingError } from "../errors/WithErrorHandling";

type PIProps = Omit<TIProps, "InputProps" | "autoComplete" | "password">;

const PasswordInput: FC<PIProps & WithHandlingError> = (props) => {
  const { type, handleCLick, passwordVisibility } = useTextInput(true);
  return (
    <TextInput
      password={true}
      type={type}
      InputProps={{
        endAdornment: (
          <PasswordVisibilityButton
            onclick={handleCLick}
            show={passwordVisibility}
          />
        ),
      }}
      {...props}
    ></TextInput>
  );
};

export default PasswordInput;
