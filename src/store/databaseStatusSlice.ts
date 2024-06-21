import { createSlice } from "@reduxjs/toolkit";
import { server_messages_RU } from "../utils/text";
import { databaseAPI } from "../api/databaseAPI";
import { signInAPI } from "../api/authAPI";
import { RecordID } from "../api/types";

export const newRowID: RecordID = "new-row";

export type ArrayOfID = Array<RecordID>;
type DBStatusState = {
  error: string;
  fetchingID: ArrayOfID;
};

const initialState: DBStatusState = {
  error: "",
  fetchingID: [],
};

const getErrorMessage = (error: string) => {
  return server_messages_RU[error] || error;
};
const addID = (arr: ArrayOfID, id: RecordID): ArrayOfID => {
  if (arr.includes(id)) return arr;
  return [...arr, id];
};

const removeID = (arr: ArrayOfID, id: RecordID): ArrayOfID => {
  return arr.filter((ID) => ID !== id);
};

const databaseStatusSlice = createSlice({
  name: "database-errors",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addMatcher(
      signInAPI.endpoints.login.matchPending,
      (state, action) => {
        state.error = "";
      }
    );

    builder.addMatcher(
      databaseAPI.endpoints.loadData.matchRejected,
      (state, action) => {
        state.error = getErrorMessage(action.error.message || "");
      }
    );

    builder.addMatcher(
      databaseAPI.endpoints.createRow.matchRejected,
      (state, action) => {
        state.error = getErrorMessage(action.error.message || "");
        state.fetchingID = removeID(state.fetchingID, newRowID);
      }
    );
    builder.addMatcher(
      databaseAPI.endpoints.createRow.matchPending,
      (state, action) => {
        state.fetchingID = addID(state.fetchingID, newRowID);
      }
    );
    builder.addMatcher(
      databaseAPI.endpoints.createRow.matchFulfilled,
      (state, action) => {
        state.fetchingID = removeID(state.fetchingID, newRowID);
      }
    );

    builder.addMatcher(
      databaseAPI.endpoints.updateRow.matchRejected,
      (state, action) => {
        state.error = getErrorMessage(action.error.message || "");
        const { id } = action.meta.arg.originalArgs;
        state.fetchingID = removeID(state.fetchingID, id);
      }
    );
    builder.addMatcher(
      databaseAPI.endpoints.updateRow.matchPending,
      (state, action) => {
        const { id } = action.meta.arg.originalArgs;
        state.fetchingID = addID(state.fetchingID, id);
      }
    );
    builder.addMatcher(
      databaseAPI.endpoints.updateRow.matchFulfilled,
      (state, action) => {
        const { id } = action.meta.arg.originalArgs;
        state.fetchingID = removeID(state.fetchingID, id);
      }
    );

    builder.addMatcher(
      databaseAPI.endpoints.deleteRow.matchRejected,
      (state, action) => {
        state.error = getErrorMessage(action.error.message || "");
        const id = action.meta.arg.originalArgs;
        state.fetchingID = removeID(state.fetchingID, id);
      }
    );
    builder.addMatcher(
      databaseAPI.endpoints.deleteRow.matchPending,
      (state, action) => {
        const id = action.meta.arg.originalArgs;
        state.fetchingID = addID(state.fetchingID, id);
      }
    );
    builder.addMatcher(
      databaseAPI.endpoints.deleteRow.matchFulfilled,
      (state, action) => {
        const id = action.meta.arg.originalArgs;
        state.fetchingID = removeID(state.fetchingID, id);
      }
    );
  },
});

export default databaseStatusSlice.reducer;
