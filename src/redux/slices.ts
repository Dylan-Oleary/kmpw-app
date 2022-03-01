import { createSlice } from "@reduxjs/toolkit";

import { initializeUser, setUserTokens } from "./thunks";
import { IApplicationState, IUserState } from "../types";

export const applicationSlice = createSlice({
    name: "application",
    initialState: { errors: [], isLoading: true } as IApplicationState,
    reducers: {
        initializeApplication: (state) => {
            state.isLoading = false;
        }
    },
    extraReducers: (builder) => {
        builder.addCase(setUserTokens.rejected, (state, action) => {
            const error = action.payload;

            //@ts-ignore
            state.errors.push(error);
        });
    }
});

export const userSlice = createSlice({
    name: "user",
    initialState: {} as IUserState,
    reducers: {},
    extraReducers: (builder) => {
        builder.addCase(initializeUser.fulfilled, () => {
            console.log("User Initialization Complete");
        });
        builder.addCase(setUserTokens.fulfilled, (state, action) => {
            const accessToken = action?.payload;

            state.accessToken = accessToken;
        });
    }
});

export const { initializeApplication } = applicationSlice.actions;
export default { application: applicationSlice.reducer, user: userSlice.reducer };
