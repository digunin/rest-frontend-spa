import { Credentials, SingleRecord } from "../../api/types";

export type FormName = "login" | "dbrecord";

export type LoginFormFieldName = keyof Credentials;
export type DBRecordFormFieldName = keyof SingleRecord;

export type TypeOfFieldName<N extends FormName> = N extends "login"
  ? LoginFormFieldName
  : N extends "dbrecord"
  ? DBRecordFormFieldName
  : never;
