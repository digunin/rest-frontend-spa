import React, { lazy, Suspense } from "react";
// import Database from "./display-data/DataGridTable/FullFeaturedCrudGrid";
import { useAppDatabase } from "../hooks/useAppDatabase";
import { Paper } from "@mui/material";

const Database = lazy(
  () => import("./display-data/DataGridTable/FullFeaturedCrudGrid")
);

const AppDatabase = () => {
  const { data, loading } = useAppDatabase();

  return (
    <Suspense>
      <Paper>
        <Database data={data} loading={loading} />
      </Paper>
    </Suspense>
  );
};

export default AppDatabase;
