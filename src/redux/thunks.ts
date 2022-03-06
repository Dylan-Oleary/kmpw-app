import { createAsyncThunk } from "@reduxjs/toolkit";

import {
    getRefreshTokenFromStorage,
    removeRefreshTokenFromStorage,
    setRefreshTokenInStorage
} from "../lib/session";

export const initializeUser = createAsyncThunk("user/initializeUser", async () => {
    const refreshToken = await getRefreshTokenFromStorage();

    if (refreshToken) {
        return null;
    } else {
        return null;
    }
});

export const setUserTokens = createAsyncThunk(
    "user/setTokens",
    async (tokens: { accessToken: string; refreshToken: string }, { rejectWithValue }) => {
        try {
            const { accessToken, refreshToken } = tokens;

            await setRefreshTokenInStorage(refreshToken);

            return accessToken;
        } catch (error) {
            throw rejectWithValue({
                status: 500,
                message: "Token Error"
            });
        }
    }
);

export const clearUser = createAsyncThunk("user/cleanUser", async (_, { rejectWithValue }) => {
    try {
        await removeRefreshTokenFromStorage();
    } catch (error) {
        throw rejectWithValue({
            status: 500,
            message: "Token Error"
        });
    }
});
