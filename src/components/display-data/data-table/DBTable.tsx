import React, { FC } from "react";
import DBTableHeader from "./DBTableHeader";
import DBTableRow from "./DBTableRow";
import { Breakpoint, useMediaQuery, useTheme } from "@mui/material";
import { DatabaseData } from "../../../api/types";

type DBTableProps = {
  data: DatabaseData;
  loading: boolean;
  oneLineRowBreakpoint: Breakpoint;
};

const DatabaseTable: FC<DBTableProps> = ({
  data,
  loading,
  oneLineRowBreakpoint,
}) => {
  const theme = useTheme();
  const oneLineRow = useMediaQuery(theme.breakpoints.up(oneLineRowBreakpoint));
  return (
    <div className="database-table">
      {oneLineRow && (
        <DBTableHeader oneLineRowBreakpoint={oneLineRowBreakpoint} />
      )}
      {data.map((row) => (
        <DBTableRow
          key={row.id}
          row={row}
          oneLineRowBreakpoint={oneLineRowBreakpoint}
        />
      ))}
    </div>
  );
};

export default DatabaseTable;
