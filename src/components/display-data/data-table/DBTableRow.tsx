import React, { FC } from "react";
import { Grid } from "@mui/material";
import { DatabaseRow } from "../../../api/types";
import DBTableCell from "./DBTableCell";
import { columnsDef } from "./column-settings";
import DBActionCell from "./action-panel/DBActionCell";
import DBEditingTableCell from "./DBEditingTableCell";
import { DBHandlers } from "./DBTable";
import { FormState } from "../../../store/form/types";
import { notEmpty } from "../../form/errors";

export type TRProps = {
  row?: DatabaseRow;
  oneLineRow?: boolean;
  inputFields?: FormState<"dbrecord">;
  isFetching?: boolean;
} & Omit<DBHandlers, "onCreate">;

const DBTableRow: FC<TRProps> = ({
  row,
  inputFields,
  oneLineRow,
  isFetching,
  oninput,
  onedit,
  ondelete,
  ...handlers
}) => {
  const editMode = !!inputFields;
  const createMode = !row && !!inputFields;
  const isHeader = !row && !inputFields;
  const validator = React.useMemo(() => [notEmpty], []);

  return (
    <Grid container className="table-row" role="row">
      {columnsDef.map((col_def) => {
        const { columnKey, columnName, type, ...gridProps } = col_def;

        if (isHeader)
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
              key={`${row?.id || "new-row"}-actions`}
              onedit={() => onedit(createMode ? "" : row!.id)}
              ondelete={() => ondelete(createMode ? "" : row!.id)}
              isFetching={isFetching}
              {...handlers}
            />
          );
        }

        return editMode || createMode ? (
          <DBEditingTableCell
            key={`${row?.id || "new-row"}-${columnName}`}
            label={columnName}
            inputField={inputFields[columnKey]}
            columnType={type}
            oneLineRow={oneLineRow}
            gridProps={gridProps}
            onchange={oninput(columnKey)}
            validateHelpers={validator}
          />
        ) : (
          <DBTableCell
            key={`${row!.id}-${columnName}`}
            value={row![columnKey]}
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
