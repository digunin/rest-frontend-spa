import React, { lazy, Suspense } from "react";
import { Paper } from "@mui/material";
import { useLoadDataQuery } from "../api/databaseAPI";

const Database = lazy(
  () => import("./display-data/DataGridTable/FullFeaturedCrudGrid")
);

const AppDatabase = () => {
  const { data, isLoading: loading } = useLoadDataQuery();
  return (
    <Suspense>
      <Paper>
        <Database data={data || []} loading={loading} />
      </Paper>
    </Suspense>
  );
};

export default AppDatabase;
