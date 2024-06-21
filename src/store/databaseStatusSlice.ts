import { createSlice } from "@reduxjs/toolkit";
import { server_messages_RU } from "../utils/text";
import { databaseAPI } from "../api/databaseAPI";
import { signInAPI } from "../api/authAPI";

const initialState = {
  error: "",
};

const getErrorMessage = (error: string) => {
  return server_messages_RU[error] || error;
};

const databaseErrorSlice = createSlice({
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
      }
    );
    builder.addMatcher(
      databaseAPI.endpoints.updateRow.matchRejected,
      (state, action) => {
        state.error = getErrorMessage(action.error.message || "");
      }
    );
    builder.addMatcher(
      databaseAPI.endpoints.deleteRow.matchRejected,
      (state, action) => {
        state.error = getErrorMessage(action.error.message || "");
      }
    );
  },
});

export default databaseErrorSlice.reducer;
