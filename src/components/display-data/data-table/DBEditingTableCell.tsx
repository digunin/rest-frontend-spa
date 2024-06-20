import React, { FC } from "react";
import { DBCell } from "./DBTableCell";
import { WithHandlingError } from "../../form/errors/WithErrorHandling";
import { Grid, GridProps } from "@mui/material";
import TextInput, { TIProps } from "../../form/input/TextInput";

type EditingTableCell = Omit<DBCell, "value" | "editMode" | "isHead"> &
  WithHandlingError &
  TIProps & { gridProps: GridProps };

const DBEditingTableCell: FC<EditingTableCell> = ({
  inputField,
  onchange,
  label,
  oneLineRow,
  columnType = "text",
  validateHelpers,
  validateOptions,
  mutators,
  gridProps,
  ...textFieldProps
}) => {
  const { value, error } = inputField;
  const toolTip = error || "";

  return React.useMemo(
    () => (
      <Grid item {...gridProps}>
        <TextInput
          fullWidth
          title={oneLineRow ? error || "" : ""}
          inputField={inputField}
          variant={"outlined"}
          label={oneLineRow ? "" : label}
          hiddenLabel={oneLineRow}
          needHelperText={!oneLineRow}
          margin={oneLineRow ? "none" : "dense"}
          sx={{
            "& .MuiInputBase-input": {
              overflow: "hidden",
              textOverflow: "ellipsis",
            },
          }}
          {...textFieldProps}
          validateHelpers={validateHelpers}
          validateOptions={validateOptions}
          mutators={mutators}
          onchange={onchange}
        />
      </Grid>
    ),
    [oneLineRow, label, inputField, validateHelpers, validateOptions, mutators]
  );
};

export default DBEditingTableCell;
