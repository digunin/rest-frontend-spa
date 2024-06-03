import * as React from "react";
import Box from "@mui/material/Box";
import { DataGrid, GridSlots } from "@mui/x-data-grid";
import { DatabaseData } from "../../../store/database/databaseSlice";
import DataGridToolbar from "./DataGridToolbar";
import { useDataGrid } from "./useDataGrid";
import AppConfirmDialog from "./AppConfirmDialog";

const testMode = process.env.NODE_ENV === "test";

const commonBoxStyles = {
  width: "100%",
  "& .actions": {
    color: "text.secondary",
  },
  "& .textPrimary": {
    color: "text.primary",
  },
};

const testBoxStyles = {
  minHeight: 450,
  ...commonBoxStyles,
};

type CrudDataGrid = { data: DatabaseData; loading: boolean };

const FullFeaturedCrudGrid: React.FC<CrudDataGrid> = ({ data, loading }) => {
  const {
    rows,
    rowModesModel,
    columns,
    handlers,
    apiRef,
    activeRequests,
    confirmOpen,
  } = useDataGrid(data);
  const {
    handleAddNewRow,
    handleRowEditStop,
    handleRowModesModelChange,
    processRowUpdate,
    onProcessRowUpdateError,
    onClose,
    onConfirm,
    abortFetch,
  } = handlers;

  return React.useMemo(
    () => (
      <Box
        sx={
          testMode
            ? testBoxStyles
            : {
                height: "65vh",
                ...commonBoxStyles,
              }
        }
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
            pagination: testMode
              ? { paginationModel: { pageSize: 10 } }
              : undefined,
            sorting: {
              sortModel: [{ field: "employeeSigDate", sort: "desc" }],
            },
          }}
          sx={{ minHeight: testMode ? 450 : "auto", p: 1 }}
          apiRef={apiRef}
          loading={loading && !activeRequests}
          pageSizeOptions={[5, 10, 25, 50, 100]}
          autoPageSize={testMode ? false : true}
        />
        <AppConfirmDialog
          title="Подтвердите удаление"
          body=""
          open={confirmOpen}
          onClose={onClose}
          onConfirm={onConfirm()}
        />
      </Box>
    ),
    [
      data,
      loading,
      rows,
      rowModesModel,
      columns,
      apiRef,
      handleAddNewRow,
      handleRowEditStop,
      handleRowModesModelChange,
      processRowUpdate,
      onProcessRowUpdateError,
      abortFetch,
      activeRequests,
      onClose,
      onConfirm,
      confirmOpen,
    ]
  );
};

export default FullFeaturedCrudGrid;
