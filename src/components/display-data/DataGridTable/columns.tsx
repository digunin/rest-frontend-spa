import { GridColDef } from "@mui/x-data-grid";

export const createColumnsWithActions = (actions: GridColDef): GridColDef[] => {
  return [...columns, actions];
};

const columns: GridColDef[] = [
  {
    field: "employeeNumber",
    headerName: "employeeNumber",
    editable: true,
  },
  {
    field: "employeeSigDate",
    headerName: "employeeSigDate",
    editable: true,
  },
  {
    field: "documentType",
    headerName: "documentType",
    editable: true,
  },
  {
    field: "documentName",
    headerName: "documentName",
    editable: true,
  },
  {
    field: "documentStatus",
    headerName: "documentStatus",
    editable: true,
  },
  {
    field: "companySigDate",
    headerName: "companySigDate",
    editable: true,
  },
  {
    field: "employeeSignatureName",
    headerName: "employeeSignatureName",
    editable: true,
  },
  {
    field: "companySignatureName",
    headerName: "companySignatureName",
    editable: true,
  },
];
