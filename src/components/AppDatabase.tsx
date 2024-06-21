import React, { lazy, Suspense } from "react";
import { Paper } from "@mui/material";
import { useLoadDataQuery } from "../api/databaseAPI";
import { useDataTable } from "./display-data/data-table/useDataTable";
import LinearProgressBar from "./LinearProgressBar";
import { useAppSelector } from "../store";
import AppConfirmDialog from "./display-data/DataGridTable/AppConfirmDialog";

const Database = lazy(() => import("./display-data/data-table/DBTable"));
const MuiDataGrid = lazy(
  () => import("./display-data/DataGridTable/FullFeaturedCrudGrid")
);

const AppDatabase = () => {
  const { data, isLoading } = useLoadDataQuery();
  const muiDataGridView = useAppSelector(
    (state) => state.dbRowModeState.muiDataGridView
  );
  const {
    isCreate,
    isEdit,
    inputFields,
    confirmOpen,
    onClose,
    onConfirm,
    ...handlers
  } = useDataTable();
  const fetchingID = useAppSelector(
    (state) => state.databaseStatusState.fetchingID
  );
  return (
    <Suspense>
      <Paper>
        {muiDataGridView ? (
          <MuiDataGrid data={data || []} loading={isLoading} />
        ) : (
          <>
            <LinearProgressBar show={isLoading} />
            <Database
              data={data || []}
              oneLineRowBreakpoint="lg"
              isCreate={isCreate}
              isEdit={isEdit}
              inputFields={inputFields}
              fetchingID={fetchingID}
              {...handlers}
            />
            <AppConfirmDialog
              title="Подтвердите удаление"
              body=""
              open={!!confirmOpen}
              onClose={onClose}
              onConfirm={onConfirm()}
            />
          </>
        )}
      </Paper>
    </Suspense>
  );
};

export default AppDatabase;
