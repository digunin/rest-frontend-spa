import { useForm } from "../../../hooks/useForm";
import { useAppSelector } from "../../../store";
import {
  selectIsFormValid,
  setDbrecordInputField,
  resetForm,
  setTouchedAll,
  setInitialValues,
} from "../../../store/form/DBRecordFormSlice";
import {
  useCreateRowMutation,
  useDeleteRowMutation,
  useLoadDataQuery,
  useUpdateRowMutation,
} from "../../../api/databaseAPI";
import { DatabaseRow, RecordID } from "../../../api/types";
import {
  setCreateMoode,
  setEditMode,
  setViewMode,
} from "../../../store/dbRowModeSlice";

export const useDataTable = () => {
  const { isCreate, isEdit } = useAppSelector((state) => state.dbRowModeState);
  const inputFields = useAppSelector((state) => state.dbRecordFormState);
  const isFormValid = useAppSelector(selectIsFormValid);
  const { formPayload, handleChange, dispatch } = useForm(
    inputFields,
    setDbrecordInputField
  );

  const { data } = useLoadDataQuery();
  const [createRow] = useCreateRowMutation();
  const [updateRow] = useUpdateRowMutation();
  const [deleteRow] = useDeleteRowMutation();

  const onsave = () => {
    dispatch(setTouchedAll());
    if (!isFormValid) return;
    if (isCreate)
      createRow(formPayload)
        .unwrap()
        .then(() => {
          dispatch(resetForm());
          dispatch(setViewMode());
        })
        .catch((err) => {});
    if (isEdit !== null)
      updateRow({ id: isEdit, ...formPayload })
        .unwrap()
        .then(() => {
          dispatch(resetForm());
          dispatch(setViewMode());
        })
        .catch((err) => {});
  };

  const onedit = (id: RecordID) => {
    dispatch(setEditMode(id));
    const { id: _, ...row } = data!.find((row) => row.id === id) as DatabaseRow;
    dispatch(setInitialValues(row));
  };

  const oncancel = () => {
    dispatch(setViewMode());
    dispatch(resetForm());
  };

  const ondelete = (id: RecordID) => {
    deleteRow(id);
  };

  const onCreate = () => {
    dispatch(setCreateMoode());
  };

  return {
    oninput: handleChange,
    onedit,
    ondelete,
    onsave,
    oncancel,
    onCreate,
    isCreate,
    isEdit,
    inputFields,
  };
};
