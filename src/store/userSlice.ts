import { PayloadAction, createSlice } from "@reduxjs/toolkit";
import { NetworkInteracting } from "./../api/types";
import { error_messages, server_messages_RU } from "../utils/text";
import { signInAPI } from "../api/authAPI";

export type UserState = {
  username: string | null;
  token: string | null;
} & NetworkInteracting;

const initialState: UserState = {
  username: null,
  token: null,
  status: "idle",
  error: "",
};

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
    builder.addMatcher(signInAPI.endpoints.login.matchPending, (state) => {
      state.status = "loading";
      state.error = "";
    });
    builder.addMatcher(
      signInAPI.endpoints.login.matchRejected,
      (state, { error: { message } }) => {
        state.status = "failed";
        let err =
          message === error_messages.accessDeny ? error_messages.signIn : "";
        state.error = err || server_messages_RU[message || "unknown"];
      }
    );
    builder.addMatcher(
      signInAPI.endpoints.login.matchFulfilled,
      (state, { payload: { token }, meta }) => {
        state.status = "idle";
        state.error = "";
        state.token = token;
        state.username = meta.arg.originalArgs.username;
      }
    );
  },
});

export const { setUser } = userSlice.actions;

export default userSlice.reducer;
