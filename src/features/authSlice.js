import { createSlice } from "@reduxjs/toolkit";

const authSlice = createSlice({
  name: "auth",
  initialState: {
    token: localStorage.getItem("token") || null,
    user: JSON.parse(localStorage.getItem("user") || "null"),
    isAuthenticated: !!localStorage.getItem("token"),
    callReceiverId: localStorage.getItem("callReceiverId") || null,
    callReceiverName: localStorage.getItem("callReceiverName") || null,
    pendingAppointmentId: null
  },
  reducers: {
    setState: (state, action) => {
      const { token, user } = action.payload;
      state.token = token;
      state.user = user;
      state.isAuthenticated = !!token;
      if (token) {
        localStorage.setItem("token", token);
      } else {
        localStorage.removeItem("token");
      }
      if (user) {
        localStorage.setItem("user", JSON.stringify(user));
      } else {
        localStorage.removeItem("user");
      }
    },
    clearState: (state) => {
      state.token = null;
      state.user = null;
      state.isAuthenticated = false;
      state.callReceiverId = null;
      state.callReceiverName = null;
      state.pendingAppointmentId = null;
      localStorage.removeItem("token");
      localStorage.removeItem("user");
      localStorage.removeItem("callReceiverId");
      localStorage.removeItem("callReceiverName");
    },
    updateUser: (state, action) => {
      state.user = { ...state.user, ...action.payload };
      localStorage.setItem("user", JSON.stringify(state.user));
    },
    setCallData: (state, action) => {
      const { receiverId, receiverName } = action.payload;
      state.callReceiverId = receiverId;
      state.callReceiverName = receiverName;
      localStorage.setItem("callReceiverId", receiverId);
      localStorage.setItem("callReceiverName", receiverName);
    },
    clearCallData: (state) => {
      state.callReceiverId = null;
      state.callReceiverName = null;
      localStorage.removeItem("callReceiverId");
      localStorage.removeItem("callReceiverName");
    },
    setPendingAppointmentId: (state, action) => {
      state.pendingAppointmentId = action.payload;
    },
    clearPendingAppointmentId: (state) => {
      state.pendingAppointmentId = null;
    }
  }
});

export const {
  setState,
  clearState,
  updateUser,
  setCallData,
  clearCallData,
  setPendingAppointmentId,
  clearPendingAppointmentId
} = authSlice.actions;

export const selectPendingAppointmentId = (state) => 
  state.auth.pendingAppointmentId;

export default authSlice.reducer;
