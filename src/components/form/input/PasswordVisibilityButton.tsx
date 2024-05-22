import { Visibility, VisibilityOff } from "@mui/icons-material";
import { IconButton, InputAdornment, Tooltip } from "@mui/material";
import React, { FC } from "react";

export type PVBProps = {
  show: boolean;
  onclick: () => void;
};

const PasswordVisibilityButton: FC<PVBProps> = ({ show = false, onclick }) => {
  return (
    <InputAdornment position="end">
      <Tooltip
        title={show ? "Скрыть пароль" : "Показать пароль"}
        arrow
        placement="top"
      >
        <IconButton aria-label="toggle password visibility" onClick={onclick}>
          {show ? <Visibility /> : <VisibilityOff />}
        </IconButton>
      </Tooltip>
    </InputAdornment>
  );
};

export default PasswordVisibilityButton;
