import React, { useCallback, useEffect, useMemo, useState } from "react";
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
import { emptySingleRecord, hasEmptyFields } from "../../../utils/mock.fetch";
import { nanoid } from "nanoid";
import { useAppSnackbar } from "../../../hooks/useAppSnackbar";
import { useAppDispatch } from "../../../store";
import { setIsOverlayShow } from "../../../store/overlaySlice";
import { Loop } from "@mui/icons-material";

type AppCallback = () => void;

export const useDataGrid = (data: DatabaseData) => {
  const [rows, setRows] = useState<DatabaseData>(data);
  const [rowModesModel, setRowModesModel] = useState<GridRowModesModel>({});
  const [abortFetch, setAbortFetch] = useState<{
    [key: RecordID]: AppCallback | undefined;
  }>({});
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
      if (abortFetch[id]) return;
      setRowModesModel({ ...rowModesModel, [id]: { mode: GridRowModes.View } });
    },
    [rowModesModel]
  );

  const handleDeleteClick = useCallback(
    (id: GridRowId) => async () => {
      dispatch(setIsOverlayShow(true));
      const response = dispatch(deleteRow(id as RecordID));
      addAbortCallback(id as RecordID, response.abort);
      await response.unwrap().catch(() => {
        dispatch(setIsOverlayShow(false));
      });
      removeAbortCallback(id as RecordID);
    },
    [dispatch]
  );

  const handleCancelClick = useCallback(
    (id: GridRowId) => () => {
      if (abortFetch[id]) return;
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
      if (hasEmptyFields(newRow)) {
        return Promise.reject("Заполните пустые поля");
      }
      const creatingRow = newRows.find((row) => row.id === id);
      if (creatingRow) {
        let response = dispatch(sendRow({ row: newRow }));
        addAbortCallback(id as RecordID, response.abort);
        await response
          .unwrap()
          .then((row) => {
            returnedRow = row;
            removeRow(id);
          })
          .catch((err) => (error = err));
        removeAbortCallback(id as RecordID);
      } else {
        let response = dispatch(sendRow({ row: newRow, id }));
        addAbortCallback(id as RecordID, response.abort);
        await response
          .unwrap()
          .then((row) => {
            returnedRow = row;
          })
          .catch((err) => (error = err));
        removeAbortCallback(id as RecordID);
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

  const addAbortCallback = useCallback((id: RecordID, aborter: AppCallback) => {
    setAbortFetch((prev) => {
      return { ...prev, [id]: aborter };
    });
  }, []);

  const removeAbortCallback = useCallback((id: RecordID) => {
    setAbortFetch((prev) => {
      return { ...prev, [id]: undefined };
    });
  }, []);

  const columns: GridColDef[] = useMemo(() => {
    return [
      ...columnsDef,
      {
        field: "actions",
        type: "actions",
        headerName: "Actions",
        minWidth: 126,
        cellClassName: "actions",
        getActions: ({ id }) => {
          const isInEditMode = rowModesModel[id]?.mode === GridRowModes.Edit;

          const showAbotrButton = !!abortFetch[id];

          const abortButton: React.JSX.Element[] = showAbotrButton
            ? [
                <GridActionsCellItem
                  icon={<Loop color="warning" />}
                  label="Abort"
                  title="Отменить запрос"
                  sx={{
                    animation: "spin 2s linear infinite",
                    "@keyframes spin": {
                      "0%": {
                        transform: "rotate(360deg)",
                      },
                      "100%": {
                        transform: "rotate(0deg)",
                      },
                    },
                  }}
                  onClick={abortFetch[id]}
                />,
              ]
            : [];

          const editModeActions = [
            <GridActionsCellItem
              icon={<SaveIcon />}
              label="Save"
              sx={{
                color: "primary.main",
              }}
              onClick={handleSaveClick(id)}
              disabled={showAbotrButton}
            />,
            <GridActionsCellItem
              icon={<CancelIcon />}
              label="Cancel"
              className="textPrimary"
              onClick={handleCancelClick(id)}
              color="inherit"
              disabled={showAbotrButton}
            />,
          ];

          const viewModeActions = [
            <GridActionsCellItem
              icon={<EditIcon />}
              label="Edit"
              className="textPrimary"
              onClick={handleEditClick(id)}
              color="inherit"
              disabled={showAbotrButton}
            />,
            <GridActionsCellItem
              icon={<DeleteIcon />}
              label="Delete"
              onClick={handleDeleteClick(id)}
              color="inherit"
              disabled={showAbotrButton}
            />,
          ];

          if (isInEditMode) {
            return [...editModeActions, ...abortButton];
          }

          return [...viewModeActions, ...abortButton];
        },
      },
    ];
  }, [
    rowModesModel,
    abortFetch,
    handleSaveClick,
    handleCancelClick,
    handleEditClick,
    handleDeleteClick,
  ]);

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
    activeRequests: Object.keys(abortFetch).length > 0,
  };
};
