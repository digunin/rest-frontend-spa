import React, { FC } from "react";
import { DBCell } from "./DBTableCell";
import {
  WithHandlingError,
  TextInput,
  TextInputProps,
} from "simple-mui-redux-form";
import { Grid, GridProps } from "@mui/material";
import DateTimeInput from "../../form/input/DateTimeInput";

type EditingTableCell = Omit<DBCell, "value" | "editMode" | "isHead"> &
  WithHandlingError &
  TextInputProps & { gridProps: GridProps };

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

  const commonProps = { inputField, label: oneLineRow ? "" : label, onchange };

  return React.useMemo(
    () => (
      <Grid item {...gridProps}>
        {columnType === "text" ? (
          <TextInput
            fullWidth
            title={oneLineRow ? error || "" : ""}
            variant={"outlined"}
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
            {...commonProps}
          />
        ) : (
          <DateTimeInput {...commonProps} />
        )}
      </Grid>
    ),
    [oneLineRow, label, inputField, validateHelpers, validateOptions, mutators]
  );
};

export default DBEditingTableCell;
