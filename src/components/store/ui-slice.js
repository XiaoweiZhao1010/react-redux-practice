import { createSlice } from "@reduxjs/toolkit";

const uiSlice = createSlice({
  name: "ui",
  initialState: { isVisible: false, Notification: null },
  reducers: {
    toggle(state) {
      state.isVisible = !state.isVisible;
    },
    showNotification(state, action) {
      state.Notification = {
        status: action.payload.status,
        title: action.payload.title,
        message: action.payload.message,
      };
    },
  },
});

export const uiActions = uiSlice.actions;
export default uiSlice;
