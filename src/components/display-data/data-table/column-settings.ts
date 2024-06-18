import { Breakpoint, GridProps, GridSize } from "@mui/material";
import { SingleRecord } from "../../../api/types";
import { databaseColumnNames } from "../../../utils/text";

export type ColumnType = "text" | "date-time";

type ColumnsDef<T> = {
  columnKey: keyof T | "actions_cell";
  columnName: string;
  type: ColumnType;
} & GridProps;

// размер экрана, при котором ячейки одной записи в таблице не будут переноситься на новую строку
const oneLineRowBreakpoint: Breakpoint = "lg";

const commonColumnProps: GridProps = {
  xs: 6,
  sm: 4,
  md: 3,
  lg: true, // это — oneLineBreakpoint. Измените commonColumnProps, если он отличен от "lg"
};

const getColumnWidthProps = (width: number) => {
  return {
    [oneLineRowBreakpoint]: "auto" as GridSize,
    sx: {
      width: { [oneLineRowBreakpoint]: width },
    },
  };
};

export const columnsDef: Array<ColumnsDef<SingleRecord>> = [
  {
    columnKey: "employeeNumber",
    columnName: databaseColumnNames.employeeNumber,
    type: "text",
    ...commonColumnProps,
    ...getColumnWidthProps(80),
  },
  {
    columnKey: "employeeSigDate",
    columnName: databaseColumnNames.employeeSigDate,
    type: "date-time",
    ...commonColumnProps,
  },
  {
    columnKey: "documentStatus",
    columnName: databaseColumnNames.documentStatus,
    type: "text",
    ...commonColumnProps,
    ...getColumnWidthProps(120),
  },
  {
    columnKey: "documentType",
    columnName: databaseColumnNames.documentType,
    type: "text",
    ...commonColumnProps,
  },
  {
    columnKey: "documentName",
    columnName: databaseColumnNames.documentName,
    type: "text",
    ...commonColumnProps,
    ...getColumnWidthProps(150),
  },
  {
    columnKey: "companySigDate",
    columnName: databaseColumnNames.companySigDate,
    type: "date-time",
    ...commonColumnProps,
  },
  {
    columnKey: "companySignatureName",
    columnName: databaseColumnNames.companySignatureName,
    type: "text",
    ...commonColumnProps,
    ...getColumnWidthProps(120),
  },
  {
    columnKey: "employeeSignatureName",
    columnName: databaseColumnNames.employeeSignatureName,
    type: "text",
    ...commonColumnProps,
    ...getColumnWidthProps(120),
  },
  {
    columnKey: "actions_cell",
    columnName: "Actions",
    display: "flex",
    xs: 12,
    [oneLineRowBreakpoint]: "auto",
    sx: {
      width: { [oneLineRowBreakpoint]: 90 },
      justifyContent: {
        xs: "flex-end",
        [oneLineRowBreakpoint]: "center",
      },
      alignItems: "center",
    },
    type: "text",
  },
];
