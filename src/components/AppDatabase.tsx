import React from "react";
import Database from "./display-data/DataGridTable/full-featured-crud-from-mui-docs";
import { useAppDatabase } from "../hooks/useAppDatabase";
import { Paper } from "@mui/material";

const AppDatabase = () => {
  const { data } = useAppDatabase();

  return (
    <>
      <Paper>
        <Database data={data} />
      </Paper>
    </>
  );
};

export default AppDatabase;
