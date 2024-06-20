import React from "react";
import DBTableRow, { TRProps } from "./DBTableRow";

const DBTableHeader = (props: TRProps) => {
  return <DBTableRow {...props} />;
};

export default React.memo(
  DBTableHeader,
  (prev, next) => prev.oneLineRow === next.oneLineRow
);
