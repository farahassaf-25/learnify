import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    userInfo: localStorage.getItem("userInfo") ? JSON.parse(localStorage.getItem("userInfo")) : null,
};

const authSlice = createSlice({
    name: 'auth',
    initialState: {
      userInfo: JSON.parse(localStorage.getItem("userInfo")) || null,
      token: localStorage.getItem("token") || null, // Add token to state
    },
    reducers: {
      setCredentials: (state, action) => {
        state.userInfo = action.payload.user; 
        state.token = action.payload.token; // Store token
        localStorage.setItem('userInfo', JSON.stringify(action.payload.user));
        localStorage.setItem('token', action.payload.token); // Save token
      },
      logout: (state) => {
        state.userInfo = null;
        state.token = null; // Clear token
        localStorage.removeItem('userInfo');
        localStorage.removeItem('token');
      }
    },
  });
  


export const { setCredentials, logout } = authSlice.actions;
export default authSlice.reducer;