import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";

import { getRefreshTokenFromStorage } from "../../lib/session";

interface IUserState {
    id: string;
    createdAt: Date;
    updatedAt: Date;
    email: string;
    accessToken: string;
    isAuthenticated: boolean;
}

const initialState: IUserState = {} as IUserState;

export const initializeUser = createAsyncThunk("user/initializeUser", async () => {
    const refreshToken = await getRefreshTokenFromStorage();

    if (refreshToken) {
        return null;
    } else {
        return null;
    }
});

export const userSlice = createSlice({
    name: "user",
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder.addCase(initializeUser.fulfilled, () => {
            console.log("User Initialization Complete");
        });
    }
});

export const {} = userSlice.actions;
export const userReducer = userSlice.reducer;
export default userSlice;
