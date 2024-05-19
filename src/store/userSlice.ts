import { PayloadAction, createSlice } from "@reduxjs/toolkit";

export type UserState = { username: string | null; token: string | null };

const initialState: UserState = {
  username: null,
  token: null,
};

const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    setUser: (state, action: PayloadAction<UserState>) => {
      return action.payload;
    },
  },
});

export const { setUser } = userSlice.actions;

export default userSlice.reducer;
