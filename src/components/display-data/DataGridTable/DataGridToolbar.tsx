import React, { FC } from "react";
import { GridToolbarContainer } from "@mui/x-data-grid";
import { Button } from "@mui/material";
import AddIcon from "@mui/icons-material/Add";
import { Replay as Stop } from "@mui/icons-material";
import { label_text } from "../../../utils/text";

interface DataGridProps {
  handleAddNewRow: () => void;
  abortFetch?: () => void;
  loading: boolean;
}

const DataGridToolbar: FC<DataGridProps> = ({
  handleAddNewRow,
  abortFetch,
  loading,
}) => {
  return (
    <GridToolbarContainer sx={{ justifyContent: "space-between" }}>
      <Button color="primary" startIcon={<AddIcon />} onClick={handleAddNewRow}>
        {label_text.addNewRecord}
      </Button>
      <Button
        variant="outlined"
        color="warning"
        disabled={!loading || !abortFetch}
        size="small"
        startIcon={<Stop />}
        onClick={abortFetch}
      >
        {label_text.abortFetch}
      </Button>
    </GridToolbarContainer>
  );
};

export default DataGridToolbar;
