import { configureStore } from "@reduxjs/toolkit";

import { applicationReducer, locationReducer, userReducer } from "@/redux";

export const store = configureStore({
    reducer: {
        application: applicationReducer,
        location: locationReducer,
        user: userReducer
    }
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
