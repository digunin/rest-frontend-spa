import React, { useCallback, useEffect, useMemo, useState } from "react";
import { DatabaseData, DatabaseRow } from "../../../api/types";
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
import { Loop } from "@mui/icons-material";
import { useConfirmDialog } from "./useConfirmDialog";
import {
  useCreateRowMutation,
  useDeleteRowMutation,
  useUpdateRowMutation,
} from "../../../api/databaseAPI";

export type AppCallback = () => void;

export const useDataGrid = (data: DatabaseData) => {
  const [rowModesModel, setRowModesModel] = useState<GridRowModesModel>({});
  const [abortFetch, setAbortFetch] = useState<{
    [key: RecordID]: AppCallback | undefined;
  }>({});
  const { showSnackbar } = useAppSnackbar();
  const dispatch = useAppDispatch();
  const { askConfirm, confirmOpen, onClose, onConfirm, setConfirmOpen } =
    useConfirmDialog();

  // newRows - массив копий свежесозданных строк,
  // которые еще не сохранены в redux-store.
  // Не нужен, если запретить создавать новые строки,
  // когда есть хоть одна созданная, но не сохраненная
  const [newRows, setNewRows] = useState<DatabaseData>([]);

  const apiRef = useGridApiRef();
  const [createRow] = useCreateRowMutation();
  const [updateRow] = useUpdateRowMutation();
  const [deleteRow] = useDeleteRowMutation();

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

  const deleteAfterConfirm = useCallback(
    (callback: AppCallback) => {
      if (askConfirm) {
        setConfirmOpen(() => callback);
      } else callback();
    },
    [askConfirm]
  );

  const handleDeleteClick = useCallback(
    (id: GridRowId) => () => {
      const processDelete = async () => {
        let errorName = "";
        const response = deleteRow(id as RecordID);
        addAbortCallback(id as RecordID, response.abort);
        await response.unwrap().catch((err: Error) => {
          errorName = err.name;
        });
        removeAbortCallback(id as RecordID);
        // if (errorName === error_messages.abortedErrorName) {
        //   dispatch(loadData());
        // }
      };
      deleteAfterConfirm(processDelete);
    },
    [dispatch, deleteAfterConfirm]
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
      let error: Error = { name: "", message: "" };
      if (hasEmptyFields(newRow)) {
        return Promise.reject("Заполните пустые поля");
      }
      const creatingRow = newRows.find((row) => row.id === id);
      if (creatingRow) {
        let response = createRow(newRow);
        addAbortCallback(id as RecordID, response.abort);
        await response
          .unwrap()
          .then((row) => {
            returnedRow = row;
            removeRow(id);
          })
          .catch((err: Error) => (error = err));
        removeAbortCallback(id as RecordID);
      } else {
        let response = updateRow({ ...newRow, id });
        addAbortCallback(id as RecordID, response.abort);
        await response
          .unwrap()
          .then((row) => {
            returnedRow = row;
          })
          .catch((err: Error) => (error = err));
        removeAbortCallback(id as RecordID);
      }
      if (error.message) {
        return Promise.reject();
      }
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
  }, []);

  const removeRow = useCallback((id: RecordID) => {
    setNewRows((prev) => prev.filter((row) => row.id !== id));
  }, []);

  const addAbortCallback = useCallback((id: RecordID, aborter: AppCallback) => {
    setAbortFetch((prev) => {
      return { ...prev, [id]: aborter };
    });
  }, []);

  const removeAbortCallback = useCallback((id: RecordID) => {
    setAbortFetch((prev) => {
      const { [id]: _, ...rest } = prev;
      return rest;
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

          const enableAbortButton = !!abortFetch[id];

          const abortButton: React.JSX.Element[] = enableAbortButton
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
            : [
                <GridActionsCellItem
                  icon={<Loop color="inherit" />}
                  label="Abort"
                  title="Отменить запрос"
                />,
              ];

          const editModeActions = [
            <GridActionsCellItem
              icon={<SaveIcon />}
              label="Save"
              sx={{
                color: "primary.main",
              }}
              onClick={handleSaveClick(id)}
              disabled={enableAbortButton}
            />,
            <GridActionsCellItem
              icon={<CancelIcon />}
              label="Cancel"
              className="textPrimary"
              onClick={handleCancelClick(id)}
              color="inherit"
              disabled={enableAbortButton}
            />,
          ];

          const viewModeActions = [
            <GridActionsCellItem
              icon={<EditIcon />}
              label="Edit"
              className="textPrimary"
              onClick={handleEditClick(id)}
              color="inherit"
              disabled={enableAbortButton}
            />,
            <GridActionsCellItem
              icon={<DeleteIcon />}
              label="Delete"
              onClick={handleDeleteClick(id)}
              color="inherit"
              disabled={enableAbortButton}
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
    onClose,
    onConfirm,
  };

  return {
    rows: newRows,
    rowModesModel,
    columns,
    handlers,
    apiRef,
    activeRequests: Object.keys(abortFetch).length > 0,
    confirmOpen: !!confirmOpen,
  };
};
