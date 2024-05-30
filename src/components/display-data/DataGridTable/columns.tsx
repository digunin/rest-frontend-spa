import React from "react";
import {
  GridColDef,
  GridEditInputCell,
  GridPreProcessEditCellProps,
  GridRenderCellParams,
  GridRenderEditCellParams,
} from "@mui/x-data-grid";
import { databaseColumnNames } from "../../../utils/text";

export const createColumnsWithActions = (actions: GridColDef): GridColDef[] => {
  return [...columns, actions];
};

const columns: GridColDef[] = [
  {
    field: "employeeNumber",
    type: "number",
    headerName: databaseColumnNames.employeeNumber,
    align: "left",
    minWidth: 100,
    flex: 1,
    editable: true,
    renderEditCell: (params: GridRenderEditCellParams) => {
      return (
        <GridEditInputCell {...params} title={params.error_message || ""} />
      );
    },
    preProcessEditCellProps: (params: GridPreProcessEditCellProps) => {
      const hasError = params.props.value === null;
      return {
        ...params.props,
        error: hasError,
        error_message: hasError ? "Поле не должно быть пустым" : "",
      };
    },
  },
  {
    field: "employeeSigDate",
    type: "dateTime",
    headerName: databaseColumnNames.employeeSigDate,
    minWidth: 100,
    flex: 1,
    editable: true,
    renderCell: (params: GridRenderCellParams) => {
      return (
        <div title={params.value?.toLocaleString()}>
          {params.value?.toLocaleDateString()}
        </div>
      );
    },
    valueGetter: (value: string) => {
      return new Date(value);
    },
  },
  {
    field: "documentType",
    headerName: databaseColumnNames.documentType,
    minWidth: 150,
    flex: 1,
    editable: true,
  },
  {
    field: "documentName",
    headerName: databaseColumnNames.documentName,
    minWidth: 150,
    flex: 1,
    editable: true,
  },
  {
    field: "documentStatus",
    headerName: databaseColumnNames.documentStatus,
    minWidth: 100,
    flex: 1,
    editable: true,
  },
  {
    field: "companySigDate",
    type: "dateTime",
    headerName: databaseColumnNames.companySigDate,
    minWidth: 100,
    flex: 1,
    editable: true,
    renderCell: (params: GridRenderCellParams<any, Date>) => {
      return (
        <div title={params.value?.toLocaleString()}>
          {params.value?.toLocaleDateString()}
        </div>
      );
    },
    valueGetter: (value: string) => {
      return new Date(value);
    },
  },
  {
    field: "employeeSignatureName",
    headerName: databaseColumnNames.employeeSignatureName,
    minWidth: 100,
    flex: 1,
    editable: true,
  },
  {
    field: "companySignatureName",
    headerName: databaseColumnNames.companySignatureName,
    minWidth: 100,
    flex: 1,
    editable: true,
  },
];
