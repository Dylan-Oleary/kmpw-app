import { configureStore } from "@reduxjs/toolkit";

import { appReducer } from "./slices/application";

export const store = configureStore({
    reducer: { application: appReducer }
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
