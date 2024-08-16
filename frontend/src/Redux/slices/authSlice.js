import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    userInfo: (() => {
        const storedUserInfo = localStorage.getItem("userInfo");
        if (storedUserInfo && storedUserInfo !== 'undefined') {
            try {
                return JSON.parse(storedUserInfo);
            } catch (error) {
                console.error("Failed to parse userInfo from localStorage", error);
            }
        }
        return null;
    })(),
};

const authSlice = createSlice({
    name: 'auth',
    initialState,
    reducers: {
        setCredentials: (state, action) => {
            state.userInfo = {
              ...state.userInfo,
              ...action.payload,
            };
            localStorage.setItem('userInfo', JSON.stringify(state.userInfo));
          },
        logout: (state) => {
            state.userInfo = null;
            localStorage.clear();
        }
    },
});

export const { setCredentials, logout } = authSlice.actions;
export default authSlice.reducer;
