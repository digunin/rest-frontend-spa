import { PayloadAction } from "@reduxjs/toolkit";
import { FormState, FormReducer, ReducerName } from "./types";
import { FormName, TypeOfFieldName } from "./setup-forms.types";

export const createSliceOptions = <N extends FormName>(
  name: N,
  reducer: { [key in ReducerName<N>]: FormReducer<N> },
  initialState: FormState<N>
) => {
  return {
    name: `form/${name}`,
    initialState,
    reducers: {
      setInitialValues: (
        state: FormState<N>,
        action: PayloadAction<FormState<N>>
      ) => {
        return action.payload;
      },
      setTouched: (
        state: FormState<N>,
        action: PayloadAction<TypeOfFieldName<N>>
      ) => {
        state[action.payload].unTouched = false;
      },
      setTouchedAll: (state: FormState<N>) => {
        for (let name of Object.keys(state)) {
          state[name as TypeOfFieldName<N>].unTouched = false;
        }
      },
      ...reducer,
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
