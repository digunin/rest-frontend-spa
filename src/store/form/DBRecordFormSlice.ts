import { createSlice } from "@reduxjs/toolkit";
import {
  createSliceOptions,
  isFormValid,
  defaultInputField,
} from "simple-mui-redux-form";
import { RootState } from "..";
import { error_messages } from "../../utils/text";
import { DBRecordFormFieldName } from "./setup-forms.types";

const DBRecordSlice = createSlice(
  createSliceOptions<DBRecordFormFieldName>("dbrecord", {
    employeeNumber: { ...defaultInputField, error: error_messages.notEmpty },
    employeeSigDate: { ...defaultInputField, error: error_messages.notEmpty },
    documentStatus: { ...defaultInputField, error: error_messages.notEmpty },
    documentType: { ...defaultInputField, error: error_messages.notEmpty },
    documentName: { ...defaultInputField, error: error_messages.notEmpty },
    companySigDate: { ...defaultInputField, error: error_messages.notEmpty },
    companySignatureName: {
      ...defaultInputField,
      error: error_messages.notEmpty,
    },
    employeeSignatureName: {
      ...defaultInputField,
      error: error_messages.notEmpty,
    },
  })
);

export const selectIsFormValid = (state: RootState): boolean =>
  isFormValid(state.dbRecordFormState);

export const { setInitialValues, setInputField, setTouchedAll, resetForm } =
  DBRecordSlice.actions;

export default DBRecordSlice.reducer;
