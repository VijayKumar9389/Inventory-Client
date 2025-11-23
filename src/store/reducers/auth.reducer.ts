import {createSlice, PayloadAction} from "@reduxjs/toolkit";
import {AuthState} from "../../models/user.models.ts";

const initialState: AuthState = {
    loggedIn: false,
    username: "",
    admin: false,
};

export const authSlice = createSlice({
    name: "auth",
    initialState: initialState,
    reducers: {
        setLogin: (state, action: PayloadAction<{ auth: boolean, user: string }>): void => {
            state.loggedIn = action.payload.auth;
            state.username = action.payload.user;
        },
        setLogout: (state): void => {
            state.loggedIn = false;
            state.username = "";
            localStorage.removeItem('accessToken');
            localStorage.removeItem('refreshToken');
        },
        SetAdmin: (state, action: PayloadAction<boolean>): void => {
            state.admin = action.payload;
        },
    },
});

export const {setLogin, setLogout, SetAdmin} = authSlice.actions;

export default authSlice.reducer;
