import { PayloadAction, createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import {
  NetworkInteracting,
  RecordID,
  ResponsedSingleRecord,
  SingleRecord,
} from "../../api/types";
import api from "../../api";
import { error_messages } from "../../utils/text";
import { RootState } from "..";

export type DatabaseRow = ResponsedSingleRecord;
export type DatabaseData = Array<DatabaseRow>;

export type DatabaseState = {
  data: DatabaseData;
} & NetworkInteracting;

const initialState: DatabaseState = {
  data: [],
  status: "idle",
  error: "",
};

export const loadData = createAsyncThunk<
  DatabaseData,
  any,
  { state: RootState }
>("data/load", async (_, thunkAPI) => {
  const token = thunkAPI.getState().userState.token;
  return api.read(token || "").catch((err) => Promise.reject(err));
});

type SendRowProps = {
  row: SingleRecord;
  id?: RecordID;
};

export const sendRow = createAsyncThunk<
  DatabaseRow,
  SendRowProps,
  { state: RootState }
>("data/send", async ({ row, id }: SendRowProps, thunkAPI) => {
  const token = thunkAPI.getState().userState.token;
  row = fixBeforeSending(row);
  return id
    ? api
        .update(row, id, token || "", thunkAPI.signal)
        .catch((err) => Promise.reject(err))
    : api
        .create(row, token || "", thunkAPI.signal)
        .catch((err) => Promise.reject(err));
});

export const deleteRow = createAsyncThunk<void, RecordID, { state: RootState }>(
  "data/delete",
  async (id, thunkAPI) => {
    const token = thunkAPI.getState().userState.token;
    return api
      .delete(id, token || "", thunkAPI.signal)
      .catch((err) => Promise.reject(err));
  }
);

const getErrorMessage = (error: string) => {
  return error === error_messages.accessDeny
    ? error_messages.authFailed
    : error;
};

const fixBeforeSending = (row: SingleRecord): SingleRecord => {
  const { companySigDate, employeeSigDate } = row;
  row.companySigDate = new Date(companySigDate).toISOString();
  row.employeeSigDate = new Date(employeeSigDate).toISOString();
  return row;
};

const databaseSlice = createSlice({
  name: "database",
  initialState,
  reducers: {
    setData: (state, action: PayloadAction<DatabaseData>) => {
      state.data = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder.addCase(loadData.pending, (state) => {
      state.status = "loading";
      state.error = "";
    });
    builder.addCase(loadData.rejected, (state, action) => {
      state.status = "failed";
      state.error = getErrorMessage(action.error.message || "");
    });
    builder.addCase(loadData.fulfilled, (state, action) => {
      state.status = "idle";
      state.error = "";
      state.data = action.payload;
    });

    builder.addCase(sendRow.pending, (state) => {
      state.status = "loading";
      state.error = "";
    });
    builder.addCase(sendRow.rejected, (state, action) => {
      state.status = "failed";
      state.error = getErrorMessage(action.error.message || "");
    });
    builder.addCase(sendRow.fulfilled, (state, action) => {
      state.status = "idle";
      state.error = "";
      const { id } = action.meta.arg;
      if (id) {
        state.data = state.data.map((row) =>
          row.id === id ? action.payload : row
        );
      } else state.data.push(action.payload);
    });

    builder.addCase(deleteRow.pending, (state) => {
      state.status = "loading";
      state.error = "";
    });
    builder.addCase(deleteRow.rejected, (state, action) => {
      state.status = "failed";
      if (action.error.message === error_messages.documentNotFound) {
        state.data = state.data.filter((row) => row.id !== action.meta.arg);
      }
      state.error = getErrorMessage(action.error.message || "");
    });
    builder.addCase(deleteRow.fulfilled, (state, action) => {
      state.status = "idle";
      state.error = "";
      const id = action.meta.arg;
      state.data = state.data.filter((row) => row.id !== id);
    });
  },
});

export const { setData } = databaseSlice.actions;

export default databaseSlice.reducer;
