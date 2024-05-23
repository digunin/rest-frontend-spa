import { FormEvent } from "react";
import { useAppDispatch } from "../store";
import { setTouchedAll } from "../store/form/loginFormSlice";
import { FormName, TypeOfFieldName } from "../store/form/setup-forms.types";
import { FormPayload, FormState, WithInputField } from "../store/form/types";
import { ActionCreatorWithPayload } from "@reduxjs/toolkit";

export const useForm = <N extends FormName>(
  inputFields: FormState<N>,
  reducer: ActionCreatorWithPayload<WithInputField<TypeOfFieldName<N>>>
) => {
  const dispatch = useAppDispatch();
  const formPayload = createFormPayload(inputFields);
  const onSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    dispatch(setTouchedAll());
  };
  const handleChange = (
    value: string,
    error: string | null,
    name: TypeOfFieldName<N>
  ) => {
    dispatch(
      reducer({
        name,
        inputField: {
          value,
          error,
          unTouched: false,
        },
      })
    );
  };
  return { formPayload, handleChange, dispatch, onSubmit };
};

const createFormPayload = <N extends FormName>(inputFields: FormState<N>) => {
  const keys = Object.keys(inputFields);
  return keys.reduce((payload, key) => {
    const tmp = { [key]: inputFields[key as TypeOfFieldName<N>].value };
    payload = { ...payload, ...tmp };
    return payload;
  }, {}) as FormPayload<N>;
};
