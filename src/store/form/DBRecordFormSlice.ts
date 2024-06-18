import { createSlice } from "@reduxjs/toolkit";
import { createSliceOptions, isFormValid } from "./formPattern";
import { formReducerWithPreparedPayload } from "./formPattern";
import { defaulInputField } from "./types";
import { RootState } from "..";
import { error_messages } from "../../utils/text";

const DBRecordSlice = createSlice(
  createSliceOptions(
    "dbrecord",
    {
      setDbrecordInputField: formReducerWithPreparedPayload,
    },
    {
      employeeNumber: { ...defaulInputField, error: error_messages.notEmpty },
      employeeSigDate: { ...defaulInputField, error: error_messages.notEmpty },
      documentStatus: { ...defaulInputField, error: error_messages.notEmpty },
      documentType: { ...defaulInputField, error: error_messages.notEmpty },
      documentName: { ...defaulInputField, error: error_messages.notEmpty },
      companySigDate: { ...defaulInputField, error: error_messages.notEmpty },
      companySignatureName: {
        ...defaulInputField,
        error: error_messages.notEmpty,
      },
      employeeSignatureName: {
        ...defaulInputField,
        error: error_messages.notEmpty,
      },
    }
  )
);

export const selectIsFormValid = (state: RootState): boolean =>
  isFormValid(state.dbRecordFormState);

export const {
  setInitialValues,
  setDbrecordInputField,
  setTouchedAll,
  resetForm,
} = DBRecordSlice.actions;

export default DBRecordSlice.reducer;
