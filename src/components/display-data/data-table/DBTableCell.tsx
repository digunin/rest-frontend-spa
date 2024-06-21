import { Grid, GridProps, TextField, Tooltip } from "@mui/material";
import React, { FC } from "react";
import { ColumnType } from "./column-settings";

export type DBCell = GridProps & {
  value: string;
  label: string;
  isHead?: boolean;
  oneLineRow?: boolean;
  columnType?: ColumnType;
};

const DBTableCell: FC<DBCell> = ({
  value,
  label,
  isHead,
  oneLineRow,
  columnType = "text",
  ...gridProps
}) => {
  const [toolTip, correctValue] =
    !isHead && columnType === "date-time"
      ? oneLineRow
        ? [
            new Date(value).toLocaleString(),
            new Date(value).toLocaleDateString(),
          ]
        : [new Date(value).toLocaleString(), new Date(value).toLocaleString()]
      : [value, value];

  return (
    <Grid item {...gridProps}>
      <Tooltip title={`${oneLineRow ? toolTip : ""}`}>
        <TextField
          InputProps={{
            readOnly: true,
          }}
          fullWidth
          variant={isHead ? "filled" : "outlined"}
          label={oneLineRow ? "" : label}
          value={correctValue}
          hiddenLabel={isHead && oneLineRow}
          margin={oneLineRow ? "none" : "dense"}
          sx={{
            "& .MuiInputBase-input": {
              overflow: "hidden",
              textOverflow: "ellipsis",
            },
          }}
        />
      </Tooltip>
    </Grid>
  );
};

export default React.memo(DBTableCell);
