import { NetworkStatus } from "./../api/types";
import { PayloadAction, createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { Credentials } from "../api/types";
import api from "../api";
import { error_messages } from "../utils/text";

export type UserState = {
  username: string | null;
  token: string | null;
  status: NetworkStatus;
  error: string;
};

const initialState: UserState = {
  username: null,
  token: null,
  status: "idle",
  error: "",
};

export const signIn = createAsyncThunk(
  "user/sign-in",
  async (credentials: Credentials) => {
    return await api.login(credentials).catch((err) => Promise.reject(err));
  }
);

const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    setUser: (
      state,
      action: PayloadAction<Pick<UserState, "username" | "token">>
    ) => {
      const { username, token } = action.payload;
      state.username = username;
      state.token = token;
    },
  },
  extraReducers: (builder) => {
    builder.addCase(signIn.pending, (state) => {
      state.status = "loading";
      state.error = "";
    });
    builder.addCase(signIn.rejected, (state, action) => {
      state.status = "failed";
      state.error =
        action.error.message === error_messages.accessDeny
          ? error_messages.signIn
          : action.error.message || "";
    });
    builder.addCase(signIn.fulfilled, (state, action) => {
      state.status = "idle";
      state.token = action.payload.token;
      state.username = action.meta.arg.username;
      state.error = "";
    });
  },
});

export const { setUser } = userSlice.actions;

export default userSlice.reducer;
