import React from "react";
import { Box, LinearProgress } from "@mui/material";

const LinearProgressBar = ({ show }: { show: boolean }) => {
  const styles = { height: "5px" };
  return show ? (
    <LinearProgress sx={styles}></LinearProgress>
  ) : (
    <Box component="div" sx={styles}></Box>
  );
};

export default LinearProgressBar;
