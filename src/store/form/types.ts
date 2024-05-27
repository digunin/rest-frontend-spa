import { PayloadAction } from "@reduxjs/toolkit";
import { FormName, TypeOfFieldName } from "./setup-forms.types";

export type InputField = {
  value: string;
  error: string;
  unTouched: boolean;
};

export type InputPayload = Omit<InputField, "unTouched">;

export const defaulInputField: InputField = {
  error: "",
  value: "",
  unTouched: true,
};

export type FormState<N extends FormName> = {
  [key in TypeOfFieldName<N>]: InputField;
};

export type ReducerName<N> = N extends FormName
  ? `set${Capitalize<N>}InputField`
  : never;

export type WithInputField<N> = {
  inputPayload: InputPayload;
  name: N;
};

export type FormPayload<N extends FormName> = {
  [key in TypeOfFieldName<N>]: string;
};

export type FormReducer<N extends FormName> = (
  state: FormState<N>,
  action: PayloadAction<WithInputField<TypeOfFieldName<N>>>
) => void;
