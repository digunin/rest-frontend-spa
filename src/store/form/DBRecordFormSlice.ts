import { createSlice } from "@reduxjs/toolkit";
import { createSliceOptions, isFormValid } from "./formPattern";
import { formReducerWithPreparedPayload } from "./formPattern";
import { defaulInputField } from "./types";
import { RootState } from "..";

const DBRecordSlice = createSlice(
  createSliceOptions(
    "dbrecord",
    {
      setDbrecordInputField: formReducerWithPreparedPayload,
    },
    {
      employeeNumber: { ...defaulInputField },
      employeeSigDate: { ...defaulInputField },
      documentStatus: { ...defaulInputField },
      documentType: { ...defaulInputField },
      documentName: { ...defaulInputField },
      companySigDate: { ...defaulInputField },
      companySignatureName: {
        ...defaulInputField,
      },
      employeeSignatureName: {
        ...defaulInputField,
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
