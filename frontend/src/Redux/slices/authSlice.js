import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    userInfo: localStorage.getItem("userInfo") ? JSON.parse(localStorage.getItem("userInfo")) : null,
};

const authSlice = createSlice({
    name: 'auth',
    initialState: {
        userInfo: JSON.parse(localStorage.getItem('userInfo')) || null,
    },
    reducers: {
        setCredentials: (state, action) => {
            state.userInfo = action.payload.user; // Adjust based on the actual response
            localStorage.setItem('userInfo', JSON.stringify(action.payload.user)); // Store user info in localStorage
        },
        logout: (state) => {
            state.userInfo = null;
            localStorage.removeItem('userInfo');
        }
    },
});


export const { setCredentials, logout } = authSlice.actions;
export default authSlice.reducer;