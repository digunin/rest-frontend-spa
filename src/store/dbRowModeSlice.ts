import { PayloadAction, createSlice } from "@reduxjs/toolkit";
import { RecordID } from "../api/types";

type EditedRecordState = {
  isView: boolean;
  isCreate: boolean;
  isEdit: RecordID | null;
};

const initialState: EditedRecordState = {
  isView: true,
  isCreate: false,
  isEdit: null,
};

const editedRecordSlice = createSlice({
  name: "rowMode",
  initialState,
  reducers: {
    setViewMode: () => {
      return { isView: true, isCreate: false, isEdit: null };
    },
    setCreateMoode: () => {
      return { isView: false, isCreate: true, isEdit: null };
    },
    setEditMode: (state, action: PayloadAction<RecordID>) => {
      return { isView: false, isCreate: false, isEdit: action.payload };
    },
  },
});

export const { setViewMode, setCreateMoode, setEditMode } =
  editedRecordSlice.actions;

export default editedRecordSlice.reducer;
