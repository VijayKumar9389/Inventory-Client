import {createSlice, PayloadAction} from "@reduxjs/toolkit";
import {AuthState} from "../../models/user.models.ts";

const initialState: AuthState = {
    loggedIn: false,
    username: "",
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
        },
    },
});

export const {setLogin, setLogout} = authSlice.actions;

export default authSlice.reducer;
