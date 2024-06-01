import { PayloadAction, createSlice } from "@reduxjs/toolkit";

const overlaySlice = createSlice({
  name: "overlay",
  initialState: false,
  reducers: {
    setIsOverlayShow: (state, action: PayloadAction<boolean>) => action.payload,
  },
});

export const { setIsOverlayShow } = overlaySlice.actions;

export default overlaySlice.reducer;
