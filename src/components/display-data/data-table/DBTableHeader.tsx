import React from "react";
import DBTableRow, { TRProps } from "./DBTableRow";

const DBTableHeader = (props: TRProps) => {
  return <DBTableRow {...props} />;
};

export default DBTableHeader;
