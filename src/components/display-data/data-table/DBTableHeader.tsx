import React from "react";
import DBTableRow from "./DBTableRow";
import { Breakpoint } from "@mui/material";

const DBTableHeader = ({
  oneLineRowBreakpoint,
}: {
  oneLineRowBreakpoint: Breakpoint;
}) => {
  return <DBTableRow oneLineRowBreakpoint={oneLineRowBreakpoint} />;
};

export default DBTableHeader;
