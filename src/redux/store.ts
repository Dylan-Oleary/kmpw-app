import { configureStore } from "@reduxjs/toolkit";

import { appReducer } from "./slices/application";
import { userReducer } from "./slices/user";

export const store = configureStore({
    reducer: { application: appReducer, user: userReducer }
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
