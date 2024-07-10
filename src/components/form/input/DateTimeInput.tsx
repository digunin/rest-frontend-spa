import React, { FC, useEffect } from "react";
import {
  DateTimePicker,
  DateTimePickerProps,
} from "@mui/x-date-pickers/DateTimePicker";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { InputField } from "simple-mui-redux-form";
import {
  LocalizationProvider,
  PickerChangeHandlerContext,
  DateTimeValidationError,
} from "@mui/x-date-pickers";
import dayjs, { Dayjs } from "dayjs";
import "dayjs/locale/ru";

type DTIProps = DateTimePickerProps<Dayjs> & {
  inputField: InputField;
  onchange: (value: string, error: string) => void;
};

const DateTimeInput: FC<DTIProps> = ({
  inputField,
  label,
  onchange,
  ...other
}) => {
  const now = dayjs();

  useEffect(() => {
    if (value) return;
    onchange(now.toISOString(), "");
  }, []);

  const sx = label ? {} : { margin: 0 };
  const { value } = inputField;
  const handleChange = (
    inputValue: dayjs.Dayjs | null,
    context: PickerChangeHandlerContext<DateTimeValidationError>
  ) => {
    const newValue = context.validationError
      ? value
      : inputValue?.toISOString() || value;
    onchange(newValue, context.validationError || "");
  };

  return (
    <LocalizationProvider adapterLocale="ru" dateAdapter={AdapterDayjs}>
      <DateTimePicker
        label={label}
        format="DD.MM.YYYY, HH:mm:ss"
        value={dayjs(value || now)}
        sx={sx}
        onChange={handleChange}
        {...other}
      />
    </LocalizationProvider>
  );
};

export default DateTimeInput;
