import { PayloadAction, createSlice } from "@reduxjs/toolkit";
import { RecordID } from "../api/types";

type DBRecordMode = "edit" | "create" | null;
type EditedRecordState = {
  mode: DBRecordMode;
  id: RecordID | null;
};

const initialState: EditedRecordState = {
  mode: null,
  id: null,
};

const editedRecordSlice = createSlice({
  name: "editedRecord",
  initialState,
  reducers: {
    setEditedRecord: {
      reducer: (state, action: PayloadAction<EditedRecordState>) => {
        return action.payload;
      },
      prepare: (mode: DBRecordMode, id: RecordID | null) => {
        return {
          payload: {
            mode,
            id,
          },
        };
      },
    },
  },
});

export const { setEditedRecord } = editedRecordSlice.actions;

export default editedRecordSlice.reducer;
