import { useAppDispatch } from "../store";
import { FormName, TypeOfFieldName } from "../store/form/setup-forms.types";
import { FormPayload, FormState, WithInputField } from "../store/form/types";
import { ActionCreatorWithPreparedPayload } from "@reduxjs/toolkit";

export const useForm = <N extends FormName>(
  inputFields: FormState<N>,
  reducer: ActionCreatorWithPreparedPayload<
    [TypeOfFieldName<N>, string, string],
    WithInputField<TypeOfFieldName<N>>
  >
) => {
  const dispatch = useAppDispatch();
  const formPayload = createFormPayload(inputFields);

  const handleChange = (name: TypeOfFieldName<N>) => {
    return (value: string, error: string) => {
      dispatch(reducer(name, value, error));
    };
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
