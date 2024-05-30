import * as React from "react";
import Box from "@mui/material/Box";
import { DataGrid, GridSlots } from "@mui/x-data-grid";
import { DatabaseData } from "../../../store/database/databaseSlice";
import DataGridToolbar from "./DataGridToolbar";
import { useDataGrid } from "./useDataGrid";

const FullFeaturedCrudGrid = ({ data }: { data: DatabaseData }) => {
  const { rows, setRows, rowModesModel, setRowModesModel, columns, handlers } =
    useDataGrid(data);

  return (
    <Box
      sx={{
        height: 500,
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
        onRowModesModelChange={handlers.handleRowModesModelChange}
        onRowEditStop={handlers.handleRowEditStop}
        processRowUpdate={handlers.processRowUpdate}
        slots={{
          toolbar: DataGridToolbar as GridSlots["toolbar"],
        }}
        slotProps={{
          toolbar: { setRows, setRowModesModel },
        }}
      />
    </Box>
  );
};

export default FullFeaturedCrudGrid;
