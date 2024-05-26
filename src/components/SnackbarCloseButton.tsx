import { IconButton } from "@mui/material";
import { Close } from "@mui/icons-material";
import React from "react";

const CloseButton = ({ onclose }: { onclose: () => void }) => {
  return (
    <>
      <IconButton
        size="small"
        aria-label="close"
        color="inherit"
        onClick={onclose}
      >
        <Close fontSize="small" />
      </IconButton>
    </>
  );
};

export default CloseButton;
