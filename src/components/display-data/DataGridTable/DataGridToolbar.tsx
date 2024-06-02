import React, { FC } from "react";
import { GridToolbarContainer } from "@mui/x-data-grid";
import { Button } from "@mui/material";
import AddIcon from "@mui/icons-material/Add";
import { label_text } from "../../../utils/text";

interface DataGridProps {
  handleAddNewRow: () => void;
}

const DataGridToolbar: FC<DataGridProps> = ({ handleAddNewRow }) => {
  return (
    <GridToolbarContainer sx={{ justifyContent: "space-between" }}>
      <Button color="primary" startIcon={<AddIcon />} onClick={handleAddNewRow}>
        {label_text.addNewRecord}
      </Button>
    </GridToolbarContainer>
  );
};

export default DataGridToolbar;
