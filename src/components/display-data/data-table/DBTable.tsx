import React, { FC } from "react";
import DBTableHeader from "./DBTableHeader";
import DBTableRow from "./DBTableRow";
import { Breakpoint, useMediaQuery, useTheme } from "@mui/material";
import { DatabaseData, RecordID, SingleRecord } from "../../../api/types";
import DBTableRowExpandable from "./DBTableRowExpandable";
import { FormState } from "../../../store/form/types";

type DBTableProps = {
  data: DatabaseData;
  loading: boolean;
  oneLineRowBreakpoint: Breakpoint;
  isCreate: boolean;
  isEdit: RecordID | null;
  inputFields: FormState<"dbrecord">;
} & DBHandlers;

export type DBHandlers = {
  onedit: (id: RecordID) => void;
  ondelete: (id: RecordID) => void;
  oncancel: () => void;
  onsave: () => void;
  oninput: (name: keyof SingleRecord) => (value: string, error: string) => void;
};

const DatabaseTable: FC<DBTableProps> = ({
  data,
  loading,
  oneLineRowBreakpoint,
  isCreate,
  isEdit,
  inputFields,
  ...handlers
}) => {
  const theme = useTheme();
  const oneLineRow = useMediaQuery(theme.breakpoints.up(oneLineRowBreakpoint));
  return (
    <div className="database-table">
      {oneLineRow && (
        <DBTableHeader
          oneLineRowBreakpoint={oneLineRowBreakpoint}
          {...handlers}
        />
      )}
      {data.map((row) =>
        oneLineRow ? (
          <DBTableRow
            key={row.id}
            row={row}
            inputFields={isEdit === row.id ? inputFields : undefined}
            oneLineRowBreakpoint={oneLineRowBreakpoint}
            {...handlers}
          />
        ) : (
          <DBTableRowExpandable
            key={row.id}
            row={row}
            inputFields={isEdit === row.id ? inputFields : undefined}
            oneLineRowBreakpoint={oneLineRowBreakpoint}
            {...handlers}
          />
        )
      )}
    </div>
  );
};

export default DatabaseTable;
