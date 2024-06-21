import React, { FC } from "react";
import { Box } from "@mui/material";
import DBActioButton from "./DBActionButton";
import IconLoader from "./IconLoader";

type ActionPanelMode = "edit" | "view";
export type ViewModeCallbacks = {
  onedit: () => void;
  ondelete: () => void;
};
export type EditModeCallbacks = {
  onsave: () => void;
  oncancel: () => void;
};

type DBAProps<T extends ActionPanelMode> = {
  mode: T;
  style?: "icon" | "button";
  isFetching?: boolean;
  callbacks: T extends "view"
    ? ViewModeCallbacks
    : T extends "edit"
    ? EditModeCallbacks
    : never;
};

const DBActionPanel = <T extends ActionPanelMode>({
  mode,
  style = "icon",
  callbacks,
  isFetching = false,
}: DBAProps<T>) => {
  const isViewModeCallbacks = (
    callbacks: ViewModeCallbacks | EditModeCallbacks
  ): callbacks is ViewModeCallbacks => {
    return mode === "view";
  };

  return (
    <Box
      className="db-table-row-actions"
      sx={{
        width: { lg: "100%" },
      }}
      display={"flex"}
      justifyContent={"space-around"}
    >
      {isViewModeCallbacks(callbacks) ? (
        <>
          <DBActioButton
            action="edit"
            disabled={isFetching}
            onclick={callbacks.onedit}
          />
          <DBActioButton
            action="delete"
            disabled={isFetching}
            onclick={callbacks.ondelete}
          />
        </>
      ) : (
        <>
          <DBActioButton
            action="save"
            disabled={isFetching}
            onclick={callbacks.onsave}
          />
          <DBActioButton
            action="cancel"
            disabled={isFetching}
            onclick={callbacks.oncancel}
          />
        </>
      )}
      <IconLoader spin={isFetching} />
    </Box>
  );
};

export default DBActionPanel;
