import React from "react";
import { ValidateOptions, ValidateHelper, InputMutator } from ".";
import { TIProps } from "../input/TextInput";

export type WithHandlingError = {
  validateHelpers?: Array<ValidateHelper>;
  validateOptions?: ValidateOptions;
  mutators?: Array<InputMutator>;
};

const WithErrorHandling = (
  Child: React.ComponentType<TIProps>
): React.ComponentType<WithHandlingError & TIProps> => {
  return ({
    validateHelpers,
    mutators,
    validateOptions,
    onchange,
    ...props
  }) => {
    const newOnchange: typeof onchange = (value, error) => {
      if (mutators) {
        mutators.forEach((mutator) => (value = mutator(value)));
      }
      if (validateHelpers) {
        for (const helper of validateHelpers) {
          if (!helper.validate(value, validateOptions || {})) {
            error = helper.error_text;
            break;
          }
        }
      }
      onchange(value, error);
    };
    return <Child {...props} onchange={newOnchange} />;
  };
};

export default WithErrorHandling;
