import React, { FC } from "react";
import { Grid } from "@mui/material";
import { DBCell } from "../DBTableCell";
import DBActionPanel, {
  EditModeCallbacks,
  ViewModeCallbacks,
} from "./DBActionPanel";

type DBACell = ViewModeCallbacks &
  EditModeCallbacks &
  Omit<DBCell, "label" | "value"> & { isLoading?: boolean; editMode?: boolean };

const DBActionCell: FC<DBACell> = ({
  isHead,
  onedit,
  ondelete,
  oncancel,
  onsave,
  editMode,
  isLoading,
  ...gridProps
}) => {
  return (
    <Grid item {...gridProps}>
      {editMode ? (
        <DBActionPanel<"edit">
          mode="edit"
          isLoading={isLoading}
          callbacks={{
            oncancel,
            onsave,
          }}
        />
      ) : (
        <DBActionPanel<"view">
          mode="view"
          isLoading={isLoading}
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
