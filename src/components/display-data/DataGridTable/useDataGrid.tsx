import React, { useEffect, useState } from "react";
import {
  DatabaseData,
  DatabaseRow,
} from "../../../store/database/databaseSlice";
import {
  GridActionsCellItem,
  GridColDef,
  GridEventListener,
  GridRowEditStopReasons,
  GridRowId,
  GridRowModel,
  GridRowModes,
  GridRowModesModel,
  useGridApiRef,
} from "@mui/x-data-grid";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/DeleteOutlined";
import SaveIcon from "@mui/icons-material/Save";
import CancelIcon from "@mui/icons-material/Close";
import { createColumnsWithActions } from "./columns";
import { RecordID } from "../../../api/types";
import { emptySingleRecord } from "../../../utils/mock.fetch";
import { nanoid } from "nanoid";
import { useAppSnackbar } from "../../../hooks/useAppSnackbar";

export const useDataGrid = (data: DatabaseData) => {
  const [rows, setRows] = useState<DatabaseData>(data);
  const [rowModesModel, setRowModesModel] = useState<GridRowModesModel>({});
  const { showSnackbar } = useAppSnackbar();

  // newRows - массив копий свежесозданных строк,
  // которые еще не сохранены в redux-store.
  // Не нужен, если запретить создавать новые строки,
  // когда есть хоть одна созданная, но не сохраненная
  const [newRows, setNewRows] = useState<DatabaseData>([]);

  const apiRef = useGridApiRef();

  useEffect(() => setRows([...data, ...newRows]), [data]);

  const handleRowEditStop: GridEventListener<"rowEditStop"> = (
    params,
    event
  ) => {
    event.defaultMuiPrevented = true;
    switch (params.reason) {
      case GridRowEditStopReasons.escapeKeyDown:
        handleCancelClick(params.id)();
        break;
      case GridRowEditStopReasons.enterKeyDown:
        handleSaveClick(params.id)();
    }
  };

  const handleEditClick = (id: GridRowId) => () => {
    setRowModesModel({ ...rowModesModel, [id]: { mode: GridRowModes.Edit } });
  };

  const handleSaveClick = (id: GridRowId) => () => {
    setRowModesModel({ ...rowModesModel, [id]: { mode: GridRowModes.View } });
  };

  const handleDeleteClick = (id: GridRowId) => () => {
    removeRow(id as RecordID);
  };

  const handleCancelClick = (id: GridRowId) => () => {
    setRowModesModel({
      ...rowModesModel,
      [id]: { mode: GridRowModes.View, ignoreModifications: true },
    });

    const editedRow = newRows.find((row) => row.id === id);
    if (editedRow) {
      removeRow(id as RecordID);
    }
  };

  const processRowUpdate = (newRow: GridRowModel<DatabaseRow>) => {
    if (newRow.employeeNumber) return newRow;
    return Promise.reject('Поле "employeeNumber" не может быть пустым');
  };

  const onProcessRowUpdateError = (error: string) => {
    showSnackbar(error);
  };

  const handleRowModesModelChange = (newRowModesModel: GridRowModesModel) => {
    setRowModesModel(newRowModesModel);
  };

  const handleAddNewRow = () => {
    const newRow = {
      id: nanoid(),
      ...emptySingleRecord,
      companySigDate: new Date().toISOString(),
      employeeSigDate: new Date().toISOString(),
    };
    addNewRow(newRow);
    setRowModesModel((oldModel) => ({
      ...oldModel,
      [newRow.id]: {
        mode: GridRowModes.Edit,
        fieldToFocus: "employeeNumber",
      },
    }));
    apiRef.current.setPage(0);
    apiRef.current.sortColumn("companySigDate", "desc");
  };

  const addNewRow = (newRow: DatabaseRow) => {
    setNewRows((prev) => [...prev, newRow]);
    setRows((prev) => [...prev, newRow]);
  };

  const removeRow = (id: RecordID) => {
    setNewRows((prev) => prev.filter((row) => row.id !== id));
    setRows((prev) => prev.filter((row) => row.id !== id));
  };

  const columns: GridColDef[] = createColumnsWithActions({
    field: "actions",
    type: "actions",
    headerName: "Actions",
    width: 100,
    cellClassName: "actions",
    getActions: ({ id }) => {
      const isInEditMode = rowModesModel[id]?.mode === GridRowModes.Edit;

      if (isInEditMode) {
        return [
          <GridActionsCellItem
            icon={<SaveIcon />}
            label="Save"
            sx={{
              color: "primary.main",
            }}
            onClick={handleSaveClick(id)}
          />,
          <GridActionsCellItem
            icon={<CancelIcon />}
            label="Cancel"
            className="textPrimary"
            onClick={handleCancelClick(id)}
            color="inherit"
          />,
        ];
      }

      return [
        <GridActionsCellItem
          icon={<EditIcon />}
          label="Edit"
          className="textPrimary"
          onClick={handleEditClick(id)}
          color="inherit"
        />,
        <GridActionsCellItem
          icon={<DeleteIcon />}
          label="Delete"
          onClick={handleDeleteClick(id)}
          color="inherit"
        />,
      ];
    },
  });

  const handlers = {
    handleRowEditStop,
    processRowUpdate,
    handleRowModesModelChange,
    handleAddNewRow,
    onProcessRowUpdateError,
  };

  return {
    rows,
    rowModesModel,
    columns,
    handlers,
    apiRef,
  };
};
