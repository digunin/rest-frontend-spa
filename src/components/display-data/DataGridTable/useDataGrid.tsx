import React, { useCallback, useEffect, useState } from "react";
import {
  DatabaseData,
  DatabaseRow,
  deleteRow,
  sendRow,
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
import { columnsDef } from "./columns";
import { RecordID } from "../../../api/types";
import { emptySingleRecord } from "../../../utils/mock.fetch";
import { nanoid } from "nanoid";
import { useAppSnackbar } from "../../../hooks/useAppSnackbar";
import { useAppDispatch } from "../../../store";
import { setIsOverlayShow } from "../../../store/overlaySlice";

type AppCallback = () => void;

export const useDataGrid = (data: DatabaseData) => {
  const [rows, setRows] = useState<DatabaseData>(data);
  const [rowModesModel, setRowModesModel] = useState<GridRowModesModel>({});
  const [abortFetch, setAbortFetch] = useState<AppCallback | null>(null);
  const { showSnackbar } = useAppSnackbar();
  const dispatch = useAppDispatch();

  // newRows - массив копий свежесозданных строк,
  // которые еще не сохранены в redux-store.
  // Не нужен, если запретить создавать новые строки,
  // когда есть хоть одна созданная, но не сохраненная
  const [newRows, setNewRows] = useState<DatabaseData>([]);

  const apiRef = useGridApiRef();

  useEffect(() => setRows([...data, ...newRows]), [data]);
  useEffect(() => {
    setTimeout(() => {
      dispatch(setIsOverlayShow(false));
    });
  }, [data]);

  const handleEditClick = useCallback(
    (id: GridRowId) => () => {
      setRowModesModel({ ...rowModesModel, [id]: { mode: GridRowModes.Edit } });
    },
    [rowModesModel]
  );

  const handleSaveClick = useCallback(
    (id: GridRowId) => () => {
      setRowModesModel({ ...rowModesModel, [id]: { mode: GridRowModes.View } });
    },
    [rowModesModel]
  );

  const handleDeleteClick = useCallback(
    (id: GridRowId) => async () => {
      dispatch(setIsOverlayShow(true));
      const response = dispatch(deleteRow(id as RecordID));
      setAbortFetch(() => response.abort);
      await response.unwrap().catch(() => {
        dispatch(setIsOverlayShow(false));
      });
      setAbortFetch(null);
    },
    [dispatch]
  );

  const handleCancelClick = useCallback(
    (id: GridRowId) => () => {
      setRowModesModel({
        ...rowModesModel,
        [id]: { mode: GridRowModes.View, ignoreModifications: true },
      });

      const editedRow = newRows.find((row) => row.id === id);
      if (editedRow) {
        removeRow(id as RecordID);
      }
    },
    [newRows, rowModesModel]
  );

  const handleRowEditStop: GridEventListener<"rowEditStop"> = useCallback(
    (params, event) => {
      event.defaultMuiPrevented = true;
      switch (params.reason) {
        case GridRowEditStopReasons.escapeKeyDown:
          handleCancelClick(params.id)();
          break;
        case GridRowEditStopReasons.enterKeyDown:
          handleSaveClick(params.id)();
      }
    },
    [handleCancelClick, handleSaveClick]
  );

  const processRowUpdate = useCallback(
    async (newRow: GridRowModel<DatabaseRow>) => {
      let returnedRow = newRow;
      const id = newRow.id;
      let error = "";
      if (!newRow.employeeNumber) {
        return Promise.reject('Поле "employeeNumber" не может быть пустым');
      }
      const creatingRow = newRows.find((row) => row.id === id);
      if (creatingRow) {
        let response = dispatch(sendRow({ row: newRow }));
        setAbortFetch(() => response.abort);
        await response
          .unwrap()
          .then((row) => {
            returnedRow = row;
            removeRow(id);
          })
          .catch((err) => (error = err));
        setAbortFetch(null);
      } else {
        let response = dispatch(sendRow({ row: newRow, id }));
        setAbortFetch(() => response.abort);
        await response
          .unwrap()
          .then((row) => {
            returnedRow = row;
          })
          .catch((err) => (error = err));
        setAbortFetch(null);
      }
      if (error) return Promise.reject();
      return returnedRow;
    },
    [newRows, dispatch]
  );

  const onProcessRowUpdateError = useCallback((error: string) => {
    showSnackbar(error);
  }, []);

  const handleRowModesModelChange = useCallback(
    (newRowModesModel: GridRowModesModel) => {
      setRowModesModel(newRowModesModel);
    },
    []
  );

  const handleAddNewRow = useCallback(() => {
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
  }, [apiRef.current]);

  const addNewRow = useCallback((newRow: DatabaseRow) => {
    setNewRows((prev) => [...prev, newRow]);
    setRows((prev) => [...prev, newRow]);
  }, []);

  const removeRow = useCallback((id: RecordID) => {
    setNewRows((prev) => prev.filter((row) => row.id !== id));
    setRows((prev) => prev.filter((row) => row.id !== id));
  }, []);

  const columns: GridColDef[] = [
    ...columnsDef,
    {
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
    },
  ];

  const handlers = {
    handleRowEditStop,
    processRowUpdate,
    handleRowModesModelChange,
    handleAddNewRow,
    onProcessRowUpdateError,
    abortFetch,
  };

  return {
    rows,
    rowModesModel,
    columns,
    handlers,
    apiRef,
  };
};
