import React, { FC } from "react";
import { Breakpoint, Grid, useMediaQuery, useTheme } from "@mui/material";
import { DatabaseRow } from "../../../api/types";
import DBTableCell from "./DBTableCell";
import { columnsDef } from "./column-settings";
import DBActionCell from "./action-panel/DBActionCell";
import DBEditingTableCell from "./DBEditingTableCell";
import { DBHandlers } from "./DBTable";
import { FormState } from "../../../store/form/types";

export type TRProps = {
  row?: DatabaseRow;
  oneLineRowBreakpoint: Breakpoint;
  inputFields?: FormState<"dbrecord">;
} & DBHandlers;

const DBTableRow: FC<TRProps> = ({
  row,
  inputFields,
  oneLineRowBreakpoint,
  oninput,
  onedit,
  ondelete,
  ...handlers
}) => {
  const theme = useTheme();
  const oneLineRow = useMediaQuery(theme.breakpoints.up(oneLineRowBreakpoint));
  const editMode = !!inputFields;

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
              onedit={() => onedit(row.id)}
              ondelete={() => ondelete(row.id)}
              {...handlers}
            />
          );
        }

        return editMode ? (
          <DBEditingTableCell
            key={`${row.id}-${columnName}`}
            label={columnName}
            inputField={inputFields[columnKey]}
            columnType={type}
            oneLineRow={oneLineRow}
            gridProps={gridProps}
            onchange={oninput(columnKey)}
          />
        ) : (
          <DBTableCell
            key={`${row.id}-${columnName}`}
            value={row[columnKey]}
            label={columnName}
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
