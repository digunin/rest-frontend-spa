import React, { FC } from "react";
import DBTableRow, { TRProps } from "./DBTableRow";
import DBTableRowExpandable from "./DBTableRowExpandable";

const ResponsiveRow: FC<TRProps> = (props) => {
  return props.oneLineRow ? (
    <DBTableRow {...props} />
  ) : (
    <DBTableRowExpandable {...props} />
  );
};

export default ResponsiveRow;
