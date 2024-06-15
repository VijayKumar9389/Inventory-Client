import { configureStore } from '@reduxjs/toolkit';
import authReducer from "./reducers/auth.reducer.ts";

export const store = configureStore({
    reducer: {
        auth: authReducer,
        // Add other reducers
    },
});

export type RootState = ReturnType<typeof store.getState>;
// export type AppDispatch = typeof store.dispatch;
