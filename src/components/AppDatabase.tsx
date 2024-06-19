import React, { lazy, Suspense } from "react";
import { Paper } from "@mui/material";
import { useLoadDataQuery } from "../api/databaseAPI";
import { useDataTable } from "./display-data/data-table/useDataTable";

const Database = lazy(() => import("./display-data/data-table/DBTable"));

const AppDatabase = () => {
  const { data, isLoading: loading } = useLoadDataQuery();
  const { isCreate, isEdit, inputFields, ...handlers } = useDataTable();
  return (
    <Suspense>
      <Paper>
        <Database
          data={data || []}
          loading={loading}
          oneLineRowBreakpoint="lg"
          isCreate={isCreate}
          isEdit={isEdit}
          inputFields={inputFields}
          {...handlers}
        />
      </Paper>
    </Suspense>
  );
};

export default AppDatabase;
