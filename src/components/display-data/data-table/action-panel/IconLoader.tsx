import React from "react";
import { IconButton } from "@mui/material";
import LoopIcon from "@mui/icons-material/Autorenew";

const spinAnimationStyle = {
  animation: "spin 2s linear infinite",
  "@keyframes spin": {
    "0%": {
      transform: "rotate(0deg)",
    },
    "100%": {
      transform: "rotate(360deg)",
    },
  },
};

const IconLoader = ({ spin }: { spin: boolean }) => {
  return (
    <IconButton
      color="inherit"
      role="alert"
      aria-busy="true"
      aria-label="loader"
      disabled={!spin}
      sx={spin ? spinAnimationStyle : {}}
    >
      <LoopIcon fontSize="small" color={spin ? "warning" : "inherit"} />
    </IconButton>
  );
};

export default IconLoader;
