import React, { FC } from "react";
import { Grid } from "@mui/material";
import { DBCell } from "../DBTableCell";
import DBActionPanel, {
  EditModeCallbacks,
  ViewModeCallbacks,
} from "./DBActionPanel";

type DBACell = ViewModeCallbacks &
  EditModeCallbacks &
  Omit<DBCell, "label" | "value"> & {
    isFetching?: boolean;
    editMode?: boolean;
  };

const DBActionCell: FC<DBACell> = ({
  isHead,
  onedit,
  ondelete,
  oncancel,
  onsave,
  editMode,
  isFetching,
  ...gridProps
}) => {
  return (
    <Grid item {...gridProps}>
      {editMode ? (
        <DBActionPanel<"edit">
          mode="edit"
          isFetching={isFetching}
          callbacks={{
            oncancel,
            onsave,
          }}
        />
      ) : (
        <DBActionPanel<"view">
          mode="view"
          isFetching={isFetching}
          callbacks={{
            onedit,
            ondelete,
          }}
        />
      )}
    </Grid>
  );
};

export default DBActionCell;
