import React, { FC } from "react";
import { GridToolbarContainer } from "@mui/x-data-grid";
import { Button } from "@mui/material";
import AddIcon from "@mui/icons-material/Add";

interface DataGridProps {
  handleAddNewRow: () => void;
}

const DataGridToolbar: FC<DataGridProps> = ({ handleAddNewRow }) => {
  return (
    <GridToolbarContainer>
      <Button color="primary" startIcon={<AddIcon />} onClick={handleAddNewRow}>
        Add record
      </Button>
    </GridToolbarContainer>
  );
};

export default DataGridToolbar;
