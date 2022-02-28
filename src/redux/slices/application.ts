import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";

import { getRefreshTokenFromStorage } from "../../lib/session";

interface IUserState {
    id: string;
    createdAt: Date;
    updatedAt: Date;
    email: string;
    accessToken: string;
}

interface IApplicationState {
    isLoading: boolean;
    user?: IUserState;
}

const initialState: IApplicationState = { isLoading: true };

export const initializeApplication = createAsyncThunk(
    "application/initializeApplication",
    async () => {
        const refreshToken = await getRefreshTokenFromStorage();

        if (refreshToken) {
            return null;
        } else {
            return null;
        }
    }
);

export const applicationSlice = createSlice({
    name: "application",
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder.addCase(initializeApplication.fulfilled, (state) => {
            state.isLoading = false;
        });
        builder.addCase(initializeApplication.rejected, (state) => {
            state.isLoading = false;
        });
    }
});

export const {} = applicationSlice.actions;
export const appReducer = applicationSlice.reducer;
export default applicationSlice;
