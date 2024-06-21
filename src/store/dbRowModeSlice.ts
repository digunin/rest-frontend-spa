import { PayloadAction, createSlice } from "@reduxjs/toolkit";
import { RecordID } from "../api/types";

type EditedRecordState = {
  isView: boolean;
  isCreate: boolean;
  isEdit: RecordID | null;
  muiDataGridView: boolean;
};

const initialState: EditedRecordState = {
  isView: true,
  isCreate: false,
  isEdit: null,
  muiDataGridView: false,
};

const editedRecordSlice = createSlice({
  name: "rowMode",
  initialState,
  reducers: {
    setViewMode: (state) => {
      return { ...state, isView: true, isCreate: false, isEdit: null };
    },
    setCreateMoode: (state) => {
      return { ...state, isView: false, isCreate: true, isEdit: null };
    },
    setEditMode: (state, action: PayloadAction<RecordID>) => {
      return {
        ...state,
        isView: false,
        isCreate: false,
        isEdit: action.payload,
      };
    },
    toggleDBViewMode: (state) => {
      state.muiDataGridView = !state.muiDataGridView;
    },
  },
});

export const { setViewMode, setCreateMoode, setEditMode, toggleDBViewMode } =
  editedRecordSlice.actions;

export default editedRecordSlice.reducer;
