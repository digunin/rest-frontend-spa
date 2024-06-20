import React, { FC } from "react";
import DBTableHeader from "./DBTableHeader";
import DBTableRow from "./DBTableResponsiveRow";
import {
  Box,
  Breakpoint,
  Button,
  useMediaQuery,
  useTheme,
} from "@mui/material";
import { DatabaseData, RecordID, SingleRecord } from "../../../api/types";
import { FormState } from "../../../store/form/types";
import { label_text } from "../../../utils/text";

type DBTableProps = {
  data: DatabaseData;
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
  onCreate: () => void;
};

const DatabaseTable: FC<DBTableProps> = ({
  data,
  oneLineRowBreakpoint,
  isCreate,
  isEdit,
  inputFields,
  onCreate,
  ...handlers
}) => {
  const theme = useTheme();
  const oneLineRow = useMediaQuery(theme.breakpoints.up(oneLineRowBreakpoint));
  return (
    <div className="database-table">
      <Box>
        <Button variant="outlined" onClick={onCreate} sx={{ m: 1 }}>
          {label_text.addNewRecord}
        </Button>
      </Box>
      {oneLineRow && <DBTableHeader oneLineRow={oneLineRow} {...handlers} />}
      {data.map((row) => (
        <DBTableRow
          key={row.id}
          row={row}
          inputFields={isEdit === row.id ? inputFields : undefined}
          oneLineRow={oneLineRow}
          {...handlers}
        />
      ))}
      {isCreate && (
        <DBTableRow
          key="new-row"
          inputFields={inputFields}
          oneLineRow={oneLineRow}
          {...handlers}
        />
      )}
    </div>
  );
};

export default DatabaseTable;
