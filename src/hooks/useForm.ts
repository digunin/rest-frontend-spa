import { useAppDispatch } from "../store";
import { FormName, TypeOfFieldName } from "../store/form/setup-forms.types";
import {
  FormPayload,
  FormState,
  InputField,
  WithInputField,
} from "../store/form/types";
import { ActionCreatorWithPreparedPayload } from "@reduxjs/toolkit";

export const useForm = <N extends FormName>(
  inputFields: FormState<N>,
  reducer: ActionCreatorWithPreparedPayload<
    [TypeOfFieldName<N>, InputField],
    WithInputField<TypeOfFieldName<N>>
  >
) => {
  const dispatch = useAppDispatch();
  const formPayload = createFormPayload(inputFields);

  const handleChange = (
    name: TypeOfFieldName<N>,
    value: string,
    error: string | null
  ) => {
    dispatch(
      reducer(name, {
        value,
        error,
        unTouched: false,
      })
    );
  };
  return { formPayload, handleChange, dispatch };
};

const createFormPayload = <N extends FormName>(inputFields: FormState<N>) => {
  const keys = Object.keys(inputFields);
  return keys.reduce((payload, key) => {
    const tmp = { [key]: inputFields[key as TypeOfFieldName<N>].value };
    payload = { ...payload, ...tmp };
    return payload;
  }, {}) as FormPayload<N>;
};
