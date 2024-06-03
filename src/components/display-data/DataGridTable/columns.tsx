import React from "react";
import {
  GridColDef,
  GridEditInputCell,
  GridPreProcessEditCellProps,
  GridRenderCellParams,
  GridRenderEditCellParams,
} from "@mui/x-data-grid";
import { databaseColumnNames } from "../../../utils/text";

const commonColsDef: GridColDef = {
  field: "",
  editable: true,
  minWidth: 100,
  renderEditCell: (params: GridRenderEditCellParams) => {
    return <GridEditInputCell {...params} title={params.error_message || ""} />;
  },
  preProcessEditCellProps: (params: GridPreProcessEditCellProps) => {
    const hasError = params.props.value === null;
    return {
      ...params.props,
      error: hasError,
      error_message: hasError ? "Поле не должно быть пустым" : "",
    };
  },
};

export const columnsDef: GridColDef[] = [
  {
    ...commonColsDef,
    field: "employeeNumber",
    type: "number",
    headerName: databaseColumnNames.employeeNumber,
    align: "left",
    minWidth: 60,
    flex: 1,
  },
  {
    editable: true,
    field: "employeeSigDate",
    type: "dateTime",
    minWidth: 100,
    headerName: databaseColumnNames.employeeSigDate,
    flex: 1,
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
    ...commonColsDef,
    field: "documentType",
    headerName: databaseColumnNames.documentType,
    flex: 1,
  },
  {
    ...commonColsDef,
    field: "documentName",
    headerName: databaseColumnNames.documentName,
    flex: 1,
  },
  {
    ...commonColsDef,
    field: "documentStatus",
    headerName: databaseColumnNames.documentStatus,
    flex: 1,
  },
  {
    editable: true,
    field: "companySigDate",
    type: "dateTime",
    minWidth: 100,
    headerName: databaseColumnNames.companySigDate,
    flex: 1,
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
    ...commonColsDef,
    field: "employeeSignatureName",
    headerName: databaseColumnNames.employeeSignatureName,
    flex: 1,
  },
  {
    ...commonColsDef,
    field: "companySignatureName",
    headerName: databaseColumnNames.companySignatureName,
    flex: 1,
  },
];
