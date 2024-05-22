import { Visibility, VisibilityOff } from "@mui/icons-material";
import { IconButton, InputAdornment, Tooltip } from "@mui/material";
import React from "react";

const PasswordVisibilityButton = ({
  show = false,
  tooltip,
  onclick,
}: {
  show: boolean;
  tooltip: string;
  onclick: () => void;
}) => {
  return (
    <InputAdornment position="end">
      <Tooltip title={tooltip} arrow placement="top">
        <IconButton aria-label="toggle password visibility" onClick={onclick}>
          {show ? <Visibility /> : <VisibilityOff />}
        </IconButton>
      </Tooltip>
    </InputAdornment>
  );
};

export default PasswordVisibilityButton;
