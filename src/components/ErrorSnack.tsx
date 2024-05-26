import React, { useEffect, useState } from "react";
import Snackbar from "@mui/material/Snackbar";
import Slide, { SlideProps } from "@mui/material/Slide";
import { Alert } from "@mui/material";

export type ESProps = {
  message: string;
  openedSnacks?: number;
};

const ErrorSnack = ({ message, openedSnacks = 0 }: ESProps) => {
  const [open, setOpen] = useState(false);

  useEffect(() => setOpen(true), []);

  const handleClose = (
    event: React.SyntheticEvent | Event,
    reason?: string
  ) => {
    if (reason === "clickaway") {
      return;
    }
    setOpen(false);
  };

  return (
    <Snackbar
      sx={{ width: "300px", bottom: { xs: `${24 + openedSnacks * 50}px` } }}
      open={open}
      onClose={handleClose}
      anchorOrigin={{ vertical: "bottom", horizontal: "left" }}
      TransitionComponent={(props: SlideProps) => {
        return <Slide {...props} direction="right" />;
      }}
      autoHideDuration={3000}
      key={`${message}${Math.floor(Math.random() * 10000)}`}
    >
      <Alert
        onClose={handleClose}
        severity="error"
        variant="filled"
        sx={{ width: "100%" }}
      >
        {message}
      </Alert>
    </Snackbar>
  );
};

export default ErrorSnack;
