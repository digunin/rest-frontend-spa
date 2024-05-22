import { error_messages } from "../../../utils/text";

export type ValidateHelper = {
  error_text: string;
  validate: InputValidator;
};

export type InputValidator = (
  inputed: string,
  options: ValidateOptions
) => boolean;

export type InputMutator = (inputed: string) => string;

export type ValidateOptions = {
  min?: number;
  max?: number;
  moreThan?: number;
  lessThan?: number;
  minLength?: number;
  maxLength?: number;
  maxAfterDot?: number;
};

export const checkDiapason: InputValidator = (
  inputed: string,
  options: ValidateOptions
) => {
  const value = Number(inputed);
  if (isNaN(value)) return false;
  let correct = true;
  const { max, min, moreThan, lessThan } = options;
  if (typeof max === "number") correct = value <= max;
  if (typeof min === "number" && correct) correct = value >= min;
  if (typeof moreThan === "number" && correct) correct = value > moreThan;
  if (typeof lessThan === "number" && correct) correct = value < lessThan;
  return correct;
};

export const checkLength: InputValidator = (
  inputed: string,
  options: ValidateOptions
) => {
  let correct = true;
  const { maxLength, minLength } = options;
  if (typeof minLength === "number") correct = inputed.length >= minLength;
  if (typeof maxLength === "number") correct = inputed.length <= maxLength;
  return correct;
};

export const checkNotEmpty = (inputed: string) =>
  checkLength(inputed, { minLength: 1 });

export const notEmpty: ValidateHelper = {
  validate: checkNotEmpty,
  error_text: error_messages.notEmpty,
};
