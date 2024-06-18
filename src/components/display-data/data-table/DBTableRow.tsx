import React, { FC } from "react";
import { Breakpoint, Grid, useMediaQuery, useTheme } from "@mui/material";
import { DatabaseRow } from "../../../api/types";
import DBTableCell from "./DBTableCell";
import { columnsDef } from "./column-settings";
import DBActionCell from "./action-panel/DBActionCell";

export type TRProps = {
  row?: DatabaseRow;
  editMode?: boolean;
  oneLineRowBreakpoint: Breakpoint;
};

const DBTableRow: FC<TRProps> = ({ row, editMode, oneLineRowBreakpoint }) => {
  const theme = useTheme();
  const oneLineRow = useMediaQuery(theme.breakpoints.up(oneLineRowBreakpoint));

  return (
    <Grid container className="table-row">
      {columnsDef.map((col_def) => {
        const { columnKey, columnName, type, ...gridProps } = col_def;

        if (!row)
          return (
            <DBTableCell
              key={`header-${columnName}`}
              value={columnName}
              label={columnName}
              isHead={true}
              oneLineRow={oneLineRow}
              {...gridProps}
            />
          );

        if (columnKey === "actions_cell") {
          return (
            <DBActionCell
              {...gridProps}
              editMode={editMode}
              key={`${row.id}-actions`}
              onedit={() => console.log("edit: ", row.id)}
              ondelete={() => console.log("delete: ", row.id)}
              oncancel={() => console.log("cancel: ", row.id)}
              onsave={() => console.log("save: ", row.id)}
            />
          );
        }

        return (
          <DBTableCell
            key={`${row.id}-${columnName}`}
            value={row[columnKey]}
            label={columnName}
            editMode={editMode}
            columnType={type}
            oneLineRow={oneLineRow}
            {...gridProps}
          />
        );
      })}
    </Grid>
  );
};

export default DBTableRow;
