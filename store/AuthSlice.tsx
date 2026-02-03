import { createSlice } from "@reduxjs/toolkit";

export type User = {
    id: string;
    fullname: string;
    email: string;
    role: "USER" | "ADMIN";
    status: "UNVERIFIED" | "ACTIVE";
};

type AuthState = {
    authLoading: boolean;
    authStatus: boolean;
    userData: User | null;
};

const initialState: AuthState = {
    authLoading: true,
    authStatus: false,
    userData: null,
}

const authSlice = createSlice({
    name: "auth",
    initialState,
    reducers: {
        setUser: (state, action) => {
            state.authLoading = false;
            state.authStatus = true;
            state.userData = action.payload.userData;
        },
        removeUser: (state) => {
            state.authLoading = false;
            state.authStatus = false;
            state.userData = null;
        },
        setAuthLoading: (state, action) => {
            state.authLoading = action.payload;
        },
    }
})

export const {
    setUser,
    removeUser,
    setAuthLoading,
} = authSlice.actions;

export default authSlice.reducer;