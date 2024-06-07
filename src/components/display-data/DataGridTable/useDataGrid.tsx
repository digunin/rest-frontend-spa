import React, { useCallback, useMemo, useState } from "react";
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

export const useDataGrid = () => {
  const [rowModesModel, setRowModesModel] = useState<GridRowModesModel>({});
  const [fetchingRows, setFetchingRows] = useState<Array<RecordID>>([]);
  const { showSnackbar } = useAppSnackbar();
  const dispatch = useAppDispatch();
  const { askConfirm, confirmOpen, onClose, onConfirm, setConfirmOpen } =
    useConfirmDialog();

  // newRows - массив копий свежесозданных строк,
  // которые еще не отправлены на сервер.
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
      if (fetchingRows.includes(id as RecordID)) return;
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
        addFetchingRow(id as RecordID);
        await response.unwrap().catch((err: Error) => {
          errorName = err.name;
        });
        removeFetchingRow(id as RecordID);
      };
      deleteAfterConfirm(processDelete);
    },
    [dispatch, deleteAfterConfirm]
  );

  const handleCancelClick = useCallback(
    (id: GridRowId) => () => {
      if (fetchingRows.includes(id as RecordID)) return;
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
        addFetchingRow(id as RecordID);
        await response
          .unwrap()
          .then((row) => {
            returnedRow = row;
            removeRow(id);
          })
          .catch((err: Error) => (error = err));
        removeFetchingRow(id as RecordID);
      } else {
        let response = updateRow({ ...newRow, id });
        addFetchingRow(id as RecordID);
        await response
          .unwrap()
          .then((row) => {
            returnedRow = row;
          })
          .catch((err: Error) => (error = err));
        removeFetchingRow(id as RecordID);
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

  const addFetchingRow = useCallback((id: RecordID) => {
    setFetchingRows((prev) => [...prev, id]);
  }, []);

  const removeFetchingRow = useCallback((id: RecordID) => {
    setFetchingRows((prev) => prev.filter((rowID) => rowID !== id));
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

          const enableIndicator = fetchingRows.includes(id as RecordID);

          const indicator: React.JSX.Element[] = enableIndicator
            ? [
                <GridActionsCellItem
                  icon={<Loop color="warning" />}
                  label="indicator"
                  disabled
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
                />,
              ]
            : [
                <GridActionsCellItem
                  icon={<Loop color="inherit" />}
                  label="indicator"
                  disabled
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
              disabled={enableIndicator}
            />,
            <GridActionsCellItem
              icon={<CancelIcon />}
              label="Cancel"
              className="textPrimary"
              onClick={handleCancelClick(id)}
              color="inherit"
              disabled={enableIndicator}
            />,
          ];

          const viewModeActions = [
            <GridActionsCellItem
              icon={<EditIcon />}
              label="Edit"
              className="textPrimary"
              onClick={handleEditClick(id)}
              color="inherit"
              disabled={enableIndicator}
            />,
            <GridActionsCellItem
              icon={<DeleteIcon />}
              label="Delete"
              onClick={handleDeleteClick(id)}
              color="inherit"
              disabled={enableIndicator}
            />,
          ];

          if (isInEditMode) {
            return [...editModeActions, ...indicator];
          }

          return [...viewModeActions, ...indicator];
        },
      },
    ];
  }, [
    fetchingRows,
    rowModesModel,
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
    onClose,
    onConfirm,
  };

  return {
    rows: newRows,
    rowModesModel,
    columns,
    handlers,
    apiRef,
    activeRequests: fetchingRows.length > 0,
    confirmOpen: !!confirmOpen,
  };
};
