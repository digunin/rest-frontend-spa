import { PayloadAction, PrepareAction } from "@reduxjs/toolkit";
import {
  FormPayload,
  FormReducer,
  FormState,
  ReducerName,
  WithInputField,
} from "./types";
import { FormName, TypeOfFieldName } from "./setup-forms.types";
import { error_messages } from "../../utils/text";

export const createSliceOptions = <N extends FormName>(
  name: N,
  initialState: FormState<N>
) => {
  return {
    name: `form/${name}`,
    initialState,
    reducers: {
      setInitialValues: (
        state: FormState<N>,
        action: PayloadAction<FormPayload<N>>
      ) => {
        const { payload } = action;
        Object.keys(payload).forEach((key) => {
          const fieldName = key as TypeOfFieldName<N>;
          const value = payload[fieldName];
          state[fieldName].value = value;
          if (value !== "") state[fieldName].error = "";
        });
      },
      setTouchedAll: (state: FormState<N>) => {
        for (let name of Object.keys(state)) {
          state[name as TypeOfFieldName<N>].unTouched = false;
        }
      },
      resetForm: (state: FormState<N>) => {
        return initialState;
      },
      setInputField: {
        reducer: (
          state: FormState<N>,
          action: PayloadAction<WithInputField<TypeOfFieldName<N>>>
        ) => {
          state[action.payload.name] = {
            ...action.payload.inputPayload,
            unTouched: false,
          };
        },
        prepare: (name: any, value: string, error: string) => {
          return { payload: { name, inputPayload: { value, error } } };
        },
      },
    },
  };
};

export const isFormValid = <T extends FormState<any>>(
  formState: T
): boolean => {
  for (const inputField of Object.values(formState)) {
    if (inputField.error) return false;
  }
  return true;
};

// export const formReducerWithPreparedPayload = {
//   reducer: <N extends FormName>(
//     state: FormState<N>,
//     action: PayloadAction<WithInputField<TypeOfFieldName<N>>>
//   ) => {
//     state[action.payload.name] = {
//       ...action.payload.inputPayload,
//       unTouched: false,
//     };
//   },
//   prepare: (name: any, value: string, error: string) => {
//     return { payload: { name, inputPayload: { value, error } } };
//   },
// };
