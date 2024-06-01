import * as React from "react";
import Box from "@mui/material/Box";
import { DataGrid, GridSlots } from "@mui/x-data-grid";
import { DatabaseData } from "../../../store/database/databaseSlice";
import DataGridToolbar from "./DataGridToolbar";
import { useDataGrid } from "./useDataGrid";

type CrudDataGrid = { data: DatabaseData; loading: boolean };

const FullFeaturedCrudGrid: React.FC<CrudDataGrid> = ({ data, loading }) => {
  const { rows, rowModesModel, columns, handlers, apiRef } = useDataGrid(data);
  const {
    handleAddNewRow,
    handleRowEditStop,
    handleRowModesModelChange,
    processRowUpdate,
    onProcessRowUpdateError,
  } = handlers;

  return (
    <Box
      sx={{
        minHeight: 450,
        width: "100%",
        "& .actions": {
          color: "text.secondary",
        },
        "& .textPrimary": {
          color: "text.primary",
        },
      }}
    >
      <DataGrid
        rows={rows}
        columns={columns}
        editMode="row"
        rowModesModel={rowModesModel}
        onRowModesModelChange={handleRowModesModelChange}
        onRowEditStop={handleRowEditStop}
        processRowUpdate={processRowUpdate}
        onProcessRowUpdateError={onProcessRowUpdateError}
        slots={{
          toolbar: DataGridToolbar as GridSlots["toolbar"],
        }}
        slotProps={{
          toolbar: { handleAddNewRow },
        }}
        initialState={{
          pagination: { paginationModel: { pageSize: 5 } },
          sorting: { sortModel: [{ field: "employeeSigDate", sort: "desc" }] },
        }}
        pageSizeOptions={[5, 10, 25, 50, 100]}
        sx={{ minHeight: 450, p: 1 }}
        apiRef={apiRef}
        loading={loading}
      />
    </Box>
  );
};

export default FullFeaturedCrudGrid;
