import React, { lazy, Suspense } from "react";
import { Paper } from "@mui/material";
import { useLoadDataQuery } from "../api/databaseAPI";
import { useDataTable } from "./display-data/data-table/useDataTable";
import LinearProgressBar from "./LinearProgressBar";
import { useAppSelector } from "../store";

const Database = lazy(() => import("./display-data/data-table/DBTable"));

const AppDatabase = () => {
  const { data, isLoading } = useLoadDataQuery();
  const { isCreate, isEdit, inputFields, ...handlers } = useDataTable();
  const fetchingID = useAppSelector(
    (state) => state.databaseStatusState.fetchingID
  );
  return (
    <Suspense>
      <Paper>
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
      </Paper>
    </Suspense>
  );
};

export default AppDatabase;
